import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Platform
} from 'react-native';
import { useAppContext } from '../../../context/AppContext';
import { useTheme } from '../../../components/ui/ThemeProvider';
import SalaryInput from '../../../components/budget/SalaryInput';
import EMISummary from '../../../components/budget/EMISummary';
import BudgetChart from '../../../components/budget/BudgetChart';

export default function BudgetScreen() {
  const { user, updateSalary } = useAppContext();
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Budget Planner</Text>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <SalaryInput 
            salary={user.salary} 
            onUpdateSalary={updateSalary} 
          />
        </View>
        
        <View style={styles.section}>
          <EMISummary
            loans={user.loans}
            salary={user.salary}
          />
        </View>
        
        <View style={styles.section}>
          <BudgetChart
            loans={user.loans}
            salary={user.salary}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
});