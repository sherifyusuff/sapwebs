"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { LanguageProvider } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/admin")
  }

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
      <main className="flex-1 max-w-md mx-auto w-full py-16 px-6">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="info@sapwebs.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-3"
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded px-4 py-3 border"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </main>
      <Footer />
    </div>
    </LanguageProvider>
  )
}
