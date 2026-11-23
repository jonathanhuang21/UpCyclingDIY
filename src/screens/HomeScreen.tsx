import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabase';
import { getUserCreations } from '../services/creationsService';
import {
  CategoryProjectItem,
  getProjectById,
} from '../data/categoriesData';
import { loadUserFavorites, saveUserFavorites } from '../services/favoritesService';

// ─── Types ───────────────────────────────────────────────────────────────────

interface HomeScreenProps {
  onProfilePress?: () => void;
  onLogoutSuccess?: () => void;
  onCategoryPress?: (categoryName: string) => void;
  onSelectProject?: (project: CategoryProjectItem) => void;
  onSeeAllPress?: () => void;
}

interface CategoryItem {
  id: string;
  title: string;
  image: ReturnType<typeof require>;
  bgColor: string;
}

interface InspirationCardData {
  id: string;
  project: CategoryProjectItem;
}

interface ChallengeSlide {
  id: string;
  chip: string;
  title: string;
  image: ReturnType<typeof require>;
  onPress?: () => void;
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

const POPULAR_INSPIRATIONS: InspirationCardData[] = [
  { id: 'insp-1', project: getProjectById('kardus-1') },
  { id: 'insp-2', project: getProjectById('plastik-1') },
  { id: 'insp-3', project: getProjectById('pakaian-1') },
  { id: 'insp-4', project: getProjectById('kaca-1') },
  { id: 'insp-5', project: getProjectById('kertas-1') },
  { id: 'insp-6', project: getProjectById('kaleng-1') },
];

const CHALLENGE_SLIDES: ChallengeSlide[] = [
  {
    id: '1',
    chip: 'Weekly Challenge',
    title: 'Kreasi dari Plastik',
    image: require('../../assets/images/frame1/banner.png'),
    onPress: undefined,
  },
  {
    id: '2',
    chip: 'Weekly Challenge',
    title: 'Sulap Kardus Bekas',
    image: require('../../assets/images/frame1/banner.png'),
  },
  {
    id: '3',
    chip: 'Weekly Challenge',
    title: 'Dekorasi Kaleng Unik',
    image: require('../../assets/images/frame1/banner.png'),
  },
];

const resolveUserName = (user: any): string => {
  return (
    user?.user_metadata?.username ||
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Kreator'
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Header({
  userName,
  totalExp,
  onProfilePress,
}: {
  userName: string;
  totalExp: number;
  onProfilePress?: () => void;
}) {
  return (
    <View style={styles.headerContainer}>
      {/* Left: avatar + greeting */}
      <View style={styles.headerLeft}>
        <View style={styles.smallAvatarContainer}>
          <Text style={styles.smallAvatarEmoji}>👨🏽‍🦱</Text>
        </View>
        <View>
          <Text style={styles.greetingTitle} numberOfLines={1}>
            Halo, {userName}!
          </Text>
          <Text style={styles.greetingSubtitle}>Ayo Kreasi hari ini! 🤍</Text>
        </View>
      </View>

      {/* Right: XP badge + notif + profile avatar */}
      <View style={styles.headerRight}>
        {/* XP Badge */}
        <View style={styles.xpBadge}>
          <Ionicons name="star" size={13} color="#FFB800" />
          <Text style={styles.xpText}>{totalExp} XP</Text>
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

function WeeklyChallengeBanner({
  onCategoryPress,
}: {
  onCategoryPress?: (categoryName: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bannerWidth, setBannerWidth] = useState(0);

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!bannerWidth) return;
    const offsetX = e.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(offsetX / bannerWidth);
    setActiveIndex(Math.max(0, Math.min(nextIndex, CHALLENGE_SLIDES.length - 1)));
  };

  return (
    <View
      style={styles.bannerContainer}
      onLayout={(e) => setBannerWidth(e.nativeEvent.layout.width)}
    >
      <FlatList
        data={CHALLENGE_SLIDES}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.bannerSlide, bannerWidth ? { width: bannerWidth } : null]}>
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
                  <Text style={styles.bannerChipText}>{item.chip}</Text>
                </View>

                <Text style={styles.bannerTitle}>{item.title}</Text>

                <TouchableOpacity
                  style={styles.bannerButton}
                  activeOpacity={0.85}
                  onPress={() => {
                    if (item.onPress) {
                      item.onPress();
                    } else if (onCategoryPress) {
                      onCategoryPress('Botol Plastik');
                    }
                  }}
                >
                  <Text style={styles.bannerButtonText}>Ikut Sekarang</Text>
                  <Ionicons name="chevron-forward" size={13} color="#2D7A3A" />
                </TouchableOpacity>
              </View>

              {/* Illustration side */}
              <View style={styles.bannerIllustrationSide}>
                <Image
                  source={item.image}
                  style={styles.bannerIllustrationImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
      />

      {/* Dot indicators */}
      <View style={styles.bannerDots}>
        {CHALLENGE_SLIDES.map((slide, index) => (
          <View
            key={slide.id}
            style={[
              styles.bannerDot,
              activeIndex === index && styles.bannerDotActive,
            ]}
          />
        ))}
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

function CategoryGrid({ onCategoryPress }: { onCategoryPress?: (categoryName: string) => void }) {
  return (
    <View style={styles.gridContainer}>
      {CATEGORIES.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.categoryCard}
          activeOpacity={0.8}
          onPress={() => {
            if (onCategoryPress) {
              onCategoryPress(item.title);
            }
          }}
        >
          <View style={[styles.categoryCircle, { backgroundColor: item.bgColor }]}>
            <Image
              source={item.image}
              style={styles.categoryImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.categoryLabel}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function InspirationCard({
  item,
  isFav,
  onToggleFav,
  onPressDetail,
}: {
  item: InspirationCardData;
  isFav: boolean;
  onToggleFav: () => void;
  onPressDetail: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.inspirationCard}
      activeOpacity={0.9}
      onPress={onPressDetail}
    >
      {/* Image area */}
      <View style={styles.inspirationImageWrap}>
        <Image
          source={item.project.image}
          style={styles.inspirationImage}
          resizeMode="cover"
        />
        {/* Heart button */}
        <TouchableOpacity
          style={styles.heartButton}
          activeOpacity={0.8}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFav();
          }}
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={16}
            color={isFav ? '#EF4444' : '#888'}
          />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <Text style={styles.inspirationTitle} numberOfLines={2}>
        {item.project.title}
      </Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={12} color="#FFB800" />
        <Text style={styles.ratingText}>{item.project.rating}</Text>
      </View>

      {/* Detail button */}
      <TouchableOpacity
        style={styles.detailButton}
        activeOpacity={0.85}
        onPress={onPressDetail}
      >
        <Text style={styles.detailButtonText}>Detail</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen({
  onProfilePress,
  onCategoryPress,
  onSelectProject,
  onSeeAllPress,
}: HomeScreenProps) {
  const [userName, setUserName] = useState<string>('Kreator');
  const [totalExp, setTotalExp] = useState<number>(0);
  const [favs, setFavs] = useState<string[]>([]);

  const handleToggleFav = (projectId: string) => {
    setFavs((prev) => {
      const next = prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];
      saveUserFavorites(next);
      return next;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (isMounted && user) {
        setUserName(resolveUserName(user));
      }

      const [creationsRes, userFavs] = await Promise.all([
        getUserCreations(),
        loadUserFavorites(),
      ]);

      if (!isMounted) return;

      setFavs(userFavs);

      if (!creationsRes.error) {
        const sumExp = creationsRes.data.reduce(
          (acc, item) => acc + (item.exp_earned || 0),
          0
        );
        setTotalExp(sumExp);
      } else {
        setTotalExp(0);
      }
    };

    loadUserData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        setUserName(resolveUserName(session.user));
      } else {
        setUserName('Kreator');
      }
      loadUserData();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSeeAll = () => {
    if (onSeeAllPress) {
      onSeeAllPress();
    } else {
      onCategoryPress?.('Kardus');
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Header userName={userName} totalExp={totalExp} onProfilePress={onProfilePress} />
      <WeeklyChallengeBanner onCategoryPress={onCategoryPress} />

      <SectionHeader
        icon="🌿"
        title="Punya Apa Hari Ini?"
        onSeeAll={handleSeeAll}
      />
      <CategoryGrid onCategoryPress={onCategoryPress} />

      <SectionHeader
        icon="✨"
        title="Inspirasi Populer"
        onSeeAll={handleSeeAll}
      />
      <FlatList
        data={POPULAR_INSPIRATIONS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.inspirationListContent}
        renderItem={({ item }) => (
          <InspirationCard
            item={item}
            isFav={favs.includes(item.project.id)}
            onToggleFav={() => handleToggleFav(item.project.id)}
            onPressDetail={() => onSelectProject?.(item.project)}
          />
        )}
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
    paddingTop: 45,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 8,
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
    maxWidth: 150,
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
    marginBottom: 22,
    overflow: 'hidden',
    position: 'relative',
    height: 156,
  },
  bannerSlide: {
    height: 156,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
    position: 'relative',
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
    flex: 1,
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
    marginBottom: 14,
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
    position: 'absolute',
    bottom: 9,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '31%',
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
  categoryImage: {
    width: '100%',
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
    height: 120,
  },
});