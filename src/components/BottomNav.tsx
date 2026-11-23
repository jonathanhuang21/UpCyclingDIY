
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type Tab = 'home' | 'search' | 'creations';

type Props = {
  active: Tab;
  onPress: (tab: Tab) => void;
};

const tabs = [
  { id: 'home', label: 'Beranda', icon: 'home-outline', iconActive: 'home' },
  { id: 'search', label: 'Cari', icon: 'search-outline', iconActive: 'search' },
  { id: 'creations', label: 'Kreasi Saya', icon: 'images-outline', iconActive: 'images' },
] as const;

export default function BottomNav({ active, onPress }: Props) {
  return (
    <View style={styles.bottomNavWrapper}>
      <View style={styles.bottomNav}>
        {tabs.map((item) => {
          const isActive = active === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => onPress(item.id)}
              activeOpacity={0.75}
            >
              <Ionicons
                name={isActive ? item.iconActive : item.icon}
                size={24}
                color={isActive ? '#2D7A3A' : '#BBBBBB'}
              />

              <Text
                style={[
                  styles.navLabel,
                  isActive
                    ? styles.navLabelActive
                    : styles.navLabelInactive,
                ]}
              >
                {item.label}
              </Text>

              {isActive && <View style={styles.activeIndicatorDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 16 : 28,
    left: 20,
    right: 20,
    shadowColor: '#1A3C1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingVertical: 11,
    paddingHorizontal: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 3,
  },
  navLabelActive: {
    color: '#2D7A3A',
    fontWeight: '700',
  },
  navLabelInactive: {
    color: '#BBBBBB',
    fontWeight: '400',
  },
  activeIndicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2D7A3A',
    marginTop: 3,
  },
});
