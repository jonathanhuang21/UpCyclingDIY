import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ─── Types ───────────────────────────────────────────────────────────────────

interface HomeScreenProps {
  onProfilePress?: () => void;
}

interface CategoryItem {
  id: string;
  title: string;
  image: ReturnType<typeof require>;
  bgColor: string;
}

interface InspirationItem {
  id: string;
  title: string;
  rating: string;
  image: ReturnType<typeof require>;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES: CategoryItem[] = [
  {
    id: '1',
    title: 'Kardus',
    image: require('../../assets/images/frame1/kardus.png'),
    bgColor: '#F5E5C4',
  },
  {
    id: '2',
    title: 'Botol Plastik',
    image: require('../../assets/images/frame1/botol_air.png'),
    bgColor: '#C0E8F4',
  },
  {
    id: '3',
    title: 'Pakaian',
    image: require('../../assets/images/frame1/pakaian.png'),
    bgColor: '#FFF5C0',
  },
  {
    id: '4',
    title: 'Kaca',
    image: require('../../assets/images/frame1/botol_kaca.png'),
    bgColor: '#D2EDCE',
  },
  {
    id: '5',
    title: 'Kertas',
    image: require('../../assets/images/frame1/kertas.png'),
    bgColor: '#E2E2E2',
  },
  {
    id: '6',
    title: 'Kaleng',
    image: require('../../assets/images/frame1/kaleng.png'),
    bgColor: '#FFD9B8',
  },
];

const INSPIRATIONS: InspirationItem[] = [
  {
    id: '1',
    title: 'Organizer Desk dari Kardus',
    rating: '4.5',
    image: require('../../assets/images/frame1/inspirasi.png'),
  },
  {
    id: '2',
    title: 'Organizer Desk dari Kardus',
    rating: '4.5',
    image: require('../../assets/images/frame1/inspirasi.png'),
  },
  {
    id: '3',
    title: 'Organizer Desk dari Kardus',
    rating: '4.5',
    image: require('../../assets/images/frame1/inspirasi.png'),
  },
  {
    id: '4',
    title: 'Organizer Desk dari Kardus',
    rating: '4.5',
    image: require('../../assets/images/frame1/inspirasi.png'),
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Header({ onProfilePress }: { onProfilePress?: () => void }) {
  return (
    <View style={styles.headerContainer}>
      {/* Left: avatar + greeting */}
      <View style={styles.headerLeft}>
        <View style={styles.smallAvatarContainer}>
          <Text style={styles.smallAvatarEmoji}>👨🏽‍🦱</Text>
        </View>
        <View>
          <Text style={styles.greetingTitle}>Halo, Budi!</Text>
          <Text style={styles.greetingSubtitle}>Ayo Kreasi hari ini! 🤍</Text>
        </View>
      </View>

      {/* Right: XP badge + notif + profile avatar */}
      <View style={styles.headerRight}>
        {/* XP Badge */}
        <View style={styles.xpBadge}>
          <Ionicons name="star" size={13} color="#FFB800" />
          <Text style={styles.xpText}>100 XP</Text>
        </View>

        {/* Notification bell */}
        <TouchableOpacity style={styles.notifButton}>
          <Ionicons name="notifications" size={22} color="#444" />
          <View style={styles.notifDot} />
        </TouchableOpacity>

        {/* Profile avatar (clickable) */}
        <TouchableOpacity
          style={styles.profileAvatarButton}
          onPress={onProfilePress}
          activeOpacity={0.85}
        >
          <View style={styles.profileAvatarCircle}>
            <Text style={styles.profileAvatarEmoji}>👨🏽‍🦱</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function WeeklyChallengeBanner() {
  return (
    <View style={styles.bannerContainer}>
      {/* Background decorative circles */}
      <View style={styles.bannerDecorCircle1} />
      <View style={styles.bannerDecorCircle2} />
      <View style={styles.bannerDecorCircle3} />

      {/* Stars decorative */}
      <Text style={styles.bannerDecorStar1}>✦</Text>
      <Text style={styles.bannerDecorStar2}>✦</Text>

      {/* Content row */}
      <View style={styles.bannerContentRow}>
        {/* Text side */}
        <View style={styles.bannerTextSide}>
          {/* Chip label */}
          <View style={styles.bannerChip}>
            <Text style={styles.bannerChipText}>Weekly Challenge</Text>
          </View>

          <Text style={styles.bannerTitle}>Kreasi dari Plastik</Text>

          <TouchableOpacity style={styles.bannerButton} activeOpacity={0.85}>
            <Text style={styles.bannerButtonText}>Ikut Sekarang</Text>
            <Ionicons name="chevron-forward" size={13} color="#2D7A3A" />
          </TouchableOpacity>
        </View>

        {/* Illustration side */}
        <View style={styles.bannerIllustrationSide}>
          <Image
            source={require('../../assets/images/frame1/banner.png')}
            style={styles.bannerIllustrationImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Dot indicators */}
      <View style={styles.bannerDots}>
        <View style={[styles.bannerDot, styles.bannerDotActive]} />
        <View style={styles.bannerDot} />
        <View style={styles.bannerDot} />
      </View>
    </View>
  );
}

function SectionHeader({
  icon,
  title,
  onSeeAll,
}: {
  icon: string;
  title: string;
  onSeeAll?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAll}>
        <Text style={styles.seeAllText}>Lihat Semua</Text>
        <Ionicons name="arrow-forward" size={13} color="#2D7A3A" />
      </TouchableOpacity>
    </View>
  );
}

function CategoryGrid() {
  return (
    <View style={styles.gridContainer}>
      {CATEGORIES.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.categoryCard}
          activeOpacity={0.8}
        >
          {/* Lingkaran: overflow hidden agar gambar ter-crop mengikuti bentuk bulat */}
          <View style={[styles.categoryCircle, { backgroundColor: item.bgColor }]}>
            <Image
              source={item.image}
              style={styles.categoryImage}
              resizeMode="cover" // Opsi B: gambar memenuhi seluruh lingkaran
            />
          </View>
          <Text style={styles.categoryLabel}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function InspirationCard({ item }: { item: InspirationItem }) {
  return (
    <View style={styles.inspirationCard}>
      {/* Image area */}
      <View style={styles.inspirationImageWrap}>
        <Image
          source={item.image}
          style={styles.inspirationImage}
          resizeMode="cover"
        />
        {/* Heart button */}
        <TouchableOpacity style={styles.heartButton} activeOpacity={0.8}>
          <Ionicons name="heart-outline" size={16} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <Text style={styles.inspirationTitle} numberOfLines={2}>
        {item.title}
      </Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={12} color="#FFB800" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      {/* Detail button */}
      <TouchableOpacity style={styles.detailButton} activeOpacity={0.85}>
        <Text style={styles.detailButtonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen({ onProfilePress }: HomeScreenProps) {
  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* 1. Header */}
      <Header onProfilePress={onProfilePress} />

      {/* 2. Weekly Challenge Banner */}
      <WeeklyChallengeBanner />

      {/* 3. Kategori */}
      <SectionHeader icon="🌿" title="Punya Apa Hari Ini?" />
      <CategoryGrid />

      {/* 4. Inspirasi Populer */}
      <SectionHeader icon="✨" title="Inspirasi Populer" />
      <FlatList
        data={INSPIRATIONS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.inspirationListContent}
        renderItem={({ item }) => <InspirationCard item={item} />}
        style={styles.inspirationList}
        scrollEnabled={true}
      />

      {/* Extra bottom spacing so last card isn't hidden by floating bottom nav */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F3F9F1',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  smallAvatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D0EDCE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  smallAvatarEmoji: {
    fontSize: 25,
  },
  greetingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A3C1A',
  },
  greetingSubtitle: {
    fontSize: 11.5,
    color: '#6A8A6A',
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A3C1A',
  },
  notifButton: {
    position: 'relative',
    width: 38,
    height: 38,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  notifDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  profileAvatarButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileAvatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileAvatarEmoji: {
    fontSize: 24,
  },

  // ── Banner ────────────────────────────────────────────────────────────────
  bannerContainer: {
  backgroundColor: '#176329',
  borderRadius: 22,
  paddingHorizontal: 18,
  paddingTop: 16,
  paddingBottom: 14,
  marginBottom: 22,
  overflow: 'hidden',
  position: 'relative',
  height: 150,   // ← tambahkan, ubah angkanya sesuai selera
},
  bannerDecorCircle1: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -20,
    left: 100,
  },
  bannerDecorCircle2: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -10,
    left: 60,
  },
  bannerDecorCircle3: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: 8,
    left: 160,
  },
  bannerDecorStar1: {
    position: 'absolute',
    top: 10,
    right: 108,
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
  },
  bannerDecorStar2: {
    position: 'absolute',
    top: 44,
    left: 148,
    fontSize: 9,
    color: 'rgba(255,255,255,0.45)',
  },
  bannerContentRow: {
  flex: 1,   // ← tambahkan agar mengisi tinggi banner
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
  bannerTextSide: {
    flex: 1,
    paddingRight: 6,
  },
  bannerChip: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginBottom: 8,
  },
  bannerChipText: {
    fontSize: 10.5,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 25,
    marginBottom: 25,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 3,
  },
  bannerButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#176329',
  },
  bannerIllustrationSide: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerIllustrationImage: {
    width: 110,
    height: 110,
  },
  bannerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 5,
  },
  bannerDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  bannerDotActive: {
    width: 16,
    backgroundColor: '#FFFFFF',
  },

  // ── Section header ────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sectionIcon: {
    fontSize: 17,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A3C1A',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#2D7A3A',
  },

  // ── Category grid ─────────────────────────────────────────────────────────
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  categoryCard: {
    // 3 kolom: (100% - 2 gap) / 3
    width: '31%',
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden', // ← Opsi B: potong gambar mengikuti lingkaran
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
  categoryImage: {
    width: '100%', // ← Opsi B: penuhi seluruh lingkaran
    height: '100%',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2A2A2A',
    textAlign: 'center',
  },

  // ── Inspiration ───────────────────────────────────────────────────────────
  inspirationList: {
    marginLeft: -16,
    marginRight: -16,
  },
  inspirationListContent: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 4,
  },
  inspirationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    width: 150,
    marginRight: 12,
    shadowColor: '#1A3C1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    paddingBottom: 12,
    overflow: 'visible',
  },
  inspirationImageWrap: {
    width: '100%',
    height: 108,
    backgroundColor: '#E8D5A8',
    position: 'relative',
    marginBottom: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
  },
  inspirationImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inspirationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A3C1A',
    paddingHorizontal: 10,
    marginBottom: 5,
    lineHeight: 17,
    minHeight: 34,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
  },
  detailButton: {
    marginHorizontal: 10,
    backgroundColor: '#EAF5EC',
    borderRadius: 20,
    paddingVertical: 7,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C5E8C8',
  },
  detailButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#176329',
  },

  // ── Spacer ────────────────────────────────────────────────────────────────
  bottomSpacer: {
    // Pastikan konten tidak tertutup floating bottom nav (~70px) + margin aman
    height: 120,
  },
});