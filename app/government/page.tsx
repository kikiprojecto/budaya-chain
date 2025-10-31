import { ImpactCards } from "@/components/government/impact-cards"
import { RegionalImpact } from "@/components/government/regional-impact"
import { HeritageStats } from "@/components/government/heritage-stats"
import { EconomicTimeline } from "@/components/government/economic-timeline"

export default function GovernmentPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-background font-bold text-sm">
              K
            </div>
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-foreground font-bold text-sm">
              E
            </div>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-background font-bold text-sm">
              B
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
            Government Impact Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BUDAYA CHAIN: Preserving Indonesian Cultural Heritage Through Technology
          </p>
        </div>

        {/* Impact Overview */}
        <div className="mb-12">
          <ImpactCards />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <RegionalImpact />
          <HeritageStats />
        </div>

        {/* Economic Impact */}
        <div className="mb-12">
          <EconomicTimeline />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary-dark transition-colors">
            Download Full Report PDF
          </button>
          <button className="px-6 py-3 bg-muted text-foreground font-medium rounded-lg hover:bg-muted hover:text-foreground transition-colors border border-border">
            Export Data CSV
          </button>
        </div>
      </div>
    </div>
  )
}
