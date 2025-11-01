'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletModalContextType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const WalletModalContext = createContext<WalletModalContextType | undefined>(undefined);

export function CustomWalletModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <WalletModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </WalletModalContext.Provider>
  );
}

export function useCustomWalletModal() {
  const context = useContext(WalletModalContext);
  if (!context) {
    console.warn('useCustomWalletModal: CustomWalletModalProvider not found, using fallback');
    return {
      visible: false,
      setVisible: () => console.warn('CustomWalletModalProvider not available')
    };
  }
  return context;
}
