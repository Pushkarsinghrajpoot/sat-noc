"use client"

import { useState } from "react"

interface FeatureTab {
  id: string
  label: string
  badge?: string
}

const tabs: FeatureTab[] = [
  { id: "prevention", label: "Prevention", badge: "Core" },
  { id: "automation", label: "Automation" },
  { id: "visibility", label: "Visibility" },
  { id: "intelligence", label: "Intelligence" },
]

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("prevention")

  const renderContent = () => {
    switch (activeTab) {
      case "prevention":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-pretty">
                Prevent outages before they impact customers
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Real-time detection and proactive resolution powered by intelligent alerting, anomaly detection and
                automated runbooks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-xl p-8 h-80 flex items-center justify-center border border-blue-500/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛡️</div>
                  <p className="text-sm text-muted-foreground">Proactive Prevention</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-muted/30 border border-muted rounded-lg p-6 hover:border-muted/80 transition">
                  <p className="text-sm font-semibold text-foreground mb-2">Intelligent alerting</p>
                  <p className="text-sm text-muted-foreground">
                    Reduce noise by up to 90% with deduplication, correlation and root-cause grouping.
                  </p>
                </div>
                <div className="bg-muted/30 border border-muted rounded-lg p-6 hover:border-muted/80 transition">
                  <p className="text-sm font-semibold text-foreground mb-2">Predictive insights</p>
                  <p className="text-sm text-muted-foreground">
                    Capacity trending and performance analysis to prevent resource-constrained incidents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      case "automation":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-pretty">Improve MTTR and service stability</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Incidents are owned end-to-end with layered escalation, coordinated vendor engagement, and automated
                remediation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-muted/30 border border-muted rounded-lg p-6 hover:border-muted/80 transition">
                  <h3 className="font-bold text-lg mb-2">Automated runbooks</h3>
                  <p className="text-sm text-muted-foreground">
                    Self-remediation and health inference to reduce manual intervention.
                  </p>
                </div>
                <div className="bg-muted/30 border border-muted rounded-lg p-6 hover:border-muted/80 transition">
                  <h3 className="font-bold text-lg mb-2">Incident ownership</h3>
                  <p className="text-sm text-muted-foreground">
                    Dedicated engineers troubleshoot and fix issues until full resolution.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-xl p-8 h-80 flex items-center justify-center border border-purple-500/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚙️</div>
                  <p className="text-sm text-muted-foreground">Smart Automation</p>
                </div>
              </div>
            </div>
          </div>
        )
      case "visibility":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-pretty">
                Unified visibility across hybrid infrastructure
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Monitor servers, networks, cloud resources, databases, containers and applications — all in one place
                with custom dashboards.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-xl p-8 h-80 flex items-center justify-center border border-cyan-500/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">👁️</div>
                  <p className="text-sm text-muted-foreground">Complete Visibility</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-muted/30 border border-muted rounded-lg p-6 hover:border-muted/80 transition">
                  <p className="text-sm font-semibold text-foreground mb-2">Multi-platform support</p>
                  <p className="text-sm text-muted-foreground">
                    Servers, cloud, containers, databases, networks, applications and more.
                  </p>
                </div>
                <div className="bg-muted/30 border border-muted rounded-lg p-6 hover:border-muted/80 transition">
                  <p className="text-sm font-semibold text-foreground mb-2">Custom dashboards</p>
                  <p className="text-sm text-muted-foreground">
                    Tailored reporting and SLA tracking for your business requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-pretty">Built for complex environments</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Enterprise-grade NOC automation designed for hybrid cloud, multi-tenant MSP and compliance-heavy
                deployments.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <h2 className="text-4xl sm:text-5xl font-bold mb-12">
        Built for <span className="text-blue-400">complex environments</span>
      </h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 sm:gap-6 mb-12 pb-6 border-b border-muted overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-2 font-medium transition text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {tab.badge && (
              <span className="ml-2 inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </section>
  )
}
