"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown, Check } from "lucide-react"
import { useLanguage, languageOptions } from "@/lib/language-context"

const flagEmojis: Record<string, string> = {
  GB: "🇬🇧",
  FR: "🇫🇷",
  ES: "🇪🇸",
  PT: "🇵🇹",
  SA: "🇸🇦",
  CN: "🇨🇳",
}

export function LanguageDropdown({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languageOptions.find((l) => l.code === language) || languageOptions[0]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (variant === "mobile") {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between rounded-lg bg-[#87ceeb]/10 px-4 py-3 text-sm font-semibold text-[#0a3d62] transition-all duration-200 hover:bg-[#87ceeb]/20"
        >
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {mounted && <span>{flagEmojis[currentLang.flag]}</span>}
            <span>{currentLang.label}</span>
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        <div
          className={`mt-1 overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-[#87ceeb]/20 transition-all duration-300 ${
            open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setLanguage(lang.code)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                language === lang.code
                  ? "bg-[#e8f4fd] font-semibold text-[#0a3d62]"
                  : "text-gray-600 hover:bg-[#f0f8ff]"
              }`}
            >
              {mounted && <span className="text-base">{flagEmojis[lang.flag]}</span>}
              <span className="flex-1 text-left">{lang.label}</span>
              {language === lang.code && <Check className="h-4 w-4 text-[#0a3d62]" />}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-[#87ceeb]/30 bg-white/50 px-3 py-1.5 text-xs font-medium text-[#0a3d62] backdrop-blur-sm transition-all duration-300 hover:border-[#87ceeb]/60 hover:bg-white/80 hover:shadow-md"
      >
        <Globe className="h-3.5 w-3.5" />
        {mounted && <span className="text-sm">{flagEmojis[currentLang.flag]}</span>}
        <span className="hidden sm:inline">{currentLang.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute right-0 top-full z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-xl bg-white/95 shadow-2xl ring-1 ring-[#87ceeb]/20 backdrop-blur-lg transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="border-b border-[#87ceeb]/10 px-4 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Select Language</p>
        </div>
        {languageOptions.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => {
              setLanguage(lang.code)
              setOpen(false)
            }}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
              language === lang.code
                ? "bg-[#e8f4fd] font-semibold text-[#0a3d62]"
                : "text-gray-600 hover:bg-[#f0f8ff] hover:text-[#0a3d62]"
            }`}
          >
            <span className="text-base">{flagEmojis[lang.flag]}</span>
            <span className="flex-1 text-left">{lang.label}</span>
            {language === lang.code && (
              <Check className="h-3.5 w-3.5 text-[#0a3d62]" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
