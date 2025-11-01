# COMPLETE TESTING GUIDE - BUDAYA CHAIN
**Date**: November 1, 2025  
**Status**: Ready for Complete Testing  
**URL**: http://localhost:3000

---

## 🎯 TESTING OVERVIEW

This guide will walk you through testing **EVERY feature** of the Budaya Chain platform on localhost.

**Estimated Time**: 30-45 minutes  
**Prerequisites**: Dev server running (✅ Already running)

---

## ✅ PREREQUISITES CHECKLIST

Before starting, ensure you have:

- [x] **Dev Server Running** - ✅ Already running on port 3000
- [ ] **Wallet Installed** - Phantom or Solflare browser extension
- [ ] **Wallet on Devnet** - Switch network to Devnet
- [ ] **Devnet SOL** - At least 0.5 SOL (get from faucet)
- [ ] **Supabase Setup** - Credentials in .env.local (optional for some tests)

### Get Devnet SOL (If Needed)
```
1. Install Phantom wallet extension
2. Create/import wallet
3. Switch to Devnet (Settings → Change Network → Devnet)
4. Copy your wallet address
5. Visit: https://faucet.solana.com
6. Paste address and request 1 SOL
7. Wait 10-30 seconds for confirmation
```

---

## 📋 COMPLETE TESTING CHECKLIST

### PHASE 1: BASIC NAVIGATION (5 minutes)

#### 1.1 Homepage
- [ ] Open http://localhost:3000
- [ ] Verify homepage loads
- [ ] Check hero section displays
- [ ] Verify "Connect Wallet" button in header
- [ ] Check featured products section
- [ ] Verify footer displays

#### 1.2 Navigation Menu
- [ ] Click "Marketplace" in header
- [ ] Click "Artisans" in header
- [ ] Click "DAO" in header
- [ ] Click "Verify" in header
- [ ] Click "Government" in header (if visible)
- [ ] All pages load without errors

#### 1.3 Console Check
- [ ] Open browser DevTools (F12)
- [ ] Check Console tab
- [ ] No critical errors (some warnings OK)
- [ ] Supabase warning is expected if credentials not set

**Expected**: All pages load, navigation works, no critical errors

---

### PHASE 2: WALLET INTEGRATION (5 minutes)

#### 2.1 Connect Wallet
- [ ] Click "Connect Wallet" button in header
- [ ] Wallet modal appears
- [ ] See Phantom and Solflare options
- [ ] Modal has brown/gold Budaya Chain styling
- [ ] Click "Phantom"
- [ ] Phantom extension popup appears
- [ ] Approve connection
- [ ] Modal closes

#### 2.2 Wallet Connected State
- [ ] Wallet button shows truncated address (e.g., "7xK9...M2kU")
- [ ] Wallet button has gradient brown-to-gold styling
- [ ] Click wallet button
- [ ] Dropdown menu appears with:
  - [ ] Full wallet address
  - [ ] Copy address button
  - [ ] View on Explorer button
  - [ ] Disconnect button
- [ ] Click "Copy Address"
- [ ] Success toast appears
- [ ] Click "View on Explorer"
- [ ] Opens Solana Explorer in new tab
- [ ] Click "Disconnect"
- [ ] Wallet disconnects
- [ ] Button returns to "Connect Wallet"

#### 2.3 Reconnect
- [ ] Connect wallet again
- [ ] Verify auto-connect works on page refresh

**Expected**: Wallet connects smoothly, UI updates correctly, all actions work

---

### PHASE 3: MARKETPLACE (10 minutes)

#### 3.1 Browse Products
- [ ] Navigate to /marketplace
- [ ] Products display in grid
- [ ] Each product card shows:
  - [ ] Product image
  - [ ] Title
  - [ ] Artisan name
  - [ ] Price in SOL
  - [ ] Region
  - [ ] Category
  - [ ] Verified badge (if applicable)

#### 3.2 Filters
- [ ] Click region filter dropdown
- [ ] Select "Java"
- [ ] Products filter by region
- [ ] Click craft type filter
- [ ] Select "Batik"
- [ ] Products filter by craft type
- [ ] Adjust price range slider
- [ ] Products filter by price
- [ ] Click "Reset Filters"
- [ ] All products show again

