"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Corporate Business Website",
    category: "Web Design & Development",
    description: "A professional, responsive corporate website with modern design, CMS integration, and SEO optimization.",
    tags: ["Next.js", "Tailwind CSS", "CMS"],
  },
  {
    title: "E-Commerce Platform",
    category: "E-Commerce Development",
    description: "Full-featured online store with product management, payment gateway integration, and order tracking analytics.",
    tags: ["React", "Stripe", "PostgreSQL"],
  },
  {
    title: "Admin Dashboard & SaaS",
    category: "Web Application",
    description: "Custom admin dashboard with real-time analytics, role-based access, and automated reporting for business operations.",
    tags: ["TypeScript", "Node.js", "D3.js"],
  },
  {
    title: "Portfolio & Landing Pages",
    category: "Web Design",
    description: "Elegant portfolio websites and high-conversion landing pages for startups and creative professionals.",
    tags: ["UI/UX", "Figma", "Next.js"],
  },
]

export function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="relative overflow-hidden bg-[#f0f8ff] py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className={`mx-auto mb-10 max-w-2xl text-center sm:mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight text-[#0a3d62] sm:mb-4 sm:text-3xl md:text-4xl">
            Our Projects
          </h2>
          <p className="text-pretty text-sm text-gray-600 sm:text-base md:text-lg">
            We take pride in delivering solutions that meet real-world business challenges. Each project reflects
            our commitment to quality, functionality, and user experience.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`group cursor-pointer overflow-hidden border-[#87ceeb]/20 bg-white transition-all duration-500 hover:border-[#87ceeb]/50 hover:shadow-xl hover:shadow-[#87ceeb]/10 hover:-translate-y-1 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + index * 0.12}s` }}
            >
              <div className="relative h-36 bg-gradient-to-br from-[#0a3d62] to-[#1a6fa0] sm:h-48">
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <div className="text-center text-white">
                    <div className="text-[10px] font-medium uppercase tracking-wider text-[#87ceeb] sm:text-xs">
                      {project.category}
                    </div>
                    <div className="mt-1.5 text-lg font-bold sm:mt-2 sm:text-2xl">{project.title}</div>
                  </div>
                </div>
                <div className="absolute right-3 top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 sm:right-4 sm:top-4">
                  <div className="rounded-full bg-[#87ceeb]/20 p-1.5 backdrop-blur sm:p-2">
                    <ExternalLink className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                  </div>
                </div>
              </div>
              <CardContent className="p-4 sm:p-6">
                <p className="mb-3 text-sm text-gray-600 sm:mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-[#e8f4fd] text-[10px] text-[#0a3d62] sm:text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
