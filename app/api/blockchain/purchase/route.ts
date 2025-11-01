import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { transferV1, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { publicKey as umiPublicKey } from '@metaplex-foundation/umi';
import { supabase } from '@/lib/supabase';
import { SOLANA_RPC_HOST } from '@/lib/solana/config';

/**
 * POST /api/blockchain/purchase
 * Create purchase transaction with SOL payment + NFT transfer
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, buyerWallet, sellerWallet } = body;

    // Validate inputs
    if (!productId || !buyerWallet || !sellerWallet) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: productId, buyerWallet, sellerWallet' 
        },
        { status: 400 }
      );
    }

    // Get product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*, artisans(*)')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (!product.nft_address) {
      return NextResponse.json(
        { success: false, error: 'Product does not have an NFT address' },
        { status: 400 }
      );
    }

    // Calculate distribution
    const price = product.price;
    const royaltyPercentage = product.royalty_bps / 100; // Convert basis points to percentage
    const royaltyAmount = (price * royaltyPercentage) / 100;
    const sellerAmount = price - royaltyAmount;
    const creatorWallet = product.artisans.wallet_address;

    // Create Solana connection
    const connection = new Connection(SOLANA_RPC_HOST);

    // Build transaction with multiple instructions
    const transaction = new Transaction();

    // Instruction 1: Payment to seller
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(buyerWallet),
        toPubkey: new PublicKey(sellerWallet),
        lamports: Math.floor(sellerAmount * LAMPORTS_PER_SOL),
      })
    );

    // Instruction 2: Royalty to creator (if different from seller)
    if (royaltyAmount > 0 && creatorWallet !== sellerWallet) {
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(buyerWallet),
          toPubkey: new PublicKey(creatorWallet),
          lamports: Math.floor(royaltyAmount * LAMPORTS_PER_SOL),
        })
      );
    }

    // Note: NFT transfer instruction would be added here
    // For now, we'll handle NFT transfer separately on client-side
    // This requires the seller to approve the transfer

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = new PublicKey(buyerWallet);

    // Serialize transaction for client to sign
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    return NextResponse.json({
      success: true,
      data: {
        transaction: serializedTransaction.toString('base64'),
        distribution: {
          total: price,
          toSeller: sellerAmount,
          toCreator: royaltyAmount,
          royaltyPercentage: royaltyPercentage,
        },
        nftAddress: product.nft_address,
        productId: product.id,
      },
    });

  } catch (error: any) {
    console.error('Purchase API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create purchase transaction' 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/blockchain/purchase
 * Get purchase requirements
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    data: {
      requirements: {
        walletConnected: true,
        sufficientBalance: true,
        productListed: true,
      },
      flow: [
        '1. Buyer initiates purchase',
        '2. System calculates royalty distribution',
        '3. Transaction created with SOL transfers',
        '4. Buyer signs transaction',
        '5. Transaction confirmed on-chain',
        '6. NFT ownership transferred',
        '7. Product marked as sold',
        '8. Transaction recorded in database',
      ],
    },
  });
}
