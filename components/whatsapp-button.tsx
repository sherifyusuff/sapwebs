"use client"

import { MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPulsing, setIsPulsing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing((prev) => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <a
      href="https://wa.me/2347035321179?text=Hello%20Sapwebs%2C%20I%27m%20interested%20in%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-full bg-[#25D366] p-0 text-white shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] md:bottom-8 md:right-8 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      {/* Ping ring animation */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" style={{ animationDuration: "2s" }} />

      {/* Main icon circle */}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] md:h-16 md:w-16">
        <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white md:h-9 md:w-9" aria-hidden="true">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.31 22.606c-.39 1.1-1.932 2.014-3.174 2.28-.852.182-1.962.326-5.702-1.226-4.786-1.986-7.862-6.836-8.1-7.152-.228-.316-1.918-2.556-1.918-4.876s1.214-3.462 1.646-3.934c.39-.426.916-.602 1.22-.602.152 0 .288.008.41.014.432.02.648.044.934.724.358.852 1.228 2.994 1.334 3.212.108.218.214.506.068.804-.136.306-.256.442-.474.694-.218.252-.426.446-.644.718-.196.236-.416.49-.174.932.242.434 1.076 1.776 2.312 2.876 1.59 1.416 2.93 1.856 3.348 2.062.418.206.664.174.91-.104.252-.286 1.082-1.258 1.372-1.692.284-.434.574-.362.964-.218.394.14 2.494 1.176 2.922 1.39.428.218.712.324.818.504.104.176.104 1.034-.286 2.134Z" />
        </svg>
      </div>

      {/* Tooltip label on hover - hidden on mobile */}
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap pr-0 text-sm font-semibold transition-all duration-300 group-hover:max-w-xs group-hover:pr-5 md:block">
        Chat with us
      </span>
    </a>
  )
}
