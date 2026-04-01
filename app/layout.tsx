import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import Script from 'next/script'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Sapwebs - Professional Web Design & Development Agency in Lagos, Nigeria',
    template: '%s | Sapwebs Digital Agency',
  },
  description: 'Sapwebs is a leading web design and development agency in Lagos, Nigeria. We specialize in custom websites, e-commerce solutions, and SEO optimization for local and international brands. Build your legacy with Sapwebs.',
  generator: 'Next.js',
  applicationName: 'Sapwebs Digital Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'web design Lagos',
    'web development Nigeria',
    'best web designers in Lagos',
    'e-commerce development Africa',
    'SEO agency Lagos',
    'responsive website design',
    'digital transformation Nigeria',
    'Sapwebs agency',
    'custom software development lagos',
    'international web development services',
    'professional SEO setup',
    'website maintenance services'
  ],
  authors: [{ name: 'Sapwebs', url: 'https://sapwebs.com' }],
  creator: 'Sapwebs',
  publisher: 'Sapwebs',
  metadataBase: new URL('https://sapwebs.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-GB': '/en-GB',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://sapwebs.com',
    siteName: 'Sapwebs Digital Agency',
    title: 'Sapwebs | Leading Web Design & SEO Experts in Lagos',
    description: 'Transforming businesses with high-performance websites and data-driven SEO. Trusted by local and international clients for digital excellence.',
    images: [
      {
        url: '/sapwebs-logo.png',
        width: 1200,
        height: 630,
        alt: 'Sapwebs Digital Agency - Web Design & Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapwebs - Crafting Digital Excellence',
    description: 'Lagos-based web development agency specializing in SEO, E-commerce, and Custom Web Applications.',
    images: ['/sapwebs-logo.png'],
    creator: '@sapwebsagency',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.jpg', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/sapwebs-logo.png', type: 'image/png' },
    ],
  },
  category: 'Technology',
}

export const viewport: Viewport = {
  themeColor: '#0a3d62',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sapwebs Digital Agency",
    "image": "https://sapwebs.com/sapwebs-logo.png",
    "@id": "https://sapwebs.com",
    "url": "https://sapwebs.com",
    "telephone": "+2347035321179",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9 Old Olowora Road, Magodo Isheri",
      "addressLocality": "Lagos",
      "addressRegion": "LA",
      "postalCode": "100001",
      "addressCountry": "NG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.6347,
      "longitude": 3.3857
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://web.facebook.com/sapwebsagency",
      "https://www.instagram.com/sapwebsagency",
      "https://www.linkedin.com/company/sapwebsagency"
    ]
  }

  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" richColors />
        <CookieConsent />
      </body>
    </html>
  )
}
