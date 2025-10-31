import { Connection, PublicKey } from '@solana/web3.js';
import { calculateRoyaltyDistribution, RoyaltyConfig, DEFAULT_ROYALTY_CONFIG } from './program/budaya-chain';

/**
 * Royalty Engine
 * Handles royalty calculations, distribution, and history tracking
 */

/**
 * Royalty Transaction Record
 */
export interface RoyaltyTransaction {
  transactionSignature: string;
  nftMint: string;
  salePrice: number;
  artisanWallet: string;
  artisanAmount: number;
  platformAmount: number;
  daoAmount: number;
  sellerAmount: number;
  timestamp: number;
}

/**
 * Artisan Royalty Summary
 */
export interface ArtisanRoyaltySummary {
  totalEarnings: number;
  transactionCount: number;
  averageRoyalty: number;
  lastPaymentDate: number | null;
  topProducts: Array<{
    nftMint: string;
    productName: string;
    totalRoyalties: number;
    salesCount: number;
  }>;
}

/**
 * Calculate royalty amounts for a sale
 */
export function calculateRoyalty(
  salePrice: number,
  royaltyBps: number = 1000 // Default 10%
): number {
  return Math.floor((salePrice * royaltyBps) / 10000);
}

/**
 * Calculate detailed royalty distribution
 */
export function calculateDetailedRoyalty(
  salePrice: number,
  config: RoyaltyConfig = DEFAULT_ROYALTY_CONFIG
): {
  total: number;
  artisan: number;
  platform: number;
  dao: number;
  seller: number;
  breakdown: string;
} {
  const distribution = calculateRoyaltyDistribution(salePrice, config);
  
  const total = distribution.artisanAmount + distribution.platformAmount + distribution.daoAmount;
  
  return {
    total,
    artisan: distribution.artisanAmount,
    platform: distribution.platformAmount,
    dao: distribution.daoAmount,
    seller: distribution.sellerAmount,
    breakdown: `Artisan: ${(config.artisanShare / 100).toFixed(1)}%, Platform: ${(config.platformShare / 100).toFixed(1)}%, DAO: ${(config.daoTreasuryShare / 100).toFixed(1)}%`,
  };
}

/**
 * Distribute royalties (records transaction)
 */
export async function distributeRoyalties(
  transactionSignature: string,
  nftMint: string,
  salePrice: number,
  artisanWallet: string,
  config: RoyaltyConfig = DEFAULT_ROYALTY_CONFIG
): Promise<RoyaltyTransaction> {
  const distribution = calculateRoyaltyDistribution(salePrice, config);
  
  const transaction: RoyaltyTransaction = {
    transactionSignature,
    nftMint,
    salePrice,
    artisanWallet,
    artisanAmount: distribution.artisanAmount,
    platformAmount: distribution.platformAmount,
    daoAmount: distribution.daoAmount,
    sellerAmount: distribution.sellerAmount,
    timestamp: Date.now(),
  };

  // In production, this would be stored in Supabase
  console.log('Royalty distributed:', transaction);
  
  return transaction;
}

/**
 * Get royalty history for an artisan
 */
export async function getRoyaltyHistory(
  artisanWallet: string,
  limit: number = 50
): Promise<RoyaltyTransaction[]> {
  // In production, fetch from Supabase
  // For now, return empty array
  return [];
}

/**
 * Get artisan royalty summary
 */
export async function getArtisanRoyaltySummary(
  artisanWallet: string
): Promise<ArtisanRoyaltySummary> {
  const history = await getRoyaltyHistory(artisanWallet);
  
  if (history.length === 0) {
    return {
      totalEarnings: 0,
      transactionCount: 0,
      averageRoyalty: 0,
      lastPaymentDate: null,
      topProducts: [],
    };
  }

  const totalEarnings = history.reduce((sum, tx) => sum + tx.artisanAmount, 0);
  const averageRoyalty = totalEarnings / history.length;
  const lastPaymentDate = Math.max(...history.map(tx => tx.timestamp));

  // Group by NFT mint to find top products
  const productMap = new Map<string, { total: number; count: number }>();
  history.forEach(tx => {
    const existing = productMap.get(tx.nftMint) || { total: 0, count: 0 };
    productMap.set(tx.nftMint, {
      total: existing.total + tx.artisanAmount,
      count: existing.count + 1,
    });
  });

  const topProducts = Array.from(productMap.entries())
    .map(([nftMint, data]) => ({
      nftMint,
      productName: 'Product', // Would fetch from metadata
      totalRoyalties: data.total,
      salesCount: data.count,
    }))
    .sort((a, b) => b.totalRoyalties - a.totalRoyalties)
    .slice(0, 5);

  return {
    totalEarnings,
    transactionCount: history.length,
    averageRoyalty,
    lastPaymentDate,
    topProducts,
  };
}

/**
 * Validate royalty configuration
 */
export function validateRoyaltyConfig(config: RoyaltyConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check total doesn't exceed 100%
  const total = config.artisanShare + config.platformShare + config.daoTreasuryShare;
  if (total > 10000) {
    errors.push(`Total royalty (${total / 100}%) exceeds 100%`);
  }

  // Check individual shares are non-negative
  if (config.artisanShare < 0) {
    errors.push('Artisan share cannot be negative');
  }
  if (config.platformShare < 0) {
    errors.push('Platform share cannot be negative');
  }
  if (config.daoTreasuryShare < 0) {
    errors.push('DAO treasury share cannot be negative');
  }

  // Check reasonable limits (max 50% total royalty)
  if (total > 5000) {
    errors.push(`Total royalty (${total / 100}%) exceeds recommended maximum of 50%`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format royalty amount for display
 */
export function formatRoyalty(lamports: number, decimals: number = 4): string {
  const sol = lamports / 1_000_000_000;
  return `${sol.toFixed(decimals)} SOL`;
}

/**
 * Calculate estimated royalty earnings
 */
export function estimateRoyaltyEarnings(
  productPrice: number,
  expectedSales: number,
  royaltyBps: number = 1000
): {
  perSale: number;
  total: number;
  monthly: number;
  yearly: number;
} {
  const perSale = calculateRoyalty(productPrice, royaltyBps);
  const total = perSale * expectedSales;
  
  // Assume sales are distributed evenly over a year
  const monthly = total / 12;
  const yearly = total;

  return {
    perSale,
    total,
    monthly,
    yearly,
  };
}
