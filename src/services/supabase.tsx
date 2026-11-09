import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const supabaseUrl = 'https://fabsaqvehibwwxvzzbmh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhYnNhcXZlaGlid3d4dnp6Ym1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3OTAzOTEsImV4cCI6MjEwOTM2NjM5MX0.KuoUolJ3cShw54d2d79LN1L5l_4zdBwj458NOPrSSHU'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Gunakan localStorage jika di Web, AsyncStorage jika di Native (Android/iOS)
    storage: Platform.OS === 'web' ? localStorage : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});