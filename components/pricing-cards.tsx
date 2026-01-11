"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Zap } from "lucide-react"

interface PricingTier {
  name: string
  originalPrice?: string
  firstYearPrice: string
  offerPrice?: string
  monthlyCommitment: string
  responseSLA: string
  prioritySLA: string
  badge?: string
  cta: string
  ctaDescription?: string
  features: string[]
  highlighted?: boolean
  gift?: { name: string; discount: string }
}

const tiers: PricingTier[] = [
  {
    name: "Lite",
    originalPrice: "$149",
    firstYearPrice: "$89",
    offerPrice: "$79",
    monthlyCommitment: "$109",
    highlighted: true,
    badge: "⭐",
    responseSLA: "45 min",
    prioritySLA: "Watch & alert only",
    cta: "Get Lite",
    ctaDescription: "First 9 customers get Mini Projector",
    gift: { name: "Mini Projector", discount: "Yes" },
    features: [
      "24×7 monitoring of infra & applications",
      "Servers, network devices & Applications monitoring",
      "Alerts & ticket creation & escalation",
      "Monthly availability reporting",
    ],
  },
  {
    name: "Pro",
    originalPrice: "$249",
    firstYearPrice: "$169",
    offerPrice: "$149",
    monthlyCommitment: "$199",
    responseSLA: "30 mins",
    prioritySLA: "Monitor & fix common issues",
    badge: "⭐⭐⭐ Most Popular",
    highlighted: true,
    cta: "Get Pro",
    ctaDescription: "First 9 customers get Tablet",
    gift: { name: "Tablet", discount: "Yes" },
    features: [
      "All Lite features",
      "Incident ownership till resolution",
      "Troubleshooting, fixes & standard changes",
      "ISP / OEM vendor coordination",
      "Alert noise reduction & tuning",
      "Custom dashboards & reports",
    ],
  },
  {
    name: "Ultra",
    originalPrice: "$299",
    firstYearPrice: "$219",
    offerPrice: "$199",
    badge: "⭐⭐ Premium Choice",
    highlighted: true,
    monthlyCommitment: "$259",
    responseSLA: "15 mins",
    prioritySLA: "Prevent issues proactively",
    cta: "Get Ultra",
    ctaDescription: "First 9 customers get 2 Months Free Service",
    gift: { name: "2 Months Free Service", discount: "Included" },
    features: [
      "All Pro features",
      "Proactive problem management",
      "Capacity & performance trends",
      "Automation via runbooks",
      "Advanced impact analysis",
      "Optimization roadmap",
    ],
  },
]

export default function PricingCards() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8 p-4 bg-amber-500/15 border border-amber-500/30 rounded-xl flex items-center gap-3 text-center justify-center">
        <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <p className="text-sm text-amber-900 dark:text-amber-200 font-semibold">
          🎁 <span className="font-bold">Limited Time Offer!</span> First 9 customers get special pricing & exclusive
          gifts. Offer ends soon!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tiers.map((tier, index) => (
          <div key={index} className="h-full">
            <Link 
              href={`/plans/${tier.name.toLowerCase()}`} 
              className={`block rounded-2xl p-8 border transition-all duration-300 h-full transform hover:scale-105 hover:shadow-2xl hover:border-blue-500 ${
                tier.highlighted
                  ? "border-blue-500/50 bg-gradient-to-blue from-blue-500/10 to-transparent shadow-lg"
                  : "border-muted bg-card"
              }`}
            >
              {tier.badge && (
                <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full mb-4">
                  {tier.badge}
                </div>
              )}

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2">SAT NOC {tier.name}</h3>

              <div className="mb-6 pb-6 border-b border-muted">
                <div className="text-sm text-muted-foreground mb-3">Annual pricing:</div>
                {tier.originalPrice && (
                  <div className="text-sm line-through text-muted-foreground mb-1">{tier.originalPrice}</div>
                )}
                <div className="flex gap-4 items-baseline mb-4">
                  <div className="text-3xl font-bold">{tier.firstYearPrice}</div>
                  {tier.offerPrice && (
                    <div className="text-green-400 font-semibold text-sm bg-green-500/20 px-2 py-1 rounded flex items-center gap-1">
                      <span>Offer: {tier.offerPrice}</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-4">Monthly: {tier.monthlyCommitment}</div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response SLA:</span>
                    <span className="font-semibold text-foreground">{tier.responseSLA}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Level:</span>
                    <span className="font-semibold text-blue-400">{tier.prioritySLA}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button - This is now clickable as part of the card */}
              <div 
                className={`w-full py-3 rounded-full font-medium mb-2 text-center transition ${
                  tier.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-muted hover:bg-muted/50"
                }`}
              >
                {tier.cta}
              </div>

              {tier.ctaDescription && (
                <p className="text-xs text-muted-foreground text-center mb-6">{tier.ctaDescription}</p>
              )}

              {/* Features Toggle */}
              <div 
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setExpandedIndex(expandedIndex === index ? null : index)
                }}
                className="flex items-center justify-between w-full text-sm font-semibold text-blue-400 hover:text-blue-300 transition cursor-pointer"
              >
                {expandedIndex === index ? "Hide" : "View"} key inclusions
                <ChevronDown
                  size={16}
                  className={`transition-transform ${expandedIndex === index ? "rotate-180" : ""}`}
                />
              </div>

              {/* Features List */}
              {expandedIndex === index && (
                <div className="space-y-3 border-t border-muted pt-4 mt-4">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3 text-sm">
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      <div className="p-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl text-center border border-purple-500/30 mb-8">
        <h3 className="text-2xl font-bold mb-2">Need a Custom Solution?</h3>
        <p className="text-muted-foreground mb-6">
          Our Enterprise plan is tailored to your organization's unique requirements.
        </p>
        <Link href="/enterprise">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition">
            Explore Enterprise Plan
          </button>
        </Link>
      </div>
    </section>
  )
}
