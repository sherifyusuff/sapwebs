"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { adminCreateBlog, adminGetCategories } from "@/lib/admin-actions"
import type { Blog, Category } from "@/lib/database.types"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

export default function NewPostPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()
  const [formData, setFormData] = useState<Omit<Blog, "id" | "created_at" | "updated_at">>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category_id: null,
    tags: [],
    image_url: "",
    author: user?.email || "Admin",
    published: false,
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagsInput, setTagsInput] = useState("")

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await adminGetCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }))
  }

  const handleSave = async (published: boolean) => {
    if (!formData.title?.trim() || !formData.content?.trim()) {
      toast.error("Missing fields", { description: "Please fill in at least the title and content." })
      return
    }

    setSaving(true)
    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean)

    try {
      const newPost = await adminCreateBlog({
        ...formData,
        tags,
        published
      })

      toast.success(published ? "Post published!" : "Draft saved!", {
        description: published ? "Your post is now live." : "Your draft has been saved."
      })
      router.push(`/admin/posts/${newPost.id}`)
    } catch (error) {
      console.error(error)
      toast.error("Error saving post", { description: "Please try again." })
    } finally {
      setSaving(false)
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
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
            <p className="text-sm text-gray-500">Draft</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-[#0a3d62] hover:bg-[#1a5f8a]" onClick={() => handleSave(true)} disabled={saving}>
            {saving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="post-url-slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt || ""}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of your post..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content (HTML) *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="<p>Write your content here...</p>"
                  rows={16}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category_id || "none"} 
                    onValueChange={(val) => setFormData(prev => ({ ...prev, category_id: val === "none" ? null : val }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Uncategorized</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-gray-400">Separate tags with commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Featured Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url || ""}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="/images/my-image.jpg"
                />
                {formData.image_url && (
                  <div className="mt-2 aspect-video overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
