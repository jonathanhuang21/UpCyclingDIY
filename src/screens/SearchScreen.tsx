import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  ALL_CATEGORY_PROJECTS,
  CategoryProjectItem,
} from '../data/categoriesData';

interface SearchScreenProps {
  onSelectProject?: (project: CategoryProjectItem) => void;
}

const POPULAR_SEARCHES = [
  { label: 'Kardus menjadi rak', keyword: 'Rak Buku' },
  { label: 'Botol plastik pot bunga', keyword: 'Pot Tanaman' },
  { label: 'Pakaian bekas tas', keyword: 'Tote Bag' },
  { label: 'Kaleng hiasan dinding', keyword: 'Kaleng' },
  { label: 'Kertas origami', keyword: 'Origami' },
  { label: 'Kaca vas bunga', keyword: 'Botol Kaca' },
];

export default function SearchScreen({ onSelectProject }: SearchScreenProps) {
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return ALL_CATEGORY_PROJECTS;
    }
    return ALL_CATEGORY_PROJECTS.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmed) ||
        item.categoryName.toLowerCase().includes(trimmed)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredProjects}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Cari Inspirasi</Text>
              <Text style={styles.subtitle}>Temukan ide daur ulang kreatif</Text>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Cari bahan atau karya..."
                placeholderTextColor="#AAA"
                value={query}
                onChangeText={setQuery}
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#AAA" />
                </TouchableOpacity>
              )}
            </View>

            {query.trim() === '' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pencarian Populer</Text>
                <View style={styles.tagList}>
                  {POPULAR_SEARCHES.map((tag) => (
                    <TouchableOpacity
                      key={tag.label}
                      style={styles.searchTag}
                      onPress={() => setQuery(tag.keyword)}
                    >
                      <Ionicons name="trending-up-outline" size={16} color="#2D7A3A" />
                      <Text style={styles.searchTagText}>{tag.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.resultsHeader}>
              <Text style={styles.sectionTitle}>
                {query.trim() === '' ? 'Semua Panduan Proyek' : `Hasil untuk "${query.trim()}"`}
              </Text>
              <Text style={styles.resultCount}>{filteredProjects.length} proyek</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.projectCard}
            activeOpacity={0.85}
            onPress={() => onSelectProject?.(item)}
          >
            <Image source={item.image} style={styles.projectThumb} resizeMode="cover" />
            <View style={styles.projectInfo}>
              <Text style={styles.projectCategory}>{item.categoryName}</Text>
              <Text style={styles.projectTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.projectMeta}>
                ⏰ {item.duration} • +{item.expEarned} EXP
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#2D7A3A" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Tidak ada panduan yang cocok dengan pencarianmu.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9F1',
  },
  listContent: {
    paddingBottom: 110,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A3C1A',
  },
  subtitle: {
    fontSize: 13,
    color: '#5A7A5A',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  section: {
    marginTop: 22,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3C1A',
  },
  tagList: {
    marginTop: 12,
    gap: 8,
  },
  searchTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchTagText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  resultCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D7A3A',
  },
  projectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  projectThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#E8F5E8',
  },
  projectInfo: {
    flex: 1,
    marginRight: 8,
  },
  projectCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2D7A3A',
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A3C1A',
  },
  projectMeta: {
    fontSize: 12,
    color: '#6A8A6A',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6A8A6A',
    fontSize: 14,
    marginTop: 24,
    paddingHorizontal: 20,
  },
});