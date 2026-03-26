# Resend Email Setup - Testing & Production Guide

## Current Status: TESTING MODE ✅

Your contact form is **working in testing mode** with the following setup:
- **Sender:** onboarding@resend.dev (Resend's test email)
- **Recipients:** olalekansheva@gmail.com (verified email)
- **Client Confirmations:** Sent successfully

All contact form submissions are received at your verified email address.

---

## To Upgrade to Production (Send to Multiple Recipients)

Resend requires a **verified domain** to send emails from multiple recipients. Here's how to set it up:

### Step 1: Add and Verify Your Domain

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., `mail.sapwebs.com` or just `sapwebs.com`)
4. Resend will show you DNS records to add to your domain registrar
5. Add the records and verify

### Step 2: Create a Custom Email Address

Once your domain is verified:
1. Go back to Resend Domains
2. Add email address like `contact@sapwebs.com` or `noreply@sapwebs.com`
3. Verify the new email address

### Step 3: Update Environment Variables

Add to your Vercel environment variables or `.env.local`:

```
RESEND_CUSTOM_DOMAIN_EMAIL=contact@sapwebs.com
```

### Step 4: Update the Contact API

In `/app/api/contact/route.ts`, change line 25 to:

```typescript
const CONTACT_EMAIL_FROM = process.env.RESEND_CUSTOM_DOMAIN_EMAIL || 'onboarding@resend.dev'
```

And update line 28 to send to multiple recipients:

```typescript
const CONTACT_EMAIL_TO = ['info@sapwebs.com']
```

---

## Email Sending Flow (Current Testing Mode)

1. **Client submits form** → Form data sent to `/api/contact`
2. **Admin notification** → Email sent to verified address (olalekansheva@gmail.com)
3. **Client confirmation** → Confirmation email sent to client's email address
4. **Manual forwarding** → Admin forwards email to team members if needed

Each admin email includes forwarding information for team members.

---

## Troubleshooting

### Error: "domain is not verified"
- The domain you're trying to send from isn't verified in Resend
- **Solution:** Verify the domain in Resend dashboard or use `onboarding@resend.dev`

### Error: "can only send to your own email address"
- Trying to send to unverified email addresses without a verified domain
- **Solution:** Follow "Step 1-4" above to verify a custom domain

### Emails not arriving
- Check spam/junk folder
- Verify email addresses are correct
- Check Resend API key is valid: https://resend.com/api-keys

---

## Cost & Limits

**Resend Pricing:**
- Free tier: 100 emails/day (perfect for contact forms)
- Paid: $20/month for unlimited emails
- No setup fees, cancel anytime

---

## API Documentation

- Resend Docs: https://resend.com/docs
- Contact API: `/app/api/contact/route.ts`
- Configuration: Line 30-43 in the API file
