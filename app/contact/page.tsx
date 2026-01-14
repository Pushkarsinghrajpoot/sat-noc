"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", company: "", phone: "", message: "" })
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen text-foreground">
      <AnimatedBackground />
      <Navigation />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions about our NOC services? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
          {/* Left Column - Contact Info & Social */}
          <div className="flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4 text-white">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-600/40 shrink-0">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-white text-sm">Email</h3>
                    <a href="mailto:info@satmz.com" className="text-gray-300 hover:text-blue-400 transition text-sm">
                      info@satmz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-600/40 shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-white text-sm">Phone</h3>
                    <a href="tel:+966590491974" className="text-gray-300 hover:text-blue-400 transition text-sm">
                      (+966) 590491974
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-600/40 shrink-0">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-white text-sm">Address</h3>
                    <p className="text-gray-300 text-sm">
                      Al harmain road infront of al rehab sidewalk<br />
                      first floor<br />
                      <a href="https://maps.app.goo.gl/WUA38iSXmGsx5Qzo6" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition text-sm">
                        View on Google Maps
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
              <div className="grid grid-cols-2 gap-2">
                <a href="https://www.facebook.com/satmicrosystem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 border border-blue-600/40 rounded-lg text-gray-300 hover:text-white hover:bg-blue-600/30 transition text-xs">
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
                <a href="https://www.instagram.com/satmicrosystems/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-pink-600/20 border border-pink-600/40 rounded-lg text-gray-300 hover:text-white hover:bg-pink-600/30 transition text-xs">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a href="https://x.com/satmicrosystems" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-black/40 border border-gray-600/40 rounded-lg text-gray-300 hover:text-white hover:bg-black/60 transition text-xs">
                  <span className="w-4 h-4 flex items-center justify-center font-bold text-xs">𝕏</span>
                  X (Twitter)
                </a>
                <a href="https://in.linkedin.com/company/satmicrosystems" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-blue-700/20 border border-blue-700/40 rounded-lg text-gray-300 hover:text-white hover:bg-blue-700/30 transition text-xs">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 flex-1">
              <h3 className="text-lg font-semibold mb-3 text-white">Business Hours</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>Sunday - Thursday</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday - Saturday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Map */}
          <div className="flex flex-col">
            <div className="p-5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-3 text-white">Location</h3>
              <div className="flex-1 min-h-[300px] rounded-lg overflow-hidden border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.7235648425!2d46.721!3d24.713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ3LjgiTiA0NsKwNDMnMTIuMCJF!5e0!3m2!1sen!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '100%' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-col">
            <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex-1">
              <h2 className="text-xl font-semibold mb-4 text-white">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-200">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-200">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 rounded-lg bg-green-600/10 border border-green-600/20 text-green-400 text-sm text-center">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 rounded-lg bg-red-600/10 border border-red-600/20 text-red-400 text-sm text-center">
                    Something went wrong. Please try again later.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}