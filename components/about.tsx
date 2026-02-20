"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const skills = [
  { name: "Web Design & Development", percentage: 95 },
  { name: "E-Commerce Solutions", percentage: 90 },
  { name: "UI/UX & Accessibility", percentage: 85 },
]

const stats = [
  { value: "3k+", label: "Successful Projects" },
  { value: "200+", label: "Expert Team" },
  { value: "350+", label: "Happy Customers" },
  { value: "16+", label: "Years of Experience" },
]

const coreValues = [
  "Professional and scalable solutions",
  "Modern, responsive, and secure designs",
  "Clear communication and timely delivery",
  "Long-term support and maintenance",
  "Cost-effective development strategies",
]

export function About() {
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
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-white py-14 sm:py-20 md:py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full bg-[#87ceeb]/8 blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`mb-10 text-center sm:mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#87ceeb] sm:h-3 sm:w-3" />
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#0a3d62] sm:h-3 sm:w-3" />
            <span className="ml-2 text-xs font-medium text-[#0a3d62] sm:text-sm">About Us</span>
          </div>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-[#0a3d62] sm:text-3xl md:text-4xl lg:text-5xl">
            Empowering Your Success<br className="hidden sm:block" /> with Digital Expertise
          </h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left Images */}
          <div className={`relative ${isVisible ? "animate-fade-in-left delay-200" : "opacity-0"}`}>
            <div className="grid gap-3 sm:gap-4">
              <div className="group relative aspect-video overflow-hidden rounded-xl shadow-lg shadow-[#87ceeb]/15 ring-1 ring-[#87ceeb]/20 sm:rounded-2xl">
                <Image
                  src="/images/about-team.jpg"
                  alt="African developers working together"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="group relative aspect-video overflow-hidden rounded-xl shadow-lg shadow-[#87ceeb]/15 ring-1 ring-[#87ceeb]/20 sm:rounded-2xl">
                <Image
                  src="/images/about-discussion.jpg"
                  alt="African tech team brainstorming"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="animate-pulse-glow absolute -right-2 top-1/2 z-10 flex h-18 w-18 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#0a3d62] text-center text-[8px] font-bold text-white shadow-xl sm:-right-4 sm:h-24 sm:w-24 sm:border-4 sm:text-xs">
              <span>{"HIRE US"}<br />{"TODAY"}</span>
            </div>
          </div>

          {/* Right Content */}
          <div className={`${isVisible ? "animate-fade-in-right delay-300" : "opacity-0"}`}>
            <p className="mb-3 text-pretty text-sm text-gray-600 sm:mb-4 sm:text-base">
              Sapwebs is a professional web solutions brand specializing in the design, development, and deployment
              of high-quality digital platforms. We work with individuals, startups, SMEs, and organizations to
              transform ideas into impactful online experiences.
            </p>
            <p className="mb-5 text-pretty text-sm text-gray-600 sm:mb-6 sm:text-base">
              Our approach is collaborative, inclusive, and results-oriented -- ensuring every solution aligns with
              our clients{"'"} goals, users{"'"} needs, and industry best practices.
            </p>

            <h3 className="mb-3 text-base font-bold text-[#0a3d62] sm:mb-4 sm:text-lg">Why Choose Sapwebs</h3>
            <ul className="mb-6 space-y-2 sm:mb-8 sm:space-y-3">
              {coreValues.map((value, index) => (
                <li
                  key={value}
                  className={`flex items-center gap-2 text-sm text-gray-600 sm:gap-3 sm:text-base ${isVisible ? "animate-fade-in-left" : "opacity-0"}`}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#87ceeb] sm:h-5 sm:w-5" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>

            <div className="mb-6 space-y-4 sm:mb-8 sm:space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between sm:mb-2">
                    <span className="text-sm font-medium text-[#0a3d62] sm:text-base">{skill.name}</span>
                    <span className="text-xs text-gray-500 sm:text-sm">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#e8f4fd] sm:h-2.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0a3d62] to-[#87ceeb] transition-all duration-1000 ease-out"
                      style={{ width: isVisible ? `${skill.percentage}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleScroll("contact")}
              className="w-full gap-2 rounded-full bg-[#0a3d62] px-8 text-white shadow-lg shadow-[#0a3d62]/25 transition-all duration-300 hover:bg-[#1a5f8a] hover:shadow-xl hover:-translate-y-0.5 sm:w-auto"
            >
              About Us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-12 grid grid-cols-2 gap-6 border-t border-[#87ceeb]/30 pt-10 sm:mt-16 sm:gap-8 sm:pt-12 md:grid-cols-4 ${isVisible ? "" : "opacity-0"}`}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative text-center md:text-left ${isVisible ? "animate-count-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.8 + index * 0.15}s` }}
            >
              <div className="text-3xl font-bold text-[#0a3d62] sm:text-4xl md:text-5xl">{stat.value}</div>
              <div className="mt-1 text-xs text-gray-500 sm:text-sm">{stat.label}</div>
              {index < stats.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-[#87ceeb] md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
