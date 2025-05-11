import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Modal,
  Platform
} from 'react-native';
import { useAppContext } from '../../../context/AppContext';
import { useTheme } from '../../../components/ui/ThemeProvider';
import LoanCard from '../../../components/loan/LoanCard';
import AddLoanForm from '../../../components/loan/AddLoanForm';
import { Plus, X } from 'lucide-react-native';
import { Loan } from '../../../types'; // Adjust the path to where Loan is defined

export default function LoansScreen() {
  const { user, addLoan, markEmiAsPaid } = useAppContext();
  const { colors } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  
  const handlePayEMI = (loanId: string) => {
    markEmiAsPaid(loanId);
  };
  
  const handleAddLoan = (loan: Omit<Loan, 'id'>) => {
    addLoan(loan);
    setShowAddModal(false);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Loans</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {user.loans.length === 0 ? (
          <View style={[styles.emptyContainer, { borderColor: colors.border }]}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Loans Added
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.subtext }]}>
              Add your first loan to start tracking EMIs
            </Text>
            <TouchableOpacity 
              style={[styles.emptyAddButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={[styles.emptyAddButtonText, { color: 'white' }]}>
                Add Loan
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          user.loans.map(loan => (
            <LoanCard 
              key={loan.id} 
              loan={loan} 
              onPressPay={() => handlePayEMI(loan.id)} 
            />
          ))
        )}
      </ScrollView>
      
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setShowAddModal(false)}
              style={styles.closeButton}
            >
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <AddLoanForm 
            onSubmit={handleAddLoan} 
            onCancel={() => setShowAddModal(false)} 
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    marginTop: 40,
    padding: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyAddButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyAddButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    padding: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
});