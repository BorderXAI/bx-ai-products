import React from 'react';
import { TrendingUp, Users, Target, BarChart3 } from 'lucide-react';

interface Competitor {
  name: string;
  marketShare: string;
  strengths: string[];
}

interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface ResearchData {
  swot: SWOT;
  competitors: Competitor[];
  marketSize: string;
  growth: string;
}

interface Props {
  data: ResearchData;
}

function ResearchResults({ data }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Market Size</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{data.marketSize}</p>
          <p className="text-sm text-gray-600">Growth: {data.growth}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="h-5 w-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Competitors</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{data.competitors.length}</p>
          <p className="text-sm text-gray-600">Major players analyzed</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">SWOT Analysis</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {data.swot.strengths.map((strength, i) => (
                <li key={i}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-600 mb-2">Weaknesses</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {data.swot.weaknesses.map((weakness, i) => (
                <li key={i}>{weakness}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-600 mb-2">Opportunities</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {data.swot.opportunities.map((opportunity, i) => (
                <li key={i}>{opportunity}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-orange-600 mb-2">Threats</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {data.swot.threats.map((threat, i) => (
                <li key={i}>{threat}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Competitor Analysis</h3>
        </div>
        <div className="space-y-4">
          {data.competitors.map((competitor, i) => (
            <div key={i} className="border-b last:border-b-0 pb-4 last:pb-0">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{competitor.name}</h4>
                <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                  {competitor.marketShare} Market Share
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {competitor.strengths.map((strength, j) => (
                  <span key={j} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResearchResults;