# Infosys Solutions - Corporate Dashboard & Website

A full-stack corporate website with an admin dashboard built using **Nuxt 4**, **Vue 3**, **Tailwind CSS**, and **PostgreSQL**.

## Features

### Public Website
- Responsive landing page with dark/light mode and glassmorphism UI
- **Services & Pricing**: plan selection with online payment flow
- **Payment Integration**: eSewa (Nepal) and PayPal gateways
- **Projects Gallery**: completed project showcase
- **News & Events**: blog posts and event listings
- **About Us**: company info and team profiles
- **Contact**: inquiry form
- **AI Chatbot**: Google Gemma 3 powered assistant

### Admin Dashboard
- Secure login & registration with role-based access
- **Analytics**: revenue, client retention, and pipeline charts
- **CMS**: manage Blogs, Events, Projects, and Team members
- **Payments**: view, filter, and manage all project submissions & payment statuses
- **Contacts**: track and respond to inquiries
- **Global Search**: instant search across all modules
- **Settings**: persistent app configuration

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 4 |
| Frontend | Vue 3, Tailwind CSS, Lucide Icons |
| State | Pinia |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Payments | eSewa, PayPal |
| AI | Google GenAI SDK (Gemma 3) |

## Getting Started

### Prerequisites
- Node.js (LTS)
- PostgreSQL

### Setup

```bash
# Clone & install
git clone <repository_url>
cd dashboard
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database URL, API keys, and payment credentials

# Push database schema
npx drizzle-kit push

# Start dev server
npm run dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `GEMINI_API_KEY` | Google GenAI API key |
| `ESEWA_MERCHANT_CODE` | eSewa merchant code (`EPAYTEST` for sandbox) |
| `ESEWA_SECRET_KEY` | eSewa secret key |
| `ESEWA_ENV` | `development` or `production` |
| `PAYPAL_CLIENT_ID` | PayPal client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal client secret |
| `PAYPAL_ENV` | `sandbox` or `production` |
| `APP_BASE_URL` | Application base URL |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npx drizzle-kit push` | Push schema to database |
| `npx drizzle-kit studio` | Launch Drizzle Studio (DB GUI) |
