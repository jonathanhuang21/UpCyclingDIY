import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

const FAVORITES_PREFIX = '@kreasi_favorites_';

async function getFavoritesStorageKey(): Promise<string> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.id) {
      return `${FAVORITES_PREFIX}${user.id}`;
    }
  } catch (err) {
    console.log('Gagal mengambil user untuk kunci favorit:', err);
  }
  return `${FAVORITES_PREFIX}guest`;
}

export async function loadUserFavorites(): Promise<string[]> {
  try {
    const key = await getFavoritesStorageKey();
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.log('Gagal memuat favorit:', err);
    return [];
  }
}

export async function saveUserFavorites(ids: string[]): Promise<void> {
  try {
    const key = await getFavoritesStorageKey();
    await AsyncStorage.setItem(key, JSON.stringify(ids));
  } catch (err) {
    console.log('Gagal menyimpan favorit:', err);
  }
}