import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Switch,
  Platform
} from 'react-native';
import { useAppContext } from '../../../context/AppContext';
import { useTheme } from '../../../components/ui/ThemeProvider';
import Card from '../../../components/ui/Card';
import { User, Moon, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, theme, toggleTheme } = useAppContext();
  const { colors } = useTheme();
  
  const profileOptions = [
    {
      icon: <Bell size={20} color={colors.primary} />,
      title: 'Notifications',
      subtitle: 'Set notification preferences',
      action: () => {}
    },
    {
      icon: <Shield size={20} color={colors.primary} />,
      title: 'Security',
      subtitle: 'Manage security settings',
      action: () => {}
    },
    {
      icon: <HelpCircle size={20} color={colors.primary} />,
      title: 'Help & Support',
      subtitle: 'Get help with the app',
      action: () => {}
    }
  ];
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatarContainer, { backgroundColor: colors.primary + '20' }]}>
              <User size={40} color={colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>{user.name}</Text>
              <Text style={[styles.profileEmail, { color: colors.subtext }]}>{user.email}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.editProfileButton, { backgroundColor: colors.primary + '10' }]}
          >
            <Text style={[styles.editProfileText, { color: colors.primary }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </Card>
        
        <Card style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon size={20} color={colors.primary} />
              <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary + '70' }}
              thumbColor={theme === 'dark' ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          {profileOptions.map((option, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.settingItem}
              onPress={option.action}
            >
              <View style={styles.settingInfo}>
                {option.icon}
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    {option.title}
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: colors.subtext }]}>
                    {option.subtitle}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={colors.subtext} />
            </TouchableOpacity>
          ))}
        </Card>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.error + '10' }]}
        >
          <LogOut size={20} color={colors.error} style={styles.logoutIcon} />
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Log Out
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.versionText, { color: colors.subtext }]}>
          Version 1.0.0
        </Text>
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
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingsCard: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTextContainer: {
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
  },
});