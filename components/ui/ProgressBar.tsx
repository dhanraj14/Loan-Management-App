import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { useTheme } from './ThemeProvider';

interface ProgressBarProps {
  progress: number;
  height?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  style?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  label,
  showPercentage = false,
  color,
  style,
}) => {
  const { colors } = useTheme();
  const progressColor = color || colors.primary;
  
  // Ensure progress is between 0 and 100
  const sanitizedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <View style={[styles.container, style]}>
      {(label || showPercentage) && (
        <View style={styles.labelContainer}>
          {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
          {showPercentage && (
            <Text style={[styles.percentage, { color: colors.text }]}>
              {sanitizedProgress}%
            </Text>
          )}
        </View>
      )}
      <View style={[styles.track, { backgroundColor: colors.border, height }]}>
        <View
          style={[
            styles.progress,
            { 
              width: `${sanitizedProgress}%`,
              backgroundColor: progressColor,
              height
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 14,
    fontWeight: '500',
  },
  track: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 4,
  },
});

export default ProgressBar;