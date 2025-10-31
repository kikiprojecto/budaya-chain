"use client"

export function RevenueChart() {
  const data = [
    { month: "Aug", revenue: 400, royalties: 40 },
    { month: "Sep", revenue: 550, royalties: 55 },
    { month: "Oct", revenue: 480, royalties: 48 },
    { month: "Nov", revenue: 620, royalties: 62 },
    { month: "Dec", revenue: 780, royalties: 78 },
  ]

  const maxRevenue = Math.max(...data.map((d) => d.revenue))
  const maxRoyalties = Math.max(...data.map((d) => d.royalties))

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Revenue & Royalties (Last 5 Months)</h3>

      {/* Simple chart visualization */}
      <div className="space-y-6">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-foreground">{item.month}</span>
              <span className="text-xs text-muted-foreground">
                Rev: {item.revenue} SOL | Royalties: {item.royalties} SOL
              </span>
            </div>
            <div className="flex gap-2">
              {/* Revenue bar */}
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                />
              </div>
              {/* Royalties bar */}
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${(item.royalties / maxRoyalties) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-8 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Total Revenue (SOL)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Royalties (SOL)</span>
        </div>
      </div>
    </div>
  )
}
