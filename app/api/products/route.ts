import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/products
 * Fetch all products with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const region = searchParams.get('region');
    const artisan_id = searchParams.get('artisan_id');

    let query = supabase.from('products').select('*, artisans(*)');

    if (status) {
      query = query.eq('status', status);
    }
    if (category) {
      query = query.eq('category', category);
    }
    if (region) {
      query = query.eq('region', region);
    }
    if (artisan_id) {
      query = query.eq('artisan_id', artisan_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ products: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      artisan_id,
      title,
      description,
      images,
      price,
      royalty_bps,
      category,
      region,
      nft_address,
    } = body;

    // Validate required fields
    if (!artisan_id || !title || !description || !images || !price || royalty_bps === undefined || !category || !region) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate royalty_bps range (0-5000 = 0-50%)
    if (royalty_bps < 0 || royalty_bps > 5000) {
      return NextResponse.json(
        { error: 'Royalty must be between 0 and 5000 basis points (0-50%)' },
        { status: 400 }
      );
    }

    // Create new product
    const { data, error } = await supabase
      .from('products')
      .insert({
        artisan_id,
        title,
        description,
        images,
        price,
        royalty_bps,
        category,
        region,
        nft_address,
        status: nft_address ? 'listed' : 'draft',
      })
      .select('*, artisans(*)')
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
