
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

const GREEN = '#2F6B32';
const DARK_GREEN = '#244B29';

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
    image: require('../../assets/images/frame1/inspirasi.png'),
  },
  {
    title: 'Berkarya & Raih EXP',
    description:
      'Selesaikan proyek DIY, kumpulkan EXP, dan tingkatkan level kreativitasmu!',
    image: require('../../assets/images/frame1/Sementara1.png'),
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

        <Pressable onPress={onFinish}>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },

  brand: {
    fontSize: 17,
    fontWeight: '800',
    color: GREEN,
  },

  skip: {
    fontSize: 13,
    color: '#777777',
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
    backgroundColor: '#EDF6EE',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },

  image: {
    width: '85%',
    height: '85%',
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: DARK_GREEN,
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    color: '#697569',
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 15,
    paddingHorizontal: 15,
  },

  footer: {
    paddingBottom: 25,
    gap: 22,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#D9E6D9',
  },

  activeDot: {
    width: 26,
    backgroundColor: GREEN,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  backButton: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    color: GREEN,
    fontSize: 14,
    fontWeight: '700',
  },

  nextButton: {
    flex: 2,
    height: 54,
    backgroundColor: GREEN,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  pageText: {
    color: '#929A92',
    fontSize: 11,
    textAlign: 'center',
  },
});
