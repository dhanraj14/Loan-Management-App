import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useTheme } from './ThemeProvider';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  radius?: 'none' | 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 'medium',
  padding = 'medium',
  radius = 'medium',
}) => {
  const { colors, theme } = useTheme();

  const getElevationStyle = (): ViewStyle => {
    const isDark = theme === 'dark';
    
    if (Platform.OS === 'ios') {
      switch (elevation) {
        case 'none':
          return {};
        case 'small':
          return {
            shadowColor: isDark ? '#000' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDark ? 0.25 : 0.15,
            shadowRadius: 4,
          };
        case 'large':
          return {
            shadowColor: isDark ? '#000' : '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDark ? 0.35 : 0.25,
            shadowRadius: 12,
          };
        case 'medium':
        default:
          return {
            shadowColor: isDark ? '#000' : '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: isDark ? 0.3 : 0.2,
            shadowRadius: 8,
          };
      }
    } else {
      switch (elevation) {
        case 'none':
          return {};
        case 'small':
          return { elevation: 2 };
        case 'large':
          return { elevation: 8 };
        case 'medium':
        default:
          return { elevation: 4 };
      }
    }
  };

  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: 12 };
      case 'large':
        return { padding: 24 };
      case 'medium':
      default:
        return { padding: 16 };
    }
  };

  const getRadiusStyle = (): ViewStyle => {
    switch (radius) {
      case 'none':
        return { borderRadius: 0 };
      case 'small':
        return { borderRadius: 10 };
      case 'large':
        return { borderRadius: 20 };
      case 'medium':
      default:
        return { borderRadius: 14 };
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card },
        getElevationStyle(),
        getPaddingStyle(),
        getRadiusStyle(),
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    overflow: 'hidden',
  },
});

export default Card;