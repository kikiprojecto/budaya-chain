"use client"

export function EconomicTimeline() {
  const months = [
    { label: "Sept", value: 200, formatted: "$200K" },
    { label: "Oct", value: 350, formatted: "$350K" },
    { label: "Nov", value: 480, formatted: "$480K" },
    { label: "Dec", value: 650, formatted: "$650K" },
    { label: "Jan", value: 890, formatted: "$890K" },
    { label: "Feb", value: 1200, formatted: "$1.2M" },
  ]

  const maxValue = Math.max(...months.map((m) => m.value))

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Economic Impact Timeline (6 Months)</h3>
      <div className="space-y-3">
        <div className="flex items-end justify-between h-40 gap-2">
          {months.map((month) => {
            const height = (month.value / maxValue) * 100
            return (
              <div key={month.label} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-accent/20 rounded-t hover:bg-accent/40 transition-colors"
                  style={{ height: `${height}%` }}
                />
                <p className="text-xs font-medium text-muted-foreground mt-2">{month.label}</p>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground pt-2">
          {months.map((month) => (
            <p key={month.label}>{month.formatted}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
