CRITICAL TASK - ZERO ERRORS ALLOWED - PROJECT FOUNDATION AUDIT

CONTEXT:
You are working on BUDAYA CHAIN - an Indonesian cultural heritage preservation platform for a hackathon. This is a Next.js 14 project with TypeScript that needs full Solana blockchain integration.

PHASE 1: COMPLETE PROJECT AUDIT

1. ANALYZE CURRENT STATE:
   - Read and audit ALL files in /src directory
   - Check package.json for existing dependencies
   - Review all page routes in /src/app
   - Identify all components in /src/components
   - Check for any TypeScript errors
   - Review globals.css for design tokens

2. CREATE AUDIT REPORT:
   Create a new file: PROJECT_AUDIT.md with:
   - List of all existing pages (with file paths)
   - List of all existing components (categorized by feature)
   - Current dependencies installed
   - Missing dependencies needed
   - TypeScript errors found
   - Routing structure
   - Design system tokens being used

PHASE 2: INSTALL ALL REQUIRED DEPENDENCIES

Install these EXACT versions (critical for compatibility):
```bash
npm install --save \
  @solana/web3.js@1.87.6 \
  @solana/wallet-adapter-base@0.9.23 \
  @solana/wallet-adapter-react@0.15.35 \
  @solana/wallet-adapter-react-ui@0.9.35 \
  @solana/wallet-adapter-wallets@0.19.32 \
  @coral-xyz/anchor@0.29.0 \
  @metaplex-foundation/js@0.20.1 \
  @supabase/supabase-js@2.39.3 \
  bs58@5.0.0 \
  buffer@6.0.3

npm install --save-dev \
  @types/node@20.11.5
```

3. UPDATE NEXT.CONFIG:
   Create/update next.config.js to handle Solana dependencies:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  transpilePackages: ['@solana/wallet-adapter-base'],
};

module.exports = nextConfig;
```

4. CREATE ENVIRONMENT VARIABLES:
   Create .env.local file:
```env
# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com

# Supabase Configuration (placeholder - will set up later)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. VERIFY INSTALLATION:
   - Run `npm install` to ensure no conflicts
   - Check for peer dependency warnings
   - Verify no package resolution errors
   - Create DEPENDENCIES_INSTALLED.md confirming all packages

VALIDATION CHECKLIST:
□ PROJECT_AUDIT.md created with complete analysis
□ All Solana dependencies installed
□ next.config.js configured for webpack
□ .env.local created with variables
□ No installation errors
□ DEPENDENCIES_INSTALLED.md created

OUTPUT REQUIRED:
1. Complete PROJECT_AUDIT.md file
2. Updated package.json
3. Updated next.config.js
4. Created .env.local
5. Terminal output showing successful installation
6. Confirmation that `npm run dev` starts without errors

DO NOT PROCEED TO WALLET INTEGRATION YET - CONFIRM THIS PHASE IS 100% COMPLETE FIRST.


CRITICAL TASK - PERFECT WALLET INTEGRATION - ZERO ERRORS ALLOWED

CONTEXT:
I have a reference project (SolPay Express) with a PERFECT wallet connection implementation at:
github.com/zaynash0101/solpay-express

You need to EXACTLY replicate that wallet setup into Budaya Chain, adapting it to Budaya Chain's Indonesian aesthetic.

PHASE 1: ANALYZE REFERENCE PROJECT

1. EXAMINE SOLPAY EXPRESS STRUCTURE:
   Look at my reference project and identify:
   - Wallet provider setup location
   - Wallet button component structure  
   - Wallet logos/icons used
   - Styling approach
   - Connection logic
   - Wallet types supported (Phantom, Solflare, etc.)

2. IDENTIFY KEY FILES:
   Find and document:
   - Where WalletProvider is configured
   - Where wallet logos are stored
   - How wallet modal is styled
   - How wallet connection state is managed

PHASE 2: CREATE WALLET INFRASTRUCTURE

1. CREATE SOLANA CONFIGURATION FILE:
   /src/lib/solana/config.ts
```typescript
import { clusterApiUrl } from '@solana/web3.js';

export type Cluster = 'devnet' | 'testnet' | 'mainnet-beta';

export const SOLANA_NETWORK = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster) || 'devnet';

export const SOLANA_RPC_HOST = 
  process.env.NEXT_PUBLIC_SOLANA_RPC_HOST || 
  clusterApiUrl(SOLANA_NETWORK);

export const COMMITMENT = 'confirmed';

export const EXPLORER_URL = {
  devnet: 'https://explorer.solana.com',
  testnet: 'https://explorer.solana.com',
  'mainnet-beta': 'https://explorer.solana.com',
};

export function getExplorerUrl(signature: string, cluster: Cluster = SOLANA_NETWORK) {
  return `${EXPLORER_URL[cluster]}/tx/${signature}?cluster=${cluster}`;
}
```

2. CREATE WALLET CONTEXT PROVIDER:
   /src/contexts/WalletContextProvider.tsx
```typescript
'use client';

import React, { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { SOLANA_RPC_HOST } from '@/lib/solana/config';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = useMemo(() => SOLANA_RPC_HOST, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // Add more wallets as needed
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

3. COPY WALLET LOGOS FROM SOLPAY EXPRESS:
   Create /public/wallets/ directory and copy these wallet logo files:
   - phantom.svg
   - solflare.svg
   - backpack.svg
   - Any other wallet logos from SolPay Express

   If you cannot access the files directly, create SVG versions of standard wallet logos.

4. CREATE CUSTOM WALLET BUTTON COMPONENT:
   /src/components/wallet/WalletButton.tsx

REQUIREMENTS FOR THIS COMPONENT:
- EXACTLY replicate the visual style from SolPay Express wallet button
- Copy the wallet logos from SolPay Express
- Adapt colors to Budaya Chain theme:
  * Primary: #8B4513 (brown)
  * Accent: #FFD700 (gold)
  * Use batik-inspired subtle patterns
- Button states:
  * Disconnected: "Connect Wallet" with wallet icon
  * Connecting: Loading spinner
  * Connected: Show truncated address (e.g., "7xK9...f3H2") with copy functionality
  * Hover: Gold accent glow effect
- Dropdown menu when connected:
  * Show full address
  * Copy address button
  * View on Solana Explorer
  * Disconnect button
- Responsive: Full width on mobile, auto width on desktop

CREATE THIS COMPONENT WITH PIXEL-PERFECT STYLING MATCHING SOLPAY EXPRESS BUT WITH BUDAYA CHAIN COLORS.

5. CREATE WALLET MODAL CUSTOMIZATION:
   /src/styles/wallet-adapter.css
```css
/* Custom wallet adapter modal styles matching Indonesian aesthetic */
.wallet-adapter-modal-wrapper {
  background: rgba(74, 4, 4, 0.9) !important;
  backdrop-filter: blur(10px);
}

.wallet-adapter-modal {
  background: linear-gradient(135deg, #8B4513 0%, #4A0404 100%) !important;
  border: 2px solid #FFD700 !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3) !important;
}

.wallet-adapter-modal-title {
  color: #FFD700 !important;
  font-family: serif !important;
  font-size: 24px !important;
  font-weight: 700 !important;
}

.wallet-adapter-button {
  background: rgba(139, 69, 19, 0.8) !important;
  border: 1px solid #FFD700 !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
}

.wallet-adapter-button:hover {
  background: #FFD700 !important;
  border-color: #FFD700 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4) !important;
}

.wallet-adapter-button-trigger {
  background: linear-gradient(135deg, #8B4513 0%, #FFD700 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3) !important;
}

.wallet-adapter-button-trigger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 215, 0, 0.4) !important;
}
```

Import this in globals.css:
```css
@import './wallet-adapter.css';
```

6. WRAP APPLICATION WITH WALLET PROVIDER:
   Update /src/app/layout.tsx:
```typescript
import { WalletContextProvider } from '@/contexts/WalletContextProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          {/* Existing providers */}
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
```

7. REPLACE EXISTING WALLET BUTTON IN HEADER:
   Update /src/components/layout/Header.tsx (or wherever "Connect Wallet" button exists):
   
   - Find the current mock "Connect Wallet" button
   - Replace it with: <WalletButton />
   - Import the new WalletButton component
   - Ensure proper positioning in the header

8. CREATE WALLET UTILITY HOOKS:
   /src/hooks/useWalletBalance.ts
```typescript
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export function useWalletBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!publicKey) {
      setBalance(0);
      return;
    }

    setLoading(true);
    connection
      .getBalance(publicKey)
      .then((bal) => setBalance(bal / LAMPORTS_PER_SOL))
      .catch((err) => console.error('Error fetching balance:', err))
      .finally(() => setLoading(false));
  }, [publicKey, connection]);

  return { balance, loading };
}
```

PHASE 3: TESTING & VALIDATION

1. TEST WALLET CONNECTION:
   - Start dev server: `npm run dev`
   - Click "Connect Wallet" button
   - Verify modal opens with proper styling
   - Connect with Phantom wallet (devnet)
   - Verify address displays correctly
   - Test disconnect functionality
   - Test copy address feature
   - Verify no console errors

2. VISUAL VALIDATION:
   - Wallet button matches Budaya Chain color scheme
   - Wallet logos are crisp and clear
   - Modal has Indonesian aesthetic
   - Hover effects work smoothly
   - Mobile responsive layout works
   - Loading states display properly

3. CREATE VALIDATION DOCUMENT:
   /WALLET_INTEGRATION_COMPLETE.md documenting:
   - All files created
   - Wallet adapters supported
   - Visual customizations applied
   - Test results
   - Screenshots of working wallet connection

CRITICAL REQUIREMENTS:
□ WalletContextProvider created and working
□ Custom WalletButton component created
□ Wallet logos copied from SolPay Express
□ Wallet adapter CSS customized for Indonesian theme
□ Layout.tsx updated with provider
□ Header updated with new wallet button
□ Wallet connection works in browser
□ Wallet modal styled correctly
□ No TypeScript errors
□ No console errors
□ Balance fetching works
□ WALLET_INTEGRATION_COMPLETE.md created

DO NOT PROCEED UNTIL WALLET CONNECTION IS 100% FUNCTIONAL AND VISUALLY PERFECT.

SHOW ME:
1. Screenshot of wallet button (disconnected state)
2. Screenshot of wallet modal
3. Screenshot of wallet button (connected state)
4. Terminal output showing no errors
5. Confirmation that connection works


CRITICAL TASK - PRODUCTION-READY DATABASE & API LAYER

CONTEXT:
Now that wallet connection works, we need to set up the complete database schema and API infrastructure to store artisan data, products, transactions, and DAO proposals.

PHASE 1: SUPABASE PROJECT SETUP

1. CREATE SUPABASE PROJECT:
   Instructions for me to do manually:
   - Go to supabase.com
   - Create new project: "budaya-chain"
   - Region: Singapore (closest to Indonesia)
   - Save Project URL and Anon Key
   
   Then I'll paste them into .env.local

2. CREATE SUPABASE CLIENT:
   /src/lib/supabase/client.ts
```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

