import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, MessageCircle, BarChart3, Trophy, Clock, Target } from 'lucide-react';
import { Event, Agent, SimulationStep } from '../types';

interface SimulationViewProps {
  event: Event;
  onBack: () => void;
}

interface DebatePhase {
  name: string;
  description: string;
  timeLimit: number;
  icon: React.ComponentType<any>;
}

const debatePhases: DebatePhase[] = [
  { name: 'Opening Statements', description: 'Each agent presents their initial position', timeLimit: 60, icon: Target },
  { name: 'First Rebuttals', description: 'Agents respond to opposing arguments', timeLimit: 45, icon: MessageCircle },
  { name: 'Cross-Examination', description: 'Direct questioning between agents', timeLimit: 30, icon: BarChart3 },
  { name: 'Final Arguments', description: 'Closing statements and summary', timeLimit: 60, icon: Trophy }
];

const colorMap = {
  'from-blue-500 to-blue-600': 'from-blue-500 to-blue-600',
  'from-emerald-500 to-emerald-600': 'from-emerald-500 to-emerald-600',
  'from-purple-500 to-purple-600': 'from-purple-500 to-purple-600',
  'from-red-500 to-red-600': 'from-red-500 to-red-600',
  'from-teal-500 to-teal-600': 'from-teal-500 to-teal-600',
  'from-amber-500 to-orange-500': 'from-amber-500 to-orange-500',
  'from-yellow-500 to-yellow-600': 'from-yellow-500 to-yellow-600',
  'from-pink-500 to-pink-600': 'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600': 'from-indigo-500 to-indigo-600'
};

// Enhanced debate-specific messages
const debateMessages = {
  'Opening Statements': [
    "I stand firmly behind the position that economic freedom drives innovation and prosperity.",
    "Let me establish the fundamental framework for why regulation is essential in today's markets.",
    "The evidence overwhelmingly supports a technology-first approach to solving these challenges.",
    "We must begin by questioning the basic assumptions underlying this entire debate."
  ],
  'First Rebuttals': [
    "While my colleague raises valid points, they fail to account for the unintended consequences of their approach.",
    "That argument might sound compelling, but the data tells a different story entirely.",
    "I appreciate the perspective shared, but we're missing the bigger picture here.",
    "Let me challenge that assumption with some concrete examples from recent case studies."
  ],
  'Cross-Examination': [
    "Can you explain how your proposal addresses the concerns raised by consumer advocacy groups?",
    "What evidence do you have that this approach has worked in similar markets?",
    "How do you reconcile your position with the ethical implications we've discussed?",
    "Isn't your argument essentially ignoring the fundamental economic principles at play?"
  ],
  'Final Arguments': [
    "In conclusion, the path forward is clear: we must prioritize long-term stability over short-term gains.",
    "To summarize, every piece of evidence presented today supports a measured, regulation-based approach.",
    "The future depends on our willingness to embrace innovation while maintaining ethical standards.",
    "Let me leave you with this: the choice before us will define the next decade of progress."
  ]
};

