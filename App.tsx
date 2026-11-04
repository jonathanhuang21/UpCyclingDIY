import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from './src/services/supabase';
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

type ScreenType = 'onboarding' | 'register' | 'login' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');
  const [initializing, setInitializing] = useState(true);

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
        // Jika ada sesi (Login / Auto Login)
        setCurrentScreen('home');
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
    return <HomeScreen />;
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