3. CREATE DATABASE TYPES FILE:
   /src/lib/supabase/database.types.ts
```typescript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      artisans: {
        Row: {
          id: string
          wallet_address: string
          name: string
          email: string
          craft_category: string
          region: string
          experience_years: number
          bio: string | null
          portfolio_images: string[]
          government_id_verified: boolean
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wallet_address: string
          name: string
          email: string
          craft_category: string
          region: string
          experience_years: number
          bio?: string | null
          portfolio_images: string[]
          government_id_verified?: boolean
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string
          name?: string
          email?: string
          craft_category?: string
          region?: string
          experience_years?: number
          bio?: string | null
          portfolio_images?: string[]
          government_id_verified?: boolean
          verified?: boolean
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          artisan_id: string
          nft_address: string | null
          title: string
          description: string
          images: string[]
          craft_type: string
          region: string
          price_sol: number
          royalty_percentage: number
          status: 'draft' | 'minting' | 'listed' | 'sold'
          metadata_uri: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          artisan_id: string
          nft_address?: string | null
          title: string
          description: string
          images: string[]
          craft_type: string
          region: string
          price_sol: number
          royalty_percentage: number
          status?: 'draft' | 'minting' | 'listed' | 'sold'
          metadata_uri?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          nft_address?: string | null
          title?: string
          description?: string
          images?: string[]
          craft_type?: string
          region?: string
          price_sol?: number
          royalty_percentage?: number
          status?: 'draft' | 'minting' | 'listed' | 'sold'
          metadata_uri?: string | null
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          product_id: string
          buyer_wallet: string
          seller_wallet: string
          amount_sol: number
          royalty_amount_sol: number
          tx_signature: string
          timestamp: string
        }
        Insert: {
          id?: string
          product_id: string
          buyer_wallet: string
          seller_wallet: string
          amount_sol: number
          royalty_amount_sol: number
          tx_signature: string
          timestamp?: string
        }
        Update: {}
      }
      dao_proposals: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          funding_amount_sol: number | null
          proposed_by: string
          votes_for: number
          votes_against: number
          status: 'active' | 'passed' | 'rejected' | 'executed'
          duration_days: number
          created_at: string
          ends_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          funding_amount_sol?: number | null
          proposed_by: string
          votes_for?: number
          votes_against?: number
          status?: 'active' | 'passed' | 'rejected' | 'executed'
          duration_days: number
          created_at?: string
          ends_at: string
        }
        Update: {
          votes_for?: number
          votes_against?: number
          status?: 'active' | 'passed' | 'rejected' | 'executed'
        }
      }
      votes: {
        Row: {
          id: string
          proposal_id: string
          voter_wallet: string
          vote_type: 'for' | 'against'
          weight: number
          created_at: string
        }
        Insert: {
          id?: string
          proposal_id: string
          voter_wallet: string
          vote_type: 'for' | 'against'
          weight: number
          created_at?: string
        }
        Update: {}
      }
    }
  }
}
```

4. GENERATE SQL SCHEMA FOR SUPABASE:
   Create /supabase-schema.sql with complete table definitions:
```sql
-- Create tables for Budaya Chain

-- Artisans table
CREATE TABLE artisans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  craft_category TEXT NOT NULL,
  region TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  bio TEXT,
  portfolio_images TEXT[] DEFAULT '{}',
  government_id_verified BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artisan_id UUID REFERENCES artisans(id) ON DELETE CASCADE,
  nft_address TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL,
  craft_type TEXT NOT NULL,
  region TEXT NOT NULL,
  price_sol DECIMAL(20, 9) NOT NULL,
  royalty_percentage INTEGER NOT NULL CHECK (royalty_percentage BETWEEN 0 AND 100),
  status TEXT CHECK (status IN ('draft', 'minting', 'listed', 'sold')) DEFAULT 'draft',
  metadata_uri TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  buyer_wallet TEXT NOT NULL,
  seller_wallet TEXT NOT NULL,
  amount_sol DECIMAL(20, 9) NOT NULL,
  royalty_amount_sol DECIMAL(20, 9) NOT NULL,
  tx_signature TEXT UNIQUE NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DAO Proposals table
CREATE TABLE dao_proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  funding_amount_sol DECIMAL(20, 9),
  proposed_by TEXT NOT NULL,
  votes_for INTEGER DEFAULT 0,
  votes_against INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('active', 'passed', 'rejected', 'executed')) DEFAULT 'active',
  duration_days INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ends_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID REFERENCES dao_proposals(id) ON DELETE CASCADE,
  voter_wallet TEXT NOT NULL,
  vote_type TEXT CHECK (vote_type IN ('for', 'against')) NOT NULL,
  weight INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(proposal_id, voter_wallet)
);

-- Create indexes for performance
CREATE INDEX idx_artisans_wallet ON artisans(wallet_address);
CREATE INDEX idx_artisans_verified ON artisans(verified);
CREATE INDEX idx_products_artisan ON products(artisan_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_nft ON products(nft_address);
CREATE INDEX idx_transactions_product ON transactions(product_id);
CREATE INDEX idx_transactions_buyer ON transactions(buyer_wallet);
CREATE INDEX idx_dao_status ON dao_proposals(status);
CREATE INDEX idx_votes_proposal ON votes(proposal_id);

-- Enable Row Level Security
ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dao_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Artisans: Anyone can read, only owner can update
CREATE POLICY "Artisans are viewable by everyone" ON artisans FOR SELECT USING (true);
CREATE POLICY "Artisans can update own profile" ON artisans FOR UPDATE USING (wallet_address = current_setting('request.jwt.claims')::json->>'sub');

-- Products: Anyone can read listed products, artisan can manage own
CREATE POLICY "Products viewable by everyone" ON products FOR SELECT USING (status = 'listed' OR status = 'sold');
CREATE POLICY "Artisans can insert own products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Artisans can update own products" ON products FOR UPDATE USING (artisan_id IN (SELECT id FROM artisans WHERE wallet_address = current_setting('request.jwt.claims')::json->>'sub'));

-- Transactions: Viewable by buyer, seller, and artisan
CREATE POLICY "Transactions viewable by participants" ON transactions FOR SELECT USING (
  buyer_wallet = current_setting('request.jwt.claims')::json->>'sub' OR
  seller_wallet = current_setting('request.jwt.claims')::json->>'sub'
);

-- DAO Proposals: Anyone can read, verified artisans can create
CREATE POLICY "Proposals viewable by everyone" ON dao_proposals FOR SELECT USING (true);

-- Votes: Anyone can read, authenticated users can vote once per proposal
CREATE POLICY "Votes viewable by everyone" ON votes FOR SELECT USING (true);
```

INSTRUCTION FOR ME: I will run this SQL in Supabase SQL Editor after you create this file.

PHASE 2: CREATE API ROUTES

Create Next.js API routes in /src/app/api/ for all operations:

1. /src/app/api/artisans/register/route.ts
2. /src/app/api/artisans/[wallet]/route.ts
3. /src/app/api/products/create/route.ts
4. /src/app/api/products/list/route.ts
5. /src/app/api/products/[id]/route.ts
6. /src/app/api/transactions/create/route.ts
7. /src/app/api/transactions/history/route.ts
8. /src/app/api/dao/proposals/list/route.ts
9. /src/app/api/dao/proposals/create/route.ts
10. /src/app/api/dao/proposals/vote/route.ts
11. /src/app/api/analytics/dashboard/route.ts

For EACH route, implement:
- Proper HTTP method handling (GET, POST, PUT, DELETE)
- Request validation using Zod schemas
- Database queries using Supabase client
- Error handling with appropriate status codes
- TypeScript type safety
- CORS headers if needed

Example structure for each route:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { z } from 'zod';

// Define schema
const schema = z.object({
  // fields
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = schema.parse(body);
    
    const { data, error } = await supabase
      .from('table_name')
      .insert(validated)
      .select();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Error message' },
      { status: 500 }
    );
  }
}
```

PHASE 3: CREATE DATABASE SERVICE LAYER

Create /src/services/database.ts with typed functions:
```typescript
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/database.types';

