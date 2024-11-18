import React, { useState } from 'react';
import { Upload, Calendar, Clock, Globe, Settings, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  status: 'pending' | 'processing' | 'scheduled' | 'published' | 'failed';
  platform: string;
  scheduledTime?: string;
}

export function BatchPublishing() {
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: '1',
      title: 'Product Demo Video',
      thumbnail: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200',
      duration: '0:30',
      status: 'pending',
      platform: 'TikTok'
    },
    {
      id: '2',
      title: 'Tutorial Series Part 1',
      thumbnail: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200',
      duration: '0:45',
      status: 'scheduled',
      platform: 'Instagram',
      scheduledTime: '2024-03-20 14:00'
    }
  ]);

  const [selectedPlatforms, setSelectedPlatforms] = useState(['TikTok']);
  const [publishingTime, setPublishingTime] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600';
      case 'processing':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-yellow-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6">
      {/* Upload Section */}
      <div className="mb-8">
        <div className="max-w-xl mx-auto">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Videos
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop video files or click to browse
            </p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Select Files
            </button>
          </div>
        </div>
      </div>

      {/* Publishing Settings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Publishing Settings</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platforms
            </label>
            <div className="space-y-2">
              {['TikTok', 'Instagram Reels', 'YouTube Shorts'].map((platform) => (
                <label key={platform} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform)}
                    onChange={(e) => {
                      const platforms = e.target.checked
                        ? [...selectedPlatforms, platform]
                        : selectedPlatforms.filter(p => p !== platform);
                      setSelectedPlatforms(platforms);
                    }}
                    className="rounded text-indigo-600"
                  />
                  <span className="text-sm text-gray-700">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publishing Time
            </label>
            <select
              value={publishingTime}
              onChange={(e) => setPublishingTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select time</option>
              <option value="now">Publish Now</option>
              <option value="optimal">Optimal Time</option>
              <option value="custom">Custom Schedule</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region Settings
            </label>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <Globe className="h-5 w-5 text-gray-500" />
              <select className="bg-transparent border-none text-sm focus:ring-0">
                <option value="global">Global</option>
                <option value="us">United States</option>
                <option value="eu">Europe</option>
                <option value="asia">Asia</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Video Queue */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Publishing Queue</h3>
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-20 h-20 object-cover rounded"
              />
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{video.title}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-gray-500">{video.duration}</span>
                  <span className="text-sm text-gray-500">{video.platform}</span>
                  {video.scheduledTime && (
                    <span className="text-sm text-gray-500">
                      Scheduled: {video.scheduledTime}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getStatusIcon(video.status)}
                <span className={`text-sm ${getStatusColor(video.status)}`}>
                  {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                </span>
              </div>

              <button className="p-2 hover:bg-gray-200 rounded">
                <Settings className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Publish All
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}