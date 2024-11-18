import React from 'react';
import { Settings, Layout, Image, Type, Music, Share2 } from 'lucide-react';

export function StreamTools() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Stream Tools</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Layout className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Layouts</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Image className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Overlays</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Type className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Captions</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Music className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Sound FX</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Share2 className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Share</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Settings className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Settings</span>
        </button>
      </div>
    </div>
  );
}