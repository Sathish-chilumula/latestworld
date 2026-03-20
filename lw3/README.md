# 🌐 LatestWorld.in

India's #1 automated technology intelligence hub.
Auto-generates 5000+ SEO pages from 5 APIs. AdSense ready.

## ✨ What This Does
- 💹 Live crypto prices (CoinGecko) — 200 coins
- 📰 Tech news (GNews) — 30+ articles/day
- 🤖 AI tools (Product Hunt) — daily launches
- ⭐ GitHub trending (GitHub API) — daily repos
- 💼 Tech jobs (Adzuna) — 40+ jobs/day
- 🚀 Startup funding news (GNews) — daily

Every new item = a new SEO page, auto-added to sitemap.xml.

## 🔧 Tech Stack
- **Frontend**: Next.js 14 TypeScript (App Router, static export)
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: Supabase Postgres
- **Hosting**: Cloudflare Pages
- **Cron**: GitHub Actions (4 workflows)

---

## 🚀 DEPLOYMENT STEPS

### STEP 1 — Supabase Setup
1. Go to supabase.com → New project
2. Select region: **Southeast Asia (Singapore)** or South Asia
3. Wait for project to start (~2 min)
4. Go to **SQL Editor** → paste contents of `supabase/schema.sql` → Run
5. Note your Project URL and anon key (Settings → API)

### STEP 2 — GitHub Setup
1. Create new GitHub repo called `latestworld`
2. Push this entire codebase to it:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/latestworld.git
   git push -u origin main
   ```
3. Go to repo → **Settings → Secrets and variables → Actions**
4. Add these secrets one by one:

| Secret Name | Where to get it |
|---|---|
| `SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role key |
| `COINGECKO_API_KEY` | coingecko.com/en/developers/dashboard |
| `GNEWS_API_KEY` | gnews.io → Dashboard after signup |
| `GH_TOKEN` | github.com/settings/tokens → classic → public_repo |
| `PRODUCTHUNT_TOKEN` | producthunt.com/v2/oauth/applications |
| `ADZUNA_APP_ID` | developer.adzuna.com |
| `ADZUNA_APP_KEY` | developer.adzuna.com |
| `CLOUDFLARE_PAGES_DEPLOY_HOOK` | Add after Step 3 below |

### STEP 3 — Cloudflare Pages Setup
1. Go to dash.cloudflare.com → **Pages → Create project**
2. Connect GitHub → Select `latestworld` repo
3. Build settings:
   - Framework: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Output directory: `out`
   - Root directory: (leave blank)
4. Environment Variables (add 2):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
5. Click **Save and Deploy**
6. After deploy: Settings → **Builds & deployments → Deploy Hooks**
   - Add hook named `cron-trigger` → branch `main`
   - Copy the URL → add to GitHub Secrets as `CLOUDFLARE_PAGES_DEPLOY_HOOK`

### STEP 4 — Test the cron jobs
1. GitHub → Actions tab
2. Click any workflow (e.g. "Update Crypto Prices")
3. Click **"Run workflow"** button → Run
4. Watch logs — should end with ✅
5. Check Supabase → Table Editor → verify rows appeared
6. Visit your Cloudflare Pages URL — data should show

### STEP 5 — Connect domain latestworld.in
1. Cloudflare → Pages → Custom Domains → Add latestworld.in
2. Follow DNS instructions (usually automatic if domain is on Cloudflare)

### STEP 6 — Google Search Console
1. Go to search.google.com/search-console
2. Add property: latestworld.in
3. Verify via Cloudflare DNS
4. Submit sitemap: `https://latestworld.in/sitemap.xml`

### STEP 7 — Apply for AdSense
Wait for:
- [ ] 30+ pages indexed by Google
- [ ] Some organic traffic (even small amounts)
- [ ] Site has been live 1-2 weeks
- Then apply at adsense.google.com

---

## 📁 File Structure
```
/app                    Next.js pages
  /crypto/[slug]        Individual coin pages (200+ auto-generated)
  /news/[slug]          News article pages (30+/day auto-generated)
  /jobs/[slug]          Job listing pages (40+/day auto-generated)
  /github/[slug]        GitHub project pages (80+ auto-generated)
  /ai-tools/[slug]      AI tool pages (20+ auto-generated)
  /startups/[slug]      Startup news pages (30+/day auto-generated)
  /about                About page (AdSense required)
  /contact              Contact page (AdSense required)
  /privacy-policy       Privacy page (AdSense required)
  /terms                Terms page (AdSense required)
  /disclaimer           Disclaimer page (AdSense required)
  /sitemap-page         HTML sitemap (AdSense required)
  sitemap.ts            Dynamic XML sitemap (auto-updates)
  robots.ts             robots.txt

/components             Reusable UI components
/lib/supabase.ts        Supabase client + all data fetchers
/utils/helpers.ts       Formatting utilities
/scripts                6 data update scripts (run by GitHub Actions)
/supabase/schema.sql    Database schema (run once in Supabase)
/.github/workflows      4 automated cron workflows
```

## 📊 Auto Page Generation
Every cron run adds new rows → new pages → sitemap.xml updates → Google crawls.

In 30 days you'll have:
- 200 crypto pages
- 900+ news pages  
- 1200+ job pages
- 80+ GitHub pages
- 600+ startup pages
- 600+ AI tool pages

**= 3,500+ pages automatically**
