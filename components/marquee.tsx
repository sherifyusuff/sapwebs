"use client"

import { Sparkles } from "lucide-react"

const services = [
  "Web Design & Development",
  "E-Commerce Platforms",
  "Web Applications",
  "Mobile Applications",
  "Website Maintenance",
  "SEO & Optimization",
  "Landing Pages",
  "API Integration",
]

export function Marquee() {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#0a3d62] via-[#0e4d7a] to-[#0a3d62] py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...services, ...services].map((service, index) => (
          <div key={index} className="mx-8 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[#87ceeb]" />
            <span className="text-lg font-medium text-white">{service}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
