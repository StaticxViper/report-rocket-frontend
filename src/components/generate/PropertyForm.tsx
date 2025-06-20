
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2, Calculator } from 'lucide-react';
import { PropertyFormData, propertySchema } from '@/types/property';
import { BasicInfoSection } from './BasicInfoSection';
import { IncomeExpensesSection } from './IncomeExpensesSection';
import { FinancingSection } from './FinancingSection';

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  isGenerating: boolean;
}

export function PropertyForm({ onSubmit, isGenerating }: PropertyFormProps) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfoSection form={form} isGenerating={isGenerating} />
        <IncomeExpensesSection form={form} isGenerating={isGenerating} />
        <FinancingSection form={form} isGenerating={isGenerating} />

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
  );
}
