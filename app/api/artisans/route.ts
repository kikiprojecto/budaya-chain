import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/artisans
 * Fetch all artisans with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const verified = searchParams.get('verified');
    const region = searchParams.get('region');
    const category = searchParams.get('category');

    let query = supabase.from('artisans').select('*');

    if (verified !== null) {
      query = query.eq('verified', verified === 'true');
    }
    if (region) {
      query = query.eq('region', region);
    }
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching artisans:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ artisans: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/artisans
 * Create a new artisan registration
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      wallet_address,
      name,
      category,
      region,
      bio,
      portfolio_images,
    } = body;

    // Validate required fields
    if (!wallet_address || !name || !category || !region) {
      return NextResponse.json(
        { error: 'Missing required fields: wallet_address, name, category, region' },
        { status: 400 }
      );
    }

    // Check if artisan already exists
    const { data: existing } = await supabase
      .from('artisans')
      .select('id')
      .eq('wallet_address', wallet_address)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Artisan with this wallet address already exists' },
        { status: 409 }
      );
    }

    // Create new artisan
    const { data, error } = await supabase
      .from('artisans')
      .insert({
        wallet_address,
        name,
        category,
        region,
        bio,
        portfolio_images,
        verified: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating artisan:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ artisan: data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
