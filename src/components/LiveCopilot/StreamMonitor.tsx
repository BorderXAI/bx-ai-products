import React, { useState } from 'react';
import { Play, Pause, Volume2, Settings, Maximize, Users, Heart, Gift, MessageSquare, Mic, Camera, LayoutGrid, MonitorSpeaker } from 'lucide-react';

export function StreamMonitor() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [selectedLayout, setSelectedLayout] = useState('single');
  const [audioInputs, setAudioInputs] = useState([
    { id: 1, name: 'Microphone', active: true, level: 75 },
    { id: 2, name: 'System Audio', active: true, level: 60 }
  ]);
  const [videoInputs, setVideoInputs] = useState([
    { id: 1, name: 'Webcam', active: true },
    { id: 2, name: 'Screen Share', active: false }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Stream Preview Grid */}
      <div className="grid grid-cols-4 gap-2 p-2 bg-gray-900">
        {/* Main Preview */}
        <div className="col-span-3 relative aspect-video bg-gray-800 rounded">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg">Main Stream</span>
          </div>
          
          {/* Stream Overlay Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-black/50 rounded hover:bg-black/70 text-white">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button className="p-2 bg-black/50 rounded hover:bg-black/70 text-white">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* Stream Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>

                <select
                  value={selectedLayout}
                  onChange={(e) => setSelectedLayout(e.target.value)}
                  className="bg-black/30 text-white border border-white/20 rounded px-2 py-1"
                >
                  <option value="single">Single View</option>
                  <option value="pip">Picture in Picture</option>
                  <option value="split">Split Screen</option>
                  <option value="grid">Grid View</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <Settings className="h-5 w-5 cursor-pointer hover:text-indigo-400 transition-colors" />
                <Maximize className="h-5 w-5 cursor-pointer hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Side Preview Panels */}
        <div className="space-y-2">
          <div className="relative aspect-video bg-gray-800 rounded">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm">Preview 1</span>
            </div>
          </div>
          <div className="relative aspect-video bg-gray-800 rounded">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm">Preview 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Mixer */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Audio Mixer</h3>
        <div className="space-y-3">
          {audioInputs.map((input) => (
            <div key={input.id} className="flex items-center gap-4">
              <button className={`p-1.5 rounded ${input.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                <Mic className="h-4 w-4 text-white" />
              </button>
              <span className="text-sm text-gray-600 w-24">{input.name}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={input.level}
                onChange={(e) => {
                  const newInputs = [...audioInputs];
                  newInputs[input.id - 1].level = parseInt(e.target.value);
                  setAudioInputs(newInputs);
                }}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12">{input.level}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stream Stats */}
      <div className="p-4 grid grid-cols-4 gap-4 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span className="text-sm">Viewers</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">1,234</p>
          <p className="text-xs text-green-600">↑ 12% from last hour</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Heart className="h-5 w-5" />
            <span className="text-sm">Likes</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">8.5K</p>
          <p className="text-xs text-green-600">↑ 8% from last hour</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Gift className="h-5 w-5" />
            <span className="text-sm">Gifts</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">256</p>
          <p className="text-xs text-green-600">↑ 15% from last hour</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">Comments</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">423</p>
          <p className="text-xs text-green-600">↑ 20% from last hour</p>
        </div>
      </div>

      {/* Technical Stats */}
      <div className="p-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600">Stream Health</span>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-sm font-medium text-green-600">95%</span>
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-600">Bitrate</span>
            <p className="text-sm font-medium">6000 kbps</p>
          </div>

          <div>
            <span className="text-sm text-gray-600">Frame Rate</span>
            <p className="text-sm font-medium">60 fps</p>
          </div>
        </div>
      </div>
    </div>
  );
}