import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, FileText, Loader2, CheckCircle2, DollarSign, Home, Calculator } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const propertySchema = z.object({
  // Basic Info
  propertyAddress: z.string().min(5, 'Property address is required'),
  purchasePrice: z.number().min(1000, 'Purchase price must be at least $1,000'),
  
  // Income & Expenses
  capRate: z.number().min(0).max(100).optional(),
  monthlyRent: z.number().min(0, 'Monthly rent must be positive'),
  annualPropertyTaxes: z.number().min(0, 'Annual property taxes must be positive'),
  annualInsurance: z.number().min(0, 'Annual insurance must be positive'),
  hoaFees: z.number().min(0, 'HOA fees must be positive').optional(),
  maintenanceCosts: z.number().min(0, 'Maintenance costs must be positive'),
  vacancyRate: z.number().min(0).max(100, 'Vacancy rate must be between 0-100%'),
  propertyMgmtFee: z.number().min(0).max(100, 'Property management fee must be between 0-100%'),
  
  // Financing
  loanAmount: z.number().min(0, 'Loan amount must be positive').optional(),
  interestRate: z.number().min(0).max(50, 'Interest rate must be between 0-50%').optional(),
  loanTermYears: z.number().min(1).max(50, 'Loan term must be between 1-50 years').optional(),
  downPayment: z.number().min(0, 'Down payment must be positive').optional(),
  
  // Other
  otherExpenses: z.number().min(0, 'Other expenses must be positive').optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export default function Generate() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      propertyAddress: '',
      purchasePrice: 0,
      capRate: 0,
      monthlyRent: 0,
      annualPropertyTaxes: 0,
      annualInsurance: 0,
      hoaFees: 0,
      maintenanceCosts: 0,
      vacancyRate: 5,
      propertyMgmtFee: 10,
      loanAmount: 0,
      interestRate: 0,
      loanTermYears: 30,
      downPayment: 0,
      otherExpenses: 0,
    },
  });

  const calculateMetrics = (data: PropertyFormData) => {
    const annualRent = data.monthlyRent * 12;
    const totalAnnualExpenses = 
      data.annualPropertyTaxes + 
      data.annualInsurance + 
      (data.hoaFees || 0) * 12 + 
      data.maintenanceCosts + 
      (data.otherExpenses || 0) +
      (annualRent * (data.vacancyRate / 100)) +
      (annualRent * (data.propertyMgmtFee / 100));

    const netOperatingIncome = annualRent - totalAnnualExpenses;
    
    // Calculate mortgage payment if loan details provided
    let annualDebtService = 0;
    if (data.loanAmount && data.interestRate && data.loanTermYears) {
      const monthlyRate = (data.interestRate / 100) / 12;
      const numPayments = data.loanTermYears * 12;
      const monthlyPayment = data.loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      annualDebtService = monthlyPayment * 12;
    }

    const cashFlow = netOperatingIncome - annualDebtService;
    const totalCashInvested = (data.downPayment || 0) + 5000; // Assuming $5k closing costs
    const roi = totalCashInvested > 0 ? (cashFlow / totalCashInvested) * 100 : 0;
    const calculatedCapRate = data.purchasePrice > 0 ? (netOperatingIncome / data.purchasePrice) * 100 : 0;

    return {
      netOperatingIncome,
      annualDebtService,
      cashFlow,
      roi,
      calculatedCapRate,
      totalAnnualExpenses,
    };
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (!user) {
      toast.error('Please log in to generate reports');
      return;
    }

    setIsGenerating(true);

    try {
      const metrics = calculateMetrics(data);
      
      // Save to Supabase
      const { data: report, error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          property_address: data.propertyAddress,
          address: data.propertyAddress,
          purchase_price: data.purchasePrice,
          cap_rate: data.capRate,
          monthly_rent: data.monthlyRent,
          annual_property_taxes: data.annualPropertyTaxes,
          annual_insurance: data.annualInsurance,
          hoa_fees: data.hoaFees,
          maintenance_costs: data.maintenanceCosts,
          vacancy_rate: data.vacancyRate,
          property_mgmt_fee: data.propertyMgmtFee,
          loan_amount: data.loanAmount,
          interest_rate: data.interestRate,
          loan_term_years: data.loanTermYears,
          down_payment: data.downPayment,
          other_expenses: data.otherExpenses,
          calculated_roi: metrics.roi,
          calculated_cash_flow: metrics.cashFlow,
          calculated_cap_rate: metrics.calculatedCapRate,
          title: `Property Analysis - ${data.propertyAddress}`,
          report_type: 'Investment Analysis',
          status: 'completed',
          generated_date: new Date().toISOString().split('T')[0],
          content: {
            propertyDetails: data,
            calculations: metrics,
            summary: {
              recommendation: metrics.roi > 8 ? 'Strong Investment' : metrics.roi > 5 ? 'Good Investment' : 'Consider Alternatives',
              keyMetrics: {
                'Annual Cash Flow': `$${metrics.cashFlow.toLocaleString()}`,
                'Cash-on-Cash ROI': `${metrics.roi.toFixed(2)}%`,
                'Cap Rate': `${metrics.calculatedCapRate.toFixed(2)}%`,
                'Net Operating Income': `$${metrics.netOperatingIncome.toLocaleString()}`,
              }
            }
          }
        })
        .select()
        .single();

      if (error) throw error;

      setGeneratedReport(report);
      setIsComplete(true);
      toast.success('Investment analysis completed!');

    } catch (error) {
      console.error('Report generation error:', error);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isComplete && generatedReport) {
    const content = generatedReport.content;
    const summary = content?.summary || {};
    
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Investment Analysis Complete!</h2>
                <p className="text-muted-foreground mb-6">
                  Your property investment analysis has been generated and saved.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="font-medium">{generatedReport.property_address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purchase Price:</span>
                      <span className="font-medium">${generatedReport.purchase_price?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Rent:</span>
                      <span className="font-medium">${generatedReport.monthly_rent?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recommendation:</span>
                      <span className={`font-medium ${
                        summary.recommendation === 'Strong Investment' ? 'text-green-600' :
                        summary.recommendation === 'Good Investment' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {summary.recommendation || 'No recommendation'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(summary.keyMetrics || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex space-x-4">
              <Button onClick={() => window.location.href = '/reports'} className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                View All Reports
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsComplete(false);
                  setGeneratedReport(null);
                  form.reset();
                }}
                className="flex-1"
              >
                Generate Another Report
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Property Investment Analysis</h1>
            <p className="text-muted-foreground">
              Enter detailed property information to generate a comprehensive investment analysis.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Enter the fundamental property details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="propertyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street, City, State 12345" {...field} disabled={isGenerating} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="purchasePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Purchase Price *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="250000" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Cap Rate (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              placeholder="6.5" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Income & Expenses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Income & Expenses
                  </CardTitle>
                  <CardDescription>
                    Enter rental income and operating expenses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="monthlyRent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Monthly Rent *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="2000" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="annualPropertyTaxes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Property Taxes *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="3000" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="annualInsurance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Insurance Cost *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="1200" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hoaFees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HOA Fees (Monthly)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="100" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maintenanceCosts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Maintenance Costs *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="2400" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vacancyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vacancy Rate (%) *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              placeholder="5" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="propertyMgmtFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Management Fee (%) *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              placeholder="10" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="otherExpenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Annual Expenses</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="1000" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Financing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Financing Details
                  </CardTitle>
                  <CardDescription>
                    Enter loan information if using financing (optional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="loanAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loan Amount</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="200000" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interestRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interest Rate (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              placeholder="7.5" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="loanTermYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loan Term (Years)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="30" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="downPayment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Down Payment</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="50000" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              disabled={isGenerating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating Analysis...
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5 mr-2" />
                    Generate Investment Analysis
                  </>
                )}
              </Button>

              {isGenerating && (
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Calculating ROI, cash flow, and investment metrics...
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
}
