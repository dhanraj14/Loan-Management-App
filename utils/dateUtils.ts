/**
 * Utility functions for handling dates in the app
 */

// Get formatted date in DD/MM/YYYY format
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Get formatted date in Month YYYY format
export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric'
  });
};

// Get current month
export const getCurrentMonth = (): string => {
  return new Date().toLocaleDateString('en-GB', { month: 'long' });
};

// Get current year
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

// Get days remaining until a specific day of month
export const getDaysRemaining = (dueDay: number): number => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // If due day has passed in current month, calculate for next month
  if (dueDay < currentDay) {
    const nextMonth = new Date(currentYear, currentMonth + 1, dueDay);
    return Math.ceil((nextMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  } else {
    // Calculate days remaining in current month
    const dueDate = new Date(currentYear, currentMonth, dueDay);
    return Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }
};

// Check if EMI is due in next 5 days
export const isEmiSoonDue = (dueDay: number): boolean => {
  const daysRemaining = getDaysRemaining(dueDay);
  return daysRemaining <= 5 && daysRemaining > 0;
};

// Check if EMI is overdue
export const isEmiOverdue = (dueDay: number, isPaid: boolean): boolean => {
  if (isPaid) return false;
  
  const today = new Date();
  const currentDay = today.getDate();
  
  return currentDay > dueDay;
};

// Get all months as options
export const getMonthOptions = (): { label: string; value: number }[] => {
  return [
    { label: 'January', value: 0 },
    { label: 'February', value: 1 },
    { label: 'March', value: 2 },
    { label: 'April', value: 3 },
    { label: 'May', value: 4 },
    { label: 'June', value: 5 },
    { label: 'July', value: 6 },
    { label: 'August', value: 7 },
    { label: 'September', value: 8 },
    { label: 'October', value: 9 },
    { label: 'November', value: 10 },
    { label: 'December', value: 11 }
  ];
};