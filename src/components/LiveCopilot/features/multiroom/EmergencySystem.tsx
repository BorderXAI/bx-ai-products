import React, { useState } from 'react';
import { AlertTriangle, Shield, Wifi, Server, RefreshCw, AlertCircle } from 'lucide-react';

interface Alert {
  id: string;
  type: 'technical' | 'content' | 'security';
  severity: 'high' | 'medium' | 'low';
  message: string;
  time: string;
}

export function EmergencySystem() {
  const [activeAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'technical',
      severity: 'high',
      message: 'High CPU usage detected on Stream 2',
      time: '2m ago'
    },
    {
      id: '2',
      type: 'content',
      severity: 'medium',
      message: 'Potential content violation in chat',
      time: '5m ago'
    },
    {
      id: '3',
      type: 'security',
      severity: 'low',
      message: 'Multiple failed login attempts',
      time: '15m ago'
    }
  ]);

  const [systemStatus] = useState({
    network: 'stable',
    server: 'operational',
    backup: 'ready',
    security: 'active'
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Emergency Response</h3>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
          System Active
        </span>
      </div>

      {/* Active Alerts */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-medium">Active Alerts</h4>
        </div>
        <div className="space-y-2">
          {activeAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg ${
                alert.severity === 'high'
                  ? 'bg-red-50'
                  : alert.severity === 'medium'
                  ? 'bg-yellow-50'
                  : 'bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <AlertCircle className={`h-4 w-4 ${
                    alert.severity === 'high'
                      ? 'text-red-600'
                      : alert.severity === 'medium'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`} />
                  <span className="text-sm font-medium">{alert.message}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{alert.type}</span>
                <span>{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-medium">System Status</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Wifi className="h-4 w-4 text-green-600" />
              <span className="text-sm">Network</span>
            </div>
            <span className="text-xs text-green-600 capitalize">{systemStatus.network}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Server className="h-4 w-4 text-green-600" />
              <span className="text-sm">Server</span>
            </div>
            <span className="text-xs text-green-600 capitalize">{systemStatus.server}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <RefreshCw className="h-4 w-4 text-green-600" />
              <span className="text-sm">Backup</span>
            </div>
            <span className="text-xs text-green-600 capitalize">{systemStatus.backup}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm">Security</span>
            </div>
            <span className="text-xs text-green-600 capitalize">{systemStatus.security}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Emergency Stop</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <RefreshCw className="h-4 w-4" />
          <span className="text-sm">Switch Backup</span>
        </button>
      </div>
    </div>
  );
}