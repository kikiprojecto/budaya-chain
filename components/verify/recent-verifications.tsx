"use client"

export function RecentVerifications() {
  const verifications = [
    { id: 1, product: "Traditional Wayang Kulit", time: "2 min ago" },
    { id: 2, product: "Songket Palembang", time: "5 min ago" },
    { id: 3, product: "Batik Pekalongan", time: "8 min ago" },
    { id: 4, product: "Tenun Ikat Timor", time: "12 min ago" },
    { id: 5, product: "Keramik Plered", time: "18 min ago" },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Verifications</h3>
      <div className="space-y-3">
        {verifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium text-foreground">{item.product}</p>
            </div>
            <p className="text-xs text-muted-foreground">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
