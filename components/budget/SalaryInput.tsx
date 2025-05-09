import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SalaryInfo } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useTheme } from '../ui/ThemeProvider';
import { DollarSign, CreditCard as Edit2 } from 'lucide-react-native';
import { formatCurrency } from '../../utils/calculations';

interface SalaryInputProps {
  salary: SalaryInfo;
  onUpdateSalary: (salary: SalaryInfo) => void;
}

const SalaryInput: React.FC<SalaryInputProps> = ({ salary, onUpdateSalary }) => {
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(salary.amount.toString());
  const [payday, setPayday] = useState(salary.payday.toString());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!amount.trim()) newErrors.amount = 'Salary amount is required';
    else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Enter a valid amount';
    }

    if (!payday.trim()) newErrors.payday = 'Payday is required';
    else if (isNaN(Number(payday)) || Number(payday) < 1 || Number(payday) > 31) {
      newErrors.payday = 'Enter a valid day (1-31)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onUpdateSalary({
        amount: Number(amount),
        payday: Number(payday),
      });
      setIsEditing(false);
    }
  };

  return (
    <Card style={styles.card}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Update Your Salary</Text>
          
          <Input
            label="Monthly Salary"
            placeholder="e.g., 50000"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            error={errors.amount}
            leftIcon={<DollarSign size={20} color={colors.subtext} />}
          />
          
          <Input
            label="Salary Payday"
            placeholder="e.g., 1"
            value={payday}
            onChangeText={setPayday}
            keyboardType="numeric"
            error={errors.payday}
            hint="Day of the month when you receive your salary (1-31)"
          />
          
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={() => setIsEditing(false)}
              variant="outline"
              style={styles.cancelButton}
            />
            <Button
              title="Save"
              onPress={handleSubmit}
              style={styles.saveButton}
            />
          </View>
        </View>
      ) : (
        <View style={styles.displayContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Monthly Income</Text>
            <TouchableOpacity 
              onPress={() => setIsEditing(true)}
              style={[styles.editButton, { backgroundColor: colors.primary + '20' }]}
            >
              <Edit2 size={16} color={colors.primary} />
              <Text style={[styles.editText, { color: colors.primary }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.salaryAmount, { color: colors.text }]}>
            {formatCurrency(salary.amount)}
          </Text>
          
          <Text style={[styles.paydayText, { color: colors.subtext }]}>
            Received on day {salary.payday} of each month
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  editContainer: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
  displayContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  salaryAmount: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  paydayText: {
    fontSize: 14,
  },
});

export default SalaryInput;