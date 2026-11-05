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
import BottomNav, { Tab } from '../components/BottomNav';
import { guide, guideThumbnail, loadFavorites, saveFavorites, searchResults } from '../data/guides';

type Props = {
  title: string;
  onBack: () => void;
  onOpenGuide: () => void;
  onNavigate: (tab: Tab) => void;
};

const filters = ['Semua', '< 15 Menit', 'Mudah', 'Dekorasi'];

export default function SearchScreen({ title, onBack, onOpenGuide, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [favs, setFavs] = useState<string[]>([]);

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
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.backButton} />
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari..."
            placeholderTextColor="#666"
            value={query}
            onChangeText={setQuery}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* FILTER CHIPS */}
        <View style={styles.chipRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={styles.chipText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIST */}
        {showList ? (
          searchResults.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8} onPress={onOpenGuide}>
              <Image source={guideThumbnail} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={1}>{guide.title}</Text>
                <Text style={styles.cardDesc}>{guide.desc}</Text>
                <Text style={styles.cardMeta}>⏰ {guide.duration}</Text>
                <Text style={styles.cardMeta}>
                  <Text style={styles.stars}>★★★★☆</Text> {guide.rating} {guide.reviews}
                </Text>
              </View>
              <TouchableOpacity style={styles.heartButton} onPress={() => toggleFav(item.id)}>
                <Text style={styles.heart}>{favs.includes(item.id) ? '♥' : '♡'}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.empty}>Panduan tidak ditemukan.</Text>
        )}
      </ScrollView>

      <BottomNav active="search" onPress={onNavigate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F5DE' },
  scrollContent: { padding: 16, paddingBottom: 80 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 14,
  },
  backButton: { width: 32 },
  backIcon: { fontSize: 24, color: '#1E1E1E' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E1E1E' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 38,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#1E1E1E', paddingVertical: 0 },
  searchIcon: { fontSize: 14 },
  chipRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  chip: {
    backgroundColor: '#8DB36F',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipActive: { backgroundColor: '#5E8A4A' },
  chipText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 14,
    padding: 8,
    marginBottom: 12,
  },
  cardImage: { width: 64, height: 64, borderRadius: 8 },
  cardBody: { flex: 1, marginLeft: 10 },
  cardTitle: { fontSize: 13, fontWeight: 'bold', color: '#1E1E1E' },
  cardDesc: { fontSize: 12, color: '#333', marginVertical: 1 },
  cardMeta: { fontSize: 11, color: '#1E1E1E', marginTop: 1 },
  stars: { color: '#F5B301' },
  heartButton: { alignSelf: 'flex-start', padding: 4 },
  heart: { fontSize: 18, color: '#1E1E1E' },
  empty: { textAlign: 'center', color: '#666', marginTop: 30 },
});

