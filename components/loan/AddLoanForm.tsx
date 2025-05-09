import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Loan } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useTheme } from '../ui/ThemeProvider';
import { Calendar, DollarSign, Percent } from 'lucide-react-native';
import { formatDate } from '../../utils/dateUtils';

interface AddLoanFormProps {
  onSubmit: (loan: Omit<Loan, 'id'>) => void;
  onCancel: () => void;
}

const AddLoanForm: React.FC<AddLoanFormProps> = ({ onSubmit, onCancel }) => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [emiAmount, setEmiAmount] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Loan name is required';
    if (!totalAmount.trim()) newErrors.totalAmount = 'Total amount is required';
    else if (isNaN(Number(totalAmount)) || Number(totalAmount) <= 0) {
      newErrors.totalAmount = 'Enter a valid amount';
    }

    if (!interestRate.trim()) newErrors.interestRate = 'Interest rate is required';
    else if (isNaN(Number(interestRate)) || Number(interestRate) < 0) {
      newErrors.interestRate = 'Enter a valid interest rate';
    }

    if (!emiAmount.trim()) newErrors.emiAmount = 'EMI amount is required';
    else if (isNaN(Number(emiAmount)) || Number(emiAmount) <= 0) {
      newErrors.emiAmount = 'Enter a valid EMI amount';
    }

    if (!dueDay.trim()) newErrors.dueDay = 'Due day is required';
    else if (isNaN(Number(dueDay)) || Number(dueDay) < 1 || Number(dueDay) > 31) {
      newErrors.dueDay = 'Enter a valid day (1-31)';
    }

    if (!startDate.trim()) newErrors.startDate = 'Start date is required';
    if (!endDate.trim()) newErrors.endDate = 'End date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newLoan: Omit<Loan, 'id'> = {
        name,
        totalAmount: Number(totalAmount),
        remainingAmount: Number(totalAmount),
        interestRate: Number(interestRate),
        emiAmount: Number(emiAmount),
        dueDay: Number(dueDay),
        startDate,
        endDate,
        isPaid: false,
        lastPaidDate: null,
      };

      onSubmit(newLoan);
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text }]}>Add New Loan</Text>
      
      <Input
        label="Loan Name"
        placeholder="e.g., Home Loan, Car Loan"
        value={name}
        onChangeText={setName}
        error={errors.name}
        autoCapitalize="words"
      />
      
      <Input
        label="Loan Amount"
        placeholder="e.g., 500000"
        value={totalAmount}
        onChangeText={setTotalAmount}
        keyboardType="numeric"
        error={errors.totalAmount}
        leftIcon={<DollarSign size={20} color={colors.subtext} />}
      />
      
      <Input
        label="Interest Rate (%)"
        placeholder="e.g., 7.5"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="decimal-pad"
        error={errors.interestRate}
        leftIcon={<Percent size={20} color={colors.subtext} />}
      />
      
      <Input
        label="EMI Amount"
        placeholder="e.g., 15000"
        value={emiAmount}
        onChangeText={setEmiAmount}
        keyboardType="numeric"
        error={errors.emiAmount}
        leftIcon={<DollarSign size={20} color={colors.subtext} />}
      />
      
      <Input
        label="EMI Due Day"
        placeholder="e.g., 15"
        value={dueDay}
        onChangeText={setDueDay}
        keyboardType="numeric"
        error={errors.dueDay}
        hint="Day of the month when EMI is due (1-31)"
      />
      
      <Input
        label="Start Date"
        placeholder="DD/MM/YYYY"
        value={startDate}
        onChangeText={setStartDate}
        error={errors.startDate}
        leftIcon={<Calendar size={20} color={colors.subtext} />}
      />
      
      <Input
        label="End Date"
        placeholder="DD/MM/YYYY"
        value={endDate}
        onChangeText={setEndDate}
        error={errors.endDate}
        leftIcon={<Calendar size={20} color={colors.subtext} />}
      />
      
      <View style={styles.buttonsContainer}>
        <Button 
          title="Cancel" 
          onPress={onCancel} 
          variant="outline" 
          style={styles.cancelButton}
        />
        <Button 
          title="Add Loan" 
          onPress={handleSubmit} 
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default AddLoanForm;