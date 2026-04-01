"use client"

import React, { useEffect, useState } from "react"
import Script, { ScriptProps } from "next/script"
import { ConsentCategories, getConsentSync } from "@/lib/cookie-consent-store"

interface ManagedScriptProps extends ScriptProps {
  category: keyof ConsentCategories
}

/**
 * A wrapper for Next.js Script that only loads if the specified 
 * cookie consent category has been granted.
 */
export function ManagedScript({ category, ...props }: ManagedScriptProps) {
  const [hasConsent, setHasConsent] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initial check
    const currentConsent = getConsentSync()
    setHasConsent(currentConsent[category])
    setIsLoaded(true)

    // Listen for updates
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ConsentCategories>
      setHasConsent(customEvent.detail[category])
    }

    window.addEventListener("cookie-consent-updated", handleConsentUpdate)
    return () => {
      window.removeEventListener("cookie-consent-updated", handleConsentUpdate)
    }
  }, [category])

  if (!isLoaded || !hasConsent) return null

  return <Script {...props} />
}
