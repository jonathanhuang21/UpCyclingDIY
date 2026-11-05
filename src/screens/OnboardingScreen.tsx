
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

type OnboardingScreenProps = {
  onPressStart: () => void;
  onPressLogin: () => void;
};

const GREEN = '#2F6B32';
const DARK_GREEN = '#244B29';
const LIGHT_GREEN = '#EDF6EE';

export default function OnboardingScreen({
  onPressStart,
  onPressLogin,
}: OnboardingScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/frame1/Sementara.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* App Introduction */}
        <View style={styles.textContainer}>
          <Text style={styles.appName}>
            Upcycling <Text style={styles.appNameAccent}>DIY</Text>
          </Text>

          <Text style={styles.tagline}>
            Ubah Barang Bekas{' '}
            <Text style={styles.taglineAccent}>
              Jadi Barang Berkelas
            </Text>
          </Text>

          <Text style={styles.description}>
            Ide kreatif, langkah mudah, untuk masa depan yang lebih hijau.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={onPressStart}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              Mulai Sekarang
            </Text>
          </Pressable>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Sudah punya akun?{' '}
            </Text>

            <Pressable
              onPress={onPressLogin}
              accessibilityRole="button"
            >
              <Text style={styles.loginLink}>Masuk</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 15,
    paddingBottom: 18,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 5,
  },
  appName: {
    fontSize: 33,
    fontWeight: '800',
    color: DARK_GREEN,
    letterSpacing: -1,
    textAlign: 'center',
  },
  appNameAccent: {
    color: GREEN,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK_GREEN,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 26,
  },
  taglineAccent: {
    color: GREEN,
  },
  description: {
    fontSize: 13,
    color: '#657166',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 20,
    maxWidth: 290,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 38,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    height: 54,
    backgroundColor: GREEN,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 23,
  },
  loginText: {
    color: '#727B72',
    fontSize: 12,
  },
  loginLink: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
