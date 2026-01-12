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
    let total = selectedPlan.price * systemCount
    if (annualCommitment) {
      total = total * 12 * 0.85
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
      
      <div className="relative w-full max-w-2xl bg-black/90 backdrop-blur-xl border-2 border-blue-500/40 rounded-3xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition"
        >
          <X className="w-6 h-6 text-gray-400 hover:text-white" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">Calculate Your Price</h2>
            <p className="text-gray-400 text-sm">{selectedPlan.name} Plan</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="systems" className="block text-sm font-medium text-gray-200 mb-3">
              Number of Systems
            </label>
            <input
              type="number"
              id="systems"
              min="1"
              max="100"
              value={systemCount}
              onChange={(e) => setSystemCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border-2 border-blue-500/50 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/40">
            <input
              type="checkbox"
              id="january-offer"
              checked={true}
              disabled
              className="w-5 h-5 rounded border-2 border-green-500 bg-green-500 text-white cursor-not-allowed"
            />
            <label htmlFor="january-offer" className="text-white font-medium flex-1">
              January Offer Applied <span className="text-green-400">✓</span>
            </label>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-black/30 border border-blue-500/30">
            <input
              type="checkbox"
              id="annual"
              checked={annualCommitment}
              onChange={(e) => setAnnualCommitment(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-blue-500 bg-black/40 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="annual" className="text-white font-medium cursor-pointer flex-1">
              Annual Commitment <span className="text-green-400">(Save 15%)</span>
            </label>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-2 border-blue-400/50">
            <p className="text-sm text-gray-300 mb-4">Your Pricing Summary</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">January Offer Price (per system)</span>
                <span className="text-green-400 font-semibold">SAR {selectedPlan.price}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 line-through">Original: SAR {selectedPlan.originalPrice}</span>
                <span className="text-green-400">Saved: SAR {selectedPlan.originalPrice - selectedPlan.price}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Number of Systems</span>
                <span className="text-white font-semibold">{systemCount}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-300">Commitment Type</span>
                <span className="text-white font-semibold">
                  {annualCommitment ? "Annual (12 months)" : "Monthly"}
                </span>
              </div>

              {annualCommitment && (
                <div className="flex justify-between items-center text-green-400">
                  <span>Annual Discount (15%)</span>
                  <span className="font-semibold">-SAR {(selectedPlan.price * systemCount * 12 * 0.15).toFixed(0)}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t-2 border-blue-400/50">
                <span className="text-lg font-semibold text-white">Total Price</span>
                <span className="text-3xl font-bold text-blue-400">
                  {formatPrice(calculatePrice(), annualCommitment)}
                </span>
              </div>

              {systemCount > 1 && (
                <p className="text-xs text-gray-400 text-center">
                  {systemCount} systems × SAR {selectedPlan.price}/{annualCommitment ? 'year' : 'month'}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3"
          >
            Buy Now
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="text-center text-xs text-gray-400">
            You'll be redirected to complete your purchase with pre-filled details
          </p>
        </div>
      </div>
    </div>
  )
}
