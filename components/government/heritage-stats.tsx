"use client"

export function HeritageStats() {
  const crafts = [
    { name: "Batik (Various regions)", artisans: 1234 },
    { name: "Wayang Kulit", artisans: 456 },
    { name: "Songket", artisans: 389 },
    { name: "Tenun Ikat", artisans: 312 },
    { name: "Ukiran Kayu", artisans: 245 },
    { name: "Keramik", artisans: 178 },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Cultural Heritage Preserved</h3>
      <p className="text-sm text-muted-foreground mb-4">Traditional crafts on platform:</p>
      <div className="space-y-3">
        {crafts.map((craft) => (
          <div key={craft.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-foreground">{craft.name}</p>
            <p className="text-xs font-semibold text-accent">{craft.artisans.toLocaleString()} artisans</p>
          </div>
        ))}
        <div className="pt-2 border-t border-border mt-3">
          <p className="text-xs text-muted-foreground">+ 39 more traditional crafts</p>
        </div>
      </div>
    </div>
  )
}
