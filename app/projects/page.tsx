'use client'

import { LanguageProvider } from '@/lib/language-context'
import { TopBar } from '@/components/top-bar'
import { Header } from '@/components/header'
import { Portfolio } from '@/components/portfolio'
import { Testimonials } from '@/components/testimonials'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function ProjectsPage() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <Header />
        <main className="flex-1">
          <Portfolio />
          <Testimonials />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  )
}
