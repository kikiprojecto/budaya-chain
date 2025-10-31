import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-lg font-bold mb-4">BUDAYA CHAIN</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Preserving Indonesia{"'"}s Soul, Powered by Blockchain
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              {["Marketplace", "Register Artisan", "Dashboard", "DAO"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              {["Documentation", "Blog", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Social</h4>
            <ul className="space-y-2">
              {["Twitter", "Discord", "Instagram", "LinkedIn"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-background/70 hover:text-background text-sm transition-colors flex items-center gap-2"
                  >
                    {item}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.5"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-background/60">
            <p>© {currentYear} BUDAYA CHAIN. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
