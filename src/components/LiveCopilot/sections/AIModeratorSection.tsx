import React from 'react';
import { Brain } from 'lucide-react';
import { SalesAssistant, StreamManagement, AnalyticsDashboard } from '../features/moderator';

export function AIModeratorSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">AI Moderator</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <SalesAssistant />
        <StreamManagement />
        <AnalyticsDashboard />
      </div>
    </div>
  );
}