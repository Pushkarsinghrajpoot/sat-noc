"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";

const planDetails = {
  lite: {
    name: "Lite",
    title: "Lite",
    originalPrice: "$149",
    firstYearPrice: "$89",
    offerPrice: "$79",
    monthlyCommitment: "$109",
    responseSLA: "45 minutes",
    prioritySLA: "Watch & alert only",
    description:
      "Perfect for small teams and startups who need 24×7 infrastructure monitoring and alerting.",
    features: [
      "24×7 monitoring of infra & applications",
      "Servers, network devices & Applications monitoring",
      "Alerts & ticket creation & escalation",
      "Monthly availability reporting",
      "Ticket management and escalation procedures",
      "Dashboard access",
    ],
    additionalServices: [
      "Custom alert rules configuration",
      "Integration with your existing tools",
      "Email and Slack notifications",
      "Monthly performance reports",
    ],
  },
  pro: {
    name: "Pro",
    title: "Pro",
    originalPrice: "$249",
    firstYearPrice: "$169",
    offerPrice: "$149",
    monthlyCommitment: "$199",
    responseSLA: "30 minutes",
    prioritySLA: "Monitor & fix common issues",
    description:
      "Ideal for growing businesses with dedicated incident management and proactive monitoring.",
    features: [
      "All Lite features",
      "Incident ownership till resolution",
      "Troubleshooting, fixes & standard changes",
      "ISP / OEM vendor coordination",
      "Alert noise reduction & tuning",
      "Custom dashboards & reports",
      "Priority escalation support",
    ],
    additionalServices: [
      "Advanced incident management",
      "Vendor coordination",
      "Performance trend analysis",
      "Quarterly business reviews",
    ],
  },
  ultra: {
    name: "Ultra",
    title: "Ultra",
    originalPrice: "$299",
    firstYearPrice: "$219",
    offerPrice: "$199",
    monthlyCommitment: "$259",
    responseSLA: "15 minutes",
    prioritySLA: "Prevent issues proactively",
    description:
      "Comprehensive NOC service with proactive problem management and automation capabilities.",
    features: [
      "All Pro features",
      "Proactive problem management",
      "Capacity & performance trends",
      "Automation via runbooks",
      "Advanced impact analysis",
      "Optimization roadmap",
      "Strategic consulting sessions",
    ],
    additionalServices: [
      "Runbook automation creation",
      "Capacity planning and forecasting",
      "Optimization recommendations",
      "Bi-weekly strategic reviews",
    ],
  },
  enterprise: {
    name: "Enterprise",
    title: "Enterprise",
    pricing: "Custom Pricing",
    responseSLA: "Priority/Custom SLA",
    prioritySLA: "Engineering-led NOC",
    description:
      "White-glove, fully customized NOC service with dedicated engineering team and governance.",
    features: [
      "All Ultra features and capabilities",
      "Dedicated service governance",
      "Named escalation manager",
      "Monthly engineering review",
      "Strategic guidance and optimization roadmap",
      "Enterprise NOC platform and ticketing software licenses",
      "Custom integration support",
      "Priority support with 24/7 access to engineers",
    ],
    additionalServices: [
      "Dedicated NOC team",
      "Custom SLA negotiations",
      "Executive reporting",
      "Quarterly business reviews with C-level",
      "Custom development and integrations",
      "Training and knowledge transfer",
    ],
  },
};

