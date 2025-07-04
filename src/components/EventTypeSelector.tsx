import React from 'react';
import { Users, Gavel, Code, Trophy } from 'lucide-react';
import { EventType } from '../types';

interface EventTypeSelectorProps {
  onSelect: (eventType: EventType) => void;
}

const eventTypes: EventType[] = [
  {
    id: 'debate',
    name: 'Debate',
    description: 'Structured argumentative discussion with opening statements, rebuttals, and scoring',
    minAgents: 2,
    maxAgents: 6,
    icon: 'Users',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'hackathon',
    name: 'Hackathon',
    description: 'Collaborative problem-solving event where agents work together on solutions',
    minAgents: 3,
    maxAgents: 8,
    icon: 'Code',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'judge-panel',
    name: 'Judge Panel',
    description: 'Evaluation session where agents assess and provide feedback on proposals',
    minAgents: 3,
    maxAgents: 5,
    icon: 'Gavel',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'team-showdown',
    name: 'Team Showdown',
    description: 'Competitive event where agent teams compete against each other',
    minAgents: 4,
    maxAgents: 10,
    icon: 'Trophy',
    color: 'from-amber-500 to-orange-500'
  }
];

const iconMap = {
  Users,
  Code,
  Gavel,
  Trophy
};

export default function EventTypeSelector({ onSelect }: EventTypeSelectorProps) {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center">
        <h2 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4">Choose Your Event Type</h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Select the type of multi-agent interaction you want to create. Each event type has unique dynamics and objectives.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {eventTypes.map((eventType) => {
          const IconComponent = iconMap[eventType.icon as keyof typeof iconMap];
          
          return (
            <div
              key={eventType.id}
              onClick={() => onSelect(eventType)}
              className="group cursor-pointer backdrop-blur-xl bg-white/70 hover:bg-white/80 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 sm:p-8 border border-gray-200/50 hover:border-gray-300/50 transform hover:scale-[1.02]"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${eventType.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{eventType.name}</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">{eventType.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100/70 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200/50">
                  {eventType.minAgents}-{eventType.maxAgents} agents
                </span>
                <span className="text-gray-700 font-medium group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base">
                  Select →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}