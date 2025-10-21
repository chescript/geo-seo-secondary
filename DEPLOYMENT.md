# Vercel Deployment Guide

This guide will help you deploy this Next.js application to Vercel with minimal errors.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- A PostgreSQL database (recommended: [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres))
- API keys for the services you plan to use

## Quick Start

### 1. Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will automatically detect it's a Next.js project

### 2. Configure Environment Variables

In your Vercel project settings, add the following environment variables:

#### Required Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@host:5432/database_name"

# Authentication
BETTER_AUTH_SECRET="your-32-character-secret-key"  # Generate with: openssl rand -base64 32
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"

# Billing
AUTUMN_SECRET_KEY="your-autumn-api-key"

# Web Scraping (Required)
FIRECRAWL_API_KEY="fc-..."

# Node Environment
NODE_ENV="production"
```

#### Optional Variables (Based on Features You Use)

```bash
# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Stripe (if using instead of Autumn)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"

# AI Providers (for FireGEO Brand Monitor & Chat)
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_GENERATIVE_AI_API_KEY="..."
PERPLEXITY_API_KEY="pplx-..."
```

### 3. Database Setup

Before deploying, ensure your database is set up:

```bash
# Run migrations locally first
npm run db:push

# Or generate and apply migrations
npm run db:generate
npm run db:migrate
```

### 4. Deploy

Click "Deploy" in Vercel. The deployment will:
- Install dependencies
- Run type checking (errors ignored per config)
- Build the Next.js application
- Deploy to production

## Post-Deployment Steps

### 1. Update OAuth Redirect URIs

If using OAuth, update your OAuth app settings with the new production URL:

**Google OAuth:**
- Authorized redirect URIs: `https://your-domain.vercel.app/api/auth/callback/google`

**GitHub OAuth:**
- Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`

### 2. Update Stripe Webhooks (if applicable)

Add your Vercel domain to Stripe webhook endpoints:
- Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`

### 3. Test the Deployment

1. Visit your deployed URL
2. Test authentication flow
3. Test brand monitoring features
4. Test chat features
5. Verify database connections

## Troubleshooting

### Build Errors

**TypeScript/ESLint Errors:**
The build is configured to ignore TypeScript and ESLint errors (see `next.config.ts`). However, it's recommended to fix these before production.

**Out of Memory:**
- Large brand monitor analyses may require increased memory
- The `vercel.json` already configures 3GB for heavy API routes
- For Pro/Enterprise plans, you can increase this further

### Runtime Errors

**Database Connection:**
- Ensure your `DATABASE_URL` includes SSL settings if required
- Example: `postgresql://user:pass@host:5432/db?sslmode=require`

**API Timeouts:**
- Brand monitor and chat routes have 5-minute (300s) timeouts
- This is the maximum for Pro plans
- Consider background jobs for longer operations

**Environment Variables Not Found:**
- Ensure all required env vars are set in Vercel dashboard
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

### Function Timeouts

The following routes have extended timeouts:
- `/api/brand-monitor/analyze` - 300 seconds (5 minutes)
- `/api/brand-monitor/batch-scrape` - 300 seconds (5 minutes)
- `/api/chat/stream` - 300 seconds (5 minutes)

If these aren't enough:
1. Consider splitting work into smaller chunks
2. Use background workers (Vercel Cron or external queue)
3. Implement streaming responses

## Performance Optimization

### 1. Enable Analytics
- Go to your project settings in Vercel
- Enable Web Analytics for real-time performance monitoring

### 2. Set Up Monitoring
- Use Vercel's built-in logging
- Consider Sentry or LogRocket for error tracking
- Monitor function execution times

### 3. Database Optimization
- Use connection pooling (PgBouncer recommended)
- Add indexes for frequently queried fields
- Consider read replicas for high traffic

## Security Checklist

- [ ] All environment variables set correctly
- [ ] OAuth redirect URIs updated
- [ ] Stripe webhooks configured with production endpoint
- [ ] Database credentials secured
- [ ] API keys rotated from development
- [ ] BETTER_AUTH_SECRET is unique and secure
- [ ] CORS headers configured appropriately
- [ ] Review security headers in `vercel.json`

## Custom Domain

To add a custom domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS according to Vercel's instructions
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain
5. Update OAuth redirect URIs to use custom domain

## Rollback

If deployment fails or has issues:
1. Go to Deployments tab in Vercel
2. Find the last working deployment
3. Click the three dots → "Promote to Production"

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Project Issues:** Check your repository's issues page

## Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vercel Functions](https://vercel.com/docs/functions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PostgreSQL on Vercel](https://vercel.com/docs/storage/vercel-postgres)
