import React, { useState } from 'react';
import { Pin, MessageSquare, Mic, TrendingUp, AlertCircle } from 'lucide-react';

export function SalesAssistant() {
  const [activeProduct, setActiveProduct] = useState({
    name: 'Premium Skincare Set',
    price: '$129.99',
    engagement: '85%',
    pinned: true
  });

  const [recentComments] = useState([
    { id: 1, text: "Does this work for sensitive skin?", priority: "high", sentiment: "positive" },
    { id: 2, text: "What's the shipping time?", priority: "medium", sentiment: "neutral" },
    { id: 3, text: "Love the results!", priority: "high", sentiment: "positive" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Smart Sales Assistant</h3>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
      </div>

      {/* Product Pinning */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Pin className="h-4 w-4 text-indigo-600" />
            <span className="font-medium text-sm">Active Product</span>
          </div>
          <span className="text-xs text-gray-500">Auto-pinned 2m ago</span>
        </div>
        <div className="space-y-2">
          <p className="font-medium">{activeProduct.name}</p>
          <div className="flex items-center justify-between text-sm">
            <span>{activeProduct.price}</span>
            <span className="text-green-600">↑ {activeProduct.engagement} engagement</span>
          </div>
        </div>
      </div>

      {/* Comment Management */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="h-4 w-4 text-indigo-600" />
          <span className="font-medium text-sm">Priority Comments</span>
        </div>
        <div className="space-y-2">
          {recentComments.map(comment => (
            <div 
              key={comment.id} 
              className={`p-3 rounded-lg ${
                comment.priority === 'high' 
                  ? 'bg-indigo-50 border-l-4 border-indigo-500'
                  : 'bg-gray-50'
              }`}
            >
              <p className="text-sm">{comment.text}</p>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs ${
                  comment.sentiment === 'positive' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {comment.sentiment}
                </span>
                <button className="text-xs text-indigo-600 hover:text-indigo-700">
                  Generate Response
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Assistant */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-indigo-600" />
            <span className="font-medium text-sm">AI Voice Assistant</span>
          </div>
          <button className="text-xs text-indigo-600 hover:text-indigo-700">
            Configure Voice
          </button>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Listening for questions...</span>
          </div>
          <div className="text-xs text-gray-500">
            Last response: "The skincare set includes a cleanser, toner, and moisturizer"
          </div>
        </div>
      </div>
    </div>
  );
}