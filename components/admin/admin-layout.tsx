"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  BarChart, 
  FileText, 
  Settings, 
  LogOut, 
  Mail, 
  Menu, 
  X,
  CreditCard,
  PenSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const isLoginPage = pathname === "/admin/login"
  const [isCheckingAuth, setIsCheckingAuth] = useState(!isLoginPage)

  useEffect(() => {
    let mounted = true

    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (isLoginPage) {
          if (session) {
            router.push("/admin")
          }
          return
        }
        
        if (!session) {
          router.push("/admin/login")
          return
        }
        
        if (mounted) {
          setIsCheckingAuth(false)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        if (!isLoginPage) router.push("/admin/login")
      }
    }

    // Set up auth state listener to handle logouts from other tabs
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          if (!isLoginPage) router.push("/admin/login")
        } else if (session && isLoginPage) {
          router.push("/admin")
        }
      }
    )

    checkAuth()

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router, isLoginPage])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: BarChart },
    { name: "Create Post", href: "/admin/posts/new", icon: PenSquare },
    { name: "Blog Posts", href: "/admin/posts", icon: FileText },
    { name: "Messages", href: "/admin/messages", icon: Mail },
  ]

  if (isLoginPage) {
    return <>{children}</>
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0a3d62] border-t-transparent" />
      </div>
    )
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0a3d62] text-white w-64">
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight">Sapwebs CMS</h2>
        <p className="text-sm text-blue-200 mt-1">Admin Dashboard</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive 
                  ? "bg-white/20 text-white font-medium shadow-sm" 
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/20">
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-start gap-3 text-blue-100 hover:bg-white/10 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#0a3d62] text-white p-4 flex items-center justify-between sticky top-0 z-20">
        <h2 className="text-lg font-bold">Sapwebs CMS</h2>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex-1 max-w-xs w-full bg-[#0a3d62]">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 fixed inset-y-0 z-10">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Desktop Top Header */}
        <header className="hidden md:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-medium text-gray-800">
            {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
              Admin Mode
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
