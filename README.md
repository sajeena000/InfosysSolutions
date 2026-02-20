# Infosys Solutions — Dashboard & Website

A full-stack corporate website and admin dashboard built with **Nuxt 4**, **Vue 3**, **Tailwind CSS**, and **PostgreSQL**.

## Features

**Public Site** - Landing page · Services & Pricing · Payment (eSewa / PayPal) · Projects Gallery · News & Events · About · Contact · AI Chatbot (Gemma 3)

**Admin Dashboard** - Analytics & Charts · CMS (Blogs, Events, Projects, Team) · Payments Management · Contact Inquiries · Global Search · Settings · 2FA Authentication

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Nuxt 4, Vue 3 |
| Styling | Tailwind CSS, Lucide Icons |
| State | Pinia |
| Database | PostgreSQL, Drizzle ORM |
| Auth | bcrypt, TOTP-based 2FA |
| Payments | eSewa, PayPal |
| AI | Google GenAI SDK (Gemma 3) |

## Quick Start

```bash
git clone <repository_url> && cd dashboard
npm install
cp .env.example .env   # configure your env variables
npx drizzle-kit push   # push DB schema
npm run dev             # start dev server
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `GEMINI_API_KEY` | Google GenAI API key |
| `ESEWA_MERCHANT_CODE` | eSewa merchant code |
| `ESEWA_SECRET_KEY` | eSewa secret key |
| `ESEWA_ENV` | `development` / `production` |
| `PAYPAL_CLIENT_ID` | PayPal client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal client secret |
| `PAYPAL_ENV` | `sandbox` / `production` |
| `APP_BASE_URL` | Application base URL |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npx drizzle-kit push` | Push schema to DB |
| `npx drizzle-kit studio` | Drizzle Studio (DB GUI) |
