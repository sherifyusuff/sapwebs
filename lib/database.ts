"use server"
import { supabase } from "./supabase"
import { supabaseAdmin } from "./supabase-server"
import type { Blog, Contact, Category } from "./database.types"

// ==================== BLOGS ====================

export async function getBlogs(filters?: {
  published?: boolean
  limit?: number
  offset?: number
}) {
  let query = supabaseAdmin
    .from("blogs")
    .select("*, category:categories(*)", { count: "exact" })

  // Always enforce published=true for public access
  query = query.eq("published", true)

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error, count } = await query

  if (error) {
    console.error("Supabase getBlogs error:", error)
    throw new Error(error.message || JSON.stringify(error))
  }
  return { data: data as Blog[], total: count || 0 }
}

export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("blogs")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data as Blog | null
}

export async function getBlogById(id: string) {
  const { data, error } = await supabaseAdmin
    .from("blogs")
    .select("*, category:categories(*)")
    .eq("id", id)
    .eq("published", true)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data as Blog | null
}

// ==================== CATEGORIES ====================

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) throw error
  return data as Category[]
}

// ==================== CONTACTS ====================

export async function saveContact(contact: Omit<Contact, "id" | "created_at">) {
  const { data, error } = await supabaseAdmin
    .from("contacts")
    .insert([contact])
    .select()
    .single()

  if (error) {
    console.error("Supabase insert error:", error)
    throw new Error(error.message || JSON.stringify(error))
  }
  return data as Contact
}

// Legacy exports for transition
export const getPosts = getBlogs
export const getPostBySlug = getBlogBySlug
export const getPostById = getBlogById
export const saveContactMessage = saveContact
