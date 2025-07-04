import React, { useState } from 'react';
import EventTypeSelector from './components/EventTypeSelector';
import AgentLibrary from './components/AgentLibrary';
import EventBuilder from './components/EventBuilder';
import SimulationView from './components/SimulationView';
import { Agent, EventType, Event } from './types';

function App() {
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleEventTypeSelect = (eventType: EventType) => {
    setSelectedEventType(eventType);
    setCurrentEvent({
      id: Date.now().toString(),
      type: eventType,
      agents: [],
      status: 'building',
      createdAt: new Date()
    });
  };

  const handleAddAgent = (agent: Agent) => {
    if (currentEvent) {
      setCurrentEvent({
        ...currentEvent,
        agents: [...currentEvent.agents, { ...agent, id: Date.now().toString() }]
      });
    }
  };

  const handleRemoveAgent = (agentId: string) => {
    if (currentEvent) {
      setCurrentEvent({
        ...currentEvent,
        agents: currentEvent.agents.filter(agent => agent.id !== agentId)
      });
    }
  };

  const handleUpdateAgent = (agentId: string, updates: Partial<Agent>) => {
    if (currentEvent) {
      setCurrentEvent({
        ...currentEvent,
        agents: currentEvent.agents.map(agent => 
          agent.id === agentId ? { ...agent, ...updates } : agent
        )
      });
    }
  };

  const handleStartSimulation = () => {
    if (currentEvent) {
      setCurrentEvent({ ...currentEvent, status: 'running' });
      setIsSimulating(true);
    }
  };

  const handleResetEvent = () => {
    setSelectedEventType(null);
    setCurrentEvent(null);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-semibold text-lg sm:text-xl">AE</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Agent Event Creator</h1>
                <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">Design multi-agent interactions and simulations</p>
              </div>
            </div>
            {currentEvent && (
              <button
                onClick={handleResetEvent}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white/70 hover:bg-white/90 backdrop-blur-md text-gray-700 rounded-xl transition-all duration-200 border border-gray-200/50 shadow-sm hover:shadow-md transform hover:scale-[1.02] text-sm sm:text-base"
              >
                New Event
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        {!selectedEventType ? (
          <EventTypeSelector onSelect={handleEventTypeSelect} />
        ) : isSimulating ? (
          <SimulationView 
            event={currentEvent!} 
            onBack={() => setIsSimulating(false)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="lg:col-span-1">
              <AgentLibrary onAddAgent={handleAddAgent} />
            </div>
            <div className="lg:col-span-3">
              <EventBuilder
                event={currentEvent!}
                onRemoveAgent={handleRemoveAgent}
                onUpdateAgent={handleUpdateAgent}
                onStartSimulation={handleStartSimulation}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;