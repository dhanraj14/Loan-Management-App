import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../ui/Card';
import { useTheme } from '../ui/ThemeProvider';
import { SalaryInfo, Loan } from '../../types';
import { 
  formatCurrency, 
  calculateTotalEMI, 
  calculateRemainingBalance,
  calculateRecommendedSavings
} from '../../utils/calculations';

interface BudgetChartProps {
  loans: Loan[];
  salary: SalaryInfo;
}

const BudgetChart: React.FC<BudgetChartProps> = ({ loans, salary }) => {
  const { colors } = useTheme();
  
  const totalEMI = calculateTotalEMI(loans);
  const remainingBalance = calculateRemainingBalance(salary.amount, totalEMI);
  const recommendedSavings = calculateRecommendedSavings(remainingBalance);
  const disposableIncome = remainingBalance - recommendedSavings;
  
  // Calculate percentages for pie chart
  const emiPercentage = (totalEMI / salary.amount) * 100;
  const savingsPercentage = (recommendedSavings / salary.amount) * 100;
  const disposablePercentage = (disposableIncome / salary.amount) * 100;
  
  return (
    <Card style={styles.card}>
      <Text style={[styles.title, { color: colors.text }]}>Budget Allocation</Text>
      
      <View style={styles.chartContainer}>
        <View style={styles.pieChart}>
          <View 
            style={[
              styles.pieSegment, 
              { 
                backgroundColor: colors.primary,
                transform: [{ rotate: '0deg' }],
                zIndex: 3,
                width: `${emiPercentage}%`
              }
            ]} 
          />
          <View 
            style={[
              styles.pieSegment, 
              { 
                backgroundColor: colors.success,
                transform: [{ rotate: `${emiPercentage * 3.6}deg` }],
                zIndex: 2,
                width: `${savingsPercentage}%`
              }
            ]} 
          />
          <View 
            style={[
              styles.pieSegment, 
              { 
                backgroundColor: colors.secondary,
                transform: [{ rotate: `${(emiPercentage + savingsPercentage) * 3.6}deg` }],
                zIndex: 1,
                width: `${disposablePercentage}%`
              }
            ]}
          />
        </View>
      </View>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colors.primary }]} />
          <View style={styles.legendTextContainer}>
            <Text style={[styles.legendLabel, { color: colors.text }]}>Total EMIs</Text>
            <Text style={[styles.legendValue, { color: colors.primary }]}>
              {formatCurrency(totalEMI)} ({emiPercentage.toFixed(1)}%)
            </Text>
          </View>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colors.success }]} />
          <View style={styles.legendTextContainer}>
            <Text style={[styles.legendLabel, { color: colors.text }]}>Recommended Savings</Text>
            <Text style={[styles.legendValue, { color: colors.success }]}>
              {formatCurrency(recommendedSavings)} ({savingsPercentage.toFixed(1)}%)
            </Text>
          </View>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colors.secondary }]} />
          <View style={styles.legendTextContainer}>
            <Text style={[styles.legendLabel, { color: colors.text }]}>Disposable Income</Text>
            <Text style={[styles.legendValue, { color: colors.secondary }]}>
              {formatCurrency(disposableIncome)} ({disposablePercentage.toFixed(1)}%)
            </Text>
          </View>
        </View>
      </View>
      
      <View style={[
        styles.tipContainer, 
        { backgroundColor: colors.secondary + '10', borderColor: colors.secondary + '30' }
      ]}>
        <Text style={[styles.tipTitle, { color: colors.secondary }]}>
          Budget Tip
        </Text>
        <Text style={[styles.tipText, { color: colors.text }]}>
          A healthy budget allocates no more than 35% of income to loans and at least 20% to savings.
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
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    height: 200,
  },
  pieChart: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'relative',
  },
  pieSegment: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  legendContainer: {
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  legendTextContainer: {
    flex: 1,
  },
  legendLabel: {
    fontSize: 14,
  },
  legendValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  tipContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default BudgetChart;