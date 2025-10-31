import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/database';

/**
 * Product List API
 * GET /api/products/list
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      category: searchParams.get('category') || undefined,
      region: searchParams.get('region') || undefined,
      status: (searchParams.get('status') as any) || 'listed',
      search: searchParams.get('search') || undefined,
    };

    const products = await productService.getAll(filters);

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });

  } catch (error) {
    console.error('Product list error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
