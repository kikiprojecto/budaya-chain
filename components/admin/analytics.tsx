"use client"

export function AnalyticsDashboard() {
  const regionalData = [
    { region: "Java", percentage: 45, products: 1584 },
    { region: "Bali", percentage: 25, products: 880 },
    { region: "Sumatra", percentage: 20, products: 704 },
    { region: "Others", percentage: 10, products: 352 },
  ]

  const craftData = [
    { craft: "Batik", percentage: 35, products: 1234 },
    { craft: "Wayang", percentage: 20, products: 704 },
    { craft: "Songket", percentage: 15, products: 528 },
    { craft: "Tenun", percentage: 15, products: 528 },
    { craft: "Others", percentage: 15, products: 528 },
  ]

  return (
    <div className="space-y-8">
      {/* Regional Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Regional Distribution</h3>
        <div className="space-y-4">
          {regionalData.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">{item.region}</span>
                <span className="text-sm text-muted-foreground">
                  {item.percentage}% • {item.products.toLocaleString()} products
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Craft Type Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Craft Type Distribution</h3>
        <div className="space-y-4">
          {craftData.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">{item.craft}</span>
                <span className="text-sm text-muted-foreground">
                  {item.percentage}% • {item.products.toLocaleString()} products
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0 0V8m0 4h4m-4 0H8" />
          </svg>
          Export CSV
        </button>
        <button className="flex-1 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Export PDF
        </button>
      </div>
    </div>
  )
}
