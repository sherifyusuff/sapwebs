"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

const projects = [
  {
    title: "Heritage Fit",
    category: "Fashion & Lifestyle",
    description: "A modern fashion brand website showcasing timeless and elegant collections for the contemporary Nigerian.",
    tags: ["Next.js", "React", "Tailwind CSS", "Modern UI"],
    image: "/images/heritage-fit.png",
    url: "https://v0-heritagefit.vercel.app/"
  },
  {
    title: "Tasty Hub",
    category: "Food & Restaurant",
    description: "A premium restaurant discovery and ordering platform based in Lagos, offering authentic Nigerian cuisine.",
    tags: ["Next.js", "React", "Tailwind CSS", "Search & Filters"],
    image: "/images/tasty-hub.png",
    url: "https://tastyhub-theta.vercel.app/"
  },
  {
    title: "Aurum Salon & Spa",
    category: "Beauty & Wellness",
    description: "A luxury unisex salon and spa platform in Lekki, featuring service bookings and premium wellness experiences.",
    tags: ["Next.js", "React", "Booking System", "Premium Design"],
    image: "/images/aurum-salon.png",
    url: "https://aurumm-five.vercel.app/"
  },
  {
    title: "SaaS Admin Dashboard",
    category: "Web Application",
    description: "Professional admin dashboard with analytics, revenue tracking, real-time data visualization, and role-based access.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    image: "/images/admin-dashboard.png",
    url: "https://saas-admin-dashboard-pnnu.vercel.app/"
  },
  {
    title: "Portfolio Website",
    category: "Web Design",
    description: "Modern portfolio showcase with smooth animations, advanced interactions, project gallery, and seamless contact integration.",
    tags: ["Next.js", "React", "Tailwind CSS", "Animation"],
    image: "/images/portfolio-site.png",
    url: "https://sherifyusuff-portfolio-xqms.vercel.app/"
  },
  {
    title: "E-Commerce Platform",
    category: "E-Commerce Development",
    description: "Full-featured luxury online store with product management, category filters, payment gateway integration, and order tracking.",
    tags: ["React", "Stripe", "Next.js", "TypeScript"],
    image: "/images/luxe-ecommerce.png",
    url: "https://luxe-ecommerce-store-sigma.vercel.app/"
  },
  {
    title: "Car Dealership Website",
    category: "Web Design & Development",
    description: "A professional auto dealership website with vehicle gallery, inventory management, service booking, and responsive design.",
    tags: ["Next.js", "Tailwind CSS", "CMS"],
    image: "/images/car-dealership.png",
    url: ""
  },
]

export function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

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
    <section id="portfolio" ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-[#f0f8ff] to-white py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className={`mx-auto mb-12 max-w-2xl text-center sm:mb-16 md:mb-20 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <h2 className="mb-4 text-balance text-3xl font-extrabold tracking-tight text-[#0a3d62] sm:text-4xl md:text-5xl">
            {t("portfolio.title") || "Featured Projects"}
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded bg-[#87ceeb]"></div>
          <p className="text-pretty text-base text-gray-600 sm:text-lg">
            {t("portfolio.desc") || "Explore an assortment of my latest work combining modern aesthetic design and robust engineering."}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const CardElement = (
              <Card
                className={`group relative flex h-full cursor-pointer flex-col overflow-hidden border border-[#87ceeb]/20 bg-white transition-all duration-500 ease-out hover:-translate-y-3 hover:border-[#87ceeb]/60 hover:shadow-2xl hover:shadow-[#0a3d62]/20 ${isVisible ? "animate-elastic-in" : "opacity-0"}`}
                style={{ animationDelay: `${150 + index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0a3d62] to-[#1a6fa0] sm:h-56">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="text-center text-white">
                        <div className="text-xs font-semibold uppercase tracking-widest text-[#87ceeb]">
                          {project.category}
                        </div>
                        <div className="mt-2 text-xl font-bold">{project.title}</div>
                      </div>
                    </div>
                  )}
                  {/* Subtle dark gradient for text readability if an overlay is needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0a3d62] shadow-sm backdrop-blur-sm sm:left-5 sm:top-5">
                    {project.category}
                  </div>

                  {project.url && (
                    <div className="absolute right-4 top-4 flex h-8 w-8 translate-x-4 opacity-0 items-center justify-center rounded-full bg-[#0a3d62] text-white shadow-lg transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:opacity-100 sm:right-5 sm:top-5 sm:h-10 sm:w-10">
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  )}
                </div>

                <CardContent className="flex flex-1 flex-col p-5 sm:p-6 lg:p-8">
                  <h3 className="mb-2 text-xl font-bold text-[#0a3d62] transition-colors duration-300 group-hover:text-[#87ceeb] sm:mb-3 sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mb-5 flex-1 line-clamp-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-md bg-[#e8f4fd] px-2.5 py-1 text-[10px] font-medium text-[#0a3d62] transition-colors group-hover:bg-[#d0ebfc] sm:text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )

            if (project.url) {
              return (
                <a key={project.title} href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full outline-none focus:ring-4 focus:ring-[#87ceeb]/50 rounded-xl">
                  {CardElement}
                </a>
              )
            }

            return (
              <div key={project.title} className="block h-full">
                {CardElement}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
