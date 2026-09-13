import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Footprints, Flame, Droplet } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

interface StatCardProps {
  type: 'steps' | 'calories' | 'water';
  value: string;
  label: string;
  onAction?: () => void;
  actionText?: string;
  isDark?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  type,
  value,
  label,
  onAction,
  actionText,
  isDark = false,
}) => {
  const theme = isDark ? Colors.dark : Colors.light;

  const renderIcon = () => {
    switch (type) {
      case 'steps':
        return <Footprints size={22} color={Colors.coral} />;
      case 'calories':
        return <Flame size={22} color={Colors.amber} />;
      case 'water':
        return <Droplet size={22} color={Colors.sky} />;
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      {renderIcon()}
      <Text style={[styles.num, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.textSoft }]}>{label}</Text>
      {onAction && actionText && (
        <TouchableOpacity style={styles.actionBtn} onPress={onAction} activeOpacity={0.7}>
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  num: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 6,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  actionBtn: {
    marginTop: 8,
    backgroundColor: Colors.skyLight,
    borderRadius: 100,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  actionText: {
    color: '#1D6FA5',
    fontSize: 10,
    fontWeight: '700',
  },
});
