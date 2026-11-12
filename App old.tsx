import React, { useState } from 'react';
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen'; // Tab container (Home + navigasi)

// ScreenType: 'home' kini memuat MainScreen yang mengelola tab & profil
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
        onRegisterSuccess={() => setCurrentScreen('home')}
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
    // MainScreen mengelola: HomeScreen, SearchScreen, MyCreationsScreen,
    // ShowcaseScreen, ProfileScreen, dan floating bottom navigation.
    return <MainScreen />;
  }

  return (
    <OnboardingScreen
      onPressStart={() => setCurrentScreen('register')}
      onPressLogin={() => setCurrentScreen('login')}
    />
  );
}