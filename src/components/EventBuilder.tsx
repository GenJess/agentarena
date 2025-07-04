import React, { useState } from 'react';
import { Play, Users, AlertCircle } from 'lucide-react';
import { Agent, Event } from '../types';
import AgentCard from './AgentCard';
import AgentConfigModal from './AgentConfigModal';

interface EventBuilderProps {
  event: Event;
  onRemoveAgent: (agentId: string) => void;
  onUpdateAgent: (agentId: string, updates: Partial<Agent>) => void;
  onStartSimulation: () => void;
}

export default function EventBuilder({
  event,
  onRemoveAgent,
  onUpdateAgent,
  onStartSimulation
}: EventBuilderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [configuringAgent, setConfiguringAgent] = useState<Agent | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    try {
      const agentData = JSON.parse(e.dataTransfer.getData('application/json'));
      const newAgent: Agent = {
        ...agentData,
        id: Date.now().toString()
      };
      onUpdateAgent(newAgent.id, newAgent);
    } catch (error) {
      console.error('Failed to parse dropped agent data:', error);
    }
  };

  const canStartSimulation = event.agents.length >= event.type.minAgents;
  const tooManyAgents = event.agents.length > event.type.maxAgents;

  return (
    <div className="space-y-6">
      {/* Event Header */}
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200/50 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${event.type.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{event.type.name}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{event.type.description}</p>
            </div>
          </div>
          
          <button
            onClick={onStartSimulation}
            disabled={!canStartSimulation || tooManyAgents}
            className={`
              px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 flex items-center space-x-2 sm:space-x-3 shadow-sm backdrop-blur-sm transform hover:scale-[1.02] flex-shrink-0
              ${canStartSimulation && !tooManyAgents
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-md'
                : 'bg-gray-200/70 cursor-not-allowed text-gray-500 border border-gray-300/50'
              }
            `}
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Start {event.type.name}</span>
            <span className="sm:hidden">Start</span>
          </button>
        </div>

        {/* Agent Count Status */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {event.agents.length} / {event.type.minAgents}-{event.type.maxAgents} agents
            </span>
          </div>
          
          {event.agents.length < event.type.minAgents && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-amber-100/70 backdrop-blur-sm rounded-full border border-amber-200/60">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-amber-700">Need {event.type.minAgents - event.agents.length} more agent(s)</span>
            </div>
          )}
          
          {tooManyAgents && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-100/70 backdrop-blur-sm rounded-full border border-red-200/60">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-red-700">Too many agents! Remove {event.agents.length - event.type.maxAgents}</span>
            </div>
          )}
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          min-h-96 rounded-2xl sm:rounded-3xl border-2 border-dashed transition-all duration-200 p-6 sm:p-8 backdrop-blur-sm
          ${dragOver
            ? 'border-gray-400/70 bg-gray-50/50 shadow-sm'
            : event.agents.length === 0
            ? 'border-gray-300/60 bg-gray-50/30'
            : 'border-gray-200/50 bg-white/40 shadow-sm'
          }
        `}
      >
        {event.agents.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100/70 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 border border-gray-200/50 shadow-sm">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 sm:mb-3">Add Agents to Your Event</h3>
            <p className="text-gray-600 max-w-md text-sm sm:text-base">
              Drag and drop agents from the library or create custom agents to participate in your {event.type.name.toLowerCase()}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onRemove={() => onRemoveAgent(agent.id)}
                onConfigure={() => setConfiguringAgent(agent)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Agent Configuration Modal */}
      {configuringAgent && (
        <AgentConfigModal
          agent={configuringAgent}
          onClose={() => setConfiguringAgent(null)}
          onUpdate={(updates) => {
            onUpdateAgent(configuringAgent.id, updates);
            setConfiguringAgent(null);
          }}
        />
      )}
    </div>
  );
}