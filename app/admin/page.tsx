"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  FileText, 
  Mail, 
  FileEdit, 
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { adminGetBlogs, adminGetContacts } from "@/lib/admin-actions"
import type { Blog, Contact } from "@/lib/database.types"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalMessages: 0,
    newMessages: 0
  })
  
  const [recentPosts, setRecentPosts] = useState<Blog[]>([])
  const [recentMessages, setRecentMessages] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch posts
        const { data: allPosts } = await adminGetBlogs({ limit: 1000 })
        const published = allPosts.filter(p => p.published).length
        const drafts = allPosts.filter(p => !p.published).length
        
        // Fetch messages
        const { data: allMessages } = await adminGetContacts({ limit: 1000 })
        const newMsgs = allMessages.filter(m => m.status === 'unread').length

        setStats({
          totalPosts: allPosts.length,
          publishedPosts: published,
          draftPosts: drafts,
          totalMessages: allMessages.length,
          newMessages: newMsgs
        })

        // Set recent items
        setRecentPosts(allPosts.slice(0, 5))
        setRecentMessages(allMessages.slice(0, 5))
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0a3d62] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500">Welcome to your content management system.</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-[#0a3d62] hover:bg-[#1a5f8a]">
            Create Post
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-gray-500">Blog articles across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedPosts}</div>
            <p className="text-xs text-gray-500">Currently live on the website</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileEdit className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draftPosts}</div>
            <p className="text-xs text-gray-500">Waiting to be published</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <Mail className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-gray-500">
              {stats.newMessages > 0 ? (
                <span className="text-blue-600 font-medium">{stats.newMessages} unread</span>
              ) : (
                "All caught up"
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Posts */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Posts</CardTitle>
            <Link href="/admin/posts" className="text-sm text-[#0a3d62] hover:underline flex items-center">
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No posts yet.</p>
              ) : (
                recentPosts.map(post => (
                  <div key={post.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{post.title}</p>
                      <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {post.published ? "published" : "draft"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Messages</CardTitle>
            <Link href="/admin/messages" className="text-sm text-[#0a3d62] hover:underline flex items-center">
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No messages yet.</p>
              ) : (
                recentMessages.map(msg => (
                  <div key={msg.id} className="flex flex-col border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className={`truncate text-sm font-bold text-gray-900`}>
                        {msg.name}
                      </p>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}