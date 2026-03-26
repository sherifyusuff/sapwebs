'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Tag, BarChart3, Settings, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { href: '/admin', icon: BarChart3, label: 'Dashboard', exact: true },
  { href: '/admin/posts', icon: FileText, label: 'Posts' },
  { href: '/admin/categories', icon: Tag, label: 'Categories' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
  { href: '/', icon: Home, label: 'View Site' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0a3d62] text-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Sapwebs CMS</h1>
        <p className="text-sm text-[#87ceeb]">Blog Dashboard</p>
      </div>

      <nav className="space-y-1 px-3">
        {sidebarLinks.map(link => {
          const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href)
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-[#87ceeb] text-[#0a3d62] font-semibold'
                  : 'text-white hover:bg-[#1a5f8a]'
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
