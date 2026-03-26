export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage: string
  category: string
  tags: string[]
  author: string
  status: "draft" | "published"
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
  createdAt: string
}

export interface BlogStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalCategories: number
}

export type PostFormData = Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "publishedAt">

export interface BlogFilters {
  search: string
  status: "all" | "published" | "draft"
  category: string
  sortBy: "newest" | "oldest" | "title"
}
