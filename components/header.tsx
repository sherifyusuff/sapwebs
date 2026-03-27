"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageDropdown } from "@/components/language-dropdown"
import { ServicesDropdown } from "@/components/services-dropdown"
import { useLanguage } from "@/lib/language-context"

const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/services", key: "nav.services" },
  { href: "/projects", key: "nav.portfolio" },
  { href: "/blog", key: "nav.blog" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const { t } = useLanguage()

  const handleContactClick = () => {
    setMobileMenuOpen(false)
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#87ceeb]/40 bg-gradient-to-r from-[#e0f2fc] via-[#eaf6fd] to-[#d6eefb] shadow-lg shadow-[#87ceeb]/10 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-3 sm:h-24 md:h-28 lg:h-32 md:px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105">
          <Image
            src="/sapwebs-logo.png"
            alt="Sapwebs Logo"
            width={600}
            height={180}
            className="h-12 drop-shadow-lg sm:h-16 md:h-20 lg:h-24"
            style={{ width: 'auto' }}
            priority
            loading="eager"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link, index) => {
            if (link.key === "nav.services") {
              return <ServicesDropdown key={link.key} />
            }
            return (
              <Link
                key={link.key}
                href={link.href}
                className="group relative rounded-full px-5 py-2.5 text-sm font-semibold text-[#0a3d62] transition-all duration-300 hover:text-[#0a3d62]"
              >
                {t(link.key)}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#87ceeb] to-[#0a3d62] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'radial-gradient(circle, rgba(135, 206, 235, 0.1) 0%, transparent 70%)',
                }} />
              </Link>
            )
          })}
          <LanguageDropdown variant="desktop" />
          <Button
            onClick={handleContactClick}
            className="ml-3 rounded-full bg-[#0a3d62] px-7 py-2.5 font-semibold text-white shadow-lg shadow-[#0a3d62]/25 transition-all duration-300 hover:bg-[#1a5f8a] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            {t("nav.quote")}
          </Button>
        </nav>

        {/* Mobile: Language + Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageDropdown variant="desktop" />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#87ceeb]/15 transition-all duration-300 hover:bg-[#87ceeb]/30 hover:scale-110 active:scale-95 sm:h-10 sm:w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-[#0a3d62] transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="h-5 w-5 text-[#0a3d62] transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-[#87ceeb]/20 bg-gradient-to-b from-[#eaf6fd] to-white transition-all duration-400 ease-in-out lg:hidden ${
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto flex flex-col gap-1 px-3 py-3 sm:px-4">
          {navLinks.map((link, index) => {
            if (link.key === "nav.services") {
              return (
                <div
                  key={link.key}
                  className={mobileMenuOpen ? "animate-mobile-menu-item-stagger" : ""}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/15 text-left flex justify-between items-center group"
                  >
                    {t(link.key)}
                    <span className={`text-xs transition-transform duration-300 group-hover:translate-x-1 ${mobileServicesOpen ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {mobileServicesOpen && (
                    <div className="animate-slide-down-menu pl-4 flex flex-col gap-1 bg-[#87ceeb]/5 rounded mt-1">
                      <Link
                        href="/services#web-design"
                        className="rounded-lg px-4 py-2 text-xs font-medium text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/15 hover:translate-x-1"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileServicesOpen(false)
                        }}
                      >
                        {t("services.s1.title")}
                      </Link>
                      <Link
                        href="/services#ecommerce"
                        className="rounded-lg px-4 py-2 text-xs font-medium text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/15 hover:translate-x-1"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileServicesOpen(false)
                        }}
                      >
                        {t("services.s2.title")}
                      </Link>
                      <Link
                        href="/services#mobile-dev"
                        className="rounded-lg px-4 py-2 text-xs font-medium text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/15 hover:translate-x-1"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileServicesOpen(false)
                        }}
                      >
                        {t("services.s3.title")}
                      </Link>
                      <Link
                        href="/services#uiux-design"
                        className="rounded-lg px-4 py-2 text-xs font-medium text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/15 hover:translate-x-1"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileServicesOpen(false)
                        }}
                      >
                        {t("services.s4.title")}
                      </Link>
                      <Link
                        href="/services#seo-optimization"
                        className="rounded-lg px-4 py-2 text-xs font-medium text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/15 hover:translate-x-1"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileServicesOpen(false)
                        }}
                      >
                        {t("services.s5.title")}
                      </Link>
                      <Link
                        href="/services#website-maintenance"
                        className="rounded-lg px-4 py-2 text-xs font-medium text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/15 hover:translate-x-1"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileServicesOpen(false)
                        }}
                      >
                        {t("services.s6.title")}
                      </Link>
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`rounded-lg px-4 py-3 text-sm font-semibold text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/15 hover:translate-x-1 group ${mobileMenuOpen ? "animate-mobile-menu-item-stagger" : ""}`}
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            )
          })}
          <div className={`mt-1 ${mobileMenuOpen ? "animate-mobile-menu-item-stagger" : ""}`} style={{ animationDelay: `${navLinks.length * 0.08}s` }}>
            <LanguageDropdown variant="mobile" />
          </div>
          <Button
            onClick={handleContactClick}
            className={`mt-2 w-full rounded-full bg-[#0a3d62] py-3 font-semibold text-white hover:bg-[#1a5f8a] transition-all duration-300 active:scale-95 ${mobileMenuOpen ? "animate-mobile-menu-item-stagger" : ""}`}
            style={{ animationDelay: `${(navLinks.length + 1) * 0.08}s` }}
          >
            {t("nav.quote")}
          </Button>
        </div>
      </div>
    </header>
  )
}
