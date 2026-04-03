"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Mail, Phone, MapPin, Send, MessageCircle, Globe, 
  Code, Megaphone, Palette, Smartphone, Sparkles,
  ArrowRight, Clock, ShieldCheck, Zap, Wrench, Search
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const services = [
  { id: 'web', icon: Code, title: 'Web Development', desc: 'Custom, high-performance websites' },
  { id: 'maintenance', icon: Wrench, title: 'Website Maintenance', desc: 'Ongoing support & updates' },
  { id: 'design', icon: Palette, title: 'UI/UX Design', desc: 'Stunning, user-centric interfaces' },
  { id: 'seo', icon: Search, title: 'SEO Optimization', desc: 'Boost your search rankings' },
  { id: 'mobile', icon: Smartphone, title: 'Mobile Apps', desc: 'Native-feel cross-platform apps' },
]

const contactInfo = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+234 703 532 1179",
    href: "https://wa.me/2347035321179",
    color: "bg-[#25D366]/10 text-[#25D366]",
    badge: "Fastest Response"
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@sapwebs.com",
    href: "mailto:info@sapwebs.com",
    color: "bg-[#EA4335]/10 text-[#EA4335]",
    badge: "Official Support"
  },
  {
    icon: MapPin,
    title: "Office",
    value: "9 Old Olowora Road, Lagos",
    href: "#",
    color: "bg-[#4285F4]/10 text-[#4285F4]",
    badge: "Visit Us"
  }
]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [greeting, setGreeting] = useState("Hello")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const { t } = useLanguage()

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const selectService = (title: string) => {
    setFormData(prev => ({ ...prev, service: title }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON Server Error:", text);
        data = { error: "An unexpected server error occurred." };
      }

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "Our team will reach out to you within 24 hours."
        })
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        toast.error("Failed to send", { description: data.error || "An error occurred." })
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Network Error", { description: "Check your connection and try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = [
    formData.name,
    formData.email,
    formData.service,
    formData.message
  ].filter(Boolean).length * 25

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[#fafcff] py-16 sm:py-24">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
        <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#87ceeb] to-[#0a3d62] opacity-20 sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-start gap-x-12 gap-y-16 lg:grid-cols-2">
          
          {/* Left Column: Content & Info */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#87ceeb]">{greeting}!</h2>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#0a3d62] sm:text-6xl">
                Let's Build Something <span className="bg-gradient-to-r from-[#0a3d62] to-[#87ceeb] bg-clip-text text-transparent">Legendary</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Ready to take your digital presence to the next level? Whether you have a specific requirement or just want to explore possibilities, our team is here to help.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-1">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-[#87ceeb] hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", info.color)}>
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400">{info.title}</h4>
                      <p className="text-base font-bold text-[#0a3d62]">{info.value}</p>
                    </div>
                  </div>
                  <span className="hidden text-[10px] font-bold uppercase tracking-tighter text-[#87ceeb] sm:block">{info.badge}</span>
                </motion.a>
              ))}
            </div>

            {/* Unique Feature: Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-6 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <ShieldCheck className="h-4 w-4 text-green-500" /> Secure Data
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Clock className="h-4 w-4 text-orange-500" /> 24h Response
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Zap className="h-4 w-4 text-yellow-500" /> Efficient Setup
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Progress Bar */}
            <div className="absolute -top-6 left-0 h-1 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#87ceeb] to-[#0a3d62]"
                animate={{ width: `${progress}%` }}
              />
            </div>

            <Card className="overflow-hidden border-0 bg-white/70 shadow-2xl backdrop-blur-xl ring-1 ring-gray-200">
              <CardContent className="p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Name</Label>
                      <Input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="John Doe" 
                        required 
                        className="h-12 border-gray-100 bg-white/50 focus:border-[#87ceeb] focus:ring-0" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</Label>
                      <Input 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="john@company.com" 
                        required 
                        className="h-12 border-gray-100 bg-white/50 focus:border-[#87ceeb] focus:ring-0" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</Label>
                    <Input 
                      name="phone" 
                      type="tel"
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="+234 XXX XXX XXXX" 
                      className="h-12 border-gray-100 bg-white/50 focus:border-[#87ceeb] focus:ring-0" 
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Service</Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => selectService(s.title)}
                          className={cn(
                            "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                            formData.service === s.title 
                              ? "border-[#0a3d62] bg-[#0a3d62] text-white shadow-lg" 
                              : "border-gray-100 bg-white text-gray-500 hover:border-[#87ceeb] hover:bg-gray-50"
                          )}
                        >
                          <s.icon className={cn("h-6 w-6", formData.service === s.title ? "text-white" : "text-[#87ceeb]")} />
                          <span className="text-[10px] font-bold uppercase leading-tight">{s.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Message</Label>
                    <Textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Tell us about your project..." 
                      rows={4} 
                      required 
                      className="resize-none border-gray-100 bg-white/50 focus:border-[#87ceeb] focus:ring-0" 
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 w-full rounded-2xl bg-[#0a3d62] text-lg font-bold text-white transition-all hover:bg-[#1a5f8a] hover:shadow-xl active:scale-95"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Sparkles className="h-5 w-5"/></motion.div>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
