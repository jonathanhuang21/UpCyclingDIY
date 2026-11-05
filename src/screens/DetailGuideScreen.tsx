import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Panduan</Text>
          <View style={styles.backButton} />
        </View>

        <Image source={guideThumbnail} style={styles.heroImage} resizeMode="cover" />

        <Text style={styles.title}>{guide.title}</Text>
        <Text style={styles.meta}>
          ⏰ {guide.duration}
        </Text>
        <Text style={styles.meta}>
          <Text style={styles.stars}>★★★★☆</Text> {guide.rating} {guide.reviews}
        </Text>

        <TouchableOpacity style={styles.favButton} onPress={toggleFav}>
          <Text style={styles.favIcon}>{fav ? '♥' : '♡'}</Text>
        </TouchableOpacity>

        <Text style={styles.about}>{guide.about}</Text>

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

        {tab === 'Alat & Bahan' &&
          guide.materials.map((m, i) => (
            <TouchableOpacity key={m} style={styles.checkRow} onPress={() => toggleCheck(i)}>
              <View style={[styles.checkbox, checked[i] && styles.checkboxOn]}>
                {checked[i] && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={styles.checkLabel}>{m}</Text>
            </TouchableOpacity>
          ))}

        {tab === 'Langkah Kerja' &&
          guide.steps.map((s, i) => (
            <Text key={s.title} style={styles.stepItem}>
              {i + 1}. {s.title}
            </Text>
          ))}

        {tab === 'Komentar' && <Text style={styles.empty}>Belum ada komentar.</Text>}
      </ScrollView>

      <TouchableOpacity style={styles.startButton} onPress={onStart}>
        <Text style={styles.startText}>Mulai Membuat  →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 16, paddingBottom: 90, alignItems: 'center' },
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 12,
  },
  backButton: { width: 32 },
  backIcon: { fontSize: 24, color: '#1E1E1E' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E1E1E' },
  heroImage: { width: 180, height: 180, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1E1E1E', textAlign: 'center' },
  meta: { fontSize: 12, color: '#1E1E1E', marginTop: 2 },
  stars: { color: '#F5B301' },
  favButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  favIcon: { fontSize: 16, color: '#1E1E1E' },
  about: { fontSize: 12, fontWeight: '600', color: '#1E1E1E', textAlign: 'center', marginBottom: 12 },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 16,
    padding: 2,
    marginBottom: 12,
  },
  tab: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 14 },
  tabActive: { backgroundColor: '#8DB36F' },
  tabText: { fontSize: 12, color: '#1E1E1E' },
  tabTextActive: { color: '#FFF', fontWeight: '600' },
  checkRow: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#9E9E9E',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: '#8DB36F', borderColor: '#8DB36F' },
  checkMark: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  checkLabel: { fontSize: 13, color: '#1E1E1E' },
  stepItem: { alignSelf: 'stretch', fontSize: 13, color: '#1E1E1E', marginBottom: 10 },
  empty: { fontSize: 12, color: '#666', marginTop: 10 },
  startButton: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8DB36F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

