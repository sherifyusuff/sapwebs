import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getBlogBySlug } from '@/lib/database'
import SocialShare from '@/components/social-share'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Sapwebs',
    }
  }

  const title = `${post.title} | Sapwebs Blog`
  const description = post.excerpt || `Read about ${post.title} on the Sapwebs blog.`
  const url = `https://sapwebs.com/blog/${slug}`

  // Base OG setup
  const openGraph: any = {
    title: post.title,
    description: description,
    url: url,
    siteName: 'Sapwebs',
    type: 'article',
    publishedTime: post.created_at,
  }
  
  // Base Twitter setup
  const twitter: any = {
    card: 'summary_large_image',
    title: post.title,
    description: description,
  }

  if (post.image_url) {
    openGraph.images = [
      {
        url: post.image_url,
        width: 1200,
        height: 630,
        alt: post.title,
      }
    ]
    twitter.images = [post.image_url]
  }

  return {
    title,
    description,
    authors: [{ name: post.author || 'Sapwebs Team' }],
    openGraph,
    twitter,
    alternates: {
      canonical: url,
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  // Construct absolute URL for the share component
  const postUrl = `https://sapwebs.com/blog/${slug}`

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#e0f2fc] via-[#eaf6fd] to-[#d6eefb] py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center gap-2 text-[#0a3d62] hover:text-[#1a5f8a] transition-colors"
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
          
          {/* Main article content */}
          <article className="prose prose-lg max-w-none prose-headings:text-[#0a3d62] prose-headings:mt-8 prose-headings:mb-4 prose-a:text-[#87ceeb] hover:prose-a:text-[#0a3d62] prose-a:transition-colors prose-strong:text-[#0a3d62]">
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
          
          {/* Social Share Box */}
          <SocialShare url={postUrl} title={post.title} />

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