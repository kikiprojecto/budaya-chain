import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SolanaWalletProvider } from "@/components/providers/wallet-provider"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

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
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-background text-foreground antialiased`}>
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
