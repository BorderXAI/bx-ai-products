import React from 'react';
import { User } from 'lucide-react';
import { AvatarCreation, PerformanceEngine, OptimizationPanel } from '../features/host';

export function AIHostSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">AI Host</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <AvatarCreation />
        <PerformanceEngine />
        <OptimizationPanel />
      </div>
    </div>
  );
}