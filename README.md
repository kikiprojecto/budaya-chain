# BUDAYA CHAIN

**Indonesian Cultural Heritage Preservation Platform on Solana Blockchain**

A Web3 platform that empowers Indonesian artisans to mint, trade, and earn royalties from authentic cultural products using blockchain technology.

---

## 🌟 Features

### Core Functionality
- **✅ Solana Blockchain Integration** - Full Web3 wallet support (Phantom, Solflare)
- **✅ NFT Minting** - Metaplex-powered NFT creation with Arweave metadata storage
- **✅ Royalty System** - Automated royalty distribution (70% artisan, 20% platform, 10% DAO)
- **✅ Product Marketplace** - Browse and purchase verified cultural products
- **✅ Artisan Verification** - Government-backed verification system
- **✅ DAO Governance** - Community-driven decision making

### Unique Differentiators
- **AR Product Verification** - Scan QR codes to verify product authenticity
- **Analytics Dashboard** - Comprehensive insights and government reporting
- **Indonesian Localization** - Full support for Bahasa Indonesia
- **Cultural Heritage Tracking** - Regional and category-based analytics

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern UI components
- **Recharts** - Data visualization

### Blockchain
- **Solana Web3.js** - Blockchain interactions
- **Anchor Framework** - Solana program development
- **Metaplex JS SDK** - NFT standard implementation
- **Wallet Adapter** - Multi-wallet support

### Backend
- **Supabase** - PostgreSQL database and authentication
- **Next.js API Routes** - Serverless API endpoints
- **Zod** - Runtime type validation

### Additional
- **jsQR** - QR code scanning
- **QRCode** - QR code generation
- **Sonner** - Toast notifications

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Phantom or Solflare wallet
- Supabase account

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/kikiprojecto/budaya-chain.git
cd budaya-chain/budaya-chain-uiux
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Configure environment variables**

Create `.env.local`:
```env
# Solana Configuration
NEXT_PUBLIC_PROGRAM_ID=your_program_id_here
NEXT_PUBLIC_PLATFORM_WALLET=your_platform_wallet_address
NEXT_PUBLIC_DAO_TREASURY=your_dao_treasury_address

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase database**

Run the SQL schema from `IMPLEMENTATION_STATUS.md` in your Supabase SQL editor.

Create storage buckets:
- `product-images` (public)
- `portfolio-images` (public)

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Schema

### Tables

**artisans**
- Stores artisan profiles and verification status
- Links to wallet addresses for blockchain transactions

**products**
- Product listings with NFT addresses
- Tracks status (draft, minting, listed, sold)
- Stores royalty configuration

**transactions**
- Records all purchases and royalty distributions
- Links to Solana transaction signatures

**dao_proposals**
- Community governance proposals
- Vote tracking and status management

**dao_votes**
- Individual votes with wallet addresses
- Weighted voting support

---

## 🔐 Security

### Implemented
- ✅ Input validation with Zod
- ✅ Wallet signature verification
- ✅ Row Level Security (RLS) policies
- ✅ Environment variable protection
- ✅ XSS prevention
- ✅ CSRF protection

### Best Practices
- Never commit `.env.local`
- Use hardware wallets for admin operations
- Regularly audit smart contracts
- Monitor transaction patterns

---

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "feat: Budaya Chain - Indonesian Cultural Heritage Platform"
git remote add origin https://github.com/kikiprojecto/budaya-chain.git
git push -u origin main
```

2. **Deploy to Vercel**
- Connect GitHub repository
- Configure environment variables
- Deploy

3. **Configure domain**
- Add custom domain in Vercel settings
- Update DNS records

### Build Verification
```bash
npm run build
```

Ensure:
- ✅ No TypeScript errors
- ✅ No ESLint warnings
- ✅ All pages render correctly

---

## 📱 User Flows

### Artisan Registration
1. Connect wallet
2. Fill registration form
3. Upload portfolio images
4. Submit for verification
5. Await admin approval

### Product Listing
1. Navigate to Dashboard → Create Product
2. Fill product details (title, description, category, region)
3. Upload product images
4. Set price and royalty percentage
5. Mint NFT (blockchain transaction)
6. Product listed in marketplace

