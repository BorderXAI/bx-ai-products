import React from 'react';
import { Target, Users, TrendingUp, Calendar } from 'lucide-react';

interface Strategy {
  overview: string;
  channels: string[];
  timeline: string;
  budget: string;
}

interface Persona {
  name: string;
  age: string;
  interests: string[];
  painPoints: string[];
}

interface KPI {
  metric: string;
  target: string;
}

interface StrategyData {
  strategy: Strategy;
  personas: Persona[];
  kpis: KPI[];
}

interface Props {
  data: StrategyData;
}

function StrategyResults({ data }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Marketing Strategy Overview</h3>
        </div>
        <p className="text-gray-700 mb-4">{data.strategy.overview}</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-4 w-4 text-indigo-600" />
              <h4 className="font-medium text-gray-900">Timeline</h4>
            </div>
            <p className="text-gray-700">{data.strategy.timeline}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-indigo-600" />
              <h4 className="font-medium text-gray-900">Budget</h4>
            </div>
            <p className="text-gray-700">{data.strategy.budget}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-indigo-600" />
              <h4 className="font-medium text-gray-900">Channels</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.strategy.channels.map((channel, i) => (
                <span key={i} className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Buyer Personas</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {data.personas.map((persona, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{persona.name}</h4>
              <p className="text-sm text-gray-600 mb-3">Age: {persona.age}</p>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Interests</h5>
                  <div className="flex flex-wrap gap-2">
                    {persona.interests.map((interest, j) => (
                      <span key={j} className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Pain Points</h5>
                  <div className="flex flex-wrap gap-2">
                    {persona.painPoints.map((point, j) => (
                      <span key={j} className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Key Performance Indicators</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {data.kpis.map((kpi, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">{kpi.metric}</h4>
              <p className="text-2xl font-bold text-indigo-600">{kpi.target}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StrategyResults;