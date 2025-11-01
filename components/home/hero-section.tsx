import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-sm font-medium text-foreground">Web3 Powered Heritage Platform</span>
          </div>

          {/* Main headline - NORMAL SIZE */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="block text-[#8B4513]">Preserving</span>
            <span className="block bg-gradient-to-r from-[#8B4513] via-[#FFD700] to-[#8B4513] bg-clip-text text-transparent">
              Indonesia's Soul
            </span>
          </h1>

          <p className="font-serif text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed italic mb-12">
            "Empowering 10 million artisans with blockchain technology, 
            ensuring cultural heritage thrives for generations to come."
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary text-background hover:bg-primary-dark h-12 px-8 text-base font-semibold gap-2">
              Verify Your Craft
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
            <Button
              variant="outline"
              className="h-12 px-8 text-base font-semibold border-2 border-primary text-primary hover:bg-primary/5 bg-transparent"
            >
              Explore Marketplace
            </Button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 relative">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl border border-border overflow-hidden">
            <svg viewBox="0 0 1200 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Batik-inspired decorative pattern */}
              <rect width="1200" height="600" fill="#FAFAF8" />
              <g fill="none" stroke="#8B4513" strokeWidth="2" opacity="0.3">
                <circle cx="600" cy="300" r="200" />
                <circle cx="600" cy="300" r="150" />
                <circle cx="600" cy="300" r="100" />
                <circle cx="600" cy="300" r="50" />
              </g>
              <g fill="#FFD700" opacity="0.2">
                <circle cx="300" cy="150" r="40" />
                <circle cx="900" cy="450" r="50" />
                <circle cx="150" cy="500" r="30" />
                <circle cx="1050" cy="100" r="45" />
              </g>
              <text x="600" y="320" textAnchor="middle" fontSize="32" fontFamily="serif" fill="#8B4513" opacity="0.4">
                Authentic Cultural Heritage
              </text>
            </svg>
          </div>

          {/* Floating cards */}
          <div className="absolute -bottom-6 -left-4 bg-card rounded-lg border border-border p-4 shadow-lg backdrop-blur-sm">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Verified</p>
            <p className="text-sm font-bold text-foreground">Authentic Batik</p>
          </div>
          <div className="absolute -top-6 -right-4 bg-card rounded-lg border border-border p-4 shadow-lg backdrop-blur-sm">
            <p className="text-xs font-semibold text-success uppercase tracking-wide">Blockchain</p>
            <p className="text-sm font-bold text-foreground">SOL Transaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
