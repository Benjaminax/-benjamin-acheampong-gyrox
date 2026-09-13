import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityPoint } from '../types';
import { Colors } from '../constants/Colors';

interface ActivityChartProps {
  bars: ActivityPoint[];
  height?: number;
  isDark?: boolean;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({
  bars,
  height = 100,
  isDark = false,
}) => {
  const theme = isDark ? Colors.dark : Colors.light;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <View style={[styles.barsContainer, { height }]}>
        {bars.map((bar, index) => (
          <View key={index} style={styles.trackWrapper}>
            <View
              style={[
                styles.track,
                {
                  borderColor: theme.cardBorder,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.4)',
                },
              ]}
            >
              <View
                style={[
                  styles.fill,
                  {
                    height: `${bar.heightPercent}%`,
                    backgroundColor: bar.isToday
                      ? isDark
                        ? '#FFFFFF'
                        : Colors.darkBg
                      : Colors.coral,
                  },
                ]}
              />
            </View>
            <Text style={[styles.label, { color: theme.textFaint }]}>{bar.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 16,
    paddingBottom: 28,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 8,
  },
  trackWrapper: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  track: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  fill: {
    width: '100%',
    borderRadius: 8,
  },
  label: {
    position: 'absolute',
    bottom: -20,
    fontSize: 10.5,
    fontWeight: '700',
    textAlign: 'center',
  },
});
