"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"

interface PricingTier {
  name: string
  tagline: string
  storage: string
  features: string
  originalPrice?: string
  price: string
  offerPrice?: string
  cta: string
  ctaType: "primary" | "secondary"
  badge?: string
  superscript?: string
  detailedFeatures: string[]
}

const tiers: PricingTier[] = [
  {
    name: "Lite",
    tagline: "Get more done with 24×7 monitoring and alert management for your infrastructure.",
    storage: "Response SLA: 45 min",
    features: "Watch & alert only",
    originalPrice: "SAR 149",
    price: "SAR 79/month",
    
    cta: "Get Lite",
    ctaType: "primary",
    detailedFeatures: [
      "24×7 monitoring of infra & applications",
      "Servers, network devices & Applications monitoring",
      "Alerts & ticket creation & escalation",
      "Monthly availability reporting",
      "First 9 customers get Mini Projector",
    ],
  },
  {
    name: "Pro",
    tagline: "Higher service level with incident ownership and complete troubleshooting support.",
    storage: "Response SLA: 30 mins",
    features: "Monitor & fix common issues",
    originalPrice: "SAR 249",
    price: "SAR 149/month",
    cta: "Get Pro",
    ctaType: "primary",
    detailedFeatures: [
      "All Lite features",
      "Incident ownership till resolution",
      "Troubleshooting, fixes & standard changes",
      "ISP / OEM vendor coordination",
      "Alert noise reduction & tuning",
      "Custom dashboards & reports",
      "First 9 customers get Tablet",
    ],
  },
  {
    name: "Ultra",
    tagline: "Push what's possible with proactive problem management and optimization roadmap.",
    storage: "Response SLA: 15 mins",
    features: "Prevent issues proactively",
    price: "SAR 199/month",
    cta: "Get Ultra",
    ctaType: "primary",
    detailedFeatures: [
      "All Pro features",
      "Proactive problem management",
      "Capacity & performance trends",
      "Automation via runbooks",
      "Advanced impact analysis",
      "Optimization roadmap",
      "First 9 customers get 2 Months Free Service",
    ],
  },
]

export default function PricingCards() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-yellow-400 to-blue-500 rounded-lg transform rotate-45" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          Power your uptime with a{" "}
          <span className="text-blue-500">SAT NOC</span> plan
        </h1>
        <div className="mt-8">
          <Link 
            href="/plans/pro"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105"
          >
            Get SAT NOC Pro - Most Popular
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tiers.map((tier, index) => (
          <div 
            key={index} 
            className="relative group"
          >
            <div 
              className="h-full rounded-3xl p-8 bg-black/40 backdrop-blur-sm border-2 border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 flex flex-col"
              style={{
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.1)',
              }}
            >
              {tier.badge && (
                <div className="inline-block px-3 py-1 bg-white text-black text-xs font-semibold rounded-full mb-4 self-start">
                  {tier.badge}
                </div>
              )}

              <h3 className="text-3xl font-bold mb-3">
                <span className="text-blue-400">{tier.name}</span>
                {tier.superscript && (
                  <sup className="text-base ml-1">{tier.superscript}</sup>
                )}
              </h3>

              <p className="text-base text-gray-300 mb-6 leading-relaxed">
                {tier.tagline}
              </p>

              <div className="mb-6 space-y-2">
                <div className="text-2xl font-bold text-white">{tier.storage}</div>
                <div className="text-sm text-gray-400">{tier.features}</div>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-700">
                {tier.originalPrice && (
                  <div className="text-sm line-through text-gray-500 mb-1">
                    {tier.originalPrice}
                  </div>
                )}
                <div className="text-xl font-semibold text-white">
                  {tier.price}
                </div>
              </div>

              <Link 
                href={`/plans/${tier.name.split(' ') }`}
                className={`w-full py-3 px-6 rounded-full font-medium text-center transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 mb-4 ${
                  tier.ctaType === "primary"
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30"
                    : "border-2 border-gray-600 hover:border-gray-500 text-white hover:bg-white/5"
                }`}
              >
                {tier.cta}
                <ArrowRight size={16} />
              </Link>

              <button 
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full text-sm font-medium text-blue-400 hover:text-blue-300 transition inline-flex items-center justify-center gap-1"
              >
                View plan features
                <Plus size={16} className={`transition-transform ${expandedIndex === index ? "rotate-45" : ""}`} />
              </button>

              {expandedIndex === index && (
                <div className="mt-6 pt-6 border-t border-gray-700 space-y-3">
                  {tier.detailedFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <Link 
          href="#compare"
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium transition-all border border-white/20"
        >
          Compare plans
        </Link>
      </div>

      <div className="p-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl text-center border border-purple-500/30 backdrop-blur-sm mb-8">
        <h3 className="text-2xl font-bold mb-2">Need a Custom Solution?</h3>
        <p className="text-gray-300 mb-6">
          Our Enterprise plan is tailored to your organization's unique requirements.
        </p>
        <Link href="/enterprise">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30">
            Explore Enterprise Plan
          </button>
        </Link>
      </div>
    </section>
  )
}
