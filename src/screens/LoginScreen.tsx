import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../services/supabase';

interface LoginScreenProps {
  onPressRegister?: () => void;
  onPressBack?: () => void;
  onLoginSuccess?: () => void;
  onPressForgotPassword?: () => void;
}

const GREEN = '#1B5E20';
const LIGHT_GREEN = '#2E7D32';
const BG_COLOR = '#F3F9F1';

export default function LoginScreen({
  onPressRegister,
  onPressBack,
  onLoginSuccess,
  onPressForgotPassword,
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      Alert.alert('Peringatan', 'Email dan kata sandi harus diisi!');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        Alert.alert('Gagal Masuk', error.message);
        return;
      }

      onLoginSuccess?.();
    } catch (err: any) {
      Alert.alert('Terjadi Kesalahan', err?.message || 'Gagal melakukan login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {onPressBack && (
          <TouchableOpacity style={styles.backBtn} onPress={onPressBack} disabled={loading}>
            <Text style={styles.backText}>← Kembali</Text>
          </TouchableOpacity>
        )}

        <View style={styles.headerContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>♻️</Text>
          </View>
          <Text style={styles.welcomeTitle}>Selamat Datang Kembali!</Text>
          <Text style={styles.welcomeSubtitle}>
            Masuk untuk melanjutkan aksi hijau dan kreasimu hari ini.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="cth: budi@email.com"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kata Sandi</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Masukkan kata sandi"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setSecureText((prev) => !prev)}
                disabled={loading}
              >
                <Text style={styles.showHideText}>{secureText ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={onPressForgotPassword}
            disabled={loading}
          >
            <Text style={styles.forgotText}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledBtn]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginButtonText}>Masuk</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Belum punya akun? </Text>
          <TouchableOpacity onPress={onPressRegister} disabled={loading}>
            <Text style={styles.registerText}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  scrollContent: {
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingVertical: 6,
  },
  backText: {
    fontSize: 13,
    fontWeight: '600',
    color: GREEN,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 12,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#81C784',
  },
  logoEmoji: {
    fontSize: 32,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 6,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F9FBF9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1E1E1E',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FBF9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1E1E1E',
  },
  showHideText: {
    fontSize: 16,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 12,
    color: LIGHT_GREEN,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledBtn: {
    opacity: 0.7,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#666666',
  },
  registerText: {
    fontSize: 13,
    color: GREEN,
    fontWeight: 'bold',
  },
});