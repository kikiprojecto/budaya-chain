"use client"

import { useState } from "react"

export function ArtisanTabs({ artisan }: { artisan: any }) {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-border">
        {[
          { id: "products", label: `Products (${artisan.products})` },
          { id: "about", label: "About" },
          { id: "reviews", label: `Reviews (${artisan.reviews})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "products" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-foreground mb-1">Traditional Batik {i + 1}</p>
                  <p className="text-xs text-muted-foreground mb-3">{(25 + i * 10).toFixed(1)} SOL</p>
                  <button className="w-full px-3 py-2 bg-accent text-foreground font-medium rounded-lg hover:bg-accent-dark transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Biography</h3>
              <p className="text-muted-foreground">{artisan.biography}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Specialties</h3>
              <ul className="space-y-1">
                {artisan.specialties.map((specialty: string, i: number) => (
                  <li key={i} className="text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Awards & Recognition</h3>
              <ul className="space-y-1">
                {artisan.awards.map((award: string, i: number) => (
                  <li key={i} className="text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-success rounded-full flex-shrink-0" />
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-background font-bold text-sm">
                    R
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Reviewer {i + 1}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-3 h-3 text-accent fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Excellent craftsmanship and beautiful traditional designs. Highly recommend!
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
