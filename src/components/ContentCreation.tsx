import React, { useState } from 'react';
import { TrendDashboard } from './content/TrendDashboard';
import { IdeationEngine } from './content/IdeationEngine';
import { VideoProduction } from './content/VideoProduction';
import { BatchPublishing } from './content/BatchPublishing';
import { Brain, Video, Upload, BarChart2, Loader2 } from 'lucide-react';

export function ContentCreation() {
  const [activeTab, setActiveTab] = useState('trends');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'trends', label: 'Trend Analysis', icon: BarChart2 },
    { id: 'ideation', label: 'Content Ideation', icon: Brain },
    { id: 'production', label: 'Video Production', icon: Video },
    { id: 'publishing', label: 'Batch Publishing', icon: Upload }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Studio</h1>
        <p className="mt-2 text-gray-600">Create, manage, and publish trending short-form videos</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <>
            {activeTab === 'trends' && <TrendDashboard />}
            {activeTab === 'ideation' && <IdeationEngine />}
            {activeTab === 'production' && <VideoProduction />}
            {activeTab === 'publishing' && <BatchPublishing />}
          </>
        )}
      </div>
    </div>
  );
}