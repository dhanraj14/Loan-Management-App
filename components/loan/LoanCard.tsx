import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Loan } from '../../types';
import Card from '../ui/Card';
import ProgressBar from '../UI/ProgressBar';
import { useTheme } from '../ui/ThemeProvider';
import { formatCurrency, calculateLoanProgress } from '../../utils/calculations';
import { getDaysRemaining, isEmiSoonDue, isEmiOverdue } from '../../utils/dateUtils';
import { CircleAlert as AlertCircle, Check, ExternalLink } from 'lucide-react-native';

interface LoanCardProps {
  loan: Loan;
  onPressPay: () => void;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onPressPay }) => {
  const router = useRouter();
  const { colors } = useTheme();
  
  const progress = calculateLoanProgress(loan.totalAmount, loan.remainingAmount);
  const daysRemaining = getDaysRemaining(loan.dueDay);
  const isSoonDue = isEmiSoonDue(loan.dueDay);
  const isOverdue = isEmiOverdue(loan.dueDay, loan.isPaid);

  const getStatusColor = () => {
    if (loan.isPaid) return colors.success;
    if (isOverdue) return colors.error;
    if (isSoonDue) return colors.warning;
    return colors.primary;
  };
  
  const getStatusText = () => {
    if (loan.isPaid) return 'Paid for this month';
    if (isOverdue) return 'Overdue';
    if (isSoonDue) return `Due in ${daysRemaining} days`;
    return `Due in ${daysRemaining} days`;
  };

  const handleViewDetails = () => {
    router.push(`/loans/${loan.id}`);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.text }]}>{loan.name}</Text>
        <TouchableOpacity onPress={handleViewDetails}>
          <ExternalLink size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.amountsContainer}>
        <View style={styles.amountItem}>
          <Text style={[styles.amountLabel, { color: colors.subtext }]}>Total Amount</Text>
          <Text style={[styles.amountValue, { color: colors.text }]}>
            {formatCurrency(loan.totalAmount)}
          </Text>
        </View>
        
        <View style={styles.amountItem}>
          <Text style={[styles.amountLabel, { color: colors.subtext }]}>EMI</Text>
          <Text style={[styles.amountValue, { color: colors.primary, fontWeight: '700' }]}>
            {formatCurrency(loan.emiAmount)}
          </Text>
        </View>
        
        <View style={styles.amountItem}>
          <Text style={[styles.amountLabel, { color: colors.subtext }]}>Interest</Text>
          <Text style={[styles.amountValue, { color: colors.text }]}>
            {loan.interestRate}%
          </Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <ProgressBar 
          progress={progress}
          height={6}
          label="Repayment Progress"
          showPercentage
        />
      </View>
      
      <View style={styles.footer}>
        <View style={[styles.statusContainer, { backgroundColor: getStatusColor() + '20' }]}>
          {loan.isPaid ? (
            <Check size={16} color={colors.success} />
          ) : isOverdue || isSoonDue ? (
            <AlertCircle size={16} color={getStatusColor()} />
          ) : null}
          <Text style={[
            styles.statusText, 
            { color: getStatusColor(), marginLeft: (loan.isPaid || isOverdue || isSoonDue) ? 4 : 0 }
          ]}>
            {getStatusText()}
          </Text>
        </View>
        
        {!loan.isPaid && (
          <TouchableOpacity 
            style={[styles.payButton, { backgroundColor: colors.primary }]}
            onPress={onPressPay}
          >
            <Text style={[styles.payButtonText, { color: colors.background }]}>Pay Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  amountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountItem: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  payButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  payButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoanCard;