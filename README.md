# GAX Currículo — Complete project (Auth, Plans, Stripe placeholder)

This repository is a ready-to-upload Next.js project scaffold.
Contents:
- Next.js 15 (App Router)
- NextAuth v4 (pages/api)
- Prisma (SQLite) schema
- Signup API, notify-payment, create-checkout, stripe-webhook (placeholders)
- Middleware protecting /dashboard and /downloads
- Auth modal and simple UI components
- Tailwind CSS scaffold

Local setup:
1. Copy `.env.example` → `.env` and set values.
2. npm install
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run dev
