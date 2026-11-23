import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { celebrationImage } from '../data/guides';
import { CategoryProjectItem, getProjectById } from '../data/categoriesData';
import { saveUserCreation } from '../services/creationsService';

type Props = {
  project?: CategoryProjectItem | null;
  onBack: () => void;
  onViewProjects: () => void;
  onHome: () => void;
};

export default function ProjectCompleteScreen({
  project,
  onBack,
  onViewProjects,
  onHome,
}: Props) {
  const activeProject = project ?? getProjectById();
  const hasSavedRef = useRef(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (hasSavedRef.current) return;
    hasSavedRef.current = true;

    const persistProject = async () => {
      setSaving(true);
      const { error } = await saveUserCreation({
        projectTitle: activeProject.title,
        categoryName: activeProject.categoryName,
        expEarned: activeProject.expEarned,
      });
      if (error) {
        console.log('Gagal menyimpan proyek ke Supabase:', error.message);
      }
      setSaving(false);
    };

    persistProject();
  }, [
    activeProject.id,
    activeProject.title,
    activeProject.categoryName,
    activeProject.expEarned,
  ]);

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
          Kamu berhasil membuat {activeProject.title}!
        </Text>

        <View style={styles.rewardCard}>
          <Text style={styles.rewardIcon}>✨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.rewardLabel}>HADIAH PROYEK</Text>
            <Text style={styles.rewardSub}>EXP berhasil ditambahkan</Text>
          </View>
          <Text style={styles.rewardExp}>+{activeProject.expEarned} EXP</Text>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, saving && { opacity: 0.7 }]}
          onPress={onViewProjects}
          disabled={saving}
        >
          <Text style={styles.primaryText}>
            {saving ? 'Menyimpan...' : 'Lihat Proyek Saya  →'}
          </Text>
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
    marginBottom: 20,
  },
  rewardIcon: { fontSize: 24, marginRight: 10 },
  rewardLabel: { fontSize: 10, color: '#A0750B', fontWeight: 'bold' },
  rewardSub: { fontSize: 11, color: '#666' },
  rewardExp: { fontSize: 18, fontWeight: 'bold', color: '#5E8A4A' },
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