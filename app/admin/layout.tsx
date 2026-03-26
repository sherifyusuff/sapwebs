"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search,
  PenSquare,
  Tags,
  Users
} from "lucide-react"
import { AuthProvider, useAuth } from "@/lib/auth-context"

function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: PenSquare, label: "Write Post", href: "/admin/posts/new" },
    { icon: FileText, label: "All Posts", href: "/admin/posts" },
    { icon: Tags, label: "Categories", href: "/admin/categories" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
    { icon: Users, label: "Manage Admins", href: "/admin/users" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signOut()
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto w-full border-r border-[#1a5f8a]">
      <div className="h-20 items-center px-6 border-b border-[#1a5f8a] hidden md:flex">
        <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">Sapwebs Admin</h1>
      </div>

      <div className="px-4 py-6 flex-1">
        <p className="px-2 text-xs font-semibold text-[#87ceeb] uppercase tracking-wider mb-4">
          Overview
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin')
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? "bg-[#1a5f8a] text-white" 
                      : "text-gray-300 hover:bg-[#154c70] hover:text-white"
                    }
                  `}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-[#87ceeb]" : "text-gray-400"}`} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-[#1a5f8a]">
        {/* User profile */}
        <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg bg-[#154c70]">
          <div className="h-8 w-8 rounded-full bg-[#87ceeb] flex items-center justify-center text-[#0a3d62] font-semibold text-sm shrink-0">
            {user?.email ? user.email[0].toUpperCase() : "A"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Administrator</p>
            <p className="text-xs text-[#87ceeb] truncate">{user?.email ?? "admin@sapwebs.com"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/30 transition-colors w-full disabled:opacity-60"
        >
          <LogOut className="h-5 w-5" />
          {isLoggingOut ? "Signing out..." : "Logout"}
        </button>
      </div>
    </div>
  )
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-[#0a3d62] text-white p-4">
        <h1 className="text-xl font-bold tracking-tight">Sapwebs Admin</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        fixed md:sticky top-0 left-0 z-40 w-64 h-screen pb-10 transition-transform bg-[#0a3d62] text-white
      `}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 hidden md:flex">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-96 border border-gray-200 focus-within:border-[#87ceeb] focus-within:ring-1 focus-within:ring-[#87ceeb] transition-all">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search posts or messages..." 
              className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Login page renders standalone (no sidebar/header)
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  )
}