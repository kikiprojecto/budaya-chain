"use client"

export function RoyaltyBreakdown() {
  const data = [
    { name: "Artisan", value: 70, color: "#8B4513" },
    { name: "Platform", value: 20, color: "#FFD700" },
    { name: "Verification", value: 10, color: "#4A0404" },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h4 className="font-bold text-foreground mb-4">Royalty Breakdown</h4>

      {/* Simple chart visualization */}
      <div className="space-y-3 mb-6">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="text-sm font-semibold text-foreground">{item.value}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="space-y-2 text-sm border-t border-border pt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">
                {item.name} ({item.value}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
