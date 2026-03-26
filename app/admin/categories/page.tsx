'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Plus, Edit2, Check, X, Loader2 } from 'lucide-react'
import { 
  adminGetCategories, 
  adminCreateCategory, 
  adminUpdateCategory,
  adminDeleteCategory
} from '@/lib/admin-actions'
import type { Category } from '@/lib/database.types'
import { toast } from 'sonner'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadCategories = async () => {
    try {
      setIsLoading(true)
      const data = await adminGetCategories()
      setCategories(data)
    } catch (error) {
      console.error("Failed to load categories:", error)
      toast.error("Failed to load categories")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName.trim() || isSubmitting) return
    
    setIsSubmitting(true)
    try {
      await adminCreateCategory(newCategoryName.trim())
      setNewCategoryName('')
      toast.success("Category created")
      await loadCategories()
    } catch (error) {
      console.error(error)
      toast.error("Failed to create category")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateCategory = async (id: string) => {
    if (!editingName.trim()) return
    
    try {
      await adminUpdateCategory(id, editingName.trim())
      toast.success("Category updated")
      setEditingId(null)
      await loadCategories()
    } catch (error) {
      toast.error("Failed to update category")
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Are you sure? Posts linked to this category will become Uncategorized.')) {
      try {
        await adminDeleteCategory(id)
        toast.success("Category deleted")
        await loadCategories()
      } catch (error) {
        toast.error("Failed to delete category")
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0a3d62]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0a3d62]">Categories</h1>
        <p className="text-gray-600">Manage your blog post categories</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory} className="flex gap-2">
            <Input
              placeholder="Category name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1"
              disabled={isSubmitting}
            />
            <Button type="submit" className="bg-[#0a3d62] hover:bg-[#1a5f8a]" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories List</CardTitle>
          <CardDescription>{categories.length} categories sync with Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No categories found in database.</p>
            ) : (
              categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-3 border border-[#87ceeb]/20 rounded-lg hover:bg-[#f0f8ff]">
                  {editingId === cat.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() => handleUpdateCategory(cat.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null)
                          setEditingName('')
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium text-[#0a3d62]">{cat.name}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(cat.id)
                            setEditingName(cat.name)
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCategory(cat.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
