-- ============================================
-- BUDAYA CHAIN - SUPABASE DATABASE SCHEMA
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Artisans Table
CREATE TABLE IF NOT EXISTS artisans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  region TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  bio TEXT,
  portfolio_images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artisan_id UUID REFERENCES artisans(id) ON DELETE CASCADE,
  nft_address TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL,
  price DECIMAL(18, 9) NOT NULL,
  royalty_bps INTEGER NOT NULL CHECK (royalty_bps >= 0 AND royalty_bps <= 5000),
  category TEXT NOT NULL,
  region TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'minting', 'listed', 'sold')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  buyer_wallet TEXT NOT NULL,
  seller_wallet TEXT NOT NULL,
  amount DECIMAL(18, 9) NOT NULL,
  royalty_paid DECIMAL(18, 9) NOT NULL,
  tx_signature TEXT UNIQUE NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DAO Proposals Table
CREATE TABLE IF NOT EXISTS dao_proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  proposal_type TEXT NOT NULL CHECK (proposal_type IN ('funding', 'partnership', 'policy')),
  votes_for INTEGER DEFAULT 0,
  votes_against INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'passed', 'rejected', 'expired')),
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ends_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- DAO Votes Table
CREATE TABLE IF NOT EXISTS dao_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID REFERENCES dao_proposals(id) ON DELETE CASCADE,
  voter_wallet TEXT NOT NULL,
  vote TEXT NOT NULL CHECK (vote IN ('for', 'against')),
  weight INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(proposal_id, voter_wallet)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_artisans_wallet ON artisans(wallet_address);
CREATE INDEX IF NOT EXISTS idx_artisans_verified ON artisans(verified);
CREATE INDEX IF NOT EXISTS idx_artisans_category ON artisans(category);
CREATE INDEX IF NOT EXISTS idx_artisans_region ON artisans(region);

CREATE INDEX IF NOT EXISTS idx_products_artisan ON products(artisan_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_region ON products(region);
CREATE INDEX IF NOT EXISTS idx_products_nft ON products(nft_address);

CREATE INDEX IF NOT EXISTS idx_transactions_product ON transactions(product_id);
CREATE INDEX IF NOT EXISTS idx_transactions_buyer ON transactions(buyer_wallet);
CREATE INDEX IF NOT EXISTS idx_transactions_seller ON transactions(seller_wallet);
CREATE INDEX IF NOT EXISTS idx_transactions_timestamp ON transactions(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_dao_proposals_status ON dao_proposals(status);
CREATE INDEX IF NOT EXISTS idx_dao_proposals_ends_at ON dao_proposals(ends_at);

CREATE INDEX IF NOT EXISTS idx_dao_votes_proposal ON dao_votes(proposal_id);
CREATE INDEX IF NOT EXISTS idx_dao_votes_voter ON dao_votes(voter_wallet);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for artisans table
DROP TRIGGER IF EXISTS update_artisans_updated_at ON artisans;
CREATE TRIGGER update_artisans_updated_at
    BEFORE UPDATE ON artisans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for products table
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dao_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE dao_votes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Artisans Policies
DROP POLICY IF EXISTS "Public can view verified artisans" ON artisans;
CREATE POLICY "Public can view verified artisans" ON artisans
  FOR SELECT USING (verified = true);

DROP POLICY IF EXISTS "Public can view all artisans" ON artisans;
CREATE POLICY "Public can view all artisans" ON artisans
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert artisans" ON artisans;
CREATE POLICY "Anyone can insert artisans" ON artisans
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Artisans can update own profile" ON artisans;
CREATE POLICY "Artisans can update own profile" ON artisans
  FOR UPDATE USING (true);

-- Products Policies
DROP POLICY IF EXISTS "Public can view listed products" ON products;
CREATE POLICY "Public can view listed products" ON products
  FOR SELECT USING (status IN ('listed', 'sold'));

DROP POLICY IF EXISTS "Public can view all products" ON products;
CREATE POLICY "Public can view all products" ON products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert products" ON products;
CREATE POLICY "Anyone can insert products" ON products
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update products" ON products;
CREATE POLICY "Anyone can update products" ON products
  FOR UPDATE USING (true);

-- Transactions Policies
DROP POLICY IF EXISTS "Public can view transactions" ON transactions;
CREATE POLICY "Public can view transactions" ON transactions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert transactions" ON transactions;
CREATE POLICY "Anyone can insert transactions" ON transactions
  FOR INSERT WITH CHECK (true);

-- DAO Proposals Policies
DROP POLICY IF EXISTS "Public can view proposals" ON dao_proposals;
CREATE POLICY "Public can view proposals" ON dao_proposals
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create proposals" ON dao_proposals;
CREATE POLICY "Anyone can create proposals" ON dao_proposals
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update proposals" ON dao_proposals;
CREATE POLICY "Anyone can update proposals" ON dao_proposals
  FOR UPDATE USING (true);

-- DAO Votes Policies
DROP POLICY IF EXISTS "Public can view votes" ON dao_votes;
CREATE POLICY "Public can view votes" ON dao_votes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert votes" ON dao_votes;
CREATE POLICY "Anyone can insert votes" ON dao_votes
  FOR INSERT WITH CHECK (true);

-- ============================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ============================================

-- Insert sample artisan
INSERT INTO artisans (wallet_address, name, category, region, verified, bio)
VALUES 
  ('DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK', 'Ibu Siti Rahayu', 'Batik', 'Jawa Tengah', true, 'Master batik artisan with 30 years of experience in traditional Javanese batik techniques.')
ON CONFLICT (wallet_address) DO NOTHING;

-- Insert sample product
INSERT INTO products (artisan_id, title, description, images, price, royalty_bps, category, region, status)
SELECT 
  id,
  'Batik Tulis Parang Rusak',
  'Authentic hand-drawn batik with traditional Parang Rusak pattern. Made with natural dyes and premium cotton fabric.',
  ARRAY['https://example.com/batik1.jpg'],
  2.5,
  1000,
  'Batik',
  'Jawa Tengah',
  'listed'
FROM artisans 
WHERE wallet_address = 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK'
LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================

-- Check if tables were created successfully
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('artisans', 'products', 'transactions', 'dao_proposals', 'dao_votes')
ORDER BY table_name;

-- Check indexes
SELECT 
  tablename,
  indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('artisans', 'products', 'transactions', 'dao_proposals', 'dao_votes')
ORDER BY tablename, indexname;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Create storage buckets: product-images, portfolio-images
-- 2. Configure storage policies (see below)
-- 3. Copy your Supabase URL and anon key to .env.local
-- ============================================
