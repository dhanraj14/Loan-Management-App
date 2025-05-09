import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Loan } from '../../types';
import Card from '../ui/Card';
import { useTheme } from '../ui/ThemeProvider';
import { formatCurrency } from '../../utils/calculations';
import { getDaysRemaining, isEmiSoonDue, isEmiOverdue } from '../../utils/dateUtils';
import { CircleAlert as AlertCircle, Calendar, Check } from 'lucide-react-native';
import Button from '../ui/Button';

interface UpcomingEMIListProps {
  loans: Loan[];
  onPressPay: (loanId: string) => void;
}

const UpcomingEMIList: React.FC<UpcomingEMIListProps> = ({ loans, onPressPay }) => {
  const { colors } = useTheme();
  
  // Sort loans by due date (closest first) and unpaid first
  const sortedLoans = [...loans].sort((a, b) => {
    // Unpaid loans come first
    if (a.isPaid !== b.isPaid) return a.isPaid ? 1 : -1;
    
    // Sort by days remaining for unpaid loans
    if (!a.isPaid && !b.isPaid) {
      const aDaysRemaining = getDaysRemaining(a.dueDay);
      const bDaysRemaining = getDaysRemaining(b.dueDay);
      return aDaysRemaining - bDaysRemaining;
    }
    
    return 0;
  });
  
  const renderItem = ({ item }: { item: Loan }) => {
    const daysRemaining = getDaysRemaining(item.dueDay);
    const isSoonDue = isEmiSoonDue(item.dueDay);
    const isOverdue = isEmiOverdue(item.dueDay, item.isPaid);
    
    const getStatusColor = () => {
      if (item.isPaid) return colors.success;
      if (isOverdue) return colors.error;
      if (isSoonDue) return colors.warning;
      return colors.primary;
    };
    
    const getStatusText = () => {
      if (item.isPaid) return 'Paid';
      if (isOverdue) return 'Overdue';
      if (isSoonDue) return `Due in ${daysRemaining} days`;
      return `Due in ${daysRemaining} days`;
    };
    
    const getStatusIcon = () => {
      if (item.isPaid) return <Check size={16} color={colors.success} />;
      if (isOverdue || isSoonDue) return <AlertCircle size={16} color={getStatusColor()} />;
      return <Calendar size={16} color={getStatusColor()} />;
    };
    
    return (
      <Card style={styles.itemCard} elevation="small">
        <View style={styles.itemHeader}>
          <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.itemAmount, { color: colors.primary }]}>
            {formatCurrency(item.emiAmount)}
          </Text>
        </View>
        
        <View style={styles.itemFooter}>
          <View style={[styles.statusContainer, { backgroundColor: getStatusColor() + '20' }]}>
            {getStatusIcon()}
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
          
          {!item.isPaid && (
            <Button
              title="Pay"
              onPress={() => onPressPay(item.id)}
              size="small"
              variant={isOverdue ? 'danger' : 'primary'}
            />
          )}
        </View>
      </Card>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Upcoming EMIs</Text>
      
      {sortedLoans.length === 0 ? (
        <Card style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.subtext }]}>
            No loans added yet. Add your first loan to track EMIs.
          </Text>
        </Card>
      ) : (
        <FlatList
          data={sortedLoans}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  itemCard: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemFooter: {
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
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default UpcomingEMIList;