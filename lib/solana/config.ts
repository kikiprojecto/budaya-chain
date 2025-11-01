import { clusterApiUrl } from '@solana/web3.js';

export type Cluster = 'devnet' | 'testnet' | 'mainnet-beta';

export const SOLANA_NETWORK = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster) || 'devnet';

export const SOLANA_RPC_HOST = 
  process.env.NEXT_PUBLIC_SOLANA_RPC_HOST || 
  clusterApiUrl(SOLANA_NETWORK);

export const COMMITMENT = 'confirmed';

export const EXPLORER_URL = {
  devnet: 'https://explorer.solana.com',
  testnet: 'https://explorer.solana.com',
  'mainnet-beta': 'https://explorer.solana.com',
};

export function getExplorerUrl(signature: string, cluster: Cluster = SOLANA_NETWORK) {
  return `${EXPLORER_URL[cluster]}/tx/${signature}?cluster=${cluster}`;
}
