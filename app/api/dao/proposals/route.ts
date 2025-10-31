import { NextRequest, NextResponse } from 'next/server';
import { daoService } from '@/services/database';
import { z } from 'zod';

/**
 * DAO Proposals API
 * GET /api/dao/proposals - List all proposals
 * POST /api/dao/proposals - Create new proposal
 */

const createProposalSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(5000),
  proposal_type: z.enum(['funding', 'partnership', 'policy']),
  created_by: z.string().min(32).max(44),
  ends_at: z.string().datetime(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const proposals = status === 'active'
      ? await daoService.getActiveProposals()
      : await daoService.getAllProposals();

    return NextResponse.json({
      success: true,
      data: proposals,
      count: proposals.length,
    });

  } catch (error) {
    console.error('Proposals fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch proposals' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = createProposalSchema.parse(body);

    // Create proposal
    const proposal = await daoService.createProposal({
      ...validatedData,
      status: 'active',
    });

    return NextResponse.json({
      success: true,
      data: proposal,
      message: 'Proposal created successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Proposal creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create proposal' },
      { status: 500 }
    );
  }
}
