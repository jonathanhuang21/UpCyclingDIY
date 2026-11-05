import AsyncStorage from '@react-native-async-storage/async-storage';

// Data dummy panduan (sementara, sampai backend siap)
export const guideThumbnail = require('../../assets/images/feat-tutorial-assets/thumbnail-card.png');
export const stepImage = require('../../assets/images/feat-tutorial-assets/Instruction image.png');
export const celebrationImage = require('../../assets/images/feat-tutorial-assets/Upcycling celebration.png');

export const guide = {
  title: 'Organizer Desk dari Kardus',
  projectTitle: 'Organizer Desk dari Kardus Sepatu',
  desc: 'Kreasi simpel untuk pemula.',
  duration: '±20m',
  rating: '4.0',
  reviews: '(99+)',
  about: 'Manfaatkan kardus bekas menjadi organizer serbaguna untuk meja kerja atau belajar.',
  materials: [
    'Kardus bekas sepatu (1 buah)',
    'Lem tembak',
    'Gunting / Cutter',
    'Kertas sampul / kertas kado',
    'Penggaris',
    'Spidol / Pensil',
  ],
  steps: [
    {
      title: 'Bersihkan dan Siapkan Kardus',
      body: 'Bersihkan kardus sepatu bekas dari debu. Lepaskan sisa selotip dan label, lalu pastikan kardus benar-benar kering dan siap digunakan.',
      tip: 'Kardus yang bersih dan kering membuat hasil akhir lebih rapi.',
      minutes: 5,
    },
    {
      title: 'Ukur dan Potong Sekat',
      body: 'Ukur tinggi kardus, lalu potong beberapa lembar kardus lain sebagai sekat dengan penggaris dan cutter.',
      tip: 'Beri tanda dengan pensil dulu agar potongan lurus.',
      minutes: 5,
    },
    {
      title: 'Pasang Sekat',
      body: 'Susun sekat di dalam kardus sesuai kebutuhan (pulpen, gunting, penggaris), lalu rekatkan dengan lem tembak.',
      tip: 'Tahan sekat beberapa detik sampai lem benar-benar menempel.',
      minutes: 5,
    },
    {
      title: 'Lapisi dengan Kertas',
      body: 'Tempelkan kertas sampul atau kertas kado di bagian luar dan dalam kardus agar tampilannya lebih menarik.',
      tip: 'Pilih warna kertas yang serasi dengan meja kamu.',
      minutes: 3,
    },
    {
      title: 'Hias dan Selesai',
      body: 'Tambahkan hiasan sesuai selera, lalu diamkan beberapa menit. Organizer siap dipakai!',
      tip: 'Boleh tambah stiker atau gambar sederhana dengan spidol.',
      minutes: 2,
    },
  ],
};

// Placeholder list hasil pencarian: semua mengarah ke panduan yang sama
export const searchResults = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];

// Favorit disimpan lokal (AsyncStorage) sampai backend siap
const FAV_KEY = 'favorites';

export async function loadFavorites(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveFavorites(ids: string[]) {
  try {
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(ids));
  } catch {}
}

