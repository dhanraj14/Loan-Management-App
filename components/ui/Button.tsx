import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator,
  Platform
} from 'react-native';
import { useTheme } from './ThemeProvider';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { colors } = useTheme();

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? colors.inactive : colors.primary,
          borderColor: 'transparent',
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? colors.inactive : colors.secondary,
          borderColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? colors.inactive : colors.primary,
          borderWidth: 1,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
      case 'danger':
        return {
          backgroundColor: disabled ? colors.inactive : colors.error,
          borderColor: 'transparent',
        };
      default:
        return {
          backgroundColor: disabled ? colors.inactive : colors.primary,
          borderColor: 'transparent',
        };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return disabled ? colors.inactive : colors.primary;
      default:
        return ['primary', 'secondary', 'danger'].includes(variant) ? colors.background : colors.text;
    }
  };

  const getSizeStyle = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'small':
        return {
          container: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 14 },
          text: { fontSize: 14, fontFamily: 'Inter-Medium' }
        };
      case 'large':
        return {
          container: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 18 },
          text: { fontSize: 18, fontFamily: 'Inter-SemiBold' }
        };
      default:
        return {
          container: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 16 },
          text: { fontSize: 16, fontFamily: 'Inter-Medium' }
        };
    }
  };

  const sizeStyle = getSizeStyle();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        sizeStyle.container,
        fullWidth && styles.fullWidth,
        { opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              sizeStyle.text,
              { color: getTextColor() },
              icon && styles.textWithIcon,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      web: {
        cursor: 'pointer',
      },
    }),
  },
  text: {
    textAlign: 'center',
    letterSpacing: 0.35,
  },
  textWithIcon: {
    marginLeft: 8,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;