import { NextRequest, NextResponse } from 'next/server';
import { transactionService, adminService } from '@/services/database';

/**
 * Analytics Dashboard API
 * GET /api/analytics/dashboard
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const artisanId = searchParams.get('artisan_id') || undefined;

    // Get platform statistics
    const stats = await adminService.getStatistics();

    // Get transaction analytics
    const analytics = await transactionService.getAnalytics(artisanId);

    return NextResponse.json({
      success: true,
      data: {
        platform: stats,
        transactions: analytics,
      },
    });

  } catch (error) {
    console.error('Analytics fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
