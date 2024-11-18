import React, { useState } from 'react';
import { Users, Share2, MessageSquare, ClipboardList, UserPlus, Clock } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'busy' | 'offline';
  assignedStream: string;
}

interface SharedResource {
  id: string;
  type: 'script' | 'template' | 'response' | 'product';
  title: string;
  author: string;
  usage: number;
}

export function TeamTools() {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Host',
      status: 'online',
      assignedStream: 'Fashion Stream'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Moderator',
      status: 'busy',
      assignedStream: 'Tech Stream'
    },
    {
      id: '3',
      name: 'Emma Lee',
      role: 'Support',
      status: 'online',
      assignedStream: 'Beauty Stream'
    }
  ]);

  const [sharedResources] = useState<SharedResource[]>([
    {
      id: '1',
      type: 'script',
      title: 'Product Launch Script',
      author: 'Sarah Chen',
      usage: 15
    },
    {
      id: '2',
      type: 'template',
      title: 'Flash Sale Template',
      author: 'Mike Johnson',
      usage: 23
    },
    {
      id: '3',
      type: 'response',
      title: 'Common FAQs',
      author: 'Emma Lee',
      usage: 45
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'script':
        return <ClipboardList className="h-4 w-4 text-indigo-600" />;
      case 'template':
        return <Share2 className="h-4 w-4 text-indigo-600" />;
      case 'response':
        return <MessageSquare className="h-4 w-4 text-indigo-600" />;
      default:
        return <ClipboardList className="h-4 w-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Team Management</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
          <UserPlus className="h-4 w-4" />
          Add Member
        </button>
      </div>

      {/* Team Members */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-medium">Active Team</h4>
        </div>
        <div className="space-y-2">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-indigo-600">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${getStatusColor(
                      member.status
                    )} border-2 border-white rounded-full`}
                  />
                </div>
                <div>
                  <div className="font-medium text-sm">{member.name}</div>
                  <div className="text-xs text-gray-500">{member.role}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">{member.assignedStream}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Resources */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-medium">Resource Library</h4>
        </div>
        <div className="space-y-2">
          {sharedResources.map(resource => (
            <div
              key={resource.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getResourceIcon(resource.type)}
                <div>
                  <div className="font-medium text-sm">{resource.title}</div>
                  <div className="text-xs text-gray-500">By {resource.author}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Used {resource.usage} times</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm">Team Chat</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <Share2 className="h-4 w-4" />
          <span className="text-sm">Share Resource</span>
        </button>
      </div>

      {/* Task Assignment */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-indigo-600" />
            <h4 className="text-sm font-medium">Active Tasks</h4>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700">
            View All
          </button>
        </div>
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Monitor Chat Activity</span>
              <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                In Progress
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Assigned to Mike Johnson</span>
              <span>Due in 2h</span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Update Product Info</span>
              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                Completed
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Assigned to Emma Lee</span>
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}