import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../services/supabase';

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const GREEN = '#1B5E20';
const BG_COLOR = '#F3F9F1';

export default function ChangePasswordModal({
  visible,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (loading) return;
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  const handleSavePassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert('Peringatan', 'Kata sandi baru minimal 6 karakter!');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Peringatan', 'Konfirmasi kata sandi tidak sama!');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        Alert.alert('Gagal Mengubah Sandi', error.message);
        return;
      }

      setNewPassword('');
      setConfirmPassword('');
      Alert.alert('Berhasil', 'Kata sandi akun Anda telah diperbarui.', [
        {
          text: 'OK',
          onPress: () => {
            onClose();
            onSuccess?.();
          },
        },
      ]);
    } catch (err: any) {
      Alert.alert('Terjadi Kesalahan', err?.message || 'Gagal memperbarui kata sandi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Ubah Kata Sandi</Text>
          <Text style={styles.subtitle}>
            Masukkan kata sandi baru untuk akun Anda yang sedang aktif.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kata Sandi Baru</Text>
            <TextInput
              style={styles.input}
              placeholder="Minimal 6 karakter"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Konfirmasi Kata Sandi Baru</Text>
            <TextInput
              style={styles.input}
              placeholder="Ulangi kata sandi baru"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.cancelButton, loading && styles.disabledBtn]}
              onPress={handleClose}
              disabled={loading}
            >
              <Text style={styles.cancelText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, loading && styles.disabledBtn]}
              onPress={handleSavePassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.saveText}>Simpan</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5EFE3',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 18,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: BG_COLOR,
    borderWidth: 1,
    borderColor: '#D8E6D5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#1E1E1E',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  cancelText: {
    color: '#444444',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledBtn: {
    opacity: 0.7,
  },
});