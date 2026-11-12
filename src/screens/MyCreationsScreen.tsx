import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyCreationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kreasi Saya</Text>
        <Text style={styles.subtitle}>Karya daur ulang yang sudah kamu buat</Text>
      </View>

      <View style={styles.emptyState}>
        <View style={styles.emptyIconContainer}>
          <Ionicons name="images-outline" size={56} color="#A8D5A8" />
        </View>
        <Text style={styles.emptyTitle}>Belum ada kreasi</Text>
        <Text style={styles.emptySubtitle}>
          Mulai buat karya daur ulangmu dan{'\n'}simpan di sini!
        </Text>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add-circle-outline" size={18} color="#FFF" />
          <Text style={styles.createButtonText}>Buat Kreasi Baru</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9F1',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A3C1A',
  },
  subtitle: {
    fontSize: 13,
    color: '#5A7A5A',
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -60,
  },
  emptyIconContainer: {
    width: 110,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A3C1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7A9A7A',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D7A3A',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
