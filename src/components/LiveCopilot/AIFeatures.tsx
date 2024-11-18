import React, { useState } from 'react';
import { Mic, Thermometer, MessageCircle, Bot, Sparkles, Zap, ChevronRight, AlertTriangle, Smile, Frown, Meh } from 'lucide-react';

export function AIFeatures() {
  const [voiceCommands] = useState([
    { command: "Switch Scene", description: "Changes to specified scene" },
    { command: "Mute Audio", description: "Mutes specified audio source" },
    { command: "Show Stats", description: "Displays stream statistics" }
  ]);

  const [sentimentHistory] = useState([
    { time: '14:00', sentiment: 0.8 },
    { time: '14:10', sentiment: 0.7 },
    { time: '14:20', sentiment: 0.9 },
    { time: '14:30', sentiment: 0.6 },
    { time: '14:40', sentiment: 0.85 }
  ]);

  const [autoResponses] = useState([
    { trigger: "Product inquiry", response: "Thanks for your interest! Our product..." },
    { trigger: "Price question", response: "The current price is..." },
    { trigger: "Shipping query", response: "We ship worldwide..." }
  ]);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Voice Commands */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Mic className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold">Voice Commands</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Voice Recognition</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
          
          <div className="space-y-2">
            {voiceCommands.map((cmd, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{cmd.command}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">{cmd.description}</p>
              </div>
            ))}
          </div>

          <button className="w-full px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
            Configure Commands
          </button>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Thermometer className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold">Sentiment Analysis</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Mood</span>
            <div className="flex items-center gap-2">
              <Smile className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-green-600">Very Positive</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Negative</span>
              <span>Positive</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm font-medium text-gray-700">Sentiment Trends</span>
            <div className="h-24 flex items-end gap-1">
              {sentimentHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 bg-indigo-100 rounded-t"
                  style={{ height: `${item.sentiment * 100}%` }}
                >
                  <div
                    className="w-full bg-indigo-500 rounded-t"
                    style={{ height: `${item.sentiment * 100}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              {sentimentHistory.map((item, index) => (
                <span key={index}>{item.time}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auto Responses */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold">Auto Responses</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">AI Responses</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>

          <div className="space-y-2">
            {autoResponses.map((response, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{response.trigger}</span>
                  <Bot className="h-4 w-4 text-indigo-600" />
                </div>
                <p className="text-xs text-gray-500 truncate">{response.response}</p>
              </div>
            ))}
          </div>

          <button className="w-full px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
            Manage Templates
          </button>
        </div>
      </div>

      {/* Content Suggestions */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold">Content Suggestions</h2>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600 mt-0.5" />
              <div>
                <p className="text-sm text-indigo-700 font-medium">
                  Show product features in more detail
                </p>
                <p className="text-xs text-indigo-600 mt-1">
                  Viewers are asking about product specifications
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-700 font-medium">
                  Address common pricing concerns
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Multiple viewers asking about pricing
                </p>
              </div>
            </div>
          </div>

          <button className="w-full px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700">
            Next Suggestion →
          </button>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Auto-Reply</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>

          <div className="space-y-2">
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Last Response</span>
                <span className="text-xs text-gray-400">2m ago</span>
              </div>
              <p className="text-sm text-gray-700">
                "Thank you for your question! The product comes with a 1-year warranty..."
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm">
              Configure
            </button>
            <button className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm">
              View History
            </button>
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold">Performance Tips</h2>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-700 font-medium">
                  Engagement dropping
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Try asking viewers a question to boost interaction
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm text-green-700 font-medium">
                  Peak viewing time
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Perfect time to showcase your main products
                </p>
              </div>
            </div>
          </div>

          <button className="w-full px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700">
            View More Tips
          </button>
        </div>
      </div>
    </div>
  );
}