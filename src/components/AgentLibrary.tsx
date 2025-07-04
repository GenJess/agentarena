import React, { useState } from 'react';
import { Plus, Bot, Sparkles } from 'lucide-react';
import { Agent } from '../types';
import AgentCard from './AgentCard';
import CreateAgentModal from './CreateAgentModal';

interface AgentLibraryProps {
  onAddAgent: (agent: Agent) => void;
}

const presetAgents: Omit<Agent, 'id'>[] = [
  {
    name: 'Libertarian Economist',
    perspective: 'Free market advocate who believes in minimal government intervention',
    communicationStyle: 'analytical-precise',
    guardrails: 'Must support arguments with economic data',
    memory: 'remembers-5-arguments',
    avatar: '🏛️',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'EU Bureaucrat',
    perspective: 'Regulation-first approach prioritizing consumer protection and oversight',
    communicationStyle: 'verbose-diplomatic',
    guardrails: 'Must reference EU directives and precedents',
    memory: 'remembers-all',
    avatar: '🇪🇺',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    name: 'Tech Optimist',
    perspective: 'Believes technology will solve most human problems',
    communicationStyle: 'creative-expressive',
    guardrails: 'Cannot dismiss ethical concerns without addressing them',
    memory: 'remembers-5-arguments',
    avatar: '🚀',
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Skeptical Critic',
    perspective: 'Questions assumptions and looks for flaws in reasoning',
    communicationStyle: 'short-blunt',
    guardrails: 'Must provide constructive alternatives when criticizing',
    memory: 'remembers-all',
    avatar: '🔍',
    color: 'from-red-500 to-red-600'
  },
  {
    name: 'Pragmatic Mediator',
    perspective: 'Seeks practical compromise solutions between opposing views',
    communicationStyle: 'verbose-diplomatic',
    guardrails: 'Must acknowledge valid points from all sides',
    memory: 'remembers-5-arguments',
    avatar: '⚖️',
    color: 'from-teal-500 to-teal-600'
  },
  {
    name: 'Innovation Catalyst',
    perspective: 'Pushes for breakthrough thinking and disruptive solutions',
    communicationStyle: 'creative-expressive',
    guardrails: 'Ideas must be grounded in some feasibility',
    memory: 'forgets-each-round',
    avatar: '💡',
    color: 'from-amber-500 to-orange-500'
  }
];

export default function AgentLibrary({ onAddAgent }: AgentLibraryProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleAddPresetAgent = (presetAgent: Omit<Agent, 'id'>) => {
    onAddAgent({
      ...presetAgent,
      id: Date.now().toString()
    });
  };

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200/50 p-4 sm:p-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Agent Library</h3>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full mb-4 sm:mb-6 p-4 sm:p-6 border-2 border-dashed border-gray-300/60 rounded-xl sm:rounded-2xl hover:border-gray-400/60 hover:bg-gray-50/50 transition-all duration-200 group backdrop-blur-sm"
        >
          <div className="flex flex-col items-center space-y-2 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-gray-700 font-medium text-sm sm:text-base">Create Custom Agent</span>
          </div>
        </button>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <Sparkles className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Preset Agents</span>
          </div>
          
          {presetAgents.map((agent, index) => (
            <AgentCard
              key={index}
              agent={agent}
              onAdd={() => handleAddPresetAgent(agent)}
              isLibraryCard
            />
          ))}
        </div>
      </div>

      {showCreateModal && (
        <CreateAgentModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(agent) => {
            onAddAgent(agent);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}