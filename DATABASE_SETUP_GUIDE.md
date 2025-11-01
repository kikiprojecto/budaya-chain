# DATABASE SETUP GUIDE - BUDAYA CHAIN
**Last Updated**: November 1, 2025  
**Database**: Supabase PostgreSQL

---

## 📋 OVERVIEW

This guide will help you set up the Supabase database for Budaya Chain. The database stores artisans, products, transactions, and DAO proposals.

---

## 🚀 QUICK START

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in project details:
   - **Name**: budaya-chain
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to your location
5. Click "Create new project"
6. Wait for project to be provisioned (~2 minutes)

### Step 2: Get Credentials

1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → This is your `SUPABASE_SERVICE_ROLE_KEY` (for seeding)

### Step 3: Update Environment Variables

Update your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For seeding (keep this secret!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Step 4: Run SQL Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `SUPABASE_SETUP.sql`
4. Paste into the SQL editor
5. Click "Run" or press `Ctrl+Enter`
6. Verify all tables were created successfully

### Step 5: Seed Database (Optional)

Run the seed script to populate with sample data:

```bash
npm run seed
```

This will create:
- 5 sample artisans
- 6 sample products
- 3 DAO proposals
- 2 sample transactions

---

## 📊 DATABASE SCHEMA

### Tables

#### 1. **artisans**
Stores registered artisan information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `wallet_address` | TEXT | Solana wallet address (unique) |
| `name` | TEXT | Artisan's full name |
| `category` | TEXT | Craft category (Batik, Tenun, etc.) |
| `region` | TEXT | Indonesian region |
| `verified` | BOOLEAN | Verification status |
| `bio` | TEXT | Artisan biography |
| `portfolio_images` | TEXT[] | Array of image URLs |
| `created_at` | TIMESTAMP | Registration date |
| `updated_at` | TIMESTAMP | Last update date |

#### 2. **products**
Stores cultural products/NFTs.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `artisan_id` | UUID | Foreign key to artisans |
| `nft_address` | TEXT | Solana NFT mint address |
| `title` | TEXT | Product title |
| `description` | TEXT | Product description |
| `images` | TEXT[] | Array of image URLs |
| `price` | DECIMAL | Price in SOL |
| `royalty_bps` | INTEGER | Royalty in basis points (0-5000) |
| `category` | TEXT | Product category |
| `region` | TEXT | Origin region |
| `status` | TEXT | draft, minting, listed, sold |
| `created_at` | TIMESTAMP | Creation date |
| `updated_at` | TIMESTAMP | Last update date |

#### 3. **transactions**
Records all product sales.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `product_id` | UUID | Foreign key to products |
| `buyer_wallet` | TEXT | Buyer's wallet address |
| `seller_wallet` | TEXT | Seller's wallet address |
| `amount` | DECIMAL | Transaction amount in SOL |
| `royalty_paid` | DECIMAL | Royalty amount in SOL |
| `tx_signature` | TEXT | Solana transaction signature (unique) |
| `timestamp` | TIMESTAMP | Transaction timestamp |

#### 4. **dao_proposals**
DAO governance proposals.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `title` | TEXT | Proposal title |
| `description` | TEXT | Proposal description |
| `proposal_type` | TEXT | funding, partnership, policy |
| `votes_for` | INTEGER | Number of votes in favor |
| `votes_against` | INTEGER | Number of votes against |
| `status` | TEXT | active, passed, rejected, expired |
| `created_by` | TEXT | Creator's wallet address |
| `created_at` | TIMESTAMP | Creation date |
| `ends_at` | TIMESTAMP | Voting deadline |

#### 5. **dao_votes**
Individual DAO votes.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `proposal_id` | UUID | Foreign key to dao_proposals |
| `voter_wallet` | TEXT | Voter's wallet address |
| `vote` | TEXT | for, against |
| `weight` | INTEGER | Vote weight (default 1) |
| `created_at` | TIMESTAMP | Vote timestamp |

**Unique Constraint**: (proposal_id, voter_wallet) - One vote per wallet per proposal

---

## 🔌 API ROUTES

All API routes are located in `/app/api/`:

### Artisans
- `GET /api/artisans` - List all artisans (with filters)
- `POST /api/artisans` - Register new artisan
- `GET /api/artisans/[id]` - Get artisan details
- `PATCH /api/artisans/[id]` - Update artisan
- `POST /api/artisans/register` - Artisan registration endpoint

### Products
- `GET /api/products` - List all products (with filters)
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get product details
- `POST /api/products/create` - Product creation endpoint
- `GET /api/products/list` - List products with pagination

### DAO
- `GET /api/dao/proposals` - List all proposals
- `POST /api/dao/proposals` - Create new proposal
- `POST /api/dao/vote` - Vote on proposal

### Transactions
- `POST /api/transactions/create` - Record new transaction

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics

---

## 🛠️ DATABASE SERVICE LAYER

The database service layer (`/services/database.ts`) provides high-level functions:

### Artisan Service
```typescript
artisanService.getVerified()
artisanService.getByWallet(wallet)
artisanService.register(data)
artisanService.update(id, updates)
artisanService.verify(id)
```

### Product Service
```typescript
productService.getAll(filters)
productService.getById(id)
productService.getByArtisan(artisanId)
productService.create(data)
productService.update(id, updates)
productService.uploadImages(productId, files)
```

### Transaction Service
```typescript
transactionService.getAll()
transactionService.getByProduct(productId)
transactionService.getBySeller(wallet)
transactionService.getByBuyer(wallet)
transactionService.create(data)
transactionService.getAnalytics(artisanId)
```

### DAO Service
```typescript
daoService.getAllProposals()
daoService.getActiveProposals()
daoService.getProposal(id)
daoService.createProposal(data)
daoService.vote(proposalId, voterWallet, vote, weight)
daoService.getVotes(proposalId)
daoService.hasVoted(proposalId, voterWallet)
```

### Admin Service
```typescript
adminService.getPendingVerifications()
adminService.getStatistics()
```

---

## 🧪 TESTING THE DATABASE

### 1. Test Supabase Connection

```bash
# Start dev server
npm run dev

# Open browser console and run:
fetch('/api/artisans').then(r => r.json()).then(console.log)
```

### 2. Test Seed Data

After running `npm run seed`, verify in Supabase Dashboard:
- Go to **Table Editor**
- Check each table has data
- Verify relationships are correct

### 3. Test API Routes

Use browser or Postman:

```bash
# Get all artisans
GET http://localhost:3000/api/artisans

# Get verified artisans only
GET http://localhost:3000/api/artisans?verified=true

# Get products by category
GET http://localhost:3000/api/products?category=Batik

# Get DAO proposals
GET http://localhost:3000/api/dao/proposals
```

---

## 🔒 SECURITY NOTES

### Environment Variables
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Safe for client-side
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Safe for client-side (has RLS protection)
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY` - **NEVER expose to client!** Server-side only

### Row Level Security (RLS)

Currently, RLS is not enabled. For production, you should:

1. Enable RLS on all tables
2. Create policies for:
   - Public read access for verified artisans and listed products
   - Authenticated write access for artisan profiles
   - Admin-only access for verification
   - Wallet-based access for DAO voting

Example RLS policy:
```sql
-- Allow public to read verified artisans
CREATE POLICY "Public can view verified artisans"
ON artisans FOR SELECT
USING (verified = true);

-- Allow artisans to update their own profile
CREATE POLICY "Artisans can update own profile"
ON artisans FOR UPDATE
USING (wallet_address = auth.jwt() ->> 'wallet_address');
```

---

## 🐛 TROUBLESHOOTING

### Issue: "Supabase credentials not found"
**Solution**: Verify `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue: "relation does not exist"
**Solution**: Run the SQL schema in Supabase SQL Editor

### Issue: "Seed script fails"
**Solution**: 
1. Verify Supabase credentials are correct
2. Check if tables exist
3. Look for duplicate wallet addresses

### Issue: "API returns 500 error"
**Solution**:
1. Check browser console for errors
2. Verify Supabase project is active
3. Check API route logs in terminal

---

## 📚 ADDITIONAL RESOURCES

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## ✅ CHECKLIST

Before proceeding to PROMPT 4:

- [ ] Supabase project created
- [ ] Environment variables set in `.env.local`
- [ ] SQL schema executed successfully
- [ ] All tables visible in Supabase dashboard
- [ ] Seed script run successfully (optional)
- [ ] API routes tested and working
- [ ] No console errors when accessing pages

---

**Status**: Database infrastructure ready for blockchain integration (PROMPT 4)
