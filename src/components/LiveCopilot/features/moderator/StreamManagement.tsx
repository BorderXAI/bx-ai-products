import React, { useState } from 'react';
import { Shield, Clock, Users, AlertTriangle } from 'lucide-react';

export function StreamManagement() {
  const [moderationStats] = useState({
    activeUsers: 1234,
    flaggedContent: 2,
    autoModActions: 15,
    engagementRate: '8.5%'
  });

  const [recentActions] = useState([
    { id: 1, type: 'warning', user: 'user123', reason: 'Spam', time: '2m ago' },
    { id: 2, type: 'mute', user: 'user456', reason: 'Inappropriate', time: '5m ago' }
  ]);

  const [salesInsights] = useState([
    { id: 1, type: 'peak', message: 'Engagement peak detected', action: 'Promote skincare set' },
    { id: 2, type: 'intent', message: 'High purchase intent', action: 'Highlight reviews' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Stream Management</h3>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          <span className="text-xs text-gray-600">Monitoring</span>
        </div>
      </div>

      {/* Moderation Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Active Users</div>
          <div className="font-semibold">{moderationStats.activeUsers}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Engagement</div>
          <div className="font-semibold">{moderationStats.engagementRate}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Flagged</div>
          <div className="font-semibold">{moderationStats.flaggedContent}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Auto-Mod</div>
          <div className="font-semibold">{moderationStats.autoModActions}</div>
        </div>
      </div>

      {/* Recent Actions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-indigo-600" />
          <span className="font-medium text-sm">Recent Actions</span>
        </div>
        <div className="space-y-2">
          {recentActions.map(action => (
            <div key={action.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{action.type}</span>
                <span className="text-xs text-gray-500">{action.time}</span>
              </div>
              <div className="text-xs text-gray-600">
                User: {action.user} | Reason: {action.reason}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Psychology */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-indigo-600" />
          <span className="font-medium text-sm">Sales Insights</span>
        </div>
        <div className="space-y-2">
          {salesInsights.map(insight => (
            <div key={insight.id} className="bg-indigo-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium">{insight.message}</span>
              </div>
              <div className="text-xs text-indigo-600">
                Recommended: {insight.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}