export default function SimulationView({ event, onBack }: SimulationViewProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[]>([]);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [agentScores, setAgentScores] = useState<{[key: string]: number}>({});

  // Initialize agent scores
  useEffect(() => {
    const initialScores: {[key: string]: number} = {};
    event.agents.forEach(agent => {
      initialScores[agent.id] = Math.floor(Math.random() * 20) + 70; // Start between 70-90
    });
    setAgentScores(initialScores);
  }, [event.agents]);

  // Debate simulation logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const randomAgent = event.agents[Math.floor(Math.random() * event.agents.length)];
      const currentPhaseName = debatePhases[currentPhase]?.name || 'Opening Statements';
      const phaseMessages = debateMessages[currentPhaseName as keyof typeof debateMessages] || debateMessages['Opening Statements'];
      const message = phaseMessages[Math.floor(Math.random() * phaseMessages.length)];

      const newStep: SimulationStep = {
        agentId: randomAgent.id,
        message: message,
        timestamp: new Date(),
        round: currentPhase + 1,
        phase: currentPhaseName
      };

      setSimulationSteps(prev => [...prev, newStep]);
      setActiveAgent(randomAgent);

      // Update scores based on performance
      setAgentScores(prev => ({
        ...prev,
        [randomAgent.id]: Math.min(100, prev[randomAgent.id] + Math.floor(Math.random() * 6) - 2)
      }));

      // Advance phase timer
      setPhaseTimer(prev => prev + 1);

      // Move to next phase after certain number of exchanges
      if (phaseTimer > 0 && phaseTimer % 8 === 0 && currentPhase < debatePhases.length - 1) {
        setCurrentPhase(prev => prev + 1);
        setPhaseTimer(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning, event.agents, currentPhase, phaseTimer]);

  const getAgentById = (id: string) => event.agents.find(agent => agent.id === id);

  const getAgentStats = () => {
    const stats = event.agents.map(agent => ({
      agent,
      messageCount: simulationSteps.filter(step => step.agentId === agent.id).length,
      score: agentScores[agent.id] || 0
    }));
    return stats.sort((a, b) => b.score - a.score);
  };

  const currentDebatePhase = debatePhases[currentPhase] || debatePhases[0];
  const PhaseIcon = currentDebatePhase.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200/50 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onBack}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100/70 hover:bg-gray-200/70 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 border border-gray-200/50 transform hover:scale-[1.02]"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{event.type.name} Arena</h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 space-y-1 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <PhaseIcon className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-700">{currentDebatePhase.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-700">{simulationSteps.length} exchanges</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setSimulationSteps([]);
                setCurrentPhase(0);
                setPhaseTimer(0);
                setActiveAgent(null);
                const resetScores: {[key: string]: number} = {};
                event.agents.forEach(agent => {
                  resetScores[agent.id] = Math.floor(Math.random() * 20) + 70;
                });
                setAgentScores(resetScores);
              }}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100/70 hover:bg-gray-200/70 backdrop-blur-sm rounded-xl text-gray-700 transition-all duration-200 flex items-center space-x-2 border border-gray-200/50 transform hover:scale-[1.02]"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`
                px-6 sm:px-8 py-2 sm:py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm backdrop-blur-sm transform hover:scale-[1.02]
                ${isRunning 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-emerald-500 hover:bg-emerald-600'
                } text-white
              `}
            >
              {isRunning ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              <span className="hidden sm:inline">{isRunning ? 'Pause Debate' : 'Start Debate'}</span>
            </button>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {debatePhases.map((phase, index) => {
            const PhaseIcon = phase.icon;
            return (
              <div
                key={index}
                className={`
                  p-2 sm:p-3 rounded-xl sm:rounded-2xl text-center transition-all duration-200 backdrop-blur-sm border
                  ${index === currentPhase
                    ? 'bg-blue-100/70 border-blue-200/60 text-blue-700'
                    : index < currentPhase
                    ? 'bg-emerald-100/70 border-emerald-200/60 text-emerald-700'
                    : 'bg-gray-100/50 border-gray-200/50 text-gray-500'
                  }
                `}
              >
                <PhaseIcon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" />
                <div className="text-xs font-medium">{phase.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Debate Feed */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-xl bg-white/70 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200/50 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-6">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Live Debate</h3>
              </div>
              <div className="flex-1 sm:flex sm:justify-end">
                <div className="bg-gray-100/70 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50">
                  <span className="text-gray-700 text-sm">{currentDebatePhase.description}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {simulationSteps.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100/70 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-200/50">
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">Start the debate to see agent arguments</p>
                </div>
              ) : (
                simulationSteps.map((step, index) => {
                  const agent = getAgentById(step.agentId);
                  if (!agent) return null;

                  const agentGradient = colorMap[agent.color as keyof typeof colorMap] || 'from-gray-500 to-gray-600';

                  return (
                    <div
                      key={index}
                      className={`
                        flex space-x-3 p-4 rounded-xl sm:rounded-2xl transition-all duration-200 backdrop-blur-sm border
                        ${activeAgent?.id === agent.id && index === simulationSteps.length - 1
                          ? 'bg-blue-50/70 border-blue-200/60 shadow-sm'
                          : 'bg-white/50 border-gray-200/40'
                        }
                      `}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${agentGradient} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        {agent.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900 truncate">{agent.name}</span>
                          <span className="text-xs text-gray-600 bg-gray-100/70 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-200/50 flex-shrink-0">
                            {step.phase}
                          </span>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            Score: {agentScores[agent.id] || 0}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{step.message}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <div className="backdrop-blur-xl bg-white/70 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200/50 p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Debate Leaderboard</h3>
            </div>

            <div className="space-y-4">
              {getAgentStats().map(({ agent, messageCount, score }, index) => {
                const agentGradient = colorMap[agent.color as keyof typeof colorMap] || 'from-gray-500 to-gray-600';
                const isWinning = index === 0;
                return (
                  <div key={agent.id} className={`p-3 rounded-xl sm:rounded-2xl backdrop-blur-sm border transition-all duration-200 ${
                    isWinning ? 'bg-gradient-to-r from-amber-100/70 to-orange-100/70 border-amber-200/60' : 'bg-white/50 border-gray-200/50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 min-w-0">
                        <span className="text-gray-600 font-medium text-sm">#{index + 1}</span>
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${agentGradient} rounded-md sm:rounded-lg flex items-center justify-center text-xs sm:text-sm shadow-sm`}>
                          {agent.avatar}
                        </div>
                        <span className="text-gray-900 text-sm truncate">{agent.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-900 font-semibold text-lg">{score}</div>
                        <div className="text-gray-500 text-xs">{messageCount} arguments</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200/50 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${agentGradient} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Debate Info */}
          <div className="backdrop-blur-xl bg-white/70 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200/50 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Debate Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Phase:</span>
                <span className="text-gray-900">{currentDebatePhase.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Participants:</span>
                <span className="text-gray-900">{event.agents.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded text-xs backdrop-blur-sm border ${
                  isRunning ? 'bg-emerald-100/70 text-emerald-700 border-emerald-200/60' : 'bg-amber-100/70 text-amber-700 border-amber-200/60'
                }`}>
                  {isRunning ? 'Active' : 'Paused'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Exchanges:</span>
                <span className="text-gray-900">{simulationSteps.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}