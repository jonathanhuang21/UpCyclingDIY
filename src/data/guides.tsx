import AsyncStorage from '@react-native-async-storage/async-storage';

// Data dummy panduan (sementara, sampai backend siap)
// Menjadi seperti ini (gunakan ../):
export const guideThumbnail = require('../../assets/images/feat-tutorial-assets/thumbnail-card.png');
export const stepImage = require('../../assets/images/feat-tutorial-assets/Instruction image.png');
export const celebrationImage = require('../../assets/images/feat-tutorial-assets/Upcycling celebration.png');

// ─────────────────────────────────────────────
// Tipe data panduan dengan metadata filter
// ─────────────────────────────────────────────
export type GuideItem = {
  id: string;
  title: string;
  rating: string;
  reviews: string;
  duration: string;
  durationMinutes: number;   // untuk filter "< 15 Menit"
  difficulty: 'mudah' | 'sedang' | 'sulit';  // untuk filter "Mudah"
  category: string;          // untuk filter "Dekorasi"
  thumbnail: ReturnType<typeof require>;
  about: string;
  materials: string[];
  steps: { title: string; body: string; tip: string; minutes: number }[];
};

// Panduan yang tersedia (data local, tidak butuh network)
export const guideList: GuideItem[] = [
  {
    id: '1',
    title: 'Organizer Desk dari Kardus',
    rating: '4.0',
    reviews: '(99+)',
    duration: '±20m',
    durationMinutes: 20,
    difficulty: 'mudah',
    category: 'Peralatan',
    thumbnail: require('../../assets/images/feat-tutorial-assets/thumbnail-card.png'),
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
      { title: 'Bersihkan dan Siapkan Kardus', body: 'Bersihkan kardus sepatu bekas dari debu. Lepaskan sisa selotip dan label, lalu pastikan kardus benar-benar kering dan siap digunakan.', tip: 'Kardus yang bersih dan kering membuat hasil akhir lebih rapi.', minutes: 5 },
      { title: 'Ukur dan Potong Sekat', body: 'Ukur tinggi kardus, lalu potong beberapa lembar kardus lain sebagai sekat dengan penggaris dan cutter.', tip: 'Beri tanda dengan pensil dulu agar potongan lurus.', minutes: 5 },
      { title: 'Pasang Sekat', body: 'Susun sekat di dalam kardus sesuai kebutuhan (pulpen, gunting, penggaris), lalu rekatkan dengan lem tembak.', tip: 'Tahan sekat beberapa detik sampai lem benar-benar menempel.', minutes: 5 },
      { title: 'Lapisi dengan Kertas', body: 'Tempelkan kertas sampul atau kertas kado di bagian luar dan dalam kardus agar tampilannya lebih menarik.', tip: 'Pilih warna kertas yang serasi dengan meja kamu.', minutes: 3 },
      { title: 'Hias dan Selesai', body: 'Tambahkan hiasan sesuai selera, lalu diamkan beberapa menit. Organizer siap dipakai!', tip: 'Boleh tambah stiker atau gambar sederhana dengan spidol.', minutes: 2 },
    ],
  },
  {
    id: '2',
    title: 'Vas Bunga dari Kardus',
    rating: '4.2',
    reviews: '(50+)',
    duration: '±10m',
    durationMinutes: 10,
    difficulty: 'mudah',
    category: 'Dekorasi',
    thumbnail: require('../../assets/images/feat-tutorial-assets/thumbnail-card.png'),
    about: 'Buat vas bunga unik dari kardus bekas yang bisa mempercantik ruangan.',
    materials: [
      'Kardus bekas (secukupnya)',
      'Lem tembak',
      'Cat warna / cat akrilik',
      'Gunting / Cutter',
    ],
    steps: [
      { title: 'Siapkan Kardus', body: 'Potong kardus sesuai ukuran yang diinginkan.', tip: 'Gunakan kardus tebal agar lebih kokoh.', minutes: 3 },
      { title: 'Bentuk dan Rekatkan', body: 'Gulung kardus dan rekatkan dengan lem tembak membentuk silinder.', tip: 'Pastikan lem merata.', minutes: 4 },
      { title: 'Cat dan Hias', body: 'Cat permukaan vas sesuai selera lalu keringkan.', tip: 'Gunakan minimal 2 lapis cat agar warna lebih pekat.', minutes: 3 },
    ],
  },
  {
    id: '3',
    title: 'Pigura Foto dari Kardus',
    rating: '4.5',
    reviews: '(30+)',
    duration: '±12m',
    durationMinutes: 12,
    difficulty: 'mudah',
    category: 'Dekorasi',
    thumbnail: require('../../assets/images/feat-tutorial-assets/thumbnail-card.png'),
    about: 'Buat pigura foto estetik dari kardus bekas dengan mudah dan cepat.',
    materials: [
      'Kardus tebal',
      'Kertas dekoratif / kain perca',
      'Lem / double tape',
      'Gunting',
    ],
    steps: [
      { title: 'Potong Kardus', body: 'Potong kardus menjadi dua bagian: bagian depan berlubang dan bagian belakang utuh.', tip: 'Ukur tepat agar foto pas.', minutes: 5 },
      { title: 'Hiasi Permukaan', body: 'Tempel kertas dekoratif atau kain perca di permukaan depan kardus.', tip: 'Ratakan agar tidak bergelembung.', minutes: 4 },
      { title: 'Rakit dan Selesai', body: 'Rekatkan bagian depan dan belakang, sisakan celah untuk memasukkan foto.', tip: 'Tambahkan penyangga dari kardus di belakang.', minutes: 3 },
    ],
  },
  {
    id: '4',
    title: 'Tempat Pensil Mini dari Kardus',
    rating: '4.1',
    reviews: '(20+)',
    duration: '±8m',
    durationMinutes: 8,
    difficulty: 'mudah',
    category: 'Peralatan',
    thumbnail: require('../../assets/images/feat-tutorial-assets/thumbnail-card.png'),
    about: 'Tempat pensil cantik dan fungsional dari sisa potongan kardus.',
    materials: [
      'Kardus bekas',
      'Lem tembak',
      'Cat / kertas warna',
    ],
    steps: [
      { title: 'Potong Kardus', body: 'Potong kardus membentuk persegi panjang sesuai ukuran tempat pensil.', tip: 'Buat 4 sisi dan 1 alas.', minutes: 3 },
      { title: 'Rakit Kotak', body: 'Rekatkan sisi-sisi dengan lem tembak membentuk kotak terbuka.', tip: 'Gunakan penggaris untuk memastikan sudut siku-siku.', minutes: 3 },
      { title: 'Hias', body: 'Hiasi dengan cat atau tempel kertas warna.', tip: 'Lapisi dengan selotip bening agar lebih tahan lama.', minutes: 2 },
    ],
  },
  {
    id: '5',
    title: 'Hiasan Dinding Kardus 3D',
    rating: '4.3',
    reviews: '(45+)',
    duration: '±25m',
    durationMinutes: 25,
    difficulty: 'sedang',
    category: 'Dekorasi',
    thumbnail: require('../../assets/images/feat-tutorial-assets/thumbnail-card.png'),
    about: 'Hiasan dinding 3D unik dari lapisan kardus yang memberikan kesan artistik.',
    materials: [
      'Kardus bekas banyak',
      'Lem kertas',
      'Cat semprot',
      'Cutter',
    ],
    steps: [
      { title: 'Desain Pola', body: 'Buat desain pola yang diinginkan di atas kardus.', tip: 'Gunakan pensil agar mudah dihapus.', minutes: 8 },
      { title: 'Potong Berlapis', body: 'Potong banyak lembar kardus sesuai pola, lalu tumpuk dan rekatkan.', tip: 'Semakin banyak lapisan, semakin tebal efek 3D.', minutes: 12 },
      { title: 'Cat dan Pasang', body: 'Cat dengan cat semprot dan pasang di dinding menggunakan lem tembak.', tip: 'Pastikan dinding bersih sebelum menempel.', minutes: 5 },
    ],
  },
];

// Backward-compatible: single guide (untuk DetailGuideScreen)
export const guide = {
  title: guideList[0].title,
  projectTitle: 'Organizer Desk dari Kardus Sepatu',
  desc: 'Kreasi simpel untuk pemula.',
  duration: guideList[0].duration,
  rating: guideList[0].rating,
  reviews: guideList[0].reviews,
  about: guideList[0].about,
  materials: guideList[0].materials,
  steps: guideList[0].steps,
};

// Backward-compatible: placeholder id list
export const searchResults = guideList.map((g) => ({ id: g.id }));

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