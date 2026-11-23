import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { supabase } from './src/services/supabase';
import { CategoryProjectItem } from './src/data/categoriesData';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import CategoryDetailScreen from './src/screens/CategoryScreen';
import DetailGuideScreen from './src/screens/DetailGuideScreen';
import TutorialScreen from './src/screens/TutorialScreen';
import ProjectCompleteScreen from './src/screens/ProjectCompleteScreen';

type ScreenType =
  | 'splash'
  | 'onboarding'
  | 'register'
  | 'login'
  | 'main'
  | 'categoryDetail'
  | 'detailGuide'
  | 'tutorial'
  | 'projectComplete';

type MainTabType = 'home' | 'search' | 'creations' | 'showcase';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');
  const [initializing, setInitializing] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Kreasi Kardus');
  const [selectedProject, setSelectedProject] = useState<CategoryProjectItem | null>(null);
  const [mainInitialTab, setMainInitialTab] = useState<MainTabType>('home');

  const goToMyCreations = () => {
    setMainInitialTab('creations');
    setCurrentScreen('main');
  };

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
  initialTab={mainInitialTab}
  onLogoutSuccess={() => {
    setHasSession(false);
    setCurrentScreen('onboarding');
  }}
  onCategoryPress={(categoryName) => {
    setSelectedCategory(`Kreasi ${categoryName}`);
    setCurrentScreen('categoryDetail');
  }}
  onSelectProject={(projectItem) => {
    setSelectedProject(projectItem);
    setCurrentScreen('detailGuide');
  }}
/>
      ) : currentScreen === 'categoryDetail' ? (
        <CategoryDetailScreen
          title={selectedCategory}
          onBack={() => {
            setMainInitialTab('home');
            setCurrentScreen('main');
          }}
          onOpenGuide={(item) => {
            setSelectedProject(item);
            setCurrentScreen('detailGuide');
          }}
          onNavigate={(tab) => {
            if (tab === 'home' || tab === 'search') {
              setMainInitialTab(tab);
              setCurrentScreen('main');
            } else if (tab === 'creations') {
              goToMyCreations();
            }
          }}
        />
      ) : currentScreen === 'detailGuide' ? (
        <DetailGuideScreen
          project={selectedProject}
          onBack={() => setCurrentScreen('categoryDetail')}
          onStart={() => setCurrentScreen('tutorial')}
        />
      ) : currentScreen === 'tutorial' ? (
        <TutorialScreen
          project={selectedProject}
          onBack={() => setCurrentScreen('detailGuide')}
          onFinish={() => setCurrentScreen('projectComplete')}
        />
      ) : currentScreen === 'projectComplete' ? (
        <ProjectCompleteScreen
          project={selectedProject}
          onBack={() => setCurrentScreen('tutorial')}
          onViewProjects={goToMyCreations}
          onHome={() => {
            setMainInitialTab('home');
            setCurrentScreen('main');
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