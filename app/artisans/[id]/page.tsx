import { ArtisanHeader } from "@/components/artisan/artisan-header"
import { ArtisanStats } from "@/components/artisan/artisan-stats"
import { ArtisanTabs } from "@/components/artisan/artisan-tabs"

// Mock artisan data
const artisanData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Siti Aminah",
    specialty: "Traditional Batik Master",
    location: "Yogyakarta, Central Java",
    memberSince: "January 2025",
    reviews: 127,
    products: 24,
    sales: 156,
    earned: "45 SOL",
    royalties: "8.5 SOL",
    biography:
      "I have been creating traditional batik for 25 years, learning from my grandmother who was also a master batik artist. My passion is preserving the authentic techniques while creating contemporary designs that appeal to modern collectors.",
    specialties: ["Traditional Batik Tulis", "Natural Dye Techniques", "Yogyakarta Motifs"],
    awards: ["UNESCO Heritage Craftsman Award (2023)", "National Batik Excellence (2022)"],
  },
  "2": {
    id: "2",
    name: "Rahmat Wijaya",
    specialty: "Master Wood Carver",
    location: "Bali, Indonesia",
    memberSince: "February 2025",
    reviews: 89,
    products: 18,
    sales: 112,
    earned: "32 SOL",
    royalties: "6.2 SOL",
    biography:
      "Creating wooden sculptures for over 20 years, specializing in traditional Balinese designs and contemporary art pieces. Each piece is handcrafted with attention to detail and respect for cultural heritage.",
    specialties: ["Balinese Wood Carving", "Contemporary Designs", "Custom Commissions"],
    awards: ["Bali Artisan Guild Award (2023)", "International Crafts Exhibition (2022)"],
  },
  "3": {
    id: "3",
    name: "Dewi Lestari",
    specialty: "Songket Weaver",
    location: "Palembang, South Sumatra",
    memberSince: "December 2024",
    reviews: 156,
    products: 32,
    sales: 189,
    earned: "58 SOL",
    royalties: "11.3 SOL",
    biography:
      "Mastering the art of Songket weaving for 18 years. Each piece tells a story through its intricate patterns and vibrant colors. I am dedicated to keeping this ancient textile tradition alive.",
    specialties: ["Songket Palembang", "Gold Thread Weaving", "Traditional Motifs"],
    awards: ["Songket Master Award (2023)", "Export Excellence Award (2022)"],
  },
}

export default function ArtisanPage({ params }: { params: { id: string } }) {
  const artisan = artisanData[params.id] || artisanData["1"]

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <a href="/" className="hover:text-foreground transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/marketplace" className="hover:text-foreground transition-colors">
            Marketplace
          </a>
          <span>/</span>
          <span className="text-foreground font-medium">Artisan Profile</span>
        </div>

        {/* Profile Header */}
        <ArtisanHeader artisan={artisan} />

        {/* Stats */}
        <ArtisanStats artisan={artisan} />

        {/* Tabs */}
        <ArtisanTabs artisan={artisan} />
      </div>
    </div>
  )
}
