import React, { useState } from 'react';
import { User, Video, Mic, Sparkles, Camera } from 'lucide-react';

export function AvatarCreation() {
  const [hostSettings, setHostSettings] = useState({
    voiceStyle: 'natural',
    personality: 'friendly',
    appearance: 'professional',
    language: 'english'
  });

  const [captureStatus] = useState({
    video: true,
    voice: true,
    expressions: true,
    movements: true
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Digital Avatar</h3>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Learning</span>
      </div>

      {/* Avatar Preview */}
      <div className="aspect-video bg-gray-900 rounded-lg relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="h-8 w-8 text-white/50" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm">Avatar Preview</span>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <Mic className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Capture Status */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(captureStatus).map(([key, status]) => (
          <div key={key} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm capitalize">{key}</span>
              <span className={`h-2 w-2 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voice Style
          </label>
          <select
            value={hostSettings.voiceStyle}
            onChange={(e) => setHostSettings({ ...hostSettings, voiceStyle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="natural">Natural</option>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personality Type
          </label>
          <select
            value={hostSettings.personality}
            onChange={(e) => setHostSettings({ ...hostSettings, personality: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="friendly">Friendly & Approachable</option>
            <option value="professional">Professional & Formal</option>
            <option value="energetic">Energetic & Enthusiastic</option>
          </select>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Sparkles className="h-4 w-4" />
          <span>Generate Avatar</span>
        </button>
      </div>
    </div>
  );
}