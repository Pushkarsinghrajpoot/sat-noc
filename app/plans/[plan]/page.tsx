"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import AnimatedBackground from "@/components/animated-background";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Styles constants
const CARD_STYLE = "bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6";
const INNER_CARD_STYLE = "bg-black/40 rounded-lg p-4 border border-white/10";
const INPUT_STYLE = "w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition";

const planDetails = {
  lite: {
    name: "Lite",
    title: "Lite",
    originalPrice: "SAR 149",
    firstYearPrice: "SAR 89",
    offerPrice: "SAR 79",
    monthlyCommitment: "SAR 109",
    responseSLA: "45 minutes",
    prioritySLA: "Watch & alert only",
    description: "Perfect for small teams and startups who need 24×7 infrastructure monitoring and alerting.",
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
    name: "Pro ⭐",
    title: "Pro ⭐",
    originalPrice: "SAR 249",
    firstYearPrice: "SAR 169",
    offerPrice: "SAR 149",
    monthlyCommitment: "SAR 199",
    responseSLA: "30 minutes",
    prioritySLA: "Monitor & fix common issues",
    description: "Ideal for growing businesses with dedicated incident management and proactive monitoring.",
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
    originalPrice: "SAR 349",
    firstYearPrice: "SAR 269",
    offerPrice: "SAR 249",
    monthlyCommitment: "SAR 259",
    responseSLA: "15 minutes",
    prioritySLA: "Prevent issues proactively",
    description: "Comprehensive NOC service with proactive problem management and automation capabilities.",
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
    description: "White-glove, fully customized NOC service with dedicated engineering team and governance.",
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

// Helper Components
const InfoRow = ({ label, value, bold = false }: { label: string; value: string | number; bold?: boolean }) => (
  <div className="flex justify-between items-center pb-2 border-b border-white/10 last:border-0 last:pb-0">
    <span className="text-sm text-gray-400">{label}</span>
    <span className={`${bold ? 'font-bold text-lg' : 'font-semibold'}`}>{value}</span>
  </div>
);

const FeatureList = ({ items, icon, iconColor }: { items: string[]; icon: string; iconColor: string }) => (
  <ul className="space-y-2.5">
    {items.map((item, idx) => (
      <li key={idx} className="flex gap-2.5">
        <span className={`${iconColor} font-bold flex-shrink-0 mt-0.5`}>{icon}</span>
        <span className="text-gray-200 text-sm">{item}</span>
      </li>
    ))}
  </ul>
);

export default function PlanPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    yearlyPlan: false,
    noOfSystems: 1,
    months: 1,
  });
  const [submissionData, setSubmissionData] = useState<any>(null);

  const planKey = (params.plan as string)?.toLowerCase() || "";
  const plan = planDetails[planKey as keyof typeof planDetails];

  useEffect(() => {
    const systems = searchParams.get('systems');
    const annual = searchParams.get('annual');
    if (systems) setFormData(prev => ({ ...prev, noOfSystems: parseInt(systems) || 1 }));
    if (annual === 'true') setFormData(prev => ({ ...prev, yearlyPlan: true }));
  }, [searchParams]);

  if (!plan) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Plan not found</h1>
          <p className="text-gray-300 mb-6">The plan you're looking for doesn't exist.</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300 font-semibold">
            Return to pricing
          </Link>
        </div>
      </div>
    );
  }

  const calculatePricing = () => {
    if (planKey === 'enterprise') return { monthlyPrice: 0, totalPrice: 0 };

    const prices: any = {
      lite: { yearly: 89, monthly: 79 },
      pro: { yearly: 169, monthly: 149 },
      ultra: { yearly: 269, monthly: 249 },
    };

    const planPrices = prices[planKey];
    if (!planPrices) return { monthlyPrice: 0, totalPrice: 0 };

    const basePrice = formData.yearlyPlan ? planPrices.yearly : planPrices.monthly;
    const monthlyPrice = basePrice * formData.noOfSystems;
    const totalPrice = formData.yearlyPlan ? monthlyPrice * 12 : monthlyPrice * formData.months;

    return { monthlyPrice, totalPrice };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 1 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const pricing = calculatePricing();
      const res = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: plan.name,
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.place,
          yearlyPlan: formData.yearlyPlan,
          noOfSystems: formData.noOfSystems,
          months: formData.months,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.error || "Failed to submit inquiry");
        return;
      }

      const receipt = result.receipt;
      const createdAtFormatted = new Date(receipt.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      setSubmissionData({
        id: receipt.referenceId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        place: formData.place,
        planName: plan.name,
        yearlyPlan: formData.yearlyPlan,
        noOfSystems: formData.noOfSystems,
        months: formData.months,
        monthlyPrice: pricing.monthlyPrice,
        totalPrice: pricing.totalPrice,
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

    // Header
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, pageWidth, 40, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text("SAT NOC", 20, 25);

    // Title
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text("Plan Inquiry Confirmation", 20, 50);

    // Reference & Date
    pdf.setFontSize(11);
    pdf.text(`Reference ID: ${submissionData.id}`, 20, 65);
    pdf.text(`Date: ${submissionData.createdAt}`, 20, 75);
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, 85, pageWidth - 20, 85);

    // Customer Info
    pdf.setFont(undefined, "bold");
    pdf.text("Customer Information", 20, 100);
    pdf.setFont(undefined, "normal");
    pdf.text(`Name: ${submissionData.name}`, 20, 115);
    pdf.text(`Email: ${submissionData.email}`, 20, 125);
    pdf.text(`Phone: ${submissionData.phone}`, 20, 135);
    pdf.text(`Location: ${submissionData.place}`, 20, 145);

    // Plan Details
    pdf.setFont(undefined, "bold");
    pdf.text("Plan Details", 20, 165);
    pdf.setFont(undefined, "normal");
    pdf.text(`Plan: ${submissionData.planName}`, 20, 180);
    pdf.text(`Number of Systems: ${submissionData.noOfSystems}`, 20, 190);
    pdf.text(`Plan Type: ${submissionData.yearlyPlan ? 'Annual (12 months)' : `${submissionData.months} month${submissionData.months > 1 ? 's' : ''}`}`, 20, 200);

    // Pricing
    if (planKey !== 'enterprise') {
      pdf.setFont(undefined, "bold");
      pdf.text("Pricing", 20, 220);
      pdf.setFont(undefined, "normal");
      pdf.text(`Monthly Cost: SAR ${submissionData.monthlyPrice}`, 20, 235);
      pdf.setFont(undefined, "bold");
      pdf.text(`Total Cost: SAR ${submissionData.totalPrice}`, 20, 245);
    }

    // Footer
    pdf.setFontSize(9);
    pdf.setTextColor(128, 128, 128);
    pdf.text("Thank you for your interest in SAT NOC. Our team will contact you shortly.", 20, pageHeight - 30);
    pdf.text("SAT MicroSystems | www.satmz.com", 20, pageHeight - 20);

    pdf.save(`SAT-NOC-${submissionData.planName}-${submissionData.id}.pdf`);
  };

  return (
    <main className="min-h-screen text-foreground">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-3 w-fit transition">
              <ArrowLeft size={20} />
              Back to pricing
            </Link>
            <h1 className="text-3xl font-bold mb-2 text-white">{plan.title}</h1>
            <p className="text-gray-300 mb-3">{plan.description}</p>

            {planKey !== 'enterprise' && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-lg px-3 py-1.5">
                <span className="text-green-400 font-bold text-sm">🎉 January Offer Applied!</span>
                <span className="text-green-300 text-xs">Save up to 47% • Valid until 31 Jan</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT: Plan Details */}
            <div className="space-y-6">
              {/* Pricing Overview */}
              <div className={CARD_STYLE}>
                <h2 className="text-xl font-bold mb-4 text-white">Pricing & SLA</h2>

                <div className="space-y-3">
                  <div className={INNER_CARD_STYLE}>
                    <h3 className="text-xs font-bold text-blue-400 mb-1.5">Best For</h3>
                    <p className="text-sm text-gray-300">{plan.prioritySLA}</p>
                  </div>

                  <div className={INNER_CARD_STYLE}>
                    <h3 className="text-xs font-bold text-blue-400 mb-1.5">Response SLA</h3>
                    <p className="text-base font-semibold">{plan.responseSLA}</p>
                  </div>

                  {planKey !== 'enterprise' ? (
                    <>
                      <div className={INNER_CARD_STYLE}>
                        <h3 className="text-xs font-bold text-blue-400 mb-2.5">Pricing Options</h3>
                        <div className="space-y-2.5">
                          <InfoRow label="List Price (Per Device/Month)" value={plan.originalPrice} />
                          <InfoRow label="Annual Commitment (Year-1)" value={plan.firstYearPrice} />
                          <InfoRow label="Launch Offer (Until 31 Jan)" value={plan.offerPrice} />
                          <InfoRow label="Flexible Monthly Price" value={plan.monthlyCommitment} />
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-3.5 border border-blue-500/30">
                        <h3 className="text-xs font-bold text-blue-400 mb-2.5">Your Configuration</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Systems:</span>
                            <span className="font-semibold">{formData.noOfSystems}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span className="font-semibold">
                              {formData.yearlyPlan ? 'Annual (12 mo)' : `${formData.months} mo`}
                            </span>
                          </div>
                          <div className="border-t border-blue-500/30 pt-2 mt-2 space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Monthly:</span>
                              <span className="font-bold text-green-400">SAR {calculatePricing().monthlyPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold">Total:</span>
                              <span className="font-bold text-xl text-blue-400">SAR {calculatePricing().totalPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={INNER_CARD_STYLE}>
                      <h3 className="text-xs font-bold text-blue-400 mb-1.5">Pricing</h3>
                      <p className="text-base font-semibold text-purple-400">Custom Pricing</p>
                      <p className="text-xs text-gray-400 mt-1.5">Contact sales for tailored quote</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className={CARD_STYLE}>
                <h3 className="text-lg font-bold mb-4 text-white">Key Features</h3>
                <FeatureList items={plan.features} icon="✓" iconColor="text-blue-400" />
              </div>

              {/* Additional Services */}
              <div className={CARD_STYLE}>
                <h3 className="text-lg font-bold mb-4 text-white">Additional Services</h3>
                <FeatureList items={plan.additionalServices} icon="◆" iconColor="text-purple-400" />
              </div>
            </div>

            {/* RIGHT: Form/Confirmation */}
            <div>
              <div className={`${CARD_STYLE} sticky top-8`}>
                <h2 className="text-xl font-bold mb-5 text-white">Get Started</h2>

                {formSubmitted && submissionData ? (
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-5">
                      <div className="text-center mb-4">
                        <div className="text-4xl text-blue-500 mb-2">✓</div>
                        <h3 className="text-lg font-bold">Thank You!</h3>
                        <p className="text-sm text-gray-400 mt-1">Your inquiry has been received</p>
                      </div>

                      <div className="bg-black/40 rounded-lg p-3.5 space-y-2.5 text-sm">
                        <InfoRow label="Reference ID" value={submissionData.id} />
                        <InfoRow label="Date" value={submissionData.createdAt} />
                        <InfoRow label="Plan" value={submissionData.planName} />
                        <InfoRow label="Name" value={submissionData.name} />
                        <InfoRow label="Email" value={submissionData.email} />
                        <InfoRow label="Systems" value={submissionData.noOfSystems} />
                        <InfoRow label="Duration" value={submissionData.yearlyPlan ? 'Annual (12 mo)' : `${submissionData.months} mo`} />
                        {planKey !== 'enterprise' && (
                          <>
                            <InfoRow label="Monthly Cost" value={`SAR ${submissionData.monthlyPrice}`} />
                            <InfoRow label="Total Cost" value={`SAR ${submissionData.totalPrice}`} bold />
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={downloadReceipt}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      <Download size={18} />
                      Download Receipt (PDF)
                    </button>

                    <div className="bg-muted/50 rounded-lg p-3 text-sm text-gray-400 text-center">
                      We'll contact you within 24 hours to discuss the {submissionData.planName} plan.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5 text-gray-200">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={INPUT_STYLE}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5 text-gray-200">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={INPUT_STYLE}
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5 text-gray-200">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={INPUT_STYLE}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5 text-gray-200">Location *</label>
                      <input
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        required
                        className={INPUT_STYLE}
                        placeholder="City, Country"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5 text-gray-200">Number of Systems *</label>
                      <input
                        type="number"
                        name="noOfSystems"
                        value={formData.noOfSystems}
                        onChange={handleInputChange}
                        min="1"
                        required
                        className={INPUT_STYLE}
                      />
                    </div>

                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        name="yearlyPlan"
                        checked={formData.yearlyPlan}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 bg-black/40 border-blue-500 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <label className="text-sm font-semibold text-white cursor-pointer">
                        Annual Commitment (Save more!)
                      </label>
                    </div>

                    {!formData.yearlyPlan && (
                      <div>
                        <label className="block text-sm font-semibold mb-1.5 text-gray-200">Months *</label>
                        <input
                          type="number"
                          name="months"
                          value={formData.months}
                          onChange={handleInputChange}
                          min="1"
                          max="12"
                          required
                          className={INPUT_STYLE}
                        />
                      </div>
                    )}

                    {planKey !== 'enterprise' && (
                      <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-2 border-blue-500/50 rounded-lg p-3.5">
                        <div className="text-xs text-gray-300 mb-2">Estimated Pricing:</div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-300">Monthly:</span>
                          <span className="font-bold text-green-400">SAR {calculatePricing().monthlyPrice}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">
                            Total ({formData.yearlyPlan ? '12' : formData.months} mo):
                          </span>
                          <span className="font-bold text-xl text-blue-400">SAR {calculatePricing().totalPrice}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-lg shadow-blue-500/30"
                    >
                      Buy Now
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}