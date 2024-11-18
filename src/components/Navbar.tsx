import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Brain, 
  BarChart3, 
  Home, 
  Video, 
  Target, 
  Users, 
  Bot, 
  ClipboardList, 
  Package, 
  Pen, 
  LayoutDashboard,
  CalendarCheck 
} from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/market-research', icon: BarChart3, label: 'Market' },
    { path: '/strategy', icon: Pen, label: 'Strategy' },
    { path: '/content', icon: Video, label: 'Video' },
    { path: '/campaigns', icon: Target, label: 'Ads' },
    { path: '/creators', icon: Users, label: 'Creators' },
    { path: '/copilot', icon: Bot, label: 'Live' },
    { path: '/crm', icon: ClipboardList, label: 'CRM' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/daily-tasks', icon: CalendarCheck, label: 'Tasks' }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BorderX AI
            </span>
          </Link>
          
          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  location.pathname === path
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}