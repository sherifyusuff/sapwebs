"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Trash2, 
  CheckCircle,
  Eye,
  Mail,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { adminGetContacts, adminDeleteContact, adminUpdateContactStatus } from "@/lib/admin-actions"
import type { Contact } from "@/lib/database.types"

function MessagesContent() {
  const searchParams = useSearchParams()
  const [allMessages, setAllMessages] = useState<Contact[]>([])
  const [messages, setMessages] = useState<Contact[]>([])
  const [mounted, setMounted] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
  })

  const fetchMessages = async () => {
    try {
      const { data } = await adminGetContacts({ limit: 1000 })
      setAllMessages(data)
    } catch (e) {
      console.error("Failed to fetch messages:", e)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchMessages()
  }, [])

  useEffect(() => {
    if (mounted) {
      let filtered = [...allMessages]
      
      if (filters.search) {
        const q = filters.search.toLowerCase()
        filtered = filtered.filter(m => 
          m.name.toLowerCase().includes(q) || 
          m.email.toLowerCase().includes(q) || 
          m.message.toLowerCase().includes(q)
        )
      }
      
      setMessages(filtered)
    }
  }, [filters, allMessages, mounted])

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read'
    try {
      await adminUpdateContactStatus(id, newStatus as "read" | "unread")
      fetchMessages()
    } catch (e) {
      alert("Failed to update status")
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await adminDeleteContact(id)
        fetchMessages()
      } catch (e) {
        alert("Failed to delete message")
      }
    }
  }

  if (!mounted) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0a3d62] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Messages</h1>
          <p className="mt-1 text-sm text-gray-500">{messages.length} messages found</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, email, or content..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Mail className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No messages found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-4 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 ${
                    msg.status === 'unread' ? 'border-l-4 border-l-[#0a3d62] bg-[#f0f9ff]' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`font-medium ${msg.status === 'unread' ? 'text-black font-bold' : 'text-gray-700'}`}>
                        {msg.name}
                      </h3>
                      {msg.status === 'unread' && (
                        <span className="inline-flex items-center rounded-full bg-[#0a3d62] px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                          New
                        </span>
                      )}
                      <a href={`mailto:${msg.email}`} className="text-sm text-[#0a3d62] hover:underline">
                        &lt;{msg.email}&gt;
                      </a>
                    </div>
                    <p className={`mt-2 text-sm ${msg.status === 'unread' ? 'text-black font-medium' : 'text-gray-800'}`}>
                      {msg.message}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                      <span>{typeof window !== 'undefined' ? new Date(msg.created_at).toLocaleString() : ''}</span>
                      {msg.phone && (
                        <>
                          <span>•</span>
                          <span>{msg.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleStatusToggle(msg.id, msg.status || 'unread')}
                      title={msg.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      {msg.status === 'read' ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(msg.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0a3d62] border-t-transparent" />
      </div>
    }>
      <MessagesContent />
    </Suspense>
  )
}
