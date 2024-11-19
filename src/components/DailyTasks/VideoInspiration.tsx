import React, { useState, useEffect } from 'react';
import { Play, ThumbsUp, MessageSquare, Share2, Eye, Clock, Target, Users, Sparkles, ArrowRight, Download, Search } from 'lucide-react';

interface InspirationVideo {
  id: string;
  text: string;
  createTimeISO: string;
  webVideoUrl: string;
  videoMeta: {
    duration: number;
    coverUrl: string;
  };
  authorMeta: {
    name: string;
    avatar: string;
  };
  diggCount: number;
  shareCount: number;
  playCount: number;
  commentCount: number;
  collectCount: number;
  hashtags: string[];
  musicMeta: {
    musicName: string;
    musicAuthor: string;
    musicOriginal: boolean;
  };
}

export function VideoInspiration() {
  const [videos, setVideos] = useState<InspirationVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [videoLimit, setVideoLimit] = useState(10);
  const [isSearching, setIsSearching] = useState(false);
  const API_BASE_URL = 'http://localhost:8000';

  const fetchVideos = async (hashtags?: string, limit?: number) => {
    try {
      setLoading(true);
      setError(null);
      setVideos([]);
      
      // Format hashtags: remove special characters and spaces
      const formattedHashtags = hashtags
        ? hashtags
            .split(',')
            .map(tag => tag.trim().toLowerCase().replace(/[^a-z0-9]/g, ''))
            .filter(tag => tag)
            .join(',')
        : '';
      
      const url = new URL(`${API_BASE_URL}/api/inspiration-videos`);
      if (formattedHashtags) {
        url.searchParams.append('hashtags', formattedHashtags);
      }
      if (limit) {
        url.searchParams.append('limit', limit.toString());
      }
      
      console.log('Fetching videos from:', url.toString());
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout

      const response = await fetch(url.toString(), {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (!response.ok) {
        const errorMessage = data.detail?.message || data.detail || 'Failed to fetch inspiration videos';
        throw new Error(errorMessage);
      }
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected an array of videos');
      }
      
      if (data.length === 0) {
        setError('No videos found for the given hashtags. Try different hashtags or wait a few minutes and try again.');
        return;
      }
      
      setVideos(data);
    } catch (err) {
      console.error('Error fetching videos:', err);
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('The request took too long. The APIFY scraper might be busy. Please try again in a few minutes.');
        } else {
          setError(`Failed to load videos: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred while fetching videos. Please try again.');
      }
      setVideos([]);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    await fetchVideos(searchTerm.trim(), videoLimit);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (videos.length > 0) {
      console.log('Received videos data:', videos);
      // 验证数据完整性
      const hasEmptyFields = videos.some(video => 
        !video.id || 
        !video.authorMeta?.name ||
        !video.videoMeta?.duration
      );
      if (hasEmptyFields) {
        console.warn('Some videos have missing required fields');
      }
    }
  }, [videos]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Inspiration Videos</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter hashtags (e.g., skincare, beauty)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isSearching}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Separate multiple hashtags with commas (e.g., skincare, beauty, routine)
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-32">
              <label htmlFor="videoLimit" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Videos
              </label>
              <input
                type="number"
                id="videoLimit"
                min="1"
                max="50"
                value={videoLimit}
                onChange={(e) => setVideoLimit(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isSearching}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !searchTerm.trim()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <p className="mt-2 text-sm text-red-600">
                  Note: TikTok data scraping can sometimes be unreliable. If you continue to see errors, try:
                  <ul className="list-disc ml-5 mt-1">
                    <li>Using different hashtags</li>
                    <li>Waiting a few minutes before trying again</li>
                    <li>Reducing the number of requested videos</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">Video</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plays</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookmarks</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Time</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Music</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos.map((video) => (
                <tr key={video.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={video.authorMeta?.avatar || ''} 
                          alt={video.authorMeta?.name || 'Author'} 
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {video.authorMeta?.name || 'Unknown Author'}
                        </div>
                        <div className="text-sm text-gray-500 break-words line-clamp-2 max-w-xs">
                          {video.text || ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <a
                      href={video.webVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Watch
                    </a>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(video.playCount || 0)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(video.diggCount || 0)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(video.commentCount || 0)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(video.shareCount || 0)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(video.collectCount || 0)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDuration(video.videoMeta?.duration || 0)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {video.createTimeISO ? new Date(video.createTimeISO).toLocaleDateString() : 'Unknown Date'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="max-w-xs">
                      <div className="text-sm text-gray-900 truncate">{video.musicMeta?.musicName || 'Unknown Music'}</div>
                      <div className="text-sm text-gray-500 truncate">by {video.musicMeta?.musicAuthor || 'Unknown Artist'}</div>
                      {video.musicMeta?.musicOriginal && (
                        <span className="px-2 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                          Original
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {videos.length === 0 && !loading && !error && (
        <div className="text-center py-8 text-gray-500">
          Enter hashtags above and click search to find TikTok videos.
        </div>
      )}
    </div>
  );
}