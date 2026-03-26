import type { BlogPost, Category, BlogStats, BlogFilters } from "./types"

const POSTS_KEY = "sapwebs_blog_posts"
const CATEGORIES_KEY = "sapwebs_blog_categories"

// Default sample posts
const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Web Design Trends to Watch in 2025",
    slug: "web-design-trends-2025",
    content: `<p>The web design landscape is constantly evolving, and 2025 brings exciting new trends that are reshaping how we build and experience websites.</p>
    
<h2>1. AI-Powered Personalization</h2>
<p>Websites are becoming smarter, using AI to deliver personalized experiences based on user behavior and preferences.</p>

<h2>2. Immersive 3D Elements</h2>
<p>Three-dimensional graphics and animations are becoming more accessible, adding depth and engagement to web experiences.</p>

<h2>3. Dark Mode as Default</h2>
<p>More users prefer dark interfaces, and designers are creating beautiful dark-first experiences.</p>

<h2>4. Micro-interactions</h2>
<p>Small, delightful animations that respond to user actions make interfaces feel more alive and responsive.</p>

<h2>5. Sustainable Web Design</h2>
<p>Eco-conscious design practices are reducing carbon footprints while maintaining beautiful aesthetics.</p>`,
    excerpt: "Explore the cutting-edge web design trends that are shaping the digital landscape in 2025, from AI personalization to sustainable design practices.",
    featuredImage: "/images/hero-team.jpg",
    category: "Web Design",
    tags: ["design", "trends", "2025", "UI/UX"],
    author: "Sapwebs Team",
    status: "published",
    seo: {
      metaTitle: "10 Web Design Trends to Watch in 2025 | Sapwebs Blog",
      metaDescription: "Discover the top web design trends for 2025 including AI personalization, 3D elements, and sustainable design practices.",
      keywords: ["web design trends", "2025 design", "UI trends", "web development"]
    },
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
    publishedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Building Scalable E-Commerce Platforms: A Complete Guide",
    slug: "building-scalable-ecommerce-platforms",
    content: `<p>Creating an e-commerce platform that can grow with your business requires careful planning and the right technology choices.</p>

<h2>Choosing the Right Stack</h2>
<p>Your technology stack forms the foundation of your e-commerce success. Consider factors like scalability, security, and ease of maintenance.</p>

<h2>Database Optimization</h2>
<p>Efficient database design ensures fast queries even as your product catalog and customer base grows.</p>

<h2>Payment Integration</h2>
<p>Secure payment processing is crucial. We recommend using established providers like Stripe or Paystack for African markets.</p>

<h2>Performance at Scale</h2>
<p>CDNs, caching strategies, and optimized images keep your store fast even during peak traffic.</p>`,
    excerpt: "Learn how to build e-commerce platforms that scale with your business growth, from technology selection to performance optimization.",
    featuredImage: "/images/luxe-ecommerce.png",
    category: "E-Commerce",
    tags: ["e-commerce", "development", "scalability", "business"],
    author: "Sapwebs Team",
    status: "published",
    seo: {
      metaTitle: "Building Scalable E-Commerce Platforms | Sapwebs",
      metaDescription: "Complete guide to building e-commerce platforms that scale with your business, covering tech stack, databases, and performance.",
      keywords: ["e-commerce development", "scalable platforms", "online store", "web development"]
    },
    createdAt: "2025-01-10T14:30:00Z",
    updatedAt: "2025-01-12T09:00:00Z",
    publishedAt: "2025-01-12T09:00:00Z"
  },
  {
    id: "3",
    title: "Why Your Business Needs a Professional Website in 2025",
    slug: "why-business-needs-professional-website-2025",
    content: `<p>In today's digital-first world, your website is often the first impression potential customers have of your business.</p>

<h2>Credibility and Trust</h2>
<p>A professional website establishes credibility and builds trust with potential customers before they even contact you.</p>

<h2>24/7 Availability</h2>
<p>Unlike a physical store, your website works for you around the clock, providing information and capturing leads while you sleep.</p>

<h2>Competitive Advantage</h2>
<p>Stand out from competitors who still rely solely on social media or outdated websites.</p>

<h2>Data-Driven Decisions</h2>
<p>Website analytics provide valuable insights into customer behavior and preferences.</p>`,
    excerpt: "Discover why having a professional website is essential for business success in 2025 and how it can drive growth and credibility.",
    featuredImage: "/images/about-team.jpg",
    category: "Business",
    tags: ["business", "website", "digital presence", "marketing"],
    author: "Sapwebs Team",
    status: "published",
    seo: {
      metaTitle: "Why Your Business Needs a Professional Website | Sapwebs",
      metaDescription: "Learn why a professional website is essential for business success in 2025, from credibility to competitive advantage.",
      keywords: ["business website", "professional website", "digital presence", "business growth"]
    },
    createdAt: "2025-01-05T08:00:00Z",
    updatedAt: "2025-01-05T08:00:00Z",
    publishedAt: "2025-01-05T08:00:00Z"
  },
  {
    id: "4",
    title: "Introduction to React for Beginners",
    slug: "introduction-to-react-beginners",
    content: `<p>React has become one of the most popular JavaScript libraries for building user interfaces. Let's explore the basics.</p>

<h2>What is React?</h2>
<p>React is a JavaScript library created by Facebook for building fast, interactive user interfaces.</p>

<h2>Components</h2>
<p>Everything in React is a component - reusable pieces of UI that manage their own state.</p>

<h2>Getting Started</h2>
<p>We'll walk through setting up your first React project and creating your first components.</p>`,
    excerpt: "A beginner-friendly introduction to React, covering the fundamentals of components, state, and getting started with your first project.",
    featuredImage: "/images/service-web.jpg",
    category: "Development",
    tags: ["react", "javascript", "tutorial", "beginners"],
    author: "Sapwebs Team",
    status: "draft",
    seo: {
      metaTitle: "Introduction to React for Beginners | Sapwebs",
      metaDescription: "Learn React basics with this beginner-friendly guide covering components, state, and setting up your first project.",
      keywords: ["react tutorial", "learn react", "javascript", "web development"]
    },
    createdAt: "2025-01-20T16:00:00Z",
    updatedAt: "2025-01-20T16:00:00Z",
    publishedAt: null
  }
]

