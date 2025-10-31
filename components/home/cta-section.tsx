import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            Ready to Preserve Your Cultural Heritage?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of artisans leveraging blockchain technology to protect their work and connect with global
            buyers who value authenticity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-primary text-background hover:bg-primary-dark h-12 px-8 w-full sm:w-auto">
                Start Registering Now
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                variant="outline"
                className="border-2 border-primary text-primary h-12 px-8 w-full sm:w-auto bg-transparent"
              >
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
