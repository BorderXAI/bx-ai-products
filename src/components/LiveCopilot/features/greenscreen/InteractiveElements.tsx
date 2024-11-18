import React, { useState } from 'react';
import { Users, Gift, Star, Zap } from 'lucide-react';

interface InteractionOption {
  id: string;
  label: string;
  enabled: boolean;
}

export function InteractiveElements() {
  const [interactionOptions, setInteractionOptions] = useState<InteractionOption[]>([
    { id: 'polls', label: 'Interactive Polls', enabled: true },
    { id: 'effects', label: 'Click Effects', enabled: true },
    { id: 'gifts', label: 'Virtual Gifts', enabled: true },
    { id: 'reactions', label: 'Live Reactions', enabled: true }
  ]);

  const handleOptionChange = (id: string) => {
    setInteractionOptions(options =>
      options.map(option =>
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Interactive Elements</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {interactionOptions.map(option => (
            <label key={option.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={option.enabled}
                onChange={() => handleOptionChange(option.id)}
                className="rounded text-indigo-600"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Viewer Count</span>
            </div>
            <p className="text-2xl font-bold">1,234</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Gifts</span>
            </div>
            <p className="text-2xl font-bold">89</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Engagement</span>
            </div>
            <p className="text-2xl font-bold">92%</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Active Effects</span>
            </div>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}