import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Loan } from '../../types';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import { useTheme } from '../ui/ThemeProvider';
import { 
  formatCurrency, 
  calculateLoanProgress 
} from '../../utils/calculations';
import { formatDate } from '../../utils/dateUtils';
import { Calendar, Check, Wallet } from 'lucide-react-native';

interface LoanDetailsCardProps {
  loan: Loan;
  onPressPay: () => void;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

const LoanDetailsCard: React.FC<LoanDetailsCardProps> = ({ 
  loan,
  onPressPay,
  onPressEdit,
  onPressDelete
}) => {
  const { colors } = useTheme();
  const progress = calculateLoanProgress(loan.totalAmount, loan.remainingAmount);
  
  return (
    <Card style={styles.card} elevation="large">
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.text }]}>{loan.name}</Text>
        <View style={[
          styles.statusContainer, 
          { backgroundColor: loan.isPaid ? colors.success + '20' : colors.primary + '20' }
        ]}>
          {loan.isPaid && <Check size={16} color={colors.success} style={styles.statusIcon} />}
          <Text style={{ 
            color: loan.isPaid ? colors.success : colors.primary,
            fontWeight: '500'
          }}>
            {loan.isPaid ? 'Paid for this month' : 'Payment Due'}
          </Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <ProgressBar 
          progress={progress}
          height={8}
          label="Repayment Progress"
          showPercentage
        />
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.subtext }]}>Total Amount</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {formatCurrency(loan.totalAmount)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.subtext }]}>Remaining Amount</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {formatCurrency(loan.remainingAmount)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.subtext }]}>Monthly EMI</Text>
          <Text style={[styles.detailValue, { color: colors.primary, fontWeight: '700' }]}>
            {formatCurrency(loan.emiAmount)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.subtext }]}>Interest Rate</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {loan.interestRate}%
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.subtext }]}>EMI Due Date</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {loan.dueDay.toString()}th of every month
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.subtext }]}>Loan Start Date</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {loan.startDate}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.subtext }]}>Loan End Date</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {loan.endDate}
          </Text>
        </View>
        
        {loan.lastPaidDate && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.subtext }]}>Last Payment</Text>
            <Text style={[styles.detailValue, { color: colors.success }]}>
              {formatDate(new Date(loan.lastPaidDate))}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.actionContainer}>
        {!loan.isPaid && (
          <Button
            title="Pay EMI"
            onPress={onPressPay}
            icon={<Wallet size={20} color="white" />}
            style={styles.payButton}
          />
        )}
        
        <View style={styles.secondaryActionsContainer}>
          <Button
            title="Edit"
            onPress={onPressEdit}
            variant="outline"
            style={styles.editButton}
          />
          <Button
            title="Delete"
            onPress={onPressDelete}
            variant="danger"
            style={styles.deleteButton}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  statusIcon: {
    marginRight: 4,
  },
  progressSection: {
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionContainer: {
    gap: 16,
  },
  payButton: {
    marginBottom: 8,
  },
  secondaryActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default LoanDetailsCard;