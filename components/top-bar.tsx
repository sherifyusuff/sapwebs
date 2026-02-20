import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { Facebook, Linkedin, Instagram } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-[#0a3d62] py-1.5 text-white sm:py-2">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Contact info - show condensed on mobile */}
        <div className="flex items-center gap-3 overflow-x-auto text-[10px] sm:gap-5 sm:text-xs md:text-sm">
          <a
            href="https://wa.me/2347035321179"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 transition-colors hover:text-[#25D366]"
          >
            <MessageCircle className="h-3 w-3" />
            <span className="hidden sm:inline">+234 703 532 1179</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
          <a href="mailto:info@sapwebs.com" className="flex shrink-0 items-center gap-1.5 transition-colors hover:text-[#87ceeb]">
            <Mail className="h-3 w-3" />
            <span className="hidden md:inline">info@sapwebs.com</span>
            <span className="md:hidden">Email</span>
          </a>
          <span className="hidden items-center gap-1.5 lg:flex">
            <MapPin className="h-3 w-3" />
            <span>9 Old Olowora Road, Magodo Isheri Lagos</span>
          </span>
        </div>

        {/* Social icons */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="https://facebook.com/sapwebs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-[#1877F2] hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook className="h-3 w-3" />
          </a>
          <a
            href="https://instagram.com/sapwebs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-[#E4405F] hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram className="h-3 w-3" />
          </a>
          <a
            href="https://linkedin.com/company/sapwebs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-[#0A66C2] hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
