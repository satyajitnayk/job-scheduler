CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('queued', 'in_progress', 'completed', 'failed')),
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
