"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import AnimatedBackground from "./animated-background"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is a NOC?",
    answer: `A Network Operations Center (NOC) monitors, manages and troubleshoots infrastructure to ensure uptime and performance. SAT's NOC-as-a-Service provides 24×7 monitoring, incident management, and resolution services for your servers, networks, cloud resources and applications.`,
  },
  {
    question: "Do you operate 24×7?",
    answer:
      "Yes. All SAT NOC plans include continuous 24×7 monitoring and service coverage, including weekends and holidays. Response times vary by plan: Lite (45 mins), Pro (30 mins), Ultra (15 mins), and Enterprise (custom SLAs).",
  },
  {
    question: "What infrastructure do you support?",
    answer:
      "We support servers, cloud (AWS, Azure, GCP), containers, databases, storage, network devices and applications. Whether you run on-premise, cloud-native, or hybrid deployments, SAT NOC provides unified visibility and management.",
  },
  {
    question: "Can you integrate with our existing tools?",
    answer:
      "Yes. We integrate with most monitoring (Prometheus, Grafana, Datadog), ticketing (Jira, ServiceNow), and collaboration platforms (Slack, Teams). No replacement required — SAT NOC works alongside your current stack.",
  },
  {
    question: "Do you support hybrid and multi-cloud?",
    answer:
      "Yes. SAT NOC is built for hybrid and multi-cloud environments. We provide unified monitoring, alerting and management across on-premise, AWS, Azure, GCP and other cloud platforms simultaneously.",
  },
  {
    question: "Is automation included?",
    answer:
      "Automation via runbooks is included in Pro and Ultra plans, with advanced automation and strategic guidance in the Enterprise plan. Automation handles routine troubleshooting, restarts, fixes and standard changes to reduce manual work and improve MTTR.",
  },
]

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Frequently asked questions</h2>
          <p className="text-lg text-gray-300">Everything you need to know about SAT NOC services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-black/70 backdrop-blur-xl border-2 border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition text-left"
              >
                <span className="font-semibold text-white text-lg">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-blue-400 transition-transform ${expandedIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              {expandedIndex === index && (
                <div className="px-6 pb-6 text-gray-300 whitespace-pre-wrap border-t border-white/10 bg-black/30">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
