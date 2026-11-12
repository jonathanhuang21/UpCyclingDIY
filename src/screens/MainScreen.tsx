import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import MyCreationsScreen from './MyCreationsScreen';
import ShowcaseScreen from './ShowcaseScreen';
import ProfileScreen from './ProfileScreen';

type TabType = 'home' | 'search' | 'creations' | 'showcase';

interface NavItemConfig {
  id: TabType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
}

interface MainScreenProps {
  onLogoutSuccess?: () => void;
  onCategoryPress?: (categoryName: string) => void;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'home', label: 'Beranda', icon: 'home-outline', iconActive: 'home' },
  { id: 'search', label: 'Cari', icon: 'search-outline', iconActive: 'search' },
  { id: 'creations', label: 'Kreasi Saya', icon: 'images-outline', iconActive: 'images' },
];

export default function MainScreen({ onLogoutSuccess, onCategoryPress }: MainScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showProfile, setShowProfile] = useState(false);

  const renderContent = () => {
    if (showProfile) {
      return (
        <ProfileScreen 
          onBack={() => setShowProfile(false)} 
          onLogoutSuccess={onLogoutSuccess} 
        />
      );
    }
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onProfilePress={() => setShowProfile(true)}
            onCategoryPress={onCategoryPress} // <-- Teruskan onCategoryPress ke HomeScreen di sini
          />
        );
      case 'search':
        return <SearchScreen />;
      case 'creations':
        return <MyCreationsScreen />;
      case 'showcase':
        return <ShowcaseScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentArea}>
        {renderContent()}
      </View>

      {!showProfile && (
        <View style={styles.bottomNavWrapper}>
          <View style={styles.bottomNav}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.navItem}
                  onPress={() => setActiveTab(item.id)}
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
                      isActive ? styles.navLabelActive : styles.navLabelInactive,
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
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F9F1',
  },
  contentArea: {
    flex: 1,
  },
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
    position: 'relative',
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