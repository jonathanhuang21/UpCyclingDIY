import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { guide, guideThumbnail, loadFavorites, saveFavorites } from '../data/guides';

type Props = {
  onBack: () => void;
  onStart: () => void;
};

const tabs = ['Alat & Bahan', 'Langkah Kerja', 'Komentar'];
const FAV_ID = 'detail';

export default function DetailGuideScreen({ onBack, onStart }: Props) {
  const [tab, setTab] = useState(tabs[0]);
  const [checked, setChecked] = useState<boolean[]>(guide.materials.map((_, i) => i === 0));
  const [fav, setFav] = useState(false);

  useEffect(() => {
    loadFavorites().then((f) => setFav(f.includes(FAV_ID)));
  }, []);

  const toggleFav = async () => {
    const list = await loadFavorites();
    const next = list.includes(FAV_ID) ? list.filter((f) => f !== FAV_ID) : [...list, FAV_ID];
    setFav(next.includes(FAV_ID));
    saveFavorites(next);
  };

  const toggleCheck = (i: number) => setChecked(checked.map((c, idx) => (idx === i ? !c : c)));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Panduan</Text>
          <View style={styles.headerRight} />
        </View>

        {/* GAMBAR HERO */}
        <Image source={guideThumbnail} style={styles.heroImage} resizeMode="cover" />

        {/* JUDUL */}
        <Text style={styles.title}>{guide.title}</Text>

        {/* DURASI */}
        <View style={styles.metaRow}>
          <Ionicons name="timer-outline" size={14} color="#6A8A6A" />
          <Text style={styles.metaText}>{guide.duration}</Text>
        </View>

        {/* RATING */}
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>★★★★☆</Text>
          <Text style={styles.ratingText}>
            {guide.rating} {guide.reviews}
          </Text>
        </View>

        {/* TOMBOL FAVORIT */}
        <TouchableOpacity style={styles.favButton} onPress={toggleFav}>
          <Text style={[styles.favIcon, fav && styles.favIconActive]}>{fav ? '♥' : '♡'}</Text>
        </TouchableOpacity>

        {/* DESKRIPSI */}
        <Text style={styles.about}>{guide.about}</Text>

        {/* TAB ROW */}
        <View style={styles.tabRow}>
          {tabs.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, tab === t && styles.tabActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TAB: ALAT & BAHAN */}
        {tab === 'Alat & Bahan' &&
          guide.materials.map((m, i) => (
            <TouchableOpacity key={m} style={styles.checkRow} onPress={() => toggleCheck(i)}>
              <View style={[styles.checkbox, checked[i] && styles.checkboxOn]}>
                {checked[i] && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={styles.checkLabel}>{m}</Text>
            </TouchableOpacity>
          ))}

        {/* TAB: LANGKAH KERJA */}
        {tab === 'Langkah Kerja' &&
          guide.steps.map((s, i) => (
            <View key={s.title} style={styles.stepItem}>
              <Text style={styles.stepText}>
                {i + 1}. {s.title}
              </Text>
            </View>
          ))}

        {/* TAB: KOMENTAR */}
        {tab === 'Komentar' && (
          <View style={styles.emptyCommentWrap}>
            <Text style={styles.empty}>Belum ada komentar.</Text>
          </View>
        )}
      </ScrollView>

      {/* TOMBOL MULAI */}
      <TouchableOpacity style={styles.startButton} onPress={onStart}>
        <Text style={styles.startText}>Mulai Membuat  →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9F1',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    alignItems: 'center',
  },
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'android' ? 36 : 10,
    marginBottom: 16,
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
  headerRight: {
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
  backIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A3C1A',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A3C1A',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 18,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A3C1A',
    textAlign: 'center',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  metaText: {
    fontSize: 12,
    color: '#6A8A6A',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  stars: {
    fontSize: 12,
    color: '#F59E0B',
  },
  ratingText: {
    fontSize: 12,
    color: '#6A8A6A',
  },
  favButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#1A3C1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  favIcon: {
    fontSize: 18,
    color: '#EF4444',
  },
  favIconActive: {
    color: '#EF4444',
  },
  about: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A6B4A',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
    lineHeight: 18,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 4,
    marginBottom: 16,
    alignSelf: 'stretch',
    shadowColor: '#1A3C1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 18,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#176329',
  },
  tabText: {
    fontSize: 12.5,
    color: '#6A8A6A',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  checkRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#1A3C1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#C5E8C8',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxOn: {
    backgroundColor: '#176329',
    borderColor: '#176329',
  },
  checkMark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkLabel: {
    fontSize: 13,
    color: '#1A3C1A',
    fontWeight: '500',
    flex: 1,
  },
  stepItem: {
    alignSelf: 'stretch',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    shadowColor: '#1A3C1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  stepText: {
    fontSize: 13,
    color: '#1A3C1A',
    fontWeight: '500',
    lineHeight: 20,
  },
  emptyCommentWrap: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 40,
  },
  empty: {
    fontSize: 13,
    color: '#6A8A6A',
    textAlign: 'center',
  },
  startButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: Platform.OS === 'android' ? 24 : 28,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#176329',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#176329',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});