import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../services/supabase'; // Pastikan path import supabase sudah benar

export default function HomeScreen() {
  const [loggingOut, setLoggingOut] = useState(false);

  // Menjalankan logout melalui Supabase.
  // App.tsx akan mendeteksi session menjadi null dan kembali ke Onboarding.
  const performLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const { error } = await supabase.auth.signOut({
        scope: 'local',
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat keluar dari akun.';

      if (Platform.OS === 'web') {
        window.alert(`Gagal Keluar: ${message}`);
      } else {
        Alert.alert('Gagal Keluar', message);
      }
    } finally {
      setLoggingOut(false);
    }
  };

  // Konfirmasi logout: window.confirm untuk web, Alert untuk Android/iOS.
  const handleLogout = () => {
    if (loggingOut) return;

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Apakah Anda yakin ingin keluar dari akun Upcycling DIY?'
      );

      if (confirmed) {
        void performLogout();
      }

      return;
    }

    Alert.alert(
      'Konfirmasi Keluar',
      'Apakah Anda yakin ingin keluar dari akun Upcycling DIY?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: () => {
            void performLogout();
          },
        },
      ]
    );
  };

  // Data dummy untuk kategori sampah dengan gambar lokal
  const categories = [
    { id: '1', title: 'Kardus', image: require('../../assets/images/frame1/kardus.png') },
    { id: '2', title: 'Botol Plastik', image: require('../../assets/images/frame1/botol_air.png') },
    { id: '3', title: 'Pakaian', image: require('../../assets/images/frame1/pakaian.png') },
    { id: '4', title: 'Kaca', image: require('../../assets/images/frame1/botol_kaca.png') },
    { 
      id: '5', 
      title: 'Kertas', 
      image: require('../../assets/images/frame1/kertas.png'),
      imageStyle: { width: '100%', height: '100%' } 
    },
    { id: '6', title: 'Kaleng', image: require('../../assets/images/frame1/kaleng.png') },
  ];

  // Data dummy untuk inspirasi populer dengan gambar lokal
  const inspirations = [
    { 
      id: '1', 
      title: 'Organizer Desk dari Kardus', 
      rating: '4.5', 
      image: require('../../assets/images/frame1/inspirasi.png') 
    },
    { 
      id: '2', 
      title: 'Organizer Desk dari Kardus', 
      rating: '4.5', 
      image: require('../../assets/images/frame1/inspirasi.png') 
    },
    { 
      id: '3', 
      title: 'Organizer Desk dari Kardus', 
      rating: '4.5', 
      image: require('../../assets/images/frame1/inspirasi.png') 
    },
    { 
      id: '4', 
      title: 'Organizer Desk dari Kardus', 
      rating: '4.5', 
      image: require('../../assets/images/frame1/inspirasi.png') 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1. HEADER SECTION */}
        <View style={styles.headerContainer}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarEmoji}>👨🏽‍🦱</Text>
            </View>
            <View>
              <Text style={styles.greetingTitle}>Halo, Budi!</Text>
              <Text style={styles.greetingSubtitle}>Ayo kreasi hari ini!</Text>
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>⭐ 100 XP</Text>
            </View>
            
            {/* Tombol Notifikasi */}
            <TouchableOpacity style={styles.notifButton}>
              <Text style={styles.notifIcon}>🔔</Text>
            </TouchableOpacity>

            {/* Tombol Logout Baru di Samping Lonceng */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              disabled={loggingOut}
              accessibilityRole="button"
              accessibilityLabel="Logout"
              accessibilityState={{ disabled: loggingOut }}
            >
              {loggingOut ? (
                <ActivityIndicator size="small" color="#2F6B32" />
              ) : (
                <Text style={styles.logoutIcon}>🚪</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. WEEKLY CHALLENGE BANNER */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>Weekly Challenge</Text>
            <Text style={styles.bannerSubtitle}>Kreasi dari Plastik</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Ikut Sekarang</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.bannerIllustration}>
            <Image 
              source={require('../../assets/images/frame1/banner.png')} 
              style={styles.bannerImage} 
              resizeMode="contain" 
            />
          </View>
        </View>

        {/* 3. SECTION: PUNYA APA HARI INI? */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Punya Apa Hari Ini?</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {categories.map((item) => (
            <TouchableOpacity key={item.id} style={styles.categoryCard}>
              <View style={styles.categoryCircle}>
                <Image 
                  source={item.image} 
                  style={[styles.categoryImage, item.imageStyle]} 
                  resizeMode="cover" 
                />
              </View>
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. SECTION: INSPIRASI POPULER */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Inspirasi Populer</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        {/* ScrollView Horizontal */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {inspirations.map((item) => (
            <View key={item.id} style={styles.inspirationCard}>
              <View style={styles.inspirationImageContainer}>
                <Image 
                  source={item.image} 
                  style={styles.inspirationImage} 
                  resizeMode="cover" 
                />
              </View>
              <Text style={styles.inspirationTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              <TouchableOpacity style={styles.detailButton}>
                <Text style={styles.detailButtonText}>Detail</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

      </ScrollView>

      {/* 5. BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={{ fontSize: 20 }}>🏠</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Beranda</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={{ fontSize: 20 }}>🔍</Text>
          <Text style={styles.navText}>Cari</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={{ fontSize: 20 }}>👤</Text>
          <Text style={styles.navText}>Profil</Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  bannerIllustration: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  bannerImage: {
    width: 90,
    height: 90,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 28,
  },
  greetingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  greetingSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    backgroundColor: '#81C784',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  notifButton: {
    padding: 6,
  },
  notifIcon: {
    fontSize: 20,
  },
  // Style tambahan untuk tombol logout di samping lonceng
  logoutButton: {
    padding: 6,
    marginLeft: 2,
    backgroundColor: '#FFEBEE',
    borderRadius: 15,
  },
  logoutIcon: {
    fontSize: 18,
  },
  bannerContainer: {
    backgroundColor: '#1B5E20',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerTextContent: {
    flex: 1,
  },
  bannerTitle: {
    color: '#C8E6C9',
    fontSize: 14,
    fontWeight: '600',
  },
  bannerSubtitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  bannerButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  bannerButtonText: {
    color: '#1B5E20',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  seeAllText: {
    fontSize: 12,
    color: '#388E3C',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F0F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  horizontalScrollContent: {
    paddingRight: 16,
  },
  inspirationCard: {
    backgroundColor: '#FFF',
    width: 140,
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  inspirationImageContainer: {
    width: '100%',
    height: 90,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inspirationImage: {
    width: '100%',
    height: '100%',
  },
  inspirationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    height: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  starIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  detailButton: {
    marginTop: 4,
  },
  detailButtonText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#757575',
    marginTop: 2,
  },
  activeNavText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
});