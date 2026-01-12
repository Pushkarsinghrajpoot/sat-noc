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

  useEffect(() => {
    const systems = searchParams.get('systems');
    const annual = searchParams.get('annual');
    
    if (systems) {
      setFormData(prev => ({ ...prev, noOfSystems: parseInt(systems) || 1 }));
    }
    if (annual === 'true') {
      setFormData(prev => ({ ...prev, yearlyPlan: true }));
    }
  }, [searchParams]);

  const [submissionData, setSubmissionData] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    place: string;
    planName: string;
    yearlyPlan: boolean;
    noOfSystems: number;
    months: number;
    monthlyPrice: number;
    totalPrice: number;
    createdAt: string;
  } | null>(null);

  const planKey = (params.plan as string)?.toLowerCase() || "";
  const plan = planDetails[planKey as keyof typeof planDetails];

  if (!plan) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Plan not found</h1>
          <p className="text-gray-300 mb-6">
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

  const calculatePricing = () => {
    if (planKey === 'enterprise') {
      return { monthlyPrice: 0, totalPrice: 0 };
    }

    const prices: any = {
      lite: { yearly: 89, monthly: 109, offer: 79 },
      pro: { yearly: 169, monthly: 199, offer: 149 },
      ultra: { yearly: 219, monthly: 259, offer: 199 },
    };

    const planPrices = prices[planKey];
    if (!planPrices) return { monthlyPrice: 0, totalPrice: 0 };

    const basePrice = formData.yearlyPlan ? planPrices.yearly : planPrices.monthly;
    const monthlyPrice = basePrice * formData.noOfSystems;
    const totalPrice = formData.yearlyPlan 
      ? monthlyPrice * 12 
      : monthlyPrice * formData.months;

    return { monthlyPrice, totalPrice };
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
    pdf.text("Plan Details", 20, 165);

    pdf.setFont(undefined, "normal");
    pdf.text(`Plan: ${submissionData.planName}`, 20, 180);
    pdf.text(`Number of Systems: ${submissionData.noOfSystems}`, 20, 190);
    pdf.text(`Plan Type: ${submissionData.yearlyPlan ? 'Annual (12 months)' : `${submissionData.months} month${submissionData.months > 1 ? 's' : ''}`}`, 20, 200);
    
    if (planKey !== 'enterprise') {
      pdf.setFont(undefined, "bold");
      pdf.text("Pricing", 20, 220);
      
      pdf.setFont(undefined, "normal");
      pdf.text(`Monthly Cost: SAR ${submissionData.monthlyPrice}`, 20, 235);
      pdf.setFont(undefined, "bold");
      pdf.text(`Total Cost: SAR ${submissionData.totalPrice}`, 20, 245);
    }

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
    <main className="min-h-screen text-foreground">
      <AnimatedBackground />
      <Navigation />
      
      <div className="relative z-10">
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4 w-fit transition"
            >
              <ArrowLeft size={20} />
              Back to pricing
            </Link>
            <h1 className="text-4xl font-bold mb-2 text-white">{plan.title}</h1>
            <p className="text-gray-300 text-lg">{plan.description}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SECTION */}
          <div>
            {/* Pricing */}
            <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">{plan.title} Plan</h2>

              <div className="space-y-4">
                {/* Best For */}
                <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                  <h3 className="text-sm font-bold text-blue-400 mb-2">Best For</h3>
                  <p className="text-sm text-gray-300">{plan.prioritySLA}</p>
                </div>

                {/* Response SLA */}
                <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                  <h3 className="text-sm font-bold text-blue-400 mb-2">Response SLA</h3>
                  <p className="text-lg font-semibold">{plan.responseSLA}</p>
                </div>

                {planKey !== 'enterprise' ? (
                  <>
                    {/* Pricing Table */}
                    <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                      <h3 className="text-sm font-bold text-blue-400 mb-3">Pricing Options</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <span className="text-sm text-gray-400">List Price (Per Device/Month)</span>
                          <span className="font-bold text-lg text-white">{plan.originalPrice}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                          <span className="text-sm text-gray-400">Annual Commitment (Year-1)</span>
                          <span className="font-bold text-lg text-green-400">{plan.firstYearPrice}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                          <span className="text-sm text-gray-400">Launch Offer (Valid until 31 Jan)</span>
                          <span className="font-bold text-lg text-blue-400">{plan.offerPrice}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Flexible Monthly Price</span>
                          <span className="font-bold text-lg">{plan.monthlyCommitment}</span>
                        </div>
                      </div>
                    </div>

                    {/* Your Configuration */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/30">
                      <h3 className="text-sm font-bold text-blue-400 mb-3">Your Configuration</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Number of Systems:</span>
                          <span className="font-semibold">{formData.noOfSystems}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Plan Type:</span>
                          <span className="font-semibold">
                            {formData.yearlyPlan ? 'Annual (12 months)' : `${formData.months} month${formData.months > 1 ? 's' : ''}`}
                          </span>
                        </div>
                        <div className="border-t border-blue-500/30 pt-2 mt-2">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-400">Monthly Cost:</span>
                            <span className="font-bold text-lg text-green-400">SAR {calculatePricing().monthlyPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">Total Cost:</span>
                            <span className="font-bold text-2xl text-blue-400">SAR {calculatePricing().totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <h3 className="text-sm font-bold text-blue-400 mb-2">Pricing</h3>
                    <p className="text-lg font-semibold text-purple-400">Custom Pricing</p>
                    <p className="text-sm text-gray-400 mt-2">Contact our sales team for a tailored quote</p>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Key Features</h3>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-blue-400 font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Services */}
            <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Additional Services</h3>
              <ul className="space-y-3">
                {plan.additionalServices.map((service, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-purple-400 font-bold flex-shrink-0">
                      ◆
                    </span>
                    <span className="text-gray-300">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div>
            <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Get Started</h2>

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
                      <div className="flex justify-between items-center border-b border-muted pb-3">
                        <span className="text-muted-foreground">
                          Email
                        </span>
                        <span className="font-semibold text-xs">
                          {submissionData.email}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-muted pb-3">
                        <span className="text-muted-foreground">
                          Systems
                        </span>
                        <span className="font-semibold">
                          {submissionData.noOfSystems}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-muted pb-3">
                        <span className="text-muted-foreground">
                          Plan Type
                        </span>
                        <span className="font-semibold">
                          {submissionData.yearlyPlan ? 'Annual (12 months)' : `${submissionData.months} month${submissionData.months > 1 ? 's' : ''}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-muted pb-3">
                        <span className="text-muted-foreground">
                          Monthly Cost
                        </span>
                        <span className="font-semibold text-green-400">
                          SAR {submissionData.monthlyPrice}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-bold">
                          Total Cost
                        </span>
                        <span className="font-bold text-xl text-blue-400">
                          SAR {submissionData.totalPrice}
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
                    <label className="block text-sm font-semibold mb-2 text-gray-200">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-200">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-200">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-200">
                      Location/Place *
                    </label>
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-200">
                      Number of Systems *
                    </label>
                    <input
                      type="number"
                      name="noOfSystems"
                      value={formData.noOfSystems}
                      onChange={handleInputChange}
                      min="1"
                      required
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="1"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="yearlyPlan"
                      checked={formData.yearlyPlan}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 bg-black/40 border-blue-500 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                    <label className="text-sm font-semibold text-white cursor-pointer">
                      Annual Commitment (12 months) - Save more!
                    </label>
                  </div>

                  {!formData.yearlyPlan && (
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-200">
                        Number of Months *
                      </label>
                      <input
                        type="number"
                        name="months"
                        value={formData.months}
                        onChange={handleInputChange}
                        min="1"
                        max="12"
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="1"
                      />
                    </div>
                  )}

                  {planKey !== 'enterprise' && (
                    <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-2 border-blue-500/50 rounded-lg p-4">
                      <div className="text-sm text-gray-300 mb-2">Estimated Pricing:</div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-300">Monthly Cost:</span>
                        <span className="font-bold text-lg text-green-400">SAR {calculatePricing().monthlyPrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Total Cost ({formData.yearlyPlan ? '12' : formData.months} month{formData.yearlyPlan || formData.months > 1 ? 's' : ''}):</span>
                        <span className="font-bold text-xl text-blue-400">SAR {calculatePricing().totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-lg shadow-blue-500/30"
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
