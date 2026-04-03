import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import { supabaseAdmin } from '@/lib/supabase-server'

// Validation Schema
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20).optional().nullable(),
  service: z.string().min(1, "Service is required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  website_url: z.string().optional().nullable(), // Honeypot
})

// Configuration from environment variables
const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.RESEND_VERIFIED_EMAIL || 'info@sapwebs.com'

// Initialize Resend
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

// Rate limiting (In-memory - resets on redeploy/serverless restart)
const requestMap = new Map<string, number[]>()

const isRateLimited = (ip: string, maxRequests: number = 3, windowMs: number = 3600000): boolean => {
  const now = Date.now()
  const requests = requestMap.get(ip) || []
  const recentRequests = requests.filter((time) => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    return true
  }

  recentRequests.push(now)
  requestMap.set(ip, recentRequests)
  return false
}

export async function POST(request: NextRequest) {
  console.log('>>> [Contact API v2.2-SECURE] Submission Received at', new Date().toISOString())
  
  try {
    // 1. Rate Limiting check (Strict: 3 per hour per IP)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (isRateLimited(ip)) {
      console.warn(`[Contact API] Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later to protect our systems.' },
        { status: 429 }
      )
    }

    // 2. Body Parsing & Validation
    const body = await request.json()
    const result = ContactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, email, phone, service, message, website_url } = result.data

    // 3. Honeypot check
    if (website_url) {
      console.info('[Contact API] Honeypot triggered - blocking bot')
      return NextResponse.json({ success: true, message: 'Message sent successfully.' })
    }

    // 4. Sanitization (Protect against XSS)
    const sanitizedName = DOMPurify.sanitize(name)
    const sanitizedMessage = DOMPurify.sanitize(message)
    const sanitizedService = DOMPurify.sanitize(service)

    // 5. Database Insertion (Parameterized via Supabase Client)
    console.log('[Contact API] Saving to database...')
    const fullMessage = `[Service: ${sanitizedService}]\n\n${sanitizedMessage}`

    const { data: dbData, error: dbError } = await supabaseAdmin.from('contacts').insert([{
      name: sanitizedName,
      email,
      phone: phone || null,
      message: fullMessage,
      status: 'unread'
    }]).select()

    if (dbError) {
      console.error('[Contact API] Database Error:', dbError)
    }

    // 6. Email Notification (Resend)
    let emailSent = false
    if (resend) {
      try {
        const adminEmailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; color: #333;">
            <h2 style="color: #0a3d62;">New Secure Inquiry: ${sanitizedService}</h2>
            <p><strong>From:</strong> ${sanitizedName} (${email})</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin-top: 15px;">
              <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
            </div>
          </div>
        `

        await resend.emails.send({
          from: 'Sapwebs Notifications <onboarding@resend.dev>',
          to: ADMIN_EMAIL,
          subject: `Secure Contact: ${sanitizedService} from ${sanitizedName}`,
          html: adminEmailHtml,
          replyTo: email
        })
        emailSent = true
      } catch (err) {
        console.error('[Contact API] Email Error:', err)
      }
    }

    // 7. Final Response
    if (dbError && !emailSent) {
      return NextResponse.json({ error: 'System busy. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Your inquiry has been securely received. Our team will review it shortly.' 
    })

  } catch (error) {
    console.error('[Contact API] Critical Error:', error)
    return NextResponse.json({ error: 'An unexpected security event occurred.' }, { status: 500 })
  }
}
