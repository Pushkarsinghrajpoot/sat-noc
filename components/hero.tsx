"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-background">
        {/* Primary flowing gradient background */}
        <div
          className="absolute inset-0 opacity-100 animate-gradient-flow"
          style={{
            background: `linear-gradient(135deg, 
              #22c55e 0%,
              #10a5f7 15%,
              #3b82f6 30%,
              #a855f7 45%,
              #ec4899 60%,
              #ef4444 75%,
              #fb923c 85%,
              #22c55e 100%)`,
            backgroundSize: "300% 300%",
            filter: "blur(80px) saturate(1.2)",
          }}
        />

        {/* Secondary gradient layer for depth */}
        <div
          className="absolute inset-0 opacity-40 animate-gradient-flow-reverse"
          style={{
            background: `linear-gradient(45deg,
              rgba(59, 130, 246, 0.3) 0%,
              rgba(168, 85, 247, 0.2) 25%,
              rgba(239, 68, 68, 0.3) 50%,
              rgba(34, 197, 94, 0.2) 75%,
              rgba(59, 130, 246, 0.3) 100%)`,
            backgroundSize: "400% 400%",
            filter: "blur(60px)",
          }}
        />

        {/* Animated floating orbs for additional depth */}
        <div
          className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full opacity-30 animate-float-slow"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute -bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-25 animate-float-slow-reverse"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)",
            filter: "blur(100px)",
            animationDelay: "2s",
          }}
        />

        {/* Dark overlay to ensure content readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Animated icon */}
        <div className="mb-8 animate-bounce-gentle">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-2xl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-white">
              <rect x="2" y="3" width="20" height="14" rx="2" fill="currentColor" />
              <path d="M8 17h8M5 21h14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-center leading-tight max-w-5xl mx-auto text-pretty mb-6">
          Power your uptime with{" "}
          <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            SAT NOC Plans
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto text-center leading-relaxed mb-8">
          Enterprise-grade NOC software + 24×7 operations experts to keep your business always-on and resilient.
        </p>

        <Link href="/demo">
          <button className="px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 flex items-center gap-2 group">
            Get Demo
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </section>
  )
}
