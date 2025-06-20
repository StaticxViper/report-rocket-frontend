
import { PropertyFormData, CalculatedMetrics } from '@/types/property';

export const calculateMetrics = (data: PropertyFormData): CalculatedMetrics => {
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
