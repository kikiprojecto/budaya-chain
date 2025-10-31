"use client"

import { useState } from "react"
import { ArtisanForm } from "@/components/register/artisan-form"
import { RegistrationProgress } from "@/components/register/progress"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Register Your Craft</h1>
          <p className="text-muted-foreground">Join BUDAYA CHAIN and get your products verified on the blockchain</p>
        </div>

        <div className="mb-8">
          <RegistrationProgress currentStep={currentStep} />
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <ArtisanForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
    </div>
  )
}
