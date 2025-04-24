"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-xl md:text-2xl text-[#1a2e4c]">Pooya Pirayeshakbari</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ">
            <Link href="/" className="font-serif text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors">
              Home
            </Link>
            <Link href="#listings" className="font-serif text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors">
              Listings
            </Link>
            <Link href="#about" className="font-serif text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors">
              About
            </Link>
            <Link href="#process" className="font-serif text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors">
              Process
            </Link>
            <Link href="#contact" className="font-serif text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#1a2e4c]" />
              <a href="tel:4165537707" className="text-sm text-[#1a2e4c] font-serif hover:underline">
                416-553-7707
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#1a2e4c] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white pt-20 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-6 py-8">
              <Link
                href="/"
                className="font-serif text-xl text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#listings"
                className="font-serif text-xl text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Listings
              </Link>
              <Link
                href="#about"
                className="font-serif text-xl text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#process"
                className="font-serif text-xl text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </Link>
              <Link
                href="#contact"
                className="font-serif text-xl text-[#1a2e4c] hover:text-[#1a2e4c]/70 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <Phone className="w-5 h-5 text-[#1a2e4c]" />
                <a href="tel:4165537707" className="text-lg text-[#1a2e4c] font-serif hover:underline">
                  416-553-7707
                </a>
              </div>

              {/* Logos removed from mobile menu */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
