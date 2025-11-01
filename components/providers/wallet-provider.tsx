'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { RPC_ENDPOINT, SOLANA_NETWORK } from '@/lib/solana-config';
import { CustomWalletModalProvider, useCustomWalletModal } from '@/hooks/useCustomWalletModal';
import { ConnectWalletModal } from '@/components/wallet/ConnectWalletModal';

/**
 * Wallet Modal Wrapper - renders the custom modal
 */
function WalletModalWrapper() {
  const { visible, setVisible } = useCustomWalletModal();
  
  return (
    <ConnectWalletModal 
      isOpen={visible} 
      onClose={() => setVisible(false)} 
    />
  );
}

/**
 * Solana Wallet Provider
 * Wraps the application with wallet connection functionality
 */
export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  // Configure supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: SOLANA_NETWORK }),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <CustomWalletModalProvider>
          {children}
          <WalletModalWrapper />
        </CustomWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

/**
 * Error Boundary for Wallet Operations
 */
export function WalletErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
