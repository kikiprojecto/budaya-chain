"use client"

import type React from "react"

import { useState } from "react"

export function CreateProposalForm() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("funding")
  const [description, setDescription] = useState("")
  const [fundingAmount, setFundingAmount] = useState("")
  const [duration, setDuration] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8 max-w-2xl">
      <h3 className="text-2xl font-bold text-foreground mb-6">Create New Proposal</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Proposal Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter proposal title"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Category <span className="text-destructive">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="funding">Funding</option>
            <option value="partnership">Partnership</option>
            <option value="policy">Policy</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your proposal in detail"
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            required
          />
        </div>

        {/* Funding Amount */}
        {category === "funding" && (
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Funding Amount (SOL)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={fundingAmount}
                onChange={(e) => setFundingAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="text-foreground font-semibold">SOL</span>
            </div>
          </div>
        )}

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Voting Duration (Days)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="7"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Requirements */}
        <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-foreground">Requirements:</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>✓ Must be verified artisan</p>
            <p>✓ Minimum 100 governance tokens</p>
            <p>✓ Active in community for 30+ days</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 py-3 px-6 rounded-lg bg-primary text-background font-semibold hover:bg-primary-dark transition-colors"
          >
            Submit Proposal
          </button>
          <button
            type="button"
            className="flex-1 py-3 px-6 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
