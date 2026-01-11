"use client"

import React from "react"

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#000000]" />
      
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: 'linear-gradient(135deg, #2d5f2d 0%, #5c8a3d 10%, #9baa4e 20%, #d4b85e 30%, #e69558 40%, #d66565 50%, #b84f8f 60%, #7d5fa5 70%, #5c7abd 80%, #4d8fc4 90%, #3da5c4 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-70 blur-[120px]"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.6) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(33, 150, 243, 0.6) 0%, transparent 40%)',
          animation: 'float-slow 15s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-70 blur-[120px]"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(156, 39, 176, 0.6) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(244, 67, 54, 0.6) 0%, transparent 40%)',
          animation: 'float-slow-reverse 18s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-60 blur-[100px]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 193, 7, 0.4) 0%, transparent 50%)',
          animation: 'pulse-glow 8s ease-in-out infinite',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
    </div>
  )
}
