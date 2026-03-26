CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
    agent_name VARCHAR(255),
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    tool_used VARCHAR(100),
    model_used VARCHAR(100),
    tokens_used INTEGER,
    cost_usd DECIMAL(10,6),
    gate_type VARCHAR(20),
    gate_result VARCHAR(20) NOT NULL DEFAULT 'no_gate',
    approved_by VARCHAR(255),
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_workspace ON audit_log(workspace_id);
CREATE INDEX idx_audit_agent ON audit_log(agent_id);
CREATE INDEX idx_audit_created ON audit_log(created_at DESC);
