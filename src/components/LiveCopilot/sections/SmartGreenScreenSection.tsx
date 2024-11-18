import React from 'react';
import { Image } from 'lucide-react';
import { BackgroundManager, InteractiveElements } from '../features/greenscreen';

export function SmartGreenScreenSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Image className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Smart Green Screen</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <BackgroundManager />
        <InteractiveElements />
      </div>
    </div>
  );
}