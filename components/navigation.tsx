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
              src="/main-logo.png"
              alt="SAT MicroSystems Logo"
              width={180}
              height={120}
              className="h-12 w-auto cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
              Overview
            </Link>
            <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition">
              Capabilities
            </Link>
            <Link href="/#compare" className="text-sm text-muted-foreground hover:text-foreground transition">
              Plans and pricing
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
              Contact Us
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://care.satmz.com/" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-2 rounded-full bg-transparent border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-600/10 transition">
                Login
              </button>
            </a>
            <Link href="/contact">
              <button className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                Contact Us
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition py-2">
              Overview
            </Link>
            <Link href="/#faq" className="block text-sm text-muted-foreground hover:text-foreground transition py-2">
              Capabilities
            </Link>
            <Link href="/#compare" className="block text-sm text-muted-foreground hover:text-foreground transition py-2">
              Plans and pricing
            </Link>
            <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition py-2">
              Contact Us
            </Link>
            <div className="flex gap-2 mt-4">
              <a href="https://care.satmz.com/" target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="w-full px-6 py-2 rounded-full bg-transparent border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-600/10 transition">
                  Login
                </button>
              </a>
              <Link href="/contact" className="flex-1">
                <button className="w-full px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
