"use client"

import { useState } from "react"
import { X, Calculator, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface PricingCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan?: {
    name: string
    price: number
    originalPrice: number
  }
}

export default function PricingCalculatorModal({ isOpen, onClose, selectedPlan }: PricingCalculatorModalProps) {
  const router = useRouter()
  const [systemCount, setSystemCount] = useState(1)
  const [annualCommitment, setAnnualCommitment] = useState(false)

  if (!isOpen || !selectedPlan) return null

  const calculatePrice = () => {
    let basePrice
    if (annualCommitment) {
      // Annual commitment uses January Offer prices
      basePrice = selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro' ? 149 : 199
    } else {
      // Monthly uses flexible prices
      basePrice = selectedPlan.name === 'Lite' ? 109 : selectedPlan.name === 'Pro' ? 199 : 259
    }
    let total = basePrice * systemCount
    if (annualCommitment) {
      total = total * 12
    }
    return total
  }

  const formatPrice = (price: number, isAnnual: boolean = false) => {
    if (isAnnual) {
      return `SAR ${price.toFixed(0)}/year`
    }
    return `SAR ${price.toFixed(0)}/month`
  }

  const handleBuyNow = () => {
    const params = new URLSearchParams({
      systems: systemCount.toString(),
      annual: annualCommitment.toString(),
    })
    router.push(`/plans/${selectedPlan.name.toLowerCase()}?${params.toString()}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-xl bg-black/90 backdrop-blur-xl border-2 border-blue-500/40 rounded-2xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition"
        >
          <X className="w-6 h-6 text-gray-400 hover:text-white" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-6 h-6 text-blue-400" />
          <div>
            <h2 className="text-xl font-bold text-white">{selectedPlan.name} Plan Calculator</h2>
            <p className="text-gray-400 text-sm">Calculate your pricing based on systems and commitment</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="systems" className="block text-sm font-medium mb-1.5 text-gray-200">
              Number of Systems
            </label>
            <input
              type="number"
              id="systems"
              min="1"
              max="100"
              value={systemCount}
              onChange={(e) => setSystemCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2.5 rounded-lg bg-black/40 border-2 border-blue-500/50 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/40">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium text-sm">January Offer Applied</span>
              <span className="text-green-400 font-bold text-sm">
                Save {Math.round(((selectedPlan.originalPrice - (selectedPlan.name === 'Lite' ? 109 : selectedPlan.name === 'Pro' ? 199 : 259)) / selectedPlan.originalPrice) * 100)}%
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-300">
              Original: SAR {selectedPlan.originalPrice} → Offer: SAR {selectedPlan.name === 'Lite' ? 109 : selectedPlan.name === 'Pro' ? 199 : 259}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-blue-500/30">
            <input
              type="checkbox"
              id="annual"
              checked={annualCommitment}
              onChange={(e) => setAnnualCommitment(e.target.checked)}
              className="w-4 h-4 rounded border-2 border-blue-500 bg-black/40 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="annual" className="text-white font-medium cursor-pointer flex-1 text-sm">
              Annual Commitment <span className="text-green-400 text-xs">
                {selectedPlan.name === 'Lite' ? '+ Gift (Mini projector)' : 
                 selectedPlan.name === 'Pro' ? '+ Gift (Tablet)' : 
                 '+ Gift (2 Months Free + White-Glove Onboarding)'}
              </span>
            </label>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-2 border-blue-400/50">
            <p className="text-xs text-gray-300 mb-3">Your Pricing Summary</p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Price (per system)</span>
                <span className="text-green-400 font-semibold">SAR {annualCommitment ? (selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro' ? 149 : 199) : (selectedPlan.name === 'Lite' ? 109 : selectedPlan.name === 'Pro' ? 199 : 259)}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 line-through">Original: SAR {selectedPlan.originalPrice}</span>
                <span className="text-green-400">Saved: SAR {selectedPlan.originalPrice - (annualCommitment ? (selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro' ? 149 : 199) : (selectedPlan.name === 'Lite' ? 109 : selectedPlan.name === 'Pro' ? 199 : 259))}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Number of Systems</span>
                <span className="text-white font-semibold">{systemCount}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-gray-300 text-sm">Commitment Type</span>
                <span className="text-white font-semibold text-sm">
                  {annualCommitment ? "Annual (12 months)" : "Monthly"}
                </span>
              </div>

              
              <div className="flex justify-between items-center pt-2 border-t-2 border-blue-400/50">
                <span className="text-base font-semibold text-white">Total Price</span>
                <span className="text-2xl font-bold text-blue-400">
                  {formatPrice(calculatePrice(), annualCommitment)}
                </span>
              </div>

              {systemCount > 1 && (
                <p className="text-xs text-gray-400 text-center">
                  {systemCount} systems × SAR {annualCommitment ? (selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro' ? 149 : 199) : (selectedPlan.name === 'Lite' ? 109 : selectedPlan.name === 'Pro' ? 199 : 259)}/{annualCommitment ? 'month' : 'month'}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            Buy Now
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-xs text-gray-400">
            You'll be redirected to complete your purchase with pre-filled details
          </p>
        </div>
      </div>
    </div>
  )
}
