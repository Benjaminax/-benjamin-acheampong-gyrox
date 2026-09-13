import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, TrendingUp, Dumbbell, Clock, Flame, Award } from 'lucide-react-native';

import { useTheme } from '../_layout';
import { Colors } from '../../constants/Colors';
import { mockProgressRanges, mockGoals } from '../../constants/MockData';
import { ActivityChart } from '../../components/ActivityChart';
import { GoalRow } from '../../components/GoalRow';

export default function ProgressScreen() {
  const { isDark } = useTheme();
  const theme = isDark ? Colors.dark : Colors.light;

  const [activeRange, setActiveRange] = useState<'week' | 'month' | 'year'>('week');

  const currentData = mockProgressRanges[activeRange];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Your progress</Text>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
          >
            <Calendar size={20} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Segmented Control */}
        <View style={[styles.segmented, { backgroundColor: theme.cardBorder }]}>
          {(['week', 'month', 'year'] as const).map(range => {
            const isActive = activeRange === range;
            return (
              <TouchableOpacity
                key={range}
                style={[
                  styles.segBtn,
                  isActive && [styles.segBtnActive, { backgroundColor: theme.card }],
                ]}
                onPress={() => setActiveRange(range)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.segText,
                    { color: isActive ? theme.text : theme.textSoft },
                  ]}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Distance Summary Card */}
        <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View>
            <Text style={[styles.summaryLabel, { color: theme.textSoft }]}>Total distance</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              {currentData.distance} <Text style={styles.summaryUnit}>{currentData.unit}</Text>
            </Text>
          </View>
          <View style={styles.badge}>
            <TrendingUp size={12} color="#1F7A4C" />
            <Text style={styles.badgeText}>{currentData.trend}</Text>
          </View>
        </View>

        {/* Bar Chart */}
        <ActivityChart bars={currentData.bars} height={130} isDark={isDark} />

        {/* Mini Stats Grid */}
        <View style={styles.grid2}>
          <View style={[styles.miniStat, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Dumbbell size={20} color={Colors.coral} />
            <Text style={[styles.miniNum, { color: theme.text }]}>5</Text>
            <Text style={[styles.miniLabel, { color: theme.textSoft }]}>Workouts</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Clock size={20} color={Colors.coral} />
            <Text style={[styles.miniNum, { color: theme.text }]}>3h 40m</Text>
            <Text style={[styles.miniLabel, { color: theme.textSoft }]}>Total time</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Flame size={20} color={Colors.coral} />
            <Text style={[styles.miniNum, { color: theme.text }]}>2,180</Text>
            <Text style={[styles.miniLabel, { color: theme.textSoft }]}>Calories</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Award size={20} color={Colors.coral} />
            <Text style={[styles.miniNum, { color: theme.text }]}>7 days</Text>
            <Text style={[styles.miniLabel, { color: theme.textSoft }]}>Streak</Text>
          </View>
        </View>

        {/* Goals Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Goals</Text>
        <View style={styles.goalsList}>
          {mockGoals.map(goal => (
            <GoalRow key={goal.id} goal={goal} isDark={isDark} />
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
  segmented: {
    flexDirection: 'row',
    borderRadius: 100,
    padding: 4,
    marginBottom: 16,
  },
  segBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 100,
  },
  segBtnActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  segText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  summaryUnit: {
    fontSize: 13,
    fontWeight: '600',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.sageLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  badgeText: {
    color: '#1F7A4C',
    fontSize: 11.5,
    fontWeight: '700',
  },
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 24,
  },
  miniStat: {
    width: '48%',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  miniNum: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 8,
  },
  miniLabel: {
    fontSize: 11.5,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  goalsList: {
    gap: 4,
  },
});
