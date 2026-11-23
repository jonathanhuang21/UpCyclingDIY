import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserCreations, UserCreation } from '../services/creationsService';
import { supabase } from '../services/supabase';

interface MyCreationsScreenProps {
  onCreateNew?: () => void;
}

export default function MyCreationsScreen({ onCreateNew }: MyCreationsScreenProps) {
  const [creations, setCreations] = useState<UserCreation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCreations = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    const { data, error } = await getUserCreations();
    if (!error) {
      setCreations(data);
    }

    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadCreations(false);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadCreations(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadCreations]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2D7A3A" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kreasi Saya</Text>
        <Text style={styles.subtitle}>Karya daur ulang yang sudah kamu buat</Text>
      </View>

      {creations.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="images-outline" size={56} color="#A8D5A8" />
          </View>
          <Text style={styles.emptyTitle}>Belum ada kreasi</Text>
          <Text style={styles.emptySubtitle}>
            Mulai buat karya daur ulangmu dan{'\n'}simpan di sini!
          </Text>
          <TouchableOpacity style={styles.createButton} onPress={onCreateNew}>
            <Ionicons name="add-circle-outline" size={18} color="#FFF" />
            <Text style={styles.createButtonText}>Buat Kreasi Baru</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={creations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadCreations(true)}
              tintColor="#2D7A3A"
            />
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.cardIconBox}>
                  <Ionicons name="checkmark-circle" size={24} color="#2D7A3A" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.project_title}</Text>
                  <Text style={styles.cardMeta}>
                    {item.category_name ? `${item.category_name} • ` : ''}+{item.exp_earned} EXP
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9F1',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E6F5DE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A3C1A',
    marginBottom: 3,
  },
  cardMeta: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D7A3A',
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