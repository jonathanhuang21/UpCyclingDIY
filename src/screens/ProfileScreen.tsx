
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { supabase } from '../services/supabase';

const GREEN = '#2F6B32';
const DARK_GREEN = '#244B29';
const LIGHT_GREEN = '#EDF6EE';

type MenuRowProps = {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
};

const MenuRow = ({
  icon,
  title,
  subtitle,
  onPress,
}: MenuRowProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.menuRow,
      pressed && styles.pressed,
    ]}
    onPress={onPress}
  >
    <View style={styles.menuIcon}>
      <Text style={styles.menuIconText}>{icon}</Text>
    </View>

    <View style={styles.menuInfo}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>

    <Text style={styles.arrow}>›</Text>
  </Pressable>
);

export default function ProfileScreen() {
  const [name, setName] = useState('Pengguna');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // Mengambil data pengguna dari Supabase
  useEffect(() => {
    let mounted = true;

    const getProfile = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) throw error;

        if (mounted && data.user) {
          const user = data.user;

          const fullName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split('@')[0] ||
            'Pengguna';

          setName(String(fullName));
          setEmail(user.email || '');
        }
      } catch (error) {
        console.log('Profile error:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getProfile();

    return () => {
      mounted = false;
    };
  }, []);

  // Proses logout
  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah kamu yakin ingin keluar dari akun?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            void performLogout();
          },
        },
      ]
    );
  };

  const performLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const { error } = await supabase.auth.signOut({
        scope: 'local',
      });

      if (error) throw error;

      // App.tsx mendeteksi session null
      // dan mengembalikan pengguna ke Onboarding.

    } catch (error) {
      Alert.alert(
        'Logout Gagal',
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat logout.'
      );
    } finally {
      setLoggingOut(false);
    }
  };

  const showComingSoon = (feature: string) => {
    Alert.alert(
      feature,
      'Fitur ini akan segera tersedia.'
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>

          <Pressable
            style={styles.settingsButton}
            onPress={() => showComingSoon('Pengaturan')}
          >
            <Text style={styles.settingsIcon}>⚙</Text>
          </Pressable>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{name}</Text>

            <Text style={styles.userEmail}>
              {loading ? 'Memuat profil...' : email}
            </Text>

            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>
                Level 2: Tukang Bikin
              </Text>
            </View>
          </View>
        </View>

        {/* EXP CARD */}
        <View style={styles.expCard}>
          <View style={styles.expHeader}>
            <View>
              <Text style={styles.sectionLabel}>
                LEVEL SAAT INI
              </Text>

              <Text style={styles.levelTitle}>
                Level 2: Tukang Bikin
              </Text>
            </View>

            <View style={styles.levelIcon}>
              <Text style={styles.trophy}>🏆</Text>
            </View>
          </View>

          <View style={styles.expNumbers}>
            <Text style={styles.currentExp}>250 EXP</Text>
            <Text style={styles.maxExp}>500 EXP</Text>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.expDescription}>
            Kumpulkan EXP untuk mencapai level berikutnya!
          </Text>
        </View>

        {/* STATISTICS */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Proyek Dibuat</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>250</Text>
            <Text style={styles.statLabel}>Total EXP</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Favorit</Text>
          </View>
        </View>

        {/* MENU */}
        <Text style={styles.menuSectionTitle}>
          Aktivitas Saya
        </Text>

        <View style={styles.menuCard}>
          <MenuRow
            icon="📁"
            title="Proyek Saya"
            subtitle="Lihat proyek DIY kamu"
            onPress={() => showComingSoon('Proyek Saya')}
          />

          <View style={styles.menuDivider} />

          <MenuRow
            icon="❤️"
            title="Favorit"
            subtitle="DIY yang kamu simpan"
            onPress={() => showComingSoon('Favorit')}
          />

          <View style={styles.menuDivider} />

          <MenuRow
            icon="🏆"
            title="Pencapaian"
            subtitle="Lihat pencapaian kamu"
            onPress={() => showComingSoon('Pencapaian')}
          />

          <View style={styles.menuDivider} />

          <MenuRow
            icon="⚙️"
            title="Pengaturan"
            subtitle="Atur akun dan aplikasi"
            onPress={() => showComingSoon('Pengaturan')}
          />
        </View>

        {/* LOGOUT */}
        <Text style={styles.menuSectionTitle}>
          Akun
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.pressed,
          ]}
          onPress={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.logoutIcon}>↪</Text>
              <Text style={styles.logoutText}>Logout</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.version}>
          Upcycling DIY · Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

// STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: DARK_GREEN,
  },

  settingsButton: {
    width: 40,
    height: 40,
    backgroundColor: LIGHT_GREEN,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingsIcon: {
    fontSize: 22,
    color: GREEN,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    elevation: 2,
    marginBottom: 16,
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: LIGHT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: GREEN,
  },

  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },

  userName: {
    fontSize: 19,
    fontWeight: '800',
    color: DARK_GREEN,
  },

  userEmail: {
    fontSize: 11,
    color: '#858C85',
    marginTop: 4,
  },

  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 8,
  },

  levelText: {
    fontSize: 10,
    color: GREEN,
    fontWeight: '700',
  },

  expCard: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 17,
    elevation: 2,
    marginBottom: 16,
  },

  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionLabel: {
    fontSize: 9,
    color: '#929A92',
    fontWeight: '600',
  },

  levelTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: DARK_GREEN,
    marginTop: 5,
  },

  levelIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: LIGHT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trophy: {
    fontSize: 20,
  },

  expNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 7,
  },

  currentExp: {
    fontSize: 11,
    color: GREEN,
    fontWeight: '700',
  },

  maxExp: {
    fontSize: 11,
    color: '#929A92',
  },

  progressBackground: {
    height: 8,
    backgroundColor: '#E5EAE5',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: GREEN,
    borderRadius: 10,
  },

  expDescription: {
    fontSize: 10,
    color: '#8B928B',
    marginTop: 9,
  },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderRadius: 17,
    elevation: 2,
    marginBottom: 25,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: GREEN,
  },

  statLabel: {
    fontSize: 10,
    color: '#7B847B',
    marginTop: 5,
    textAlign: 'center',
  },

  statDivider: {
    width: 1,
    backgroundColor: '#E8EDE8',
  },

  menuSectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: DARK_GREEN,
    marginBottom: 12,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingHorizontal: 15,
    marginBottom: 23,
    elevation: 2,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: LIGHT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuIconText: {
    fontSize: 19,
  },

  menuInfo: {
    flex: 1,
    marginLeft: 13,
  },

  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#303B30',
  },

  menuSubtitle: {
    fontSize: 10,
    color: '#929A92',
    marginTop: 4,
  },

  arrow: {
    fontSize: 25,
    color: '#929A92',
    marginLeft: 8,
  },

  menuDivider: {
    height: 1,
    backgroundColor: '#EEF1EE',
  },

  logoutButton: {
    height: 52,
    backgroundColor: GREEN,
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logoutIcon: {
    fontSize: 19,
    color: '#FFFFFF',
    marginRight: 9,
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  pressed: {
    opacity: 0.7,
  },

  version: {
    color: '#A0A7A0',
    fontSize: 10,
    textAlign: 'center',
  },
});
