/**
 * Utility functions for financial calculations
 */
import { Loan, SalaryInfo } from '../types';

// Calculate total EMI amount for all loans
export const calculateTotalEMI = (loans: Loan[]): number => {
  return loans.reduce((total, loan) => total + loan.emiAmount, 0);
};

// Calculate remaining balance after EMI payments
export const calculateRemainingBalance = (salary: number, totalEMI: number): number => {
  return salary - totalEMI;
};

// Calculate debt-to-income ratio (total EMI / salary)
export const calculateDebtToIncomeRatio = (totalEMI: number, salary: number): number => {
  if (salary === 0) return 0;
  return (totalEMI / salary) * 100;
};

// Get financial health status based on debt-to-income ratio
export const getFinancialHealthStatus = (ratio: number): {
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  color: string;
  message: string;
} => {
  if (ratio <= 20) {
    return {
      status: 'excellent',
      color: '#10B981', // Green
      message: 'Your debt level is well-managed!'
    };
  } else if (ratio <= 30) {
    return {
      status: 'good',
      color: '#6EE7B7', // Light Green
      message: 'Your debt level is healthy.'
    };
  } else if (ratio <= 40) {
    return {
      status: 'fair',
      color: '#FBBF24', // Yellow
      message: 'Your debt level is moderate.'
    };
  } else if (ratio <= 50) {
    return {
      status: 'poor',
      color: '#F97316', // Orange
      message: 'Your debt level is high. Consider reducing expenses.'
    };
  } else {
    return {
      status: 'critical',
      color: '#EF4444', // Red
      message: 'Your debt level is very high. Seek financial advice.'
    };
  }
};

// Calculate loan completion percentage
export const calculateLoanProgress = (totalAmount: number, remainingAmount: number): number => {
  if (totalAmount === 0) return 0;
  const paidAmount = totalAmount - remainingAmount;
  return Math.min(Math.round((paidAmount / totalAmount) * 100), 100);
};

// Calculate recommended savings (20% of remaining balance after EMI)
export const calculateRecommendedSavings = (remainingBalance: number): number => {
  return Math.round(remainingBalance * 0.2);
};

// Format currency values
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
};