import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Clock, Play } from 'lucide-react-native';

import { useTheme } from '../_layout';
import { Colors } from '../../constants/Colors';
import { mockWorkouts } from '../../constants/MockData';
import { CategoryType } from '../../types';
import { WorkoutCard } from '../../components/WorkoutCard';

export default function WorkoutsScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = isDark ? Colors.dark : Colors.light;

  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const categories: { label: string; key: CategoryType }[] = [
    { label: 'All', key: 'all' },
    { label: 'Strength', key: 'strength' },
    { label: 'Cardio', key: 'cardio' },
    { label: 'Yoga', key: 'yoga' },
    { label: 'Mobility', key: 'mobility' },
  ];

  const featuredWorkout = mockWorkouts.find(w => w.featured) || mockWorkouts[0];

  const filteredWorkouts = mockWorkouts.filter(
    w => activeCategory === 'all' || w.category === activeCategory
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Workouts</Text>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
          >
            <Search size={20} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Category Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {categories.map(cat => {
            const isActive = activeCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive ? theme.cardDark : theme.card,
                    borderColor: isActive ? theme.cardDark : theme.cardBorder,
                  },
                ]}
                onPress={() => setActiveCategory(cat.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: isActive ? theme.cardDarkText : theme.textSoft },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Nike Athlete Cardio Featured Card */}
        <TouchableOpacity
          style={styles.featuredCard}
          onPress={() => router.push(`/modal/workout-detail?id=${featuredWorkout.id}`)}
          activeOpacity={0.88}
        >
          <ImageBackground
            source={require('../../assets/cardio_hero.jpg')}
            style={styles.featuredBg}
            imageStyle={{ borderRadius: 28 }}
          >
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredTopRow}>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>RECOMMENDED PRO ROUTINE</Text>
                </View>
                <View style={styles.featuredPlayBtn}>
                  <Play size={16} color={Colors.darkBg} fill={Colors.darkBg} />
                </View>
              </View>
              <Text style={styles.featuredTitle}>FULL BODY SPRINT BURN</Text>
              <View style={styles.featuredMeta}>
                <Clock size={14} color="rgba(255,255,255,0.85)" />
                <Text style={styles.featuredMetaText}>
                  45 MIN &middot; INTERMEDIATE ATHLETE
                </Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Catalog List */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Routine Catalog</Text>
        <View style={styles.workoutList}>
          {filteredWorkouts.map(workout => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              isDark={isDark}
              onPress={() => router.push(`/modal/workout-detail?id=${workout.id}`)}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsContainer: {
    gap: 8,
    paddingBottom: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  featuredCard: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  featuredBg: {
    width: '100%',
    height: 180,
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 12, 18, 0.65)',
    padding: 18,
    justifyContent: 'flex-end',
  },
  featuredTopRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredBadge: {
    backgroundColor: Colors.sage,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 4,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredMetaText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '700',
  },
  featuredPlayBtn: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  workoutList: {
    gap: 4,
  },
});
