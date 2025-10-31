import { transactionService, adminService, productService, artisanService } from '@/services/database';

/**
 * Analytics Engine
 * Tracks sales, growth, and generates reports
 */

export interface SalesMetrics {
  totalVolume: number;
  totalTransactions: number;
  averageTransactionValue: number;
  totalRoyalties: number;
  growthRate: number;
}

export interface ArtisanMetrics {
  totalArtisans: number;
  verifiedArtisans: number;
  newArtisansThisMonth: number;
  topArtisans: Array<{
    id: string;
    name: string;
    totalSales: number;
    totalEarnings: number;
  }>;
}

export interface RegionalMetrics {
  distribution: Array<{
    region: string;
    productCount: number;
    salesVolume: number;
    percentage: number;
  }>;
  topRegion: string;
}

export interface CategoryMetrics {
  distribution: Array<{
    category: string;
    productCount: number;
    salesVolume: number;
    percentage: number;
  }>;
  topCategory: string;
}

export interface TimeSeriesData {
  date: string;
  sales: number;
  transactions: number;
  royalties: number;
}

/**
 * Get sales metrics
 */
export async function getSalesMetrics(
  startDate?: Date,
  endDate?: Date
): Promise<SalesMetrics> {
  try {
    const analytics = await transactionService.getAnalytics();
    
    // Calculate growth rate (mock for now)
    const growthRate = 12.5; // TODO: Calculate from historical data

    return {
      totalVolume: analytics.totalSales,
      totalTransactions: analytics.transactionCount,
      averageTransactionValue: analytics.averageSale,
      totalRoyalties: analytics.totalRoyalties,
      growthRate,
    };
  } catch (error) {
    console.error('Error fetching sales metrics:', error);
    throw error;
  }
}

/**
 * Get artisan metrics
 */
export async function getArtisanMetrics(): Promise<ArtisanMetrics> {
  try {
    const stats = await adminService.getStatistics();
    
    // TODO: Calculate new artisans this month from database
    const newArtisansThisMonth = 5;

    // TODO: Get top artisans by sales
    const topArtisans = [
      { id: '1', name: 'Ibu Siti', totalSales: 25, totalEarnings: 15.5 },
      { id: '2', name: 'Pak Budi', totalSales: 18, totalEarnings: 12.3 },
      { id: '3', name: 'Ibu Ani', totalSales: 15, totalEarnings: 9.8 },
    ];

    return {
      totalArtisans: stats.totalArtisans,
      verifiedArtisans: stats.verifiedArtisans,
      newArtisansThisMonth,
      topArtisans,
    };
  } catch (error) {
    console.error('Error fetching artisan metrics:', error);
    throw error;
  }
}

/**
 * Get regional distribution
 */
export async function getRegionalMetrics(): Promise<RegionalMetrics> {
  try {
    const products = await productService.getAll({ status: 'listed' });
    
    // Group by region
    const regionMap = new Map<string, { count: number; sales: number }>();
    let totalSales = 0;

    products.forEach((product: any) => {
      const existing = regionMap.get(product.region) || { count: 0, sales: 0 };
      regionMap.set(product.region, {
        count: existing.count + 1,
        sales: existing.sales + product.price,
      });
      totalSales += product.price;
    });

    const distribution = Array.from(regionMap.entries())
      .map(([region, data]) => ({
        region,
        productCount: data.count,
        salesVolume: data.sales,
        percentage: (data.sales / totalSales) * 100,
      }))
      .sort((a, b) => b.salesVolume - a.salesVolume);

    return {
      distribution,
      topRegion: distribution[0]?.region || 'N/A',
    };
  } catch (error) {
    console.error('Error fetching regional metrics:', error);
    throw error;
  }
}

/**
 * Get category distribution
 */
export async function getCategoryMetrics(): Promise<CategoryMetrics> {
  try {
    const products = await productService.getAll({ status: 'listed' });
    
    // Group by category
    const categoryMap = new Map<string, { count: number; sales: number }>();
    let totalSales = 0;

    products.forEach((product: any) => {
      const existing = categoryMap.get(product.category) || { count: 0, sales: 0 };
      categoryMap.set(product.category, {
        count: existing.count + 1,
        sales: existing.sales + product.price,
      });
      totalSales += product.price;
    });

    const distribution = Array.from(categoryMap.entries())
      .map(([category, data]) => ({
        category,
        productCount: data.count,
        salesVolume: data.sales,
        percentage: (data.sales / totalSales) * 100,
      }))
      .sort((a, b) => b.salesVolume - a.salesVolume);

    return {
      distribution,
      topCategory: distribution[0]?.category || 'N/A',
    };
  } catch (error) {
    console.error('Error fetching category metrics:', error);
    throw error;
  }
}

/**
 * Get time series data
 */
export async function getTimeSeriesData(
  days: number = 30
): Promise<TimeSeriesData[]> {
  try {
    const transactions = await transactionService.getAll();
    
    // Group by date
    const dateMap = new Map<string, { sales: number; count: number; royalties: number }>();
    
    transactions.forEach((tx: any) => {
      const date = new Date(tx.timestamp).toISOString().split('T')[0];
      const existing = dateMap.get(date) || { sales: 0, count: 0, royalties: 0 };
      dateMap.set(date, {
        sales: existing.sales + tx.amount,
        count: existing.count + 1,
        royalties: existing.royalties + tx.royalty_paid,
      });
    });

    // Convert to array and fill missing dates
    const data: TimeSeriesData[] = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayData = dateMap.get(dateStr) || { sales: 0, count: 0, royalties: 0 };
      
      data.push({
        date: dateStr,
        sales: dayData.sales,
        transactions: dayData.count,
        royalties: dayData.royalties,
      });
    }

    return data;
  } catch (error) {
    console.error('Error fetching time series data:', error);
    throw error;
  }
}

