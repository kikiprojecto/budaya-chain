import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { RPC_ENDPOINT } from '@/lib/solana-config';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/blockchain/verify?nft=<address>
 * Verify NFT authenticity and get product details
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const nftAddress = searchParams.get('nft');

    if (!nftAddress) {
      return NextResponse.json(
        { error: 'NFT address is required' },
        { status: 400 }
      );
    }

    // Validate address format
    try {
      new PublicKey(nftAddress);
    } catch {
      return NextResponse.json(
        { error: 'Invalid NFT address format' },
        { status: 400 }
      );
    }

    // Check if NFT exists in database
    const { data: product, error } = await supabase
      .from('products')
      .select('*, artisans(*)')
      .eq('nft_address', nftAddress)
      .single();

    if (error || !product) {
      return NextResponse.json(
        { 
          verified: false,
          error: 'NFT not found in Budaya Chain registry' 
        },
        { status: 404 }
      );
    }

    // Verify on Solana blockchain
    const connection = new Connection(RPC_ENDPOINT);
    let onChainVerified = false;
    
    try {
      const accountInfo = await connection.getAccountInfo(new PublicKey(nftAddress));
      onChainVerified = accountInfo !== null;
    } catch (error) {
      console.error('Blockchain verification error:', error);
    }

    return NextResponse.json({
      verified: true,
      onChainVerified,
      product: {
        id: product.id,
        title: product.title,
        description: product.description,
        images: product.images,
        category: product.category,
        region: product.region,
        price: product.price,
        royalty_bps: product.royalty_bps,
        nft_address: product.nft_address,
        created_at: product.created_at,
      },
      artisan: {
        id: product.artisans.id,
        name: product.artisans.name,
        wallet_address: product.artisans.wallet_address,
        verified: product.artisans.verified,
        region: product.artisans.region,
        category: product.artisans.category,
      },
    });

  } catch (error) {
    console.error('Verify API error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