type Artisan = Database['public']['Tables']['artisans']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Transaction = Database['public']['Tables']['transactions']['Row'];
type Proposal = Database['public']['Tables']['dao_proposals']['Row'];

export const DatabaseService = {
  // Artisan operations
  async getArtisanByWallet(wallet: string): Promise<Artisan | null> {
    const { data, error } = await supabase
      .from('artisans')
      .select('*')
      .eq('wallet_address', wallet)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createArtisan(artisan: Database['public']['Tables']['artisans']['Insert']): Promise<Artisan> {
    const { data, error } = await supabase
      .from('artisans')
      .insert(artisan)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateArtisan(id: string, updates: Database['public']['Tables']['artisans']['Update']): Promise<Artisan> {
    const { data, error } = await supabase
      .from('artisans')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Product operations
  async getProducts(filters?: {
    region?: string;
    craft_type?: string;
    min_price?: number;
    max_price?: number;
  }): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select('*, artisans(*)')
      .eq('status', 'listed');
    
    if (filters?.region) query = query.eq('region', filters.region);
    if (filters?.craft_type) query = query.eq('craft_type', filters.craft_type);
    if (filters?.min_price) query = query.gte('price_sol', filters.min_price);
    if (filters?.max_price) query = query.lte('price_sol', filters.max_price);
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*, artisans(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createProduct(product: Database['public']['Tables']['products']['Insert']): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
.select()
.single();
if (error) throw error;
return data;
},
async updateProductStatus(
id: string,
status: 'draft' | 'minting' | 'listed' | 'sold',
nftAddress?: string
): Promise<Product> {
const updates: any = { status, updated_at: new Date().toISOString() };
if (nftAddress) updates.nft_address = nftAddress;
const { data, error } = await supabase
  .from('products')
  .update(updates)
  .eq('id', id)
  .select()
  .single();

if (error) throw error;
return data;
},
// Transaction operations
async createTransaction(transaction: Database['public']['Tables']['transactions']['Insert']): Promise<Transaction> {
const { data, error } = await supabase
.from('transactions')
.insert(transaction)
.select()
.single();
if (error) throw error;
return data;
},
async getTransactionsByWallet(wallet: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, products(*)')
      .or(`buyer_wallet.eq.wallet,sellerwallet.eq.{wallet},seller_wallet.eq.
wallet,sellerw​allet.eq.{wallet}`)
      .order('timestamp', { ascending: false });

if (error) throw error;
return data;
},
async getArtisanEarnings(artisanId: string): Promise<{ total: number; royalties: number }> {
const { data: products } = await supabase
.from('products')
.select('id')
.eq('artisan_id', artisanId);
if (!products) return { total: 0, royalties: 0 };

const productIds = products.map(p => p.id);

const { data: transactions, error } = await supabase
  .from('transactions')
  .select('amount_sol, royalty_amount_sol')
  .in('product_id', productIds);

if (error) throw error;

const total = transactions.reduce((sum, t) => sum + Number(t.amount_sol), 0);
const royalties = transactions.reduce((sum, t) => sum + Number(t.royalty_amount_sol), 0);

return { total, royalties };
},
// DAO Proposal operations
async getActiveProposals(): Promise<Proposal[]> {
const { data, error } = await supabase
.from('dao_proposals')
.select('*')
.eq('status', 'active')
.order('created_at', { ascending: false });
if (error) throw error;
return data;
},
async getProposalById(id: string): Promise<Proposal | null> {
const { data, error } = await supabase
.from('dao_proposals')
.select('*')
.eq('id', id)
.single();
if (error) throw error;
return data;
},
async createProposal(proposal: Database['public']['Tables']['dao_proposals']['Insert']): Promise<Proposal> {
const { data, error } = await supabase
.from('dao_proposals')
.insert(proposal)
.select()
.single();
if (error) throw error;
return data;
},
async castVote(
proposalId: string,
voterWallet: string,
voteType: 'for' | 'against',
weight: number = 1
): Promise<void> {
// Insert vote
const { error: voteError } = await supabase
.from('votes')
.insert({
proposal_id: proposalId,
voter_wallet: voterWallet,
vote_type: voteType,
weight
});
if (voteError) throw voteError;

// Update proposal vote count
const { data: proposal } = await supabase
  .from('dao_proposals')
  .select('votes_for, votes_against')
  .eq('id', proposalId)
  .single();

if (!proposal) throw new Error('Proposal not found');

const updates = voteType === 'for'
  ? { votes_for: proposal.votes_for + weight }
  : { votes_against: proposal.votes_against + weight };

const { error: updateError } = await supabase
  .from('dao_proposals')
  .update(updates)
  .eq('id', proposalId);

if (updateError) throw updateError;
},
async hasVoted(proposalId: string, voterWallet: string): Promise<boolean> {
const { data, error } = await supabase
.from('votes')
.select('id')
.eq('proposal_id', proposalId)
.eq('voter_wallet', voterWallet)
.single();
return !!data;
},
// Analytics operations
async getPlatformStats() {
const [artisansCount, productsCount, transactionsSum] = await Promise.all([
supabase.from('artisans').select('id', { count: 'exact' }),
supabase.from('products').select('id', { count: 'exact' }),
supabase.from('transactions').select('amount_sol')
]);
const totalRevenue = transactionsSum.data?.reduce((sum, t) => sum + Number(t.amount_sol), 0) || 0;

return {
  totalArtisans: artisansCount.count || 0,
  totalProducts: productsCount.count || 0,
  totalRevenue,
  pendingVerifications: await this.getPendingVerificationCount()
};
},
async getPendingVerificationCount(): Promise<number> {
const { count } = await supabase
.from('artisans')
.select('id', { count: 'exact' })
.eq('government_id_verified', true)
.eq('verified', false);
return count || 0;
},
async getRegionalDistribution() {
const { data, error } = await supabase
.from('artisans')
.select('region')
.eq('verified', true);
if (error) throw error;

const distribution: Record<string, number> = {};
data.forEach(artisan => {
  distribution[artisan.region] = (distribution[artisan.region] || 0) + 1;
});

return distribution;
},
async getCraftTypeDistribution() {
const { data, error } = await supabase
.from('products')
.select('craft_type')
.eq('status', 'listed');
if (error) throw error;

const distribution: Record<string, number> = {};
data.forEach(product => {
  distribution[product.craft_type] = (distribution[product.craft_type] || 0) + 1;
});

return distribution;
}
};

PHASE 4: CREATE SEED DATA SCRIPT

Create /scripts/seed-database.ts for development testing:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Need service role for seeding
);

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  // Seed Artisans
  const artisans = [
    {
      wallet_address: '7xK9mXoB4qP3vW8fT2nR6zL1yH5dA9cE3sF4gN7jM2kU',
      name: 'Siti Aminah',
      email: 'siti.aminah@example.com',
      craft_category: 'Batik',
      region: 'Yogyakarta',
      experience_years: 25,
      bio: 'Traditional Batik Tulis master, learning from grandmother since childhood.',
      portfolio_images: ['/images/artisans/siti-1.jpg', '/images/artisans/siti-2.jpg'],
      government_id_verified: true,
      verified: true
    },
    {
      wallet_address: '9mL3nP5qR7sT2vX4zB6cD8eF1gH3jK5mN7pQ9rS1tU3',
      name: 'Budi Santoso',
      email: 'budi.santoso@example.com',
      craft_category: 'Wayang Kulit',
      region: 'Bali',
      experience_years: 18,
      bio: 'Shadow puppet craftsman specializing in traditional Balinese characters.',
      portfolio_images: ['/images/artisans/budi-1.jpg'],
      government_id_verified: true,
      verified: true
    },
    {
      wallet_address: '2nQ4rT6vX8zA1cE3gH5jL7mP9qS1uW3yB5dF7hK9nM1',
      name: 'Dewi Lestari',
      email: 'dewi.lestari@example.com',
      craft_category: 'Songket',
      region: 'Palembang',
      experience_years: 15,
      bio: 'Songket weaver using traditional techniques passed down through generations.',
      portfolio_images: ['/images/artisans/dewi-1.jpg', '/images/artisans/dewi-2.jpg'],
      government_id_verified: true,
      verified: false // Pending verification
    }
  ];

  const { data: insertedArtisans, error: artisanError } = await supabase
    .from('artisans')
    .insert(artisans)
    .select();

  if (artisanError) {
    console.error('Error seeding artisans:', artisanError);
    return;
  }

  console.log(`✅ Seeded ${insertedArtisans.length} artisans`);

  // Seed Products
  const products = [
    {
      artisan_id: insertedArtisans[0].id,
      title: 'Traditional Batik Tulis - Parang Motif',
      description: 'Hand-drawn batik using traditional wax-resist dyeing technique. Features the iconic Parang motif, symbolizing strength and continuity.',
      images: ['/images/products/batik-1.jpg', '/images/products/batik-2.jpg'],
      craft_type: 'Batik',
      region: 'Yogyakarta',
      price_sol: 5.5,
      royalty_percentage: 15,
      status: 'listed' as const,
      nft_address: 'BATik1234567890abcdefghijklmnopqrstuvwxyz'
    },
    {
      artisan_id: insertedArtisans[1].id,
      title: 'Wayang Kulit - Arjuna Character',
      description: 'Handcrafted shadow puppet depicting Arjuna from Mahabharata. Made from buffalo hide with intricate details.',
      images: ['/images/products/wayang-1.jpg'],
      craft_type: 'Wayang Kulit',
      region: 'Bali',
      price_sol: 8.0,
      royalty_percentage: 12,
      status: 'listed' as const,
      nft_address: 'WAYng2345678901bcdefghijklmnopqrstuvwxyza'
    },
    {
      artisan_id: insertedArtisans[0].id,
      title: 'Batik Cap - Modern Floral Design',
      description: 'Stamped batik with contemporary floral patterns, blending tradition with modern aesthetics.',
      images: ['/images/products/batik-3.jpg'],
      craft_type: 'Batik',
      region: 'Yogyakarta',
      price_sol: 3.2,
      royalty_percentage: 10,
      status: 'listed' as const,
      nft_address: 'BATik3456789012cdefghijklmnopqrstuvwxyzab'
    }
  ];

  const { data: insertedProducts, error: productError } = await supabase
    .from('products')
    .insert(products)
    .select();

  if (productError) {
    console.error('Error seeding products:', productError);
    return;
  }

  console.log(`✅ Seeded ${insertedProducts.length} products`);

  // Seed DAO Proposals
  const proposals = [
    {
      title: 'Fund Batik Workshop in Yogyakarta',
      description: 'Proposal to fund a 3-month workshop teaching traditional Batik Tulis techniques to 20 young artisans.',
      category: 'Funding',
      funding_amount_sol: 100,
      proposed_by: insertedArtisans[0].wallet_address,
      votes_for: 156,
      votes_against: 44,
      status: 'active' as const,
      duration_days: 14,
      ends_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      title: 'Partnership with Museum Nasional',
      description: 'Establish partnership to digitize museum artifacts as NFTs with proceeds supporting artisan community.',
      category: 'Partnership',
      funding_amount_sol: null,
      proposed_by: insertedArtisans[1].wallet_address,
      votes_for: 234,
      votes_against: 126,
      status: 'active' as const,
      duration_days: 14,
      ends_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const { error: proposalError } = await supabase
    .from('dao_proposals')
    .insert(proposals);

  if (proposalError) {
    console.error('Error seeding proposals:', proposalError);
    return;
  }

  console.log(`✅ Seeded ${proposals.length} DAO proposals`);

  console.log('🎉 Database seeding complete!');
}

seedDatabase();
```

Add npm script to package.json:
```json
"scripts": {
  "seed": "tsx scripts/seed-database.ts"
}
```

VALIDATION CHECKLIST:
□ Supabase client created
□ Database types defined
□ SQL schema file created
□ All API routes created (11 routes)
□ DatabaseService with all CRUD operations
□ Seed script created
□ All routes have error handling
□ TypeScript types are correct
□ No compilation errors

TESTING STEPS:
1. Run SQL schema in Supabase dashboard
2. Add Supabase credentials to .env.local
3. Install tsx: `npm install -D tsx`
4. Run seed script: `npm run seed`
5. Verify data appears in Supabase dashboard
6. Test API routes with Postman or curl
7. Check for any console errors

OUTPUT REQUIRED:
1. All files created and listed
2. Screenshot of Supabase tables with data
3. Confirmation that API routes respond
4. DATABASE_SETUP_COMPLETE.md document

DO NOT PROCEED UNTIL DATABASE IS FULLY FUNCTIONAL.
```

SOLANA BLOCKCHAIN INTEGRATION - NFT MINTING & ROYALTIES
```
CRITICAL TASK - CORE BLOCKCHAIN FUNCTIONALITY - ZERO ERRORS ALLOWED

CONTEXT:
This is the HEART of Budaya Chain. We need to implement the Solana blockchain features that make this project unique: NFT minting for authenticity certificates and automated perpetual royalty distribution.

PHASE 1: METAPLEX NFT INTEGRATION

1. INSTALL ADDITIONAL DEPENDENCIES:
```bash
npm install --save @metaplex-foundation/mpl-token-metadata @metaplex-foundation/umi @metaplex-foundation/umi-bundle-defaults
```

2. CREATE NFT SERVICE:
   /src/services/nft.ts
```typescript
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile } from '@metaplex-foundation/js';
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { SOLANA_NETWORK } from '@/lib/solana/config';

export class NFTService {
  private metaplex: Metaplex;
  private connection: Connection;

  constructor() {
    this.connection = new Connection(clusterApiUrl(SOLANA_NETWORK), 'confirmed');
    this.metaplex = Metaplex.make(this.connection)
      .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: clusterApiUrl(SOLANA_NETWORK),
        timeout: 60000,
      }));
  }

  /**
   * Upload product metadata to Arweave via Bundlr
   */
  async uploadMetadata(
    productData: {
      name: string;
      description: string;
      image: string; // URL or base64
      attributes: Array<{ trait_type: string; value: string }>;
      properties: {
        category: string;
        creators: Array<{ address: string; share: number }>;
      };
    }
  ): Promise<string> {
    try {
      const { uri } = await this.metaplex.nfts().uploadMetadata(productData);
      console.log('Metadata uploaded to:', uri);
      return uri;
    } catch (error) {
      console.error('Error uploading metadata:', error);
      throw new Error('Failed to upload metadata to Arweave');
    }
  }

  /**
   * Mint NFT with royalty enforcement
   */
  async mintAuthenticityNFT(
    walletKeypair: Keypair,
    metadataUri: string,
    productName: string,
    royaltyBasisPoints: number, // 1000 = 10%
    artisanWallet: PublicKey
  ): Promise<{ mintAddress: string; signature: string }> {
    try {
      this.metaplex.use(keypairIdentity(walletKeypair));

      const { nft, response } = await this.metaplex.nfts().create({
        uri: metadataUri,
        name: productName,
        sellerFeeBasisPoints: royaltyBasisPoints,
        creators: [
          {
            address: artisanWallet,
            share: 100,
          },
        ],
        isMutable: false, // Authenticity certificates should be immutable
        maxSupply: 1, // Unique, one-of-a-kind
      });

      console.log('NFT minted:', nft.address.toBase58());
      console.log('Transaction:', response.signature);

      return {
        mintAddress: nft.address.toBase58(),
        signature: response.signature,
      };
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw new Error('Failed to mint NFT');
    }
  }

  /**
   * Fetch NFT metadata and verify authenticity
   */
  async verifyNFT(mintAddress: string): Promise<{
    verified: boolean;
    metadata: any;
    creator: string;
    royaltyPercentage: number;
  }> {
    try {
      const nft = await this.metaplex.nfts().findByMint({
        mintAddress: new PublicKey(mintAddress),
      });

      return {
        verified: true,
        metadata: nft.json,
        creator: nft.creators[0]?.address.toBase58() || '',
        royaltyPercentage: nft.sellerFeeBasisPoints / 100,
      };
    } catch (error) {
      console.error('Error verifying NFT:', error);
      return {
        verified: false,
        metadata: null,
        creator: '',
        royaltyPercentage: 0,
      };
    }
  }

  /**
   * Transfer NFT with automatic royalty distribution
   */
  async transferWithRoyalty(
    buyerWallet: Keypair,
    nftMintAddress: string,
    sellerAddress: string,
    priceInSol: number
  ): Promise<{ signature: string; royaltyPaid: number }> {
    try {
      // This would integrate with a marketplace program
      // For now, this is a simplified version
      
      // 1. Fetch NFT to get royalty info
      const nft = await this.metaplex.nfts().findByMint({
        mintAddress: new PublicKey(nftMintAddress),
      });

      const royaltyBps = nft.sellerFeeBasisPoints;
      const royaltyAmount = (priceInSol * royaltyBps) / 10000;
      const sellerAmount = priceInSol - royaltyAmount;

      // 2. Transfer SOL to seller and creator (royalty)
      // This should be atomic in a real implementation
      
      console.log(`Transferring ${sellerAmount} SOL to seller`);
      console.log(`Paying ${royaltyAmount} SOL royalty to creator`);

      // 3. Transfer NFT ownership
      const { response } = await this.metaplex.nfts().transfer({
        nftOrSft: nft,
        toOwner: buyerWallet.publicKey,
        fromOwner: new PublicKey(sellerAddress),
      });

      return {
        signature: response.signature,
        royaltyPaid: royaltyAmount,
      };
    } catch (error) {
      console.error('Error transferring NFT:', error);
      throw new Error('Failed to transfer NFT with royalty');
    }
  }
}
```

3. CREATE ROYALTY CALCULATION UTILITY:
   /src/lib/royalty.ts
```typescript
export class RoyaltyEngine {
  /**
   * Calculate royalty amount in SOL
   */
  static calculateRoyalty(salePrice: number, royaltyPercentage: number): number {
    return (salePrice * royaltyPercentage) / 100;
  }

