"use client"

export function TreasuryCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Balance Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase">Balance</h3>
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-3xl font-bold text-foreground mb-1">1,234</p>
        <p className="text-xs text-muted-foreground">SOL</p>
      </div>

      {/* Members Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase">Members</h3>
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 12H9m4.646-4.646a4 4 0 00-5.292 0m5.292 5.292a4 4 0 01-5.292 0M9 20h6a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-3xl font-bold text-foreground mb-1">2,847</p>
        <p className="text-xs text-muted-foreground">Verified</p>
      </div>

      {/* Proposals Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase">Active Proposals</h3>
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-3xl font-bold text-foreground mb-1">12</p>
        <p className="text-xs text-muted-foreground">Voting</p>
      </div>

      {/* Projects Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase">Funded</h3>
          <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7 20H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1m0 0h6a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2v-1m0 0V7"
            />
          </svg>
        </div>
        <p className="text-3xl font-bold text-foreground mb-1">34</p>
        <p className="text-xs text-muted-foreground">Projects</p>
      </div>
    </div>
  )
}
