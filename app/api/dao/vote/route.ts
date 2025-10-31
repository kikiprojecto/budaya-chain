import { NextRequest, NextResponse } from 'next/server';
import { daoService } from '@/services/database';
import { z } from 'zod';

/**
 * DAO Vote API
 * POST /api/dao/vote
 */

const voteSchema = z.object({
  proposal_id: z.string().uuid(),
  voter_wallet: z.string().min(32).max(44),
  vote: z.enum(['for', 'against']),
  weight: z.number().positive().default(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = voteSchema.parse(body);

    // Check if user has already voted
    const hasVoted = await daoService.hasVoted(
      validatedData.proposal_id,
      validatedData.voter_wallet
    );

    if (hasVoted) {
      return NextResponse.json(
        { error: 'You have already voted on this proposal' },
        { status: 400 }
      );
    }

    // Record vote
    const result = await daoService.vote(
      validatedData.proposal_id,
      validatedData.voter_wallet,
      validatedData.vote,
      validatedData.weight
    );

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Vote recorded successfully',
    });

  } catch (error) {
    console.error('Vote error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to record vote' },
      { status: 500 }
    );
  }
}
