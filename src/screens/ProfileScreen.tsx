import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav, { Tab } from '../components/BottomNav';
import { guideThumbnail } from '../data/guides';

type Props = {
  onNavigate: (tab: Tab) => void;
  onOpenGuide: () => void;
};

const stats = [
  { id: '1', icon: '♻️', value: '2.4 kg', label: 'Sampah Terolah' },
  { id: '2', icon: '✅', value: '12', label: 'Proyek Selesai' },
  { id: '3', icon: '⭐', value: '250', label: 'Total Poin' },
];

// Thumbnail sementara untuk showcase
const showcases = ['1', '2', '3'];

export default function ProfileScreen({ onNavigate, onOpenGuide }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>🧔🏽</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Budi Santoso</Text>
            <Text style={styles.level}>Level 2: Tukang Bikin</Text>
            <View style={styles.barBg}>
              <View style={styles.barFill} />
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.id} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>My Showcases</Text>
        <View style={styles.grid}>
          {showcases.map((id) => (
            <TouchableOpacity key={id} style={styles.showcase} onPress={onOpenGuide}>
              <Image source={guideThumbnail} style={styles.showcaseImage} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNav active="profile" onPress={onNavigate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 16, paddingBottom: 80 },
  userRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#C8E6C9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarEmoji: { fontSize: 32 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#1E1E1E' },
  level: { fontSize: 12, color: '#666', marginBottom: 6 },
  barBg: { height: 6, borderRadius: 3, backgroundColor: '#E0E0E0', overflow: 'hidden' },
  barFill: { width: '50%', height: '100%', backgroundColor: '#5E8A4A' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: {
    width: '31%',
    backgroundColor: '#C8E6C9',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#1E1E1E' },
  statLabel: { fontSize: 10, color: '#333', textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  showcase: { width: '48%', aspectRatio: 1, marginBottom: 12 },
  showcaseImage: { width: '100%', height: '100%', borderRadius: 12 },
});

