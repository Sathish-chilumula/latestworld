-- LatestWorld.in Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- AI TOOLS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS ai_tools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT,
  website_url TEXT,
  image TEXT,
  tagline TEXT,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- GITHUB PROJECTS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS github_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  repo_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  stars INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  language TEXT,
  repo_url TEXT,
  owner TEXT,
  avatar_url TEXT,
  topics TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- CRYPTO TABLE
-- =====================
CREATE TABLE IF NOT EXISTS crypto (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coin_id TEXT UNIQUE NOT NULL,
  coin_name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price NUMERIC(20, 8),
  market_cap NUMERIC(30, 2),
  change_24h NUMERIC(10, 4),
  change_7d NUMERIC(10, 4),
  volume_24h NUMERIC(30, 2),
  image TEXT,
  market_cap_rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- TECH NEWS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS tech_news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  content TEXT,
  source TEXT,
  source_url TEXT,
  image TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  category TEXT DEFAULT 'tech',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- TECH JOBS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS tech_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company TEXT,
  location TEXT,
  job_type TEXT,
  salary_min NUMERIC,
  salary_max NUMERIC,
  currency TEXT DEFAULT 'INR',
  description TEXT,
  apply_url TEXT,
  logo_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- STARTUP NEWS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS startup_news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  source TEXT,
  source_url TEXT,
  image TEXT,
  funding_amount TEXT,
  company_name TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- INDEXES FOR PERFORMANCE
-- =====================
CREATE INDEX IF NOT EXISTS idx_ai_tools_slug ON ai_tools(slug);
CREATE INDEX IF NOT EXISTS idx_ai_tools_category ON ai_tools(category);
CREATE INDEX IF NOT EXISTS idx_github_projects_slug ON github_projects(slug);
CREATE INDEX IF NOT EXISTS idx_github_projects_stars ON github_projects(stars DESC);
CREATE INDEX IF NOT EXISTS idx_crypto_slug ON crypto(slug);
CREATE INDEX IF NOT EXISTS idx_crypto_rank ON crypto(market_cap_rank);
CREATE INDEX IF NOT EXISTS idx_tech_news_slug ON tech_news(slug);
CREATE INDEX IF NOT EXISTS idx_tech_news_published ON tech_news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_tech_jobs_slug ON tech_jobs(slug);
CREATE INDEX IF NOT EXISTS idx_startup_news_slug ON startup_news(slug);
CREATE INDEX IF NOT EXISTS idx_startup_news_published ON startup_news(published_at DESC);

-- =====================
-- ROW LEVEL SECURITY (Public Read)
-- =====================
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE crypto ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_news ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read ai_tools" ON ai_tools FOR SELECT USING (true);
CREATE POLICY "Public read github_projects" ON github_projects FOR SELECT USING (true);
CREATE POLICY "Public read crypto" ON crypto FOR SELECT USING (true);
CREATE POLICY "Public read tech_news" ON tech_news FOR SELECT USING (true);
CREATE POLICY "Public read tech_jobs" ON tech_jobs FOR SELECT USING (true);
CREATE POLICY "Public read startup_news" ON startup_news FOR SELECT USING (true);

-- Service role can write (used by Cloudflare Worker)
CREATE POLICY "Service write ai_tools" ON ai_tools FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write github_projects" ON github_projects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write crypto" ON crypto FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write tech_news" ON tech_news FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write tech_jobs" ON tech_jobs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write startup_news" ON startup_news FOR ALL USING (auth.role() = 'service_role');
