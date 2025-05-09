import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Loan, SalaryInfo, User, ThemeMode, MonthlyBudget } from '../types';
import { getCurrentMonth, getCurrentYear } from '../utils/dateUtils';
import { calculateTotalEMI, calculateRemainingBalance } from '../utils/calculations';

// Mock initial data
const initialLoans: Loan[] = [
  {
    id: '1',
    name: 'Home Loan',
    totalAmount: 2500000,
    remainingAmount: 2200000,
    interestRate: 7.5,
    emiAmount: 22000,
    startDate: '2023-01-15',
    endDate: '2033-01-15',
    dueDay: 15,
    isPaid: false,
    lastPaidDate: null
  },
  {
    id: '2',
    name: 'Car Loan',
    totalAmount: 800000,
    remainingAmount: 600000,
    interestRate: 8.5,
    emiAmount: 15000,
    startDate: '2023-03-10',
    endDate: '2028-03-10',
    dueDay: 10,
    isPaid: true,
    lastPaidDate: '2023-05-10'
  }
];

const initialSalary: SalaryInfo = {
  amount: 85000,
  payday: 1
};

const initialUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  salary: initialSalary,
  loans: initialLoans,
  budgets: []
};

interface AppContextType {
  user: User;
  theme: ThemeMode;
  toggleTheme: () => void;
  addLoan: (loan: Omit<Loan, 'id'>) => void;
  updateLoan: (id: string, loan: Partial<Loan>) => void;
  deleteLoan: (id: string) => void;
  updateSalary: (salary: SalaryInfo) => void;
  markEmiAsPaid: (loanId: string) => void;
  generateMonthlyBudget: () => MonthlyBudget;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Generate initial monthly budget when app loads
  useEffect(() => {
    const totalEMI = calculateTotalEMI(user.loans);
    const remainingBalance = calculateRemainingBalance(user.salary.amount, totalEMI);
    
    const currentBudget: MonthlyBudget = {
      month: getCurrentMonth(),
      year: getCurrentYear(),
      salary: user.salary.amount,
      totalEMI,
      remainingBalance,
      isPaid: false
    };
    
    if (!user.budgets.some(budget => budget.month === currentBudget.month && budget.year === currentBudget.year)) {
      setUser(prev => ({
        ...prev,
        budgets: [...prev.budgets, currentBudget]
      }));
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Add new loan
  const addLoan = (loan: Omit<Loan, 'id'>) => {
    const newLoan: Loan = {
      ...loan,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    setUser(prev => ({
      ...prev,
      loans: [...prev.loans, newLoan]
    }));
  };

  // Update loan
  const updateLoan = (id: string, loan: Partial<Loan>) => {
    setUser(prev => ({
      ...prev,
      loans: prev.loans.map(item => 
        item.id === id ? { ...item, ...loan } : item
      )
    }));
  };

  // Delete loan
  const deleteLoan = (id: string) => {
    setUser(prev => ({
      ...prev,
      loans: prev.loans.filter(loan => loan.id !== id)
    }));
  };

  // Update salary
  const updateSalary = (salary: SalaryInfo) => {
    setUser(prev => ({
      ...prev,
      salary
    }));
  };

  // Mark EMI as paid
  const markEmiAsPaid = (loanId: string) => {
    setUser(prev => ({
      ...prev,
      loans: prev.loans.map(loan => 
        loan.id === loanId 
          ? { 
              ...loan, 
              isPaid: true, 
              lastPaidDate: new Date().toISOString().split('T')[0]
            } 
          : loan
      )
    }));
  };

  // Generate monthly budget
  const generateMonthlyBudget = (): MonthlyBudget => {
    const totalEMI = calculateTotalEMI(user.loans);
    const remainingBalance = calculateRemainingBalance(user.salary.amount, totalEMI);
    
    return {
      month: getCurrentMonth(),
      year: getCurrentYear(),
      salary: user.salary.amount,
      totalEMI,
      remainingBalance,
      isPaid: false
    };
  };

  return (
    <AppContext.Provider
      value={{
        user,
        theme,
        toggleTheme,
        addLoan,
        updateLoan,
        deleteLoan,
        updateSalary,
        markEmiAsPaid,
        generateMonthlyBudget
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};