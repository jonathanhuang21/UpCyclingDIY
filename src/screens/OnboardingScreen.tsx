import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// 1. Definisikan tipe props di sini
interface OnboardingScreenProps {
  onPressStart?: () => void;
  onPressLogin?: () => void;
}

// 2. Terapkan interface pada parameter fungsi
export default function OnboardingScreen({ onPressStart, onPressLogin }: OnboardingScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.illustrationContainer}>
  <View style={styles.earthCircle}>
    <Image 
      source={require('../../assets/images/frame1/Sementara.png')} // Ganti dengan path gambar Anda
      style={styles.earthImage}
      resizeMode="contain"
    />
  </View>
</View>
        <View style={styles.textContainer}>
          <Text style={styles.appName}>Upcycling DIY</Text>
          <Text style={styles.headline}>Ubah Barang Bekas Jadi Barang Berkelas</Text>
          <Text style={styles.description}>
            Ide kreatif, langkah mudah, untuk masa depan yang lebih hijau.
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={onPressStart}>
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

// (Bagian styles biarkan tetap sama seperti sebelumnya)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  earthCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2EFE0',
  },
  earthImage: {
    width: '80%',  // Atur persentase sesuai keinginan agar ada padding manis
    height: '80%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 12,
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 18,
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 150,
  },
  primaryButton: {
    backgroundColor: '#81C784',
    width: '100%',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#666666',
  },
  loginLink: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});