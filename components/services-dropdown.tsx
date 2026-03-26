"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const servicesMenu = [
  { href: "/services#web-design", key: "services.s1.title" },
  { href: "/services#ecommerce", key: "services.s2.title" },
  { href: "/services#mobile-dev", key: "services.s3.title" },
  { href: "/services#uiux-design", key: "services.s4.title" },
  { href: "/services#seo-optimization", key: "services.s5.title" },
  { href: "/services#website-maintenance", key: "services.s6.title" },
]

export function ServicesDropdown() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative group">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-semibold text-[#0a3d62] transition-all duration-300 hover:bg-[#87ceeb]/20 group-hover:bg-[#87ceeb]/20"
      >
        {t("nav.services")}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-[#87ceeb]/30 bg-white shadow-lg">
          {servicesMenu.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block px-4 py-3 text-sm font-medium text-[#0a3d62] transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-[#87ceeb]/10"
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
