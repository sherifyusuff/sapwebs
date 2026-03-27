'use client'

import { LanguageProvider } from '@/lib/language-context'
import { TopBar } from '@/components/top-bar'
import { Header } from '@/components/header'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function ContactPage() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <Header />
        <main className="flex-1">
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  )
}
