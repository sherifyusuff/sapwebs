"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    name: "Adebayo Ogunlesi",
    role: "CEO, AfriTech Solutions",
    content:
      "Sapwebs delivered a professional website that exceeded our expectations. Their team understood our vision and brought it to life with quality and precision.",
    rating: 5,
  },
  {
    name: "Ngozi Okafor",
    role: "CTO, Lagos Fintech Hub",
    content:
      "The e-commerce platform Sapwebs built for us has transformed our online sales. Their attention to detail, clear communication, and timely delivery impressed us greatly.",
    rating: 5,
  },
  {
    name: "Amina Bello",
    role: "Founder, HealthPlus Nigeria",
    content:
      "Working with Sapwebs was a seamless experience. They designed an accessible, user-friendly platform that our customers love. Truly a trusted digital partner.",
    rating: 5,
  },
]

export function Testimonials() {
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
    <section id="testimonials" ref={sectionRef} className="relative overflow-hidden bg-white py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className={`mx-auto mb-10 max-w-2xl text-center sm:mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight text-[#0a3d62] sm:mb-4 sm:text-3xl md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="text-pretty text-sm text-gray-600 sm:text-base md:text-lg">
            We combine technical expertise, strategic thinking, and creative design to build websites and digital
            platforms that are not only visually appealing but also functional, secure, and performance-driven.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`border-[#87ceeb]/20 bg-white transition-all duration-500 hover:border-[#87ceeb]/40 hover:shadow-xl hover:shadow-[#87ceeb]/10 hover:-translate-y-1 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.15 + index * 0.15}s` }}
            >
              <CardContent className="p-5 sm:p-6">
                <Quote className="mb-3 h-6 w-6 text-[#87ceeb]/40 sm:mb-4 sm:h-8 sm:w-8" />
                <p className="mb-4 text-sm text-[#0a3d62] sm:mb-6 sm:text-base">{testimonial.content}</p>
                <div className="mb-3 flex gap-1 sm:mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#87ceeb] text-[#87ceeb] sm:h-4 sm:w-4" />
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0a3d62] sm:text-base">{testimonial.name}</div>
                  <div className="text-xs text-gray-500 sm:text-sm">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
