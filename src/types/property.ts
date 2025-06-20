import * as z from 'zod';

export const propertySchema = z.object({
  // Basic Info
  propertyAddress: z.string().min(5, 'Property address is required'),
  purchasePrice: z.number().min(1000, 'purchase price must be at least $1,000'),
  
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

export type PropertyFormData = z.infer<typeof propertySchema>;

export interface CalculatedMetrics {
  netOperatingIncome: number;
  annualDebtService: number;
  cashFlow: number;
  roi: number;
  calculatedCapRate: number;
  totalAnnualExpenses: number;
}
