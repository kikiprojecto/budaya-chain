/**
 * Internationalization (i18n) System
 * Supports Indonesian and English languages
 */

export type Locale = 'id' | 'en';

export interface Translations {
  [key: string]: string | Translations;
}

/**
 * Indonesian translations
 */
export const id: Translations = {
  common: {
    home: 'Beranda',
    marketplace: 'Pasar',
    dashboard: 'Dasbor',
    dao: 'DAO',
    about: 'Tentang',
    contact: 'Kontak',
    login: 'Masuk',
    logout: 'Keluar',
    register: 'Daftar',
    search: 'Cari',
    filter: 'Filter',
    sort: 'Urutkan',
    loading: 'Memuat...',
    error: 'Terjadi kesalahan',
    success: 'Berhasil',
    cancel: 'Batal',
    confirm: 'Konfirmasi',
    save: 'Simpan',
    delete: 'Hapus',
    edit: 'Edit',
    view: 'Lihat',
    close: 'Tutup',
  },
  
  wallet: {
    connect: 'Hubungkan Dompet',
    disconnect: 'Putuskan Dompet',
    connecting: 'Menghubungkan...',
    connected: 'Terhubung',
    notConnected: 'Tidak Terhubung',
    balance: 'Saldo',
    address: 'Alamat',
    myWallet: 'Dompet Saya',
  },

  product: {
    title: 'Produk',
    products: 'Produk',
    newProduct: 'Produk Baru',
    createProduct: 'Buat Produk',
    editProduct: 'Edit Produk',
    deleteProduct: 'Hapus Produk',
    productDetails: 'Detail Produk',
    price: 'Harga',
    category: 'Kategori',
    region: 'Daerah',
    description: 'Deskripsi',
    images: 'Gambar',
    status: 'Status',
    listed: 'Terdaftar',
    sold: 'Terjual',
    draft: 'Draf',
    buyNow: 'Beli Sekarang',
    addToCart: 'Tambah ke Keranjang',
    outOfStock: 'Stok Habis',
    inStock: 'Tersedia',
  },

  artisan: {
    artisan: 'Pengrajin',
    artisans: 'Pengrajin',
    verifiedArtisan: 'Pengrajin Terverifikasi',
    registerAsArtisan: 'Daftar sebagai Pengrajin',
    artisanProfile: 'Profil Pengrajin',
    portfolio: 'Portofolio',
    experience: 'Pengalaman',
    specialization: 'Spesialisasi',
    location: 'Lokasi',
    joinedDate: 'Tanggal Bergabung',
    totalProducts: 'Total Produk',
    totalSales: 'Total Penjualan',
    earnings: 'Pendapatan',
  },

  marketplace: {
    title: 'Pasar Budaya',
    subtitle: 'Temukan produk budaya Indonesia yang autentik',
    filterByCategory: 'Filter berdasarkan Kategori',
    filterByRegion: 'Filter berdasarkan Daerah',
    filterByPrice: 'Filter berdasarkan Harga',
    sortBy: 'Urutkan berdasarkan',
    newest: 'Terbaru',
    oldest: 'Terlama',
    priceLowToHigh: 'Harga: Rendah ke Tinggi',
    priceHighToLow: 'Harga: Tinggi ke Rendah',
    popular: 'Populer',
    noProducts: 'Tidak ada produk ditemukan',
    showingResults: 'Menampilkan {{count}} hasil',
  },

  dao: {
    title: 'Tata Kelola DAO',
    subtitle: 'Berpartisipasi dalam keputusan komunitas',
    proposals: 'Proposal',
    activeProposals: 'Proposal Aktif',
    pastProposals: 'Proposal Sebelumnya',
    createProposal: 'Buat Proposal',
    voteFor: 'Setuju',
    voteAgainst: 'Tidak Setuju',
    votingEnds: 'Pemungutan suara berakhir',
    votingPower: 'Kekuatan Suara',
    totalVotes: 'Total Suara',
    quorum: 'Kuorum',
    passed: 'Disetujui',
    rejected: 'Ditolak',
    active: 'Aktif',
    treasury: 'Perbendaharaan',
    treasuryBalance: 'Saldo Perbendaharaan',
  },

  verification: {
    verify: 'Verifikasi',
    verified: 'Terverifikasi',
    notVerified: 'Belum Terverifikasi',
    pending: 'Menunggu',
    verifyProduct: 'Verifikasi Produk',
    scanQR: 'Pindai Kode QR',
    authentic: 'Autentik',
    notAuthentic: 'Tidak Autentik',
    verificationFailed: 'Verifikasi Gagal',
    blockchainVerified: 'Terverifikasi di Blockchain',
  },

  transaction: {
    transaction: 'Transaksi',
    transactions: 'Transaksi',
    transactionHistory: 'Riwayat Transaksi',
    buyer: 'Pembeli',
    seller: 'Penjual',
    amount: 'Jumlah',
    date: 'Tanggal',
    status: 'Status',
    pending: 'Menunggu',
    completed: 'Selesai',
    failed: 'Gagal',
    viewOnExplorer: 'Lihat di Explorer',
    transactionSignature: 'Tanda Tangan Transaksi',
  },

  royalty: {
    royalty: 'Royalti',
    royalties: 'Royalti',
    royaltyPercentage: 'Persentase Royalti',
    royaltyEarnings: 'Pendapatan Royalti',
    totalRoyalties: 'Total Royalti',
    royaltyHistory: 'Riwayat Royalti',
    artisanShare: 'Bagian Pengrajin',
    platformShare: 'Bagian Platform',
    daoShare: 'Bagian DAO',
  },

  categories: {
    batik: 'Batik',
    tenun: 'Tenun',
    keramik: 'Keramik',
    ukiranKayu: 'Ukiran Kayu',
    anyaman: 'Anyaman',
    wayang: 'Wayang',
    perhiasan: 'Perhiasan',
    tekstil: 'Tekstil',
  },

  regions: {
    jawaBarat: 'Jawa Barat',
    jawaTengah: 'Jawa Tengah',
    jawaTimur: 'Jawa Timur',
    yogyakarta: 'Yogyakarta',
    bali: 'Bali',
    sumateraBarat: 'Sumatera Barat',
    sulawesiSelatan: 'Sulawesi Selatan',
    kalimantanTimur: 'Kalimantan Timur',
  },

  messages: {
    walletConnected: 'Dompet berhasil terhubung',
    walletDisconnected: 'Dompet terputus',
    productCreated: 'Produk berhasil dibuat',
    productUpdated: 'Produk berhasil diperbarui',
    productDeleted: 'Produk berhasil dihapus',
    purchaseSuccess: 'Pembelian berhasil',
    purchaseFailed: 'Pembelian gagal',
    verificationSuccess: 'Verifikasi berhasil',
    verificationFailed: 'Verifikasi gagal',
    proposalCreated: 'Proposal berhasil dibuat',
    voteRecorded: 'Suara berhasil dicatat',
    insufficientBalance: 'Saldo tidak mencukupi',
    transactionFailed: 'Transaksi gagal',
    pleaseConnectWallet: 'Silakan hubungkan dompet Anda',
  },
};

