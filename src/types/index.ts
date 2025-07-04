export interface Agent {
  id: string;
  name: string;
  perspective: string;
  communicationStyle: 'short-blunt' | 'verbose-diplomatic' | 'analytical-precise' | 'creative-expressive';
  guardrails: string;
  memory: 'forgets-each-round' | 'remembers-5-arguments' | 'remembers-all' | 'custom';
  avatar: string;
  color: string;
}

export interface EventType {
  id: string;
  name: string;
  description: string;
  minAgents: number;
  maxAgents: number;
  icon: string;
  color: string;
}

export interface Event {
  id: string;
  type: EventType;
  agents: Agent[];
  status: 'building' | 'running' | 'completed';
  createdAt: Date;
  rounds?: number;
  currentRound?: number;
}

export interface SimulationStep {
  agentId: string;
  message: string;
  timestamp: Date;
  round: number;
  phase?: string;
}