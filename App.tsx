
import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { supabase } from './src/services/supabase';

import OnboardingScreen from './src/screens/OnboardingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';

type ScreenType =
  | 'splash'
  | 'onboarding'
  | 'register'
  | 'login'
  | 'home';

function AppContent() {
  const [currentScreen, setCurrentScreen] =
    useState<ScreenType>('splash');

  const [initializing, setInitializing] = useState(true);

  // Cek session ketika aplikasi pertama kali dibuka
  useEffect(() => {
    let mounted = true;

    // Pantau perubahan autentikasi Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        if (session) {
          // Pengguna sudah login
          setCurrentScreen('home');
        } else if (event === 'SIGNED_OUT') {
          // Pengguna melakukan logout
          setCurrentScreen('onboarding');
        }

        // Event INITIAL_SESSION tanpa session
        // tidak langsung melewati Splash Screen.
      }
    );

    // Inisialisasi aplikasi
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (mounted) {
          if (session) {
            setCurrentScreen('home');
          } else {
            setCurrentScreen('splash');
          }
        }
      } catch (error) {
        console.log('Session error:', error);

        if (mounted) {
          setCurrentScreen('splash');
        }
      } finally {
        if (mounted) {
          setInitializing(false);
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Loading awal saat mengecek session
  if (initializing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#2F6B32"
        />
      </View>
    );
  }

  // SPLASH INTRODUCTION
  if (currentScreen === 'splash') {
    return (
      <SplashScreen
        onFinish={() => setCurrentScreen('onboarding')}
      />
    );
  }

  // ONBOARDING / WELCOME
  if (currentScreen === 'onboarding') {
    return (
      <OnboardingScreen
        onPressStart={() => setCurrentScreen('register')}
        onPressLogin={() => setCurrentScreen('login')}
      />
    );
  }

  // REGISTER
  if (currentScreen === 'register') {
    return (
      <RegisterScreen
        onPressLogin={() => setCurrentScreen('login')}
        onPressBack={() => setCurrentScreen('onboarding')}
        onRegisterSuccess={() => setCurrentScreen('login')}
      />
    );
  }

  // LOGIN
  if (currentScreen === 'login') {
    return (
      <LoginScreen
        onPressRegister={() => setCurrentScreen('register')}
        onPressBack={() => setCurrentScreen('onboarding')}
        onLoginSuccess={() => setCurrentScreen('home')}
      />
    );
  }

  // HOME
  if (currentScreen === 'home') {
    return <HomeScreen />;
  }

  return null;
}

// ROOT APP
export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
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
