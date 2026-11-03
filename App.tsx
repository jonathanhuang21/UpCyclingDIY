import React, { useState } from 'react';
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen'; // Pastikan path file HomeScreen sesuai

// 1. Tambahkan 'home' ke dalam ScreenType
type ScreenType = 'onboarding' | 'register' | 'login' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');

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
        // Jika ingin langsung ke Home setelah daftar, bisa ubah ke 'home'
        onRegisterSuccess={() => setCurrentScreen('home')} 
      />
    );
  } else if (currentScreen === 'login') {
    return (
      <LoginScreen 
        onPressRegister={() => setCurrentScreen('register')} 
        onPressBack={() => setCurrentScreen('onboarding')}
        // 2. Tambahkan aksi saat login sukses
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