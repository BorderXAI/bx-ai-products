import React, { useState } from 'react';
import { VideoInspiration } from './VideoInspiration';
import { Video, Brain, Target, Calendar } from 'lucide-react';

export function DailyTasks() {
  const [activeTab, setActiveTab] = useState('inspiration');

  const tabs = [
    { id: 'inspiration', label: 'Video Inspiration', icon: Video },
    // More tabs can be added here as new features are developed
  ];

  return (
    <div className="min-h-screen bg-daily-tasks">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daily Tasks</h1>
            <p className="text-gray-600 mt-1">Your AI-powered daily content creation assistant</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
              <Calendar className="h-5 w-5" />
              <span>Today's Progress: 2/5</span>
            </div>
          </div>
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

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'inspiration' && <VideoInspiration />}
        </div>
      </div>
    </div>
  );
}