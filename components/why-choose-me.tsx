"use client"

import { Search, Building, DollarSign } from "lucide-react"

export default function WhyChooseMe() {
  const steps = [
    {
      number: "1",
      title: "Purchase Property",
      description: "I help you find the perfect property that meets your investment goals and personal preferences, negotiating the best possible terms."
    },
    {
      number: "2",
      title: "Build Property",
      description: "I connect you with trusted professionals to renovate or develop your property, maximizing its potential and value."
    },
    {
      number: "3",
      title: "Sell the New Property",
      description: "I market your property to the right audience, ensuring you receive top dollar for your investment with a strategic selling approach."
    }
  ]

  return (
    <section id="process" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-[#1a2e4c] mb-16 font-light">
          My Process
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-[#f8f5f2] rounded-lg p-8"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-serif font-medium text-[#1a2e4c]">{step.number}</span>
                </div>
                <h3 className="text-xl font-serif text-[#1a2e4c] text-center">{step.title}</h3>
              </div>
              <p className="text-[#1a2e4c]/70 font-serif leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
