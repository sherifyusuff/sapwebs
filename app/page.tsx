"use client"

import { LanguageProvider } from "@/lib/language-context"
import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import StructuredData from "@/components/structured-data"

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <StructuredData />
        <TopBar />
        <Header />
        <main className="flex-1">
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  )
}