  /**
   * Calculate distribution for a sale
   */
  static calculateDistribution(salePrice: number, royaltyPercentage: number): {
    toSeller: number;
    toCreator: number;
    royaltyAmount: number;
  } {
    const royaltyAmount = this.calculateRoyalty(salePrice, royaltyPercentage);
    const toSeller = salePrice - royaltyAmount;
    const toCreator = royaltyAmount;

    return {
      toSeller,
      toCreator,
      royaltyAmount,
    };
  }

  /**
   * Convert percentage to basis points (for Metaplex)
   */
  static percentageToBasisPoints(percentage: number): number {
    return percentage * 100;
  }

  /**
   * Convert basis points to percentage
   */
  static basisPointsToPercentage(basisPoints: number): number {
    return basisPoints / 100;
  }

  /**
   * Validate royalty percentage (must be between 0-50%)
   */
  static validateRoyaltyPercentage(percentage: number): boolean {
    return percentage >= 0 && percentage <= 50;
  }
}
```

PHASE 2: CREATE BLOCKCHAIN API ENDPOINTS

1. CREATE MINT NFT ENDPOINT:
   /src/app/api/blockchain/mint/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { NFTService } from '@/services/nft';
import { Keypair, PublicKey } from '@solana/web3.js';
import { DatabaseService } from '@/services/database';
import bs58 from 'bs58';

export async function POST(req: NextRequest) {
  try {
    const { productId, artisanWallet, royaltyPercentage } = await req.json();

    // Validate inputs
    if (!productId || !artisanWallet || royaltyPercentage === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get product from database
    const product = await DatabaseService.getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update product status to minting
    await DatabaseService.updateProductStatus(productId, 'minting');

    // Prepare metadata
    const metadata = {
      name: product.title,
      description: product.description,
      image: product.images[0], // Primary image
      attributes: [
        { trait_type: 'Craft Type', value: product.craft_type },
        { trait_type: 'Region', value: product.region },
        { trait_type: 'Artisan', value: artisanWallet },
        { trait_type: 'Authenticity', value: 'Verified' },
      ],
      properties: {
        category: 'Indonesian Cultural Heritage',
        creators: [
          {
            address: artisanWallet,
            share: 100,
          },
        ],
      },
    };

    // Initialize NFT service
    const nftService = new NFTService();

    // Upload metadata
    const metadataUri = await nftService.uploadMetadata(metadata);

    // For demo: Create a temporary keypair (in production, use server wallet)
    // NOTE: In production, this should be a secure server-side wallet
    const tempKeypair = Keypair.generate();

    // Mint NFT
    const { mintAddress, signature } = await nftService.mintAuthenticityNFT(
      tempKeypair,
      metadataUri,
      product.title,
      royaltyPercentage * 100, // Convert to basis points
      new PublicKey(artisanWallet)
    );

    // Update product with NFT address
    await DatabaseService.updateProductStatus(productId, 'listed', mintAddress);

    return NextResponse.json({
      success: true,
      data: {
        mintAddress,
        signature,
        metadataUri,
        explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
      },
    });
  } catch (error: any) {
    console.error('Mint NFT error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to mint NFT' },
      { status: 500 }
    );
  }
}
```

