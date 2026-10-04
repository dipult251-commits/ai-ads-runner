README.md
# AI Ads Runner

AI Ads Runner is a Next.js-based marketing automation application for creating AI-generated ads, posters, and campaigns.

## Features
- AI ad creator for Facebook, Instagram, and WhatsApp
- Hindi and English support
- AI poster studio
- Campaign management with budget tracking
- Social media content generation
- AI marketing recommendations
- Admin dashboard
- Free/demo mode
- Confirmation before publishing or spending budget

## Stack
- Next.js 14
- TypeScript
- Prisma + PostgreSQL
- JWT-based auth
- OpenAI API support

## Local setup
1. Install dependencies:
   npm install
2. Create a PostgreSQL database and add the connection string in `.env`.
3. Run Prisma generate:
   npx prisma generate
4. Run migrations:
   npx prisma migrate dev --name init
5. Start the app:
   npm run dev

## Demo credentials
- Email: demo@aiadsrunner.com
- Password: demo@12345

## Vercel deployment
- Use Vercel with a PostgreSQL provider such as Neon or Supabase.
- Add environment variables in Vercel project settings.
- Use a production `DATABASE_URL`, `NEXTAUTH_SECRET`, and optional `OPENAI_API_KEY`.
- Set `NEXTAUTH_URL` to your Vercel URL.

## Important
This app does not spend ad money automatically. Publishing or spending requires explicit confirmation from the user.
