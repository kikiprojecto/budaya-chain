'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Copy, ExternalLink, LogOut, Wallet, ChevronDown } from 'lucide-react';
import { truncateAddress } from '@/lib/solana-config';
import { useCustomWalletModal } from '@/hooks/useCustomWalletModal';

interface WalletButtonProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function WalletButton({ 
  className = '', 
  variant = 'default',
}: WalletButtonProps) {
  const { publicKey, disconnect, connecting, connected } = useWallet();
  const { setVisible } = useCustomWalletModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wallet-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey.toBase58());
      } catch (error) {
        console.error('Failed to copy address:', error);
      }
    }
  };

  const handleViewExplorer = () => {
    if (publicKey) {
      const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
      window.open(
        `https://explorer.solana.com/address/${publicKey.toBase58()}?cluster=${network}`,
        '_blank'
      );
    }
  };

  if (!mounted) {
    return (
      <div className={`h-10 w-40 bg-muted/50 animate-pulse rounded-lg ${className}`} />
    );
  }

  if (!connected) {
    return (
      <button
        onClick={handleConnect}
        disabled={connecting}
        className={`
          flex items-center gap-2 px-6 py-2.5 rounded-lg
          font-semibold text-sm text-white
          bg-gradient-to-r from-[#8B4513] to-[#FFD700]
          hover:opacity-90 hover:scale-[1.02]
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-300
          shadow-lg shadow-[#8B4513]/30
          ${className}
        `}
      >
        <Wallet className="w-5 h-5" />
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className={`relative wallet-dropdown ${className}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-lg
          bg-gradient-to-r from-[#8B4513]/10 to-[#FFD700]/10
          border border-[#FFD700]/30
          hover:border-[#FFD700]/60 hover:scale-[1.02]
          transition-all duration-300
          ${variant === 'compact' ? 'gap-2 px-3 py-2' : ''}
        `}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
          <span className="font-mono font-medium text-sm">
            {truncateAddress(publicKey!.toBase58())}
          </span>
        </div>
        
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-[#FFD700]/30 rounded-xl overflow-hidden shadow-2xl shadow-[#8B4513]/20 z-50">
          <div className="p-4 border-b border-[#FFD700]/20 bg-gradient-to-r from-[#8B4513]/5 to-[#FFD700]/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Network</span>
              <span className="text-sm font-semibold text-[#FFD700]">
                {process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Address</span>
              <button
                onClick={handleCopyAddress}
                className="text-sm font-mono hover:text-[#FFD700] transition-colors"
              >
                {truncateAddress(publicKey!.toBase58(), 6)}
              </button>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={handleCopyAddress}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#8B4513]/10 transition-colors text-left"
            >
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy Address</span>
            </button>
            
            <button
              onClick={handleViewExplorer}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#8B4513]/10 transition-colors text-left"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">View on Explorer</span>
            </button>
            
            <div className="h-px bg-[#FFD700]/20 my-2" />
            
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