#### 3.3 Product Details
- [ ] Click on a product card
- [ ] Product modal/page opens
- [ ] See full product details:
  - [ ] Large image(s)
  - [ ] Full description
  - [ ] Price
  - [ ] Artisan information
  - [ ] Category and region
  - [ ] Royalty percentage
- [ ] Click "Buy Now" button (don't complete purchase yet)
- [ ] Close modal/return to marketplace

#### 3.4 API Integration Check
- [ ] Open DevTools → Network tab
- [ ] Refresh marketplace page
- [ ] See API call to `/api/products?status=listed`
- [ ] Response shows products array
- [ ] If Supabase not set up, shows mock data (OK)

**Expected**: Marketplace loads, filters work, products display correctly

---

### PHASE 4: ARTISAN REGISTRATION (10 minutes)

#### 4.1 Navigate to Registration
- [ ] Click "Register" or navigate to /register
- [ ] Registration form displays
- [ ] See progress indicator (steps)
- [ ] Wallet must be connected

#### 4.2 Fill Registration Form

**Step 1: Personal Information**
- [ ] Enter name: "Test Artisan"
- [ ] Enter email: "test@example.com"
- [ ] Click "Next"

**Step 2: Craft Category**
- [ ] Select craft type: "Batik"
- [ ] Select region: "Yogyakarta"
- [ ] Enter experience: "5 years"
- [ ] Enter bio: "Traditional Batik artisan"
- [ ] Click "Next"

**Step 3: Portfolio (Optional)**
- [ ] Skip for now or upload test images
- [ ] Click "Submit"

#### 4.3 Submission
- [ ] Loading state appears
- [ ] API call to `/api/artisans` (check Network tab)
- [ ] Success toast appears: "Registration successful! Awaiting verification."
- [ ] Form advances to success state

#### 4.4 Verify in Database (If Supabase Set Up)
- [ ] Open Supabase dashboard
- [ ] Go to Table Editor → artisans
- [ ] See new artisan record
- [ ] Wallet address matches your wallet
- [ ] Verified = false (awaiting approval)

**Expected**: Registration completes, data saved, success message shown

---

### PHASE 5: NFT MINTING (15 minutes)

**Prerequisites**: 
- Wallet connected
- At least 0.02 SOL in wallet
- Registered as artisan (from Phase 4)

#### 5.1 Navigate to Product Creation
- [ ] Go to /dashboard/create (or creator dashboard)
- [ ] Product creation form displays

#### 5.2 Fill Product Details
- [ ] Title: "Test Batik Sarong"
- [ ] Description: "Hand-woven traditional batik"
- [ ] Category: "Batik"
- [ ] Region: "Yogyakarta"
- [ ] Price: 1 SOL
- [ ] Royalty: 15%
- [ ] Image URL: Use any valid image URL or upload

#### 5.3 Mint NFT
- [ ] Click "Mint NFT" button
- [ ] Progress messages appear:
  - [ ] "Initializing..."
  - [ ] "Connecting to Solana..."
  - [ ] "Preparing metadata..."
  - [ ] "Uploading metadata to Arweave..."
  - [ ] "Generating NFT address..."
  - [ ] "Creating NFT on blockchain..."
  - [ ] "Waiting for wallet signature..."
- [ ] Phantom popup appears
- [ ] Review transaction details
- [ ] Click "Approve"
- [ ] Wait for confirmation (10-20 seconds)
- [ ] Success message appears
- [ ] Mint address displayed

#### 5.4 Verify NFT Created
- [ ] Copy mint address
- [ ] Open Phantom wallet
- [ ] Go to "Collectibles" tab
- [ ] See your NFT with:
  - [ ] Product title
  - [ ] Product image
  - [ ] Description
- [ ] Click NFT in wallet
- [ ] See full metadata

#### 5.5 Verify on Explorer
- [ ] Copy mint address
- [ ] Go to https://explorer.solana.com
- [ ] Paste address
- [ ] Switch to Devnet
- [ ] See NFT details:
  - [ ] Mint address
  - [ ] Metadata URI (Arweave)
  - [ ] Creator (your wallet)
  - [ ] Royalty percentage

#### 5.6 Check Console
- [ ] No errors in browser console
- [ ] See success logs

**Expected**: NFT mints successfully, appears in wallet, visible on Explorer

---

### PHASE 6: AR VERIFICATION (5 minutes)

#### 6.1 Navigate to Verification
- [ ] Go to /verify
- [ ] Verification page loads
- [ ] See manual input field
- [ ] See QR scanner component

#### 6.2 Verify Valid NFT
- [ ] Copy mint address from Phase 5
- [ ] Paste into verification input
- [ ] Click "Verify"
- [ ] Loading spinner appears
- [ ] Result displays with GREEN border
- [ ] See "AUTHENTIC PRODUCT VERIFIED" ✅
- [ ] Product details show:
  - [ ] Product image
  - [ ] Title
  - [ ] Category and region
  - [ ] Artisan name
  - [ ] Verification status
  - [ ] Royalty percentage
- [ ] Blockchain certificate shows mint address
- [ ] Click "View on Solana Explorer"
- [ ] Opens Explorer in new tab

#### 6.3 Verify Invalid NFT
- [ ] Enter random address: "ABC123invalid"
- [ ] Click "Verify"
- [ ] Result displays with RED border
- [ ] See "VERIFICATION FAILED" ❌
- [ ] Error message: "Product could not be verified"

**Expected**: Valid NFTs verify successfully, invalid ones fail gracefully

---

### PHASE 7: PURCHASE FLOW (10 minutes)

**Prerequisites**:
- Two wallets (seller and buyer)
- Product with NFT minted
- Buyer wallet has sufficient SOL

#### 7.1 List Product
- [ ] Ensure product from Phase 5 is listed
- [ ] Status = "listed"
- [ ] NFT address populated

#### 7.2 Initiate Purchase (Different Wallet)
- [ ] Disconnect current wallet
- [ ] Connect different wallet (buyer)
- [ ] Navigate to marketplace
- [ ] Find the product
- [ ] Click "Buy Now"
- [ ] Purchase modal appears
- [ ] See price breakdown:
  - [ ] Total price
  - [ ] To seller
  - [ ] Royalty to creator
  - [ ] Royalty percentage

#### 7.3 Complete Purchase
- [ ] Click "Confirm Purchase"
- [ ] Transaction preparing...
- [ ] Phantom popup appears
- [ ] Review transaction:
  - [ ] Two transfers (seller + royalty)
  - [ ] Total amount
- [ ] Click "Approve"
- [ ] Wait for confirmation
- [ ] Success message appears
- [ ] Transaction signature displayed

#### 7.4 Verify Purchase
- [ ] Check buyer wallet balance (decreased)
- [ ] Check seller wallet balance (increased)
- [ ] Check creator wallet balance (royalty received)
- [ ] Product status changed to "sold"
- [ ] Transaction recorded in database

#### 7.5 Check Explorer
- [ ] Copy transaction signature
- [ ] View on Solana Explorer
- [ ] See transaction details
- [ ] Verify transfers

**Expected**: Purchase completes, SOL transferred, royalty paid, product marked sold

---

### PHASE 8: GOVERNMENT DASHBOARD (5 minutes)

#### 8.1 Navigate to Dashboard
- [ ] Go to /government
- [ ] Dashboard loads
- [ ] See KOMDIGI/EKRAF branding

#### 8.2 Verify Metrics
- [ ] Impact cards display:
  - [ ] Total artisans
  - [ ] Products verified
  - [ ] Cultural heritage saved
  - [ ] Economic impact
- [ ] Regional distribution chart
- [ ] Heritage statistics
- [ ] All data loads from API

#### 8.3 API Integration
- [ ] Open Network tab
- [ ] See call to `/api/analytics/dashboard`
- [ ] Response contains stats
- [ ] Loading state appears briefly
- [ ] Data populates

**Expected**: Dashboard shows metrics, charts display, data loads from API

---

### PHASE 9: IMAGE UPLOAD (5 minutes)

**Prerequisites**: Supabase Storage buckets created

#### 9.1 Test Upload Component
- [ ] Navigate to registration or product creation
- [ ] Find image upload section
- [ ] Click "Upload Images"
- [ ] File picker opens
- [ ] Select image file (JPG, PNG, <5MB)
- [ ] Upload progress appears
- [ ] Image preview displays
- [ ] URL saved

#### 9.2 Verify Upload
- [ ] Open Supabase dashboard
- [ ] Go to Storage
- [ ] Check bucket (product-images or portfolio-images)
- [ ] See uploaded file
- [ ] Copy public URL
- [ ] Paste in browser
- [ ] Image displays

#### 9.3 Test Validation
- [ ] Try uploading file >5MB
- [ ] Error message appears
- [ ] Try uploading non-image file
- [ ] Error message appears
- [ ] Try uploading 6 images (max 5)
- [ ] Error message appears

**Expected**: Images upload successfully, validation works, files stored in Supabase

---

### PHASE 10: DAO GOVERNANCE (5 minutes)

#### 10.1 View Proposals
- [ ] Navigate to /dao
- [ ] Proposals list displays
- [ ] Each proposal shows:
  - [ ] Title
  - [ ] Description
  - [ ] Type (funding/partnership/policy)
  - [ ] Votes for/against
  - [ ] Status
  - [ ] Time remaining

#### 10.2 Vote on Proposal
- [ ] Click on a proposal
- [ ] Proposal details display
- [ ] See vote buttons (For/Against)
- [ ] Click "Vote For"
- [ ] Confirmation modal appears
- [ ] Confirm vote
- [ ] Vote recorded
- [ ] Vote count updates

#### 10.3 Create Proposal (If Implemented)
- [ ] Click "Create Proposal"
- [ ] Fill proposal form
- [ ] Submit
- [ ] Proposal created
- [ ] Appears in list

**Expected**: Proposals display, voting works, data updates

---

## 🐛 TROUBLESHOOTING

### Issue: "Wallet not connecting"
**Solutions**:
1. Refresh page
2. Check Phantom extension is installed
3. Try disconnecting and reconnecting
4. Clear browser cache
5. Try different browser

### Issue: "Insufficient SOL"
**Solutions**:
1. Visit https://faucet.solana.com
2. Request more devnet SOL
3. Wait 30 seconds for confirmation
4. Refresh wallet

### Issue: "NFT minting fails"
**Solutions**:
1. Check wallet has 0.02 SOL minimum
2. Verify network is Devnet
3. Check console for errors
4. Try again (network congestion)
5. Ensure RPC endpoint is responsive

### Issue: "API returns errors"
**Solutions**:
1. Check if Supabase credentials are set
2. Verify .env.local file exists
3. Restart dev server: `npm run dev`
4. Check Network tab for error details

### Issue: "Images won't upload"
**Solutions**:
1. Create Supabase Storage buckets
2. Set buckets to public
3. Check file size (<5MB)
4. Check file type (JPG, PNG, GIF, WebP)
5. Verify Supabase credentials

### Issue: "Products not displaying"
**Solutions**:
1. If Supabase not set up, mock data should show
2. Check console for errors
3. Verify API route exists
4. Check Network tab for failed requests

---

## ✅ TESTING COMPLETION CHECKLIST

### Core Features
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Wallet connects/disconnects
- [ ] Marketplace displays products
- [ ] Filters work
- [ ] Registration completes
- [ ] NFT minting works
- [ ] NFT appears in wallet
- [ ] Verification works
- [ ] Purchase completes
- [ ] Royalties distributed
- [ ] Government dashboard loads
- [ ] Image upload works
- [ ] DAO proposals display

### Technical Checks
- [ ] No critical console errors
- [ ] All API routes respond
- [ ] Loading states display
- [ ] Error messages show
- [ ] Success toasts appear
- [ ] Responsive on mobile
- [ ] Works in Chrome
- [ ] Works in Firefox

### User Experience
- [ ] UI is visually appealing
- [ ] Brown/gold theme consistent
- [ ] Buttons are clickable
- [ ] Forms are intuitive
- [ ] Feedback is clear
- [ ] Navigation is smooth
- [ ] Loading states are visible
- [ ] Errors are user-friendly

---

## 📊 TESTING RESULTS TEMPLATE

Copy this template and fill in your results:

```
BUDAYA CHAIN - TESTING RESULTS
Date: ___________
Tester: ___________

PHASE 1: BASIC NAVIGATION
✅ / ❌ Homepage loads
✅ / ❌ All pages accessible
✅ / ❌ No critical errors
Notes: ___________

PHASE 2: WALLET INTEGRATION
✅ / ❌ Wallet connects
✅ / ❌ UI updates correctly
✅ / ❌ Disconnect works
Notes: ___________

PHASE 3: MARKETPLACE
✅ / ❌ Products display
✅ / ❌ Filters work
✅ / ❌ Product details show
Notes: ___________

PHASE 4: REGISTRATION
✅ / ❌ Form submits
✅ / ❌ Data saved
✅ / ❌ Success message
Notes: ___________

PHASE 5: NFT MINTING
✅ / ❌ Minting completes
✅ / ❌ NFT in wallet
✅ / ❌ On Explorer
Notes: ___________

PHASE 6: VERIFICATION
✅ / ❌ Valid NFT verifies
✅ / ❌ Invalid NFT fails
✅ / ❌ Details display
Notes: ___________

PHASE 7: PURCHASE
✅ / ❌ Purchase completes
✅ / ❌ SOL transferred
✅ / ❌ Royalty paid
Notes: ___________

PHASE 8: GOVERNMENT DASHBOARD
✅ / ❌ Dashboard loads
✅ / ❌ Metrics display
✅ / ❌ API integration
Notes: ___________

PHASE 9: IMAGE UPLOAD
✅ / ❌ Upload works
✅ / ❌ Validation works
✅ / ❌ Files stored
Notes: ___________

PHASE 10: DAO
✅ / ❌ Proposals display
✅ / ❌ Voting works
Notes: ___________

OVERALL RATING: ___/10
CRITICAL ISSUES: ___________
MINOR ISSUES: ___________
RECOMMENDATIONS: ___________
```

---

## 🎯 SUCCESS CRITERIA

### Minimum Viable Demo
- ✅ Homepage loads
- ✅ Wallet connects
- ✅ Marketplace shows products
- ✅ Registration works
- ✅ NFT minting works (or simulated)
- ✅ Verification works
- ✅ No critical errors

### Full Feature Demo
- ✅ All minimum features
- ✅ Purchase flow works
- ✅ Royalties distributed
- ✅ Image upload works
- ✅ Government dashboard loads
- ✅ DAO features work
- ✅ All pages functional

### Production Ready
- ✅ All features work
- ✅ Supabase integrated
- ✅ Real data flows
- ✅ No mock data
- ✅ Performance optimized
- ✅ Error handling robust
- ✅ Mobile responsive

---

## 📞 NEED HELP?

### Quick Fixes
1. **Restart dev server**: `Ctrl+C` then `npm run dev`
2. **Clear cache**: Hard refresh with `Ctrl+Shift+R`
3. **Check console**: F12 → Console tab
4. **Check network**: F12 → Network tab

### Documentation
- `IMPLEMENTATION_COMPLETE.md` - Full implementation details
- `NFT_MINTING_COMPLETE.md` - NFT minting guide
- `DATABASE_SETUP_GUIDE.md` - Database setup
- `ALL_URGENT_FIXES_COMPLETE.md` - Recent fixes

### Common Commands
```bash
# Start dev server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Seed database (if Supabase set up)
npm run seed
```

---

## 🎉 READY TO TEST!

**Your dev server is running at**: http://localhost:3000

**Start with Phase 1** and work through each phase systematically. Take notes of any issues you encounter.

**Good luck with testing!** 🚀

---

**Testing Guide Version**: 1.0  
**Last Updated**: November 1, 2025  
**Status**: Ready for Complete Testing
