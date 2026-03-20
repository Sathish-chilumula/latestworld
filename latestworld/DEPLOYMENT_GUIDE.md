# LatestWorld.in - Complete Deployment Guide
# Follow these steps in ORDER

===========================================
STEP 1: CREATE GITHUB REPOSITORY
===========================================

1. Go to https://github.com/new
2. Repository name: latestworld
3. Set to Public
4. Click "Create repository"

5. On your computer, open terminal:
   git init
   git add .
   git commit -m "Initial commit - LatestWorld.in"
   git remote add origin https://github.com/YOUR_USERNAME/latestworld.git
   git push -u origin main

===========================================
STEP 2: SET UP SUPABASE DATABASE
===========================================

1. Go to https://supabase.com
2. Click "Start your project" → Sign up free
3. Create new project:
   - Name: latestworld
   - Region: South Asia (Mumbai) — closest to India
   - Password: create a strong password (save it!)

4. Wait 2 minutes for project to be ready

5. Go to: SQL Editor (left sidebar)
6. Click "New Query"
7. PASTE the entire contents of /database/schema.sql
8. Click "Run" (green button)
9. You should see "Success" for each table

10. Get your keys:
    - Go to Settings → API
    - Copy "Project URL" → this is your SUPABASE_URL
    - Copy "anon public" key → this is your SUPABASE_ANON_KEY
    - Copy "service_role" key → this is your SUPABASE_SERVICE_ROLE_KEY
    (KEEP SERVICE_ROLE KEY SECRET — never put in frontend code)

===========================================
STEP 3: GET ALL API KEYS
===========================================

--- GNews API (Tech News) ---
1. Go to https://gnews.io
2. Click "Get API Key" → Sign up free
3. Free plan: 100 requests/day — enough for us
4. Copy your API key

--- GitHub Token ---
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: latestworld-bot
4. Select scopes: public_repo (read only)
5. Click "Generate token"
6. COPY IT NOW (shown only once)

--- CoinGecko API ---
1. Go to https://www.coingecko.com/api
2. Click "Get Your API Key" → Sign up free
3. Demo plan is free — copy your key
4. (Optional — works without key but slower rate limits)

--- Product Hunt API (AI Tools) ---
1. Go to https://www.producthunt.com/v2/oauth/applications
2. Sign in to Product Hunt
3. Click "Add an Application"
4. Name: LatestWorld, URL: https://latestworld.in
5. After creating, go to "Developer Token" tab
6. Copy the token

--- Adzuna API (Tech Jobs) ---
1. Go to https://developer.adzuna.com
2. Click "Register" → Create free account
3. Create new app: latestworld
4. Copy App ID and App Key

===========================================
STEP 4: DEPLOY FRONTEND ON CLOUDFLARE PAGES
===========================================

1. Go to https://dash.cloudflare.com
2. Sign up / Log in (free)
3. Left sidebar → "Pages"
4. Click "Create a project"
5. Click "Connect to Git"
6. Connect your GitHub account
7. Select your "latestworld" repository
8. Configure build settings:
   - Framework preset: Next.js
   - Build command: cd frontend && npm run build
   - Build output directory: frontend/out
   - Root directory: / (leave blank)
9. Click "Save and Deploy" — wait 3-5 minutes

10. ADD ENVIRONMENT VARIABLES:
    - Go to your Pages project → Settings → Environment Variables
    - Add these (click "Add variable" for each):

    Variable Name                  Value
    NEXT_PUBLIC_SUPABASE_URL      https://your-project.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY your-anon-key

11. After adding variables, go to Deployments → Retry deployment