### Product Purchase
1. Browse marketplace
2. View product details
3. Click "Buy Now"
4. Confirm transaction (wallet popup)
5. Royalties automatically distributed
6. NFT transferred to buyer

### AR Verification
1. Click "Verify Product" button
2. Allow camera access
3. Scan product QR code
4. View verification result
5. See product details and blockchain proof

---

## 🎨 UI Components

### Layout
- `Header` - Navigation with wallet button
- `Footer` - Links and social media
- `SolanaWalletProvider` - Wallet context

### Wallet
- `WalletButton` - Connect/disconnect with balance
- `WalletStatus` - Connection indicator

### Product
- `ProductCard` - Marketplace product display
- `ProductGrid` - Grid layout with filters
- `ProductDetail` - Full product page

### AR
- `ARScanner` - QR code scanner with verification
- `ARScannerButton` - Trigger button

### Admin
- `VerificationQueue` - Pending artisan approvals
- `AnalyticsDashboard` - Platform statistics
- `EnhancedAnalytics` - Government reporting

---

## 📊 Analytics & Reporting

### Metrics Tracked
- Total sales volume
- Transaction count
- Artisan earnings
- Regional distribution
- Category performance
- Growth rates

### Government Reports
- Export to CSV
- Economic impact analysis
- Artisan income breakdown
- Platform revenue tracking

### Access
```typescript
import { generateGovernmentReport, downloadReportCSV } from '@/lib/analytics';

const report = await generateGovernmentReport(startDate, endDate);
downloadReportCSV(report);
```

---

## 🌐 Internationalization

### Supported Languages
- 🇮🇩 Indonesian (Bahasa Indonesia)
- 🇬🇧 English

### Usage
```typescript
import { t, formatDate, formatIDR } from '@/lib/i18n';

const title = t('product.title', 'id'); // "Produk"
const date = formatDate(new Date(), 'id'); // "31 Oktober 2025"
const price = formatIDR(100000); // "Rp 100.000"
```

---

## 🔧 API Endpoints

### Artisans
- `POST /api/artisans/register` - Register new artisan

### Products
- `POST /api/products/create` - Create product
- `GET /api/products/list` - List products with filters
- `GET /api/products/[id]` - Get product details

### Transactions
- `POST /api/transactions/create` - Record transaction

### Analytics
- `GET /api/analytics/dashboard` - Get platform statistics

### DAO
- `GET /api/dao/proposals` - List proposals
- `POST /api/dao/proposals` - Create proposal
- `POST /api/dao/vote` - Vote on proposal

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
- Wallet connection
- NFT minting
- Purchase flow
- Royalty calculations
- API endpoints

---

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core blockchain integration
- ✅ Marketplace functionality
- ✅ Artisan verification
- ✅ Basic analytics

### Phase 2 (Q1 2026)
- 🔄 AR scanner enhancement
- 🔄 Mobile app (React Native)
- 🔄 Advanced DAO features
- 🔄 Multi-language support expansion

### Phase 3 (Q2 2026)
- ⏳ Cross-chain support
- ⏳ AI-powered product recommendations
- ⏳ Artisan training programs
- ⏳ Government partnership expansion

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Project Lead** - Cultural Heritage Preservation Initiative
- **Blockchain Development** - Solana Integration Team
- **UI/UX Design** - User Experience Team
- **Government Relations** - Ministry of Tourism and Creative Economy

---

## 📞 Support

- **Website**: [budayachain.vercel.app](https://budayachain.vercel.app)
- **Email**: support@budayachain.id
- **Discord**: [Join our community](https://discord.gg/budayachain)
- **Twitter**: [@BudayaChain](https://twitter.com/budayachain)

---

## 🙏 Acknowledgments

- Indonesian Ministry of Tourism and Creative Economy
- Solana Foundation
- Metaplex Foundation
- Local artisan communities across Indonesia
- Open source contributors

---

## ⚠️ Disclaimer

This platform is currently in beta. Always verify product authenticity through multiple channels. Blockchain transactions are irreversible - double-check all details before confirming.

---

**Built with ❤️ for Indonesian Cultural Heritage**
