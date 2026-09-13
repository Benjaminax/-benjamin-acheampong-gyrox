import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Edit2, User, Target, Award, Bell, Moon, LogOut, ChevronRight } from 'lucide-react-native';

import { useTheme } from '../_layout';
import { Colors } from '../../constants/Colors';
import { initialProfile } from '../../constants/MockData';

export default function ProfileScreen() {
  const { isDark, toggleDarkMode } = useTheme();
  const theme = isDark ? Colors.dark : Colors.light;

  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
            onPress={() => Alert.alert('Edit Profile', 'Profile editing options...')}
          >
            <Edit2 size={18} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initialProfile.initials}</Text>
          </View>
          <Text style={[styles.profileName, { color: theme.text }]}>{initialProfile.name}</Text>
          <Text style={[styles.profileSub, { color: theme.textSoft }]}>
            Member since {initialProfile.memberSince}
          </Text>

          <View style={[styles.profileStatsRow, { borderTopColor: theme.cardBorder }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statVal, { color: theme.text }]}>{initialProfile.totalWorkouts}</Text>
              <Text style={[styles.statSub, { color: theme.textSoft }]}>Workouts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statVal, { color: theme.text }]}>{initialProfile.streakDays}</Text>
              <Text style={[styles.statSub, { color: theme.textSoft }]}>Day streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statVal, { color: theme.text }]}>{initialProfile.achievementsCount}</Text>
              <Text style={[styles.statSub, { color: theme.textSoft }]}>Achievements</Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Account</Text>
        <View style={[styles.listCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <TouchableOpacity style={styles.listRow} activeOpacity={0.7}>
            <View style={[styles.rowIcon, { backgroundColor: Colors.coralLight }]}>
              <User size={18} color={Colors.coralDark} />
            </View>
            <Text style={[styles.rowText, { color: theme.text }]}>Personal information</Text>
            <ChevronRight size={18} color={theme.textFaint} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listRow} activeOpacity={0.7}>
            <View style={[styles.rowIcon, { backgroundColor: Colors.sageLight }]}>
              <Target size={18} color="#1F7A4C" />
            </View>
            <Text style={[styles.rowText, { color: theme.text }]}>Fitness goals</Text>
            <ChevronRight size={18} color={theme.textFaint} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.listRow, { borderBottomWidth: 0 }]} activeOpacity={0.7}>
            <View style={[styles.rowIcon, { backgroundColor: Colors.amberLight }]}>
              <Award size={18} color="#B5730A" />
            </View>
            <Text style={[styles.rowText, { color: theme.text }]}>Achievements</Text>
            <ChevronRight size={18} color={theme.textFaint} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Preferences</Text>
        <View style={[styles.listCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.listRow}>
            <View style={[styles.rowIcon, { backgroundColor: Colors.skyLight }]}>
              <Bell size={18} color="#1D6FA5" />
            </View>
            <Text style={[styles.rowText, { color: theme.text }]}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: theme.cardBorder, true: Colors.sage }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.listRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.rowIcon, { backgroundColor: Colors.darkBg }]}>
              <Moon size={18} color="#FFFFFF" />
            </View>
            <Text style={[styles.rowText, { color: theme.text }]}>Dark mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleDarkMode}
              trackColor={{ false: theme.cardBorder, true: Colors.coral }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?')}
          activeOpacity={0.7}
        >
          <LogOut size={18} color={Colors.coralDark} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

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
  profileCard: {
    borderRadius: 28,
    paddingTop: 24,
    paddingBottom: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: Colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: Colors.coral,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 24,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
  },
  profileSub: {
    fontSize: 12.5,
    marginTop: 3,
    marginBottom: 18,
  },
  profileStatsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '800',
  },
  statSub: {
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  listCard: {
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  logoutText: {
    color: Colors.coralDark,
    fontSize: 14,
    fontWeight: '700',
  },
});
