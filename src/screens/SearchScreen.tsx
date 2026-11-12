import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { guideList, loadFavorites, saveFavorites } from '../data/guides';

// ─── Tipe ────────────────────────────────────────────────────────────────────
type Props = {
  onOpenGuide?: () => void;
};

type FilterKey = 'Semua' | '< 15 Menit' | 'Mudah' | 'Dekorasi';

// ─── Konstanta ────────────────────────────────────────────────────────────────
const FILTERS: FilterKey[] = ['Semua', '< 15 Menit', 'Mudah', 'Dekorasi'];

// ─── Komponen utama ───────────────────────────────────────────────────────────
export default function SearchScreen({ onOpenGuide }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('Semua');
  const [favs, setFavs] = useState<string[]>([]);

  // Muat favorit sekali saat mount
  useEffect(() => {
    loadFavorites().then(setFavs);
  }, []);

  // Toggle favorit tanpa memuat ulang seluruh data
  const toggleFav = (id: string) => {
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    setFavs(next);
    saveFavorites(next);
  };

  // ── Logika filter + search (memoised, tidak ada network call) ──
  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return guideList.filter((item) => {
      // 1. Search: judul mengandung kata kunci (case-insensitive)
      const matchesSearch =
        keyword === '' || item.title.toLowerCase().includes(keyword);

      // 2. Filter aktif
      let matchesFilter = true;
      if (activeFilter === '< 15 Menit') {
        matchesFilter = item.durationMinutes < 15;
      } else if (activeFilter === 'Mudah') {
        matchesFilter = item.difficulty === 'mudah';
      } else if (activeFilter === 'Dekorasi') {
        matchesFilter = item.category.toLowerCase() === 'dekorasi';
      }
      // 'Semua' → matchesFilter tetap true

      return matchesSearch && matchesFilter;
    });
  }, [query, activeFilter]);

  const hasResults = filteredItems.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── HEADER ── */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Kreasi Kardus</Text>
        </View>

        {/* ── SEARCH BAR ── */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari panduan..."
            placeholderTextColor="#88B088"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* Ikon Ionicons outline, bukan emoji */}
          {query.length > 0 ? (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle-outline" size={20} color="#88B088" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="search-outline" size={20} color="#88B088" />
          )}
        </View>

        {/* ── FILTER CHIPS ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipRow}
          contentContainerStyle={styles.chipRowContent}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── GRID HASIL ── */}
        {hasResults ? (
          <View style={styles.gridContainer}>
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.85}
                onPress={onOpenGuide}
              >
                {/* Gambar + tombol favorit */}
                <View style={styles.imageWrap}>
                  <Image source={item.thumbnail} style={styles.cardImage} resizeMode="cover" />
                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => toggleFav(item.id)}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <Ionicons
                      name={favs.includes(item.id) ? 'heart' : 'heart-outline'}
                      size={15}
                      color="#EF4444"
                    />
                  </TouchableOpacity>
                </View>

                {/* Judul */}
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.title}
                </Text>

                {/* Rating */}
                <View style={styles.ratingRow}>
                  <Text style={styles.stars}>★★★★☆</Text>
                  <Text style={styles.ratingText}>
                    {item.rating} {item.reviews}
                  </Text>
                </View>

                {/* Durasi */}
                <View style={styles.metaRow}>
                  <Ionicons name="timer-outline" size={12} color="#6A8A6A" />
                  <Text style={styles.metaText}>{item.duration}</Text>
                </View>

                {/* Tombol Lihat Detail */}
                <TouchableOpacity style={styles.detailButton} onPress={onOpenGuide} activeOpacity={0.8}>
                  <Text style={styles.detailButtonText}>Lihat Detail</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* ── EMPTY STATE ── */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="search-outline" size={48} color="#C5D8C5" />
            </View>
            <Text style={styles.emptyTitle}>Panduan tidak ditemukan</Text>
            <Text style={styles.emptySubtitle}>Coba kata kunci atau filter lainnya</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
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
    paddingTop: Platform.OS === 'android' ? 36 : 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A3C1A',
    textAlign: 'center',
  },

  // Search bar
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

  // Filter chips
  chipRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  chipRowContent: {
    paddingRight: 8,
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

  // Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Card
  card: {
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
  imageWrap: {
    width: '100%',
    height: 110,
    backgroundColor: '#E8D5A8',
    position: 'relative',
    marginBottom: 10,
  },
  cardImage: {
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
  cardTitle: {
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 8,
    gap: 4,
  },
  metaText: {
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

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    width: '100%',
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAF5EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A3C1A',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6A8A6A',
    textAlign: 'center',
    paddingHorizontal: 24,
  },

  // Spacer
  bottomSpacer: {
    height: 100,
  },
});

