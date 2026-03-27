// Database types

export interface Category {
  id: string
  name: string
  created_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  image_url: string | null
  author: string | null
  category_id: string | null
  category?: Category // Joined
  tags: string[] | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  service: string
  message: string
  status: "read" | "unread"
  created_at: string
}

export interface Admin {
  id: string
  email: string
  role: "admin" | "editor"
  created_at: string
}

// Keep legacy aliases for transition
export type Post = Blog
export type ContactMessage = Contact
export type AdminUser = Admin
