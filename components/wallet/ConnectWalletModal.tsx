'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { X, ChevronRight } from 'lucide-react';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const { select, wallets, connected, connecting, connect } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  useEffect(() => {
    if (connected) {
      onClose();
    }
  }, [connected, onClose]);

  const handleWalletSelect = async (walletName: string) => {
    try {
      setSelectedWallet(walletName);
      
      const wallet = wallets.find(w => w.adapter.name === walletName);
      
      if (!wallet) {
        setSelectedWallet(null);
        return;
      }

      select(wallet.adapter.name);
      
      setTimeout(async () => {
        try {
          await connect();
        } catch (connectErr) {
          console.error('Connection error:', connectErr);
          setSelectedWallet(null);
        }
      }, 100);
    } catch (err) {
      console.error('Wallet selection error:', err);
      setSelectedWallet(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      {/* Backdrop with blur */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(74, 4, 4, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
      />

      {/* Modal Content - CENTERED */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '420px'
      }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            background: 'linear-gradient(135deg, #8B4513 0%, #4A0404 100%)',
            borderRadius: '20px',
            border: '2px solid #FFD700',
            padding: '32px 28px',
            boxShadow: '0 25px 80px rgba(255, 215, 0, 0.3), 0 10px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              color: '#FFD700'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFD700';
              e.currentTarget.style.color = '#4A0404';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
              e.currentTarget.style.color = '#FFD700';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
          >
            <X style={{ width: '18px', height: '18px', transition: 'all 150ms ease' }} />
          </button>

          {/* Header */}
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#FFD700',
            marginBottom: '8px',
            lineHeight: 1.2,
            textAlign: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Connect a wallet on Solana to continue
          </h2>

          {/* Wallet List */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px', 
            marginTop: '24px',
            maxHeight: '400px',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingRight: '4px'
          }}>
            {wallets.map((wallet) => {
              const installed = wallet.readyState === 'Installed';
              const isConnecting = connecting && selectedWallet === wallet.adapter.name;
              const WalletIcon = wallet.adapter.icon;

              return (
                <button
                  key={wallet.adapter.name}
                  onClick={() => installed && !isConnecting && handleWalletSelect(wallet.adapter.name)}
                  disabled={!installed || isConnecting}
                  style={{
                    width: '100%',
                    minHeight: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 16px',
                    gap: '14px',
                    backgroundColor: 'rgba(139, 69, 19, 0.7)',
                    border: '1px solid #FFD700',
                    borderRadius: '12px',
                    cursor: installed ? 'pointer' : 'not-allowed',
                    transition: 'all 200ms ease',
                    opacity: installed ? 1 : 0.5
                  }}
                  onMouseEnter={(e) => {
                    if (installed && !isConnecting) {
                      e.currentTarget.style.backgroundColor = '#FFD700';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.4)';
                      const text = e.currentTarget.querySelector('.wallet-name') as HTMLElement;
                      if (text) text.style.color = '#4A0404';
                      const badge = e.currentTarget.querySelector('.wallet-badge') as HTMLElement;
                      if (badge) badge.style.color = '#8B4513';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isConnecting) {
                      e.currentTarget.style.backgroundColor = 'rgba(139, 69, 19, 0.7)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      const text = e.currentTarget.querySelector('.wallet-name') as HTMLElement;
                      if (text) text.style.color = '#FFFFFF';
                      const badge = e.currentTarget.querySelector('.wallet-badge') as HTMLElement;
                      if (badge) badge.style.color = installed ? '#10B981' : '#9CA3AF';
                    }
                  }}
                >
                  {/* Wallet Icon */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    flexShrink: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={WalletIcon}
                      alt={`${wallet.adapter.name} Wallet`}
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Wallet Info */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '4px'
                  }}>
                    <span 
                      className="wallet-name"
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#FFFFFF',
                        lineHeight: 1,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        transition: 'color 200ms ease'
                      }}
                    >
                      {wallet.adapter.name}
                    </span>

                    <span 
                      className="wallet-badge"
                      style={{
                        fontSize: '13px',
                        color: installed ? '#10B981' : '#9CA3AF',
                        lineHeight: 1,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        transition: 'color 200ms ease'
                      }}
                    >
                      {installed ? 'Detected' : 'Not Installed'}
                    </span>
                  </div>

                  {/* Arrow or Spinner */}
                  {installed && (
                    isConnecting ? (
                      <div style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid rgba(255, 215, 0, 0.3)',
                        borderTopColor: '#FFD700',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        flexShrink: 0
                      }} />
                    ) : (
                      <ChevronRight 
                        style={{ 
                          width: '18px', 
                          height: '18px', 
                          color: '#FFD700',
                          transition: 'all 180ms ease',
                          flexShrink: 0
                        }} 
                      />
                    )
                  )}
                </button>
              );
            })}
          </div>

          {/* Spinner animation */}
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            
            /* Custom scrollbar */
            div::-webkit-scrollbar {
              width: 8px;
            }
            
            div::-webkit-scrollbar-track {
              background: rgba(255, 215, 0, 0.1);
              border-radius: 4px;
            }
            
            div::-webkit-scrollbar-thumb {
              background: #FFD700;
              border-radius: 4px;
            }
            
            div::-webkit-scrollbar-thumb:hover {
              background: #FFC700;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
