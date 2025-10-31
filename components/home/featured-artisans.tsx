const artisans = [
  {
    name: "Siti Nurhaliza",
    craft: "Traditional Batik",
    region: "Yogyakarta",
    verified: true,
    products: 24,
  },
  {
    name: "Budi Santoso",
    craft: "Wayang Kulit",
    region: "Solo",
    verified: true,
    products: 18,
  },
  {
    name: "Dewi Lestari",
    craft: "Songket Weaving",
    region: "Palembang",
    verified: true,
    products: 15,
  },
]

export function FeaturedArtisans() {
  return (
    <section className="py-16 md:py-24 bg-foreground/2 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Featured Artisans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the master craftspeople preserving Indonesia{"'"}s cultural traditions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artisans.map((artisan, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Avatar placeholder */}
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="80" r="30" fill="#8B4513" opacity="0.3" />
                  <path d="M 50 150 Q 100 120 150 150" stroke="#8B4513" strokeWidth="2" fill="none" opacity="0.3" />
                  <g fill="#FFD700" opacity="0.2">
                    <circle cx="40" cy="40" r="8" />
                    <circle cx="160" cy="50" r="10" />
                    <circle cx="50" cy="170" r="7" />
                    <circle cx="150" cy="175" r="9" />
                  </g>
                </svg>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-foreground">{artisan.name}</h3>
                  {artisan.verified && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-success flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{artisan.craft}</p>
                <p className="text-sm text-muted-foreground mb-4">{artisan.region}</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-foreground font-semibold">{artisan.products} Products Listed</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
