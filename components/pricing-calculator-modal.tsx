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
    // Debug: Log the selected plan data
    console.log('Selected Plan:', selectedPlan.name, 'Original Price:', selectedPlan.originalPrice)
    
    let basePrice
    if (annualCommitment) {
      // Annual commitment uses Annual Commitment prices
      basePrice = selectedPlan.name === 'Lite' ? 89 : selectedPlan.name === 'Pro ⭐' ? 169 : selectedPlan.name === 'Ultra' ? 269 : 149
    } else {
      // Monthly uses January Offer prices
      basePrice = selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro ⭐' ? 149 : selectedPlan.name === 'Ultra' ? 249 : 149
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
    // Clean up the plan name for URL routing
    const planName = selectedPlan.name.replace(' ⭐', '').toLowerCase()
    router.push(`/plans/${planName}?${params.toString()}`)
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
              <div className="flex flex-col items-end">
                <span className="text-gray-500 text-xs line-through">SAR {selectedPlan.originalPrice}</span>
                <span className="text-green-400 font-bold text-sm">SAR {selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro ⭐' ? 149 : 249}</span>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-300">
              Save {Math.round(((selectedPlan.originalPrice - (selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro ⭐' ? 149 : 249)) / selectedPlan.originalPrice) * 100)}% • Limited to first 9 customers only
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
                (January Offer: SAR {selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro ⭐' ? 149 : selectedPlan.name === 'Ultra' ? 249 : 149} vs Flexible: SAR {selectedPlan.name === 'Lite' ? 109 : selectedPlan.name === 'Pro ⭐' ? 199 : selectedPlan.name === 'Ultra' ? 259 : 149})
              </span>
            </label>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-2 border-blue-400/50">
            <p className="text-xs text-gray-300 mb-3">Your Pricing Summary</p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Price (per system)</span>
                <div className="flex flex-col items-end">
                  <span className="text-gray-500 text-xs line-through">SAR {selectedPlan.originalPrice}</span>
                  <span className="text-green-400 font-semibold text-sm">SAR {annualCommitment ? (selectedPlan.name === 'Lite' ? 89 : selectedPlan.name === 'Pro ⭐' ? 169 : selectedPlan.name === 'Ultra' ? 269 : 149) : (selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro ⭐' ? 149 : selectedPlan.name === 'Ultra' ? 249 : 149)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">List Price</span>
                <span className="text-gray-500">SAR {selectedPlan.originalPrice}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">January Offer</span>
                <span className="text-green-400 font-bold text-sm">SAR {selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro ⭐' ? 149 : selectedPlan.name === 'Ultra' ? 249 : 149}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Flexible Monthly</span>
                <span className="text-gray-300">SAR {selectedPlan.name === 'Lite' ? 109 : selectedPlan.name === 'Pro ⭐' ? 199 : selectedPlan.name === 'Ultra' ? 259 : 149}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Annual Commitment</span>
                <span className="text-gray-300">SAR {selectedPlan.name === 'Lite' ? 89 : selectedPlan.name === 'Pro ⭐' ? 169 : selectedPlan.name === 'Ultra' ? 269 : 149}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Savings</span>
                <span className="text-green-400 font-semibold">{Math.round(((selectedPlan.originalPrice - (annualCommitment ? (selectedPlan.name === 'Lite' ? 89 : selectedPlan.name === 'Pro ⭐' ? 169 : selectedPlan.name === 'Ultra' ? 269 : 149) : (selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro ⭐' ? 149 : selectedPlan.name === 'Ultra' ? 249 : 149))) / selectedPlan.originalPrice) * 100)}%</span>
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
                  {systemCount} systems × SAR {annualCommitment ? (selectedPlan.name === 'Lite' ? 89 : selectedPlan.name === 'Pro ⭐' ? 169 : selectedPlan.name === 'Ultra' ? 269 : 149) : (selectedPlan.name === 'Lite' ? 79 : selectedPlan.name === 'Pro ⭐' ? 149 : selectedPlan.name === 'Ultra' ? 249 : 149)}/{annualCommitment ? 'year' : 'month'}
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
