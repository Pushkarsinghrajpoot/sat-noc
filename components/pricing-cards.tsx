"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import PricingCalculatorModal from "./pricing-calculator-modal"

interface PricingTier {
  name: string
  tagline: string
  storage: string
  features: string
  originalPrice: number
  price: number
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
    tagline: "Always-on visibility and alerts for every device",
    storage: "24×7 active monitoring",
    features: "Watch & Alert",
    originalPrice: 149,
    price: 79,
    badge: "January Offer",
    cta: "Get Lite",
    ctaType: "primary",
    detailedFeatures: [
      "Response SLA: 45 minutes",
      "24×7 active watch over your IT environment",
      "Real-time alerts with full coordination",
      "Enterprise monitoring and ticketing platform license bundled",
      "Health dashboard with clear system visibility",
      "First 9 customers get Mini Projector",
    ],
  },
  {
    name: "Pro",
    tagline: "Incident ownership and issue resolution per device",
    storage: "Monitor, fix & own issues",
    features: "Monitor & fix common issues",
    originalPrice: 249,
    price: 149,
    badge: "January Offer",
    cta: "Get Pro",
    ctaType: "primary",
    detailedFeatures: [
      "Response SLA: 30 minutes",
      "All Lite features",
      "Fixing issues, not just detecting them",
      "Handling of routine changes",
      "Technical governance",
      "Monthly executive technical review with recommendations",
      "First 9 customers get Tablet",
    ],
  },
  {
    name: "Ultra",
    tagline: "Proactive optimization and senior engineering oversight",
    storage: "Prevent Issues and L3 Engineering",
    features: "Prevent issues proactively",
    originalPrice: 299,
    price: 199,
    badge: "January Offer",
    cta: "Get Ultra",
    ctaType: "primary",
    detailedFeatures: [
      "Response SLA: 15 minutes",
      "All Smart features",
      "Proactive issue handling using automation and trends",
      "Key system changes, upgrades, and migrations",
      "Assigned L3 engineer for expert guidance and escalation",
      "Business-aligned technical reporting",
      "First 9 customers get 2 Months Free + White-Glove Onboarding",
    ],
  },
]

export default function PricingCards() {
  const [modalOpen, setModalOpen] = useState(false)
  const [coveragePopupOpen, setCoveragePopupOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string
    price: number
    originalPrice: number
  } | null>(null)

  const openCalculator = (tier: typeof tiers[0]) => {
    setSelectedPlan({
      name: tier.name,
      price: tier.price,
      originalPrice: tier.originalPrice,
    })
    setModalOpen(true)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-yellow-400 to-blue-500 rounded-lg transform rotate-45" />
        </div>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          One price. One device.{" "}
          <span className="text-blue-500">Total IT operations</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
          We monitor, manage, and support your IT operations — billed per device.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          {/* <Link 
            href="/plans/pro"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105"
          >
            Get Pro - Most Popular
            <ArrowRight size={18} />
          </Link> */}
          <button
            onClick={() => setCoveragePopupOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105"
          >
            View devices & coverage
            <ArrowRight size={18} />
          </button>
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
                <div className="text-sm line-through text-gray-500 mb-1">
                  SAR {tier.originalPrice}
                </div>
                <div className="text-2xl font-bold text-white">
                  SAR {tier.price}/month
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Per system pricing
                </div>
              </div>

              <button
                onClick={() => openCalculator(tier)}
                className={`w-full py-3 px-6 rounded-full font-medium text-center transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 mb-6 ${
                  tier.ctaType === "primary"
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30"
                    : "border-2 border-gray-600 hover:border-gray-500 text-white hover:bg-white/5"
                }`}
              >
                {tier.cta}
                <ArrowRight size={16} />
              </button>

              <div className="pt-6 border-t border-gray-700 space-y-3">
                {tier.detailedFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
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

      <PricingCalculatorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan || undefined}
      />

      {/* Coverage Popup */}
      {coveragePopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setCoveragePopupOpen(false)}
          />
          
          <div className="relative w-full max-w-2xl bg-black/90 backdrop-blur-xl border-2 border-blue-500/40 rounded-3xl p-8 shadow-2xl">
            <button
              onClick={() => setCoveragePopupOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-white mb-6">Devices & Coverage</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Supported Devices</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Servers (Physical & Virtual)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Network Devices (Routers, Switches, Firewalls)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Applications & Services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Cloud Infrastructure (AWS, Azure, GCP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Databases & Storage Systems</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Coverage Scope</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/40 rounded-lg border border-blue-500/30">
                    <h4 className="font-semibold text-white mb-2">Lite</h4>
                    <p className="text-sm text-gray-400">24×7 active monitoring</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-lg border border-blue-500/30">
                    <h4 className="font-semibold text-white mb-2">Pro</h4>
                    <p className="text-sm text-gray-400">Monitor, fix & own issues</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-lg border border-blue-500/30">
                    <h4 className="font-semibold text-white mb-2">Ultra</h4>
                    <p className="text-sm text-gray-400">Prevent Issues and L3 Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
