import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Configuration
 * Initialize Supabase client for database operations
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database Types
 */

export interface Artisan {
  id: string;
  wallet_address: string;
  name: string;
  category: string;
  region: string;
  verified: boolean;
  bio?: string;
  portfolio_images?: string[];
  created_at: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  artisan_id: string;
  nft_address?: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  royalty_bps: number;
  category: string;
  region: string;
  status: 'draft' | 'minting' | 'listed' | 'sold';
  created_at: string;
  updated_at?: string;
}

export interface Transaction {
  id: string;
  product_id: string;
  buyer_wallet: string;
  seller_wallet: string;
  amount: number;
  royalty_paid: number;
  tx_signature: string;
  timestamp: string;
}

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  proposal_type: 'funding' | 'partnership' | 'policy';
  votes_for: number;
  votes_against: number;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  created_by: string;
  created_at: string;
  ends_at: string;
}

export interface DAOVote {
  id: string;
  proposal_id: string;
  voter_wallet: string;
  vote: 'for' | 'against';
  weight: number;
  created_at: string;
}

/**
 * Type-safe database helpers
 */

export const db = {
  artisans: {
    getAll: () => supabase.from('artisans').select('*'),
    getById: (id: string) => supabase.from('artisans').select('*').eq('id', id).single(),
    getByWallet: (wallet: string) => supabase.from('artisans').select('*').eq('wallet_address', wallet).single(),
    create: (data: Omit<Artisan, 'id' | 'created_at'>) => supabase.from('artisans').insert(data).select().single(),
    update: (id: string, data: Partial<Artisan>) => supabase.from('artisans').update(data).eq('id', id).select().single(),
  },
  
  products: {
    getAll: () => supabase.from('products').select('*, artisans(*)'),
    getById: (id: string) => supabase.from('products').select('*, artisans(*)').eq('id', id).single(),
    getByArtisan: (artisanId: string) => supabase.from('products').select('*').eq('artisan_id', artisanId),
    create: (data: Omit<Product, 'id' | 'created_at'>) => supabase.from('products').insert(data).select().single(),
    update: (id: string, data: Partial<Product>) => supabase.from('products').update(data).eq('id', id).select().single(),
  },
  
  transactions: {
    getAll: () => supabase.from('transactions').select('*, products(*)'),
    getById: (id: string) => supabase.from('transactions').select('*').eq('id', id).single(),
    getByProduct: (productId: string) => supabase.from('transactions').select('*').eq('product_id', productId),
    getBySeller: (wallet: string) => supabase.from('transactions').select('*').eq('seller_wallet', wallet),
    getByBuyer: (wallet: string) => supabase.from('transactions').select('*').eq('buyer_wallet', wallet),
    create: (data: Omit<Transaction, 'id'>) => supabase.from('transactions').insert(data).select().single(),
  },
  
  proposals: {
    getAll: () => supabase.from('dao_proposals').select('*'),
    getById: (id: string) => supabase.from('dao_proposals').select('*').eq('id', id).single(),
    getActive: () => supabase.from('dao_proposals').select('*').eq('status', 'active'),
    create: (data: Omit<DAOProposal, 'id' | 'created_at'>) => supabase.from('dao_proposals').insert(data).select().single(),
    update: (id: string, data: Partial<DAOProposal>) => supabase.from('dao_proposals').update(data).eq('id', id).select().single(),
  },
  
  votes: {
    getByProposal: (proposalId: string) => supabase.from('dao_votes').select('*').eq('proposal_id', proposalId),
    getByVoter: (wallet: string) => supabase.from('dao_votes').select('*').eq('voter_wallet', wallet),
    create: (data: Omit<DAOVote, 'id' | 'created_at'>) => supabase.from('dao_votes').insert(data).select().single(),
  },
};

/**
 * Storage helpers for file uploads
 */
export const storage = {
  uploadImage: async (bucket: string, path: string, file: File) => {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    return data;
  },
  
  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },
  
  deleteFile: async (bucket: string, path: string) => {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
  },
};
