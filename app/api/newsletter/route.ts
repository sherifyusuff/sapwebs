import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_EMAIL_FROM = 'onboarding@resend.dev'
const NEWSLETTER_EMAIL_TO = 'info@sapwebs.com'

// Initialize Resend
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    // Validate Resend API key
    if (!RESEND_API_KEY || !resend) {
      console.error('[Newsletter] Missing RESEND_API_KEY')
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 503 }
      )
    }

    const { email } = await request.json()

    // Validation
    if (!email?.trim()) {
      console.warn('[Newsletter] Empty email submitted')
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      console.warn(`[Newsletter] Invalid email format: ${email}`)
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Send confirmation email to subscriber
    const subscriberEmailHtml = `
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
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Welcome to Sapwebs Newsletter!</h2>
            </div>
            <div class="content">
              <p>Thank you for subscribing to our newsletter!</p>
              <p>You'll now receive the latest updates, news, and exclusive offers from <span class="highlight">Sapwebs</span>.</p>
              <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #87ceeb; border-radius: 4px; margin: 20px 0;">
                Stay tuned for valuable insights on web design, development, and digital solutions tailored for your business success.
              </p>
              <p>If you have any questions or need any assistance, feel free to reach out to us at <span class="highlight">info@sapwebs.com</span>.</p>
            </div>
            <div class="footer">
              <p>© 2026 Sapwebs. All Rights Reserved.</p>
              <p>This email confirms your newsletter subscription. You can unsubscribe anytime if you wish.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send confirmation to subscriber
    console.log('[Newsletter] Sending confirmation to subscriber:', email)
    const subscriberResult = await resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: email,
      subject: 'Welcome to Sapwebs Newsletter',
      html: subscriberEmailHtml,
    })

    if (subscriberResult.error) {
      console.error('[Newsletter] Failed to send subscriber email:', subscriberResult.error)
      return NextResponse.json(
        { error: 'Failed to process subscription. Please try again later.' },
        { status: 500 }
      )
    }

    console.log('[Newsletter] Subscriber confirmation sent. ID:', subscriberResult.data?.id)

    // Send notification to admin
    const adminNotificationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0a3d62 0%, #1a5f8a 100%); color: white; padding: 30px; }
            .content { padding: 30px; }
            .field { margin-bottom: 15px; }
            .label { color: #0a3d62; font-weight: bold; font-size: 14px; }
            .value { color: #333; font-size: 15px; }
            .footer { background: #f5f5f5; padding: 20px 30px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Newsletter Subscription</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Subscription Date</div>
                <div class="value">${new Date().toISOString()}</div>
              </div>
            </div>
            <div class="footer">
              <p>A new subscriber has joined your Sapwebs newsletter list.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send notification to admin
    console.log('[Newsletter] Sending admin notification to:', NEWSLETTER_EMAIL_TO)
    await resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: NEWSLETTER_EMAIL_TO,
      subject: `New Newsletter Subscription: ${email}`,
      html: adminNotificationHtml,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing! Check your email for confirmation.',
      },
      { status: 200 }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Newsletter] Unexpected error:', errorMessage)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
