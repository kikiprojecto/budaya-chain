"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ProductModal } from "./product-modal"

const mockProducts = [
  {
    id: 1,
    name: "Hand-Woven Batik Sarong",
    artisan: "Siti Nurhaliza",
    price: 45,
    region: "Java",
    craft: "Batik",
    verified: true,
    image:
      'data:image/svg+xml,%3Csvg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%238B4513" width="300" height="400"/%3E%3Cg fill="%23FFD700" opacity="0.3"%3E%3Ccircle cx="75" cy="80" r="20"/%3E%3Ccircle cx="225" cy="100" r="15"/%3E%3Ccircle cx="150" cy="200" r="25"/%3E%3C/g%3E%3C/svg%3E',
  },
  {
    id: 2,
    name: "Wayang Kulit Puppet",
    artisan: "Budi Santoso",
    price: 120,
    region: "Solo",
    craft: "Wayang",
    verified: true,
    image:
      'data:image/svg+xml,%3Csvg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%234A0404" width="300" height="400"/%3E%3Cg fill="%23FFD700" opacity="0.4"%3E%3Ccircle cx="150" cy="100" r="30"/%3E%3Crect x="100" y="150" width="100" height="150" rx="10"/%3E%3C/g%3E%3C/svg%3E',
  },
  {
    id: 3,
    name: "Traditional Songket Cloth",
    artisan: "Dewi Lestari",
    price: 180,
    region: "Palembang",
    craft: "Songket",
    verified: true,
    image:
      'data:image/svg+xml,%3Csvg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%238B4513" width="300" height="400"/%3E%3Cg fill="%23FFD700" opacity="0.35"%3E%3Cline x1="0" y1="0" x2="300" y2="400" stroke="%23FFD700" strokeWidth="2" opacity="0.2"/%3E%3Cline x1="0" y1="400" x2="300" y2="0" stroke="%23FFD700" strokeWidth="2" opacity="0.2"/%3E%3C/g%3E%3C/svg%3E',
  },
  {
    id: 4,
    name: "Ikat Fabric Roll",
    artisan: "Siti Nurhaliza",
    price: 65,
    region: "Java",
    craft: "Ikat",
    verified: true,
    image:
      'data:image/svg+xml,%3Csvg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%238B4513" width="300" height="400"/%3E%3Cpattern id="ikat" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"%3E%3Crect x="0" y="0" width="15" height="15" fill="%23FFD700" opacity="0.3"/%3E%3Crect x="15" y="15" width="15" height="15" fill="%23FFD700" opacity="0.3"/%3E%3C/pattern%3E%3Crect width="300" height="400" fill="url(%23ikat)"/%3E%3C/svg%3E',
  },
]

export function ProductGrid({ filters }: any) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?status=listed')
      const data = await response.json()
      if (data.products) {
        // Transform API data to match component format
        const transformedProducts = data.products.map((p: any) => ({
          id: p.id,
          name: p.title,
          artisan: p.artisans?.name || 'Unknown Artisan',
          price: p.price,
          region: p.region,
          craft: p.category,
          verified: p.artisans?.verified || false,
          image: p.images?.[0] || mockProducts[0].image,
        }))
        setProducts(transformedProducts)
      } else {
        setProducts(mockProducts)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>
  }

  const filteredProducts = products.filter((p) => {
    if (filters.region !== "all" && p.region !== filters.region) return false
    if (filters.craftType !== "all" && p.craft !== filters.craftType) return false
    if (p.price > filters.priceRange[1]) return false
    return true
  })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-muted overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.verified && (
                <div className="absolute top-3 right-3 bg-success/90 backdrop-blur-sm rounded-full p-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-background">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-bold text-foreground mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{product.artisan}</p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{product.craft}</span>
                <span className="text-xs bg-accent/10 text-primary px-2 py-1 rounded">{product.region}</span>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg text-primary">{product.price} SOL</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedProduct(product)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </Button>
                  <Button size="sm" className="bg-primary text-background hover:bg-primary-dark">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your filters.</p>
        </div>
      )}

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  )
}