export default function PlanPage() {
  const params = useParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
  });

  const [submissionData, setSubmissionData] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    place: string;
    planName: string;
    createdAt: string;
  } | null>(null);

  const planKey = (params.plan as string)?.toLowerCase() || "";
  const plan = planDetails[planKey as keyof typeof planDetails];

  if (!plan) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Plan not found</h1>
          <p className="text-muted-foreground mb-6">
            The plan you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Return to pricing
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: plan.name,
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.place,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.error || "Failed to submit inquiry");
        return;
      }

      const receipt = result.receipt;
      const createdAtFormatted = new Date(receipt.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

      setSubmissionData({
        id: receipt.referenceId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        place: formData.place,
        planName: plan.name,
        createdAt: createdAtFormatted,
      });

      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      alert("Submission failed. Please try again.");
    }
  };

  const downloadReceipt = () => {
    if (!submissionData) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, pageWidth, 40, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text("SAT NOC", 20, 25);

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text("Plan Inquiry Confirmation", 20, 50);

    pdf.setFontSize(11);
    pdf.text(`Reference ID: ${submissionData.id}`, 20, 65);
    pdf.text(`Date: ${submissionData.createdAt}`, 20, 75);

    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, 85, pageWidth - 20, 85);

    pdf.setFont(undefined, "bold");
    pdf.text("Customer Information", 20, 100);

    pdf.setFont(undefined, "normal");
    pdf.text(`Name: ${submissionData.name}`, 20, 115);
    pdf.text(`Email: ${submissionData.email}`, 20, 125);
    pdf.text(`Phone: ${submissionData.phone}`, 20, 135);
    pdf.text(`Location: ${submissionData.place}`, 20, 145);

    pdf.setFont(undefined, "bold");
    pdf.text("Plan Selected", 20, 165);

    pdf.setFont(undefined, "normal");
    pdf.text(`Plan: ${submissionData.planName}`, 20, 180);

    pdf.setFontSize(9);
    pdf.setTextColor(128, 128, 128);
    pdf.text(
      "Thank you for your interest in SAT NOC. Our team will contact you shortly.",
      20,
      pageHeight - 30
    );
    pdf.text("SAT MicroSystems | www.satmz.com", 20, pageHeight - 20);

    pdf.save(
      `SAT-NOC-${submissionData.planName}-${submissionData.id}.pdf`
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4 w-fit"
          >
            <ArrowLeft size={20} />
            Back to pricing
          </Link>
          <h1 className="text-4xl font-bold mb-2">{plan.title}</h1>
          <p className="text-muted-foreground text-lg">{plan.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SECTION */}
          <div>
            {/* Pricing */}
            <div className="bg-muted/30 border border-muted rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Plan Details</h2>

              <div className="space-y-6 mb-8">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Annual Pricing
                  </p>
                  <div className="flex items-baseline gap-3">
                    {plan.originalPrice && (
                      <span className="text-2xl line-through text-muted-foreground">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold">
                      {plan.firstYearPrice}
                    </span>
                    {plan.offerPrice && (
                      <span className="text-green-400 font-semibold text-sm bg-green-500/20 px-2 py-1 rounded">
                        Offer: {plan.offerPrice}
                      </span>
                    )}
                  </div>
                  {plan.monthlyCommitment && (
                    <p className="text-muted-foreground text-sm mt-2">
                      Monthly: {plan.monthlyCommitment}
                    </p>
                  )}
                </div>

                <div className="border-t border-muted pt-6">
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Response SLA:</span>
                    <span className="font-semibold">
                      {plan.responseSLA}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Service Level:
                    </span>
                    <span className="font-semibold text-blue-400">
                      {plan.prioritySLA}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-blue-400 font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Services */}
            <div>
              <h3 className="text-xl font-bold mb-4">Additional Services</h3>
              <ul className="space-y-3">
                {plan.additionalServices.map((service, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-purple-400 font-bold flex-shrink-0">
                      ◆
                    </span>
                    <span className="text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div>
            <div className="bg-muted/30 border border-muted rounded-2xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Get Started</h2>

              {formSubmitted && submissionData ? (
                <div className="space-y-6">
                  <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-6">
                    <div className="text-center mb-6">
                      <div className="text-5xl text-blue-500 mb-3">
                        ✓
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        Thank You!
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Your inquiry has been received
                      </p>
                    </div>

                    <div className="bg-background rounded-lg p-4 space-y-3 text-sm">
                      <div className="flex justify-between items-center border-b border-muted pb-3">
                        <span className="text-muted-foreground">
                          Reference ID
                        </span>
                        <span className="font-mono font-semibold">
                          {submissionData.id}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-muted pb-3">
                        <span className="text-muted-foreground">
                          Date
                        </span>
                        <span className="font-semibold">
                          {submissionData.createdAt}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-muted pb-3">
                        <span className="text-muted-foreground">
                          Plan
                        </span>
                        <span className="font-semibold text-blue-400">
                          {submissionData.planName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-muted pb-3">
                        <span className="text-muted-foreground">
                          Name
                        </span>
                        <span className="font-semibold">
                          {submissionData.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Email
                        </span>
                        <span className="font-semibold text-xs">
                          {submissionData.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadReceipt}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    <Download size={18} />
                    Download Receipt (PDF)
                  </button>

                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground text-center">
                    <p>
                      We'll contact you within 24 hours to discuss the{" "}
                      {submissionData.planName} plan.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-background border border-muted rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-background border border-muted rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-background border border-muted rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Location/Place *
                    </label>
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-background border border-muted rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      placeholder="City, Country"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-background transition"
                  >
                    Get Started
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
