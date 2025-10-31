"use client"

import { TimelineItem } from "@/components/product/timeline"
import { RoyaltyBreakdown } from "@/components/product/royalty-breakdown"
import { CreatorCard } from "@/components/product/creator-card"
import { Button } from "@/components/ui/button"

export default function ProductDetailPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="bg-muted rounded-lg overflow-hidden aspect-video">
              <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="500" fill="#8B4513" opacity="0.2" />
                <g fill="#FFD700" opacity="0.3">
                  <circle cx="200" cy="150" r="50" />
                  <circle cx="600" cy="250" r="70" />
                  <circle cx="400" cy="400" r="60" />
                </g>
                <text x="400" y="280" textAnchor="middle" fontSize="40" fontFamily="serif" fill="#8B4513" opacity="0.4">
                  Hand-Woven Batik
                </text>
              </svg>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Traditional Batik Sarong</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-foreground font-semibold">45 SOL</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-success">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-sm text-muted-foreground">Verified Authentic</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <line x1="23" y1="1" x2="20" y2="4" />
                    <path d="M8 7a4 4 0 1 0 8 0A4 4 0 0 0 8 7" />
                    <path d="M3 21h18M5 10c-1.3-1.3-2-3.1-2-5" />
                  </svg>
                  Share
                </Button>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Handcrafted using traditional wax-resist dyeing techniques passed down through generations. Each piece
                is unique and tells a story of Javanese cultural heritage and artistic mastery.
              </p>
            </div>

            {/* Blockchain Provenance */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Blockchain Provenance</h3>
              <div className="space-y-4">
                <TimelineItem
                  title="Created"
                  description="Handcrafted by master artisan Siti Nurhaliza"
                  date="Oct 15, 2025"
                  isFirst
                />
                <TimelineItem
                  title="Verified by Government"
                  description="Authenticated as genuine Indonesian cultural product"
                  date="Oct 18, 2025"
                />
                <TimelineItem
                  title="Minted as NFT"
                  description="Immutable certificate registered on Solana blockchain"
                  date="Oct 20, 2025"
                />
                <TimelineItem
                  title="Listed on BUDAYA CHAIN"
                  description="Now available for collectors worldwide"
                  date="Oct 21, 2025"
                  isLast
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Card */}
            <CreatorCard />

            {/* Royalty Breakdown */}
            <RoyaltyBreakdown />

            {/* Purchase Section */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 space-y-4">
              <h4 className="font-bold text-foreground">Ready to own this masterpiece?</h4>
              <p className="text-sm text-muted-foreground">
                Connect your Phantom wallet to purchase and own this authentic cultural artifact.
              </p>
              <Button className="w-full bg-primary text-background hover:bg-primary-dark gap-2 h-12">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Buy with Phantom Wallet
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                10% royalties go directly to the creator on every resale
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
