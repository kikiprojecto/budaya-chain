'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRScanner } from "@/components/verify/qr-scanner"
import { RecentVerifications } from "@/components/verify/recent-verifications"

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const nftParam = searchParams?.get('nft');
  
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [nftAddress, setNftAddress] = useState('');

  useEffect(() => {
    if (nftParam) {
      setNftAddress(nftParam);
      verifyNFT(nftParam);
    }
  }, [nftParam]);

  const verifyNFT = async (address: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blockchain/verify?nft=${address}`);
      const data = await response.json();
      
      setVerificationResult(data);
    } catch (error) {
      setVerificationResult({ verified: false, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleManualVerify = () => {
    if (nftAddress.trim()) {
      verifyNFT(nftAddress.trim());
    }
  };

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

        {/* Manual Verification Input */}
        <div className="mb-8 bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Manual Verification</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={nftAddress}
              onChange={(e) => setNftAddress(e.target.value)}
              placeholder="Enter NFT address to verify..."
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
            />
            <button
              onClick={handleManualVerify}
              disabled={loading || !nftAddress.trim()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </div>

        {/* Verification Result */}
        {loading && (
          <div className="bg-card border border-border rounded-lg p-12 text-center mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-xl font-semibold">Verifying on blockchain...</p>
          </div>
        )}

        {verificationResult && !loading && (
          <div className={`bg-card border-4 rounded-lg p-8 mb-8 ${
            verificationResult.verified ? 'border-green-500' : 'border-red-500'
          }`}>
            {verificationResult.verified ? (
              <div>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-3xl font-bold text-green-600 mb-2">
                    AUTHENTIC PRODUCT VERIFIED
                  </h2>
                  <p className="text-muted-foreground">
                    This product is genuine and registered on Solana blockchain
                  </p>
                </div>

                {verificationResult.product && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      {verificationResult.product.images?.[0] && (
                        <img
                          src={verificationResult.product.images[0]}
                          alt={verificationResult.product.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">
                          {verificationResult.product.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {verificationResult.product.category} • {verificationResult.product.region}
                        </p>
                      </div>
                    </div>

                    {verificationResult.artisan && (
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <h4 className="font-bold mb-2">Artisan Information</h4>
                        <p className="font-semibold">{verificationResult.artisan.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {verificationResult.artisan.verified ? '✓ Verified' : 'Pending Verification'} • {verificationResult.artisan.region}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {verificationResult.product.royalty_bps / 100}% royalty on resales
                        </p>
                      </div>
                    )}

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-bold mb-2">Blockchain Certificate</h4>
                      <p className="text-sm font-mono bg-background p-2 rounded break-all">
                        {nftAddress || verificationResult.product.nft_address}
                      </p>
                      <a
                        href={`https://explorer.solana.com/address/${nftAddress || verificationResult.product.nft_address}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm mt-2 inline-block"
                      >
                        View on Solana Explorer →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">❌</div>
                <h2 className="text-3xl font-bold text-red-600 mb-2">
                  VERIFICATION FAILED
                </h2>
                <p className="text-muted-foreground mb-4">
                  This product could not be verified on the blockchain
                </p>
                <p className="text-sm text-muted-foreground">
                  {verificationResult.error || 'Possible counterfeit or invalid NFT address'}
                </p>
              </div>
            )}
          </div>
        )}

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
