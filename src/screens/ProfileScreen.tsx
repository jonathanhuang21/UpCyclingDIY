import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabase';
import { getUserCreations, UserCreation } from '../services/creationsService';

interface ProfileScreenProps {
  onBack?: () => void;
  onLogoutSuccess?: () => void;
}

const MENU_ITEMS = [
  { icon: 'person-outline', label: 'Edit Profil', color: '#2D7A3A' },
  { icon: 'trophy-outline', label: 'Pencapaian Saya', color: '#F59E0B' },
  { icon: 'heart-outline', label: 'Favorit Saya', color: '#EF4444' },
  { icon: 'settings-outline', label: 'Pengaturan', color: '#6B7280' },
  { icon: 'help-circle-outline', label: 'Bantuan & FAQ', color: '#3B82F6' },
  { icon: 'information-circle-outline', label: 'Tentang Aplikasi', color: '#8B5CF6' },
];

const resolveUserName = (user: any): string => {
  return (
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.user_metadata?.username ||
    user?.email?.split('@')[0] ||
    'Kreator'
  );
};

const resolveUserHandle = (user: any, displayName: string): string => {
  const rawHandle =
    user?.user_metadata?.username ||
    user?.user_metadata?.handle ||
    user?.email?.split('@')[0] ||
    displayName;

  const cleanHandle = String(rawHandle)
    .trim()
    .toLowerCase()
    .replace(/^@+/, '')
    .replace(/\s+/g, '_');

  return `@${cleanHandle || 'kreator'}`;
};

export default function ProfileScreen({ onBack, onLogoutSuccess }: ProfileScreenProps) {
  const [userName, setUserName] = useState<string>('Kreator');
  const [userHandle, setUserHandle] = useState<string>('@kreator');
  const [creations, setCreations] = useState<UserCreation[]>([]);
  const [loadingCreations, setLoadingCreations] = useState<boolean>(true);

  const loadCreations = async () => {
    setLoadingCreations(true);
    const { data, error } = await getUserCreations();
    if (!error) {
      setCreations(data);
    }
    setLoadingCreations(false);
  };

  useEffect(() => {
    let isMounted = true;

    const applyUserData = (user: any) => {
      if (!isMounted) return;
      if (user) {
        const name = resolveUserName(user);
        setUserName(name);
        setUserHandle(resolveUserHandle(user, name));
      } else {
        setUserName('Kreator');
        setUserHandle('@kreator');
      }
    };

    const loadCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      applyUserData(user);
      if (isMounted) {
        await loadCreations();
      }
    };

    loadCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applyUserData(session?.user ?? null);
      if (isMounted) {
        loadCreations();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const totalCreations = creations.length;
  const totalExp = creations.reduce((sum, item) => sum + (item.exp_earned || 0), 0);
  const currentLevel = Math.max(1, Math.floor(totalExp / 100) + 1);
  const nextLevelExp = currentLevel * 100;
  const expInCurrentLevel = totalExp % 100;
  const progressPercent = Math.min(100, Math.round((expInCurrentLevel / 100) * 100));

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Gagal melakukan logout:', error.message);
        return;
      }

      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
    } catch (err) {
      console.error('Terjadi kesalahan saat logout:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color="#1A3C1A" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Profil</Text>
        <View style={styles.topBarRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>👨🏽‍🦱</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={14} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName} numberOfLines={1}>
            {userName}
          </Text>
          <Text style={styles.userHandle} numberOfLines={1}>
            {userHandle}
          </Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalExp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalCreations}</Text>
              <Text style={styles.statLabel}>Kreasi</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalCreations}</Text>
              <Text style={styles.statLabel}>Badge</Text>
            </View>
          </View>
        </View>

        {/* XP Progress */}
        <View style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <View style={styles.xpTitleRow}>
              <Ionicons name="star" size={16} color="#FFB800" />
              <Text style={styles.xpTitle}>Progress XP</Text>
            </View>
            <Text style={styles.xpLevel}>Level {currentLevel}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.xpCaption}>
            {totalExp} / {nextLevelExp} XP menuju Level {currentLevel + 1}
          </Text>
        </View>

        {/* Saved Creations from Supabase */}
        <View style={styles.creationsCard}>
          <View style={styles.creationsHeader}>
            <Text style={styles.creationsTitle}>Kreasi Tersimpan</Text>
            <Text style={styles.creationsCount}>{totalCreations} proyek</Text>
          </View>

          {loadingCreations ? (
            <ActivityIndicator size="small" color="#2D7A3A" style={{ paddingVertical: 12 }} />
          ) : creations.length === 0 ? (
            <Text style={styles.emptyCreationsText}>
              Belum ada kreasi yang tersimpan untuk akun ini.
            </Text>
          ) : (
            creations.map((item, idx) => (
              <View
                key={item.id}
                style={[
                  styles.creationRow,
                  idx < creations.length - 1 && styles.creationRowBorder,
                ]}
              >
                <View style={styles.creationBadge}>
                  <Ionicons name="checkmark-circle" size={18} color="#2D7A3A" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.creationName} numberOfLines={1}>
                    {item.project_title}
                  </Text>
                  <Text style={styles.creationSub}>
                    {item.category_name ? `${item.category_name} • ` : ''}+{item.exp_earned} XP
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Menu List */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                index < MENU_ITEMS.length - 1 && styles.menuItemBorder,
              ]}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9F1',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 45,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A3C1A',
  },
  topBarRight: {
    width: 40,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E8F5E8',
  },
  avatarEmoji: {
    fontSize: 46,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    backgroundColor: '#2D7A3A',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A3C1A',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 13,
    color: '#7A9A7A',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A3C1A',
  },
  statLabel: {
    fontSize: 12,
    color: '#7A9A7A',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E0E0E0',
  },
  xpCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  xpTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A3C1A',
  },
  xpLevel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D7A3A',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8F5E8',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2D7A3A',
    borderRadius: 4,
  },
  xpCaption: {
    fontSize: 12,
    color: '#7A9A7A',
  },
  creationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  creationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  creationsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A3C1A',
  },
  creationsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D7A3A',
  },
  emptyCreationsText: {
    fontSize: 13,
    color: '#7A9A7A',
    paddingVertical: 6,
  },
  creationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  creationRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F2',
  },
  creationBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  creationName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A3C1A',
  },
  creationSub: {
    fontSize: 12,
    color: '#5A7A5A',
    marginTop: 2,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
  },
});