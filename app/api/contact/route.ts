import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-server'

// Configuration from environment variables
const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.RESEND_VERIFIED_EMAIL || 'info@sapwebs.com'

// Initialize Resend
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

// Rate limiting
const requestMap = new Map<string, number[]>()

const isRateLimited = (ip: string, maxRequests: number = 5, windowMs: number = 60000): boolean => {
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

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Honeypot protection
const isHoneypotFilled = (honeypot: string): boolean => {
  return typeof honeypot === 'string' && honeypot.trim().length > 0
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Check rate limiting
    if (isRateLimited(ip)) {
      console.warn(`[Contact API] Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      )
    }

    const { name, email, phone, service, message, website_url } = await request.json()

    // Honeypot check
    if (isHoneypotFilled(website_url)) {
      console.info('[Contact API] Honeypot field filled - blocking spam submission')
      return NextResponse.json(
        { success: true, message: 'Message sent successfully.' },
        { status: 200 }
      )
    }

    // Validation
    if (!name?.trim() || !email?.trim() || !service?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Name, Email, Service, Message).' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Execute database insert
    console.log('[Contact API] Target Table: contact_messages')
    console.log('[Contact API] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...')
    
    // Combine service and message to ensure no loss of data if column is missing
    const fullMessage = `[Service: ${service}]\n\n${message}`

    const { data: dbData, error: dbError } = await supabaseAdmin.from('contact_messages').insert([{
      name,
      email,
      phone: phone || null,
      message: fullMessage,
      status: 'unread'
    }]).select()

    console.log('[Contact API] Supabase Response:', { 
      success: !dbError, 
      error: dbError ? dbError.message : null,
      rowCount: dbData?.length || 0 
    })

    let emailSent = false
    let emailError = null

    if (resend) {
      console.log('[Contact API] Attempting to send email via Resend...')
      try {
        // Prepare email content
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #0a3d62; border-bottom: 2px solid #87ceeb; padding-bottom: 10px;">New Inquiry: ${service}</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Service:</strong> ${service}</p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin-top: 15px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #777; margin-top: 20px;">Sent via Sapwebs Contact Form</p>
          </div>
        `

        const clientEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #0a3d62;">Hello ${name},</h2>
            <p>Thank you for contacting Sapwebs. We have received your inquiry regarding <strong>${service}</strong> and will get back to you shortly.</p>
            <p>Best Regards,<br><strong>The Sapwebs Team</strong></p>
          </div>
        `

        await Promise.all([
          resend.emails.send({
            from: 'Sapwebs <onboarding@resend.dev>',
            to: ADMIN_EMAIL,
            subject: `New Contact: ${service} from ${name}`,
            html: adminEmailHtml,
            replyTo: email
          }),
          resend.emails.send({
            from: 'Sapwebs <onboarding@resend.dev>',
            to: email,
            subject: 'We received your message - Sapwebs',
            html: clientEmailHtml
          })
        ])
        emailSent = true
        console.log('[Contact API] Emails sent successfully')
      } catch (err) {
        console.error('[Contact API] Resend error:', err)
        emailError = err instanceof Error ? err.message : 'Email failed'
      }
    } else {
      console.warn('[Contact API] Resend API key is missing.')
      emailError = 'Email service is not configured.'
    }

    if (dbError) {
      console.error('[Contact API] Supabase error:', dbError)
      if (!emailSent) {
        return NextResponse.json(
          { error: 'Failed to send message and save to database.' },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message sent via email, but failed to save to database.',
          warning: 'Database error' 
        },
        { status: 200 }
      )
    }

    if (!emailSent) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message sent successfully. (Note: Email notification delayed)',
          error: emailError 
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully! We will contact you shortly.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Contact API] Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
