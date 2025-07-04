import React from 'react';
import { Plus, Settings, Trash2 } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Omit<Agent, 'id'> | Agent;
  onAdd?: () => void;
  onRemove?: () => void;
  onConfigure?: () => void;
  isLibraryCard?: boolean;
  isDragging?: boolean;
}

const communicationStyleLabels = {
  'short-blunt': 'Short & Blunt',
  'verbose-diplomatic': 'Verbose & Diplomatic',
  'analytical-precise': 'Analytical & Precise',
  'creative-expressive': 'Creative & Expressive'
};

const memoryLabels = {
  'forgets-each-round': 'Forgets Each Round',
  'remembers-5-arguments': 'Remembers 5 Args',
  'remembers-all': 'Perfect Memory',
  'custom': 'Custom Memory'
};

export default function AgentCard({
  agent,
  onAdd,
  onRemove,
  onConfigure,
  isLibraryCard = false,
  isDragging = false
}: AgentCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    if (isLibraryCard) {
      e.dataTransfer.setData('application/json', JSON.stringify(agent));
      e.dataTransfer.effectAllowed = 'copy';
    }
  };

  return (
    <div
      draggable={isLibraryCard}
      onDragStart={handleDragStart}
      className={`
        relative group rounded-2xl border p-4 transition-all duration-200 backdrop-blur-sm
        ${isDragging 
          ? 'shadow-lg scale-105 border-gray-300/70 bg-white/80' 
          : 'shadow-sm border-gray-200/50 bg-white/60 hover:shadow-md hover:border-gray-300/60 hover:bg-white/70'
        }
        ${isLibraryCard ? 'cursor-grab active:cursor-grabbing' : ''}
        transform hover:scale-[1.02]
      `}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
          {agent.avatar}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 font-medium truncate">{agent.name}</h4>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{agent.perspective}</p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Style:</span>
              <span className="text-xs bg-gray-100/70 backdrop-blur-sm px-2 py-1 rounded-full text-gray-700 border border-gray-200/50">
                {communicationStyleLabels[agent.communicationStyle]}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Memory:</span>
              <span className="text-xs bg-gray-100/70 backdrop-blur-sm px-2 py-1 rounded-full text-gray-700 border border-gray-200/50">
                {memoryLabels[agent.memory]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex space-x-2">
          {isLibraryCard && onAdd && (
            <button
              onClick={onAdd}
              className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm transform hover:scale-110"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          )}
          
          {!isLibraryCard && onConfigure && (
            <button
              onClick={onConfigure}
              className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm transform hover:scale-110"
            >
              <Settings className="w-4 h-4 text-white" />
            </button>
          )}
          
          {!isLibraryCard && onRemove && (
            <button
              onClick={onRemove}
              className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm transform hover:scale-110"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}