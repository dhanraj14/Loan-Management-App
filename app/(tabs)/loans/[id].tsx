import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useAppContext } from '../../../context/AppContext';
import { useTheme } from '../../../components/ui/ThemeProvider';
import LoanDetailsCard from '../../../components/loan/LoanDetailsCard';
import { ArrowLeft } from 'lucide-react-native';

export default function LoanDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user, markEmiAsPaid, updateLoan, deleteLoan } = useAppContext();
  const { colors } = useTheme();
  
  const loan = user.loans.find(loan => loan.id === id);
  
  if (!loan) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Loan Details</Text>
          <View style={styles.placeholder} />
        </View>
        
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundText, { color: colors.text }]}>
            Loan not found
          </Text>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={[styles.backToLoansButton, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.backToLoansText, { color: 'white' }]}>
              Back to Loans
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const handlePayEMI = () => {
    markEmiAsPaid(loan.id);
  };
  
  const handleEdit = () => {
    // In a real app, would open edit form
    Alert.alert('Edit Loan', 'Edit functionality would be implemented here');
  };
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Loan',
      `Are you sure you want to delete ${loan.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteLoan(loan.id);
            router.back();
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Loan Details</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LoanDetailsCard
          loan={loan}
          onPressPay={handlePayEMI}
          onPressEdit={handleEdit}
          onPressDelete={handleDelete}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  backToLoansButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backToLoansText: {
    fontSize: 16,
    fontWeight: '600',
  },
});