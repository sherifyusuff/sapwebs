import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-server'

/**
 * SETUP INSTRUCTIONS FOR RESEND EMAIL SERVICE:
 * 
 * ENVIRONMENT VARIABLES REQUIRED:
 * - RESEND_API_KEY: Your Resend API key from https://resend.com/api-keys
 * 
 * CURRENT SETUP (TESTING MODE):
 * - Using onboarding@resend.dev as sender (always available for testing)
 * - Emails are received at the verified email address: RESEND_VERIFIED_EMAIL
 * 
 * TO ENABLE PRODUCTION EMAILS TO MULTIPLE RECIPIENTS:
 * 1. Add a custom domain to Resend:
 *    - Go to https://resend.com/domains
 *    - Add your custom domain (e.g., mail.sapwebs.com)
 *    - Verify DNS records as instructed
 * 
 * 2. Set environment variable for custom domain sender:
 *    - RESEND_CUSTOM_DOMAIN_EMAIL=contact@mail.sapwebs.com
 *    - Then update CONTACT_EMAIL_FROM below to use it
 * 
 * 3. Once verified, emails will send to all recipients without 403 errors
 * 
 * Current Limitations (Testing):
 * - Gmail addresses cannot send to multiple recipients without domain verification
 * - All contact form emails are received at the verified email address
 * - Clients receive confirmation emails successfully
 */

// Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY
// Always use onboarding@resend.dev for sending (works for testing with verified email)
// In production with verified domain, update this to: process.env.RESEND_CUSTOM_DOMAIN_EMAIL || 'onboarding@resend.dev'
const CONTACT_EMAIL_FROM = 'onboarding@resend.dev'
// Send to verified email (and optionally other addresses if domain is verified)
const VERIFIED_EMAIL = process.env.RESEND_VERIFIED_EMAIL || 'info@sapwebs.com'
const CONTACT_EMAIL_TO = [VERIFIED_EMAIL]

// Initialize Resend - errors will be caught if API key is missing
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

