"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Projects" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    } else if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleQuoteClick = () => {
    setMobileMenuOpen(false)
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#87ceeb]/40 bg-gradient-to-r from-[#e0f2fc] via-[#eaf6fd] to-[#d6eefb] shadow-lg shadow-[#87ceeb]/10 backdrop-blur-md">
      <div className="container mx-auto flex h-28 items-center justify-between px-4 sm:h-32 md:h-36">
        {/* Logo - extra large and bold */}
        <Link href="/" className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105">
          <Image
            src="/sapwebs-logo.png"
            alt="Sapwebs Logo"
            width={600}
            height={180}
            className="h-22 drop-shadow-lg sm:h-26 md:h-32"
            style={{ width: 'auto', height: undefined }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative rounded-full px-5 py-2.5 text-sm font-semibold text-[#0a3d62] transition-all duration-300 hover:bg-[#87ceeb]/20 hover:text-[#0a3d62]"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={handleQuoteClick}
            className="ml-4 rounded-full bg-[#0a3d62] px-7 py-2.5 font-semibold text-white shadow-lg shadow-[#0a3d62]/25 transition-all duration-300 hover:bg-[#1a5f8a] hover:shadow-xl hover:-translate-y-0.5"
          >
            Get A Quote
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#87ceeb]/15 transition-all duration-200 hover:bg-[#87ceeb]/30 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-[#0a3d62]" /> : <Menu className="h-5 w-5 text-[#0a3d62]" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-[#87ceeb]/20 bg-gradient-to-b from-[#eaf6fd] to-white transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/15"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={handleQuoteClick}
            className="mt-2 w-full rounded-full bg-[#0a3d62] py-3 font-semibold text-white hover:bg-[#1a5f8a]"
          >
            Get A Quote
          </Button>
        </div>
      </div>
    </header>
  )
}
