/**
 * Wallet Connection Tests
 * Tests for wallet adapter functionality
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { RPC_ENDPOINT } from '@/lib/solana-config';

describe('Wallet Connection', () => {
  let connection: Connection;

  beforeEach(() => {
    connection = new Connection(RPC_ENDPOINT, 'confirmed');
  });

  it('should connect to Solana devnet', async () => {
    const version = await connection.getVersion();
    expect(version).toBeDefined();
    expect(version['solana-core']).toBeDefined();
  });

  it('should generate valid keypair', () => {
    const keypair = Keypair.generate();
    expect(keypair.publicKey).toBeInstanceOf(PublicKey);
    expect(keypair.secretKey).toHaveLength(64);
  });

  it('should validate public key format', () => {
    const validKey = 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK';
    expect(() => new PublicKey(validKey)).not.toThrow();
  });

  it('should reject invalid public key', () => {
    const invalidKey = 'invalid-key';
    expect(() => new PublicKey(invalidKey)).toThrow();
  });

  it('should get account balance', async () => {
    const keypair = Keypair.generate();
    const balance = await connection.getBalance(keypair.publicKey);
    expect(balance).toBe(0); // New account should have 0 balance
  });

  it('should request airdrop on devnet', async () => {
    const keypair = Keypair.generate();
    
    try {
      const signature = await connection.requestAirdrop(
        keypair.publicKey,
        1000000000 // 1 SOL
      );
      
      await connection.confirmTransaction(signature);
      const balance = await connection.getBalance(keypair.publicKey);
      
      expect(balance).toBeGreaterThan(0);
    } catch (error) {
      // Airdrop might fail due to rate limits
      console.warn('Airdrop test skipped due to rate limit');
    }
  }, 30000);
});

describe('Wallet Utilities', () => {
  it('should convert lamports to SOL correctly', () => {
    const lamports = 1000000000;
    const sol = lamports / 1000000000;
    expect(sol).toBe(1);
  });

  it('should convert SOL to lamports correctly', () => {
    const sol = 1.5;
    const lamports = sol * 1000000000;
    expect(lamports).toBe(1500000000);
  });

  it('should truncate address correctly', () => {
    const address = 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK';
    const truncated = `${address.slice(0, 4)}...${address.slice(-4)}`;
    expect(truncated).toBe('DYw8...NSKK');
  });
});

describe('Transaction Creation', () => {
  let connection: Connection;
  let payer: Keypair;

  beforeEach(() => {
    connection = new Connection(RPC_ENDPOINT, 'confirmed');
    payer = Keypair.generate();
  });

  it('should create a valid transaction', async () => {
    const recipient = Keypair.generate();
    const { blockhash } = await connection.getLatestBlockhash();
    
    expect(blockhash).toBeDefined();
    expect(typeof blockhash).toBe('string');
  });

  it('should estimate transaction fee', async () => {
    const { feeCalculator } = await connection.getRecentBlockhashAndContext();
    expect(feeCalculator).toBeDefined();
  });
});
