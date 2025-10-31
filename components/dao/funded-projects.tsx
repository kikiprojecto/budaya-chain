"use client"

export function FundedProjects() {
  const projects = [
    {
      name: "Javanese Batik Documentation",
      budget: "5,000 SOL",
      progress: 85,
      impact: "Preserves 50+ traditional patterns",
    },
    {
      name: "Artisan Training Program",
      budget: "8,500 SOL",
      progress: 60,
      impact: "Trains 200+ young artisans",
    },
    {
      name: "Regional Verification Center - Bali",
      budget: "12,000 SOL",
      progress: 100,
      impact: "Serves 500+ Balinese artisans",
    },
  ]

  return (
    <div className="space-y-4">
      {projects.map((project, idx) => (
        <div key={idx} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-bold text-foreground flex items-center gap-2">
                {project.name}
                {project.progress === 100 && (
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">{project.impact}</p>
            </div>
            <p className="font-bold text-primary text-lg">{project.budget}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
