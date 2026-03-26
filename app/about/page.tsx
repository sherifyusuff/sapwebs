'use client'

import { LanguageProvider } from '@/lib/language-context'
import { TopBar } from '@/components/top-bar'
import { Header } from '@/components/header'
import { About } from '@/components/about'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function AboutPage() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <Header />
        <main className="flex-1">
          <About />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  )
}
