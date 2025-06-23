
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from '@/types/property';

interface IncomeExpensesSectionProps {
  form: UseFormReturn<PropertyFormData>;
  isGenerating: boolean;
}

export function IncomeExpensesSection({ form, isGenerating }: IncomeExpensesSectionProps) {
  return (
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
      <CardContent className="space-y-6">
        {/* Income Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Income</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Rent *</FormLabel>
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
              name="rentPerSqft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent per Sq Ft</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="1.33" 
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
              name="otherMonthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Monthly Income</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="200" 
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
          </div>
        </div>

        {/* Expenses Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Expenses</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <FormLabel>Annual Insurance *</FormLabel>
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
              name="maintenanceCosts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Maintenance *</FormLabel>
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
              name="maintenanceReserves"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Reserves</FormLabel>
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
              name="propertyMgmtFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Management (%) *</FormLabel>
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
              name="utilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utilities (Monthly)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="150" 
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
        </div>
      </CardContent>
    </Card>
  );
}