12. GET YOUR DEPLOY HOOK:
    - Pages → Your project → Settings → Builds & deployments
    - Scroll to "Deploy Hooks"
    - Click "Add deploy hook"
    - Name: worker-trigger, Branch: main
    - Copy the webhook URL (you'll need it for the Worker)

===========================================
STEP 5: CONNECT YOUR DOMAIN latestworld.in
===========================================

1. In Cloudflare Pages → Your project → Custom Domains
2. Click "Set up a custom domain"
3. Enter: latestworld.in
4. If your domain is in Cloudflare: it auto-configures
5. If domain is elsewhere (GoDaddy, Namecheap):
   - Add CNAME record: latestworld.in → your-pages-url.pages.dev

===========================================
STEP 6: DEPLOY CLOUDFLARE WORKER
===========================================

1. In Cloudflare dashboard → Left sidebar → "Workers & Pages"
2. Click "Create" → "Create Worker"
3. Name it: latestworld-cron
4. Click "Deploy" (deploys blank worker)

5. Now edit the worker:
   - Click on "latestworld-cron"
   - Click "Edit Code"
   - DELETE all existing code
   - PASTE entire contents of /workers/cron-worker.js
   - Click "Deploy"

6. ADD ENVIRONMENT VARIABLES to Worker:
   - Go to Worker → Settings → Variables
   - Click "Add variable" for each:

   Variable Name                        Value
   SUPABASE_URL                        https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY           your-service-role-key
   GNEWS_API_KEY                       your-gnews-key
   GITHUB_TOKEN                        your-github-token
   COINGECKO_API_KEY                   your-coingecko-key
   PRODUCT_HUNT_TOKEN                  your-product-hunt-token
   ADZUNA_APP_ID                       your-adzuna-app-id
   ADZUNA_APP_KEY                      your-adzuna-app-key
   CLOUDFLARE_PAGES_DEPLOY_HOOK        https://api.cloudflare.com/...your-hook-url
   WORKER_SECRET                       any-random-secret-string

   ⚠️ For sensitive keys: Click "Encrypt" checkbox before saving

7. ADD CRON TRIGGERS:
   - Go to Worker → Triggers tab
   - Click "Add Cron Trigger"
   - Add these 3 crons one by one:
     0 */6  * * *    (every 6 hours — crypto + news)
     0 */12 * * *    (every 12 hours — jobs)
     0 0    * * *    (daily midnight — github + AI tools)

===========================================
STEP 7: TEST EVERYTHING
===========================================

1. Test Worker manually (trigger all data fetch):
   Visit: https://latestworld-cron.YOUR-SUBDOMAIN.workers.dev/?action=all&secret=YOUR_WORKER_SECRET

2. Check Supabase has data:
   - Go to Supabase → Table Editor
   - Click each table — should see rows of data

3. Check your website:
   - Visit https://latestworld.in
   - All 6 sections should show data

4. Check sitemap:
   - Visit https://latestworld.in/sitemap.xml

===========================================
STEP 8: SUBMIT TO GOOGLE
===========================================

1. Go to https://search.google.com/search-console
2. Add property: latestworld.in
3. Verify ownership (add HTML tag to layout.js or DNS record)
4. Submit sitemap: https://latestworld.in/sitemap.xml

===========================================
STEP 9: APPLY FOR GOOGLE ADSENSE
===========================================

Wait until you have:
✅ At least 30+ pages of content (happens after first worker run)
✅ Privacy Policy page live (/privacy-policy)
✅ About page live (/about)
✅ Contact page live (/contact)
✅ Site indexed by Google (check Search Console — usually 1-2 weeks)
✅ Some organic traffic

Then:
1. Go to https://adsense.google.com
2. Apply with latestworld.in
3. Add AdSense script to layout.js (location shown in comments)
4. Wait for approval (usually 1-2 weeks)

===========================================
TROUBLESHOOTING
===========================================

Problem: Site shows blank / no data
Fix: Check Worker ran successfully → Supabase → Table Editor has rows

Problem: Worker fails with 401
Fix: Check SUPABASE_SERVICE_ROLE_KEY is correct and "Encrypt" was NOT checked
     (encrypted variables sometimes cause issues — use plain text first)

Problem: Build fails on Cloudflare Pages
Fix: Check build command is: cd frontend && npm run build
     Check output directory is: frontend/out

Problem: CoinGecko returns 429 (rate limit)
Fix: Add your free API key in Worker variables — increases limit significantly

===========================================
MAINTENANCE (Zero work needed)
===========================================

After setup, everything runs automatically:
- Worker fetches fresh data on schedule
- Pages rebuilds with new content
- Site stays fresh 24/7

You only need to:
- Monitor Supabase storage (free = 500MB, takes months to fill)
- Renew API keys if they expire
- Check AdSense dashboard for earnings
