export type GateType = 'spawn' | 'budget' | 'action' | 'strategy' | 'escalation';
export type GateResult = 'approved' | 'denied' | 'pending' | 'auto_approved' | 'no_gate';

export interface AuditEntry {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  action: string;
  toolUsed?: string;
  modelUsed?: string;
  tokensUsed?: number;
  costUsd?: number;
  gateType?: GateType;
  gateResult: GateResult;
  approvedBy?: string;
  details?: string;
}
