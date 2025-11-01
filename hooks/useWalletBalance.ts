import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export function useWalletBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!publicKey) {
      setBalance(0);
      return;
    }

    setLoading(true);
    connection
      .getBalance(publicKey)
      .then((bal) => setBalance(bal / LAMPORTS_PER_SOL))
      .catch((err) => console.error('Error fetching balance:', err))
      .finally(() => setLoading(false));
  }, [publicKey, connection]);

  return { balance, loading };
}
