import React from 'react';
import { Grid } from 'lucide-react';
import {
  UnifiedDashboard,
  AdvancedAnalytics,
  ControlPanel,
  TeamTools,
  EmergencySystem,
  CustomReports
} from '../features/multiroom';

export function MultiRoomControlSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Grid className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Multi-Room Control Center</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <UnifiedDashboard />
        <AdvancedAnalytics />
        <ControlPanel />
        <TeamTools />
        <EmergencySystem />
        <CustomReports />
      </div>
    </div>
  );
}