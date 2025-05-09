import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SalaryInfo, Loan } from '../../types';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { useTheme } from '../ui/ThemeProvider';
import { 
  calculateTotalEMI, 
  calculateRemainingBalance,
  calculateDebtToIncomeRatio,
  getFinancialHealthStatus,
  formatCurrency
} from '../../utils/calculations';

interface FinancialHealthCardProps {
  loans: Loan[];
  salary: SalaryInfo;
}

const FinancialHealthCard: React.FC<FinancialHealthCardProps> = ({ loans, salary }) => {
  const { colors } = useTheme();
  
  const totalEMI = calculateTotalEMI(loans);
  const remainingBalance = calculateRemainingBalance(salary.amount, totalEMI);
  const debtToIncomeRatio = calculateDebtToIncomeRatio(totalEMI, salary.amount);
  const healthStatus = getFinancialHealthStatus(debtToIncomeRatio);
  
  return (
    <Card>
      <Text style={[styles.title, { color: colors.text }]}>Financial Health</Text>
      
      <View style={[
        styles.statusCard, 
        { backgroundColor: healthStatus.color + '10', borderColor: healthStatus.color + '30' }
      ]}>
        <Text style={[styles.statusTitle, { color: healthStatus.color }]}>
          {healthStatus.status.toUpperCase()}
        </Text>
        <Text style={[styles.statusMessage, { color: colors.text }]}>
          {healthStatus.message}
        </Text>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressLabelContainer}>
          <Text style={[styles.progressLabel, { color: colors.text }]}>Debt-to-Income Ratio</Text>
          <Text style={[styles.progressValue, { color: healthStatus.color }]}>
            {debtToIncomeRatio.toFixed(1)}%
          </Text>
        </View>
        <ProgressBar
          progress={debtToIncomeRatio}
          height={8}
          color={healthStatus.color}
        />
      </View>
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.subtext }]}>
            Monthly Income
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {formatCurrency(salary.amount)}
          </Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.subtext }]}>
            Total EMIs
          </Text>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>
            {formatCurrency(totalEMI)}
          </Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.subtext }]}>
            Remaining Balance
          </Text>
          <Text style={[styles.summaryValue, { color: colors.success }]}>
            {formatCurrency(remainingBalance)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statusCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  statusMessage: {
    fontSize: 14,
    textAlign: 'center',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FinancialHealthCard;