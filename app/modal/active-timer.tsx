import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Play, Pause, CheckCircle } from 'lucide-react-native';

import { useTheme } from '../_layout';
import { Colors } from '../../constants/Colors';

export default function ActiveTimerModal() {
  const router = useRouter();
  const { title } = useLocalSearchParams<{ title?: string }>();
  const { isDark } = useTheme();
  const theme = isDark ? Colors.dark : Colors.light;

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleFinish = () => {
    setIsRunning(false);
    Alert.alert(
      'Workout Completed! 🎉',
      `Great job! You finished ${title || 'your workout'} in ${formatTime(seconds)}.`,
      [{ text: 'Done', onPress: () => router.replace('/(tabs)') }]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Status Badge */}
        <View style={styles.badge}>
          <Clock size={14} color="#1F7A4C" />
          <Text style={styles.badgeText}>SESSION IN PROGRESS</Text>
        </View>

        <Text style={[styles.title, { color: theme.text }]}>{title || 'Upper Body Strength'}</Text>

        {/* Big Clock */}
        <View style={styles.clockContainer}>
          <Text style={styles.clockText}>{formatTime(seconds)}</Text>
        </View>

        <Text style={[styles.exerciseSub, { color: theme.textSoft }]}>
          Current: Barbell Bench Press (Set 2 of 4)
        </Text>

        {/* Action Controls */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.btnSec, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
            onPress={() => setIsRunning(!isRunning)}
            activeOpacity={0.7}
          >
            {isRunning ? (
              <>
                <Pause size={18} color={theme.text} />
                <Text style={[styles.btnSecText, { color: theme.text }]}>Pause</Text>
              </>
            ) : (
              <>
                <Play size={18} color={theme.text} fill={theme.text} />
                <Text style={[styles.btnSecText, { color: theme.text }]}>Resume</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnPri}
            onPress={handleFinish}
            activeOpacity={0.85}
          >
            <CheckCircle size={18} color="#FFFFFF" />
            <Text style={styles.btnPriText}>Finish Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.sageLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    marginBottom: 16,
  },
  badgeText: {
    color: '#1F7A4C',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  clockContainer: {
    marginVertical: 24,
  },
  clockText: {
    fontSize: 64,
    fontWeight: '800',
    color: Colors.coral,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  exerciseSub: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  btnSec: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnSecText: {
    fontSize: 15,
    fontWeight: '700',
  },
  btnPri: {
    flex: 1.3,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: Colors.sage,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.sage,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  btnPriText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
