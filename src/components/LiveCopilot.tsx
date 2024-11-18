import React, { useState } from 'react';
import { Bot, Grid, User, Image } from 'lucide-react';

// Import sections
import { AIModeratorSection } from './LiveCopilot/sections/AIModeratorSection';
import { AIHostSection } from './LiveCopilot/sections/AIHostSection';
import { SmartGreenScreenSection } from './LiveCopilot/sections/SmartGreenScreenSection';
import { MultiRoomControlSection } from './LiveCopilot/sections/MultiRoomControlSection';

export function LiveCopilot() {
  const [activeTab, setActiveTab] = useState('moderator');

  const tabs = [
    { id: 'moderator', label: 'AI Moderator', icon: Bot },
    { id: 'host', label: 'AI Host', icon: User },
    { id: 'greenscreen', label: 'Smart Green Screen', icon: Image },
    { id: 'multiroom', label: 'Multi-Room Control', icon: Grid }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Live Stream Co-pilot</h1>
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

      {/* Content Sections */}
      <div className="space-y-8">
        {activeTab === 'moderator' && <AIModeratorSection />}
        {activeTab === 'host' && <AIHostSection />}
        {activeTab === 'greenscreen' && <SmartGreenScreenSection />}
        {activeTab === 'multiroom' && <MultiRoomControlSection />}
      </div>
    </div>
  );
}