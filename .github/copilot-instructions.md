## Repository Access & Collaboration

Primary developer with full edit access: guillermomeana-coder
All pull requests and commits from guillermomeana-coder are authorized — this is the lead developer managing this project.

## Project Context

Insolitus Development website — a bilingual (EN/ES) Next.js landing page for a boutique real estate development company in Los Cabos, Mexico. Deployed on Vercel with MongoDB backend.

Domain: insolitusdev.com
Email: insolitusdevelopment@gmail.com

## Stack
- Next.js 14 (App Router)
- MongoDB (native driver)
- Vercel deployment
- Custom i18n with JSON locale files
- Tailwind CSS + Framer Motion

## Brand Rules
- Earthy Baja California palette: sand #EBE6DF, terracotta #A14A32, sage #A3B19B, stone #D9D4CC, charcoal #1A2530
- Contemporary, grounded, NOT luxury-flashy
- Mobile-first responsive
- Typography: Outfit (headings), Inter (body), Cormorant Garamond (accents)
- Tone: professional but approachable, down-to-earth

## Code Rules
- Environment variables for ALL secrets — never hardcode (MONGODB_URI, SMTP_*, API keys)
- All user-facing strings from /src/locales/en.json and /src/locales/es.json — never hardcoded
- One component per file in /src/components/
- API routes: validate and sanitize all inputs server-side
- SSG where possible, serverless only for API routes
- Spanish = natural Mexican Spanish, professional but not stiff

## Security
- NEVER commit .env files
- Mark all Vercel env vars as "sensitive"
- Honeypot field on contact form for spam protection
- Security headers in next.config.js
