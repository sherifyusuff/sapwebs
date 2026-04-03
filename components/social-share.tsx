"use client"

import { useState } from "react"
import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react"

export default function SocialShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  // URI encoded strings
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  // Share links
  const links = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-[#4267B2] hover:bg-[#4267B2]/10",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
    },
    {
      name: "WhatsApp",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-circle"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      ),
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:text-[#25D366] hover:bg-[#25D366]/10",
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy", err)
    }
  }

  return (
    <div className="flex flex-col gap-3 mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Share this article</h3>
      <div className="flex flex-wrap items-center gap-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${link.name}`}
            className={`p-2.5 rounded-full text-gray-600 transition-colors border bg-white ${link.color}`}
          >
            <link.icon className="h-5 w-5" />
            <span className="sr-only">Share on {link.name}</span>
          </a>
        ))}
        
        <button
          onClick={handleCopy}
          title="Copy link"
          className={`p-2.5 rounded-full transition-colors border bg-white flex items-center justify-center
            ${copied ? "text-green-600 border-green-200 bg-green-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}
          `}
        >
          {copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}
          <span className="sr-only">Copy link</span>
        </button>
      </div>
    </div>
  )
}