2. CREATE VERIFY NFT ENDPOINT:
   /src/app/api/blockchain/verify/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { NFTService } from '@/services/nft';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mintAddress = searchParams.get('mintAddress');

    if (!mintAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing mint address' },
        { status: 400 }
      );
    }

    const nftService = new NFTService();
    const verificationResult = await nftService.verifyNFT(mintAddress);

    return NextResponse.json({
      success: true,
      data: verificationResult,
    });
  } catch (error: any) {
    console.error('Verify NFT error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify NFT' },
      { status: 500 }
    );
  }
}
```

3. CREATE PURCHASE ENDPOINT:
   /src/app/api/blockchain/purchase/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { DatabaseService } from '@/services/database';
import { RoyaltyEngine } from '@/lib/royalty';
import { SOLANA_RPC_HOST } from '@/lib/solana/config';

export async function POST(req: NextRequest) {
  try {
    const { productId, buyerWallet, sellerWallet } = await req.json();

    // Get product
    const product = await DatabaseService.getProductById(productId);
    if (!product || product.status !== 'listed') {
      return NextResponse.json(
        { success: false, error: 'Product not available' },
        { status: 400 }
      );
    }

    // Calculate distribution
    const distribution = RoyaltyEngine.calculateDistribution(
      product.price_sol,
      product.royalty_percentage
    );

    // Create transaction for buyer to sign
    const connection = new Connection(SOLANA_RPC_HOST, 'confirmed');
    const transaction = new Transaction();

    // Payment to seller
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(buyerWallet),
        toPubkey: new PublicKey(sellerWallet),
        lamports: distribution.toSeller * LAMPORTS_PER_SOL,
      })
    );

    // Royalty payment to creator
    const artisan = await DatabaseService.getArtisanByWallet(product.artisan_id);
    if (artisan) {
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(buyerWallet),
          toPubkey: new PublicKey(artisan.wallet_address),
          lamports: distribution.toCreator * LAMPORTS_PER_SOL,
        })
      );
    }

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = new PublicKey(buyerWallet);

    // Serialize transaction for client to sign
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    return NextResponse.json({
      success: true,
      data: {
        transaction: serializedTransaction.toString('base64'),
        distribution,
      },
    });
  } catch (error: any) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create purchase transaction' },
      { status: 500 }
    );
  }
}
```

PHASE 3: CREATE BLOCKCHAIN HOOKS FOR FRONTEND

Create /src/hooks/useBlockchain.ts:
```typescript
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';
import { useState } from 'react';

export function useBlockchain() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);

  const mintNFT = async (productId: string, royaltyPercentage: number) => {
    if (!publicKey) throw new Error('Wallet not connected');
    
    setLoading(true);
    try {
      const response = await
      fetch('/api/blockchain/mint', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
productId,
artisanWallet: publicKey.toBase58(),
royaltyPercentage,
}),
});
  const data = await response.json();
  if (!data.success) throw new Error(data.error);

  return data.data;
} finally {
  setLoading(false);
}
};
const verifyNFT = async (mintAddress: string) => {
setLoading(true);
try {
const response = await fetch(/api/blockchain/verify?mintAddress=${mintAddress});
const data = await response.json();
if (!data.success) throw new Error(data.error);
  return data.data;
} finally {
  setLoading(false);
}
};
const purchaseProduct = async (productId: string, sellerWallet: string) => {
if (!publicKey) throw new Error('Wallet not connected');

setLoading(true);
try {
  // Get transaction from backend
  const response = await fetch('/api/blockchain/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId,
      buyerWallet: publicKey.toBase58(),
      sellerWallet,
    }),
  });

  const data = await response.json();
  if (!data.success) throw new Error(data.error);

  // Deserialize and sign transaction
  const transactionBuffer = Buffer.from(data.data.transaction, 'base64');
  const transaction = Transaction.from(transactionBuffer);

  // Send transaction
  const signature = await sendTransaction(transaction, connection);

  // Wait for confirmation
  await connection.confirmTransaction(signature, 'confirmed');

  // Record transaction in database
  await fetch('/api/transactions/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_id: productId,
      buyer_wallet: publicKey.toBase58(),
      seller_wallet: sellerWallet,
      amount_sol: data.data.distribution.toSeller + data.data.distribution.toCreator,
      royalty_amount_sol: data.data.distribution.royaltyAmount,
      tx_signature: signature,
    }),
  });

  return {
    signature,
    distribution: data.data.distribution,
    explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
  };
} finally {
  setLoading(false);
}
};
return {
mintNFT,
verifyNFT,
purchaseProduct,
loading,
};
}

PHASE 4: CREATE QR CODE GENERATION UTILITY

Install QR code library:
```bash
npm install qrcode @types/qrcode
```

Create /src/lib/qr-generator.ts:
```typescript
import QRCode from 'qrcode';

export class QRCodeGenerator {
  /**
   * Generate QR code for product verification
   */
  static async generateProductQR(
    nftAddress: string,
    productId: string
  ): Promise<string> {
    try {
      // Create verification URL
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?nft=${nftAddress}&product=${productId}`;

      // Generate QR code as data URL
      const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 512,
        margin: 2,
        color: {
          dark: '#8B4513', // Budaya Chain brown
          light: '#FFFFFF',
        },
      });

      return qrDataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Generate downloadable QR code for artisans to print
   */
  static async generateDownloadableQR(
    nftAddress: string,
    productId: string,
    productName: string
  ): Promise<Blob> {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?nft=${nftAddress}&product=${productId}`;

    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, verificationUrl, {
      errorCorrectionLevel: 'H',
      width: 1024,
      margin: 4,
      color: {
        dark: '#8B4513',
        light: '#FFFFFF',
      },
    });

    // Add product name below QR
    const ctx = canvas.getContext('2d')!;
    ctx.font = 'bold 24px serif';
    ctx.fillStyle = '#8B4513';
    ctx.textAlign = 'center';
    ctx.fillText(productName, canvas.width / 2, canvas.height - 20);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });
  }
}
```

PHASE 5: TESTING & VALIDATION

1. CREATE BLOCKCHAIN TEST SUITE:
   /tests/blockchain.test.ts
```typescript
import { NFTService } from '@/services/nft';
import { RoyaltyEngine } from '@/lib/royalty';
import { Keypair, PublicKey } from '@solana/web3.js';

describe('Blockchain Integration Tests', () => {
  let nftService: NFTService;
  let testKeypair: Keypair;

  beforeAll(() => {
    nftService = new NFTService();
    testKeypair = Keypair.generate();
  });

  test('Royalty calculation is correct', () => {
    const distribution = RoyaltyEngine.calculateDistribution(10, 15);
    expect(distribution.royaltyAmount).toBe(1.5);
    expect(distribution.toSeller).toBe(8.5);
    expect(distribution.toCreator).toBe(1.5);
  });

  test('Percentage to basis points conversion', () => {
    expect(RoyaltyEngine.percentageToBasisPoints(15)).toBe(1500);
    expect(RoyaltyEngine.basisPointsToPercentage(1500)).toBe(15);
  });

  test('Royalty percentage validation', () => {
    expect(RoyaltyEngine.validateRoyaltyPercentage(15)).toBe(true);
    expect(RoyaltyEngine.validateRoyaltyPercentage(55)).toBe(false);
    expect(RoyaltyEngine.validateRoyaltyPercentage(-5)).toBe(false);
  });

  // Note: These tests require devnet SOL
  test.skip('NFT metadata upload', async () => {
    const metadata = {
      name: 'Test Batik',
      description: 'Test product',
      image: 'https://example.com/image.jpg',
      attributes: [],
      properties: {
        category: 'Test',
        creators: [],
      },
    };

    const uri = await nftService.uploadMetadata(metadata);
    expect(uri).toContain('arweave');
  });
});
```

2. MANUAL TESTING CHECKLIST:

Create /BLOCKCHAIN_TESTING.md:
```markdown
# Blockchain Integration Testing Checklist

