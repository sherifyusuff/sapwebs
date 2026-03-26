"use server"
import { supabaseAdmin } from "./supabase-server"
import type { Blog, Contact, Category, Admin } from "./database.types"
import { revalidatePath } from "next/cache"

// ==================== BLOGS ====================

export async function adminGetBlogs(filters?: {
  published?: boolean
  limit?: number
  offset?: number
}) {
  let query = supabaseAdmin.from("blogs").select("*, category:categories(*)", { count: "exact" })

  if (filters?.published !== undefined) {
    query = query.eq("published", filters.published)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error, count } = await query

  if (error) {
    console.error("Supabase adminGetBlogs error:", error)
    throw new Error(error.message || JSON.stringify(error))
  }
  return { data: data as Blog[], total: count || 0 }
}

export async function adminGetBlogById(id: string) {
  const { data, error } = await supabaseAdmin
    .from("blogs")
    .select("*, category:categories(*)")
    .eq("id", id)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data as Blog | null
}

export async function adminCreateBlog(blog: Omit<Blog, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabaseAdmin
    .from("blogs")
    .insert([blog])
    .select()
    .single()

  if (error) throw error
  revalidatePath("/admin")
  revalidatePath("/admin/posts")
  revalidatePath("/blog")
  return data as Blog
}

export async function adminUpdateBlog(id: string, blog: Partial<Omit<Blog, "id" | "created_at" | "updated_at">>) {
  const { data, error } = await supabaseAdmin
    .from("blogs")
    .update(blog)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  revalidatePath("/admin")
  revalidatePath("/admin/posts")
  revalidatePath("/blog")
  return data as Blog
}

export async function adminDeleteBlog(id: string) {
  const { error } = await supabaseAdmin.from("blogs").delete().eq("id", id)
  if (error) throw error
  revalidatePath("/admin")
  revalidatePath("/admin/posts")
  revalidatePath("/blog")
}

// ==================== CATEGORIES ====================

export async function adminGetCategories() {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) throw error
  return data as Category[]
}

export async function adminCreateCategory(name: string) {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .insert([{ name }])
    .select()
    .single()

  if (error) throw error
  return data as Category
}

// ==================== CONTACTS ====================

export async function adminGetContacts(filters?: {
  limit?: number
  offset?: number
}) {
  let query = supabaseAdmin.from("contacts").select("*", { count: "exact" })

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error, count } = await query

  if (error) throw error
  return { data: data as Contact[], total: count || 0 }
}

export async function adminUpdateContactStatus(id: string, status: "read" | "unread") {
  const { data, error } = await supabaseAdmin
    .from("contacts")
    .update({ status })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  revalidatePath("/admin")
  revalidatePath("/admin/messages")
  return data as Contact
}

export async function adminDeleteContact(id: string) {
  const { error } = await supabaseAdmin.from("contacts").delete().eq("id", id)
  if (error) throw error
  revalidatePath("/admin")
  revalidatePath("/admin/messages")
}

export async function adminUpdateCategory(id: string, name: string) {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .update({ name })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Category
}

export async function adminDeleteCategory(id: string) {
  const { error } = await supabaseAdmin.from("categories").delete().eq("id", id)
  if (error) throw error
}

// ==================== ADMINS ====================

export async function adminGetAdmins() {
  const { data, error } = await supabaseAdmin
    .from("admins")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) throw error
  return data as Admin[]
}

export async function adminUpdateAdmin(id: string, updates: Partial<Omit<Admin, "id" | "created_at">>) {
  const { data, error } = await supabaseAdmin
    .from("admins")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Admin
}

export async function adminDeleteAdmin(id: string) {
  const { error } = await supabaseAdmin.from("admins").delete().eq("id", id)
  if (error) throw error
}

// Legacy exports for transition
export const adminGetPosts = adminGetBlogs
export const adminGetPostById = adminGetBlogById
export const adminCreatePost = adminCreateBlog
export const adminUpdatePost = adminUpdateBlog
export const adminDeletePost = adminDeleteBlog
export const adminGetContactMessages = adminGetContacts
export const adminUpdateContactMessageStatus = adminUpdateContactStatus
export const adminDeleteContactMessage = adminDeleteContact
