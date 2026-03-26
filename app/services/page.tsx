'use client'

import { LanguageProvider } from '@/lib/language-context'
import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { TopBar } from '@/components/top-bar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const allServices = [
  {
    title: "Web Design & Development",
    description: "Custom websites and web applications built with cutting-edge technology. Responsive, fast, and SEO-optimized for maximum online visibility.",
    image: "/images/service-web.jpg",
    icon: "🌐",
  },
  {
    title: "E-Commerce Platforms",
    description: "Full-featured online stores with product management, payment integration, inventory tracking, and customer analytics.",
    image: "/images/service-ecommerce.jpg",
    icon: "🛒",
  },
  {
    title: "Mobile Application Development",
    description: "Native and cross-platform mobile apps for iOS and Android with intuitive interfaces and optimal performance.",
    image: "/images/service-mobile-dev.jpg",
    icon: "📱",
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, user-centered interface design and comprehensive user experience strategy for digital products.",
    image: "/images/service-uiux.jpg",
    icon: "🎨",
  },
  {
    title: "SEO & Optimization",
    description: "Comprehensive SEO strategies to boost online visibility, drive organic traffic, and rank higher on search engines.",
    image: "/images/service-seo-dev.jpg",
    icon: "📈",
  },
  {
    title: "Website Maintenance",
    description: "Ongoing support, updates, security monitoring, and performance optimization for your digital assets.",
    image: "/images/service-maintenance.jpg",
    icon: "🔧",
  },
]

function ServicesPageContent() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <div className="relative bg-gradient-to-b from-[#e8f4fd] via-white to-[#dff0fa] py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 text-[#0a3d62] hover:text-[#1a5f8a] transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0a3d62] mb-4">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Explore our complete range of digital solutions tailored to help your business thrive in the modern landscape.
            </p>
          </div>
        </div>

        <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allServices.map((service, index) => (
                <div
                  key={service.title}
                  className={`group relative overflow-hidden rounded-2xl bg-white ring-1 ring-[#87ceeb]/20 transition-all duration-500 hover:ring-[#87ceeb]/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#87ceeb]/20 ${
                    isVisible ? 'animate-elastic-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#0a3d62] to-[#1a6fa0]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a3d62] via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 text-4xl">{service.icon}</div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="mb-3 text-xl sm:text-2xl font-bold text-[#0a3d62]">
                      {service.title}
                    </h3>
                    <p className="mb-6 text-sm sm:text-base text-gray-600 line-clamp-3">
                      {service.description}
                    </p>
                    <Button
                      asChild
                      className="w-full gap-2 rounded-lg bg-[#0a3d62] text-white hover:bg-[#1a5f8a] transition-all duration-300"
                    >
                      <Link href="/#contact">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 sm:mt-20 md:mt-24 rounded-2xl bg-gradient-to-r from-[#0a3d62] to-[#1a6fa0] p-8 sm:p-12 text-center">
              <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-white/80 text-lg max-w-2xl mx-auto">
                Let's discuss your project and find the perfect solution for your business needs.
              </p>
              <Button
                asChild
                className="gap-2 rounded-lg bg-[#87ceeb] text-[#0a3d62] hover:bg-white px-8 py-6 text-lg font-semibold transition-all duration-300"
              >
                <Link href="/#contact">
                  Contact Us Today
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function ServicesPage() {
  return (
    <LanguageProvider>
      <ServicesPageContent />
    </LanguageProvider>
  )
}