console.log('[Resend Contact] Configuration - Sender:', CONTACT_EMAIL_FROM)
console.log('[Resend Contact] Configuration - Recipients:', CONTACT_EMAIL_TO)
console.log('[Resend Contact] Configuration - Verified email:', VERIFIED_EMAIL)

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
    // Validate Resend API key is configured
    if (!RESEND_API_KEY || !resend) {
      console.error('[Resend] Missing RESEND_API_KEY. Set it in environment variables.')
      console.error('[Resend] Setup guide: https://resend.com/docs/introduction')
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 503 }
      )
    }

    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Check rate limiting
    if (isRateLimited(ip)) {
      console.warn(`[Resend] Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      )
    }

    const { name, email, phone, service, message, website_url } = await request.json()

    // Honeypot check
    if (isHoneypotFilled(website_url)) {
      console.info('[Resend] Honeypot field filled - blocking spam submission')
      return NextResponse.json(
        { success: true, message: 'Your message has been sent successfully.' },
        { status: 200 }
      )
    }

    // Validation
    if (!name?.trim() || !email?.trim() || !service?.trim() || !message?.trim()) {
      console.warn('[Resend] Form validation failed - missing required fields')
      return NextResponse.json(
        { error: 'Please fill in all required fields (Name, Email, Service, Message).' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      console.warn(`[Resend] Invalid email format: ${email}`)
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Execute database insert and email dispatch concurrently to improve response time
    console.log('[Resend] Starting concurrent operations...')
    
    const dbPromise = supabaseAdmin.from('contacts').insert([{
      name,
      email,
      phone: phone || null,
      message: message,
      status: 'unread'
    }])

    // Admin notification email HTML
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0a3d62 0%, #1a5f8a 100%); color: white; padding: 30px; }
            .header h2 { margin: 0; font-size: 24px; }
            .content { padding: 30px; }
            .field { margin-bottom: 25px; }
            .field-label { color: #0a3d62; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .field-value { color: #333; font-size: 15px; }
            .message-section { background: #f9f9f9; padding: 20px; border-left: 4px solid #87ceeb; margin: 25px 0; border-radius: 4px; }
            .message-section .field-label { margin-bottom: 10px; }
            .message-content { color: #333; white-space: pre-wrap; word-wrap: break-word; line-height: 1.6; font-size: 14px; }
            .footer { background: #f5f5f5; padding: 20px 30px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            .footer-link { color: #0a3d62; text-decoration: none; }
            a { color: #0a3d62; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Full Name</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email Address</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="field-label">Phone Number</div>
                <div class="field-value">${phone || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="field-label">Service Interested In</div>
                <div class="field-value">${service}</div>
              </div>
              <div class="message-section">
                <div class="field-label">Message</div>
                <div class="message-content">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>To reply to this inquiry, click <a href="mailto:${email}" class="footer-link">here to email ${email}</a></p>
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #999;">Submitted via Sapwebs Contact Form | Powered by Resend</p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #999;">To forward this to team members: sapwebs2025@gmail.com, info@sapwebs.com</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Client confirmation email HTML
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0a3d62 0%, #1a5f8a 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h2 { margin: 0; font-size: 28px; }
            .content { padding: 30px; }
            .content p { font-size: 15px; line-height: 1.6; color: #333; margin-bottom: 15px; }
            .highlight { color: #0a3d62; font-weight: bold; }
            .footer { background: #f5f5f5; padding: 20px 30px; border-top: 1px solid #ddd; font-size: 13px; color: #666; text-align: center; }
            .divider { height: 1px; background: #ddd; margin: 25px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You, ${name}!</h2>
            </div>
            <div class="content">
              <p>We have received your contact form submission and appreciate your interest in Sapwebs.</p>
              <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #87ceeb; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0;">
                  <strong>Service:</strong> <span class="highlight">${service}</span><br>
                  <strong>Submitted:</strong> <span class="highlight">${new Date().toISOString().split('T')[0]}</span>
                </p>
              </div>
              <p>Our team will carefully review your request and get back to you as soon as possible. You can expect to hear from us within 24-48 hours.</p>
              <p>If you need to reach us immediately, feel free to call or email us directly:</p>
              <p style="text-align: center; margin: 20px 0;">
                <strong>Email:</strong> sapwebs2025@gmail.com<br>
                <strong>Alternative:</strong> info@sapwebs.com
              </p>
              <p>Thank you for choosing <span class="highlight">Sapwebs</span> for your web development needs!</p>
            </div>
            <div class="footer">
              <p>© 2024 Sapwebs. All rights reserved.</p>
              <p>This is an automated confirmation email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const adminEmailPromise = resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      subject: `New Contact: ${service} from ${name}`,
      html: adminEmailHtml,
      replyTo: email,
    })

    const clientEmailPromise = resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: email,
      subject: 'We received your message - Sapwebs',
      html: clientEmailHtml,
    })

    // Wait for all promises to resolve
    const [dbResult, adminEmailResult, clientEmailResult] = await Promise.allSettled([
      dbPromise,
      adminEmailPromise,
      clientEmailPromise
    ])

    // Handle DB error
    if (dbResult.status === 'rejected') {
      console.error('[Resend] Exception saving to Supabase:', dbResult.reason)
    } else if (dbResult.status === 'fulfilled' && dbResult.value.error) {
      console.error('[Resend] Failed to save contact message to Supabase:', dbResult.value.error)
    } else {
      console.log('[Resend] Successfully saved message to database.')
    }

    // Handle Admin Email error
    let adminFailed = false
    if (adminEmailResult.status === 'rejected') {
      console.error('[Resend] Exception sending admin email:', adminEmailResult.reason)
      adminFailed = true
    } else if (adminEmailResult.status === 'fulfilled' && adminEmailResult.value.error) {
      console.error('[Resend] Failed to send admin email:', adminEmailResult.value.error)
      adminFailed = true
    } else if (adminEmailResult.status === 'fulfilled') {
      console.log('[Resend] Admin email sent successfully. ID:', adminEmailResult.value.data?.id)
    }

    // Handle Client Email error
    if (clientEmailResult.status === 'rejected') {
      console.warn('[Resend] Exception sending client email:', clientEmailResult.reason)
    } else if (clientEmailResult.status === 'fulfilled' && clientEmailResult.value.error) {
      console.warn('[Resend] Client confirmation email failed:', clientEmailResult.value.error)
    } else if (clientEmailResult.status === 'fulfilled') {
      console.log('[Resend] Client confirmation email sent successfully. ID:', clientEmailResult.value.data?.id)
    }

    // Only fail if the admin email completely failed AND db failed (or some combination that means total failure)
    // We prioritize simply telling the user "success" unless we know for sure nobody was notified.
    if (adminFailed && (dbResult.status === 'rejected' || (dbResult.status === 'fulfilled' && dbResult.value.error))) {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! Your message has been received. We will contact you shortly.' 
      },
      { status: 200 }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Resend] Unexpected error:', errorMessage)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
