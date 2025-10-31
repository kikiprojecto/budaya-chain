import { db, storage, Artisan, Product, Transaction, DAOProposal } from '@/lib/supabase';

/**
 * Database Service
 * High-level API for database operations
 */

/**
 * Artisan Operations
 */
export const artisanService = {
  /**
   * Get all verified artisans
   */
  async getVerified() {
    const { data, error } = await db.artisans.getAll();
    if (error) throw error;
    return data?.filter(a => a.verified) || [];
  },

  /**
   * Get artisan by wallet address
   */
  async getByWallet(wallet: string) {
    const { data, error } = await db.artisans.getByWallet(wallet);
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  },

  /**
   * Register new artisan
   */
  async register(artisanData: Omit<Artisan, 'id' | 'created_at' | 'verified'>) {
    const { data, error } = await db.artisans.create({
      ...artisanData,
      verified: false,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Update artisan profile
   */
  async update(id: string, updates: Partial<Artisan>) {
    const { data, error } = await db.artisans.update(id, updates);
    if (error) throw error;
    return data;
  },

  /**
   * Verify artisan (admin only)
   */
  async verify(id: string) {
    return this.update(id, { verified: true });
  },
};

/**
 * Product Operations
 */
export const productService = {
  /**
   * Get all listed products
   */
  async getAll(filters?: {
    category?: string;
    region?: string;
    status?: Product['status'];
    search?: string;
  }) {
    let query = db.products.getAll();

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.region) {
      query = query.eq('region', filters.region);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  /**
   * Get product by ID
   */
  async getById(id: string) {
    const { data, error } = await db.products.getById(id);
    if (error) throw error;
    return data;
  },

  /**
   * Get products by artisan
   */
  async getByArtisan(artisanId: string) {
    const { data, error } = await db.products.getByArtisan(artisanId);
    if (error) throw error;
    return data || [];
  },

  /**
   * Create new product
   */
  async create(productData: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await db.products.create(productData);
    if (error) throw error;
    return data;
  },

  /**
   * Update product
   */
  async update(id: string, updates: Partial<Product>) {
    const { data, error } = await db.products.update(id, updates);
    if (error) throw error;
    return data;
  },

  /**
   * Upload product images
   */
  async uploadImages(productId: string, files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const path = `products/${productId}/${Date.now()}-${file.name}`;
      await storage.uploadImage('product-images', path, file);
      const url = storage.getPublicUrl('product-images', path);
      urls.push(url);
    }

    return urls;
  },
};

/**
 * Transaction Operations
 */
export const transactionService = {
  /**
   * Get all transactions
   */
  async getAll() {
    const { data, error } = await db.transactions.getAll();
    if (error) throw error;
    return data || [];
  },

  /**
   * Get transactions by product
   */
  async getByProduct(productId: string) {
    const { data, error } = await db.transactions.getByProduct(productId);
    if (error) throw error;
    return data || [];
  },

  /**
   * Get transactions by seller
   */
  async getBySeller(wallet: string) {
    const { data, error } = await db.transactions.getBySeller(wallet);
    if (error) throw error;
    return data || [];
  },

  /**
   * Get transactions by buyer
   */
  async getByBuyer(wallet: string) {
    const { data, error } = await db.transactions.getByBuyer(wallet);
    if (error) throw error;
    return data || [];
  },

  /**
   * Record new transaction
   */
  async create(transactionData: Omit<Transaction, 'id'>) {
    const { data, error } = await db.transactions.create(transactionData);
    if (error) throw error;
    return data;
  },

  /**
   * Get analytics data
   */
  async getAnalytics(artisanId?: string) {
    const { data, error } = await db.transactions.getAll();
    if (error) throw error;

    const transactions = data || [];
    const filtered = artisanId
      ? transactions.filter(t => t.product_id === artisanId)
      : transactions;

    const totalSales = filtered.reduce((sum, t) => sum + t.amount, 0);
    const totalRoyalties = filtered.reduce((sum, t) => sum + t.royalty_paid, 0);
    const transactionCount = filtered.length;

    return {
      totalSales,
      totalRoyalties,
      transactionCount,
      averageSale: transactionCount > 0 ? totalSales / transactionCount : 0,
      averageRoyalty: transactionCount > 0 ? totalRoyalties / transactionCount : 0,
    };
  },
};

/**
 * DAO Operations
 */
export const daoService = {
  /**
   * Get all proposals
   */
  async getAllProposals() {
    const { data, error } = await db.proposals.getAll();
    if (error) throw error;
    return data || [];
  },

  /**
   * Get active proposals
   */
  async getActiveProposals() {
    const { data, error } = await db.proposals.getActive();
    if (error) throw error;
    return data || [];
  },

  /**
   * Get proposal by ID
   */
  async getProposal(id: string) {
    const { data, error } = await db.proposals.getById(id);
    if (error) throw error;
    return data;
  },

  /**
   * Create new proposal
   */
  async createProposal(proposalData: Omit<DAOProposal, 'id' | 'created_at' | 'votes_for' | 'votes_against'>) {
    const { data, error } = await db.proposals.create({
      ...proposalData,
      votes_for: 0,
      votes_against: 0,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Vote on proposal
   */
  async vote(proposalId: string, voterWallet: string, vote: 'for' | 'against', weight: number = 1) {
    // Record vote
    const { error: voteError } = await db.votes.create({
      proposal_id: proposalId,
      voter_wallet: voterWallet,
      vote,
      weight,
    });
    if (voteError) throw voteError;

    // Update proposal vote counts
    const proposal = await this.getProposal(proposalId);
    if (!proposal) throw new Error('Proposal not found');

    const updates = vote === 'for'
      ? { votes_for: proposal.votes_for + weight }
      : { votes_against: proposal.votes_against + weight };

    const { data, error } = await db.proposals.update(proposalId, updates);
    if (error) throw error;
    return data;
  },

  /**
   * Get votes for proposal
   */
  async getVotes(proposalId: string) {
    const { data, error } = await db.votes.getByProposal(proposalId);
    if (error) throw error;
    return data || [];
  },

  /**
   * Check if user has voted
   */
  async hasVoted(proposalId: string, voterWallet: string): Promise<boolean> {
    const votes = await this.getVotes(proposalId);
    return votes.some(v => v.voter_wallet === voterWallet);
  },
};

/**
 * Search Operations
 */
export const searchService = {
  /**
   * Search products
   */
  async searchProducts(query: string) {
    return productService.getAll({ search: query });
  },

  /**
   * Get categories
   */
  async getCategories(): Promise<string[]> {
    // In production, this would query distinct categories from database
    return [
      'Batik',
      'Tenun',
      'Keramik',
      'Ukiran Kayu',
      'Anyaman',
      'Wayang',
      'Perhiasan',
      'Tekstil',
    ];
  },

  /**
   * Get regions
   */
  async getRegions(): Promise<string[]> {
    // In production, this would query distinct regions from database
    return [
      'Jawa Barat',
      'Jawa Tengah',
      'Jawa Timur',
      'Yogyakarta',
      'Bali',
      'Sumatera Barat',
      'Sulawesi Selatan',
      'Kalimantan Timur',
    ];
  },
};

/**
 * Admin Operations
 */
export const adminService = {
  /**
   * Get pending verifications
   */
  async getPendingVerifications() {
    const { data, error } = await db.artisans.getAll();
    if (error) throw error;
    return data?.filter(a => !a.verified) || [];
  },

  /**
   * Get platform statistics
   */
  async getStatistics() {
    const [artisans, products, transactions] = await Promise.all([
      db.artisans.getAll(),
      db.products.getAll(),
      db.transactions.getAll(),
    ]);

    const totalArtisans = artisans.data?.length || 0;
    const verifiedArtisans = artisans.data?.filter(a => a.verified).length || 0;
    const totalProducts = products.data?.length || 0;
    const listedProducts = products.data?.filter(p => p.status === 'listed').length || 0;
    const totalTransactions = transactions.data?.length || 0;
    const totalVolume = transactions.data?.reduce((sum, t) => sum + t.amount, 0) || 0;
    const totalRoyalties = transactions.data?.reduce((sum, t) => sum + t.royalty_paid, 0) || 0;

    return {
      totalArtisans,
      verifiedArtisans,
      totalProducts,
      listedProducts,
      totalTransactions,
      totalVolume,
      totalRoyalties,
    };
  },
};
