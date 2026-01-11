"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Check, ArrowLeft, Download } from "lucide-react"
import jsPDF from "jspdf"

export default function EnterprisePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    employees: "",
    challenges: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [submissionData, setSubmissionData] = useState<{
    id: string
    companyName: string
    email: string
    phone: string
    employees: string
    createdAt: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/enterprise", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await res.json();

  if (!result.success) {
    alert(result.error || "Failed to submit");
    return;
  }

  const receipt = result.receipt;

  setSubmissionData({
    id: receipt.referenceId,
    companyName: receipt.companyName,
    email: receipt.email,
    phone: receipt.phone,
    employees: receipt.employees,
    createdAt: new Date(receipt.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  setSubmitted(true);
};


  const downloadReceipt = () => {
    if (!submissionData) return

    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Header
    pdf.setFillColor(139, 92, 246) // Purple
    pdf.rect(0, 0, pageWidth, 40, "F")

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.text("SAT NOC", 20, 25)

    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(14)
    pdf.text("Enterprise Inquiry Confirmation", 20, 50)

    // Content
    pdf.setFontSize(11)
    pdf.text(`Reference ID: ${submissionData.id}`, 20, 65)
    pdf.text(`Date: ${submissionData.createdAt}`, 20, 75)

    // Divider
    pdf.setDrawColor(200, 200, 200)
    pdf.line(20, 85, pageWidth - 20, 85)

    // Company Details
    pdf.setFontSize(12)
    pdf.setFont(undefined, "bold")
    pdf.text("Company Information", 20, 100)

    pdf.setFont(undefined, "normal")
    pdf.setFontSize(11)
    pdf.text(`Company: ${submissionData.companyName}`, 20, 115)
    pdf.text(`Email: ${submissionData.email}`, 20, 125)
    pdf.text(`Phone: ${submissionData.phone}`, 20, 135)
    pdf.text(`Employees: ${submissionData.employees}`, 20, 145)

    // Plan Details
    pdf.setFont(undefined, "bold")
    pdf.text("Plan Type", 20, 165)

    pdf.setFont(undefined, "normal")
    pdf.text("SAT NOC Enterprise", 20, 180)

    // Footer
    pdf.setFontSize(9)
    pdf.setTextColor(128, 128, 128)
    pdf.text(
      "Thank you for your interest in SAT NOC Enterprise. Our team will contact you within 24 hours.",
      20,
      pageHeight - 30,
    )
    pdf.text("SAT MicroSystems | www.satmz.com", 20, pageHeight - 20)

    pdf.save(`SAT-NOC-Enterprise-${submissionData.id}.pdf`)
  }

  const features = [
    "Dedicated engineering-led NOC team",
    "Custom SLA tailored to your needs",
    "Priority incident management",
    "Advanced automation & runbooks",
    "Dedicated account manager",
    "Custom integrations & APIs",
    "White-glove onboarding",
    "Quarterly business reviews",
    "Performance optimization roadmap",
    "24/7 priority support",
    "Custom dashboards & reporting",
    "Multi-cloud infrastructure support",
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 border-b border-muted">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/#pricing">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
              <ArrowLeft size={20} />
              Back to Plans
            </button>
          </Link>
        </div>
      </div>

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full mb-4">
              Enterprise
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">SAT NOC Enterprise</h1>
            <p className="text-xl text-muted-foreground">
              Engineering-led NOC service tailored to your organization's needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold mb-8">What's Included</h2>
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-muted/30 border border-muted rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                {submitted && submissionData ? (
                  <div className="space-y-6">
                    <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-6">
                      <div className="text-center mb-6">
                        <div className="text-5xl text-purple-500 mb-3">✓</div>
                        <h3 className="text-lg font-bold text-foreground">Thank You!</h3>
                        <p className="text-sm text-muted-foreground mt-2">Your inquiry has been received</p>
                      </div>

                      <div className="bg-background rounded-lg p-4 space-y-3 text-sm">
                        <div className="flex justify-between items-center border-b border-muted pb-3">
                          <span className="text-muted-foreground">Reference ID</span>
                          <span className="font-mono font-semibold">{submissionData.id}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-muted pb-3">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-semibold">{submissionData.createdAt}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-muted pb-3">
                          <span className="text-muted-foreground">Company</span>
                          <span className="font-semibold">{submissionData.companyName}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-muted pb-3">
                          <span className="text-muted-foreground">Contact</span>
                          <span className="font-semibold text-xs">{submissionData.email}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Plan Type</span>
                          <span className="font-semibold text-purple-400">Enterprise</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={downloadReceipt}
                      className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      <Download size={18} />
                      Download Receipt (PDF)
                    </button>

                    <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground text-center">
                      <p>We'll contact you within 24 hours to discuss your enterprise NOC solution.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-background border border-muted focus:border-blue-500 focus:outline-none"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-background border border-muted focus:border-blue-500 focus:outline-none"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-background border border-muted focus:border-blue-500 focus:outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Number of Employees</label>
                      <select
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-background border border-muted focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select range</option>
                        <option value="1-50">1-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="501-1000">501-1000</option>
                        <option value="1000+">1000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Current Challenges</label>
                      <textarea
                        name="challenges"
                        value={formData.challenges}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-muted focus:border-blue-500 focus:outline-none resize-none"
                        placeholder="Tell us about your NOC challenges..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                      Submit Your Information
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-muted">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">Custom</div>
              <p className="text-muted-foreground">Pricing tailored to your needs</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">Dedicated</div>
              <p className="text-muted-foreground">Engineering team assigned to you</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">Support</div>
              <p className="text-muted-foreground">24/7 priority support included</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
