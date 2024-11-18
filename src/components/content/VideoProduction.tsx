import React, { useState } from 'react';
import { Video, Sparkles, Music, Type, Layout, Image, Loader2, Play, Pause, RotateCcw, Download } from 'lucide-react';

export function VideoProduction() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [videoSettings, setVideoSettings] = useState({
    aspectRatio: '9:16',
    duration: 10,
    resolution: '1080p',
    format: 'mp4'
  });

  const handleStartRecording = () => {
    setIsRecording(true);
    // Implement recording logic
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setVideoPreview('preview-url');
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Video Preview */}
        <div className="space-y-6">
          <div className="aspect-[9/16] bg-gray-900 rounded-lg relative overflow-hidden">
            {videoPreview ? (
              <video
                src={videoPreview}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg">Camera Preview</span>
              </div>
            )}

            {/* Recording Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {isRecording ? (
                    <button
                      onClick={handleStopRecording}
                      className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <Pause className="h-6 w-6 text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={handleStartRecording}
                      className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
                    >
                      <Play className="h-6 w-6 text-white" />
                    </button>
                  )}

                  {isRecording && (
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse" />
                      <span className="text-white text-sm">Recording</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 bg-black/50 rounded hover:bg-black/70 text-white">
                    <RotateCcw className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-black/50 rounded hover:bg-black/70 text-white">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Settings */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Video Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aspect Ratio
                </label>
                <select
                  value={videoSettings.aspectRatio}
                  onChange={(e) => setVideoSettings({ ...videoSettings, aspectRatio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="9:16">9:16 (Portrait)</option>
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="1:1">1:1 (Square)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={videoSettings.duration}
                  onChange={(e) => setVideoSettings({ ...videoSettings, duration: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="10">10 seconds</option>
                  <option value="15">15 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">60 seconds</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution
                </label>
                <select
                  value={videoSettings.resolution}
                  onChange={(e) => setVideoSettings({ ...videoSettings, resolution: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                  <option value="2k">2K</option>
                  <option value="4k">4K</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select
                  value={videoSettings.format}
                  onChange={(e) => setVideoSettings({ ...videoSettings, format: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="mp4">MP4</option>
                  <option value="mov">MOV</option>
                  <option value="webm">WebM</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Production Tools */}
        <div className="space-y-6">
          {/* Shot List */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Shot List</h3>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Opening Shot</span>
                  <span className="text-sm text-gray-500">0:00 - 0:03</span>
                </div>
                <p className="text-sm text-gray-600">
                  Close-up product shot with smooth transition
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Main Demo</span>
                  <span className="text-sm text-gray-500">0:03 - 0:07</span>
                </div>
                <p className="text-sm text-gray-600">
                  Demonstrate key product features with text overlays
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Closing Call-to-Action</span>
                  <span className="text-sm text-gray-500">0:07 - 0:10</span>
                </div>
                <p className="text-sm text-gray-600">
                  End with strong CTA and brand message
                </p>
              </div>
            </div>
          </div>

          {/* Creative Tools */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Creative Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Music className="h-6 w-6 text-indigo-600" />
                <span className="text-sm">Add Music</span>
              </button>

              <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Type className="h-6 w-6 text-indigo-600" />
                <span className="text-sm">Add Text</span>
              </button>

              <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Layout className="h-6 w-6 text-indigo-600" />
                <span className="text-sm">Templates</span>
              </button>

              <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Image className="h-6 w-6 text-indigo-600" />
                <span className="text-sm">Effects</span>
              </button>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Assistant</h3>
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700">
                  Try zooming in on the product label to highlight the key ingredients
                </p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700">
                  Current pace is good - maintain this rhythm for optimal viewer retention
                </p>
              </div>
              <button className="w-full px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700">
                Get More Suggestions →
              </button>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Export Options</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Download className="h-5 w-5" />
                Export Video
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Video className="h-5 w-5 text-gray-500" />
                  Preview
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Layout className="h-5 w-5 text-gray-500" />
                  Templates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}