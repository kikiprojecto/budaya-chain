import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { 
  createNft, 
  mplTokenMetadata 
} from '@metaplex-foundation/mpl-token-metadata';
import { 
  generateSigner, 
  percentAmount,
  publicKey as umiPublicKey,
  TransactionBuilder
} from '@metaplex-foundation/umi';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';

/**
 * Complete NFT Minting Hook using Umi Framework
 * This provides actual on-chain NFT minting with wallet signing
 */

export interface MintNFTParams {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  region: string;
  artisanName: string;
  royaltyPercentage: number;
}

export interface MintResult {
  success: boolean;
  mintAddress?: string;
  signature?: string;
  metadataUri?: string;
  explorerUrl?: string;
  error?: string;
}

export function useUmiMinting() {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string>('');

  /**
   * Complete NFT minting with Umi
   * This actually creates the NFT on-chain
   */
  const mintNFT = async (params: MintNFTParams): Promise<MintResult> => {
    if (!publicKey) {
      return {
        success: false,
        error: 'Wallet not connected',
      };
    }

    if (!signTransaction || !signAllTransactions) {
      return {
        success: false,
        error: 'Wallet does not support signing',
      };
    }

    setLoading(true);
    setProgress('Initializing...');

    try {
      // Step 1: Initialize Umi with wallet adapter
      setProgress('Connecting to Solana...');
      const umi = createUmi(connection.rpcEndpoint)
        .use(mplTokenMetadata())
        .use(walletAdapterIdentity({ 
          publicKey, 
          signTransaction, 
          signAllTransactions 
        }))
        .use(irysUploader());

      console.log('Umi initialized with wallet:', publicKey.toBase58());

      // Step 2: Prepare metadata
      setProgress('Preparing metadata...');
      const metadata = {
        name: params.title,
        description: params.description,
        image: params.imageUrl,
        attributes: [
          { trait_type: 'Category', value: params.category },
          { trait_type: 'Region', value: params.region },
          { trait_type: 'Artisan', value: params.artisanName },
        ],
        properties: {
          category: params.category,
          files: [
            {
              uri: params.imageUrl,
              type: 'image/jpeg',
            },
          ],
        },
      };

      // Step 3: Upload metadata to Arweave
      setProgress('Uploading metadata to Arweave...');
      const metadataUri = await umi.uploader.uploadJson(metadata);
      console.log('Metadata uploaded:', metadataUri);

      // Step 4: Generate mint address
      setProgress('Generating NFT address...');
      const mint = generateSigner(umi);
      console.log('Mint address:', mint.publicKey);

      // Step 5: Create NFT on-chain
      setProgress('Creating NFT on blockchain...');
      const createNftBuilder = createNft(umi, {
        mint,
        name: params.title,
        uri: metadataUri,
        sellerFeeBasisPoints: percentAmount(params.royaltyPercentage, 2),
        creators: [
          {
            address: umi.identity.publicKey,
            verified: true,
            share: 100,
          },
        ],
      });

      // Step 6: Send and confirm transaction
      setProgress('Waiting for wallet signature...');
      const result = await createNftBuilder.sendAndConfirm(umi, {
        confirm: { commitment: 'confirmed' },
      });

      console.log('NFT created successfully!');
      console.log('Signature:', result.signature);

      const mintAddress = mint.publicKey.toString();
      const signature = Buffer.from(result.signature).toString('base64');
      const explorerUrl = `https://explorer.solana.com/address/${mintAddress}?cluster=devnet`;

      setProgress('Complete!');

      return {
        success: true,
        mintAddress,
        signature,
        metadataUri,
        explorerUrl,
      };

    } catch (error: any) {
      console.error('Minting error:', error);
      setProgress('');
      
      return {
        success: false,
        error: error.message || 'Failed to mint NFT',
      };
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(''), 2000);
    }
  };

  /**
   * Estimate minting cost
   */
  const estimateCost = async (): Promise<number> => {
    // Approximate cost: 0.01 SOL for NFT creation + 0.001 for metadata
    return 0.011;
  };

  return {
    mintNFT,
    estimateCost,
    loading,
    progress,
  };
}
