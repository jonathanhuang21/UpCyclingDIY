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
import { supabase } from '../services/supabase';

interface RegisterScreenProps {
  onPressLogin?: () => void;
  onPressBack?: () => void;
  onRegisterSuccess?: () => void;
}

const GREEN = '#1B5E20';
const LIGHT_GREEN = '#2E7D32';
const BG_COLOR = '#F3F9F1';

export default function RegisterScreen({ onPressLogin, onPressBack, onRegisterSuccess }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Peringatan", "Semua kolom harus diisi!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Peringatan", "Password dan Konfirmasi Password tidak sama!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        Alert.alert("Gagal Daftar", error.message);
        setLoading(false);
        return;
      }

      Alert.alert(
        "Berhasil!",
        "Akun Anda berhasil dibuat. Silakan masuk.",
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
    } catch (err: any) {
      Alert.alert("Terjadi Kesalahan", err.message || "Gagal melakukan registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header / Logo */}
        <View style={styles.headerContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🌱</Text>
          </View>
          <Text style={styles.title}>Buat Akun</Text>
          <Text style={styles.subtitle}>
            Mulai perjalanan kreatifmu bersama Upcycling DIY.
          </Text>
        </View>

        {/* Form Card Container */}
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
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

          <TouchableOpacity 
            style={[styles.registerButton, loading && { opacity: 0.7 }]} 
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>{loading ? 'Memproses...' : 'Daftar'}</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Login Link */}
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: BG_COLOR 
  },
  scrollContent: { 
    padding: 24, 
    flexGrow: 1, 
    justifyContent: 'center' 
  },
  headerContainer: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  logoCircle: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 14, 
    borderWidth: 1, 
    borderColor: '#E2EFE0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  logoEmoji: { 
    fontSize: 32 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: GREEN, 
    marginBottom: 6 
  },
  subtitle: { 
    fontSize: 13, 
    color: '#666666', 
    textAlign: 'center' 
  },
  formCard: { 
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: { 
    marginBottom: 14 
  },
  label: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: LIGHT_GREEN, 
    marginBottom: 6 
  },
  input: { 
    backgroundColor: '#F9FBF9', 
    borderWidth: 1, 
    borderColor: '#E2EFE0', 
    borderRadius: 12, 
    paddingHorizontal: 14, 
    paddingVertical: 12, 
    fontSize: 14, 
    color: '#1E1E1E' 
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F9FBF9', 
    borderWidth: 1, 
    borderColor: '#E2EFE0', 
    borderRadius: 12, 
    paddingHorizontal: 14 
  },
  passwordInput: { 
    flex: 1, 
    paddingVertical: 12, 
    fontSize: 14, 
    color: '#1E1E1E' 
  },
  eyeIcon: { 
    fontSize: 16 
  },
  registerButton: { 
    backgroundColor: GREEN, 
    height: 52,
    borderRadius: 26, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10, 
    shadowColor: GREEN, 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 6, 
    elevation: 3 
  },
  registerButtonText: { 
    color: '#FFF', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  footerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 20 
  },
  footerText: { 
    fontSize: 13, 
    color: '#888888' 
  },
  loginLink: { 
    fontSize: 13, 
    color: LIGHT_GREEN, 
    fontWeight: 'bold' 
  },
});