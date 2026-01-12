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
    name: "Core Monitoring & Platform",
    icon: "🖥️",
    features: [
      {
        name: "24×7 Infrastructure Monitoring",
        lite: true,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Servers, Network & Core Services",
        lite: true,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Service & Application Availability Checks",
        lite: true,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Alerts & Ticket Creation",
        lite: true,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Email / Portal Notifications",
        lite: true,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Monthly Availability & Health Report",
        lite: true,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Enterprise Monitoring Platform License",
        lite: true,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Enterprise Ticketing Platform License",
        lite: true,
        pro: true,
        ultra: true,
        enterprise: true,
      },
    ],
  },
  {
    name: "Incident Handling & Operations",
    icon: "🔧",
    features: [
      {
        name: "Incident Ownership till Resolution",
        lite: false,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Guided Troubleshooting & Issue Resolution",
        lite: false,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Service & Application Recovery Actions",
        lite: false,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Handling of Routine Operational Changes",
        lite: false,
        pro: true,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Issue Documentation & Closure Notes",
        lite: false,
        pro: true,
        ultra: true,
        enterprise: true,
      },
    ],
  },
  {
    name: "Engineering, Improvements & Upgrades",
    icon: "⚙️",
    features: [
      {
        name: "Proactive Risk Identification",
        lite: false,
        pro: false,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Planned System Improvements",
        lite: false,
        pro: false,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Approved Changes & Enhancements",
        lite: false,
        pro: false,
        ultra: true,
        enterprise: true,
      },
      {
        name: "OS / Application / Platform Upgrades (Controlled Scope)",
        lite: false,
        pro: false,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Infrastructure Changes (Planned & Approved)",
        lite: false,
        pro: false,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Recurring Issue Elimination",
        lite: false,
        pro: false,
        ultra: true,
        enterprise: true,
      },
      {
        name: "L3 Engineering Oversight & Escalation",
        lite: false,
        pro: false,
        ultra: true,
        enterprise: true,
      },
      {
        name: "Monthly Engineering Review",
        lite: false,
        pro: false,
        ultra: true,
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
              <div className="text-blue-400 font-bold text-lg mb-1">Lite</div>
              <div className="text-sm text-gray-400">SAR 79/month</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg mb-1">Pro</div>
              <div className="text-sm text-gray-400">SAR 149/month</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg mb-1">Ultra</div>
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
