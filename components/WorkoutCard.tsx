import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dumbbell, Footprints, Heart, Target, ChevronRight, Play } from 'lucide-react-native';
import { Workout } from '../types';
import { Colors } from '../constants/Colors';

interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
  isDark?: boolean;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onPress, isDark = false }) => {
  const theme = isDark ? Colors.dark : Colors.light;

  const renderIcon = () => {
    switch (workout.category) {
      case 'strength':
        return <Dumbbell size={20} color={Colors.coralDark} />;
      case 'cardio':
        return <Footprints size={20} color="#B5730A" />;
      case 'yoga':
        return <Heart size={20} color="#1F7A4C" />;
      case 'mobility':
      default:
        return <Target size={20} color="#1D6FA5" />;
    }
  };

  const getBgColor = () => {
    switch (workout.category) {
      case 'strength':
        return Colors.coralLight;
      case 'cardio':
        return Colors.amberLight;
      case 'yoga':
        return Colors.sageLight;
      case 'mobility':
      default:
        return Colors.skyLight;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.row, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconWrap, { backgroundColor: getBgColor() }]}>{renderIcon()}</View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]}>{workout.title}</Text>
        <Text style={[styles.meta, { color: theme.textSoft }]}>
          {workout.durationMinutes} min &middot; {workout.caloriesBurned} kcal
        </Text>
      </View>
      <ChevronRight size={18} color={theme.textFaint} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  meta: {
    fontSize: 12,
    marginTop: 3,
  },
});
