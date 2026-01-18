"use client"

import React, { useState, useEffect } from "react"

export default function AnimatedBackground() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#000000]" />
        
        {/* Mobile: Subtle animated orbs - lightweight animations only */}
        <div 
          className="absolute top-0 left-0 w-full h-[60vh] rounded-full opacity-40 blur-[50px]"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.4) 30%, transparent 50%)',
            animation: 'mobile-pulse-1 8s ease-in-out infinite',
          }}
        />
        
        <div 
          className="absolute bottom-0 right-0 w-full h-[60vh] rounded-full opacity-40 blur-[50px]"
          style={{
            background: 'radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.6) 0%, rgba(219, 39, 119, 0.4) 30%, transparent 50%)',
            animation: 'mobile-pulse-2 10s ease-in-out infinite',
          }}
        />
        
        <div 
          className="absolute top-[40%] left-[40%] w-[80%] h-[50vh] rounded-full opacity-30 blur-[40px]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.5) 0%, rgba(37, 99, 235, 0.3) 30%, transparent 50%)',
            animation: 'mobile-pulse-3 12s ease-in-out infinite',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ contain: 'layout style paint' }}>
      <div className="absolute inset-0 bg-[#000000]" />
      
      {/* Desktop: Full animated experience */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[70%] h-[70%] rounded-full opacity-60 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 1) 0%, rgba(139, 92, 246, 0.8) 30%, transparent 60%)',
          animation: 'float-orb-1 25s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden' as const,
        }}
      />
      
      <div 
        className="absolute top-[5%] right-[-10%] w-[65%] h-[65%] rounded-full opacity-60 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 1) 0%, rgba(219, 39, 119, 0.8) 30%, transparent 60%)',
          animation: 'float-orb-2 30s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden' as const,
        }}
      />
      
      <div 
        className="absolute bottom-[-15%] left-[10%] w-[75%] h-[75%] rounded-full opacity-60 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 1) 0%, rgba(37, 99, 235, 0.8) 30%, transparent 60%)',
          animation: 'float-orb-3 28s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden' as const,
        }}
      />
      
      <div 
        className="absolute bottom-[10%] right-[5%] w-[60%] h-[60%] rounded-full opacity-60 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 1) 0%, rgba(147, 51, 234, 0.8) 30%, transparent 60%)',
          animation: 'float-orb-4 32s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden' as const,
        }}
      />
      
      <div 
        className="absolute top-[35%] left-[35%] w-[50%] h-[50%] rounded-full opacity-50 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 1) 0%, rgba(6, 182, 212, 0.8) 30%, transparent 60%)',
          animation: 'float-orb-5 27s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden' as const,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
    </div>
  )
}
