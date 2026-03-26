"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, MessageCircle, Globe, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+234 703 532 1179",
    href: "https://wa.me/2347035321179",
  },
  {
    icon: Mail,
    title: "Primary Email",
    value: "sapwebs2025@gmail.com",
    href: "mailto:sapwebs2025@gmail.com",
  },
  {
    icon: Mail,
    title: "Secondary Email",
    value: "info@sapwebs.com",
    href: "mailto:info@sapwebs.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+234 703 532 1179",
    href: "tel:+2347035321179",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "9 Old Olowora Road, Magodo Isheri Lagos",
    href: "#",
  },
  {
    icon: Globe,
    title: "Remote Services",
    value: "Available Worldwide",
    href: "#",
  },
]

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "Thank you! We'll get back to you shortly."
        })
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        toast.error("Failed to send message", {
          description: data.error || "Please try again or contact us directly."
        })
      }
    } catch (error) {
      toast.error("Network Error", {
        description: "Could not connect to the server. Please check your internet and try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden bg-[#f0f8ff] py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className={`mx-auto mb-10 max-w-2xl text-center sm:mb-16 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight text-[#0a3d62] sm:mb-4 sm:text-3xl md:text-4xl">
            {t("contact.title")}
          </h2>
          <p className="text-pretty text-sm text-gray-600 sm:text-base md:text-lg">
            {t("contact.desc")}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className={`border-[#87ceeb]/20 shadow-lg shadow-[#87ceeb]/5 ${isVisible ? "animate-slide-in-left delay-200" : "opacity-0"}`}>
            <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-2">
              <CardTitle className="text-lg text-[#0a3d62] sm:text-xl">{t("contact.form.title")}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {t("contact.form.desc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2 sm:p-6 sm:pt-2">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="name" className="text-xs sm:text-sm">{t("contact.form.name")}</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.name")} 
                    required 
                    className="border-[#87ceeb]/30 text-sm focus-visible:ring-[#87ceeb]" 
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm">{t("contact.form.email")}</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com" 
                    required 
                    className="border-[#87ceeb]/30 text-sm focus-visible:ring-[#87ceeb]" 
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="phone" className="text-xs sm:text-sm">{t("contact.form.phone")}</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 XXX XXX XXXX"
                    className="border-[#87ceeb]/30 text-sm focus-visible:ring-[#87ceeb]" 
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="service" className="text-xs sm:text-sm">{t("contact.form.service")}</Label>
                  <Input 
                    id="service" 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder={t("contact.form.service")} 
                    required 
                    className="border-[#87ceeb]/30 text-sm focus-visible:ring-[#87ceeb]" 
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="message" className="text-xs sm:text-sm">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.message")}
                    rows={3}
                    required
                    className="border-[#87ceeb]/30 text-sm focus-visible:ring-[#87ceeb]"
                  />
                </div>
                {/* Honeypot field - hidden from users */}
                <input 
                  type="hidden" 
                  name="website_url" 
                  value="" 
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#0a3d62] text-white transition-all hover:bg-[#1a5f8a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : t("contact.form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className={`flex flex-col justify-center gap-3 sm:gap-4 ${isVisible ? "animate-slide-in-right delay-300" : "opacity-0"}`}>
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-3 rounded-lg border border-[#87ceeb]/20 bg-white p-4 transition-all duration-300 hover:border-[#87ceeb]/50 hover:shadow-lg hover:shadow-[#87ceeb]/10 hover:-translate-y-0.5 sm:gap-4 sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8f4fd] text-[#0a3d62] transition-all duration-300 group-hover:bg-[#0a3d62] group-hover:text-white sm:h-12 sm:w-12">
                  <info.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#0a3d62] sm:text-base">{info.title}</div>
                  <div className="truncate text-xs text-gray-600 sm:text-sm">{info.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
