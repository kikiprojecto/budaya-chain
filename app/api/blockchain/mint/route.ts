import { NextRequest, NextResponse } from 'next/server';
import { 
  createUmiInstance, 
  mintProductNFT, 
  NFTMetadata,
  uploadImage 
} from '@/lib/umi-nft';
import { keypairIdentity } from '@metaplex-foundation/umi';

/**
 * POST /api/blockchain/mint
 * Mint a new NFT for a product using Umi framework
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      imageUrl,
      category,
      region,
      artisanName,
      artisanWallet,
      royaltyPercentage,
      attributes,
    } = body;

    // Validate required fields
    if (!title || !description || !imageUrl || !artisanWallet || royaltyPercentage === undefined) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: title, description, imageUrl, artisanWallet, royaltyPercentage' 
        },
        { status: 400 }
      );
    }

    // Validate royalty percentage (0-50%)
    if (royaltyPercentage < 0 || royaltyPercentage > 50) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Royalty percentage must be between 0 and 50' 
        },
        { status: 400 }
      );
    }

    // Prepare NFT metadata
    const metadata: NFTMetadata = {
      name: title,
      description: description,
      image: imageUrl,
      attributes: attributes || [
        { trait_type: 'Category', value: category },
        { trait_type: 'Region', value: region },
        { trait_type: 'Artisan', value: artisanName },
      ],
      properties: {
        category: category || 'Cultural Heritage',
        creators: [
          {
            address: artisanWallet,
            share: 100,
          },
        ],
      },
    };

    // Initialize Umi
    const umi = createUmiInstance();

    // Note: In production, you would use the wallet adapter to sign
    // For server-side minting, you need a keypair with SOL for fees
    // This is a preparation endpoint - actual minting happens client-side
    
    return NextResponse.json({
      success: true,
      data: {
        metadata,
        royaltyPercentage,
        message: 'Metadata prepared. Use client-side wallet to mint NFT.',
        instructions: 'Call mintProductNFT from the frontend with connected wallet',
      },
    });

  } catch (error: any) {
    console.error('Mint API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to prepare NFT mint' 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/blockchain/mint
 * Get minting status and requirements
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    data: {
      network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet',
      rpcEndpoint: process.env.NEXT_PUBLIC_SOLANA_RPC_HOST,
      requirements: {
        walletConnected: true,
        minimumSOL: 0.01,
        royaltyRange: '0-50%',
      },
      instructions: [
        '1. Connect your Solana wallet (Phantom/Solflare)',
        '2. Ensure wallet has at least 0.01 SOL for transaction fees',
        '3. Prepare product metadata (title, description, image)',
        '4. Call mint endpoint with product details',
        '5. Sign transaction in wallet',
        '6. Wait for confirmation',
        '7. NFT mint address will be returned',
      ],
    },
  });
}
