import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { createNFT, NFTMetadataInput, fetchNFTMetadata } from '@/lib/metaplex-nft';
import { 
  createTransferWithRoyalty, 
  getArtisanEarnings as getArtisanEarningsOnChain, 
  verifyNFTAuthenticity,
  registerArtisan 
} from '@/lib/program/budaya-chain';
import { distributeRoyalties, getRoyaltyHistory } from '@/lib/royalty-engine';
import { RPC_ENDPOINT, CONNECTION_CONFIG, solToLamports } from '@/lib/solana-config';

/**
 * Blockchain Service
 * High-level API for blockchain operations
 */

/**
 * Product data for NFT minting
 */
export interface ProductData {
  title: string;
  description: string;
  image: File;
  category: string;
  region: string;
  price: number;
  royaltyPercentage: number;
  artisanWallet: string;
  artisanName: string;
}

/**
 * Purchase data
 */
export interface PurchaseData {
  nftAddress: string;
  price: number;
  buyerWallet: PublicKey;
  sellerWallet: PublicKey;
  artisanWallet: PublicKey;
}

/**
 * Initialize connection
 */
export function getConnection(): Connection {
  return new Connection(RPC_ENDPOINT, CONNECTION_CONFIG);
}

/**
 * Mint a product NFT
 */
export async function mintProductNFT(
  productData: ProductData,
  payerKeypair: Keypair
): Promise<{
  success: boolean;
  mintAddress?: string;
  metadataUri?: string;
  transactionSignature?: string;
  error?: string;
}> {
  try {
    const connection = getConnection();

    // Prepare NFT metadata
    const metadata: NFTMetadataInput = {
      name: productData.title,
      symbol: 'BDYA',
      description: productData.description,
      image: productData.image,
      attributes: [
        { trait_type: 'Category', value: productData.category },
        { trait_type: 'Region', value: productData.region },
        { trait_type: 'Artisan', value: productData.artisanName },
        { trait_type: 'Price', value: productData.price },
      ],
      properties: {
        category: productData.category,
        creators: [
          {
            address: productData.artisanWallet,
            share: 100,
          },
        ],
      },
      sellerFeeBasisPoints: productData.royaltyPercentage * 100, // Convert percentage to basis points
    };

    // Create NFT
    const result = await createNFT(connection, payerKeypair, metadata);

    return {
      success: true,
      mintAddress: result.mintAddress,
      metadataUri: result.metadataUri,
      transactionSignature: result.transactionSignature,
    };
  } catch (error) {
    console.error('Error minting product NFT:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mint NFT',
    };
  }
}

/**
 * Verify product authenticity on-chain
 */
export async function verifyProductOnChain(
  nftAddress: string
): Promise<{
  isAuthentic: boolean;
  artisan?: string;
  metadata?: any;
  error?: string;
}> {
  try {
    const connection = getConnection();
    const mintPublicKey = new PublicKey(nftAddress);

    // Verify NFT authenticity
    const verification = await verifyNFTAuthenticity(connection, mintPublicKey);

    if (!verification.isAuthentic) {
      return {
        isAuthentic: false,
        error: 'NFT is not authentic or not minted through Budaya Chain',
      };
    }

    // Fetch metadata
    const metadata = await fetchNFTMetadata(connection, nftAddress);

    return {
      isAuthentic: true,
      artisan: verification.artisan?.toBase58(),
      metadata,
    };
  } catch (error) {
    console.error('Error verifying product:', error);
    return {
      isAuthentic: false,
      error: error instanceof Error ? error.message : 'Verification failed',
    };
  }
}

/**
 * Purchase product with royalty distribution
 */
export async function purchaseWithRoyalty(
  purchaseData: PurchaseData,
  buyerKeypair: Keypair
): Promise<{
  success: boolean;
  transactionSignature?: string;
  royaltyDistribution?: any;
  error?: string;
}> {
  try {
    const connection = getConnection();
    const priceLamports = solToLamports(purchaseData.price);

    // Create transfer transaction with royalty
    const transaction = await createTransferWithRoyalty(
      connection,
      new PublicKey(purchaseData.nftAddress),
      purchaseData.buyerWallet,
      purchaseData.sellerWallet,
      purchaseData.artisanWallet,
      priceLamports
    );

    // Sign and send transaction
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = buyerKeypair.publicKey;
    transaction.sign(buyerKeypair);

    const signature = await connection.sendRawTransaction(transaction.serialize());
    await connection.confirmTransaction(signature);

    // Record royalty distribution
    const royaltyDistribution = await distributeRoyalties(
      signature,
      purchaseData.nftAddress,
      priceLamports,
      purchaseData.artisanWallet.toBase58()
    );

    return {
      success: true,
      transactionSignature: signature,
      royaltyDistribution,
    };
  } catch (error) {
    console.error('Error processing purchase:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Purchase failed',
    };
  }
}

/**
 * Get artisan earnings and statistics
 */
export async function getArtisanEarnings(
  walletAddress: string
): Promise<{
  totalEarnings: number;
  onChainEarnings: number;
  royaltyHistory: any[];
  error?: string;
}> {
  try {
    const connection = getConnection();
    const publicKey = new PublicKey(walletAddress);

    // Get on-chain earnings
    const onChainEarnings = await getArtisanEarningsOnChain(connection, publicKey);

    // Get royalty history
    const royaltyHistory = await getRoyaltyHistory(walletAddress);

    // Calculate total from history
    const totalEarnings = royaltyHistory.reduce(
      (sum, tx) => sum + tx.artisanAmount,
      0
    );

    return {
      totalEarnings,
      onChainEarnings,
      royaltyHistory,
    };
  } catch (error) {
    console.error('Error fetching artisan earnings:', error);
    return {
      totalEarnings: 0,
      onChainEarnings: 0,
      royaltyHistory: [],
      error: error instanceof Error ? error.message : 'Failed to fetch earnings',
    };
  }
}

/**
 * Register artisan on blockchain
 */
export async function registerArtisanOnChain(
  name: string,
  category: string,
  walletAddress: string,
  payerKeypair: Keypair
): Promise<{
  success: boolean;
  transactionSignature?: string;
  error?: string;
}> {
  try {
    const connection = getConnection();
    const artisanPublicKey = new PublicKey(walletAddress);

    // Create registration transaction
    const transaction = await registerArtisan(
      connection,
      payerKeypair.publicKey,
      name,
      category,
      artisanPublicKey
    );

    // Sign and send
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payerKeypair.publicKey;
    transaction.sign(payerKeypair);

    const signature = await connection.sendRawTransaction(transaction.serialize());
    await connection.confirmTransaction(signature);

    return {
      success: true,
      transactionSignature: signature,
    };
  } catch (error) {
    console.error('Error registering artisan:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed',
    };
  }
}

/**
 * Get NFT metadata
 */
export async function getNFTMetadata(
  nftAddress: string
): Promise<{
  success: boolean;
  metadata?: any;
  error?: string;
}> {
  try {
    const connection = getConnection();
    const metadata = await fetchNFTMetadata(connection, nftAddress);

    return {
      success: true,
      metadata,
    };
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch metadata',
    };
  }
}

/**
 * Check wallet balance
 */
export async function getWalletBalance(
  walletAddress: string
): Promise<{
  balance: number;
  error?: string;
}> {
  try {
    const connection = getConnection();
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);

    return {
      balance: balance / 1_000_000_000, // Convert lamports to SOL
    };
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return {
      balance: 0,
      error: error instanceof Error ? error.message : 'Failed to fetch balance',
    };
  }
}
