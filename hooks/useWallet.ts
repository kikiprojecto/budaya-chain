import { useWallet as useWalletAdapter } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { useCallback, useEffect, useState } from 'react';
import { RPC_ENDPOINT, CONNECTION_CONFIG, lamportsToSol, withErrorHandler } from '@/lib/solana-config';

/**
 * Custom Wallet Hook
 * Provides wallet state, balance, and transaction helpers
 */
export function useWallet() {
  const wallet = useWalletAdapter();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [connection] = useState(() => new Connection(RPC_ENDPOINT, CONNECTION_CONFIG));

  /**
   * Fetch wallet balance
   */
  const fetchBalance = useCallback(async () => {
    if (!wallet.publicKey) {
      setBalance(null);
      return;
    }

    setIsLoadingBalance(true);
    try {
      const lamports = await withErrorHandler(
        () => connection.getBalance(wallet.publicKey!),
        'Failed to fetch balance'
      );
      setBalance(lamportsToSol(lamports));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
    } finally {
      setIsLoadingBalance(false);
    }
  }, [wallet.publicKey, connection]);

  /**
   * Auto-fetch balance when wallet connects
   */
  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [wallet.connected, wallet.publicKey, fetchBalance]);

  /**
   * Sign and send transaction
   */
  const signAndSendTransaction = useCallback(
    async (transaction: Transaction): Promise<TransactionSignature> => {
      if (!wallet.publicKey || !wallet.signTransaction) {
        throw new Error('Wallet not connected');
      }

      return withErrorHandler(async () => {
        // Get recent blockhash
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = wallet.publicKey!;

        // Sign transaction
        const signed = await wallet.signTransaction!(transaction);

        // Send transaction
        const signature = await connection.sendRawTransaction(signed.serialize(), {
          skipPreflight: false,
          preflightCommitment: 'confirmed',
        });

        // Confirm transaction
        await connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight,
        });

        // Refresh balance after transaction
        await fetchBalance();

        return signature;
      }, 'Failed to sign and send transaction');
    },
    [wallet, connection, fetchBalance]
  );

  /**
   * Request airdrop (Devnet only)
   */
  const requestAirdrop = useCallback(
    async (amount: number = 1): Promise<TransactionSignature> => {
      if (!wallet.publicKey) {
        throw new Error('Wallet not connected');
      }

      return withErrorHandler(async () => {
        const signature = await connection.requestAirdrop(
          wallet.publicKey!,
          amount * 1_000_000_000 // Convert SOL to lamports
        );

        await connection.confirmTransaction(signature);
        await fetchBalance();

        return signature;
      }, 'Failed to request airdrop');
    },
    [wallet.publicKey, connection, fetchBalance]
  );

  return {
    // Wallet adapter properties
    wallet: wallet.wallet,
    publicKey: wallet.publicKey,
    connected: wallet.connected,
    connecting: wallet.connecting,
    disconnecting: wallet.disconnecting,
    
    // Wallet adapter methods
    connect: wallet.connect,
    disconnect: wallet.disconnect,
    select: wallet.select,
    
    // Custom properties
    balance,
    isLoadingBalance,
    connection,
    
    // Custom methods
    fetchBalance,
    signAndSendTransaction,
    requestAirdrop,
  };
}

/**
 * Hook to get wallet address as string
 */
export function useWalletAddress(): string | null {
  const { publicKey } = useWallet();
  return publicKey?.toBase58() || null;
}

/**
 * Hook to check if wallet is ready for transactions
 */
export function useWalletReady(): boolean {
  const { connected, publicKey, balance } = useWallet();
  return connected && !!publicKey && (balance !== null && balance > 0);
}
