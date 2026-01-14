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
    tagline: "Watch & alert only",
    storage: "24×7 active monitoring",
    features: "Watch & alert only",
    originalPrice: 149,
    price: 79,
    badge: "January Offer",
    cta: "Get Lite",
    ctaType: "primary",
    detailedFeatures: [
      "Response SLA: 45 minutes",
      "Device Pack: 1–300 devices",
      "24×7 active watch over your IT environment",
      "Real-time alerts with full coordination",
      "Enterprise monitoring and ticketing platform license bundled",
      "Health dashboard with clear system visibility",
    ],
  },
  {
    name: "Pro ⭐",
    tagline: "Monitor and fix common issues",
    storage: "Monitor, fix & own issues",
    features: "Monitor and fix common issues",
    originalPrice: 249,
    price: 149,
    badge: "January Offer",
    cta: "Get Pro",
    ctaType: "primary",
    detailedFeatures: [
      "Response SLA: 30 minutes",
      "Device Pack: 1–300 devices",
      "All Lite features",
      "Fixing issues, not just detecting them",
      "Day-to-day operational work to keep existing IT running reliably",
      "Execution of standard operational procedures",
    ],
  },
  {
    name: "Ultra",
    tagline: "Prevent issues proactively with senior engineering support",
    storage: "Proactive engineering & planning",
    features: "Proactively prevent issues with senior engineering support",
    originalPrice: 349,
    price: 249,
    badge: "January Offer",
    cta: "Get Ultra",
    ctaType: "primary",
    detailedFeatures: [
      "Response SLA: 15 minutes",
      "Device Pack: 1–300 devices",
      "All Pro features",
      "Proactive issue handling using automation and trends",
      "Engineering work involving design and planning",
      "Expansion, restructuring, or advanced technical changes",
      "Assigned L3 engineer for expert guidance and escalation",
      "Business-aligned technical reporting",
    ],
  },
]

export default function PricingCards() {
  const [modalOpen, setModalOpen] = useState(false)
  const [coveragePopupOpen, setCoveragePopupOpen] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string
    price: number
    originalPrice: number
  } | null>(null)

  const toggleCardExpansion = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }

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
              className="h-full rounded-2xl p-6 bg-black/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col"
            >
              {tier.badge && (
                <div className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full mb-4 self-start">
                  {tier.badge}
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 text-blue-400">
                {tier.name}
              </h3>

              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                {tier.tagline}
              </p>

              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="text-sm text-gray-400 line-through mb-1">
                  SAR {tier.originalPrice}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  SAR {tier.price}
                  <span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
                <div className="text-xs text-green-400 font-medium">
                  Save {Math.round(((tier.originalPrice - tier.price) / tier.originalPrice) * 100)}% • First 9 customers only
                </div>
              </div>

              <div className="flex-1 mb-6">
                <div className="text-lg font-semibold text-white mb-4">{tier.storage}</div>
                <div className="space-y-3">
                  {tier.detailedFeatures.slice(0, expandedCards.has(index) ? tier.detailedFeatures.length : 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {tier.detailedFeatures.length > 3 && (
                  <button
                    onClick={() => toggleCardExpansion(index)}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors mt-2"
                  >
                    <span className="text-lg">
                      {expandedCards.has(index) ? '−' : '+'}
                    </span>
                    {expandedCards.has(index) ? 'Show less' : `Show ${tier.detailedFeatures.length - 3} more features`}
                  </button>
                )}
              </div>

              <button
                onClick={() => openCalculator(tier)}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 ${
                  tier.ctaType === "primary"
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    : "border-2 border-gray-600 hover:border-gray-500 text-white hover:bg-white/5"
                }`}
              >
                {tier.cta}
                <ArrowRight size={16} />
              </button>
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
          
          <div className="relative w-full max-w-5xl bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Supported Devices & Platforms</h2>
                  <p className="text-gray-300">
                    Customers may include any number and combination of the following devices or platforms.
                    Each selected item is counted as a separate managed device or platform under the chosen service plan.
                  </p>
                </div>
                <button
                  onClick={() => setCoveragePopupOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white ml-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Coverage Table */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/30">
                        <th className="px-6 py-4 text-left text-blue-400 font-semibold">Category</th>
                        <th className="px-6 py-4 text-left text-blue-400 font-semibold">Devices / Systems Covered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                          <span className="text-xl">🖥️</span> Compute & Platforms
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          Physical servers (Dell, HPE, Lenovo), virtual machines (VMware, Hyper-V, KVM), cloud compute platforms such as AWS EC2, Azure VM, OCI Compute, and GCP Compute, as well as file servers.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                          <span className="text-xl">💾</span> Backup & Recovery
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          Backup platforms including Veeam, Acronis, and Commvault.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                          <span className="text-xl">🌐</span> Network & Connectivity
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          Core switches, access switches, routers, wireless controllers, and wireless access points.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                          <span className="text-xl">🔒</span> Security & Identity
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          Firewalls, secure web gateways/proxies, SIEM and log platforms, IAM/PAM platforms.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                          <span className="text-xl">📊</span> Productivity Platforms
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          Microsoft 365 core services (Exchange Online, SharePoint Online, OneDrive), Microsoft Teams (health and availability), Active Directory, Azure AD (Entra ID), email flow and mailbox availability.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                          <span className="text-xl">📹</span> Physical & Edge Systems
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          CCTV systems (IP cameras, NVRs, VMS), access control systems, time & attendance systems, IoT and edge gateways.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Note Section */}
              <div className="mb-6">
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📝</span>
                    <div>
                      <h4 className="font-semibold text-yellow-400 mb-1">Note</h4>
                      <p className="text-sm text-gray-300">
                        The above list is indicative. Additional standard business IT devices or centrally managed platforms may be included depending on scope and the selected service plan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Golden Rule Section */}
              <div>
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">⚡</span>
                    <div>
                      <h4 className="font-semibold text-green-400 mb-1">Golden Rule</h4>
                      <p className="text-sm text-gray-300">
                        A management server is treated as a managed server — not as the environment or devices it supervises.
                      </p>
                    </div>
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
