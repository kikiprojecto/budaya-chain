"use client"

import { useState } from "react"

export function SettingsPanel() {
  const [commissionFee, setCommissionFee] = useState(5)
  const [minRoyalty, setMinRoyalty] = useState(10)
  const [maxRoyalty, setMaxRoyalty] = useState(20)
  const [verificationFee, setVerificationFee] = useState(0.1)
  const [enableAR, setEnableAR] = useState(true)
  const [enableDAO, setEnableDAO] = useState(true)
  const [enableBeta, setEnableBeta] = useState(false)
  const [adminWallet, setAdminWallet] = useState("")
  const [adminWallets, setAdminWallets] = useState(["7xK9mPqR3vL8nQ2kJ9dF3H2", "9mL3aBc8kD5eF1nG7jH9sK2"])

  const handleAddWallet = () => {
    if (adminWallet && !adminWallets.includes(adminWallet)) {
      setAdminWallets([...adminWallets, adminWallet])
      setAdminWallet("")
    }
  }

  const handleRemoveWallet = (wallet: string) => {
    setAdminWallets(adminWallets.filter((w) => w !== wallet))
  }

  return (
    <div className="space-y-8">
      {/* Configuration Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Platform Configuration</h3>

        <div className="space-y-4">
          {/* Commission Fee */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Commission Fee</p>
              <p className="text-xs text-muted-foreground">Percentage taken from each transaction</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={commissionFee}
                onChange={(e) => setCommissionFee(Number(e.target.value))}
                className="w-16 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-right"
              />
              <span className="text-foreground font-semibold">%</span>
              <button className="px-3 py-2 rounded-lg bg-primary text-background text-xs font-semibold hover:bg-primary-dark transition-colors">
                Update
              </button>
            </div>
          </div>

          {/* Minimum Royalty */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Minimum Royalty</p>
              <p className="text-xs text-muted-foreground">Minimum royalty percentage for creators</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={minRoyalty}
                onChange={(e) => setMinRoyalty(Number(e.target.value))}
                className="w-16 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-right"
              />
              <span className="text-foreground font-semibold">%</span>
              <button className="px-3 py-2 rounded-lg bg-primary text-background text-xs font-semibold hover:bg-primary-dark transition-colors">
                Update
              </button>
            </div>
          </div>

          {/* Maximum Royalty */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Maximum Royalty</p>
              <p className="text-xs text-muted-foreground">Maximum royalty percentage for creators</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={maxRoyalty}
                onChange={(e) => setMaxRoyalty(Number(e.target.value))}
                className="w-16 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-right"
              />
              <span className="text-foreground font-semibold">%</span>
              <button className="px-3 py-2 rounded-lg bg-primary text-background text-xs font-semibold hover:bg-primary-dark transition-colors">
                Update
              </button>
            </div>
          </div>

          {/* Verification Fee */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Verification Fee</p>
              <p className="text-xs text-muted-foreground">One-time fee for artisan verification</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={verificationFee}
                onChange={(e) => setVerificationFee(Number(e.target.value))}
                step="0.1"
                className="w-16 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-right"
              />
              <span className="text-foreground font-semibold">SOL</span>
              <button className="px-3 py-2 rounded-lg bg-primary text-background text-xs font-semibold hover:bg-primary-dark transition-colors">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Flags */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Feature Flags</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">AR Verification</p>
              <p className="text-xs text-muted-foreground">Enable augmented reality verification</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableAR}
                onChange={(e) => setEnableAR(e.target.checked)}
                className="w-4 h-4 rounded"
              />
            </label>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-sm font-semibold text-foreground">DAO Governance</p>
              <p className="text-xs text-muted-foreground">Enable community governance</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableDAO}
                onChange={(e) => setEnableDAO(e.target.checked)}
                className="w-4 h-4 rounded"
              />
            </label>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Beta Features</p>
              <p className="text-xs text-muted-foreground">Enable experimental features</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableBeta}
                onChange={(e) => setEnableBeta(e.target.checked)}
                className="w-4 h-4 rounded"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Admin Wallets */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Admin Wallets (Whitelist)</h3>

        <div className="space-y-4">
          {/* Add Wallet */}
          <div className="flex gap-2">
            <input
              type="text"
              value={adminWallet}
              onChange={(e) => setAdminWallet(e.target.value)}
              placeholder="Enter wallet address"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleAddWallet}
              className="px-4 py-2 rounded-lg bg-primary text-background font-semibold hover:bg-primary-dark transition-colors"
            >
              Add
            </button>
          </div>

          {/* Wallet List */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {adminWallets.map((wallet, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-muted/30 border border-border rounded-lg p-3"
              >
                <code className="text-xs text-foreground font-mono">{wallet}</code>
                <button
                  onClick={() => handleRemoveWallet(wallet)}
                  className="text-destructive hover:text-destructive/80 transition-colors text-xs font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
