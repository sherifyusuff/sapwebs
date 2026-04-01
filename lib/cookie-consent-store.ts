"use client"

import { useState, useEffect } from "react"

export type ConsentCategories = {
  essential: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export type CookieConsentState = {
  hasAnswered: boolean
  categories: ConsentCategories
}

const STORAGE_KEY = "sapwebs-cookie-consent-v1"

const DEFAULT_STATE: CookieConsentState = {
  hasAnswered: false,
  categories: {
    essential: true, // Always true
    analytics: false,
    marketing: false,
    preferences: false,
  },
}

export function useCookieConsent() {
  const [state, setState] = useState<CookieConsentState>(DEFAULT_STATE)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Ensure essential is always true
        parsed.categories.essential = true
        setState({ ...parsed, hasAnswered: true })
      } catch (e) {
        console.error("Failed to parse cookie consent", e)
      }
    }
    setIsLoaded(true)
  }, [])

  const saveConsent = (categories: Partial<ConsentCategories>) => {
    const newState: CookieConsentState = {
      hasAnswered: true,
      categories: {
        ...DEFAULT_STATE.categories,
        ...categories,
        essential: true, // Safety check
      },
    }
    setState(newState)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    
    // Trigger a custom event for other components to listen to
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: newState.categories }))
  }

  const acceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
      preferences: true,
    })
  }

  const rejectAll = () => {
    saveConsent({
      analytics: false,
      marketing: false,
      preferences: false,
    })
  }

  return {
    state,
    isLoaded,
    saveConsent,
    acceptAll,
    rejectAll,
  }
}

// Helper to check consent outside of React components (e.g. for blocking non-React scripts if needed)
export function getConsentSync(): ConsentCategories {
  if (typeof window === "undefined") return DEFAULT_STATE.categories
  
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved).categories
    } catch (e) {
      return DEFAULT_STATE.categories
    }
  }
  return DEFAULT_STATE.categories
}
