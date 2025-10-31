"use client"

import { useState, useEffect } from "react"

export function StatsSection() {
  const [stats, setStats] = useState([
    { label: "Artisans Protected", value: 0, target: 2847 },
    { label: "Products Verified", value: 0, target: 15320 },
    { label: "Cultural Heritage Saved", value: 0, target: 89 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: Math.min(stat.value + Math.ceil(stat.target / 50), stat.target),
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-card border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value.toLocaleString()}</p>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
