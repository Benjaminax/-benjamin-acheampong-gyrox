import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Footprints, Droplet, Target } from 'lucide-react-native';
import { GoalItem } from '../types';
import { Colors } from '../constants/Colors';

interface GoalRowProps {
  goal: GoalItem;
  isDark?: boolean;
}

export const GoalRow: React.FC<GoalRowProps> = ({ goal, isDark = false }) => {
  const theme = isDark ? Colors.dark : Colors.light;

  const renderIcon = () => {
    switch (goal.icon) {
      case 'footprints':
        return <Footprints size={20} color={Colors.coralDark} />;
      case 'droplet':
        return <Droplet size={20} color="#1D6FA5" />;
      case 'target':
      default:
        return <Target size={20} color="#1F7A4C" />;
    }
  };

  const getBgColor = () => {
    switch (goal.color) {
      case 'coral':
        return Colors.coralLight;
      case 'sky':
        return Colors.skyLight;
      case 'sage':
      default:
        return Colors.sageLight;
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <View style={[styles.iconWrap, { backgroundColor: getBgColor() }]}>{renderIcon()}</View>
      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text style={[styles.title, { color: theme.text }]}>{goal.title}</Text>
          <Text style={[styles.ratio, { color: theme.textSoft }]}>
            {goal.currentText} / {goal.targetText}
          </Text>
        </View>
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              {
                width: `${goal.percent}%`,
                backgroundColor:
                  goal.color === 'coral'
                    ? Colors.coral
                    : goal.color === 'sky'
                    ? Colors.sky
                    : Colors.sage,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  body: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
  },
  ratio: {
    fontSize: 12,
    fontWeight: '500',
  },
  track: {
    height: 7,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 100,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 100,
  },
});
