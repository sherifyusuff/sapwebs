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
    <header className="sticky top-0 z-50 w-full border-b border-[#87ceeb]/30 bg-gradient-to-r from-[#e0f2fc] via-[#eaf6fd] to-[#d6eefb]/95 shadow-[0_2px_20px_-4px_rgba(10,61,98,0.12)] backdrop-blur-lg transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 sm:py-2.5 md:px-6">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3 transition-all duration-300 hover:opacity-90">
          <Image
            src="/sapwebs-logo.png"
            alt="Sapwebs - Crafting Digital Excellence"
            width={720}
            height={216}
            className="h-20 drop-shadow-md transition-transform duration-300 group-hover:scale-[1.02] sm:h-24 md:h-[6.5rem] lg:h-28"
            style={{ width: 'auto' }}
            priority
            loading="eager"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navLinks.map((link, index) => {
            if (link.key === "nav.services") {
              return <ServicesDropdown key={link.key} />
            }
            return (
              <Link
                key={link.key}
                href={link.href}
                className="group relative rounded-full px-4 py-2.5 text-[0.9rem] font-semibold tracking-tight text-[#0a3d62] transition-all duration-300 hover:text-[#0a3d62] xl:px-5"
              >
                {t(link.key)}
                <span className="absolute inset-x-2 bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#87ceeb] to-[#0a3d62] scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100" />
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'radial-gradient(circle, rgba(135, 206, 235, 0.08) 0%, transparent 70%)',
                }} />
              </Link>
            )
          })}
          <LanguageDropdown variant="desktop" />
          <Button
            onClick={handleContactClick}
            className="ml-2 rounded-full bg-[#0a3d62] px-6 py-2.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-[#0a3d62]/20 transition-all duration-300 hover:bg-[#1a5f8a] hover:shadow-xl hover:-translate-y-0.5 active:scale-95 xl:ml-4 xl:px-8"
          >
            {t("nav.quote")}
          </Button>
        </nav>

        {/* Mobile: Language + Menu */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <LanguageDropdown variant="desktop" />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#87ceeb]/20 bg-white/60 shadow-sm transition-all duration-300 hover:bg-[#87ceeb]/20 hover:shadow-md hover:scale-105 active:scale-95 sm:h-11 sm:w-11"
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
