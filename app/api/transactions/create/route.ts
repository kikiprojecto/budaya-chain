import { NextRequest, NextResponse } from 'next/server';
import { transactionService } from '@/services/database';
import { z } from 'zod';

/**
 * Transaction Creation API
 * POST /api/transactions/create
 */

const createTransactionSchema = z.object({
  product_id: z.string().uuid(),
  buyer_wallet: z.string().min(32).max(44),
  seller_wallet: z.string().min(32).max(44),
  amount: z.number().positive(),
  royalty_paid: z.number().min(0),
  tx_signature: z.string().min(64).max(128),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = createTransactionSchema.parse(body);

    // Create transaction record
    const transaction = await transactionService.create({
      ...validatedData,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: transaction,
      message: 'Transaction recorded successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Transaction creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to record transaction' },
      { status: 500 }
    );
  }
}
