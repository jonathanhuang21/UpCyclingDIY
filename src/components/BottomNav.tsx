import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Tab = 'home' | 'search' | 'profile';

type Props = {
  active: Tab;
  onPress: (tab: Tab) => void;
};

const tabs: { key: Tab; icon: string; label: string }[] = [
  { key: 'home', icon: '🏠', label: 'Beranda' },
  { key: 'search', icon: '🔍', label: 'Cari' },
  { key: 'profile', icon: '👤', label: 'Profil' },
];

export default function BottomNav({ active, onPress }: Props) {
  return (
    <View style={styles.bottomNav}>
      {tabs.map((t) => (
        <TouchableOpacity key={t.key} style={styles.navItem} onPress={() => onPress(t.key)}>
          <Text style={{ fontSize: 20 }}>{t.icon}</Text>
          <Text style={[styles.navText, active === t.key && styles.activeNavText]}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#757575',
    marginTop: 2,
  },
  activeNavText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
});