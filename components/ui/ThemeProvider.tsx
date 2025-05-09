import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeMode } from '../../types';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const lightColors = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#0D9488',
  background: '#FFFFFF',
  card: '#F9FAFB',
  text: '#1F2937',
  subtext: '#6B7280',
  border: '#E5E7EB',
  notification: '#EF4444',
  success: '#10B981',
  warning: '#FBBF24',
  error: '#EF4444',
  highlight: '#DBEAFE',
  inactive: '#9CA3AF',
};

const darkColors = {
  primary: '#60A5FA',
  secondary: '#A78BFA',
  accent: '#14B8A6',
  background: '#111827',
  card: '#1F2937',
  text: '#F9FAFB',
  subtext: '#9CA3AF',
  border: '#374151',
  notification: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  highlight: '#1E3A8A',
  inactive: '#6B7280',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(colorScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};