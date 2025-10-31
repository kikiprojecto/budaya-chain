"use client"

export function RegionalImpact() {
  const regions = [
    { name: "Java", artisans: 5782, percentage: 45 },
    { name: "Bali", artisans: 3211, percentage: 25 },
    { name: "Sumatra", artisans: 2567, percentage: 20 },
    { name: "Kalimantan", artisans: 892, percentage: 7 },
    { name: "Sulawesi", artisans: 395, percentage: 3 },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Regional Impact Map</h3>
      <div className="space-y-4">
        {regions.map((region) => (
          <div key={region.name}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">{region.name}</p>
              <p className="text-xs text-muted-foreground">{region.artisans.toLocaleString()} artisans</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div className="bg-accent h-full transition-all" style={{ width: `${region.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
