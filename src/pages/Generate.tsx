
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { PropertyFormData } from '@/types/property';
import { calculateMetrics } from '@/utils/propertyCalculations';
import { PropertyForm } from '@/components/generate/PropertyForm';
import { ReportResults } from '@/components/generate/ReportResults';
import { PaymentModal } from '@/components/PaymentModal';

export default function Generate() {
  const { user, isTrialActive, hasActiveSubscription, userProfile } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<PropertyFormData | null>(null);

  // Check for success/cancel parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');

    if (success === 'true') {
      toast.success('Payment successful! Your subscription is now active.');
      // Refresh subscription status
      refreshSubscriptionStatus();
      // Clear URL parameters
      window.history.replaceState({}, '', '/generate');
    } else if (canceled === 'true') {
      toast.info('Payment was canceled.');
      // Clear URL parameters
      window.history.replaceState({}, '', '/generate');
    }
  }, []);

  const refreshSubscriptionStatus = async () => {
    try {
      await supabase.functions.invoke('check-subscription');
      // The auth context will be updated automatically
    } catch (error) {
      console.error('Error refreshing subscription status:', error);
    }
  };

  const checkAccessAndGenerate = async (data: PropertyFormData) => {
    if (!user) {
      toast.error('Please log in to generate reports');
      return;
    }

    // Check if user has access (active trial or subscription)
    const trialActive = await isTrialActive();
    const hasSubscription = await hasActiveSubscription();

    if (trialActive || hasSubscription) {
      // User has access, generate report
      generateReport(data);
    } else {
      // User needs to pay, show payment modal
      setPendingFormData(data);
      setShowPaymentModal(true);
    }
  };

  const generateReport = async (data: PropertyFormData) => {
    setIsGenerating(true);

    try {
      const metrics = calculateMetrics(data);
      
      // Save to Supabase
      const { data: report, error } = await supabase
        .from('reports')
        .insert({
          user_id: user!.id,
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

      // Update user's report count
      if (userProfile) {
        await supabase
          .from('profiles')
          .update({
            reports_generated: (userProfile.reports_generated || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', user!.id);
      }

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

  const handlePaymentComplete = () => {
    if (pendingFormData) {
      // Refresh subscription status first
      refreshSubscriptionStatus();
      // Generate report after a short delay to allow subscription status to update
      setTimeout(() => {
        generateReport(pendingFormData);
        setPendingFormData(null);
      }, 2000);
    }
  };

  const handleViewAllReports = () => {
    window.location.href = '/reports';
  };

  const handleGenerateAnother = () => {
    setIsComplete(false);
    setGeneratedReport(null);
  };

  if (isComplete && generatedReport) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <ReportResults 
            generatedReport={generatedReport}
            onViewAllReports={handleViewAllReports}
            onGenerateAnother={handleGenerateAnother}
          />
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

          <PropertyForm onSubmit={checkAccessAndGenerate} isGenerating={isGenerating} />
        </div>

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    </DashboardLayout>
  );
}