/**
 * English translations
 */
export const en: Translations = {
  common: {
    home: 'Home',
    marketplace: 'Marketplace',
    dashboard: 'Dashboard',
    dao: 'DAO',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    close: 'Close',
  },

  wallet: {
    connect: 'Connect Wallet',
    disconnect: 'Disconnect Wallet',
    connecting: 'Connecting...',
    connected: 'Connected',
    notConnected: 'Not Connected',
    balance: 'Balance',
    address: 'Address',
    myWallet: 'My Wallet',
  },

  product: {
    title: 'Product',
    products: 'Products',
    newProduct: 'New Product',
    createProduct: 'Create Product',
    editProduct: 'Edit Product',
    deleteProduct: 'Delete Product',
    productDetails: 'Product Details',
    price: 'Price',
    category: 'Category',
    region: 'Region',
    description: 'Description',
    images: 'Images',
    status: 'Status',
    listed: 'Listed',
    sold: 'Sold',
    draft: 'Draft',
    buyNow: 'Buy Now',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
  },

  artisan: {
    artisan: 'Artisan',
    artisans: 'Artisans',
    verifiedArtisan: 'Verified Artisan',
    registerAsArtisan: 'Register as Artisan',
    artisanProfile: 'Artisan Profile',
    portfolio: 'Portfolio',
    experience: 'Experience',
    specialization: 'Specialization',
    location: 'Location',
    joinedDate: 'Joined Date',
    totalProducts: 'Total Products',
    totalSales: 'Total Sales',
    earnings: 'Earnings',
  },

  marketplace: {
    title: 'Cultural Marketplace',
    subtitle: 'Discover authentic Indonesian cultural products',
    filterByCategory: 'Filter by Category',
    filterByRegion: 'Filter by Region',
    filterByPrice: 'Filter by Price',
    sortBy: 'Sort by',
    newest: 'Newest',
    oldest: 'Oldest',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    popular: 'Popular',
    noProducts: 'No products found',
    showingResults: 'Showing {{count}} results',
  },

  dao: {
    title: 'DAO Governance',
    subtitle: 'Participate in community decisions',
    proposals: 'Proposals',
    activeProposals: 'Active Proposals',
    pastProposals: 'Past Proposals',
    createProposal: 'Create Proposal',
    voteFor: 'Vote For',
    voteAgainst: 'Vote Against',
    votingEnds: 'Voting ends',
    votingPower: 'Voting Power',
    totalVotes: 'Total Votes',
    quorum: 'Quorum',
    passed: 'Passed',
    rejected: 'Rejected',
    active: 'Active',
    treasury: 'Treasury',
    treasuryBalance: 'Treasury Balance',
  },

  verification: {
    verify: 'Verify',
    verified: 'Verified',
    notVerified: 'Not Verified',
    pending: 'Pending',
    verifyProduct: 'Verify Product',
    scanQR: 'Scan QR Code',
    authentic: 'Authentic',
    notAuthentic: 'Not Authentic',
    verificationFailed: 'Verification Failed',
    blockchainVerified: 'Blockchain Verified',
  },

  transaction: {
    transaction: 'Transaction',
    transactions: 'Transactions',
    transactionHistory: 'Transaction History',
    buyer: 'Buyer',
    seller: 'Seller',
    amount: 'Amount',
    date: 'Date',
    status: 'Status',
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    viewOnExplorer: 'View on Explorer',
    transactionSignature: 'Transaction Signature',
  },

  royalty: {
    royalty: 'Royalty',
    royalties: 'Royalties',
    royaltyPercentage: 'Royalty Percentage',
    royaltyEarnings: 'Royalty Earnings',
    totalRoyalties: 'Total Royalties',
    royaltyHistory: 'Royalty History',
    artisanShare: 'Artisan Share',
    platformShare: 'Platform Share',
    daoShare: 'DAO Share',
  },

  categories: {
    batik: 'Batik',
    tenun: 'Tenun',
    keramik: 'Ceramics',
    ukiranKayu: 'Wood Carving',
    anyaman: 'Weaving',
    wayang: 'Wayang',
    perhiasan: 'Jewelry',
    tekstil: 'Textiles',
  },

  regions: {
    jawaBarat: 'West Java',
    jawaTengah: 'Central Java',
    jawaTimur: 'East Java',
    yogyakarta: 'Yogyakarta',
    bali: 'Bali',
    sumateraBarat: 'West Sumatra',
    sulawesiSelatan: 'South Sulawesi',
    kalimantanTimur: 'East Kalimantan',
  },

  messages: {
    walletConnected: 'Wallet connected successfully',
    walletDisconnected: 'Wallet disconnected',
    productCreated: 'Product created successfully',
    productUpdated: 'Product updated successfully',
    productDeleted: 'Product deleted successfully',
    purchaseSuccess: 'Purchase successful',
    purchaseFailed: 'Purchase failed',
    verificationSuccess: 'Verification successful',
    verificationFailed: 'Verification failed',
    proposalCreated: 'Proposal created successfully',
    voteRecorded: 'Vote recorded successfully',
    insufficientBalance: 'Insufficient balance',
    transactionFailed: 'Transaction failed',
    pleaseConnectWallet: 'Please connect your wallet',
  },
};

/**
 * Get nested translation value
 */
function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let value = obj;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path; // Return key if not found
    }
  }
  
  return typeof value === 'string' ? value : path;
}

/**
 * Translation function
 */
export function t(key: string, locale: Locale = 'id', params?: Record<string, any>): string {
  const translations = locale === 'id' ? id : en;
  let translation = getNestedValue(translations, key);
  
  // Replace parameters
  if (params) {
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, String(params[param]));
    });
  }
  
  return translation;
}

/**
 * Format currency for Indonesian Rupiah
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format currency for SOL
 */
export function formatSOL(amount: number, decimals: number = 4): string {
  return `${amount.toFixed(decimals)} SOL`;
}

/**
 * Format date for Indonesian locale
 */
export function formatDate(date: Date | string, locale: Locale = 'id'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date | string, locale: Locale = 'id'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

/**
 * Format number
 */
export function formatNumber(num: number, locale: Locale = 'id'): string {
  return new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US').format(num);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}
