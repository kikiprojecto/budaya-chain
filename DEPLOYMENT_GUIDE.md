# Budaya Chain - Deployment Guide

Complete guide for deploying Budaya Chain to production.

---

## 📋 Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Create Supabase project
- [ ] Deploy Solana program to devnet/mainnet
- [ ] Configure environment variables
- [ ] Set up storage buckets
- [ ] Create database tables

### 2. Code Quality
- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Run `npm test` - All tests passing
- [ ] Run `npm run build` - Build successful

### 3. Security
- [ ] Audit dependencies with `npm audit`
- [ ] Review API endpoint security
- [ ] Verify wallet transaction signing
- [ ] Test input validation
- [ ] Check environment variable protection

---

## 🗄️ Supabase Setup

### 1. Create Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your project URL and anon key

### 2. Run Database Schema

Execute in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Artisans table
CREATE TABLE artisans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  region TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  bio TEXT,
  portfolio_images TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artisan_id UUID REFERENCES artisans(id) ON DELETE CASCADE,
  nft_address TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL,
  price DECIMAL NOT NULL,
  royalty_bps INTEGER NOT NULL,
  category TEXT NOT NULL,
  region TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  buyer_wallet TEXT NOT NULL,
  seller_wallet TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  royalty_paid DECIMAL NOT NULL,
  tx_signature TEXT UNIQUE NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- DAO Proposals table
CREATE TABLE dao_proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  proposal_type TEXT NOT NULL,
  votes_for INTEGER DEFAULT 0,
  votes_against INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_by TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  ends_at TIMESTAMP NOT NULL
);

-- DAO Votes table
CREATE TABLE dao_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID REFERENCES dao_proposals(id) ON DELETE CASCADE,
  voter_wallet TEXT NOT NULL,
  vote TEXT NOT NULL,
  weight INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(proposal_id, voter_wallet)
);

-- Indexes for performance
CREATE INDEX idx_artisans_wallet ON artisans(wallet_address);
CREATE INDEX idx_artisans_verified ON artisans(verified);
CREATE INDEX idx_products_artisan ON products(artisan_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_region ON products(region);
CREATE INDEX idx_transactions_product ON transactions(product_id);
CREATE INDEX idx_transactions_buyer ON transactions(buyer_wallet);
CREATE INDEX idx_transactions_seller ON transactions(seller_wallet);
CREATE INDEX idx_dao_proposals_status ON dao_proposals(status);
CREATE INDEX idx_dao_votes_proposal ON dao_votes(proposal_id);

-- Row Level Security (RLS)
ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dao_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE dao_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Public read, authenticated write)
CREATE POLICY "Public can view verified artisans" ON artisans
  FOR SELECT USING (verified = true);

CREATE POLICY "Public can view listed products" ON products
  FOR SELECT USING (status = 'listed');

CREATE POLICY "Public can view transactions" ON transactions
  FOR SELECT USING (true);

CREATE POLICY "Public can view active proposals" ON dao_proposals
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view votes" ON dao_votes
  FOR SELECT USING (true);
```

### 3. Create Storage Buckets

In Supabase Storage:

1. **product-images**
   - Public bucket
   - Max file size: 5MB
   - Allowed types: image/*

2. **portfolio-images**
   - Public bucket
   - Max file size: 5MB
   - Allowed types: image/*

### 4. Configure Storage Policies

```sql
-- Allow public uploads to product-images
CREATE POLICY "Public can upload product images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'product-images');

-- Allow public uploads to portfolio-images
CREATE POLICY "Public can upload portfolio images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'portfolio-images');

-- Allow public reads
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id IN ('product-images', 'portfolio-images'));
```

---

## 🔐 Environment Variables

### Development (.env.local)
```env
# Solana Configuration
NEXT_PUBLIC_PROGRAM_ID=YourProgramIDHere
NEXT_PUBLIC_PLATFORM_WALLET=YourPlatformWalletAddress
NEXT_PUBLIC_DAO_TREASURY=YourDAOTreasuryAddress

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Production (Vercel)
Add the same variables in Vercel dashboard:
- Settings → Environment Variables
- Add for Production, Preview, and Development

---

## 🚀 Vercel Deployment

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "feat: Budaya Chain production ready"
git branch -M main
git remote add origin https://github.com/kikiprojecto/budaya-chain.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: `budaya-chain-uiux`
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables**
   - In Vercel dashboard
   - Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your deployment URL

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts to configure
```

---

## 🔧 Build Optimization

### 1. Next.js Configuration

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-supabase-project.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig
```

### 2. Performance Optimization

- ✅ Image optimization with Next.js Image
- ✅ Code splitting by route
- ✅ Dynamic imports for heavy components
- ✅ Lazy loading for images
- ✅ Caching strategy for API routes

---

## 📊 Monitoring & Analytics

### 1. Vercel Analytics
Enable in Vercel dashboard:
- Analytics → Enable

### 2. Error Tracking
Consider integrating:
- Sentry
- LogRocket
- Datadog

### 3. Performance Monitoring
- Vercel Speed Insights
- Google Lighthouse
- Web Vitals

---

## 🔒 Security Hardening

### 1. API Route Protection
```typescript
// Middleware for API routes
export function validateRequest(req: NextRequest) {
  // Verify origin
  const origin = req.headers.get('origin');
  if (!allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }
  
  // Rate limiting
  // CSRF protection
  // Input validation
}
```

### 2. Content Security Policy

Add to `next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## 🧪 Post-Deployment Testing

### 1. Functionality Tests
- [ ] Wallet connection works
- [ ] Product creation successful
- [ ] Purchase flow completes
- [ ] Royalties distribute correctly
- [ ] AR scanner functions
- [ ] DAO voting works

### 2. Performance Tests
- [ ] Page load < 3s
- [ ] Time to Interactive < 5s
- [ ] Lighthouse score > 90

### 3. Security Tests
- [ ] SQL injection protected
- [ ] XSS prevention working
- [ ] CSRF tokens validated
- [ ] Rate limiting active

---

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Already configured in `.github/workflows/ci.yml`

Triggers on:
- Push to `main` branch
- Pull requests to `main`

Runs:
- Linting
- Type checking
- Tests
- Build
- Security audit
- Deployment

---

## 📱 Domain Configuration

### 1. Add Custom Domain
In Vercel:
- Settings → Domains
- Add your domain
- Follow DNS configuration instructions

### 2. SSL Certificate
- Automatically provisioned by Vercel
- Renews automatically

---

## 🆘 Troubleshooting

### Build Failures
```bash
# Clear cache
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### Environment Variable Issues
- Ensure all variables are set in Vercel
- Prefix with `NEXT_PUBLIC_` for client-side access
- Restart deployment after adding variables

### Database Connection Issues
- Verify Supabase URL and key
- Check RLS policies
- Ensure tables exist

---

## 📈 Scaling Considerations

### Database
- Monitor query performance
- Add indexes as needed
- Consider read replicas for high traffic

### API Routes
- Implement caching
- Use CDN for static assets
- Consider serverless functions

### Blockchain
- Monitor RPC rate limits
- Implement retry logic
- Cache blockchain data when possible

---

## 🎯 Success Metrics

Track these KPIs:
- User registrations
- Products listed
- Transactions completed
- Royalties distributed
- Platform uptime
- Page load times
- Error rates

---

## 📞 Support

For deployment issues:
- Check Vercel logs
- Review Supabase logs
- Monitor Solana transactions
- Contact support channels

---

**Deployment Complete! 🎉**

Your Budaya Chain platform is now live and preserving Indonesian cultural heritage on the blockchain.
