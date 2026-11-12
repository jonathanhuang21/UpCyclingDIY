import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { guide, guideThumbnail, loadFavorites, saveFavorites, searchResults } from '../data/guides';

type Tab = 'home' | 'search' | 'creations' | 'showcase';

type Props = {
  title: string;
  onBack: () => void;
  onOpenGuide: () => void;
  onNavigate: (tab: Tab) => void;
};

const filters = ['Semua', '< 15 Menit', 'Mudah', 'Dekorasi'];

const NAV_ITEMS = [
  { id: 'home' as Tab, label: 'Beranda', icon: 'home-outline' as keyof typeof Ionicons.glyphMap, iconActive: 'home' as keyof typeof Ionicons.glyphMap },
  { id: 'search' as Tab, label: 'Cari', icon: 'search-outline' as keyof typeof Ionicons.glyphMap, iconActive: 'search' as keyof typeof Ionicons.glyphMap },
  { id: 'creations' as Tab, label: 'Kreasi Saya', icon: 'images-outline' as keyof typeof Ionicons.glyphMap, iconActive: 'images' as keyof typeof Ionicons.glyphMap },
];

export default function CategoryDetailScreen({ title, onBack, onOpenGuide, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [favs, setFavs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('search');

  useEffect(() => {
    loadFavorites().then(setFavs);
  }, []);

  const toggleFav = (id: string) => {
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    setFavs(next);
    saveFavorites(next);
  };

  const showList = query.trim() === '' || guide.title.toLowerCase().includes(query.trim().toLowerCase());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari panduan..."
            placeholderTextColor="#88B088"
            value={query}
            onChangeText={setQuery}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* FILTER CHIPS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LIST */}
        <View style={styles.listContainer}>
          {showList ? (
            searchResults.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.inspirationCard} 
                activeOpacity={0.85} 
                onPress={onOpenGuide}
              >
                <View style={styles.inspirationImageWrap}>
                  <Image source={guideThumbnail} style={styles.inspirationImage} resizeMode="cover" />
                  <TouchableOpacity style={styles.heartButton} onPress={() => toggleFav(item.id)}>
                    <Text style={styles.heart}>{favs.includes(item.id) ? '♥' : '♡'}</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.inspirationTitle} numberOfLines={2}>{guide.title}</Text>
                
                <View style={styles.ratingRow}>
                  <Text style={styles.stars}>★★★★☆</Text>
                  <Text style={styles.ratingText}>{guide.rating} {guide.reviews}</Text>
                </View>

                <View style={styles.metaRow}>
                  <Text style={styles.cardMeta}>⏰ {guide.duration}</Text>
                </View>

                <View style={styles.detailButton}>
                  <Text style={styles.detailButtonText}>Lihat Detail</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.empty}>Panduan tidak ditemukan.</Text>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* FLOATING BOTTOM NAV */}
      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.navItem}
                onPress={() => {
                  setActiveTab(item.id);
                  onNavigate(item.id);
                }}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9F1',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1A3C1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  backIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A3C1A',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A3C1A',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    shadowColor: '#1A3C1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A3C1A',
    paddingVertical: 0,
  },
  searchIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2EFE0',
  },
  chipActive: {
    backgroundColor: '#176329',
    borderColor: '#176329',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A6B4A',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inspirationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#1A3C1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    paddingBottom: 12,
    overflow: 'hidden',
  },
  inspirationImageWrap: {
    width: '100%',
    height: 110,
    backgroundColor: '#E8D5A8',
    position: 'relative',
    marginBottom: 10,
  },
  inspirationImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    fontSize: 14,
    color: '#EF4444',
  },
  inspirationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A3C1A',
    paddingHorizontal: 10,
    marginBottom: 6,
    lineHeight: 18,
    minHeight: 36,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 4,
    gap: 4,
  },
  stars: {
    fontSize: 11,
    color: '#F59E0B',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666666',
  },
  metaRow: {
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  cardMeta: {
    fontSize: 11,
    color: '#6A8A6A',
  },
  detailButton: {
    marginHorizontal: 10,
    backgroundColor: '#EAF5EC',
    borderRadius: 20,
    paddingVertical: 7,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C5E8C8',
  },
  detailButtonText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#176329',
  },
  empty: {
    textAlign: 'center',
    color: '#6A8A6A',
    marginTop: 40,
    fontSize: 14,
    width: '100%',
  },
  bottomSpacer: {
    height: 100,
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 16,
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