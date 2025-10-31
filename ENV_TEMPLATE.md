# Environment Variables Template

Copy this content to create your `.env.local` file:

```env
# Solana Configuration
# Get your program ID after deploying your Solana program
NEXT_PUBLIC_PROGRAM_ID=YourSolanaProgramIDHere

# Platform wallet address (receives 2% of royalties)
NEXT_PUBLIC_PLATFORM_WALLET=YourPlatformWalletAddressHere

# DAO treasury wallet address (receives 1% of royalties)
NEXT_PUBLIC_DAO_TREASURY=YourDAOTreasuryAddressHere

# Supabase Configuration
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Optional: Supabase Service Role Key (for admin operations)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## How to Create `.env.local`

1. Copy the content above
2. Create a new file named `.env.local` in the project root
3. Paste the content
4. Replace placeholder values with your actual credentials

## Where to Get Credentials

### Solana Program ID
- Deploy your Solana program to devnet/mainnet
- Use the program ID from deployment
- For testing, you can use a placeholder

### Wallet Addresses
- Use your Phantom/Solflare wallet addresses
- Platform wallet: Your organization's wallet
- DAO treasury: Community treasury wallet

### Supabase Credentials
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon/Public Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Security Notes

- ⚠️ Never commit `.env.local` to Git (already in .gitignore)
- ⚠️ Keep your service role key secret
- ⚠️ Use different credentials for development and production
- ✅ All `NEXT_PUBLIC_*` variables are safe for client-side use