const defaultCategories: Category[] = [
  {
    id: "1",
    name: "Web Design",
    slug: "web-design",
    description: "Articles about web design trends, UI/UX, and visual aesthetics",
    postCount: 1,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "E-Commerce",
    slug: "e-commerce",
    description: "Everything about building and running online stores",
    postCount: 1,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "3",
    name: "Development",
    slug: "development",
    description: "Technical tutorials and development guides",
    postCount: 1,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "4",
    name: "Business",
    slug: "business",
    description: "Business strategies and digital transformation",
    postCount: 1,
    createdAt: "2025-01-01T00:00:00Z"
  }
]

// Initialize localStorage with default data if empty
export function initializeBlogData(): void {
  if (typeof window === 'undefined') return
  
  const posts = localStorage.getItem(POSTS_KEY)
  const categories = localStorage.getItem(CATEGORIES_KEY)
  
  if (!posts) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(defaultPosts))
  }
  if (!categories) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories))
  }
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Posts CRUD
export function getAllPosts(): BlogPost[] {
  if (typeof window === 'undefined') return []
  initializeBlogData()
  const posts = localStorage.getItem(POSTS_KEY)
  return posts ? JSON.parse(posts) : []
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter(post => post.status === "published")
}

export function getPostById(id: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find(post => post.id === id) || null
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug && post.status === "published") || null
}

