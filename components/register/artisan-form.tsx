"use client"

import type React from "react"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ArtisanForm({ currentStep, setCurrentStep }: any) {
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    craftType: "",
    region: "",
    experience: "",
    bio: "",
    portfolioFiles: [],
    govId: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
      return
    }

    // Final submission
    if (!publicKey) {
      toast.error("Please connect your wallet first")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/artisans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet_address: publicKey.toBase58(),
          name: formData.name,
          category: formData.craftType,
          region: formData.region,
          bio: formData.bio || `${formData.craftType} artisan from ${formData.region} with ${formData.experience} years of experience.`,
          portfolio_images: [],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      toast.success("Registration successful! Awaiting verification.")
      setCurrentStep(3)
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {currentStep === 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
              required
            />
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Craft Category</h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Select Your Craft</label>
            <select
              name="craftType"
              value={formData.craftType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              required
            >
              <option value="">Choose a craft type...</option>
              <option value="Batik">Batik</option>
              <option value="Wayang">Wayang Kulit</option>
              <option value="Songket">Songket</option>
              <option value="Ikat">Ikat</option>
              <option value="Woodcarving">Woodcarving</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              required
            >
              <option value="">Choose your region...</option>
              <option value="Java">Java</option>
              <option value="Bali">Bali</option>
              <option value="Sumatra">Sumatra</option>
              <option value="Sulawesi">Sulawesi</option>
              <option value="Kalimantan">Kalimantan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="e.g., 20"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground"
              required
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Portfolio Upload</h3>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mx-auto mb-3 text-muted-foreground"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="font-semibold text-foreground mb-1">Upload Portfolio Images</p>
            <p className="text-sm text-muted-foreground">Drag and drop or click to select files</p>
          </div>
          <p className="text-xs text-muted-foreground">Upload 3-5 high-quality images of your work</p>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Government ID Verification</h3>
          <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-4 flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-success flex-shrink-0 mt-1"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <p className="font-semibold text-foreground text-sm">Verification Pending</p>
              <p className="text-xs text-muted-foreground">
                Your documents are secure and protected by blockchain verification
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Upload Government ID (KTP)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            />
          </div>

          {/* NFT Certificate Preview */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Your NFT Certificate Preview</h4>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-6 text-center border border-primary/30">
              <div className="aspect-square max-w-xs mx-auto bg-card rounded-lg border border-border p-4 flex flex-col items-center justify-center">
                <p className="text-sm font-semibold text-foreground mb-2">Artisan Verification NFT</p>
                <p className="text-xs text-muted-foreground mb-3">{formData.name || "Your Name"}</p>
                <p className="text-xs text-muted-foreground">
                  {formData.craftType} • {formData.region}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex-1"
        >
          Previous
        </Button>
        <Button type="submit" className="flex-1 bg-primary text-background hover:bg-primary-dark">
          {currentStep === 3 ? "Complete Registration" : "Next Step"}
        </Button>
      </div>
    </form>
  )
}
