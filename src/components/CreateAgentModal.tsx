import React, { useState } from 'react';
import { X, Bot } from 'lucide-react';
import { Agent } from '../types';

interface CreateAgentModalProps {
  onClose: () => void;
  onCreate: (agent: Agent) => void;
}

const communicationStyles = [
  { value: 'short-blunt', label: 'Short & Blunt', description: 'Direct and concise responses' },
  { value: 'verbose-diplomatic', label: 'Verbose & Diplomatic', description: 'Detailed and tactful communication' },
  { value: 'analytical-precise', label: 'Analytical & Precise', description: 'Data-driven and methodical' },
  { value: 'creative-expressive', label: 'Creative & Expressive', description: 'Innovative and imaginative' }
];

const memoryOptions = [
  { value: 'forgets-each-round', label: 'Forgets Each Round', description: 'Fresh start every interaction' },
  { value: 'remembers-5-arguments', label: 'Remembers 5 Arguments', description: 'Short-term contextual memory' },
  { value: 'remembers-all', label: 'Perfect Memory', description: 'Recalls entire conversation history' },
  { value: 'custom', label: 'Custom Memory', description: 'Define specific memory rules' }
];

const avatarOptions = ['🤖', '🧠', '👨‍💼', '👩‍🔬', '🎭', '⚡', '🔮', '🎯', '🌟', '🔥'];
const colorOptions = [
  'from-blue-500 to-blue-600',
  'from-emerald-500 to-emerald-600',
  'from-purple-500 to-purple-600',
  'from-red-500 to-red-600',
  'from-amber-500 to-orange-500',
  'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600',
  'from-teal-500 to-teal-600'
];

export default function CreateAgentModal({ onClose, onCreate }: CreateAgentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    perspective: '',
    communicationStyle: 'analytical-precise' as Agent['communicationStyle'],
    guardrails: '',
    memory: 'remembers-5-arguments' as Agent['memory'],
    avatar: '🤖',
    color: 'from-blue-500 to-blue-600'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.perspective.trim()) {
      return;
    }

    const newAgent: Agent = {
      id: Date.now().toString(),
      ...formData
    };

    onCreate(newAgent);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/90 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200/50">
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <Bot className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Create Custom Agent</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100/70 hover:bg-gray-200/70 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 border border-gray-200/50"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Agent Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Tech Innovation Expert"
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              required
            />
          </div>

          {/* Avatar & Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Avatar</label>
              <div className="grid grid-cols-5 gap-2">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar })}
                    className={`
                      w-10 h-10 rounded-xl text-lg transition-all duration-200 border-2 backdrop-blur-sm
                      ${formData.avatar === avatar
                        ? 'bg-blue-100/70 border-blue-300/60'
                        : 'bg-gray-100/70 border-gray-200/50 hover:bg-gray-200/70'
                      }
                    `}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Color Theme</label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`
                      w-10 h-10 bg-gradient-to-br ${color} rounded-xl transition-all duration-200 border-2 shadow-sm
                      ${formData.color === color
                        ? 'border-gray-400/80 scale-110'
                        : 'border-gray-200/50 hover:scale-105'
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Perspective */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Perspective/Bias *</label>
            <textarea
              value={formData.perspective}
              onChange={(e) => setFormData({ ...formData, perspective: e.target.value })}
              placeholder="Describe this agent's worldview, biases, and fundamental beliefs..."
              rows={3}
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Communication Style */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Communication Style</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {communicationStyles.map((style) => (
                <label
                  key={style.value}
                  className={`
                    p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 backdrop-blur-sm
                    ${formData.communicationStyle === style.value
                      ? 'border-blue-300/60 bg-blue-100/70'
                      : 'border-gray-200/50 bg-gray-100/50 hover:bg-gray-200/50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={style.value}
                    checked={formData.communicationStyle === style.value}
                    onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value as Agent['communicationStyle'] })}
                    className="sr-only"
                  />
                  <div className="text-gray-900 font-medium">{style.label}</div>
                  <div className="text-sm text-gray-600">{style.description}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Memory */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Memory Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {memoryOptions.map((memory) => (
                <label
                  key={memory.value}
                  className={`
                    p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 backdrop-blur-sm
                    ${formData.memory === memory.value
                      ? 'border-blue-300/60 bg-blue-100/70'
                      : 'border-gray-200/50 bg-gray-100/50 hover:bg-gray-200/50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={memory.value}
                    checked={formData.memory === memory.value}
                    onChange={(e) => setFormData({ ...formData, memory: e.target.value as Agent['memory'] })}
                    className="sr-only"
                  />
                  <div className="text-gray-900 font-medium">{memory.label}</div>
                  <div className="text-sm text-gray-600">{memory.description}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Guardrails */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Guardrails & Constraints</label>
            <textarea
              value={formData.guardrails}
              onChange={(e) => setFormData({ ...formData, guardrails: e.target.value })}
              placeholder="Define behavioral constraints, ethical boundaries, or specific rules this agent must follow..."
              rows={3}
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
            />
          </div>

          {/* Preview */}
          <div className="bg-gray-100/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
            <h4 className="text-gray-900 font-medium mb-3">Preview</h4>
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${formData.color} rounded-xl flex items-center justify-center text-xl shadow-sm`}>
                {formData.avatar}
              </div>
              <div>
                <div className="text-gray-900 font-medium">{formData.name || 'Agent Name'}</div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {formData.perspective || 'Agent perspective will appear here...'}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
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
              disabled={!formData.name.trim() || !formData.perspective.trim()}
              className={`
                flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm transform hover:scale-[1.02]
                ${formData.name.trim() && formData.perspective.trim()
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-200/70 cursor-not-allowed text-gray-500 border border-gray-300/50'
                }
              `}
            >
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}