import { useEffect, useState } from 'react'

export default function LoadingScreen({ currentStep }) {
  const steps = [
    {
      title: "Reading your CAMS statement",
      subtitle: "Extracting fund data and transactions"
    },
    {
      title: "Calculating real returns",
      subtitle: "Computing XIRR accounting for all investment dates"
    },
    {
      title: "Detecting overlap",
      subtitle: "Comparing holdings across all your funds"
    },
    {
      title: "Generating recommendations",
      subtitle: "AI creating your personalized action plan"
    }
  ]

  const progress = Math.min((currentStep / steps.length) * 100, 100)

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#111111] w-full relative overflow-hidden flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 bg-[#333333] w-full absolute top-0 left-0">
        <div 
          className="h-full bg-et-red transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-0 lg:ml-[10%] max-w-[480px] mx-auto lg:mx-0 w-full py-12 relative z-10">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] text-white font-black leading-none mb-1 mt-[-2px]">Analyzing</h2>
          <h2 className="text-[32px] md:text-[48px] text-et-red font-black italic leading-none mt-[-2px]">your portfolio</h2>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const stepNum = index + 1
            const isCompleted = currentStep > stepNum
            const isActive = currentStep === stepNum
            const isPending = currentStep < stepNum

            return (
              <div key={index} className={`flex items-start gap-4 transition-opacity duration-300 ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                <div className="relative shrink-0 mt-1">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-et-red flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : isActive ? (
                    <div className="w-6 h-6 rounded-full border-2 border-[#333333] relative">
                      <div className="absolute inset-[-2px] rounded-full border-2 border-et-red border-t-transparent animate-spin"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[#333333] bg-transparent"></div>
                  )}
                </div>
                
                <div>
                   <h3 className={`text-base font-medium ${isActive || isCompleted ? 'text-white' : 'text-[#666666]'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[#666666] mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Decorative rotating square */}
      <div className="absolute bottom-8 right-8 w-12 h-12 border border-et-red opacity-20 animate-[spin_10s_linear_infinite] z-10"></div>
      
      {/* ET Background watermark */}
      <div className="absolute bottom-[-10px] right-4 text-[120px] font-black text-[#1A1A1A] leading-none pointer-events-none z-0">
        ET
      </div>
    </div>
  )
}
