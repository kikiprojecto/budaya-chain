"use client"

export function ImpactCards() {
  const stats = [
    { label: "Artisans Protected", value: "12,847", change: "+12% MoM" },
    { label: "Products Verified", value: "3,521", change: "+8% MoM" },
    { label: "Cultural Heritage Saved", value: "45 Arts", change: "Traditional crafts" },
    { label: "Economic Impact", value: "$2.3M", change: "Generated" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all">
          <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
          <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
          <p className="text-xs text-accent font-medium">{stat.change}</p>
        </div>
      ))}
    </div>
  )
}
