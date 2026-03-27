import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'

// Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_EMAIL_FROM = 'onboarding@resend.dev'
const NEWSLETTER_EMAIL_TO = 'info@sapwebs.com'

// Initialize Resend
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

// Validation Schema
const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
})

// Rate limiting (In-memory)
const requestMap = new Map<string, number[]>()
const isRateLimited = (ip: string, maxRequests: number = 5, windowMs: number = 3600000): boolean => {
  const now = Date.now()
  const requests = requestMap.get(ip) || []
  const recentRequests = requests.filter((time) => now - time < windowMs)
  if (recentRequests.length >= maxRequests) return true
  recentRequests.push(now)
  requestMap.set(ip, recentRequests)
  return false
}

export async function POST(request: NextRequest) {
  console.log('>>> [Newsletter API v2.2-SECURE] Subscription Received')
  
  try {
    // 1. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // 2. Validate Resend API key
    if (!RESEND_API_KEY || !resend) {
      console.error('[Newsletter] Missing RESEND_API_KEY')
      return NextResponse.json({ error: 'service configuration error' }, { status: 503 })
    }

    // 3. Body Validation
    const body = await request.json()
    const result = NewsletterSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { email } = result.data
    const sanitizedEmail = DOMPurify.sanitize(email)

    // 4. Send confirmation email to subscriber
    const subscriberEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; color: #333;">
        <h2 style="color: #0a3d62;">Welcome to Sapwebs!</h2>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll now receive the latest updates on web design, development, and digital strategy.</p>
        <p>Best Regards,<br><strong>The Sapwebs Team</strong></p>
      </div>
    `

    // Send confirmation to subscriber
    const subscriberResult = await resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: sanitizedEmail,
      subject: 'Welcome to Sapwebs Newsletter',
      html: subscriberEmailHtml,
    })

    if (subscriberResult.error) {
      console.error('[Newsletter] Failed to send subscriber email:', subscriberResult.error)
      return NextResponse.json({ error: 'failed to process subscription' }, { status: 500 })
    }

    // 5. Send notification to admin
    await resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: NEWSLETTER_EMAIL_TO,
      subject: `New Newsletter Subscription: ${sanitizedEmail}`,
      html: `<p>New subscriber: <strong>${sanitizedEmail}</strong></p><p>Date: ${new Date().toISOString()}</p>`,
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! Check your email for confirmation.',
    })

  } catch (error) {
    console.error('[Newsletter] Critical Error:', error)
    return NextResponse.json({ error: 'an unexpected security event occurred' }, { status: 500 })
  }
}
