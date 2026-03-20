# 🌐 LatestWorld.in

Fully automated technology intelligence website.
100% free to run. Updates itself. Built for AdSense earnings.

## Sections
- 💹 Crypto prices (CoinGecko — every 6hrs)
- 📰 Tech news (GNews — every 6hrs)
- 🚀 Startup news (GNews — every 6hrs)
- 🤖 AI Tools (Product Hunt — daily)
- ⭐ GitHub Projects (GitHub API — daily)
- 💼 Tech Jobs (Adzuna — every 12hrs)

## Stack
- **Frontend**: Next.js (static export) → Cloudflare Pages
- **Automation**: Cloudflare Workers (cron)
- **Database**: Supabase Postgres
- **Styling**: Tailwind CSS

## Setup
See `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions.

## Project Structure
```
/frontend          — Next.js frontend code
  /app             — Pages (App Router)
  /lib             — Supabase client + data fetchers
/workers           — Cloudflare Worker cron script
/database          — SQL schema for Supabase
.env.example       — All environment variables needed
DEPLOYMENT_GUIDE   — Full deployment instructions
```
