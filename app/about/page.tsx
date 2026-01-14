"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { ArrowRight, CheckCircle, Users, Clock, Award, Shield, Lightbulb, Heart, Zap, Target } from "lucide-react"

export default function AboutPage() {
  const [stats, setStats] = useState({
    years: 0,
    satisfaction: 0,
    projects: 0,
    responseTime: 0
  })

  useEffect(() => {
    const targetStats = {
      years: 20,
      satisfaction: 98,
      projects: 1280,
      responseTime: 30
    }

    const duration = 2000
    const steps = 60
    const increment = {
      years: targetStats.years / steps,
      satisfaction: targetStats.satisfaction / steps,
      projects: targetStats.projects / steps,
      responseTime: targetStats.responseTime / steps
    }

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setStats({
        years: Math.min(Math.floor(increment.years * currentStep), targetStats.years),
        satisfaction: Math.min(Math.floor(increment.satisfaction * currentStep), targetStats.satisfaction),
        projects: Math.min(Math.floor(increment.projects * currentStep), targetStats.projects),
        responseTime: Math.min(Math.floor(increment.responseTime * currentStep), targetStats.responseTime)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const coreValues = [
    {
      icon: Lightbulb,
      title: "Innovative Mindset",
      description: "Innovation is embedded in our DNA. We don't merely keep pace with technological change—we anticipate it.",
      color: "text-yellow-400"
    },
    {
      icon: Heart,
      title: "Client-Centric Philosophy",
      description: "Your goals define our success. We operate with a client-first mindset, aligning our strategies with your objectives.",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Agile & Adaptive Execution",
      description: "Our agile methodologies allow us to respond quickly to change, mitigate risk, and ensure seamless execution.",
      color: "text-green-400"
    },
    {
      icon: Shield,
      title: "Integrity & Transparency",
      description: "Trust is the foundation of every relationship we build. We conduct business with uncompromising integrity.",
      color: "text-purple-400"
    }
  ]

  const services = [
    "Infrastructure & Managed Services",
    "Cloud & Data Center Solutions", 
    "Cybersecurity & Compliance",
    "Automation & IT Operations Support"
  ]

  return (
    <main className="min-h-screen text-foreground">
      <AnimatedBackground />
      <Navigation />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-yellow-400 to-blue-500 rounded-lg transform rotate-45" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Built to Deliver.
              <span className="block text-blue-500">Trusted to Execute.</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              SAT Microsystems is a global IT services company focused on one thing: delivering reliable, 
              high-quality technology solutions that work in real business environments.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">ISO 9001 & ISO 27001 certified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">
                  {stats.years}+
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-green-400 mb-2">
                  {stats.satisfaction}%
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-purple-400 mb-2">
                  {stats.projects.toLocaleString()}+
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                  {stats.responseTime}s
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">Avg Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">What We Do</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We secure, manage, and optimize IT environments across multiple domains
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service}</h3>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-300 text-lg">
                Our focus is <span className="text-blue-400 font-semibold">stability</span>,{' '}
                <span className="text-green-400 font-semibold">performance</span>, and{' '}
                <span className="text-purple-400 font-semibold">long-term reliability</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-white">Our Philosophy</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    At SAT Microsystems, technology is not an end in itself—it is a strategic enabler. 
                    We believe successful IT solutions must reduce friction, improve visibility, and empower 
                    businesses to focus on growth rather than complexity.
                  </p>
                  <p>
                    We don't believe in one-size-fits-all solutions. Instead, we invest time in understanding 
                    your business objectives, operational realities, and future vision, ensuring that every 
                    recommendation delivers measurable value.
                  </p>
                </div>
              </div>
              
              <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm text-gray-400">Experienced Professionals</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-sm text-gray-400">Support & Operations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">What Defines Us</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our culture is shaped by four core attributes that clearly differentiate us from our competition
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4`}>
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 text-white">Why Clients Choose Us</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <Award className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">20+ Years</div>
                  <div className="text-gray-300">Proven Delivery</div>
                </div>
              </div>
              
              <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <Users className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-gray-300">Customer Satisfaction</div>
                </div>
              </div>
              
              <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <Target className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">1,280+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
              </div>
              
              <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <Clock className="w-8 h-8 text-purple-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">30s</div>
                  <div className="text-gray-300">Average Response Time</div>
                </div>
              </div>
              
              <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">ISO 9001</div>
                  <div className="text-gray-300">Quality Certified</div>
                </div>
              </div>
              
              <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-orange-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">ISO 27001</div>
                  <div className="text-gray-300">Security Certified</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/40 rounded-3xl p-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                Ready to Experience Reliable IT Solutions?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join hundreds of businesses that trust SAT Microsystems for their critical IT operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight size={20} />
                </a>
                <a
                  href="/#pricing-cards"
                  className="inline-flex items-center gap-2 bg-black/40 border border-white/20 hover:bg-black/60 text-white px-8 py-3 rounded-full font-semibold transition-all"
                >
                  View Plans
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
