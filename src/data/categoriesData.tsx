export interface ProjectStep {
  title: string;
  body: string;
  minutes: number;
  tip: string;
  image?: ReturnType<typeof require>;
}

export interface CategoryProjectItem {
  id: string;
  title: string;
  categoryName: string;
  rating: string;
  reviews: string;
  duration: string;
  difficulty: 'Mudah' | 'Menengah';
  isDecoration?: boolean;
  expEarned: number;
  image: ReturnType<typeof require>;
  about: string;
  materials: string[];
  steps: ProjectStep[];
}

export const PROJECTS_BY_CATEGORY: Record<string, CategoryProjectItem[]> = {
  Kardus: [
    {
      id: 'kardus-1',
      title: 'Organizer Desk dari Kardus',
      categoryName: 'Kardus',
      rating: '4.5',
      reviews: '(48)',
      duration: '30 Menit',
      difficulty: 'Mudah',
      isDecoration: true,
      expEarned: 50,
      image: require('../../assets/images/frame1/inspirasi.png'),
      about: 'Ubah kardus bekas menjadi tempat penyimpanan alat tulis dan perlengkapan meja yang rapi.',
      materials: ['Kardus bekas tebal', 'Gunting atau cutter', 'Lem & kertas kado'],
      steps: [
        {
          title: 'Potong Pola Kardus',
          body: 'Ukur dan potong kardus menjadi bagian alas serta sekat penyimpan sesuai kebutuhan meja.',
          minutes: 10,
          tip: 'Gunakan penggaris besi saat memotong agar tepi kardus lurus dan rapi.',
          image: require('../../assets/images/frame1/kardus.png'),
        },
        {
          title: 'Rakit & Rekatkan Sekat',
          body: 'Satukan bagian dinding dan sekat menggunakan lem hingga membentuk ruang penyimpanan.',
          minutes: 10,
          tip: 'Tahan beberapa detik agar lem merekat kuat sebelum memasang sekat berikutnya.',
          image: require('../../assets/images/frame1/inspirasi.png'),
        },
        {
          title: 'Lapisi & Rapikan Tepi',
          body: 'Bungkus bagian luar organizer dengan kertas kado atau sisa kertas motif agar terlihat estetik.',
          minutes: 10,
          tip: 'Lipat sudut kertas dengan rapi ke bagian dalam agar tidak mudah terkelupas.',
          image: require('../../assets/images/frame1/inspirasi.png'),
        },
      ],
    },
    {
      id: 'kardus-2',
      title: 'Rak Buku Mini Kardus Tebal',
      categoryName: 'Kardus',
      rating: '4.7',
      reviews: '(31)',
      duration: '12 Menit',
      difficulty: 'Mudah',
      isDecoration: false,
      expEarned: 50,
      image: require('../../assets/images/frame1/kardus.png'),
      about: 'Buat rak mini praktis untuk menata buku saku atau catatan harian dari kardus tebal.',
      materials: ['2 lembar kardus tebal', 'Lakban kertas', 'Penggaris & spidol'],
      steps: [
        {
          title: 'Tandai Garis Lipatan',
          body: 'Gambar garis lipat pada kardus sesuai lebar buku yang ingin diletakkan.',
          minutes: 6,
          tip: 'Gunakan kardus bergelombang ganda agar daya topangnya lebih kuat.',
          image: require('../../assets/images/frame1/kardus.png'),
        },
        {
          title: 'Lipat & Kunci Sisi Rak',
          body: 'Lipat mengikuti garis lalu rekatkan sisi sambungan dengan lakban kertas.',
          minutes: 6,
          tip: 'Tambahkan lapisan lakban di bagian sudut dalam untuk memperkuat struktur.',
          image: require('../../assets/images/frame1/kardus.png'),
        },
      ],
    },
  ],
  'Botol Plastik': [
    {
      id: 'plastik-1',
      title: 'Pot Tanaman Gantung Botol Bekas',
      categoryName: 'Botol Plastik',
      rating: '4.8',
      reviews: '(64)',
      duration: '12 Menit',
      difficulty: 'Mudah',
      isDecoration: true,
      expEarned: 50,
      image: require('../../assets/images/frame1/botol_air.png'),
      about: 'Manfaatkan botol plastik bekas menjadi pot gantung hemat tempat untuk tanaman kecil.',
      materials: ['Botol plastik bekas bersih', 'Tali rami atau kawat', 'Tanah & bibit tanaman'],
      steps: [
        {
          title: 'Bersihkan & Buat Lubang',
          body: 'Cuci bersih botol lalu buat lubang jendela tanam serta lubang kecil untuk tali gantungan.',
          minutes: 6,
          tip: 'Pastikan botol sudah kering dan buat lubang drainase kecil di bagian bawah.',
          image: require('../../assets/images/frame1/botol_air.png'),
        },
        {
          title: 'Pasang Tali & Tanam',
          body: 'Ikat tali secara seimbang di sisi kiri dan kanan, lalu isi media tanam dan tanaman.',
          minutes: 6,
          tip: 'Simpul mati yang ganda mencegah pot miring saat digantung.',
          image: require('../../assets/images/frame1/banner.png'),
        },
      ],
    },
    {
      id: 'plastik-2',
      title: 'Celengan Karakter Botol Plastik',
      categoryName: 'Botol Plastik',
      rating: '4.6',
      reviews: '(29)',
      duration: '20 Menit',
      difficulty: 'Mudah',
      isDecoration: true,
      expEarned: 50,
      image: require('../../assets/images/frame1/banner.png'),
      about: 'Sulap botol plastik menjadi celengan koin yang lucu dan mudah dibuat.',
      materials: ['Botol plastik bekas', 'Cutter atau gunting', 'Kertas warna & lem'],
      steps: [
        {
          title: 'Buat Lubang Koin',
          body: 'Potong celah memanjang di bagian atas botol cukup untuk memasukkan koin.',
          minutes: 8,
          tip: 'Haluskan pinggir potongan plastik agar aman saat disentuh.',
          image: require('../../assets/images/frame1/botol_air.png'),
        },
        {
          title: 'Hias Karakter Celengan',
          body: 'Tempelkan detail mata, telinga, atau hiasan dari kertas warna sesuai selera.',
          minutes: 12,
          tip: 'Gunakan lem secukupnya agar kertas tidak bergelombang.',
          image: require('../../assets/images/frame1/banner.png'),
        },
      ],
    },
  ],
  Pakaian: [
    {
      id: 'pakaian-1',
      title: 'Tote Bag dari Kaos Bekas',
      categoryName: 'Pakaian',
      rating: '4.7',
      reviews: '(52)',
      duration: '15 Menit',
      difficulty: 'Mudah',
      isDecoration: false,
      expEarned: 50,
      image: require('../../assets/images/frame1/pakaian.png'),
      about: 'Ubah kaos bekas layak pakai menjadi tote bag serbaguna tanpa perlu menjahit mesin.',
      materials: ['Kaos bekas layak pakai', 'Gunting kain tajam', 'Penggaris'],
      steps: [
        {
          title: 'Potong Lengan & Leher',
          body: 'Gunting bagian lengan kaos dan perlebar bagian leher untuk membentuk pegangan tas.',
          minutes: 7,
          tip: 'Samakan lebar potongan kiri dan kanan agar tali tas simetris.',
          image: require('../../assets/images/frame1/pakaian.png'),
        },
        {
          title: 'Buat Simpul Alas Tas',
          body: 'Potong bagian bawah kaos menjadi strip lalu ikat erat berpasangan untuk menutup alas.',
          minutes: 8,
          tip: 'Tarik setiap simpul dengan kencang agar barang bawaan tidak jatuh.',
          image: require('../../assets/images/frame1/pakaian.png'),
        },
      ],
    },
    {
      id: 'pakaian-2',
      title: 'Scrunchie & Ikat Rambut Kain Perca',
      categoryName: 'Pakaian',
      rating: '4.6',
      reviews: '(19)',
      duration: '10 Menit',
      difficulty: 'Mudah',
      isDecoration: true,
      expEarned: 40,
      image: require('../../assets/images/frame1/pakaian.png'),
      about: 'Manfaatkan sisa kain perca menjadi ikat rambut scrunchie yang manis.',
      materials: ['Kain perca motif', 'Karet elastis kecil', 'Jarum & benang'],
      steps: [
        {
          title: 'Potong Kain Memanjang',
          body: 'Potong kain perca memanjang lalu lipat dan jahit/satukan bagian sisinya.',
          minutes: 5,
          tip: 'Pilih kain yang lembut dan tidak kaku agar kerutannya bagus.',
          image: require('../../assets/images/frame1/pakaian.png'),
        },
        {
          title: 'Masukkan Karet Elastis',
          body: 'Selipkan karet elastis ke dalam kain, ikat ujung karet, lalu tutup celah kain.',
          minutes: 5,
          tip: 'Gunakan peniti untuk memudahkan menarik karet melewati kain.',
          image: require('../../assets/images/frame1/pakaian.png'),
        },
      ],
    },
  ],
  Kaca: [
    {
      id: 'kaca-1',
      title: 'Vas Bunga Botol Kaca Estetik',
      categoryName: 'Kaca',
      rating: '4.8',
      reviews: '(37)',
      duration: '15 Menit',
      difficulty: 'Mudah',
      isDecoration: true,
      expEarned: 50,
      image: require('../../assets/images/frame1/botol_kaca.png'),
      about: 'Jadikan botol kaca bekas sebagai vas bunga minimalis untuk mempercantik ruangan.',
      materials: ['Botol kaca bersih', 'Tali goni atau pita', 'Bunga hias'],
      steps: [
        {
          title: 'Bersihkan Botol Kaca',
          body: 'Cuci bersih botol kaca, lepaskan sisa stiker, dan keringkan hingga benar-benar bersih.',
          minutes: 7,
          tip: 'Rendam sebentar dengan air hangat jika stiker sulit dilepas.',
          image: require('../../assets/images/frame1/botol_kaca.png'),
        },
        {
          title: 'Lilitkan Tali & Susun Bunga',
          body: 'Lilitkan tali goni di leher botol lalu masukkan tangkai bunga favoritmu.',
          minutes: 8,
          tip: 'Potong tangkai bunga secara miring agar menyerap air lebih baik.',
          image: require('../../assets/images/frame1/botol_kaca.png'),
        },
      ],
    },
    {
      id: 'kaca-2',
      title: 'Lampu Hias Toples Kaca',
      categoryName: 'Kaca',
      rating: '4.9',
      reviews: '(41)',
      duration: '25 Menit',
      difficulty: 'Menengah',
      isDecoration: true,
      expEarned: 75,
      image: require('../../assets/images/frame1/botol_kaca.png'),
      about: 'Buat lampu hias hangat menggunakan toples kaca bekas dan lampu LED kecil.',
      materials: ['Toples kaca bening', 'Lampu LED baterai / fairy light', 'Pita atau stiker hias'],
      steps: [
        {
          title: 'Siapkan Toples Kaca',
          body: 'Bersihkan bagian dalam dan luar toples kaca hingga bening tanpa noda.',
          minutes: 10,
          tip: 'Lap dengan kain mikrofiber agar tidak meninggalkan bekas sidik jari.',
          image: require('../../assets/images/frame1/botol_kaca.png'),
        },
        {
          title: 'Tata Lampu & Hiasan Tutup',
          body: 'Masukkan lampu LED perlahan ke dalam toples dan hias bagian tutupnya.',
          minutes: 15,
          tip: 'Gunakan lampu LED rendah panas agar aman berada di dalam wadah tertutup.',
          image: require('../../assets/images/frame1/botol_kaca.png'),
        },
      ],
    },
  ],
  Kertas: [
    {
      id: 'kertas-1',
      title: 'Hiasan Dinding Origami Kertas',
      categoryName: 'Kertas',
      rating: '4.5',
      reviews: '(27)',
      duration: '10 Menit',
      difficulty: 'Mudah',
      isDecoration: true,
      expEarned: 40,
      image: require('../../assets/images/frame1/kertas.png'),
      about: 'Rangkai lipatan kertas menjadi hiasan dinding dekoratif yang ringan dan mudah dibuat.',
      materials: ['Kertas warna atau kertas bekas', 'Double tape atau benang', 'Gunting'],
      steps: [
        {
          title: 'Lipat Pola Kertas',
          body: 'Lipat kertas secara rapi membentuk kipas atau pola geometris sesuai rencana.',
          minutes: 5,
          tip: 'Tekan setiap lipatan dengan jari agar garis lipatannya tegas.',
          image: require('../../assets/images/frame1/kertas.png'),
        },
        {
          title: 'Pasang di Dinding',
          body: 'Tempelkan hasil lipatan ke dinding menggunakan double tape secara berpola.',
          minutes: 5,
          tip: 'Rencanakan tata letak di lantai terlebih dahulu sebelum menempel ke dinding.',
          image: require('../../assets/images/frame1/kertas.png'),
        },
      ],
    },
    {
      id: 'kertas-2',
      title: 'Pembatas Buku Anyaman Kertas',
      categoryName: 'Kertas',
      rating: '4.4',
      reviews: '(18)',
      duration: '12 Menit',
      difficulty: 'Mudah',
      isDecoration: false,
      expEarned: 40,
      image: require('../../assets/images/frame1/kertas.png'),
      about: 'Buat pembatas buku anyaman dari potongan kertas tebal sisa latihan atau majalah.',
      materials: ['Kertas tebal / karton', 'Gunting', 'Lem kertas'],
      steps: [
        {
          title: 'Potong Strip Kertas',
          body: 'Buat beberapa strip kertas memanjang dengan lebar yang sama.',
          minutes: 6,
          tip: 'Gunakan kertas dengan dua warna berbeda agar pola anyaman terlihat jelas.',
          image: require('../../assets/images/frame1/kertas.png'),
        },
        {
          title: 'Anyam & Kunci Ujungnya',
          body: 'Anyam strip kertas secara selang-seling lalu beri sedikit lem di ujungnya.',
          minutes: 6,
          tip: 'Rapikan setiap sela anyaman agar tidak mudah bergeser.',
          image: require('../../assets/images/frame1/kertas.png'),
        },
      ],
    },
  ],
  Kaleng: [
    {
      id: 'kaleng-1',
      title: 'Tempat Alat Tulis Kaleng Lilit Tali',
      categoryName: 'Kaleng',
      rating: '4.7',
      reviews: '(35)',
      duration: '15 Menit',
      difficulty: 'Mudah',
      isDecoration: true,
      expEarned: 50,
      image: require('../../assets/images/frame1/kaleng.png'),
      about: 'Ubah kaleng bekas menjadi wadah alat tulis berbalut tali yang hangat dan fungsional.',
      materials: ['Kaleng bekas bersih', 'Tali tambang atau tali katun', 'Lem tembak / lem craft'],
      steps: [
        {
          title: 'Cek Keamanan Tepi Kaleng',
          body: 'Cuci bersih kaleng dan pastikan bagian bibir kaleng tidak tajam.',
          minutes: 5,
          tip: 'Keringkan bagian dalam kaleng sebelum mulai melilitkan tali.',
          image: require('../../assets/images/frame1/kaleng.png'),
        },
        {
          title: 'Lilitkan Tali Mengelilingi Kaleng',
          body: 'Beri lem sedikit demi sedikit lalu lilitkan tali rapat dari bawah ke atas.',
          minutes: 10,
          tip: 'Lilitkan perlahan sambil dirapatkan agar celah kaleng tertutup penuh.',
          image: require('../../assets/images/frame1/kaleng.png'),
        },
      ],
    },
    {
      id: 'kaleng-2',
      title: 'Pot Mini Kaleng Cat Polos',
      categoryName: 'Kaleng',
      rating: '4.6',
      reviews: '(22)',
      duration: '12 Menit',
      difficulty: 'Mudah',
      isDecoration: true,
      expEarned: 50,
      image: require('../../assets/images/frame1/kaleng.png'),
      about: 'Manfaatkan kaleng kecil menjadi pot tanaman meja yang ringkas.',
      materials: ['Kaleng ukuran kecil', 'Cat akrilik / kertas motif', 'Media tanam'],
      steps: [
        {
          title: 'Siapkan Wadah Kaleng',
          body: 'Bersihkan kaleng dan beri lapisan cat atau balutan kertas motif di bagian luar.',
          minutes: 6,
          tip: 'Biarkan cat mengering sempurna sebelum diisi media tanam.',
          image: require('../../assets/images/frame1/kaleng.png'),
        },
        {
          title: 'Isi Tanah & Tanaman',
          body: 'Tambahkan lapisan kerikil kecil di dasar, lalu masukkan tanah dan tanaman mini.',
          minutes: 6,
          tip: 'Siram secukupnya agar air tidak menggenang berlebih.',
          image: require('../../assets/images/frame1/kaleng.png'),
        },
      ],
    },
  ],
};

export const ALL_CATEGORY_PROJECTS: CategoryProjectItem[] = Object.values(
  PROJECTS_BY_CATEGORY
).flat();

export function getProjectById(projectId?: string | null): CategoryProjectItem {
  if (projectId) {
    const found = ALL_CATEGORY_PROJECTS.find((p) => p.id === projectId);
    if (found) return found;
  }
  return PROJECTS_BY_CATEGORY.Kardus[0];
}