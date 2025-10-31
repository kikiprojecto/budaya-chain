"use client"

import { Button } from "@/components/ui/button"

export function ProductModal({ product, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{product.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              <p className="text-2xl font-bold text-primary">{product.price} SOL</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Artisan</p>
              <p className="font-semibold text-foreground flex items-center gap-2">
                {product.artisan}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Region</p>
              <p className="font-semibold text-foreground">{product.region}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Craft Type</p>
              <p className="font-semibold text-foreground">{product.craft}</p>
            </div>
          </div>

          {/* Royalty Info */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <p className="font-semibold text-foreground">Creator Royalties</p>
            </div>
            <p className="text-sm text-muted-foreground">10% of future sales automatically goes to {product.artisan}</p>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Blockchain Provenance</h4>
            <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground space-y-2">
              <p>✓ Verified by Indonesian Government</p>
              <p>✓ Immutable Certificate on Solana Blockchain</p>
              <p>✓ Full provenance tracking</p>
              <p>✓ Authentic handcrafted by certified artisan</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-primary text-background hover:bg-primary-dark h-12">
              Buy Now with Phantom
            </Button>
            <Button variant="outline" className="flex-1 border-2 h-12 bg-transparent">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
