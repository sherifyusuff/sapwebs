"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { adminGetBlogs, adminDeleteBlog } from "@/lib/admin-actions"
import type { Blog } from "@/lib/database.types"

export default function PostsPage() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Blog[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    status: (searchParams.get("status") as "all" | "published" | "draft") || "all",
    category: "all",
    sortBy: "newest"
  })

  // We fetch posts dynamically from Supabase
  const fetchPosts = async () => {
    try {
      const { data } = await adminGetBlogs({ limit: 1000 })
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map(p => p.category?.name).filter(Boolean))) as string[]
      setCategories(uniqueCategories)
      
      let filtered = [...data]
      
      if (filters.status !== "all") {
        filtered = filtered.filter(p => p.published === (filters.status === "published"))
      }
      if (filters.category !== "all") {
        filtered = filtered.filter(p => p.category?.name === filters.category)
      }
      if (filters.search) {
        const q = filters.search.toLowerCase()
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(q) || 
          (p.content && p.content.toLowerCase().includes(q))
        )
      }
      
      if (filters.sortBy === "newest") {
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      } else if (filters.sortBy === "oldest") {
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      } else if (filters.sortBy === "title") {
        filtered.sort((a, b) => a.title.localeCompare(b.title))
      }
      
      setPosts(filtered)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchPosts()
  }, [])

  useEffect(() => {
    // Initialize status from search params
    const statusParam = searchParams.get("status") as "all" | "published" | "draft" | null
    if (statusParam && ["all", "published", "draft"].includes(statusParam)) {
      setFilters(prev => ({
        ...prev,
        status: statusParam
      }))
    }
  }, [searchParams])

  useEffect(() => {
    if (mounted) {
      fetchPosts()
    }
  }, [filters, mounted])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await adminDeleteBlog(id)
        fetchPosts()
      } catch (error) {
        alert("Failed to delete post")
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
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Posts</h1>
          <p className="mt-1 text-sm text-gray-500">{posts.length} posts found</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="gap-2 bg-[#0a3d62] hover:bg-[#1a5f8a]">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search posts..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10"
              />
            </div>
              <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value as any })}
            >
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters({ ...filters, category: value })}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
            >
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">By Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">No posts found</p>
              <Link href="/admin/posts/new">
                <Button className="mt-4 gap-2 bg-[#0a3d62] hover:bg-[#1a5f8a]">
                  <Plus className="h-4 w-4" />
                  Create Your First Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        post.published 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {post.published ? "published" : "draft"}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-gray-500">{post.excerpt}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                      {post.category?.name && <span className="rounded bg-gray-100 px-2 py-0.5">{post.category.name}</span>}
                      {post.category?.name && <span>•</span>}
                      <span>{typeof window !== 'undefined' ? new Date(post.created_at).toLocaleDateString() : ''}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.published && (
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3 w-3" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </Link>
                    )}
                    <Link href={`/admin/posts/${post.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-3 w-3" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/posts/${post.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {post.published && (
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              View Live
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(post.id)}
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
