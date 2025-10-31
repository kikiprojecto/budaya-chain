import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/database';
import { z } from 'zod';

/**
 * Product Creation API
 * POST /api/products/create
 */

const createProductSchema = z.object({
  artisan_id: z.string().uuid(),
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  images: z.array(z.string()).min(1).max(10),
  price: z.number().positive(),
  royalty_bps: z.number().min(0).max(5000), // Max 50%
  category: z.string().min(2).max(50),
  region: z.string().min(2).max(100),
  nft_address: z.string().optional(),
  status: z.enum(['draft', 'minting', 'listed', 'sold']).default('draft'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = createProductSchema.parse(body);

    // Create product
    const product = await productService.create(validatedData);

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Product creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
