# GAX Currículo — Full Next.js Project (Auth, Plans, Stripe placeholder)

## Overview
This project contains:
- Next.js 15 (App Router)
- NextAuth (Credentials) + signup API
- Prisma (SQLite) schema and client
- Stripe checkout creation route and webhook handler (placeholders)
- UI components and Auth modal
- Middleware protecting /dashboard and /downloads
- Subscription helpers and /api/notify-payment

## Quick start (local)
1. Copy `.env.example` to `.env` and set values.
2. npm install
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run dev
6. Open http://localhost:3000

For production, use a managed DB and set environment variables in your host (Vercel/Netlify).
