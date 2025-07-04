import React, { useState } from 'react';
import { X, Settings } from 'lucide-react';
import { Agent } from '../types';

interface AgentConfigModalProps {
  agent: Agent;
  onClose: () => void;
  onUpdate: (updates: Partial<Agent>) => void;
}

const communicationStyles = [
  { value: 'short-blunt', label: 'Short & Blunt' },
  { value: 'verbose-diplomatic', label: 'Verbose & Diplomatic' },
  { value: 'analytical-precise', label: 'Analytical & Precise' },
  { value: 'creative-expressive', label: 'Creative & Expressive' }
];

const memoryOptions = [
  { value: 'forgets-each-round', label: 'Forgets Each Round' },
  { value: 'remembers-5-arguments', label: 'Remembers 5 Arguments' },
  { value: 'remembers-all', label: 'Perfect Memory' },
  { value: 'custom', label: 'Custom Memory' }
];

export default function AgentConfigModal({ agent, onClose, onUpdate }: AgentConfigModalProps) {
  const [formData, setFormData] = useState({
    name: agent.name,
    perspective: agent.perspective,
    communicationStyle: agent.communicationStyle,
    guardrails: agent.guardrails,
    memory: agent.memory
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/90 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200/50">
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center text-sm shadow-sm`}>
              {agent.avatar}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Configure Agent</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100/70 hover:bg-gray-200/70 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 border border-gray-200/50"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Perspective</label>
            <textarea
              value={formData.perspective}
              onChange={(e) => setFormData({ ...formData, perspective: e.target.value })}
              rows={3}
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Communication Style</label>
            <select
              value={formData.communicationStyle}
              onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value as Agent['communicationStyle'] })}
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            >
              {communicationStyles.map((style) => (
                <option key={style.value} value={style.value} className="bg-white text-gray-900">
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Memory Type</label>
            <select
              value={formData.memory}
              onChange={(e) => setFormData({ ...formData, memory: e.target.value as Agent['memory'] })}
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            >
              {memoryOptions.map((memory) => (
                <option key={memory.value} value={memory.value} className="bg-white text-gray-900">
                  {memory.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Guardrails</label>
            <textarea
              value={formData.guardrails}
              onChange={(e) => setFormData({ ...formData, guardrails: e.target.value })}
              rows={3}
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-200/50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100/70 hover:bg-gray-200/70 backdrop-blur-sm rounded-xl text-gray-700 font-medium transition-all duration-200 border border-gray-200/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium transition-all duration-200 shadow-sm transform hover:scale-[1.02]"
            >
              Update Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}