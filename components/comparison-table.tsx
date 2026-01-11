"use client"

import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"

interface FeatureCategory {
  name: string
  icon?: string
  features: {
    name: string
    description?: string
    lite: boolean | string
    pro: boolean | string
    ultra: boolean | string
    enterprise: boolean | string
  }[]
}

const featureCategories: FeatureCategory[] = [
  {
    name: "Best For",
    icon: "💡",
    features: [
      {
        name: "Plan Focus",
        lite: "Watch & Alert",
        pro: "Monitor & fix common issues",
        ultra: "Prevent issues proactively with senior engineering support",
        enterprise: "Custom enterprise solution",
      },
    ],
  },
  {
    name: "Key Inclusions",
    icon: "🔑",
    features: [
      {
        name: "24×7 active watch over your IT environment",
        lite: true,
        pro: "All Lite features",
        ultra: "All Smart features",
        enterprise: true,
      },
      {
        name: "Real-time alerts with full coordination",
        lite: true,
        pro: "Fixing issues, not just detecting them",
        ultra: "Proactive issue handling using automation and trends",
        enterprise: true,
      },
      {
        name: "Enterprise monitoring and ticketing platform license bundled",
        lite: true,
        pro: "Handling of routine changes",
        ultra: "Key system changes, upgrades, and migrations",
        enterprise: true,
      },
      {
        name: "Health dashboard with clear system visibility",
        lite: true,
        pro: "Technical governance and expert consultations",
        ultra: "Assigned L3 engineer for expert guidance and escalation",
        enterprise: true,
      },
      {
        name: "Additional Features",
        lite: false,
        pro: "Monthly executive technical review with recommendations",
        ultra: "Business-aligned technical reporting",
        enterprise: true,
      },
    ],
  },
  {
    name: "Response SLA",
    icon: "⏱️",
    features: [
      {
        name: "Response Time",
        lite: "45 minutes",
        pro: "30 minutes",
        ultra: "15 minutes",
        enterprise: "Custom",
      },
    ],
  },
  {
    name: "Pricing",
    icon: "💰",
    features: [
      {
        name: "List Price (Per Device / Month)",
        lite: "SAR 149",
        pro: "SAR 249",
        ultra: "SAR 299",
        enterprise: "Custom",
      },
      {
        name: "Annual Commitment Price (Year-1)",
        lite: "SAR 89",
        pro: "SAR 169",
        ultra: "SAR 219",
        enterprise: "Custom",
      },
      {
        name: "Launch Offer Price (Valid until 31 January)",
        lite: "SAR 79 + Gift (Mini projector)",
        pro: "SAR 149 + Gift (Tablet)",
        ultra: "SAR 199 + Gift (2 Months Free + White-Glove Onboarding)",
        enterprise: "Contact Sales",
      },
      {
        name: "Flexible Monthly Price",
        lite: "SAR 109",
        pro: "SAR 199",
        ultra: "SAR 259",
        enterprise: "Custom",
      },
    ],
  },
]

export default function ComparisonTable() {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0, 1, 2, 3]))

  const toggleCategory = (index: number) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <section id="compare" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-5 gap-4 mb-8 sticky top-0 bg-black/60 backdrop-blur-lg z-10 py-4 rounded-2xl px-4">
            <div className="col-span-1"></div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg mb-1">SAT NOC Lite</div>
              <div className="text-sm text-gray-400">SAR 79/month</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg mb-1">SAT NOC Pro</div>
              <div className="text-sm text-gray-400">SAR 149/month</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg mb-1">SAT NOC Ultra</div>
              <div className="text-sm text-gray-400">SAR 199/month</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg mb-1">Enterprise</div>
              <div className="text-sm text-gray-400">Custom</div>
            </div>
          </div>

          {featureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="w-full flex items-center gap-3 px-6 py-4 bg-black/40 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all mb-3"
              >
                {category.icon && <span className="text-2xl">{category.icon}</span>}
                <span className="text-xl font-bold text-white">{category.name}</span>
                <ChevronDown
                  size={20}
                  className={`ml-auto text-blue-400 transition-transform ${
                    expandedCategories.has(categoryIndex) ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedCategories.has(categoryIndex) && (
                <div className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="grid grid-cols-5 gap-4 px-6 py-4 bg-black/20 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-gray-700 transition-all"
                    >
                      <div className="col-span-1 text-white font-medium text-sm">
                        {feature.name}
                      </div>
                      <div className="text-center flex items-center justify-center">
                        {typeof feature.lite === "boolean" ? (
                          feature.lite ? (
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                              <Check size={14} className="text-white" />
                            </div>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )
                        ) : (
                          <span className="text-gray-300 text-sm">{feature.lite}</span>
                        )}
                      </div>
                      <div className="text-center flex items-center justify-center">
                        {typeof feature.pro === "boolean" ? (
                          feature.pro ? (
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                              <Check size={14} className="text-white" />
                            </div>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )
                        ) : (
                          <span className="text-gray-300 text-sm">{feature.pro}</span>
                        )}
                      </div>
                      <div className="text-center flex items-center justify-center">
                        {typeof feature.ultra === "boolean" ? (
                          feature.ultra ? (
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                              <Check size={14} className="text-white" />
                            </div>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )
                        ) : (
                          <span className="text-gray-300 text-sm">{feature.ultra}</span>
                        )}
                      </div>
                      <div className="text-center flex items-center justify-center">
                        {typeof feature.enterprise === "boolean" ? (
                          feature.enterprise ? (
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                              <Check size={14} className="text-white" />
                            </div>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )
                        ) : (
                          <span className="text-gray-300 text-sm">{feature.enterprise}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