/**
 * Generate government report
 */
export interface GovernmentReport {
  reportDate: string;
  period: string;
  summary: {
    totalArtisans: number;
    verifiedArtisans: number;
    totalProducts: number;
    totalTransactions: number;
    totalVolume: number;
    totalRoyalties: number;
  };
  regionalBreakdown: RegionalMetrics['distribution'];
  categoryBreakdown: CategoryMetrics['distribution'];
  topArtisans: ArtisanMetrics['topArtisans'];
  economicImpact: {
    artisanIncome: number;
    platformRevenue: number;
    daoTreasury: number;
    averageArtisanEarning: number;
  };
}

export async function generateGovernmentReport(
  startDate: Date,
  endDate: Date
): Promise<GovernmentReport> {
  try {
    const [stats, salesMetrics, regionalMetrics, categoryMetrics, artisanMetrics] = await Promise.all([
      adminService.getStatistics(),
      getSalesMetrics(startDate, endDate),
      getRegionalMetrics(),
      getCategoryMetrics(),
      getArtisanMetrics(),
    ]);

    const report: GovernmentReport = {
      reportDate: new Date().toISOString(),
      period: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
      summary: {
        totalArtisans: stats.totalArtisans,
        verifiedArtisans: stats.verifiedArtisans,
        totalProducts: stats.totalProducts,
        totalTransactions: stats.totalTransactions,
        totalVolume: stats.totalVolume,
        totalRoyalties: stats.totalRoyalties,
      },
      regionalBreakdown: regionalMetrics.distribution,
      categoryBreakdown: categoryMetrics.distribution,
      topArtisans: artisanMetrics.topArtisans,
      economicImpact: {
        artisanIncome: salesMetrics.totalRoyalties * 0.7, // 70% to artisans
        platformRevenue: salesMetrics.totalRoyalties * 0.2, // 20% platform
        daoTreasury: salesMetrics.totalRoyalties * 0.1, // 10% DAO
        averageArtisanEarning: stats.verifiedArtisans > 0 
          ? (salesMetrics.totalRoyalties * 0.7) / stats.verifiedArtisans 
          : 0,
      },
    };

    return report;
  } catch (error) {
    console.error('Error generating government report:', error);
    throw error;
  }
}

/**
 * Export report to CSV
 */
export function exportReportToCSV(report: GovernmentReport): string {
  const lines: string[] = [];
  
  // Header
  lines.push('BUDAYA CHAIN - Government Report');
  lines.push(`Report Date: ${report.reportDate}`);
  lines.push(`Period: ${report.period}`);
  lines.push('');

  // Summary
  lines.push('SUMMARY');
  lines.push('Metric,Value');
  lines.push(`Total Artisans,${report.summary.totalArtisans}`);
  lines.push(`Verified Artisans,${report.summary.verifiedArtisans}`);
  lines.push(`Total Products,${report.summary.totalProducts}`);
  lines.push(`Total Transactions,${report.summary.totalTransactions}`);
  lines.push(`Total Volume (SOL),${report.summary.totalVolume}`);
  lines.push(`Total Royalties (SOL),${report.summary.totalRoyalties}`);
  lines.push('');

  // Regional Breakdown
  lines.push('REGIONAL BREAKDOWN');
  lines.push('Region,Products,Sales Volume,Percentage');
  report.regionalBreakdown.forEach(r => {
    lines.push(`${r.region},${r.productCount},${r.salesVolume},${r.percentage.toFixed(2)}%`);
  });
  lines.push('');

  // Category Breakdown
  lines.push('CATEGORY BREAKDOWN');
  lines.push('Category,Products,Sales Volume,Percentage');
  report.categoryBreakdown.forEach(c => {
    lines.push(`${c.category},${c.productCount},${c.salesVolume},${c.percentage.toFixed(2)}%`);
  });
  lines.push('');

  // Economic Impact
  lines.push('ECONOMIC IMPACT');
  lines.push('Metric,Value (SOL)');
  lines.push(`Artisan Income,${report.economicImpact.artisanIncome}`);
  lines.push(`Platform Revenue,${report.economicImpact.platformRevenue}`);
  lines.push(`DAO Treasury,${report.economicImpact.daoTreasury}`);
  lines.push(`Average Artisan Earning,${report.economicImpact.averageArtisanEarning}`);

  return lines.join('\n');
}

/**
 * Download report as CSV
 */
export function downloadReportCSV(report: GovernmentReport, filename?: string) {
  const csv = exportReportToCSV(report);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename || `budaya-chain-report-${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Track event (for analytics)
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  // In production, send to analytics service
  console.log('Analytics Event:', eventName, properties);
  
  // Could integrate with services like:
  // - Google Analytics
  // - Mixpanel
  // - Amplitude
  // - Custom analytics backend
}
