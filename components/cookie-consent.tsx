"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useCookieConsent, ConsentCategories } from "@/lib/cookie-consent-store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Cookie, X, Info, ShieldCheck, Settings2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function CookieConsent() {
  const { state, isLoaded, acceptAll, rejectAll, saveConsent } = useCookieConsent()
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [tempConsent, setTempConsent] = useState<ConsentCategories>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    if (isLoaded && !state.hasAnswered) {
      // Delay banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, state.hasAnswered])

  // Listen for manual trigger to open settings
  useEffect(() => {
    const handleOpenSettings = () => {
      setTempConsent(state.categories)
      setShowModal(true)
    }
    window.addEventListener("open-cookie-settings", handleOpenSettings)
    return () => window.removeEventListener("open-cookie-settings", handleOpenSettings)
  }, [state.categories])

  if (!isLoaded || (!showBanner && !showModal && state.hasAnswered)) return null

  const handleCustomize = () => {
    setTempConsent(state.categories)
    setShowModal(true)
  }

  const handleSaveCustom = () => {
    saveConsent(tempConsent)
    setShowModal(false)
    setShowBanner(false)
  }

  const toggleCategory = (category: keyof ConsentCategories) => {
    if (category === "essential") return
    setTempConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <>
      {/* Cookie Banner */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-700 ease-in-out sm:p-6",
          showBanner ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md border border-white/20 dark:bg-slate-900/95 dark:border-slate-800">
            <div className="flex flex-col items-center gap-4 p-5 md:flex-row md:justify-between md:gap-8 md:p-6">
              <div className="flex items-start gap-4">
                <div className="hidden rounded-full bg-primary/10 p-2.5 text-primary md:block dark:bg-primary/20">
                  <Cookie className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Cookie className="h-5 w-5 md:hidden text-primary" />
                    We Value Your Privacy
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Sapwebs uses cookies to enhance your experience, analyze site traffic, and serve relevant content. 
                    Choose your preferences below. See our <Link href="/cookie-policy" className="underline hover:text-primary transition-colors">Cookie Policy</Link> for details.
                  </p>
                </div>
              </div>
              
              <div className="flex w-full flex-wrap items-center justify-center gap-3 md:w-auto md:flex-nowrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCustomize}
                  className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 transition-all dark:border-slate-700 dark:text-slate-300"
                >
                  <Settings2 className="mr-2 h-4 w-4" />
                  Customize
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    rejectAll()
                    setShowBanner(false)
                  }}
                  className="w-full sm:w-auto text-slate-500 hover:text-slate-800 transition-all dark:text-slate-400 dark:hover:text-white"
                >
                  Reject Non-Essential
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    acceptAll()
                    setShowBanner(false)
                  }}
                  className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
            <DialogHeader className="p-6 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight">Cookie Preferences</DialogTitle>
              </div>
              <DialogDescription className="text-slate-500 dark:text-slate-400">
                Manage which cookies you allow us to use. Essential cookies are necessary for the website to function.
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[60vh] overflow-y-auto px-6 py-4 space-y-6">
              {[
                { 
                  id: "essential", 
                  title: "Strictly Necessary", 
                  desc: "Required for core functionality like security, network management, and accessibility. These cannot be disabled.", 
                  immutable: true 
                },
                { 
                  id: "analytics", 
                  title: "Analytics & Statistics", 
                  desc: "Help us understand how visitors interact with our website by collecting and reporting information anonymously." 
                },
                { 
                  id: "marketing", 
                  title: "Marketing & Advertising", 
                  desc: "Used to track visitors across websites to display relevant and engaging ads for the individual user." 
                },
                { 
                  id: "preferences", 
                  title: "Personalization", 
                  desc: "Allow the website to remember choices you make (like your language) to provide enhanced features." 
                }
              ].map((cat) => (
                <div key={cat.id} className="flex items-start justify-between gap-6 p-4 rounded-2xl bg-white/50 border border-slate-100 dark:bg-slate-800/50 dark:border-slate-700">
                  <div className="space-y-1.5 flex-1">
                    <Label htmlFor={cat.id} className="text-base font-semibold text-slate-900 dark:text-white">
                      {cat.title}
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <Switch
                    id={cat.id}
                    checked={tempConsent[cat.id as keyof ConsentCategories]}
                    onCheckedChange={() => toggleCategory(cat.id as keyof ConsentCategories)}
                    disabled={cat.immutable}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>

            <DialogFooter className="p-6 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 text-xs text-slate-400 italic mb-2 sm:mb-0">
                Read our full <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowModal(false)}
                className="rounded-full border-slate-200 dark:border-slate-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveCustom}
                className="rounded-full bg-primary hover:bg-primary/90"
              >
                Save Preferences
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
