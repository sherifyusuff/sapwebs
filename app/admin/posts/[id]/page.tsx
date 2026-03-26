"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  adminGetBlogById, 
  adminUpdateBlog, 
  adminDeleteBlog,
  adminGetCategories
} from "@/lib/admin-actions"
import type { Blog, Category } from "@/lib/database.types"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

export default function PostEditorPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<Blog>>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    image_url: "",
    category_id: null,
    tags: [],
    published: false
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [tagsInput, setTagsInput] = useState("")

  useEffect(() => {
    setMounted(true)
    
    const fetchData = async () => {
      try {
        const [existingPost, cats] = await Promise.all([
          adminGetBlogById(params.id as string),
          adminGetCategories()
        ])
        
        setCategories(cats)

        if (existingPost) {
          setFormData({
            ...existingPost,
            image_url: existingPost.image_url || "",
            excerpt: existingPost.excerpt || "",
            category_id: existingPost.category_id || null,
          })
          setTagsInput((existingPost.tags || []).join(", "))
        } else {
          router.push("/admin/posts")
        }
      } catch (e) {
        console.error(e)
        router.push("/admin/posts")
      }
    }
    fetchData()
  }, [params.id, router])

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
      // Create a clean update object
      const updateData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        image_url: formData.image_url,
        category_id: formData.category_id,
        tags,
        published
      }
      
      await adminUpdateBlog(params.id as string, updateData)
      setFormData(prev => ({ ...prev, published }))
      toast.success(published ? "Post published!" : "Draft saved!", {
        description: published ? "Your post is now live." : "Your draft has been saved."
      })
    } catch (error) {
      console.error(error)
      toast.error("Error saving post", { description: "Please try again." })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await adminDeleteBlog(params.id as string)
      toast.success("Post deleted")
      router.push("/admin/posts")
    } catch (e) {
      console.error(e)
      toast.error("Failed to delete post")
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
            <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
            <p className="text-sm text-gray-500">
              {formData.published ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Published
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Draft
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.published && (
            <Link href={`/blog/${formData.slug}`} target="_blank">
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </Link>
          )}
          <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-[#0a3d62] hover:bg-[#1a5f8a]" onClick={() => handleSave(true)} disabled={saving}>
            {saving ? "Saving..." : "Publish"}
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
                    <img src={formData.image_url} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Post
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The post &quot;{formData.title}&quot; will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete permanently
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
