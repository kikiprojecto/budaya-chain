import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';

/**
 * Wallet Configuration
 * Configures supported wallet adapters for the application
 */
export function useWalletAdapters(network: WalletAdapterNetwork) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  );

  return wallets;
}

/**
 * Wallet connection error messages
 */
export const WALLET_ERRORS = {
  NOT_CONNECTED: 'Wallet not connected. Please connect your wallet first.',
  INSUFFICIENT_FUNDS: 'Insufficient SOL balance for this transaction.',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  USER_REJECTED: 'Transaction was rejected by user.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
} as const;

/**
 * Get user-friendly error message
 */
export function getWalletErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('user rejected')) {
      return WALLET_ERRORS.USER_REJECTED;
    }
    if (message.includes('insufficient')) {
      return WALLET_ERRORS.INSUFFICIENT_FUNDS;
    }
    if (message.includes('network') || message.includes('timeout')) {
      return WALLET_ERRORS.NETWORK_ERROR;
    }
    if (message.includes('not connected')) {
      return WALLET_ERRORS.NOT_CONNECTED;
    }
    
    return error.message;
  }
  
  return WALLET_ERRORS.UNKNOWN_ERROR;
}
