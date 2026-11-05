import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from './src/services/supabase';
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import DetailGuideScreen from './src/screens/DetailGuideScreen';
import TutorialScreen from './src/screens/TutorialScreen';
import ProjectCompleteScreen from './src/screens/ProjectCompleteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Tab } from './src/components/BottomNav';

type ScreenType =
  | 'onboarding' | 'register' | 'login' | 'home'
  | 'search' | 'detail' | 'tutorial' | 'complete' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');
  const [initializing, setInitializing] = useState(true);
  const [searchTitle, setSearchTitle] = useState('Cari');
  const [detailBack, setDetailBack] = useState<ScreenType>('search');

  // Navigasi bottom bar (Beranda / Cari / Profil)
  const handleTab = (tab: Tab) => {
    if (tab === 'home') setCurrentScreen('home');
    else if (tab === 'profile') setCurrentScreen('profile');
    else {
      setSearchTitle('Cari');
      setCurrentScreen('search');
    }
  };

  // Cek apakah pengguna sudah memiliki sesi login aktif di Supabase saat aplikasi dibuka
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setCurrentScreen('home');
      }
      setInitializing(false);
    });

    // Listener untuk memantau perubahan status login/logout secara real-time
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // Jika ada sesi (Login / Auto Login). Jangan paksa ke home kalau user sudah di dalam aplikasi
        setCurrentScreen((prev) =>
          prev === 'onboarding' || prev === 'register' || prev === 'login' ? 'home' : prev
        );
      } else {
        // TAMBAHAN PENTING: Jika sesi null (Logout), kembalikan ke Onboarding/Login
        setCurrentScreen('onboarding');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (initializing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1B5E20" />
      </View>
    );
  }

  if (currentScreen === 'onboarding') {
    return (
      <OnboardingScreen 
        onPressStart={() => setCurrentScreen('register')} 
        onPressLogin={() => setCurrentScreen('login')} 
      />
    );
  } else if (currentScreen === 'register') {
    return (
      <RegisterScreen 
        onPressLogin={() => setCurrentScreen('login')} 
        onPressBack={() => setCurrentScreen('onboarding')}
        onRegisterSuccess={() => setCurrentScreen('login')} 
      />
    );
  } else if (currentScreen === 'login') {
    return (
      <LoginScreen 
        onPressRegister={() => setCurrentScreen('register')} 
        onPressBack={() => setCurrentScreen('onboarding')}
        onLoginSuccess={() => setCurrentScreen('home')} 
      />
    );
  } else if (currentScreen === 'home') {
    return (
      <HomeScreen
        onNavigate={handleTab}
        onOpenCategory={(title) => { setSearchTitle('Kreasi ' + title); setCurrentScreen('search'); }}
        onOpenGuide={() => { setDetailBack('home'); setCurrentScreen('detail'); }}
      />
    );
  } else if (currentScreen === 'search') {
    return (
      <SearchScreen
        title={searchTitle}
        onBack={() => setCurrentScreen('home')}
        onOpenGuide={() => { setDetailBack('search'); setCurrentScreen('detail'); }}
        onNavigate={handleTab}
      />
    );
  } else if (currentScreen === 'detail') {
    return (
      <DetailGuideScreen
        onBack={() => setCurrentScreen(detailBack)}
        onStart={() => setCurrentScreen('tutorial')}
      />
    );
  } else if (currentScreen === 'tutorial') {
    return (
      <TutorialScreen
        onBack={() => setCurrentScreen('detail')}
        onFinish={() => setCurrentScreen('complete')}
        onNavigate={handleTab}
      />
    );
  } else if (currentScreen === 'complete') {
    return (
      <ProjectCompleteScreen
        onBack={() => setCurrentScreen('home')}
        onViewProjects={() => setCurrentScreen('profile')}
        onHome={() => setCurrentScreen('home')}
      />
    );
  } else if (currentScreen === 'profile') {
    return (
      <ProfileScreen
        onNavigate={handleTab}
        onOpenGuide={() => { setDetailBack('profile'); setCurrentScreen('detail'); }}
      />
    );
  }

  return (
    <OnboardingScreen 
      onPressStart={() => setCurrentScreen('register')} 
      onPressLogin={() => setCurrentScreen('login')} 
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F9F1',
  },
});