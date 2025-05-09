// Types for the loan management app

export interface Loan {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  emiAmount: number;
  startDate: string;
  endDate: string;
  dueDay: number;
  isPaid: boolean;
  lastPaidDate: string | null;
}

export interface SalaryInfo {
  amount: number;
  payday: number;
}

export interface MonthlyBudget {
  month: string;
  year: number;
  salary: number;
  totalEMI: number;
  remainingBalance: number;
  isPaid: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  salary: SalaryInfo;
  loans: Loan[];
  budgets: MonthlyBudget[];
}

export type ThemeMode = 'light' | 'dark';