CREATE TABLE budget_entries (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    tokens_used INTEGER NOT NULL,
    cost_usd DECIMAL(10,6) NOT NULL,
    model_used VARCHAR(100),
    cascade_level VARCHAR(20),
    alert_triggered VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_budget_workspace ON budget_entries(workspace_id);
CREATE INDEX idx_budget_agent ON budget_entries(agent_id);
CREATE INDEX idx_budget_created ON budget_entries(created_at DESC);
