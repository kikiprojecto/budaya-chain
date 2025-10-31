import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionConfig, clusterApiUrl } from '@solana/web3.js';

/**
 * Solana Network Configuration
 * Using Devnet for development and testing
 */
export const SOLANA_NETWORK = WalletAdapterNetwork.Devnet;

/**
 * RPC Endpoint Configuration
 * Using Devnet cluster for testing
 */
export const RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);

/**
 * Connection Configuration
 * Optimized for reliability and performance
 */
export const CONNECTION_CONFIG: ConnectionConfig = {
  commitment: 'confirmed',
  confirmTransactionInitialTimeout: 60000,
};

/**
 * Program IDs and Constants
 */
export const BUDAYA_CHAIN_PROGRAM_ID = process.env.NEXT_PUBLIC_PROGRAM_ID || '';

/**
 * Transaction Configuration
 */
export const TX_CONFIG = {
  maxRetries: 3,
  skipPreflight: false,
  preflightCommitment: 'confirmed' as const,
};

/**
 * Error Handler Wrapper
 * Provides consistent error handling for Solana operations
 */
export class SolanaError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'SolanaError';
  }
}

/**
 * Async operation wrapper with error handling
 */
export async function withErrorHandler<T>(
  operation: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw new SolanaError(
      errorMessage,
      error instanceof Error ? error.name : 'UNKNOWN_ERROR',
      error
    );
  }
}

/**
 * Format SOL amount from lamports
 */
export function lamportsToSol(lamports: number): number {
  return lamports / 1_000_000_000;
}

/**
 * Format lamports from SOL amount
 */
export function solToLamports(sol: number): number {
  return Math.floor(sol * 1_000_000_000);
}

/**
 * Truncate wallet address for display
 */
export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Validate Solana address
 */
export function isValidSolanaAddress(address: string): boolean {
  try {
    // Solana addresses are base58 encoded and 32-44 characters
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  } catch {
    return false;
  }
}
