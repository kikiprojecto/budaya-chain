"use client"

export function ArtisanStats({ artisan }: { artisan: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        { label: "Products", value: artisan.products },
        { label: "Sales", value: artisan.sales },
        { label: "Earned", value: artisan.earned },
        { label: "Royalties", value: artisan.royalties },
      ].map((stat) => (
        <div key={stat.label} className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
