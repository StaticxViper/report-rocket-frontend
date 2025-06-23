import * as z from 'zod';

export const propertySchema = z.object({
  // Basic Info
  propertyAddress: z.string().min(5, 'Property address is required'),
  purchasePrice: z.number().min(1000, 'purchase price must be at least $1,000'),
  propertyType: z.string().min(1, 'Property type is required'),
  squareFootage: z.number().min(1, 'Square footage must be positive').optional(),
  numberOfUnits: z.number().min(1, 'Number of units must be at least 1').optional(),
  yearBuilt: z.number().min(1800, 'Year built must be valid').max(new Date().getFullYear(), 'Year built cannot be in the future').optional(),
  zipCode: z.string().min(5, 'Valid zip code is required').optional(),
  
  // Income & Expenses
  capRate: z.number().min(0).max(100).optional(),
  monthlyRent: z.number().min(0, 'Monthly rent must be positive'),
  rentPerSqft: z.number().min(0, 'Rent per sqft must be positive').optional(),
  otherMonthlyIncome: z.number().min(0, 'Other monthly income must be positive').optional(),
  annualPropertyTaxes: z.number().min(0, 'Annual property taxes must be positive'),
  annualInsurance: z.number().min(0, 'Annual insurance must be positive'),
  hoaFees: z.number().min(0, 'HOA fees must be positive').optional(),
  maintenanceCosts: z.number().min(0, 'Maintenance costs must be positive'),
  maintenanceReserves: z.number().min(0, 'Maintenance reserves must be positive').optional(),
  vacancyRate: z.number().min(0).max(100, 'Vacancy rate must be between 0-100%'),
  propertyMgmtFee: z.number().min(0).max(100, 'Property management fee must be between 0-100%'),
  utilities: z.number().min(0, 'Utilities must be positive').optional(),
  
  // Financing
  loanAmount: z.number().min(0, 'Loan amount must be positive').optional(),
  interestRate: z.number().min(0).max(50, 'Interest rate must be between 0-50%').optional(),
  loanTermYears: z.number().min(1).max(50, 'Loan term must be between 1-50 years').optional(),
  downPayment: z.number().min(0, 'Down payment must be positive').optional(),
  closingCosts: z.number().min(0, 'Closing costs must be positive').optional(),
  originationFees: z.number().min(0, 'Origination fees must be positive').optional(),
  
  // Advanced Settings
  interestOnlyPeriod: z.number().min(0).max(30, 'Interest-only period must be between 0-30 years').optional(),
  isAdjustableRate: z.boolean().optional(),
  
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
  [key: string]: number; // Add index signature for Supabase Json compatibility
}
