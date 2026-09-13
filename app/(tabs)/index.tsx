import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Footprints, Flame, Droplet, ChevronRight, TrendingUp, Play, Clock } from 'lucide-react-native';

import { useTheme } from '../_layout';
import { Colors } from '../../constants/Colors';
import { initialProfile, mockProgressRanges } from '../../constants/MockData';
import { ProgressRing } from '../../components/ProgressRing';
import { StatCard } from '../../components/StatCard';
import { ActivityChart } from '../../components/ActivityChart';

export default function HomeScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = isDark ? Colors.dark : Colors.light;

  const [profile, setProfile] = useState(initialProfile);

  const handleAddWater = () => {
    const newWater = parseFloat((profile.waterLiters + 0.25).toFixed(2));
    const newPercent = Math.min(100, profile.dailyGoalPercent + 4);
    setProfile(prev => ({
      ...prev,
      waterLiters: newWater,
      dailyGoalPercent: newPercent,
    }));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* User Header */}
        <View style={styles.header}>
          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.initials}</Text>
            </View>
            <View>
              <Text style={[styles.eyebrow, { color: theme.textSoft }]}>Good morning</Text>
              <Text style={[styles.userName, { color: theme.text }]}>{profile.name}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
            onPress={() => Alert.alert('Notifications', '🔥 You reached your 7-day streak target!')}
          >
            <Bell size={20} color={theme.text} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Hero Goal Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroLabel}>Today's goal</Text>
              <Text style={styles.heroValue}>
                {profile.dailyGoalPercent}
                <Text style={styles.heroPercent}>%</Text>
              </Text>
              <Text style={styles.heroSub}>Keep going, almost there!</Text>
            </View>
            <ProgressRing percentage={profile.dailyGoalPercent} />
          </View>
          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatItem}>
              <Footprints size={16} color={Colors.coral} />
              <Text style={styles.heroStatText}>{profile.steps.toLocaleString()} <Text style={styles.heroStatSub}>steps</Text></Text>
            </View>
            <View style={styles.heroStatItem}>
              <Flame size={16} color={Colors.coral} />
              <Text style={styles.heroStatText}>{profile.calories} <Text style={styles.heroStatSub}>kcal</Text></Text>
            </View>
            <View style={styles.heroStatItem}>
              <Droplet size={16} color={Colors.coral} />
              <Text style={styles.heroStatText}>{profile.waterLiters.toFixed(1)}L <Text style={styles.heroStatSub}>water</Text></Text>
            </View>
          </View>
        </View>

        {/* Quick Stat Cards */}
        <View style={styles.statGrid}>
          <StatCard
            type="steps"
            value={profile.steps.toLocaleString()}
            label="Steps"
            isDark={isDark}
          />
          <StatCard
            type="calories"
            value={`${profile.calories}`}
            label="Calories"
            isDark={isDark}
          />
          <StatCard
            type="water"
            value={`${profile.waterLiters.toFixed(1)}L`}
            label="Water"
            onAction={handleAddWater}
            actionText="+250ml"
            isDark={isDark}
          />
        </View>

        {/* Today's Workout Section Header */}
        <View style={styles.sectionHead}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Today's workout</Text>
          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => router.push('/(tabs)/workouts')}
          >
            <Text style={[styles.linkText, { color: theme.textSoft }]}>See all</Text>
            <ChevronRight size={16} color={theme.textSoft} />
          </TouchableOpacity>
        </View>

        {/* Nike Athlete Today's Workout Card */}
        <TouchableOpacity
          style={styles.nikeCard}
          onPress={() => router.push('/modal/workout-detail?id=w2')}
          activeOpacity={0.88}
        >
          <ImageBackground
            source={require('../../assets/strength_hero.jpg')}
            style={styles.nikeCardBg}
            imageStyle={{ borderRadius: 28 }}
          >
            <View style={styles.nikeOverlay}>
              <View style={styles.nikeTopRow}>
                <View style={styles.nikeTag}>
                  <Text style={styles.nikeTagText}>NIKE PRO SERIES</Text>
                </View>
                <View style={styles.nikePlayBtn}>
                  <Play size={15} color="#14171F" fill="#14171F" />
                </View>
              </View>
              <Text style={styles.nikeTitle}>PUSH YOUR LIMITS &bull; STRENGTH</Text>
              <View style={styles.nikeMetaRow}>
                <Clock size={13} color="rgba(255,255,255,0.85)" />
                <Text style={styles.nikeMetaText}>32 MIN &middot; 280 KCAL &middot; 8 EXERCISES</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Weekly Activity Section */}
        <View style={styles.sectionHead}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Weekly activity</Text>
          <View style={styles.badge}>
            <TrendingUp size={12} color="#1F7A4C" />
            <Text style={styles.badgeText}>+12%</Text>
          </View>
        </View>

        <ActivityChart bars={mockProgressRanges.week.bars} height={100} isDark={isDark} />

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
    marginBottom: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  eyebrow: {
    fontSize: 12.5,
    fontWeight: '500',
  },
  userName: {
    fontSize: 19,
    fontWeight: '800',
    marginTop: 1,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: Colors.coral,
  },
  heroCard: {
    backgroundColor: '#14171F',
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabel: {
    color: '#9CA3B0',
    fontSize: 12.5,
    fontWeight: '500',
    marginBottom: 4,
  },
  heroValue: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 38,
  },
  heroPercent: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3B0',
  },
  heroSub: {
    color: '#8890A0',
    fontSize: 12.5,
    marginTop: 6,
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  heroStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroStatText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  heroStatSub: {
    color: '#8890A0',
    fontSize: 11,
    fontWeight: '500',
  },
  statGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  linkText: {
    fontSize: 12.5,
    fontWeight: '700',
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
  nikeCard: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  nikeCardBg: {
    width: '100%',
    height: 180,
  },
  nikeOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 12, 18, 0.65)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  nikeTopRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nikeTag: {
    backgroundColor: Colors.coral,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 4,
  },
  nikeTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  nikePlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nikeTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  nikeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nikeMetaText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11.5,
    fontWeight: '700',
  },
});
