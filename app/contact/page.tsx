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
          <section className="bg-gradient-to-b from-[#87ceeb]/5 to-transparent py-8 sm:py-12">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h1 className="animate-elastic-in text-4xl font-bold text-[#0a3d62] sm:text-5xl">
                  Get In Touch
                </h1>
                <p className="animate-elastic-in delay-100 mt-4 text-gray-600 sm:text-lg">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
            </div>
          </section>
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  )
}
