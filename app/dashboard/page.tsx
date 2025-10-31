"use client"

import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { ProductsTable } from "@/components/dashboard/products-table"
import { DashboardStats } from "@/components/dashboard/stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Creator Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and track earnings</p>
        </div>

        <DashboardStats />

        <div className="mt-8">
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="bg-card border border-border">
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-primary data-[state=active]:text-background"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-primary data-[state=active]:text-background"
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="earnings"
                className="data-[state=active]:bg-primary data-[state=active]:text-background"
              >
                Earnings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-6 mt-6">
              <RevenueChart />
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <ProductsTable />
            </TabsContent>

            <TabsContent value="earnings" className="mt-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Royalty Earnings History</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground">Sale Commission - Product #{i}</p>
                        <p className="text-sm text-muted-foreground">Oct {15 + i}, 2025</p>
                      </div>
                      <p className="font-bold text-primary">+{5 + i} SOL</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
