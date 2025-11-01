import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Crimson_Text, Montserrat } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SolanaWalletProvider } from "@/components/providers/wallet-provider"
import { Toaster } from "@/components/ui/sonner"

// Heading font - Elegant serif for cultural sophistication
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
})

// Body font - Modern, readable
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

// Alternative serif - For quotes, descriptions
const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

// Alternative sans - For UI elements
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "BUDAYA CHAIN - Preserving Indonesian Cultural Heritage",
  description: "Web3 platform for verifying and trading authentic Indonesian cultural products",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://budaya-chain.vercel.app",
    siteName: "BUDAYA CHAIN",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="id" 
      suppressHydrationWarning
      className={`
        ${playfair.variable} 
        ${inter.variable} 
        ${crimson.variable}
        ${montserrat.variable}
      `}
    >
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <SolanaWalletProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </SolanaWalletProvider>
      </body>
    </html>
  )
}
