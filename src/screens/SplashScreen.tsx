import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  onFinish: () => void;
};

// Menyesuaikan warna dengan tema hijau aplikasi HomeScreen
const GREEN = '#1B5E20';
const LIGHT_GREEN = '#2E7D32';
const BG_COLOR = '#F3F9F1';

const slides = [
  {
    title: 'Kenali Upcycling',
    description:
      'Ubah barang bekas menjadi karya yang bermanfaat untuk kehidupan sehari-hari.',
    image: require('../../assets/images/frame1/Sementara.png'),
  },
  {
    title: 'Temukan Ide Kreatif',
    description:
      'Jelajahi berbagai inspirasi DIY dan ikuti panduan mudah untuk membuat kreasi sendiri.',
    image: require('../../assets/images/frame1/1.png'),
  },
  {
    title: 'Berkarya & Raih EXP',
    description:
      'Selesaikan proyek DIY, kumpulkan EXP, dan tingkatkan level kreativitasmu!',
    image: require('../../assets/images/frame1/Sementara1-removebg-preview.png'),
  },
];

export default function SplashScreen({ onFinish }: Props) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish();
    }
  };

  const previousSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const slide = slides[index];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.brand}>Upcycling DIY</Text>

        <Pressable onPress={onFinish} style={styles.skipButton}>
          <Text style={styles.skip}>Lewati</Text>
        </Pressable>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <View style={styles.imageBox}>
          <Image
            source={slide.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>
          {slide.title}
        </Text>

        <Text style={styles.description}>
          {slide.description}
        </Text>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        {/* PAGE INDICATOR */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* PREVIOUS AND NEXT */}
        <View style={styles.buttonContainer}>
          {index > 0 && (
            <Pressable
              onPress={previousSlide}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>
                Kembali
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={nextSlide}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>
              {index === slides.length - 1
                ? 'Mulai'
                : 'Selanjutnya'}
              {'  →'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.pageText}>
          {index + 1} dari {slides.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 10,
  },

  brand: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GREEN,
  },

  skipButton: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  skip: {
    fontSize: 13,
    color: LIGHT_GREEN,
    fontWeight: '600',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageBox: {
    width: '100%',
    height: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, // Diubah dari string ('0.05') menjadi angka (0.05)
    shadowRadius: 8,
    elevation: 2,
  },

  image: {
    width: '80%',
    height: '80%',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
    paddingHorizontal: 10,
  },

  footer: {
    paddingBottom: 24,
    gap: 20,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C8E6C9',
  },

  activeDot: {
    width: 24,
    backgroundColor: GREEN,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  backButton: {
    flex: 1,
    height: 52,
    borderWidth: 1.5,
    borderColor: GREEN,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  backButtonText: {
    color: GREEN,
    fontSize: 14,
    fontWeight: 'bold',
  },

  nextButton: {
    flex: 2,
    height: 52,
    backgroundColor: GREEN,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  pageText: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
  },
});