## Setup
- [ ] Devnet wallet has sufficient SOL (get from faucet)
- [ ] Environment variables configured
- [ ] Supabase database has test data

## NFT Minting Tests
- [ ] Navigate to creator dashboard
- [ ] Create new product with all details
- [ ] Click "Mint NFT" button
- [ ] Verify loading state appears
- [ ] Confirm transaction in Phantom wallet
- [ ] Verify NFT mint address appears in product
- [ ] Check Solana Explorer for transaction
- [ ] Verify metadata on Arweave

## Verification Tests
- [ ] Navigate to AR verification page
- [ ] Scan QR code (or manually enter NFT address)
- [ ] Verify product details display correctly
- [ ] Verify artisan information is accurate
- [ ] Check provenance timeline

## Purchase Tests
- [ ] Navigate to marketplace
- [ ] Select a product to purchase
- [ ] Click "Buy Now"
- [ ] Verify royalty breakdown shows correctly
- [ ] Confirm transaction in wallet
- [ ] Verify SOL distribution (seller + creator)
- [ ] Check transaction recorded in database
- [ ] Verify product ownership updated

## Royalty Distribution Tests
- [ ] Purchase a product that was previously sold
- [ ] Verify original creator receives royalty
- [ ] Check transaction shows royalty payment
- [ ] Verify correct percentage calculated
- [ ] Confirm both payments in Solana Explorer

## Error Handling Tests
- [ ] Try minting without wallet connection
- [ ] Try purchasing with insufficient balance
- [ ] Try verifying invalid NFT address
- [ ] Verify error messages are user-friendly
- [ ] Check console for no unhandled errors
```

VALIDATION CHECKLIST:
□ NFT service created and working
□ Royalty engine implemented
□ Mint API endpoint created
□ Verify API endpoint created
□ Purchase API endpoint created
□ useBlockchain hook created
□ QR code generator implemented
□ Test suite created
□ Manual testing checklist created
□ No TypeScript errors
□ All functions have error handling

CRITICAL REQUIREMENTS:
- Minting must work on Devnet
- Royalty calculations must be precise
- Transactions must be atomic
- Error messages must be clear
- All blockchain operations logged
- QR codes must be scannable

OUTPUT REQUIRED:
1. All blockchain files created
2. Test results from royalty calculations
3. Screenshot of successful NFT mint
4. Screenshot of Solana Explorer transaction
5. BLOCKCHAIN_INTEGRATION_COMPLETE.md document

DO NOT PROCEED UNTIL BLOCKCHAIN FEATURES ARE 100% FUNCTIONAL.
```

---

CONNECT FRONTEND TO BACKEND - MAKE EVERYTHING WORK
```
CRITICAL TASK - WIRE UP ALL FEATURES - FULL FUNCTIONALITY

CONTEXT:
Now we integrate all the backend APIs and blockchain services into the frontend components. Every button, form, and interaction must be fully functional.

PHASE 1: UPDATE ARTISAN REGISTRATION FLOW

Update /src/app/register/page.tsx and related components:

1. MODIFY REGISTRATION FORM TO USE WALLET + API:
```typescript
'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
// ... other imports

export default function RegisterPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    craft_category: '',
    region: '',
    experience_years: 0,
    bio: '',
    portfolio_images: [] as string[],
  });

  const handleSubmit = async () => {
    if (!connected || !publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/artisans/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          wallet_address: publicKey.toBase58(),
          government_id_verified: true, // Assume verified for demo
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      // Show success and redirect
      alert('Registration successful! Awaiting admin verification.');
      router.push('/dashboard');
    } catch (error: any) {
      alert(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Require wallet connection
  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-4">
            You need to connect your Solana wallet to register as an artisan.
          </p>
          {/* Wallet button should be in header */}
        </div>
      </div>
    );
  }

  return (
    // ... existing form JSX with handleSubmit wired up
  );
}
```

PHASE 2: UPDATE PRODUCT CREATION FLOW

Update /src/app/dashboard/create/page.tsx:
```typescript
'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBlockchain } from '@/hooks/useBlockchain';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const { publicKey } = useWallet();
  const { mintNFT, loading: minting } = useBlockchain();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    craft_type: '',
    region: '',
    price_sol: 0,
    royalty_percentage: 15,
    images: [] as string[],
  });
  const [productId, setProductId] = useState<string | null>(null);
  const [step, setStep] = useState<'create' | 'minting' | 'complete'>('create');

  const handleCreateProduct = async () => {
    try {
      // First, create product in database
      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          artisan_wallet: publicKey?.toBase58(),
          status: 'draft',
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      setProductId(data.data.id);
      setStep('minting');

      // Then mint NFT
      const nftResult = await mintNFT(data.data.id, formData.royalty_percentage);
      
      setStep('complete');
      
      // Show success with NFT details
      alert(`NFT Minted! Address: ${nftResult.mintAddress}`);
      
      // Redirect to product page
      router.push(`/products/${data.data.id}`);
    } catch (error: any) {
      alert(`Failed to create product: ${error.message}`);
      setStep('create');
    }
  };

  return (
    <div>
      {step === 'create' && (
        // Product creation form
        <form onSubmit={(e) => {
          e.preventDefault();
          handleCreateProduct();
        }}>
          {/* Form fields */}
          <button type="submit" disabled={minting}>
            Create & Mint NFT
          </button>
        </form>
      )}

      {step === 'minting' && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gold border-t-transparent mx-auto mb-4" />
          <h3 className="text-xl font-bold">Minting NFT...</h3>
          <p className="text-gray-600">Please wait while we create your authenticity certificate</p>
        </div>
      )}

      {step === 'complete' && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold">Success!</h3>
          <p>Your product has been minted as an NFT</p>
        </div>
      )}
    </div>
  );
}
```

PHASE 3: UPDATE MARKETPLACE WITH REAL DATA

Update /src/app/marketplace/page.tsx:
```typescript
'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/marketplace/product-card';

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    region: '',
    craft_type: '',
    min_price: 0,
    max_price: 1000,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, v]) => v)
      );
      
      const response = await fetch(`/api/products/list?${queryParams}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Filters sidebar */}
      <div className="grid grid-cols-4 gap-6">
        <aside>
          {/* Filter controls */}
          <select 
            value={filters.region}
            onChange={(e) => setFilters({...filters, region: e.target.value})}
          >
            <option value="">All Regions</option>
            <option value="Java">Java</option>
            <option value="Bali">Bali</option>
            <option value="Sumatra">Sumatra</option>
          </select>
          {/* More filters */}
        </aside>

        <div className="col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

PHASE 4: UPDATE PRODUCT DETAIL PAGE WITH PURCHASE FLOW

Update /src/app/products/[id]/page.tsx:
```typescript
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBlockchain } from '@/hooks/useBlockchain';

