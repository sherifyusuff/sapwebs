# Sapwebs Contact Form - Resend Email Setup Guide

This guide will help you set up Resend for reliable email delivery on your Sapwebs website.

## Why Resend?

- **Works on Vercel**: No SMTP/firewall issues
- **Reliable**: 99.9% uptime SLA
- **Easy Setup**: No complex authentication like Gmail App Passwords
- **Better Deliverability**: Optimized for transactional emails
- **Free Tier**: Start with generous free limits

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click "Get Started" or "Sign Up"
3. Create your account (free tier available)
4. Verify your email address

## Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Click on "API Keys" in the left sidebar
3. Copy your API key (it looks like: `re_xxxxxxxxxxxx`)
4. **Keep this key safe!** Treat it like a password

## Step 3: Configure Environment Variables

### For Local Development (.env.local)

Create a file `.env.local` in your project root:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Replace `re_xxxxxxxxxxxx` with your actual Resend API key.

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add a new environment variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key
4. Select "Production" and/or "Preview" as needed
5. Click "Save"
6. Redeploy your project

## Step 4: Verify Your Email Domain (Optional but Recommended)

For production use, verify your domain in Resend:

1. In Resend dashboard, click "Domains"
2. Add your domain (e.g., sapwebs.com)
3. Follow the DNS verification steps
4. Once verified, update the `CONTACT_EMAIL_FROM` in `/app/api/contact/route.ts`

### For Now (Testing)

You can use the default sender: `onboarding@resend.dev`

This is the Resend test email and works great for development/testing.

## Step 5: Update Your Code

The API route (`/app/api/contact/route.ts`) is already configured to use Resend. Just ensure:

1. Your `RESEND_API_KEY` environment variable is set
2. Recipient emails are correct (sapwebs2025@gmail.com, info@sapwebs.com)

## How It Works

When someone submits the contact form:

1. **Validation** happens first (required fields, valid email, spam check with honeypot)
2. **Rate limiting** prevents spam (5 requests per minute per IP)
3. **Admin Email** is sent to sapwebs2025@gmail.com and info@sapwebs.com with full submission details
4. **Confirmation Email** is sent to the visitor to confirm receipt
5. **Success message** is shown to the user

## Troubleshooting

### "Email service is not configured"

This means `RESEND_API_KEY` is not set:

1. Check `.env.local` has the correct key
2. Verify the key starts with `re_`
3. Make sure there are no extra spaces before/after the key
4. Restart your dev server after adding the key

### Email not being received

1. **Check spam folder** - transactional emails might be filtered
2. **Verify API key** - make sure it's correct and not expired
3. **Check logs** - Resend dashboard shows email status
4. **Test with Resend test email** - temporarily use `onboarding@resend.dev` as recipient

### Rate limiting issues

Users get "Too many requests" message when:
- More than 5 form submissions from the same IP in 60 seconds
- This is by design to prevent spam

## Email Content

### Admin Notification Email

Includes:
- Visitor's name, email, phone
- Service they're interested in
- Full message
- Reply-to address (visitor's email)

**Sent to:**
- sapwebs2025@gmail.com
- info@sapwebs.com

### Client Confirmation Email

Includes:
- Thank you message
- Service requested
- Expected response time (24-48 hours)
- Direct contact info

**Sent to:**
- Visitor's email address

## Advanced Setup (Custom Domain)

Once you have a custom domain verified in Resend:

1. Update `/app/api/contact/route.ts`:

```typescript
const CONTACT_EMAIL_FROM = 'noreply@yourdomain.com' // Change this
```

2. Redeploy your application

## Monitoring

To check email delivery status:

1. Go to Resend dashboard
2. Click "Emails" to see all sent emails
3. Each email shows:
   - Delivery status
   - Bounce/complaint info
   - Open/click rates (if enabled)

## Support

- **Resend Docs**: [https://resend.com/docs](https://resend.com/docs)
- **Email Validation**: Resend validates all emails before sending
- **24/7 Uptime**: Enterprise-grade reliability

## Testing the Form Locally

1. Make sure `.env.local` has `RESEND_API_KEY` set
2. Run `npm run dev`
3. Go to your contact form
4. Fill out and submit
5. Check both your email addresses for incoming messages

## Common Issues Checklist

- [ ] `RESEND_API_KEY` is set in `.env.local`
- [ ] API key starts with `re_`
- [ ] Environment variables reloaded (restart dev server)
- [ ] Email addresses are correct (sapwebs2025@gmail.com, info@sapwebs.com)
- [ ] For Vercel: added env var in project settings
- [ ] For Vercel: redeployed after adding env var
- [ ] Check spam folder for emails
- [ ] View email status in Resend dashboard

## Success Indicators

You'll know it's working when:

1. Form submission shows "Thank you! Your message has been received"
2. You receive admin email at sapwebs2025@gmail.com or info@sapwebs.com
3. Visitor receives confirmation email at their address
4. Emails appear in Resend dashboard with ✓ "Delivered" status

## Next Steps

1. Complete steps 1-3 above
2. Test the contact form
3. Verify emails arrive
4. (Optional) Set up custom domain for production

---

**Last Updated:** 2024
**Sapwebs Contact Form** - Powered by Resend
