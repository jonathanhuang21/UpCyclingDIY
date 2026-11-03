import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

// 1. TAMBAHKAN onRegisterSuccess DI SINI
interface RegisterScreenProps {
  onPressLogin?: () => void;
  onPressBack?: () => void;
  onRegisterSuccess?: () => void; // <-- Tambahkan baris ini
}

// 2. TERAPKAN PADA PARAMETER KOMPONEN
export default function RegisterScreen({ onPressLogin, onPressBack, onRegisterSuccess }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Peringatan", "Semua kolom harus diisi!");
      return;
    }

    console.log('Register:', { name, email, password });
    
    // Tampilkan pop-up sukses lalu pindah ke Home/Dashboard
    Alert.alert(
      "Berhasil!",
      "Akun Anda berhasil dibuat.",
      [
        {
          text: "OK",
          onPress: () => {
            if (onRegisterSuccess) {
              onRegisterSuccess();
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🌱</Text>
          </View>
          <Text style={styles.title}>Buat Akun</Text>
          <Text style={styles.subtitle}>
            Mulai perjalanan kreatifmu bersama Upcycling DIY.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama</Text>
            <TextInput
              style={styles.input}
              placeholder="Budi Santoso"
              placeholderTextColor="#A0A0A0"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="budi@diycreative.com"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••••••"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={securePassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
                <Text style={styles.eyeIcon}>{securePassword ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Konfirmasi Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••••••"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={secureConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
                <Text style={styles.eyeIcon}>{secureConfirm ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Daftar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={onPressLogin}>
            <Text style={styles.loginLink}>Masuk</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// (Bagian styles biarkan tetap sama)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 24, flexGrow: 1, justifyContent: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 24 },
  logoCircle: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#F3F9F1', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#E2EFE0' },
  logoEmoji: { fontSize: 28 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#666666', textAlign: 'center' },
  formContainer: { width: '100%' },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: '600', color: '#2E7D32', marginBottom: 6 },
  input: { backgroundColor: '#F9FBF9', borderWidth: 1, borderColor: '#E2EFE0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#1E1E1E' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FBF9', borderWidth: 1, borderColor: '#E2EFE0', borderRadius: 12, paddingHorizontal: 14 },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: '#1E1E1E' },
  eyeIcon: { fontSize: 16 },
  registerButton: { backgroundColor: '#81C784', borderRadius: 25, paddingVertical: 14, alignItems: 'center', marginTop: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  registerButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  footerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 13, color: '#666666' },
  loginLink: { fontSize: 13, color: '#2E7D32', fontWeight: 'bold', textDecorationLine: 'underline' },
});