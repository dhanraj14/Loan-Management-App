import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Loan, SalaryInfo } from '../../types';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { useTheme } from '../ui/ThemeProvider';
import { 
  formatCurrency, 
  calculateTotalEMI, 
  calculateRemainingBalance,
  calculateDebtToIncomeRatio,
  getFinancialHealthStatus,
  calculateRecommendedSavings
} from '../../utils/calculations';

interface EMISummaryProps {
  loans: Loan[];
  salary: SalaryInfo;
}

const EMISummary: React.FC<EMISummaryProps> = ({ loans, salary }) => {
  const { colors } = useTheme();
  
  const totalEMI = calculateTotalEMI(loans);
  const remainingBalance = calculateRemainingBalance(salary.amount, totalEMI);
  const debtToIncomeRatio = calculateDebtToIncomeRatio(totalEMI, salary.amount);
  const healthStatus = getFinancialHealthStatus(debtToIncomeRatio);
  const recommendedSavings = calculateRecommendedSavings(remainingBalance);
  
  return (
    <Card style={styles.card}>
      <Text style={[styles.title, { color: colors.text }]}>Financial Summary</Text>
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.subtext }]}>Total Monthly EMI</Text>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>
            {formatCurrency(totalEMI)}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.subtext }]}>Remaining Balance</Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {formatCurrency(remainingBalance)}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.subtext }]}>Debt-to-Income Ratio</Text>
          <Text style={[styles.summaryValue, { color: healthStatus.color }]}>
            {debtToIncomeRatio.toFixed(1)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressLabelContainer}>
          <Text style={[styles.progressLabel, { color: colors.text }]}>Debt-to-Income Ratio</Text>
          <Text style={[styles.healthStatus, { color: healthStatus.color }]}>
            {healthStatus.status.charAt(0).toUpperCase() + healthStatus.status.slice(1)}
          </Text>
        </View>
        <ProgressBar
          progress={debtToIncomeRatio}
          height={8}
          color={healthStatus.color}
        />
        <Text style={[styles.healthMessage, { color: healthStatus.color }]}>
          {healthStatus.message}
        </Text>
      </View>
      
      <View style={[
        styles.recommendationContainer, 
        { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }
      ]}>
        <Text style={[styles.recommendationTitle, { color: colors.primary }]}>
          Recommended Action
        </Text>
        <Text style={[styles.recommendationText, { color: colors.text }]}>
          After paying all EMIs, you should save at least {formatCurrency(recommendedSavings)} per month for emergencies and future goals.
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  healthStatus: {
    fontSize: 14,
    fontWeight: '700',
  },
  healthMessage: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  recommendationContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default EMISummary;