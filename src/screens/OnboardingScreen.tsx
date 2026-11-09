import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface OnboardingScreenProps {
  onPressStart?: () => void;
  onPressLogin?: () => void;
}

const GREEN = '#1B5E20';
const LIGHT_GREEN = '#2E7D32';
const BG_COLOR = '#F3F9F1';

export default function OnboardingScreen({ onPressStart, onPressLogin }: OnboardingScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.imageBox}>
          <Image 
            source={require('../../assets/images/frame1/Sementara.png')} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.appName}>Upcycling DIY</Text>
          <Text style={styles.headline}>Ubah Barang Bekas Jadi Barang Berkelas</Text>
          <Text style={styles.description}>
            Ide kreatif, langkah mudah, untuk masa depan yang lebih hijau.
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={onPressStart} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Mulai Sekarang</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={onPressLogin}>
              <Text style={styles.loginLink}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  content: {
    flex: 1,
    padding: 24,
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
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    padding: 20,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GREEN,
    marginBottom: 8,
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LIGHT_GREEN,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: GREEN,
    width: '100%',
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#888888',
  },
  loginLink: {
    fontSize: 13,
    color: LIGHT_GREEN,
    fontWeight: 'bold',
  },
});