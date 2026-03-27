"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

const footerLinks = {
  services: [
    { label: "Web Design & Development", href: "#services" },
    { label: "E-Commerce Platforms", href: "#services" },
    { label: "Web Applications", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "SEO & Optimization", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  support: [
    { label: "Contact", href: "#contact" },
    { label: "FAQs", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://web.facebook.com/sapwebsagency", label: "Facebook", hoverBg: "hover:bg-[#1877F2]" },
  { icon: Instagram, href: "https://www.instagram.com/sapwebsagency", label: "Instagram", hoverBg: "hover:bg-[#E4405F]" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/sapwebsagency/", label: "LinkedIn", hoverBg: "hover:bg-[#0A66C2]" },
]

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#0a3d62]">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col items-center gap-4 text-center sm:gap-6 md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">{t("footer.newsletter")}</h3>
              <p className="mt-1 text-sm text-white/70 sm:mt-2 sm:text-base">{t("footer.newsletter.desc")}</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder={t("contact.form.email")}
                className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#87ceeb] sm:px-6 sm:py-3"
              />
              <Button className="shrink-0 rounded-full bg-[#87ceeb] px-4 text-[#0a3d62] font-semibold transition-all duration-300 hover:bg-[#a8ddf0] sm:px-6">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/sapwebs-logo.png"
                alt="Sapwebs Logo"
                width={400}
                height={120}
                className="h-20 brightness-125 saturate-125 drop-shadow-lg sm:h-28"
                style={{ width: 'auto', height: undefined }}
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-white/70 sm:mt-4 sm:text-base">
              Delivering reliable digital solutions for a connected world. We combine technical expertise,
              strategic thinking, and creative design to build impactful digital platforms.
            </p>
            <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
              <a
                href="https://wa.me/2347035321179"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#25D366] sm:gap-3"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span>+234 703 532 1179 (WhatsApp)</span>
              </a>
              <a href="tel:+2347035321179" className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#87ceeb] sm:gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+234 703 532 1179</span>
              </a>
              <a href="mailto:sapwebs2025@gmail.com" className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#87ceeb] sm:gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <span>sapwebs2025@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-white/70 sm:gap-3">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>9 Old Olowora Road, Magodo Isheri Lagos</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white sm:mb-4 sm:text-base">{t("nav.services")}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-white/70 transition-colors hover:text-[#87ceeb] sm:text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white sm:mb-4 sm:text-base">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-white/70 transition-colors hover:text-[#87ceeb] sm:text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white sm:mb-4 sm:text-base">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-white/70 transition-colors hover:text-[#87ceeb] sm:text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="border-t border-white/10 py-8 sm:py-10">
          <div className="text-center">
            <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">Follow us on Social Media</h3>
            <div className="flex justify-center gap-4 sm:gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 text-white transition-all duration-300 ${social.hoverBg} hover:text-white`}
                    title={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center sm:mt-0 sm:pt-8 md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-white/70 sm:text-sm">
            &copy; {new Date().getFullYear()} Sapwebs. All Rights Reserved. Delivering reliable digital solutions for a connected world.
          </p>
          <div className="flex gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 ${social.hoverBg} hover:scale-110 sm:h-10 sm:w-10`}
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
