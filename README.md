# 🔥 FireGEO - AI Brand Visibility Platform

<div align="center">

![FireGEO Banner](https://img.shields.io/badge/FireGEO-AI%20Brand%20Visibility-orange?style=for-the-badge)

**Track how AI models rank your brand. Drive growth with AI-powered insights.**

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](#) • [Documentation](#-documentation) • [Quick Start](#-quick-start) • [Features](#-features)

</div>

---

## 🎯 What is FireGEO?

**FireGEO** is a modern SaaS platform that helps businesses understand and improve their visibility across AI models like ChatGPT, Claude, Perplexity, and Google Gemini.

### The Problem
As AI becomes the new search engine, businesses need to know:
- ✅ How often AI models mention their brand
- ✅ How they rank against competitors
- ✅ What triggers their brand's appearance
- ✅ How to optimize for AI visibility

### The Solution
FireGEO provides a **free AI-readiness checker** to attract users, then converts them to **premium brand monitoring** with real-time analytics, competitor tracking, and actionable insights.

---

## 🎁 Why This Project?

This is a **production-ready SaaS starter** with a proven free-to-premium conversion strategy:

```
Free Tool (Homepage) → Sign Up → Premium Features → Paying Customers
```

**Perfect for:**
- 🚀 Launching your own SaaS quickly
- 💡 Learning modern web development patterns
- 🎨 Understanding user acquisition funnels
- 🛠️ Building on a solid technical foundation

---

## ✨ Features

### 🆓 Free Tool (No Login Required)
- **AI-Readiness Checker** - Analyze any website for AI/LLM compatibility
- **Instant Results** - Get SEO score, content quality, and recommendations
- **Beautiful UI** - Clean, modern design with smooth animations
- **Mobile Responsive** - Works perfectly on all devices

### 💎 Premium Features (Auth Required)
- **Brand Monitoring** - Track brand mentions across all major AI models
- **Competitor Analysis** - See how you rank against competitors
- **AI Chat** - Interactive chat with multiple AI providers (GPT, Claude, etc.)
- **Real-time Alerts** - Get notified when your brand visibility changes
- **Usage Dashboard** - Track credits, analytics, and billing
- **Multiple AI Providers** - OpenAI, Anthropic, Google, Perplexity support

### 🔐 Built-in Features
- **Authentication** - Secure login/signup with Better Auth
- **Database** - PostgreSQL with Drizzle ORM
- **Billing** - Stripe integration via Autumn
- **Email** - Transactional emails with Resend
- **Rate Limiting** - Protect your API endpoints
- **Error Handling** - Comprehensive error management

---

## 🛠️ Tech Stack

| Category | Technology | Why? |
|----------|-----------|------|
| **Framework** | Next.js 15.3 | Server components, App Router, optimal performance |
| **Language** | TypeScript 5 | Type safety, better DX |
| **Styling** | Tailwind CSS v4 | Utility-first, fast development |
| **UI Components** | shadcn/ui + Radix UI | Accessible, customizable components |
| **Animations** | Framer Motion | Smooth, professional animations |
| **Database** | PostgreSQL + Drizzle ORM | Reliable, powerful, type-safe queries |
| **Authentication** | Better Auth | Modern, flexible auth solution |
| **Billing** | Autumn (Stripe) | Usage-based billing made easy |
| **AI Providers** | OpenAI, Anthropic, Google, Perplexity | Multi-provider AI support |
| **Email** | Resend | Developer-friendly email API |
| **Deployment** | Vercel | Zero-config, optimal performance |

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed
- **PostgreSQL database** (we recommend [Supabase](https://supabase.com) free tier)
- **npm** or **pnpm** package manager

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/firegeo.git
cd firegeo

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Edit .env.local with your credentials
# Required:
#   - DATABASE_URL
#   - BETTER_AUTH_SECRET (generate with: openssl rand -base64 32)
#   - NEXT_PUBLIC_APP_URL

# 5. Initialize the database
npm run setup
# OR manually:
# npm run db:push
# npx @better-auth/cli generate --config better-auth.config.ts
# npm run db:push

# 6. Start development server
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 📁 Project Structure

```
firecrawl/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 🏠 Homepage (free AI checker)
│   ├── layout.tsx                # Root layout (navbar + footer)
│   ├── globals.css               # Global styles
│   │
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   │
│   ├── (app)/                    # Application pages (auth required)
│   │   ├── dashboard/
│   │   ├── brand-monitor/
│   │   ├── chat/
│   │   └── plans/
│   │
│   └── api/                      # API routes
│       ├── auth/                 # Authentication endpoints
│       ├── ai-readiness/         # Free AI checker API
│       ├── brand-monitor/        # Brand monitoring API
│       ├── chat/                 # AI chat API
│       ├── credits/              # Usage tracking
│       └── user/                 # User management
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── navbar.tsx                # Navigation bar
│   ├── footer.tsx                # Footer
│   └── providers.tsx             # Context providers
│
├── lib/                          # Business logic & utilities
│   ├── auth.ts                   # Authentication config
│   ├── db/                       # Database schema & queries
│   │   ├── schema.ts             # Drizzle schema
│   │   └── index.ts              # DB connection
│   ├── providers/                # AI provider configurations
│   └── utils.ts                  # Helper functions
│
├── public/                       # Static assets
├── migrations/                   # Database migrations
└── [config files]                # Various configuration files
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# ============================================
# REQUIRED - App won't start without these
# ============================================

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:pass@host:5432/database"

# Authentication (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-32-character-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ============================================
# OPTIONAL - For full features
# ============================================

# Billing (Autumn + Stripe)
AUTUMN_SECRET_KEY="autumn_secret_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"

# AI Providers (for brand monitor & chat)
FIRECRAWL_API_KEY="fc-..."
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_GENERATIVE_AI_API_KEY="..."
PERPLEXITY_API_KEY="pplx-..."

# Environment
NODE_ENV="development"
```

### Getting API Keys

| Service | URL | Free Tier? |
|---------|-----|------------|
| **Supabase** (Database) | [supabase.com](https://supabase.com) | ✅ Yes |
| **Autumn** (Billing) | [useautumn.com](https://useautumn.com) | ✅ Yes |
| **Resend** (Email) | [resend.com](https://resend.com) | ✅ Yes (3,000/month) |
| **Firecrawl** (Web Scraping) | [firecrawl.dev](https://firecrawl.dev) | ✅ Yes |
| **OpenAI** | [platform.openai.com](https://platform.openai.com) | ⚠️ Credit required |
| **Anthropic** | [console.anthropic.com](https://console.anthropic.com) | ⚠️ Credit required |

---

## 📖 Documentation

### Available Scripts

```bash
# Development
npm run dev                # Start dev server (http://localhost:3000)
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint

# Database
npm run db:push            # Push schema changes to database
npm run db:studio          # Open Drizzle Studio (database GUI)
npm run db:migrate         # Run migrations
npm run db:generate        # Generate migration files

# Setup
npm run setup              # Automated setup (install + db + auth)
npm run setup:autumn       # Configure Autumn billing
```

### Key Routes

| Route | Description | Auth Required? |
|-------|-------------|----------------|
| `/` | Homepage with free AI checker | ❌ No |
| `/login` | User login | ❌ No |
| `/register` | User registration | ❌ No |
| `/dashboard` | User dashboard | ✅ Yes |
| `/brand-monitor` | Brand monitoring tool | ✅ Yes |
| `/chat` | AI chat interface | ✅ Yes |
| `/plans` | Pricing & plans | ❌ No |

### User Flow

```mermaid
graph LR
    A[Visit Homepage] --> B[Use Free AI Checker]
    B --> C[See Results]
    C --> D[View Premium CTAs]
    D --> E[Sign Up]
    E --> F[Access Premium Features]
    F --> G[Brand Monitor]
    F --> H[AI Chat]
    F --> I[Dashboard]
```

---

## 🎨 Customization

### Change Branding

1. **Update app metadata** (`app/layout.tsx`):
```tsx
export const metadata: Metadata = {
  title: "Your SaaS Name",
  description: "Your description",
};
```

2. **Replace logo** (`components/navbar.tsx`):
```tsx
<Image
  src="/your-logo.png"  // Add your logo to public/
  alt="Your Brand"
  width={120}
  height={25}
/>
```

3. **Change colors** (`app/globals.css`):
```css
.btn-firecrawl-orange {
  background-color: #YOUR_COLOR;  /* Replace #f97316 */
}
```

4. **Update Tailwind theme** (`tailwind.config.ts`):
```ts
theme: {
  extend: {
    colors: {
      brand: '#YOUR_COLOR',
    },
  },
}
```

### Add New Pages

```bash
# Create a new page at /about
mkdir app/about
touch app/about/page.tsx
```

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <div>About Us</div>
}
```

### Add New API Endpoints

```bash
# Create API endpoint at /api/my-endpoint
mkdir -p app/api/my-endpoint
touch app/api/my-endpoint/route.ts
```

```tsx
// app/api/my-endpoint/route.ts
export async function GET() {
  return Response.json({ message: 'Hello!' })
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

3. **Add environment variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`
   - Update `NEXT_PUBLIC_APP_URL` to your production domain

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Post-Deployment

```bash
# Run database migrations in production
npm run db:push
```

### Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## 🔐 Security

### Best Practices Implemented

- ✅ **Environment Variables** - Sensitive data never committed to git
- ✅ **HTTPS Only** - All API calls use secure connections
- ✅ **CSRF Protection** - Built into Better Auth
- ✅ **Rate Limiting** - Prevents API abuse
- ✅ **SQL Injection Prevention** - Drizzle ORM parameterized queries
- ✅ **XSS Protection** - React automatic escaping
- ✅ **Secure Sessions** - HTTPOnly cookies

### Security Checklist

Before deploying to production:

- [ ] Change `BETTER_AUTH_SECRET` to a strong, unique value
- [ ] Use separate database for production
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up database backups
- [ ] Configure Stripe webhook signatures
- [ ] Review and restrict API rate limits
- [ ] Enable error monitoring (Sentry, etc.)

---

## 🐛 Troubleshooting

### Common Issues

**"relation 'user' does not exist"**
```bash
npx @better-auth/cli generate --config better-auth.config.ts
npm run db:push
```

**"Port 3000 already in use"**
```bash
# Kill the process
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

**"Module not found"**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
```

**Build fails with TypeScript errors**
```bash
# Check tsconfig.json
# Temporarily skip errors (not recommended):
# Set ignoreBuildErrors: true in next.config.ts
```

**Database connection fails**
```bash
# Verify DATABASE_URL is correct
# Check if database is accessible
# Ensure PostgreSQL is running
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Write clean, documented code
- Follow existing code style
- Test your changes thoroughly
- Update documentation as needed

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 FireGEO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

Built with these amazing technologies:

- [Next.js](https://nextjs.org) - The React Framework
- [Better Auth](https://better-auth.com) - Modern authentication
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM
- [shadcn/ui](https://ui.shadcn.com) - Beautiful components
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Framer Motion](https://framer.com/motion) - Animation library

Special thanks to the open-source community! 🎉

---

## 📞 Support

Need help? Here's where to get it:

- 📖 **Documentation** - Check this README and code comments
- 🐛 **Bug Reports** - [Open an issue](https://github.com/yourusername/firegeo/issues)
- 💬 **Questions** - [Start a discussion](https://github.com/yourusername/firegeo/discussions)
- 📧 **Email** - support@yourcompany.com

---

## 🗺️ Roadmap

### Current Features ✅
- Free AI-readiness checker
- User authentication
- Brand monitoring
- AI chat
- Usage-based billing
- Multi-provider AI support

### Coming Soon 🚀
- [ ] Automated brand reports via email
- [ ] Webhook notifications
- [ ] Team collaboration features
- [ ] White-label options
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] API for developers
- [ ] Zapier integration

---

## 🚀 Deployment

For deployment instructions and best practices, see [DEPLOYMENT.md](./DEPLOYMENT.md).

Quick deploy to Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/firegeo)

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/firegeo?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/firegeo?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/firegeo)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/firegeo)

---

<div align="center">

**[⬆ Back to Top](#-firegeo---ai-brand-visibility-platform)**

Made with ❤️ by developers, for developers

**[Website](#) • [Documentation](#) • [Twitter](#) • [Discord](#)**

</div>
