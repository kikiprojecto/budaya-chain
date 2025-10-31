import { QRScanner } from "@/components/verify/qr-scanner"
import { RecentVerifications } from "@/components/verify/recent-verifications"

export default function VerifyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <a href="/" className="hover:text-foreground transition-colors">
            Home
          </a>
          <span>/</span>
          <span className="text-foreground font-medium">AR Verification</span>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
            Verify Authentic Indonesian Cultural Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Scan the QR code on any product to instantly verify its authenticity and view its complete blockchain
            provenance history.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <QRScanner />
          </div>
          <div>
            <RecentVerifications />
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Scan QR Code",
                description: "Use your device camera or upload a QR code image from the product",
              },
              {
                step: 2,
                title: "Check Blockchain",
                description: "Our system instantly verifies the product on Solana blockchain",
              },
              {
                step: 3,
                title: "View History",
                description: "See the complete ownership and royalty history of the product",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-accent text-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
