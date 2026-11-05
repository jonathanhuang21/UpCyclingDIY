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
import { celebrationImage, guide } from '../data/guides';

type Props = {
  onBack: () => void;
  onViewProjects: () => void;
  onHome: () => void;
};

export default function ProjectCompleteScreen({ onBack, onViewProjects, onHome }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Proyek Selesai!</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.heroBox}>
          <Image source={celebrationImage} style={styles.heroImage} resizeMode="contain" />
        </View>

        <Text style={styles.congrats}>
          Kamu berhasil membuat {guide.projectTitle}!
        </Text>

        <View style={styles.rewardCard}>
          <Text style={styles.rewardIcon}>✨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.rewardLabel}>HADIAH PROYEK</Text>
            <Text style={styles.rewardSub}>EXP berhasil ditambahkan</Text>
          </View>
          <Text style={styles.rewardExp}>+50 EXP</Text>
        </View>

        <View style={styles.levelCard}>
          <View style={styles.levelTop}>
            <View>
              <Text style={styles.levelLabel}>LEVEL SAAT INI</Text>
              <Text style={styles.levelName}>Level 2: Tukang Bikin</Text>
            </View>
            <Text style={styles.levelBadge}>🏅</Text>
          </View>
          <View style={styles.expRow}>
            <Text style={styles.expText}>250 EXP</Text>
            <Text style={styles.expText}>500 EXP</Text>
          </View>
          <View style={styles.barBg}>
            <View style={styles.barFill} />
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onViewProjects}>
          <Text style={styles.primaryText}>Lihat Proyek Saya  →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onHome}>
          <Text style={styles.secondaryText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 16, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 14 },
  backButton: { width: 32 },
  backIcon: { fontSize: 24, color: '#1E1E1E' },
  headerTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E1E1E' },
  heroBox: { backgroundColor: '#E6F5DE', borderRadius: 16, height: 150, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  heroImage: { width: '90%', height: '90%' },
  congrats: { fontSize: 13, color: '#1E1E1E', textAlign: 'center', marginBottom: 18, paddingHorizontal: 30 },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6DA',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  rewardIcon: { fontSize: 24, marginRight: 10 },
  rewardLabel: { fontSize: 10, color: '#A0750B', fontWeight: 'bold' },
  rewardSub: { fontSize: 11, color: '#666' },
  rewardExp: { fontSize: 18, fontWeight: 'bold', color: '#5E8A4A' },
  levelCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    marginBottom: 20,
  },
  levelTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  levelLabel: { fontSize: 9, color: '#666' },
  levelName: { fontSize: 13, fontWeight: 'bold', color: '#1E1E1E' },
  levelBadge: { fontSize: 20 },
  expRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  expText: { fontSize: 9, color: '#5E8A4A' },
  barBg: { height: 6, borderRadius: 3, backgroundColor: '#E0E0E0', overflow: 'hidden' },
  barFill: { width: '50%', height: '100%', backgroundColor: '#5E8A4A' },
  primaryButton: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8DB36F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  primaryText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  secondaryButton: {
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: { color: '#5E8A4A', fontSize: 13, fontWeight: '600' },
});

