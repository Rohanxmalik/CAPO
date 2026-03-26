CREATE TABLE memory_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    layer VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}',
    access_control JSONB NOT NULL DEFAULT '{"owner": true}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

CREATE INDEX idx_memory_agent ON memory_entries(agent_id);
CREATE INDEX idx_memory_layer ON memory_entries(layer);
CREATE INDEX idx_memory_embedding ON memory_entries USING hnsw (embedding vector_cosine_ops);
