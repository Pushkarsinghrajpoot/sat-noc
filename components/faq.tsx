"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

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
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">Frequently asked questions</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-muted rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 hover:bg-muted/30 transition text-left"
            >
              <span className="font-semibold text-foreground">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`flex-shrink-0 transition-transform ${expandedIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {expandedIndex === index && (
              <div className="px-6 pb-6 text-muted-foreground whitespace-pre-wrap border-t border-muted">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
