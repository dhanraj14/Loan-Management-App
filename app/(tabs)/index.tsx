import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../components/ui/ThemeProvider';
import FinancialHealthCard from '../../components/home/FinancialHealthCard';
import UpcomingEMIList from '../../components/home/UpcomingEMIList';
import { formatMonthYear } from '../../utils/dateUtils';

export default function HomeScreen() {
  const { user, markEmiAsPaid } = useAppContext();
  const { colors } = useTheme();
  
  const handlePayEMI = (loanId: string) => {
    markEmiAsPaid(loanId);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>Hello,</Text>
          <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
        </View>
        <Text style={[styles.date, { color: colors.subtext }]}>
          {formatMonthYear(new Date())}
        </Text>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <FinancialHealthCard loans={user.loans} salary={user.salary} />
        </View>
        
        <View style={styles.section}>
          <UpcomingEMIList loans={user.loans} onPressPay={handlePayEMI} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
  },
  date: {
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
});