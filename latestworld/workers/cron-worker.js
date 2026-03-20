// LatestWorld.in - Cloudflare Worker
// Cron automation for all 6 data sources
// Deploy this separately in Cloudflare Workers dashboard

// =====================
// UTILITY FUNCTIONS
// =====================

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80);
}

function uniqueSlug(text, suffix = '') {
  const base = generateSlug(text);
  const timestamp = Date.now().toString(36);
  return suffix ? `${base}-${suffix}` : `${base}-${timestamp}`;
}

async function saveToSupabase(env, table, records) {
  const url = `${env.SUPABASE_URL}/rest/v1/${table}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Prefer': 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(records)
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Supabase error for ${table}:`, error);
    throw new Error(`Failed to save to ${table}: ${error}`);
  }

  console.log(`✅ Saved ${records.length} records to ${table}`);
  return true;
}

async function triggerPagesDeploy(env) {
  if (!env.CLOUDFLARE_PAGES_DEPLOY_HOOK) return;
  
  await fetch(env.CLOUDFLARE_PAGES_DEPLOY_HOOK, { method: 'POST' });
  console.log('✅ Triggered Cloudflare Pages rebuild');
}

// =====================
// CRYPTO DATA (CoinGecko)
// =====================
async function fetchCryptoData(env) {
  console.log('📊 Fetching crypto data...');
  
  const url = 'https://api.coingecko.com/api/v3/coins/markets?' + new URLSearchParams({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: '100',
    page: '1',
    sparkline: 'false',
    price_change_percentage: '24h,7d'
  });

  const headers = { 'Accept': 'application/json' };
  if (env.COINGECKO_API_KEY) {
    headers['x-cg-demo-api-key'] = env.COINGECKO_API_KEY;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error('CoinGecko API failed');
  
  const coins = await response.json();

  const records = coins.map(coin => ({
    coin_id: coin.id,
    coin_name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    slug: coin.id,
    price: coin.current_price,
    market_cap: coin.market_cap,
    change_24h: coin.price_change_percentage_24h,
    change_7d: coin.price_change_percentage_7d_in_currency,
    volume_24h: coin.total_volume,
    image: coin.image,
    market_cap_rank: coin.market_cap_rank,
    updated_at: new Date().toISOString()
  }));

  await saveToSupabase(env, 'crypto', records);
  console.log(`✅ Crypto: ${records.length} coins updated`);
}

// =====================
// GITHUB TRENDING
// =====================
async function fetchGitHubTrending(env) {
  console.log('⭐ Fetching GitHub trending...');

  // Fetch trending repos from last 7 days
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const dateStr = date.toISOString().split('T')[0];

  const languages = ['javascript', 'python', 'typescript', 'go', 'rust', 'java'];
  const allRepos = [];

  for (const lang of languages) {
    const url = `https://api.github.com/search/repositories?` + new URLSearchParams({
      q: `language:${lang} created:>${dateStr}`,
      sort: 'stars',
      order: 'desc',
      per_page: '10'
    });

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'LatestWorld-Bot'
    };
    if (env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, { headers });
    if (!response.ok) continue;

    const data = await response.json();
    allRepos.push(...(data.items || []));
    
    // Avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  // Deduplicate by repo id
  const seen = new Set();
  const unique = allRepos.filter(repo => {
    if (seen.has(repo.id)) return false;
    seen.add(repo.id);
    return true;
  });

  const records = unique.slice(0, 50).map(repo => ({
    repo_name: repo.full_name,
    slug: uniqueSlug(repo.full_name),
    description: repo.description || 'No description available',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language || 'Unknown',
    repo_url: repo.html_url,
    owner: repo.owner?.login,
    avatar_url: repo.owner?.avatar_url,
    topics: repo.topics || [],
    updated_at: new Date().toISOString()
  }));

  await saveToSupabase(env, 'github_projects', records);
  console.log(`✅ GitHub: ${records.length} repos saved`);
}

// =====================
// TECH NEWS (GNews API)
// =====================
async function fetchTechNews(env) {
  console.log('📰 Fetching tech news...');

  const url = `https://gnews.io/api/v4/search?` + new URLSearchParams({
    q: 'technology',
    lang: 'en',
    country: 'in',
    max: '20',
    apikey: env.GNEWS_API_KEY
  });

  const response = await fetch(url);
  if (!response.ok) throw new Error('GNews API failed');

  const data = await response.json();
  const articles = data.articles || [];

  const records = articles.map(article => ({
    title: article.title,
    slug: uniqueSlug(article.title),
    summary: article.description || article.title,
    source: article.source?.name || 'Unknown',
    source_url: article.url,
    image: article.image,
    published_at: article.publishedAt,
    category: 'tech'
  }));

  await saveToSupabase(env, 'tech_news', records);
  console.log(`✅ Tech news: ${records.length} articles saved`);
}

// =====================
// STARTUP NEWS (GNews API)
// =====================
async function fetchStartupNews(env) {
  console.log('🚀 Fetching startup news...');

  const queries = ['startup funding India', 'startup investment series'];

  for (const q of queries) {
    const url = `https://gnews.io/api/v4/search?` + new URLSearchParams({
      q,
      lang: 'en',
      max: '10',
      apikey: env.GNEWS_API_KEY
    });

    const response = await fetch(url);
    if (!response.ok) continue;

    const data = await response.json();
    const articles = data.articles || [];

    const records = articles.map(article => ({
      title: article.title,
      slug: uniqueSlug(article.title),
      summary: article.description || article.title,
      source: article.source?.name || 'Unknown',
      source_url: article.url,
      image: article.image,
      published_at: article.publishedAt
    }));

    if (records.length > 0) {
      await saveToSupabase(env, 'startup_news', records);
    }

    await new Promise(r => setTimeout(r, 500));
  }

  console.log('✅ Startup news updated');
}

// =====================
// TECH JOBS (Adzuna API)
// =====================
async function fetchTechJobs(env) {
  console.log('💼 Fetching tech jobs...');

  const categories = ['it-jobs', 'engineering-jobs'];

  for (const cat of categories) {
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?` + new URLSearchParams({
      app_id: env.ADZUNA_APP_ID,
      app_key: env.ADZUNA_APP_KEY,
      results_per_page: '20',
      category: cat,
      content_type: 'application/json'
    });

    const response = await fetch(url);
    if (!response.ok) continue;

    const data = await response.json();
    const jobs = data.results || [];

    const records = jobs.map(job => ({
      title: job.title,
      slug: uniqueSlug(`${job.title}-${job.company?.display_name || ''}`),
      company: job.company?.display_name || 'Unknown',
      location: job.location?.display_name || 'India',
      job_type: job.contract_time || 'full_time',
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      currency: 'INR',
      description: job.description,
      apply_url: job.redirect_url,
      category: cat,
      updated_at: new Date().toISOString()
    }));

    if (records.length > 0) {
      await saveToSupabase(env, 'tech_jobs', records);
    }

    await new Promise(r => setTimeout(r, 500));
  }

  console.log('✅ Tech jobs updated');
}

// =====================
// AI TOOLS (Product Hunt API)
// =====================
async function fetchAITools(env) {
  console.log('🤖 Fetching AI tools...');

  const query = `
    query {
      posts(topic: "artificial-intelligence", order: VOTES, first: 20) {
        edges {
          node {
            id
            name
            tagline
            description
            url
            votesCount
            thumbnail { url }
            topics { edges { node { name } } }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.PRODUCT_HUNT_TOKEN}`
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    console.error('Product Hunt API failed');
    return;
  }

  const data = await response.json();
  const posts = data?.data?.posts?.edges || [];

  const records = posts.map(({ node: post }) => ({
    name: post.name,
    slug: generateSlug(post.name),
    tagline: post.tagline,
    description: post.description || post.tagline,
    website_url: post.url,
    image: post.thumbnail?.url,
    votes: post.votesCount,
    category: 'AI',
    updated_at: new Date().toISOString()
  }));

  if (records.length > 0) {
    await saveToSupabase(env, 'ai_tools', records);
  }

  console.log(`✅ AI Tools: ${records.length} tools saved`);
}

// =====================
// CRON TRIGGER HANDLER
// =====================
export default {
  async scheduled(event, env, ctx) {
    const cron = event.cron;
    console.log(`🕐 Cron triggered: ${cron}`);

    try {
      // Every 6 hours: "0 */6 * * *"
      if (cron === '0 */6 * * *') {
        await fetchCryptoData(env);
        await fetchTechNews(env);
        await fetchStartupNews(env);
        await triggerPagesDeploy(env);
      }

      // Every 12 hours: "0 */12 * * *"
      if (cron === '0 */12 * * *') {
        await fetchTechJobs(env);
        await triggerPagesDeploy(env);
      }

      // Once per day at midnight: "0 0 * * *"
      if (cron === '0 0 * * *') {
        await fetchGitHubTrending(env);
        await fetchAITools(env);
        await triggerPagesDeploy(env);
      }

    } catch (error) {
      console.error('❌ Worker error:', error.message);
    }
  },

  // HTTP handler for manual trigger (testing)
  async fetch(request, env) {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    const secret = url.searchParams.get('secret');

    // Simple auth check
    if (secret !== env.WORKER_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      if (action === 'crypto') await fetchCryptoData(env);
      else if (action === 'github') await fetchGitHubTrending(env);
      else if (action === 'news') await fetchTechNews(env);
      else if (action === 'startup') await fetchStartupNews(env);
      else if (action === 'jobs') await fetchTechJobs(env);
      else if (action === 'aitools') await fetchAITools(env);
      else if (action === 'all') {
        await fetchCryptoData(env);
        await fetchGitHubTrending(env);
        await fetchTechNews(env);
        await fetchStartupNews(env);
        await fetchTechJobs(env);
        await fetchAITools(env);
      }

      return new Response(JSON.stringify({ success: true, action }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
