export function RegistrationProgress({ currentStep }: any) {
  const steps = ["Personal Info", "Craft Category", "Portfolio", "Verification"]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  idx <= currentStep ? "bg-primary text-background" : "bg-muted text-muted-foreground"
                }`}
              >
                {idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 ${idx < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
            <p className="text-xs font-semibold text-foreground mt-2">{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
