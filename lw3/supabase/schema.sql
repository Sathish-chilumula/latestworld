-- LatestWorld.in — Full Database Schema
-- Run this entire file in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS crypto_coins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coin_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price NUMERIC(20,8),
  market_cap NUMERIC(30,2),
  change_24h NUMERIC(10,4),
  change_7d NUMERIC(10,4),
  volume_24h NUMERIC(30,2),
  image TEXT,
  market_cap_rank INTEGER,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tech_news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  content TEXT,
  source TEXT,
  source_url TEXT,
  image TEXT,
  category TEXT DEFAULT 'technology',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS ai_tools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  category TEXT DEFAULT 'AI',
  website TEXT,
  pricing TEXT DEFAULT 'Free',
  image TEXT,
  votes INTEGER DEFAULT 0,
  launch_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS github_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  repo_name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner TEXT,
  description TEXT,
  stars INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  language TEXT,
  repo_url TEXT,
  avatar_url TEXT,
  topics TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company TEXT,
  location TEXT,
  salary TEXT,
  salary_min NUMERIC,
  salary_max NUMERIC,
  description TEXT,
  apply_url TEXT,
  job_type TEXT DEFAULT 'full_time',
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_crypto_slug ON crypto_coins(slug);
CREATE INDEX IF NOT EXISTS idx_crypto_rank ON crypto_coins(market_cap_rank);
CREATE INDEX IF NOT EXISTS idx_news_slug ON tech_news(slug);
CREATE INDEX IF NOT EXISTS idx_news_pub ON tech_news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_startup_slug ON startup_news(slug);
CREATE INDEX IF NOT EXISTS idx_startup_pub ON startup_news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_aitools_slug ON ai_tools(slug);
CREATE INDEX IF NOT EXISTS idx_github_slug ON github_projects(slug);
CREATE INDEX IF NOT EXISTS idx_github_stars ON github_projects(stars DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_created ON jobs(created_at DESC);

-- Row Level Security
ALTER TABLE crypto_coins ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read crypto_coins" ON crypto_coins FOR SELECT USING (true);
CREATE POLICY "Public read tech_news" ON tech_news FOR SELECT USING (true);
CREATE POLICY "Public read startup_news" ON startup_news FOR SELECT USING (true);
CREATE POLICY "Public read ai_tools" ON ai_tools FOR SELECT USING (true);
CREATE POLICY "Public read github_projects" ON github_projects FOR SELECT USING (true);
CREATE POLICY "Public read jobs" ON jobs FOR SELECT USING (true);

CREATE POLICY "Service write crypto_coins" ON crypto_coins FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write tech_news" ON tech_news FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write startup_news" ON startup_news FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write ai_tools" ON ai_tools FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write github_projects" ON github_projects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write jobs" ON jobs FOR ALL USING (auth.role() = 'service_role');
