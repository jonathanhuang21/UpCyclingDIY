import React, { useState } from 'react';
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
import { guide, stepImage } from '../data/guides';

type Props = {
  onBack: () => void;
  onFinish: () => void;
  onNavigate: (tab: Tab) => void;
};

export default function TutorialScreen({ onBack, onFinish, onNavigate }: Props) {
  const [step, setStep] = useState(0);
  const total = guide.steps.length;
  const current = guide.steps[step];
  const isLast = step === total - 1;

  const handleBack = () => (step === 0 ? onBack() : setStep(step - 1));
  const handleNext = () => (isLast ? onFinish() : setStep(step + 1));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Tutorial</Text>
            <Text style={styles.headerSub}>Langkah {step + 1} dari {total}</Text>
          </View>
          <View style={styles.backButton} />
        </View>

        <Text style={styles.projectLabel}>PROYEK SAAT INI</Text>
        <Text style={styles.projectTitle}>{guide.projectTitle}</Text>

        <View style={styles.progressRow}>
          <Text style={styles.percent}>{Math.round(((step + 1) / total) * 100)}%</Text>
        </View>
        <View style={styles.segments}>
          {guide.steps.map((_, i) => (
            <View key={i} style={[styles.segment, i <= step && styles.segmentOn]} />
          ))}
        </View>

        <View style={styles.imageWrap}>
          <Image source={stepImage} style={styles.stepImage} resizeMode="cover" />

          <View style={styles.playOverlay} pointerEvents="none">
            <View style={styles.playCircle}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </View>
          
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>⏱ ± {current.minutes} menit</Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepTitle}>
            <Text style={styles.stepNum}>{String(step + 1).padStart(2, '0')}  </Text>
            {current.title}
          </Text>
          <Text style={styles.stepBody}>{current.body}</Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>💡 {current.tip}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.prevButton, step === 0 && styles.prevDisabled]}
            onPress={handleBack}
            disabled={step === 0}
          >
            <Text style={styles.prevText}>← Sebelumnya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>{isLast ? 'Selesai  →' : 'Berikutnya  →'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav active="search" onPress={onNavigate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 16, paddingBottom: 80 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 12 },
  backButton: { width: 32 },
  backIcon: { fontSize: 24, color: '#1E1E1E' },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E1E1E' },
  headerSub: { fontSize: 10, color: '#666' },
  projectLabel: { fontSize: 10, color: '#666' },
  projectTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 8 },
  progressRow: { marginBottom: 4 },
  percent: { fontSize: 11, color: '#5E8A4A', fontWeight: '600' },
  segments: { flexDirection: 'row', marginBottom: 14 },
  segment: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0', marginRight: 4 },
  segmentOn: { backgroundColor: '#5E8A4A' },
  imageWrap: { marginBottom: 14 },
  stepImage: { width: '100%', height: 180, borderRadius: 16 },
  playOverlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { color: '#FFF', fontSize: 18, marginLeft: 3 },
  timeBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  timeText: { fontSize: 10, color: '#1E1E1E' },
  stepCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    marginBottom: 10,
  },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 6 },
  stepNum: { color: '#5E8A4A' },
  stepBody: { fontSize: 12, color: '#333', lineHeight: 18 },
  tipCard: { backgroundColor: '#FFF6DA', borderRadius: 12, padding: 10, marginBottom: 14 },
  tipText: { fontSize: 11, color: '#333' },
  buttonRow: { flexDirection: 'row' },
  prevButton: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  prevDisabled: { opacity: 0.5 },
  prevText: { fontSize: 12, color: '#666' },
  nextButton: {
    flex: 1.6,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#8DB36F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: { fontSize: 14, color: '#FFF', fontWeight: '600' },
});

