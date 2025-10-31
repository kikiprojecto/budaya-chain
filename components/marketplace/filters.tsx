"use client"

export function MarketplaceFilters({ filters, setFilters }: any) {
  const regions = ["Java", "Bali", "Sumatra", "Sulawesi", "Kalimantan"]
  const craftTypes = ["Batik", "Wayang", "Songket", "Ikat", "Woodcarving"]

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
      <h3 className="text-lg font-bold text-foreground mb-6">Filters</h3>

      {/* Region Filter */}
      <div className="mb-8">
        <h4 className="font-semibold text-foreground mb-3 text-sm uppercase">Region</h4>
        <select
          value={filters.region}
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
        >
          <option value="all">All Regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Craft Type Filter */}
      <div className="mb-8">
        <h4 className="font-semibold text-foreground mb-3 text-sm uppercase">Craft Type</h4>
        <select
          value={filters.craftType}
          onChange={(e) => setFilters({ ...filters, craftType: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
        >
          <option value="all">All Crafts</option>
          {craftTypes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-foreground mb-3 text-sm uppercase">Price Range (SOL)</h4>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters({ ...filters, priceRange: [0, Number.parseInt(e.target.value)] })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>0 SOL</span>
          <span>{filters.priceRange[1]} SOL</span>
        </div>
      </div>
    </div>
  )
}
