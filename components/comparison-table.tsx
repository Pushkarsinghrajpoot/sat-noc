"use client"

import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"

interface FeatureCategory {
  name: string
  icon?: string
  features: {
    name: string
    description?: string
    lite: boolean | string | { original: string; current: string }
    pro: boolean | string | { original: string; current: string }
    ultra: boolean | string | { original: string; current: string }
  }[]
}

const featureCategories: FeatureCategory[] = [
  {
    name: "Best For",
    icon: "🎯",
    features: [
      {
        name: "Target Use Case",
        lite: "Watch & alert only",
        pro: "Monitor and fix common issues",
        ultra: "Proactively prevent issues with senior engineering support",
      },
    ],
  },
  {
    name: "Key Inclusions",
    icon: "📋",
    features: [
      {
        name: "24×7 active watch over your IT environment",
        lite: true,
        pro: true,
        ultra: true,
      },
      {
        name: "Real-time alerts with full coordination",
        lite: true,
        pro: true,
        ultra: true,
      },
      {
        name: "Enterprise monitoring and ticketing platform license bundled",
        lite: true,
        pro: true,
        ultra: true,
      },
      {
        name: "Health dashboard with clear system visibility",
        lite: true,
        pro: true,
        ultra: true,
      },
      {
        name: "Fixing issues, not just detecting them",
        lite: false,
        pro: true,
        ultra: true,
      },
      {
        name: "Day-to-day operational work to keep existing IT running reliably",
        lite: false,
        pro: true,
        ultra: true,
      },
      {
        name: "Execution of standard operational procedures",
        lite: false,
        pro: true,
        ultra: true,
      },
      {
        name: "Proactive issue handling using automation and trends",
        lite: false,
        pro: false,
        ultra: true,
      },
      {
        name: "Engineering work involving design and planning",
        lite: false,
        pro: false,
        ultra: true,
      },
      {
        name: "Migration and upgrades move to implementations",
        lite: false,
        pro: false,
        ultra: true,
      },
      {
        name: "Expansion, restructuring, or advanced technical changes",
        lite: false,
        pro: false,
        ultra: true,
      },
      {
        name: "Assigned L3 engineer for expert guidance and escalation",
        lite: false,
        pro: false,
        ultra: true,
      },
      {
        name: "Business-aligned technical reporting",
        lite: false,
        pro: false,
        ultra: true,
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
      },
    ],
  },
  {
    name: "Device Pack",
    icon: "📱",
    features: [
      {
        name: "Device Range",
        lite: "1–300 devices",
        pro: "1–300 devices",
        ultra: "1–300 devices",
      },
    ],
  },
  {
    name: "Pricing",
    icon: "💰",
    features: [
      {
        name: "List Price (Per Device / Month)",
        lite: "149",
        pro: "249",
        ultra: "349",
      },
      {
        name: "Annual Commitment Price (Year-1)",
        lite: { original: "149", current: "89" },
        pro: { original: "249", current: "169" },
        ultra: { original: "349", current: "269" },
      },
      {
        name: "Launch Offer Price (Valid until 31 January)",
        lite: { original: "149", current: "79" },
        pro: { original: "249", current: "149" },
        ultra: { original: "349", current: "249" },
      },
      {
        name: "Flexible Monthly Price",
        lite: { original: "149", current: "109" },
        pro: { original: "249", current: "199" },
        ultra: { original: "349", current: "259" },
      },
    ],
  },
  {
    name: "Perception",
    icon: "👁️",
    features: [
      {
        name: "Market Position",
        lite: "Fast-moving, volume business",
        pro: "Big leap in services, strong upgrade",
        ultra: "",
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
        <div className="min-w-[600px]">
          <div className="grid grid-cols-4 gap-4 mb-8 sticky top-0 bg-black/90 backdrop-blur-lg z-10 py-4 rounded-2xl px-4">
            <div className="col-span-1"></div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg mb-1">Lite</div>
              <div className="text-sm text-gray-400">SAR 79/month</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg mb-1">Pro ⭐</div>
              <div className="text-sm text-gray-400">SAR 149/month</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg mb-1">Ultra</div>
              <div className="text-sm text-gray-400">SAR 249/month</div>
            </div>
          </div>

          {featureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="w-full flex items-center gap-3 px-6 py-4 bg-black/80 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all mb-3"
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
                      className="grid grid-cols-4 gap-4 px-6 py-4 bg-black/60 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-gray-700 transition-all"
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
                        ) : typeof feature.lite === "object" && feature.lite !== null ? (
                          <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs line-through">{feature.lite.original}</span>
                            <span className="text-green-400 text-sm font-semibold">{feature.lite.current}</span>
                          </div>
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
                        ) : typeof feature.pro === "object" && feature.pro !== null ? (
                          <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs line-through">{feature.pro.original}</span>
                            <span className="text-green-400 text-sm font-semibold">{feature.pro.current}</span>
                          </div>
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
                        ) : typeof feature.ultra === "object" && feature.ultra !== null ? (
                          <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs line-through">{feature.ultra.original}</span>
                            <span className="text-green-400 text-sm font-semibold">{feature.ultra.current}</span>
                          </div>
                        ) : (
                          <span className="text-gray-300 text-sm">{feature.ultra}</span>
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
