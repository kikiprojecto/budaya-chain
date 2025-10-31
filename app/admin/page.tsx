"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminStats } from "@/components/admin/stats"
import { VerificationQueue } from "@/components/admin/verification-queue"
import { AnalyticsDashboard } from "@/components/admin/analytics"
import { SettingsPanel } from "@/components/admin/settings-panel"

export default function AdminPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">Home / Admin Dashboard</p>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Government Admin Panel</h1>
              <p className="text-muted-foreground">Manage platform verifications, analytics, and configuration</p>
            </div>
            <span className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-bold uppercase">
              Admin Access Only
            </span>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="mb-8 bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-foreground">Access Control Active</p>
            <p className="text-xs text-muted-foreground mt-1">Verify your admin wallet to access all features</p>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mb-8">
          <AdminStats />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="verifications" className="w-full">
          <TabsList className="bg-card border border-border w-full justify-start">
            <TabsTrigger
              value="verifications"
              className="data-[state=active]:bg-primary data-[state=active]:text-background"
            >
              Verification Queue
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-primary data-[state=active]:text-background"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-primary data-[state=active]:text-background"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verifications" className="mt-8">
            <VerificationQueue />
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="settings" className="mt-8">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
