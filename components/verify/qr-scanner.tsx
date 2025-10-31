"use client"

import { useState } from "react"

export function QRScanner() {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isScanned, setIsScanned] = useState(false)
  const [scanResult, setScanResult] = useState<{
    product: string
    artisan: string
    minted: string
    nft: string
    history: string[]
  } | null>(null)

  const mockScanResult = {
    product: "Traditional Batik Tulis",
    artisan: "Siti Aminah",
    minted: "Jan 15, 2025",
    nft: "7xK9...f3H2",
    history: [
      "Jan 15, 2025 - Minted by artisan",
      "Jan 20, 2025 - First sale to buyer A",
      "Feb 10, 2025 - Resold to buyer B (5% royalty)",
    ],
  }

  const handleSimulatedScan = () => {
    setIsScanned(true)
    setScanResult(mockScanResult)
  }

  return (
    <div className="w-full space-y-6">
      {/* Scanner Box */}
      <div className="bg-gradient-to-br from-card to-muted border-2 border-accent/30 rounded-lg overflow-hidden">
        <div className="aspect-square flex flex-col items-center justify-center bg-black relative">
          {isCameraActive ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />
              <svg
                className="w-48 h-48 text-accent/30 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9h18v12H3z" />
                <path d="M9 3v6M15 3v6" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <p className="text-white text-sm mt-4">Scanning Active</p>
              <div className="mt-2 w-32 h-1 bg-accent/30 rounded-full overflow-hidden">
                <div className="h-full bg-accent animate-pulse" style={{ width: "60%" }} />
              </div>
            </>
          ) : (
            <svg className="w-32 h-32 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9h18v12H3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v6M15 3v6" />
            </svg>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setIsCameraActive(!isCameraActive)}
          className="flex-1 px-4 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary-dark transition-colors"
        >
          {isCameraActive ? "Stop Camera" : "Enable Camera"}
        </button>
        <button
          onClick={() => document.getElementById("qr-upload")?.click()}
          className="flex-1 px-4 py-3 bg-muted text-foreground font-medium rounded-lg hover:bg-muted hover:text-foreground transition-colors border border-border"
        >
          Upload QR Image
        </button>
        <input id="qr-upload" type="file" accept="image/*" className="hidden" />
      </div>

      {/* Simulated Scan Button for Demo */}
      <button
        onClick={handleSimulatedScan}
        className="w-full px-4 py-2 text-sm bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors border border-accent/30"
      >
        Simulate QR Scan (Demo)
      </button>

      {/* Verification Result */}
      {isScanned && scanResult && (
        <div className="bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-foreground">Authentic Product Verified</h3>
              <p className="text-sm text-muted-foreground">Blockchain verified on Solana</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Product</p>
              <p className="font-medium text-foreground">{scanResult.product}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Artisan</p>
              <p className="font-medium text-foreground">{scanResult.artisan}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Minted</p>
              <p className="font-medium text-foreground">{scanResult.minted}</p>
            </div>
            <div>
              <p className="text-muted-foreground">NFT Address</p>
              <p className="font-mono text-xs text-accent">{scanResult.nft}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <p className="text-sm font-semibold text-foreground mb-2">Blockchain Provenance</p>
            <div className="space-y-2">
              {scanResult.history.map((event, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{event}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <button className="px-3 py-2 bg-accent/20 text-accent font-medium rounded-lg hover:bg-accent/30 transition-colors text-sm">
              View Full Details
            </button>
            <button className="px-3 py-2 bg-primary/20 text-primary font-medium rounded-lg hover:bg-primary/30 transition-colors text-sm">
              View on Solscan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
