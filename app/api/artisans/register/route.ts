import { NextRequest, NextResponse } from 'next/server';
import { artisanService } from '@/services/database';
import { z } from 'zod';

/**
 * Artisan Registration API
 * POST /api/artisans/register
 */

const registerSchema = z.object({
  wallet_address: z.string().min(32).max(44),
  name: z.string().min(2).max(100),
  category: z.string().min(2).max(50),
  region: z.string().min(2).max(100),
  bio: z.string().optional(),
  portfolio_images: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if artisan already exists
    const existing = await artisanService.getByWallet(validatedData.wallet_address);
    if (existing) {
      return NextResponse.json(
        { error: 'Artisan with this wallet address already registered' },
        { status: 400 }
      );
    }

    // Register artisan
    const artisan = await artisanService.register(validatedData);

    return NextResponse.json({
      success: true,
      data: artisan,
      message: 'Artisan registered successfully. Awaiting verification.',
    }, { status: 201 });

  } catch (error) {
    console.error('Artisan registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to register artisan' },
      { status: 500 }
    );
  }
}
