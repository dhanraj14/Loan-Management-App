import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '../../components/ui/ThemeProvider';
import { Chrome as Home, FileDown as FileDollar, Wallet, User } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  const { colors } = useTheme();
  
  const getTabBarIcon = (
    name: 'home' | 'loans' | 'budget' | 'profile', 
    focused: boolean
  ) => {
    const color = focused ? colors.primary : colors.inactive;
    const size = 24;
    
    switch (name) {
      case 'home':
        return <Home size={size} color={color} />;
      case 'loans':
        return <FileDollar size={size} color={color} />;
      case 'budget':
        return <Wallet size={size} color={color} />;
      case 'profile':
        return <User size={size} color={color} />;
    }
  };
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: { 
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: styles.tabLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => getTabBarIcon('home', focused),
        }}
      />
      
      <Tabs.Screen
        name="loans"
        options={{
          title: 'Loans',
          tabBarIcon: ({ focused }) => getTabBarIcon('loans', focused),
        }}
      />
      
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
          tabBarIcon: ({ focused }) => getTabBarIcon('budget', focused),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => getTabBarIcon('profile', focused),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});