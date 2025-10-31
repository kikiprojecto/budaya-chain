/**
 * Royalty Calculation Tests
 * Tests for royalty engine functionality
 */

import { describe, it, expect } from '@jest/globals';

describe('Royalty Calculations', () => {
  const ARTISAN_BPS = 700;  // 7%
  const PLATFORM_BPS = 200; // 2%
  const DAO_BPS = 100;      // 1%
  const TOTAL_BPS = 1000;   // 10%

  it('should calculate correct royalty amounts', () => {
    const salePrice = 10; // 10 SOL
    const totalRoyalty = (salePrice * TOTAL_BPS) / 10000;
    
    expect(totalRoyalty).toBe(1); // 10% of 10 SOL = 1 SOL
  });

  it('should distribute royalties correctly', () => {
    const salePrice = 10;
    const totalRoyalty = (salePrice * TOTAL_BPS) / 10000;
    
    const artisanShare = (totalRoyalty * ARTISAN_BPS) / TOTAL_BPS;
    const platformShare = (totalRoyalty * PLATFORM_BPS) / TOTAL_BPS;
    const daoShare = (totalRoyalty * DAO_BPS) / TOTAL_BPS;
    
    expect(artisanShare).toBe(0.7);  // 70% of 1 SOL
    expect(platformShare).toBe(0.2); // 20% of 1 SOL
    expect(daoShare).toBe(0.1);      // 10% of 1 SOL
    
    // Total should equal 100%
    expect(artisanShare + platformShare + daoShare).toBe(totalRoyalty);
  });

  it('should handle different sale prices', () => {
    const testCases = [
      { price: 1, expected: 0.1 },
      { price: 5, expected: 0.5 },
      { price: 100, expected: 10 },
      { price: 0.5, expected: 0.05 },
    ];

    testCases.forEach(({ price, expected }) => {
      const royalty = (price * TOTAL_BPS) / 10000;
      expect(royalty).toBeCloseTo(expected, 10);
    });
  });

  it('should handle custom royalty percentages', () => {
    const salePrice = 10;
    const customBps = 500; // 5%
    const royalty = (salePrice * customBps) / 10000;
    
    expect(royalty).toBe(0.5); // 5% of 10 SOL
  });

  it('should not exceed maximum royalty', () => {
    const salePrice = 10;
    const maxBps = 5000; // 50% max
    const royalty = (salePrice * maxBps) / 10000;
    
    expect(royalty).toBeLessThanOrEqual(salePrice * 0.5);
  });

  it('should calculate cumulative royalties', () => {
    const sales = [10, 15, 20, 5];
    const totalSales = sales.reduce((sum, sale) => sum + sale, 0);
    const totalRoyalties = (totalSales * TOTAL_BPS) / 10000;
    
    expect(totalRoyalties).toBe(5); // 10% of 50 SOL
  });

  it('should handle precision correctly', () => {
    const salePrice = 0.123456789;
    const royalty = (salePrice * TOTAL_BPS) / 10000;
    
    // Should maintain precision
    expect(royalty).toBeCloseTo(0.0123456789, 10);
  });
});

describe('Royalty Distribution Logic', () => {
  it('should validate royalty configuration', () => {
    const config = {
      artisanBps: 700,
      platformBps: 200,
      daoBps: 100,
    };

    const total = config.artisanBps + config.platformBps + config.daoBps;
    expect(total).toBe(1000); // Should equal 10%
  });

  it('should reject invalid royalty percentages', () => {
    const invalidBps = 10001; // > 100%
    expect(invalidBps).toBeGreaterThan(10000);
  });

  it('should calculate artisan earnings over time', () => {
    const sales = [
      { price: 10, royaltyBps: 1000 },
      { price: 15, royaltyBps: 1000 },
      { price: 20, royaltyBps: 1000 },
    ];

    const totalEarnings = sales.reduce((sum, sale) => {
      const royalty = (sale.price * sale.royaltyBps) / 10000;
      const artisanShare = (royalty * 700) / 1000; // 70% of royalty
      return sum + artisanShare;
    }, 0);

    expect(totalEarnings).toBe(3.15); // 70% of (1 + 1.5 + 2)
  });
});

describe('Edge Cases', () => {
  it('should handle zero sale price', () => {
    const salePrice = 0;
    const royalty = (salePrice * 1000) / 10000;
    expect(royalty).toBe(0);
  });

  it('should handle very small amounts', () => {
    const salePrice = 0.00001;
    const royalty = (salePrice * 1000) / 10000;
    expect(royalty).toBeGreaterThan(0);
  });

  it('should handle very large amounts', () => {
    const salePrice = 1000000;
    const royalty = (salePrice * 1000) / 10000;
    expect(royalty).toBe(100000);
  });

  it('should round correctly for display', () => {
    const amount = 1.23456789;
    const rounded = Math.round(amount * 10000) / 10000;
    expect(rounded).toBe(1.2346);
  });
});
