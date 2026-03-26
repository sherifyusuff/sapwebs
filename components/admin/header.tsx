'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-[#87ceeb]/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div>
        <h1 className="text-2xl font-bold text-[#0a3d62]">Blog Dashboard</h1>
        <p className="text-sm text-gray-600">Manage your blog content</p>
      </div>

      <Link href="/">
        <Button className="gap-2 bg-[#0a3d62] hover:bg-[#1a5f8a]">
          <LogOut className="h-4 w-4" />
          Exit Admin
        </Button>
      </Link>
    </header>
  )
}
