import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Play, Dumbbell, Flame, Clock } from 'lucide-react-native';

import { useTheme } from '../_layout';
import { Colors } from '../../constants/Colors';
import { mockWorkouts } from '../../constants/MockData';

export default function WorkoutDetailModal() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { isDark } = useTheme();
  const theme = isDark ? Colors.dark : Colors.light;

  const workout = mockWorkouts.find(w => w.id === id) || mockWorkouts[0];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{workout.title}</Text>
        <TouchableOpacity
          style={[styles.closeBtn, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
          onPress={() => router.back()}
        >
          <X size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Banner Box */}
        <View style={[styles.heroBox, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.badge}>
            <Dumbbell size={12} color={Colors.coralDark} />
            <Text style={styles.badgeText}>{workout.category.toUpperCase()}</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={16} color={theme.textSoft} />
              <Text style={[styles.metaText, { color: theme.textSoft }]}>{workout.durationMinutes} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Flame size={16} color={theme.textSoft} />
              <Text style={[styles.metaText, { color: theme.textSoft }]}>{workout.caloriesBurned} kcal</Text>
            </View>
            <View style={styles.metaItem}>
              <Dumbbell size={16} color={theme.textSoft} />
              <Text style={[styles.metaText, { color: theme.textSoft }]}>{workout.exercisesCount} exercises</Text>
            </View>
          </View>
        </View>

        {/* Exercise Breakdown */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Routine Breakdown</Text>
        <View style={styles.exerciseList}>
          {workout.exercises.map((ex, index) => (
            <View
              key={ex.id}
              style={[styles.exerciseCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
            >
              <View style={styles.exIndex}>
                <Text style={styles.exIndexText}>{index + 1}</Text>
              </View>
              <View style={styles.exInfo}>
                <Text style={[styles.exName, { color: theme.text }]}>{ex.name}</Text>
                <Text style={[styles.exSets, { color: theme.textSoft }]}>
                  {ex.sets} sets &times; {ex.reps} reps
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Start Session Button */}
      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.cardBorder }]}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.replace(`/modal/active-timer?title=${encodeURIComponent(workout.title)}`)}
          activeOpacity={0.85}
        >
          <Play size={18} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.primaryBtnText}>Start Session Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  heroBox: {
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    marginBottom: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.coralLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginBottom: 12,
  },
  badgeText: {
    color: Colors.coralDark,
    fontSize: 11,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  exerciseList: {
    gap: 10,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
  },
  exIndex: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: Colors.coralLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exIndexText: {
    color: Colors.coralDark,
    fontWeight: '800',
    fontSize: 13,
  },
  exInfo: {
    flex: 1,
  },
  exName: {
    fontSize: 14,
    fontWeight: '700',
  },
  exSets: {
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  primaryBtn: {
    backgroundColor: Colors.darkBg,
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
