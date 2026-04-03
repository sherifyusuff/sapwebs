"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Tag, User, Loader2 } from "lucide-react"

import { Button } from '@/components/ui/button'
import { getBlogBySlug } from '@/lib/database'
import type { Blog } from '@/lib/database.types'

export default function BlogPostPage() {
  const params = useParams<{ slug: string | string[] }>()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug

  const [post, setPost] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFoundFlag, setNotFoundFlag] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadPost = async () => {
      try {
        if (!slug || typeof slug !== 'string') {
          if (isMounted) {
            setNotFoundFlag(true)
            setIsLoading(false)
          }
          return
        }

        const foundPost = await getBlogBySlug(slug)

        if (!foundPost) {
          if (isMounted) {
            setPost(null)
            setNotFoundFlag(true)
            setIsLoading(false)
          }
          return
        }

        if (isMounted) {
          setPost(foundPost)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error loading post:', error)
        if (isMounted) {
          setNotFoundFlag(true)
          setIsLoading(false)
        }
      }
    }

    loadPost()

    return () => {
      isMounted = false
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0a3d62]" />
      </div>
    )
  }

  if (notFoundFlag || !post) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-[#0a3d62]">
            Post Not Found
          </h1>
          <p className="mb-6 text-gray-600">
            The blog post you&apos;re looking for doesn&apos;t exist or is not published.
          </p>
          <Link href="/blog">
            <Button className="bg-[#0a3d62] hover:bg-[#1a5f8a]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#e0f2fc] via-[#eaf6fd] to-[#d6eefb] py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center gap-2 text-[#0a3d62] hover:text-[#1a5f8a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <h1 className="mb-4 text-4xl font-bold text-[#0a3d62] md:text-5xl leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#87ceeb]" />
              By {post.author || 'Admin'}
            </span>

            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#87ceeb]" />
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>

            {post.category?.name && (
              <span className="flex items-center gap-2 rounded-full bg-[#0a3d62]/5 px-3 py-1 font-medium text-[#0a3d62]">
                <Tag className="h-4 w-4 text-[#87ceeb]" />
                {post.category.name}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="py-12 sm:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          {post.image_url && (
            <div className="mb-12 overflow-hidden rounded-2xl shadow-xl border border-gray-100">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none prose-headings:text-[#0a3d62] prose-headings:mt-8 prose-headings:mb-4 prose-a:text-blue-600">
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="mt-12 border-t border-[#87ceeb]/20 pt-8">
            <Link href="/blog">
              <Button className="bg-[#0a3d62] hover:bg-[#1a5f8a]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}