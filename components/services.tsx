"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const services = [
    {
      title: t("services.s1.title"),
      description: t("services.s1.desc"),
      image: "/images/service-web.jpg",
    },
    {
      title: "E-Commerce Platforms",
      description: "Full-featured online stores with product management, payment integration, inventory tracking, and customer analytics.",
      image: "/images/service-ecommerce.jpg",
    },
    {
      title: "Mobile Application Development",
      description: "Native and cross-platform mobile apps designed for iOS and Android with intuitive interfaces and optimal performance.",
      image: "/images/service-mobile-dev.jpg",
      featured: true,
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, user-centered interface design and comprehensive user experience strategy for digital products.",
      image: "/images/service-uiux.jpg",
    },
    {
      title: "SEO & Optimization",
      description: "Comprehensive SEO strategies to boost your online visibility, drive organic traffic, and rank higher on search engines.",
      image: "/images/service-seo-dev.jpg",
    },
    {
      title: "Website Maintenance",
      description: "Ongoing support, updates, security monitoring, and performance optimization for your digital assets.",
      image: "/images/service-maintenance.jpg",
    },
  ]

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

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="services" ref={sectionRef} className="relative bg-[#0a3d62] py-14 sm:py-20 md:py-28">
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[#87ceeb]/5 blur-3xl sm:h-60 sm:w-60" />

      <div className="container mx-auto px-4">
        <div className={`mb-10 flex flex-col gap-4 text-center sm:mb-12 sm:gap-6 md:flex-row md:items-end md:justify-between md:text-left ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <div>
            <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4 md:justify-start">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#87ceeb] sm:h-3 sm:w-3" />
              <span className="flex h-2.5 w-2.5 rounded-full bg-white/50 sm:h-3 sm:w-3" />
              <span className="ml-2 text-xs font-medium text-white/80 sm:text-sm">{t("services.tag")}</span>
            </div>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t("services.title")}
            </h2>
            <p className="mt-3 text-sm text-white/70 sm:mt-4 sm:text-base md:max-w-xl">
              {t("services.desc")}
            </p>
          </div>
          <Link href="/services">
            <Button
              className="mx-auto gap-2 rounded-full border-[#87ceeb]/60 bg-white/10 text-white transition-all duration-300 hover:bg-[#87ceeb] hover:text-[#0a3d62] hover:border-[#87ceeb] hover:shadow-lg hover:shadow-[#87ceeb]/20 md:mx-0 backdrop-blur-sm"
            >
              {t("services.btn")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-xl bg-[#0d4a75] ring-1 ring-[#87ceeb]/10 transition-all duration-500 hover:ring-[#87ceeb]/50 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#87ceeb]/30 sm:rounded-2xl ${isVisible ? "animate-elastic-in" : "opacity-0"}`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3d62] via-transparent to-transparent" />
              </div>
              <div className={`p-5 sm:p-6 ${service.featured ? "bg-[#87ceeb]" : "bg-[#0d4a75]"}`}>
                <h3 className={`mb-2 text-lg font-bold sm:text-xl ${service.featured ? "text-[#0a3d62]" : "text-white"}`}>
                  {service.title}
                </h3>
                <p className={`mb-3 text-sm sm:mb-4 ${service.featured ? "text-[#0a3d62]/80" : "text-white/70"}`}>
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    service.featured ? "text-[#0a3d62] hover:gap-3" : "text-[#87ceeb] hover:gap-3"
                  }`}
                >
                  {t("services.learn")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