export function createPost(postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "publishedAt">): BlogPost {
  const posts = getAllPosts()
  const now = new Date().toISOString()
  
  const newPost: BlogPost = {
    ...postData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    publishedAt: postData.status === "published" ? now : null
  }
  
  posts.unshift(newPost)
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  
  // Update category post count
  updateCategoryPostCount()
  
  return newPost
}

export function updatePost(id: string, postData: Partial<BlogPost>): BlogPost | null {
  const posts = getAllPosts()
  const index = posts.findIndex(post => post.id === id)
  
  if (index === -1) return null
  
  const existingPost = posts[index]
  const updatedPost: BlogPost = {
    ...existingPost,
    ...postData,
    updatedAt: new Date().toISOString(),
    publishedAt: postData.status === "published" && !existingPost.publishedAt 
      ? new Date().toISOString() 
      : existingPost.publishedAt
  }
  
  posts[index] = updatedPost
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  
  // Update category post count
  updateCategoryPostCount()
  
  return updatedPost
}

export function deletePost(id: string): boolean {
  const posts = getAllPosts()
  const filteredPosts = posts.filter(post => post.id !== id)
  
  if (filteredPosts.length === posts.length) return false
  
  localStorage.setItem(POSTS_KEY, JSON.stringify(filteredPosts))
  updateCategoryPostCount()
  
  return true
}

export function filterPosts(filters: BlogFilters): BlogPost[] {
  let posts = getAllPosts()
  
  // Filter by status
  if (filters.status !== "all") {
    posts = posts.filter(post => post.status === filters.status)
  }
  
  // Filter by category
  if (filters.category && filters.category !== "all") {
    posts = posts.filter(post => post.category === filters.category)
  }
  
  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }
  
  // Sort
  switch (filters.sortBy) {
    case "oldest":
      posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      break
    case "title":
      posts.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "newest":
    default:
      posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
  
  return posts
}

// Categories CRUD
export function getAllCategories(): Category[] {
  if (typeof window === 'undefined') return []
  initializeBlogData()
  const categories = localStorage.getItem(CATEGORIES_KEY)
  return categories ? JSON.parse(categories) : []
}

export function getCategoryById(id: string): Category | null {
  const categories = getAllCategories()
  return categories.find(cat => cat.id === id) || null
}

export function createCategory(name: string, description: string): Category {
  const categories = getAllCategories()
  
  const newCategory: Category = {
    id: generateId(),
    name,
    slug: generateSlug(name),
    description,
    postCount: 0,
    createdAt: new Date().toISOString()
  }
  
  categories.push(newCategory)
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
  
  return newCategory
}

export function updateCategory(id: string, data: Partial<Category>): Category | null {
  const categories = getAllCategories()
  const index = categories.findIndex(cat => cat.id === id)
  
  if (index === -1) return null
  
  categories[index] = { ...categories[index], ...data }
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
  
  return categories[index]
}

export function deleteCategory(id: string): boolean {
  const categories = getAllCategories()
  const category = categories.find(cat => cat.id === id)
  
  if (!category) return false
  
  // Don't delete if posts exist in this category
  const posts = getAllPosts()
  if (posts.some(post => post.category === category.name)) {
    return false
  }
  
  const filteredCategories = categories.filter(cat => cat.id !== id)
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filteredCategories))
  
  return true
}

function updateCategoryPostCount(): void {
  const posts = getAllPosts()
  const categories = getAllCategories()
  
  const updatedCategories = categories.map(cat => ({
    ...cat,
    postCount: posts.filter(post => post.category === cat.name && post.status === "published").length
  }))
  
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories))
}

// Stats
export function getBlogStats(): BlogStats {
  const posts = getAllPosts()
  const categories = getAllCategories()
  
  return {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === "published").length,
    draftPosts: posts.filter(p => p.status === "draft").length,
    totalCategories: categories.length
  }
}

// Related posts
export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  return getPublishedPosts()
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit)
}

// Recent posts
export function getRecentPosts(limit: number = 5): BlogPost[] {
  return getPublishedPosts()
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
    .slice(0, limit)
}
