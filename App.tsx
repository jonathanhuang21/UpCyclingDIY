import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { supabase } from './src/services/supabase';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import CategoryDetailScreen from './src/screens/CategoryScreen';
import DetailGuideScreen from './src/screens/DetailGuideScreen';
type ScreenType = 'splash' | 'onboarding' | 'register' | 'login' | 'main' | 'categoryDetail' | 'detailGuide'; // <-- 2. Tambahkan 'detailGuide'

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');
  const [initializing, setInitializing] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Kreasi Kardus');

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      if (isMounted) {
        if (session) {
          setHasSession(true);
          setCurrentScreen('main');
        }
        setInitializing(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      console.log("EVENT AUTH BERUBAH:", event);

      if (!isMounted) return;

      if (event === 'SIGNED_IN' && session) {
        setHasSession(true);
        setCurrentScreen('main');
      } else if (event === 'SIGNED_OUT' || !session) {
        console.log("Sesi berakhir / Logout, kembali ke onboarding...");
        setHasSession(false);
        setCurrentScreen('onboarding');
      }
    });

    return () => {
      isMounted = false;
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

  return (
    <SafeAreaProvider>
      {showSplash ? (
        <SplashScreen 
          onFinish={() => {
            setShowSplash(false);
            if (hasSession) {
              setCurrentScreen('main');
            } else {
              setCurrentScreen('onboarding');
            }
          }} 
        />
      ) : currentScreen === 'onboarding' ? (
        <OnboardingScreen 
          onPressStart={() => setCurrentScreen('register')} 
          onPressLogin={() => setCurrentScreen('login')} 
        />
      ) : currentScreen === 'register' ? (
        <RegisterScreen 
          onPressLogin={() => setCurrentScreen('login')} 
          onPressBack={() => setCurrentScreen('onboarding')}
          onRegisterSuccess={() => setCurrentScreen('login')} 
        />
      ) : currentScreen === 'login' ? (
        <LoginScreen 
          onPressRegister={() => setCurrentScreen('register')} 
          onPressBack={() => setCurrentScreen('onboarding')}
          onLoginSuccess={() => {
            setHasSession(true);
            setCurrentScreen('main');
          }} 
        />
      ) : currentScreen === 'main' ? (
        <MainScreen 
          onLogoutSuccess={() => {
            setHasSession(false);
            setCurrentScreen('onboarding');
          }} 
          onCategoryPress={(categoryName) => {
            setSelectedCategory(`Kreasi ${categoryName}`);
            setCurrentScreen('categoryDetail');
          }}
        />
      ) : currentScreen === 'categoryDetail' ? (
        <CategoryDetailScreen 
          title={selectedCategory}
          onBack={() => setCurrentScreen('main')}
          onOpenGuide={() => setCurrentScreen('detailGuide')} // <-- 3. Pindah ke halaman DetailGuideScreen saat diklik
          onNavigate={(tab) => {
            if (tab === 'home') setCurrentScreen('main');
          }}
        />
      ) : currentScreen === 'detailGuide' ? (
        <DetailGuideScreen 
          onBack={() => setCurrentScreen('categoryDetail')} // <-- 4. Tombol kembali ke kategori
          onStart={() => {
            console.log("Mulai membuat panduan diklik");
          }}
        />
      ) : (
        <OnboardingScreen 
          onPressStart={() => setCurrentScreen('register')} 
          onPressLogin={() => setCurrentScreen('login')} 
        />
      )}
    </SafeAreaProvider>
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