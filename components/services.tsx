"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    title: "Web Design & Development",
    description: "We create responsive, visually appealing, and high-performance websites using modern frameworks and best practices.",
    image: "/images/service-web.jpg",
  },
  {
    title: "E-Commerce Platforms",
    description: "Secure and scalable e-commerce platforms that enhance online sales, with payment gateway integration and order tracking.",
    image: "/images/service-mobile.jpg",
    featured: true,
  },
  {
    title: "Web Applications",
    description: "Custom web applications built to automate processes and improve operational efficiency, including dashboards and SaaS platforms.",
    image: "/images/service-cloud.jpg",
  },
]

export function Services() {
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
        <div className={`mb-10 flex flex-col gap-4 text-center sm:mb-12 sm:gap-6 md:flex-row md:items-end md:justify-between md:text-left ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div>
            <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4 md:justify-start">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#87ceeb] sm:h-3 sm:w-3" />
              <span className="flex h-2.5 w-2.5 rounded-full bg-white/50 sm:h-3 sm:w-3" />
              <span className="ml-2 text-xs font-medium text-white/80 sm:text-sm">Our Services</span>
            </div>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Boost Your Brand<br className="hidden sm:block" /> with Our Expertise
            </h2>
            <p className="mt-3 text-sm text-white/70 sm:mt-4 sm:text-base md:max-w-xl">
              Sapwebs offers a wide range of web and digital solutions tailored to meet diverse business needs.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => handleScroll("contact")}
            className="mx-auto gap-2 rounded-full border-[#87ceeb]/40 bg-transparent text-white transition-all duration-300 hover:bg-[#87ceeb] hover:text-[#0a3d62] hover:border-[#87ceeb] md:mx-0"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-xl bg-[#0d4a75] ring-1 ring-[#87ceeb]/10 transition-all duration-500 hover:ring-[#87ceeb]/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#87ceeb]/10 sm:rounded-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
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
                <button
                  type="button"
                  onClick={() => handleScroll("contact")}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    service.featured ? "text-[#0a3d62] hover:gap-3" : "text-[#87ceeb] hover:gap-3"
                  }`}
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
