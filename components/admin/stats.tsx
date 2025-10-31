"use client"

export function AdminStats() {
  const stats = [
    { label: "Total Users", value: "12,847", change: "+12%", icon: "👥" },
    { label: "Pending Verifications", value: "45", change: "", icon: "⏳" },
    { label: "Total Products", value: "3,521", change: "+8%", icon: "🛍️" },
    { label: "Revenue (30d)", value: "234 SOL", change: "+23%", icon: "💰" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="text-2xl">{stat.icon}</div>
            <span className="text-xs font-semibold text-foreground bg-accent/10 px-2 py-1 rounded">Live</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            {stat.change && <span className="text-xs font-semibold text-success">{stat.change}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
