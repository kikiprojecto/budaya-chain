"use client"

import { useState } from "react"
import { MarketplaceFilters } from "@/components/marketplace/filters"
import { ProductGrid } from "@/components/marketplace/product-grid"

export default function MarketplacePage() {
  const [filters, setFilters] = useState({
    region: "all",
    craftType: "all",
    priceRange: [0, 1000],
  })

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Discover verified authentic Indonesian cultural products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MarketplaceFilters filters={filters} setFilters={setFilters} />
          <div className="lg:col-span-3">
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}
