'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getSalesMetrics,
  getArtisanMetrics,
  getRegionalMetrics,
  getCategoryMetrics,
  getTimeSeriesData,
  generateGovernmentReport,
  downloadReportCSV,
} from '@/lib/analytics';
import { Download, TrendingUp, Users, Package, DollarSign, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Enhanced Analytics Dashboard
 * Comprehensive analytics with government reporting
 */
export function EnhancedAnalytics() {
  const [loading, setLoading] = useState(true);
  const [salesMetrics, setSalesMetrics] = useState<any>(null);
  const [artisanMetrics, setArtisanMetrics] = useState<any>(null);
  const [regionalMetrics, setRegionalMetrics] = useState<any>(null);
  const [categoryMetrics, setCategoryMetrics] = useState<any>(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [sales, artisans, regional, category] = await Promise.all([
        getSalesMetrics(),
        getArtisanMetrics(),
        getRegionalMetrics(),
        getCategoryMetrics(),
      ]);

      setSalesMetrics(sales);
      setArtisanMetrics(artisans);
      setRegionalMetrics(regional);
      setCategoryMetrics(category);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1); // Last month

      const report = await generateGovernmentReport(startDate, endDate);
      downloadReportCSV(report);
      toast.success('Report generated successfully');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setGeneratingReport(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Platform Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights and reporting</p>
        </div>
        <Button onClick={handleGenerateReport} disabled={generatingReport}>
          {generatingReport ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export Report (CSV)
            </>
          )}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {salesMetrics?.totalVolume.toFixed(2)} SOL
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+{salesMetrics?.growthRate}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesMetrics?.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {salesMetrics?.averageTransactionValue.toFixed(2)} SOL
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Artisans</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artisanMetrics?.verifiedArtisans}</div>
            <p className="text-xs text-muted-foreground">
              +{artisanMetrics?.newArtisansThisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Royalties</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {salesMetrics?.totalRoyalties.toFixed(2)} SOL
            </div>
            <p className="text-xs text-muted-foreground">
              Distributed to artisans
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Distribution</CardTitle>
          <CardDescription>Product and sales distribution by region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionalMetrics?.distribution.slice(0, 5).map((region: any) => (
              <div key={region.region} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{region.region}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {region.productCount} products
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    {region.salesVolume.toFixed(2)} SOL
                  </span>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {region.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
          <CardDescription>Product and sales distribution by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryMetrics?.distribution.slice(0, 5).map((category: any) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{category.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {category.productCount} products
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    {category.salesVolume.toFixed(2)} SOL
                  </span>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {category.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Artisans */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Artisans</CardTitle>
          <CardDescription>Artisans with highest sales and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {artisanMetrics?.topArtisans.map((artisan: any, index: number) => (
              <div key={artisan.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{artisan.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {artisan.totalSales} sales
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{artisan.totalEarnings.toFixed(2)} SOL</div>
                  <div className="text-sm text-muted-foreground">Total earnings</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Economic Impact */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Economic Impact</CardTitle>
          <CardDescription>Platform contribution to cultural heritage preservation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Artisan Income</div>
              <div className="text-2xl font-bold">
                {(salesMetrics?.totalRoyalties * 0.7).toFixed(2)} SOL
              </div>
              <div className="text-xs text-muted-foreground">70% of royalties</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Platform Revenue</div>
              <div className="text-2xl font-bold">
                {(salesMetrics?.totalRoyalties * 0.2).toFixed(2)} SOL
              </div>
              <div className="text-xs text-muted-foreground">20% of royalties</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">DAO Treasury</div>
              <div className="text-2xl font-bold">
                {(salesMetrics?.totalRoyalties * 0.1).toFixed(2)} SOL
              </div>
              <div className="text-xs text-muted-foreground">10% of royalties</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
