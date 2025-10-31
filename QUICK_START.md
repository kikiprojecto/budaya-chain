# 🚀 BUDAYA CHAIN - QUICK START GUIDE

Get your Budaya Chain platform running in **5 simple steps**!

---

## ✅ Step 1: Wait for Installation (IN PROGRESS)

The npm installation is currently running. Wait for it to complete.

```bash
# Check if installation is complete
npm list @solana/web3.js
```

If you see a version number, installation is complete! ✅

---

## ✅ Step 2: Create Supabase Project

### 2.1 Sign Up & Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in:
   - **Name**: budaya-chain
   - **Database Password**: (create a strong password)
   - **Region**: Southeast Asia (Singapore)
6. Click "Create new project"
7. Wait ~2 minutes for setup

### 2.2 Run Database Schema
1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "New Query"
3. Copy **ALL** content from `SUPABASE_SETUP.sql`
4. Paste into the SQL editor
5. Click "Run" (or press Ctrl+Enter)
6. You should see: "Success. No rows returned"

### 2.3 Create Storage Buckets
1. Click "Storage" (left sidebar)
2. Click "New bucket"
3. Create first bucket:
   - **Name**: `product-images`
   - **Public bucket**: ✅ Checked
   - Click "Create bucket"
4. Create second bucket:
   - **Name**: `portfolio-images`
   - **Public bucket**: ✅ Checked
   - Click "Create bucket"

### 2.4 Get Your Credentials
1. Click "Settings" (left sidebar)
2. Click "API"
3. Copy these values:
   - **Project URL** → You'll need this
   - **anon/public key** → You'll need this

---

## ✅ Step 3: Configure Environment Variables

### 3.1 Create .env.local File
1. In your project root, create a file named `.env.local`
2. Copy the template from `ENV_TEMPLATE.md`
3. Fill in your values:

```env
# Solana Configuration
NEXT_PUBLIC_PROGRAM_ID=DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK
NEXT_PUBLIC_PLATFORM_WALLET=DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK
NEXT_PUBLIC_DAO_TREASURY=DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK

# Supabase Configuration (REPLACE WITH YOUR VALUES)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note**: For testing, you can use the same wallet address for all three Solana variables.

---

## ✅ Step 4: Run Development Server

```bash
npm run dev
```

You should see:
```
✓ Ready in 3.2s
○ Local:   http://localhost:3000
```

---

## ✅ Step 5: Test Your Platform

### 5.1 Open in Browser
Visit: [http://localhost:3000](http://localhost:3000)

### 5.2 Connect Wallet
1. Click "Connect Wallet" button
2. Select Phantom or Solflare
3. Approve connection
4. You should see your wallet address and balance

### 5.3 Test Features
- ✅ Wallet connects successfully
- ✅ Balance displays correctly
- ✅ Navigate to Marketplace
- ✅ Navigate to Dashboard
- ✅ Navigate to DAO

---

## 🎯 VERIFICATION CHECKLIST

Run these commands to verify everything is working:

```bash
# 1. Check dependencies installed
npm list @solana/web3.js @supabase/supabase-js

# 2. Check for TypeScript errors
npm run type-check

# 3. Run linter
npm run lint

# 4. Run tests
npm test

# 5. Build for production
npm run build
```

All should pass! ✅

---

## 🔧 TROUBLESHOOTING

### Issue: "Module not found" errors
**Solution**: Wait for npm installation to complete
```bash
npm install --legacy-peer-deps
```

### Issue: "Supabase client error"
**Solution**: Check your `.env.local` file
- Ensure NEXT_PUBLIC_SUPABASE_URL is correct
- Ensure NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- Restart dev server after changing .env.local

### Issue: "Cannot connect to wallet"
**Solution**: 
- Install Phantom wallet extension
- Make sure you're on devnet
- Check browser console for errors

### Issue: Build fails
**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

---

## 📱 NEXT STEPS AFTER SETUP

### 1. Create Test Artisan
1. Go to `/register`
2. Fill in artisan details
3. Submit registration
4. Check Supabase → artisans table

### 2. Create Test Product
1. Go to `/dashboard/create`
2. Fill in product details
3. Upload images
4. Click "Create Product"

### 3. Test AR Scanner
1. Generate QR code for a product
2. Click "Verify Product"
3. Allow camera access
4. Scan the QR code

### 4. Test DAO Voting
1. Go to `/dao`
2. View active proposals
3. Cast a vote
4. Check vote recorded

---

## 🚀 DEPLOY TO PRODUCTION

Once everything works locally:

### Option 1: Deploy with Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push to GitHub:
```bash
git init
git add .
git commit -m "feat: Budaya Chain ready for production"
git branch -M main
git remote add origin https://github.com/kikiprojecto/budaya-chain.git
git push -u origin main
```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - Add environment variables
   - Deploy!

---

## 📞 NEED HELP?

### Documentation
- `README.md` - Full project documentation
- `DEPLOYMENT_GUIDE.md` - Detailed deployment steps
- `IMPLEMENTATION_STATUS.md` - Feature tracking

### Common Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run type-check   # Check TypeScript
npm test             # Run tests
```

---

## 🎉 SUCCESS!

If you can:
- ✅ Connect your wallet
- ✅ See your balance
- ✅ Navigate all pages
- ✅ No console errors

**Congratulations! Your Budaya Chain platform is running! 🇮🇩**

---

**Ready to preserve Indonesian cultural heritage on the blockchain! 🚀**
