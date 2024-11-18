import React, { useState } from 'react';
import { Image, Sparkles, Layout, Play, Download } from 'lucide-react';

export function BackgroundManager() {
  const [activeBackground, setActiveBackground] = useState('studio');
  const [effects, setEffects] = useState(['particles', 'spotlight']);

  const backgrounds = [
    { id: 'studio', name: 'Modern Studio', type: 'premium' },
    { id: 'lifestyle', name: 'Lifestyle Scene', type: 'premium' },
    { id: 'product', name: 'Product Showcase', type: 'custom' }
  ];

  const effectsList = [
    { id: 'particles', name: 'Particle Effects', active: true },
    { id: 'spotlight', name: 'Product Spotlight', active: true },
    { id: 'celebration', name: 'Sale Celebration', active: false }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Background Manager</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          Add Custom
        </button>
      </div>

      {/* Preview */}
      <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image className="h-8 w-8 text-white/50" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm">Live Preview</span>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-white/20 rounded">
                <Play className="h-4 w-4" />
              </button>
              <button className="p-1 hover:bg-white/20 rounded">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Selection */}
      <div>
        <h4 className="text-sm font-medium mb-3">Available Backgrounds</h4>
        <div className="grid grid-cols-3 gap-2">
          {backgrounds.map(bg => (
            <button
              key={bg.id}
              onClick={() => setActiveBackground(bg.id)}
              className={`p-3 rounded-lg text-left ${
                activeBackground === bg.id
                  ? 'bg-indigo-50 border-2 border-indigo-500'
                  : 'bg-gray-50 border-2 border-transparent'
              }`}
            >
              <div className="text-sm font-medium">{bg.name}</div>
              <div className="text-xs text-gray-500 capitalize">{bg.type}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Effects */}
      <div>
        <h4 className="text-sm font-medium mb-3">Special Effects</h4>
        <div className="space-y-2">
          {effectsList.map(effect => (
            <div
              key={effect.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span className="text-sm">{effect.name}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={effect.active}
                  onChange={() => {
                    setEffects(prev =>
                      effect.active
                        ? prev.filter(e => e !== effect.id)
                        : [...prev, effect.id]
                    );
                  }}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <Layout className="h-4 w-4" />
          <span className="text-sm">Save Layout</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <Download className="h-4 w-4" />
          <span className="text-sm">Export Scene</span>
        </button>
      </div>
    </div>
  );
}