export default function ProductDetailPage() {
  const params = useParams();
  const { publicKey, connected } = useWallet();
  const { purchaseProduct, loading: purchasing } = useBlockchain();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!product) return;

    try {
      const result = await purchaseProduct(
        product.id,
        product.artisan.wallet_address
      );

      alert(`Purchase successful! Transaction: ${result.signature}`);
      
      // Refresh product data
      fetchProduct();
    } catch (error: any) {
      alert(`Purchase failed: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 gap-12">
        <div>
          {/* Product images */}
          <img src={product.images[0]} alt={product.title} className="w-full rounded-lg" />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl text-gold mb-6">{product.price_sol} SOL</p>
          
          <div className="mb-6">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              ✓ Verified Authentic
            </span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Royalty breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Royalty Information</h3>
            <p>Original creator earns {product.royalty_percentage}% on every resale</p>
          </div>

          {/* Blockchain info */}
          {product.nft_address && (
            <div className="mb-6">
              <h3 className="font-bold mb-2">Blockchain Certificate</h3>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                {product.nft_address}
              </p>
              <a 
                href={`https://explorer.solana.com/address/${product.nft_address}?cluster=devnet`}
                target="_blank"
                className="text-gold hover:underline text-sm"
              >
                View on Solana Explorer →
              </a>
            </div>
          )}

          <button
            onClick={handlePurchase}
            disabled={purchasing || !connected}
            className="w-full bg-gold text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 disabled:opacity-50"
          >
            {purchasing ? 'Processing...' : connected ? `Buy Now - ${product.price_sol} SOL` : 'Connect Wallet to Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

PHASE 5: UPDATE DAO GOVERNANCE WITH VOTING

Update /src/app/dao/page.tsx:
```typescript
'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function DAOPage() {
  const { publicKey, connected } = useWallet();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await fetch('/api/dao/proposals/list');
      const data = await response.json();
      
      if (data.success) {
        setProposals(data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (proposalId: string, voteType: 'for' | 'against') => {
    if (!connected || !publicKey) {
      alert('Please connect your wallet to vote');
      return;
    }

    try {
      const response = await fetch('/api/dao/proposals/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposal_id: proposalId,
          voter_wallet: publicKey.toBase58(),
          vote_type: voteType,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      alert('Vote recorded successfully!');
      
      // Refresh proposals
      fetchProposals();
    } catch (error: any) {
      if (error.message.includes('already voted')) {
        alert('You have already voted on this proposal');
      } else {
        alert(`Voting failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">DAO Governance</h1>

      {loading ? (
        <div>Loading proposals...</div>
      ) : (
        <div className="space-y-6">
          {proposals.map((proposal: any) => (
            <div key={proposal.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-2">{proposal.title}</h3>
              <p className="text-gray-600 mb-4">{proposal.description}</p>

              {/* Voting progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{proposal.votes_for} FOR</span>
                  <span>{proposal.votes_against} AGAINST</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                      width: `${(proposal.votes_for / (proposal.votes_for + proposal.votes_against)) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Vote buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleVote(proposal.id, 'for')}
                  className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Vote FOR
                </button>
                <button
                  onClick={() => handleVote(proposal.id, 'against')}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Vote AGAINST
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

PHASE 6: UPDATE CREATOR DASHBOARD WITH REAL DATA

Update /src/app/dashboard/page.tsx:
```typescript
'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [artisan, setArtisan] = useState<any>(null);
  const [products, setProducts] = useState([]);
  const [earnings, setEarnings] = useState({ total: 0, royalties: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connected && publicKey) {
      fetchDashboardData();
    }
  }, [connected, publicKey]);

  const fetchDashboardData = async () => {
    try {
      // Fetch artisan profile
      const artisanResponse = await fetch(`/api/artisans/${publicKey?.toBase58()}`);
      const artisanData = await artisanResponse.json();
      
      if (artisanData.success) {
        setArtisan(artisanData.data);

        // Fetch products
        const productsResponse = await fetch(`/api/products/list?artisan_id=${artisanData.data.id}`);
        const productsData = await productsResponse.json();
        if (productsData.success) setProducts(productsData.data);

        // Fetch earnings
        const earningsResponse = await fetch(`/api/transactions/earnings?artisan_id=${artisanData.data.id}`);
        const earningsData = await earningsResponse.json();
        if (earningsData.success) setEarnings(earningsData.data);
      } else {
        // Artisan not registered, redirect to registration
        router.push('/register');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p>Please connect your wallet to access the dashboard</p>
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading dashboard...</div>;

  if (!artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Not Registered</h2>
          <p className="mb-4">You need to register as an artisan first</p>
          <button
            onClick={() => router.push('/register')}
            className="bg-gold text-white px-6 py-3 rounded-lg"
          >
            Register Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {artisan.name}!</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">{earnings.total.toFixed(2)} SOL</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 mb-2">Royalty Earnings</h3>
          <p className="text-3xl font-bold">{earnings.royalties.toFixed(2)} SOL</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 mb-2">Active Products</h3>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 mb-2">Verification Status</h3>
          <p className="text-lg font-bold">
            {artisan.verified ? '✅ Verified' : '⏳ Pending'}
          </p>
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Products</h2>
          <button
            onClick={() => router.push('/dashboard/create')}
            className="bg-gold text-white px-6 py-2 rounded-lg"
          >
            Create New Product
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b
            <th className="text-left p-4">Product</th>
            <th className="text-left p-4">Price</th>
          <th className="text-left p-4">Status</th>
          <th className="text-left p-4">NFT</th>
          <th className="text-left p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any) => (
          <tr key={product.id} className="border-b hover:bg-gray-50">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-sm text-gray-500">{product.craft_type}</p>
                </div>
              </div>
            </td>
            <td className="p-4">{product.price_sol} SOL</td>
            <td className="p-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.status === 'listed' ? 'bg-green-100 text-green-800' :
                product.status === 'minting' ? 'bg-yellow-100 text-yellow-800' :
                product.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {product.status}
              </span>
            </td>
            <td className="p-4">
              {product.nft_address ? (
                <a 
                  href={`https://explorer.solana.com/address/${product.nft_address}?cluster=devnet`}
                  target="_blank"
                  className="text-gold hover:underline text-sm"
                >
                  View NFT
                </a>
              ) : (
                <span className="text-gray-400">Not minted</span>
              )}
            </td>
            <td className="p-4">
              <button
                onClick={() => router.push(`/products/${product.id}`)}
                className="text-gold hover:underline"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {products.length === 0 && (
      <div className="p-12 text-center text-gray-500">
        <p className="mb-4">No products yet</p>
        <button
          onClick={() => router.push('/dashboard/create')}
          className="text-gold hover:underline"
        >
          Create your first product →
        </button>
      </div>
    )}
  </div>
</div>
);
}

PHASE 7: UPDATE ADMIN PANEL WITH VERIFICATION FUNCTIONALITY

Update /src/app/admin/page.tsx:
```typescript
'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

// Admin wallet whitelist (in production, this should be in environment variables)
const ADMIN_WALLETS = [
  'YOUR_ADMIN_WALLET_ADDRESS_HERE', // Replace with actual admin wallet
];

export default function AdminPage() {
  const { publicKey, connected } = useWallet();
  const [pendingArtisans, setPendingArtisans] = useState([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('verifications');

  const isAdmin = connected && publicKey && ADMIN_WALLETS.includes(publicKey.toBase58());

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  const fetchAdminData = async () => {
    try {
      // Fetch pending verifications
      const pendingResponse = await fetch('/api/admin/pending-verifications');
      const pendingData = await pendingResponse.json();
      if (pendingData.success) setPendingArtisans(pendingData.data);

      // Fetch platform stats
      const statsResponse = await fetch('/api/analytics/dashboard');
      const statsData = await statsResponse.json();
      if (statsData.success) setStats(statsData.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyArtisan = async (artisanId: string, approved: boolean) => {
    try {
      const response = await fetch('/api/admin/verify-artisan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artisan_id: artisanId,
          verified: approved,
          admin_wallet: publicKey?.toBase58(),
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      alert(`Artisan ${approved ? 'approved' : 'rejected'} successfully`);
      
      // Refresh data
      fetchAdminData();
    } catch (error: any) {
      alert(`Verification failed: ${error.message}`);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
          <p>Please connect your admin wallet to access this page</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h2>
          <p>Your wallet is not authorized to access the admin panel</p>
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading admin panel...</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6">
        <p className="font-bold">⚠️ Admin Access - Handle with care</p>
      </div>

      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats overview */}
      {stats && (
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalArtisans}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Pending Verifications</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingVerifications}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Total Products</h3>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Platform Revenue</h3>
            <p className="text-3xl font-bold">{stats.totalRevenue.toFixed(2)} SOL</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`px-6 py-3 font-semibold ${
            activeTab === 'verifications'
              ? 'border-b-2 border-gold text-gold'
              : 'text-gray-600'
          }`}
        >
          Verifications ({pendingArtisans.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-6 py-3 font-semibold ${
            activeTab === 'analytics'
              ? 'border-b-2 border-gold text-gold'
              : 'text-gray-600'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Verifications tab */}
      {activeTab === 'verifications' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">Pending Artisan Verifications</h2>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Region</th>
                <th className="text-left p-4">Craft</th>
                <th className="text-left p-4">Experience</th>
                <th className="text-left p-4">Portfolio</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingArtisans.map((artisan: any) => (
                <tr key={artisan.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{artisan.name}</p>
                      <p className="text-sm text-gray-500">{artisan.email}</p>
                    </div>
                  </td>
                  <td className="p-4">{artisan.region}</td>
                  <td className="p-4">{artisan.craft_category}</td>
                  <td className="p-4">{artisan.experience_years} years</td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        // Open portfolio modal
                        alert('Portfolio viewer feature coming soon');
                      }}
                      className="text-gold hover:underline"
                    >
                      View {artisan.portfolio_images.length} images
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerifyArtisan(artisan.id, true)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleVerifyArtisan(artisan.id, false)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pendingArtisans.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No pending verifications
            </div>
          )}
        </div>
      )}

      {/* Analytics tab */}
      {activeTab === 'analytics' && stats && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Regional Distribution</h3>
            {Object.entries(stats.regionalDistribution || {}).map(([region, count]: [string, any]) => (
              <div key={region} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span>{region}</span>
                  <span className="font-semibold">{count} artisans</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gold h-3 rounded-full"
                    style={{ width: `${(count / stats.totalArtisans) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Craft Type Distribution</h3>
            {Object.entries(stats.craftDistribution || {}).map(([craft, count]: [string, any]) => (
              <div key={craft} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span>{craft}</span>
                  <span className="font-semibold">{count} products</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gold h-3 rounded-full"
                    style={{ width: `${(count / stats.totalProducts) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

PHASE 8: CREATE MISSING API ROUTES

Create the following API routes that were referenced:

1. **/src/app/api/admin/pending-verifications/route.ts**
2. **/src/app/api/admin/verify-artisan/route.ts**
3. **/src/app/api/transactions/earnings/route.ts**
4. **/src/app/api/artisans/[wallet]/route.ts**

Each should follow the same pattern as previous API routes with proper error handling and database queries.

VALIDATION CHECKLIST:
□ All pages connect to API endpoints
□ Wallet connection required for protected actions
□ Forms submit data successfully
□ Marketplace loads real products
□ Product detail shows correct data
□ Purchase flow works end-to-end
□ DAO voting records correctly
□ Dashboard shows real earnings
□ Admin panel verifies artisans
□ All loading states work
□ All error messages display
□ No console errors
□ TypeScript compiles without errors

TESTING PROCEDURE:
1. Start dev server: `npm run dev`
2. Connect wallet
3. Register as artisan
4. Create a product
5. Mint NFT for product
6. View product in marketplace
7. Purchase product (use different wallet)
8. Check dashboard for earnings
9. Create DAO proposal
10. Vote on proposal
11. Access admin panel (with admin wallet)
12. Verify pending artisan

OUTPUT REQUIRED:
1. All pages updated with API integration
2. All forms functional
3. Screenshots of each major feature working
4. Video recording of complete user flow
5. FRONTEND_INTEGRATION_COMPLETE.md document

DO NOT PROCEED UNTIL ALL FEATURES ARE CONNECTED AND WORKING.
```

---

FINAL POLISH, TESTING & DEPLOYMENT
```
CRITICAL TASK - PRODUCTION DEPLOYMENT - ABSOLUTE WINNER QUALITY

CONTEXT:
Final phase - polish the application, fix all bugs, optimize performance, and deploy to production.

PHASE 1: BUG FIXES & POLISH

1. FIX ALL TYPESCRIPT ERRORS:
```bash
npx tsc --noEmit
```
Review and fix every error. Common issues:
- Missing type definitions
- Incorrect prop types
- Unhandled null/undefined cases
- Missing imports

2. FIX ALL ESLINT WARNINGS:
```bash
npm run lint
```

3. ADD LOADING STATES EVERYWHERE:
   - All data fetching should show spinners
   - Button actions should show loading text
   - Page transitions should be smooth

4. IMPROVE ERROR HANDLING:
   - User-friendly error messages
   - Toast notifications (install react-hot-toast)
   - Fallback UI for failed loads

5. ADD SUCCESS FEEDBACK:
   - Success toasts after actions
   - Confirmation modals for important actions
   - Progress indicators for multi-step processes

6. OPTIMIZE IMAGES:
   - Use Next.js Image component
   - Add proper alt text
   - Lazy load images

7. ADD META TAGS FOR SEO:
   Update /src/app/layout.tsx:
```typescript
export const metadata = {
  title: 'Budaya Chain - Preserve Indonesian Cultural Heritage on Blockchain',
  description: 'Empowering 10M+ Indonesian artisans with blockchain authenticity certificates, automated royalties, and cultural preservation DAO',
  keywords: 'Indonesian crafts, blockchain, NFT, cultural heritage, Solana, artisan marketplace',
  openGraph: {
    title: 'Budaya Chain',
    description: 'Preserving Indonesia\'s Cultural Heritage on Blockchain',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budaya Chain',
    description: 'Empowering Indonesian artisans with blockchain technology',
    images: ['/twitter-image.jpg'],
  },
};
```

PHASE 2: PERFORMANCE OPTIMIZATION

1. IMPLEMENT CODE SPLITTING:
   - Use dynamic imports for heavy components
   - Lazy load routes

2. ADD CACHING:
   - Cache API responses (React Query or SWR)
   - Implement request deduplication

3. OPTIMIZE BUNDLE SIZE:
```bash
   npm run build
   npm run analyze
```
   - Review bundle analysis
   - Remove unused dependencies

4. ADD SERVICE WORKER (optional):
   - Offline support
   - Cache static assets

PHASE 3: COMPREHENSIVE TESTING

1. CREATE TEST CHECKLIST:
```markdown
# Pre-Deployment Testing Checklist

## Wallet Integration
- [ ] Connect Phantom wallet
- [ ] Connect Solflare wallet
- [ ] Disconnect wallet
- [ ] Wallet balance displays correctly
- [ ] Wallet address truncated properly

## Registration Flow
- [ ] Navigate to /register
- [ ] Fill all form fields
- [ ] Submit form
- [ ] Verify data saved to database
- [ ] Redirect to dashboard

## Product Creation
- [ ] Navigate to dashboard
- [ ] Click "Create Product"
- [ ] Fill product details
- [ ] Upload images
- [ ] Set royalty percentage
- [ ] Mint NFT
- [ ] Verify NFT minted on Solana
- [ ] Product appears in marketplace

## Marketplace
- [ ] All products load
- [ ] Filters work (region, craft type, price)
- [ ] Product cards display correctly
- [ ] Click product opens detail page

## Purchase Flow
- [ ] View product detail
- [ ] Click "Buy Now"
- [ ] Confirm transaction in wallet
- [ ] Verify SOL transferred
- [ ] Verify royalty paid to creator
- [ ] Transaction recorded in database

## DAO Governance
- [ ] View proposals list
- [ ] Click "Vote For"
- [ ] Confirm vote recorded
- [ ] Try voting again (should fail)
- [ ] Create new proposal
- [ ] Proposal appears in list

## Dashboard
- [ ] Stats display correctly
- [ ] Products table shows artisan's products
- [ ] Earnings calculate correctly
- [ ] Royalties tracked

## Admin Panel
- [ ] Access restricted to admin wallet
- [ ] Pending verifications load
- [ ] Approve artisan
- [ ] Reject artisan
- [ ] Analytics display

## Mobile Responsiveness
- [ ] Test on iPhone
- [ ] Test on Android
- [ ] All pages responsive
- [ ] Navigation menu works on mobile

## Performance
- [ ] Page load time < 3s
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth animations

## Error Handling
- [ ] Network error shows message
- [ ] Invalid input shows validation
- [ ] Wallet not connected shows prompt
- [ ] Transaction failure handled gracefully
```

2. RUN ALL TESTS:
```bash
npm test
```

3. MANUAL BROWSER TESTING:
   - Chrome
   - Firefox
   - Safari
   - Mobile browsers

PHASE 4: DEPLOYMENT TO VERCEL

1. CREATE VERCEL PROJECT:
```bash
npm install -g vercel
vercel login
vercel
```

2. CONFIGURE ENVIRONMENT VARIABLES:
   In Vercel dashboard, add:
   - NEXT_PUBLIC_SOLANA_NETWORK
   - NEXT_PUBLIC_SOLANA_RPC_HOST
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY

3. DEPLOY:
```bash
vercel --prod
```

4. VERIFY DEPLOYMENT:
   - Visit production URL
   - Test wallet connection
   - Test one complete flow end-to-end

PHASE 5: CREATE DEMO VIDEO

1. SCRIPT:
```
[0:00-0:15] Introduction
- "Hi, I'm presenting Budaya Chain"
- Show landing page
- Explain the problem

[0:15-0:30] Connect Wallet
- Click "Connect Wallet"
- Select Phantom
- Show connected state

[0:30-1:00] Artisan Registration
- Navigate to /register
- Fill form quickly
- Submit
- Show success message

[1:00-1:30] Create & Mint Product
- Dashboard → Create Product
- Fill details
- Click "Mint NFT"
- Show transaction confirmation
- Show NFT on Solana Explorer

[1:30-2:00] Marketplace & Purchase
- Navigate to marketplace
- Use filters
- Click product
- Show product detail with NFT info
- Click "Buy Now"
- Confirm transaction
- Show royalty breakdown

[2:00-2:20] DAO Governance
- Navigate to DAO page
- Show proposals
- Cast vote
- Show vote recorded

[2:20-2:40] Dashboard Analytics
- Show creator dashboard
- Highlight earnings
- Show royalty tracking
- Display products

[2:40-3:00] Closing
- "Budaya Chain: Preserving culture, empowering artisans"
- Show social links
- Thank judges
```

2. RECORD WITH LOOM:
   - Use loom.com
   - Record at 1080p
   - Speak clearly and confidently
   - Show enthusiasm

3. UPLOAD AND GET LINK

PHASE 6: FINAL GITHUB PUSH

1. UPDATE README.md:
```markdown
# 🎨 Budaya Chain

**Preserving Indonesia's Cultural Heritage on Blockchain**

## 🌟 Overview

Budaya Chain empowers 10M+ Indonesian traditional artisans with blockchain technology, providing authenticity certificates, automated perpetual royalties, and cultural preservation infrastructure.

## 🚀 Features

- **Blockchain Authenticity Certificates**: Every traditional craft receives an NFT with tamper-proof provenance
- **Automated Perpetual Royalty System**: Artisans earn 10-15% on every resale, forever
- **AR Verification**: Scan physical products to verify blockchain authenticity
- **Cultural Heritage DAO**: Community-governed preservation funding
- **Government Dashboard**: Real-time analytics for policy-making
- **Zero-fee Marketplace**: Direct artisan-to-buyer connections

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Solana, Metaplex NFT Standard
- **Database**: Supabase (PostgreSQL)
- **Storage**: Arweave (via Bundlr)
- **Wallet**: Solana Wallet Adapter

## 📦 Installation

\`\`\`bash
git clone https://github.com/kikiprojecto/budaya-chain
cd budaya-chain
npm install
cp .env.example .env.local
# Add your environment variables
npm run dev
\`\`\`

## 🌐 Live Demo

**Website**: https://budayachain.vercel.app

**Demo Video**: [Loom Link]

## 📄 Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed setup and usage instructions.

## 🏆 Hackathon Submission

Built for Superteam Indonesia x Komdigi x Ekraf Hackathon

## 📝 License

MIT License - See [LICENSE](./LICENSE)

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📧 Contact

- Twitter: [@BudayaChain](https://twitter.com/BudayaChain)
- Email: contact@budayachain.com
```

2. COMMIT ALL CHANGES:
```bash
git add .
git commit -m "feat: Complete Budaya Chain platform with Solana integration"
git push origin main
```

3. CREATE RELEASE:
   - Go to GitHub releases
   - Create new release v1.0.0
   - Add release notes

VALIDATION CHECKLIST:
□ All TypeScript errors fixed
□ All ESLint warnings resolved
□ All tests passing
□ Performance optimized
□ SEO meta tags added
□ Deployed to Vercel successfully
□ Demo video recorded and uploaded
□ README.md updated
□ GitHub repository cleaned up
□ All environment variables documented
□ DEPLOYMENT_COMPLETE.md created

FINAL OUTPUT:
1. Production URL live and working
2. Demo video link
3. Updated GitHub repository
4. All documentation complete
5. Screenshot of successful deployment

🎉 PROJECT COMPLETE - READY FOR SUBMISSION! 🎉