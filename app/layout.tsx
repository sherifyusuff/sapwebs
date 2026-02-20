import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Sapwebs - Crafting Digital Excellence | Web Design & Development Lagos',
    template: '%s | Sapwebs',
  },
  description: 'Sapwebs is a Lagos-based web design and development agency crafting digital excellence. We build responsive websites, e-commerce platforms, web applications, and custom UI/UX solutions for businesses across Nigeria and Africa.',
  generator: 'v0.app',
  keywords: [
    'web design Lagos',
    'web development Nigeria',
    'e-commerce development Lagos',
    'web application development',
    'UI/UX design Nigeria',
    'Sapwebs',
    'website design company Lagos',
    'responsive web design',
    'digital agency Nigeria',
    'custom web development Africa',
    'SEO services Lagos',
    'landing page design',
    'API integration services',
    'website maintenance Nigeria',
  ],
  authors: [{ name: 'Sapwebs', url: 'https://sapwebs.com' }],
  creator: 'Sapwebs',
  publisher: 'Sapwebs',
  metadataBase: new URL('https://sapwebs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://sapwebs.com',
    siteName: 'Sapwebs',
    title: 'Sapwebs - Crafting Digital Excellence | Web Design & Development Lagos',
    description: 'Sapwebs delivers reliable, scalable, and user-focused web solutions designed to help businesses thrive in a digital world. Web design, e-commerce, web apps, and more.',
    images: [
      {
        url: '/sapwebs-logo.png',
        width: 1200,
        height: 630,
        alt: 'Sapwebs - Crafting Digital Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapwebs - Crafting Digital Excellence',
    description: 'Lagos-based web design and development agency building responsive websites, e-commerce platforms, and web applications for businesses across Africa.',
    images: ['/sapwebs-logo.png'],
    creator: '@sapwebs',
  },
  robots: {
    index: true,
    follow: true,
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
  category: 'technology',
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
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
