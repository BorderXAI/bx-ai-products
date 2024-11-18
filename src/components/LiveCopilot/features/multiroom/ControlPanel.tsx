import React, { useState } from 'react';
import { Mic, Volume2, Layout, Sliders, Sparkles, Video, Music } from 'lucide-react';

interface AudioChannel {
  id: string;
  name: string;
  volume: number;
  muted: boolean;
}

interface Scene {
  id: string;
  name: string;
  active: boolean;
  type: 'background' | 'overlay' | 'transition';
}

export function ControlPanel() {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [audioChannels, setAudioChannels] = useState<AudioChannel[]>([
    { id: '1', name: 'Stream 1', volume: 80, muted: false },
    { id: '2', name: 'Stream 2', volume: 75, muted: false },
    { id: '3', name: 'Stream 3', volume: 70, muted: true }
  ]);

  const [scenes, setScenes] = useState<Scene[]>([
    { id: '1', name: 'Main View', active: true, type: 'background' },
    { id: '2', name: 'Product Showcase', active: false, type: 'overlay' },
    { id: '3', name: 'Transition Effect', active: false, type: 'transition' }
  ]);

  const handleVolumeChange = (id: string, value: number) => {
    setAudioChannels(channels =>
      channels.map(channel =>
        channel.id === id ? { ...channel, volume: value } : channel
      )
    );
  };

  const toggleMute = (id: string) => {
    setAudioChannels(channels =>
      channels.map(channel =>
        channel.id === id ? { ...channel, muted: !channel.muted } : channel
      )
    );
  };

  const toggleScene = (id: string) => {
    setScenes(currentScenes =>
      currentScenes.map(scene =>
        scene.id === id ? { ...scene, active: !scene.active } : scene
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Control Panel</h3>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Connected</span>
      </div>

      {/* Voice Command Center */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-indigo-600" />
            <h4 className="text-sm font-medium">Voice Commands</h4>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={voiceEnabled}
              onChange={() => setVoiceEnabled(!voiceEnabled)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Listening for commands...</span>
          </div>
          <div className="text-xs text-gray-500">
            Last command: "Switch to Product Showcase"
          </div>
        </div>
      </div>

      {/* Scene Management */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layout className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-medium">Scene Management</h4>
        </div>
        <div className="space-y-2">
          {scenes.map(scene => (
            <div
              key={scene.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                {scene.type === 'background' ? (
                  <Video className="h-4 w-4 text-indigo-600" />
                ) : scene.type === 'overlay' ? (
                  <Layout className="h-4 w-4 text-indigo-600" />
                ) : (
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                )}
                <span className="text-sm">{scene.name}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={scene.active}
                  onChange={() => toggleScene(scene.id)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Audio Control */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Volume2 className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-medium">Audio Mixer</h4>
        </div>
        <div className="space-y-3">
          {audioChannels.map(channel => (
            <div key={channel.id} className="flex items-center gap-4">
              <button
                onClick={() => toggleMute(channel.id)}
                className={`p-1.5 rounded ${
                  channel.muted ? 'bg-gray-300' : 'bg-green-500'
                }`}
              >
                <Music className="h-4 w-4 text-white" />
              </button>
              <span className="text-sm text-gray-600 w-20">{channel.name}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={channel.volume}
                onChange={(e) => handleVolumeChange(channel.id, Number(e.target.value))}
                className="flex-1"
                disabled={channel.muted}
              />
              <span className="text-sm text-gray-600 w-12">
                {channel.muted ? 'Muted' : `${channel.volume}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <Sliders className="h-4 w-4" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <Layout className="h-4 w-4" />
          <span className="text-sm">Layouts</span>
        </button>
      </div>
    </div>
  );
}