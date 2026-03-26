
'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LanguageProvider } from '@/lib/language-context'
import { TopBar } from '@/components/top-bar'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar, User } from 'lucide-react'

import { getBlogs } from '@/lib/database'
import type { Blog } from '@/lib/database.types'

export default function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await getBlogs({ published: true })
        setPosts(data)
      } catch (error) {
        console.error('Error loading blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])


  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <TopBar />
        <Header />

        <main>
          <section className="bg-gradient-to-br from-[#0a3d62] to-[#1a5f8a] py-20 text-white">
            <div className="container mx-auto px-4 text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Blog</h1>
              <p className="mx-auto max-w-2xl text-lg text-white/90">
                Insights, updates, and useful articles from Sapwebs.
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="text-center">
                  <p className="text-gray-600">Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center">
                  <p className="text-lg text-gray-600">
                    No blog posts yet. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card className="h-full cursor-pointer border-[#87ceeb]/20 transition-all duration-300 hover:border-[#87ceeb]/50 hover:shadow-lg">
                        <CardHeader>
                          <div className="mb-2 flex items-start justify-between gap-2">
                            {post.category?.name && (
                              <Badge className="bg-[#0a3d62] text-white">
                                {post.category.name}
                              </Badge>
                            )}
                          </div>

                          <CardTitle className="text-[#0a3d62] transition-colors hover:text-[#1a5f8a]">
                            {post.title}
                          </CardTitle>

                          <CardDescription>{post.excerpt}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {post.tags?.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}

                            {post.tags && post.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{post.author || 'Admin'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 font-semibold text-[#0a3d62] transition-all hover:gap-3">
                            <span>Read More</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  )
}