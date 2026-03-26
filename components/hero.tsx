"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-[#e8f4fd] via-[#f0f8ff] to-[#dff0fa] py-12 sm:py-16 md:py-24 lg:py-28">
      {/* Sky blue decorative background elements */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#87ceeb]/15 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-64 w-64 rounded-full bg-[#87ceeb]/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute right-1/3 top-10 hidden h-48 w-48 rounded-full bg-[#b0e0f6]/15 blur-2xl md:block" />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="animate-reveal-up mb-4 flex items-center justify-center gap-2 sm:mb-6 lg:justify-start">
              <span className="flex h-2.5 w-2.5 animate-scale-bounce rounded-full bg-[#87ceeb] sm:h-3 sm:w-3" />
              <span className="animate-scale-bounce delay-100 flex h-2.5 w-2.5 rounded-full bg-[#0a3d62] sm:h-3 sm:w-3" />
              <span className="ml-2 text-xs font-medium text-[#0a3d62] sm:text-sm">{t("hero.tag")}</span>
            </div>

            <h1 className="animate-reveal-up delay-100 mb-4 text-balance text-3xl font-bold leading-tight tracking-tight text-[#0a3d62] sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              {t("hero.title1")}{" "}
              <span className="animate-text-shimmer bg-gradient-to-r from-[#0a3d62] via-[#87ceeb] to-[#0a3d62] bg-[length:200%_auto] bg-clip-text text-transparent">{t("hero.title2")}</span>
            </h1>

            <p className="animate-reveal-up delay-200 mx-auto mb-8 max-w-lg text-pretty text-base text-gray-600 sm:mb-10 sm:text-lg lg:mx-0">
              {t("hero.desc")}
            </p>

            <div className="animate-reveal-up delay-300 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
              <Button
                size="lg"
                onClick={() => handleScroll("contact")}
                className="w-full gap-2 rounded-full bg-[#0a3d62] px-8 text-white shadow-lg shadow-[#0a3d62]/25 transition-all duration-300 hover:bg-[#1a5f8a] hover:shadow-xl hover:-translate-y-0.5 sm:w-auto"
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleScroll("portfolio")}
                className="w-full rounded-full border-[#87ceeb] bg-transparent font-medium text-[#0a3d62] transition-all duration-300 hover:bg-[#87ceeb]/15 hover:border-[#0a3d62] sm:w-auto"
              >
                {t("hero.cta2")}
              </Button>
            </div>
          </div>

          {/* Right Images */}
          <div className="animate-rotate-in delay-200 relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative grid grid-cols-2 gap-3 sm:gap-5">
              <div className="animate-slide-in-left delay-300 relative aspect-[3/4] overflow-hidden rounded-xl shadow-2xl shadow-[#87ceeb]/25 ring-2 ring-[#87ceeb]/20 sm:rounded-2xl">
                <Image
                  src="/images/hero-team.jpg"
                  alt="African tech team collaborating"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 35vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3d62]/30 via-transparent to-transparent" />
              </div>
              <div className="animate-slide-in-right delay-500 relative aspect-[3/4] translate-y-6 overflow-hidden rounded-xl shadow-2xl shadow-[#87ceeb]/25 ring-2 ring-[#87ceeb]/20 sm:translate-y-10 sm:rounded-2xl">
                <Image
                  src="/images/hero-meeting.jpg"
                  alt="African tech professionals in meeting"
                  fill
                  loading="eager"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 35vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3d62]/30 via-transparent to-transparent" />
                {/* Hire Us Badge */}
                <div className="animate-pulse-glow absolute -left-3 bottom-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-[#0a3d62] text-center text-[8px] font-bold leading-tight text-white shadow-xl sm:-left-6 sm:bottom-6 sm:h-20 sm:w-20 sm:border-4 sm:text-[10px]">
                  <span>{"HIRE US"}<br />{"TODAY"}</span>
                </div>
              </div>
            </div>

            {/* Decorative sparkle elements */}
            <div className="animate-parallax-float absolute -right-2 top-1/4 hidden text-[#87ceeb] sm:block">
              <Sparkle className="h-7 w-7 fill-current sm:h-9 sm:w-9" />
            </div>
            <div className="animate-parallax-float delay-300 absolute bottom-1/4 right-1/4 hidden text-[#87ceeb] sm:block">
              <Sparkle className="h-5 w-5 fill-current sm:h-7 sm:w-7" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
