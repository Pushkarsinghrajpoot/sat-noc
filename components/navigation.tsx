"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
           <Link href="/" className="flex items-center">
            <Image
              src="https://satmz.com/wp-content/uploads/2023/03/main_logo.png"
              alt="SAT MicroSystems Logo"
              width={120}
              height={40}
              className="h-8 w-auto cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
              Overview
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition">
              Capabilities
            </a>
            <a href="#compare" className="text-sm text-muted-foreground hover:text-foreground transition">
              Plans and pricing
            </a>
            <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
              Contact Us
            </a>
          </div>

          {/* Sign Up Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://care.satmz.com/" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-2 rounded-full bg-transparent border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-600/10 transition">
                Login
              </button>
            </a>
            <a href="/demo">
              <button className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                Get Demo
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="/" className="block text-sm text-muted-foreground hover:text-foreground transition py-2">
              Overview
            </a>
            <a href="#faq" className="block text-sm text-muted-foreground hover:text-foreground transition py-2">
              Capabilities
            </a>
            <a href="#compare" className="block text-sm text-muted-foreground hover:text-foreground transition py-2">
              Plans and pricing
            </a>
            <a href="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition py-2">
              Contact Us
            </a>
            <div className="flex gap-2 mt-4">
              <a href="https://care.satmz.com/" target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="w-full px-6 py-2 rounded-full bg-transparent border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-600/10 transition">
                  Login
                </button>
              </a>
              <a href="/demo" className="flex-1">
                <button className="w-full px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                  Get Demo
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
