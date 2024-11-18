import React, { useState, useEffect } from 'react';
import { Play, ThumbsUp, MessageSquare, Share2, Eye, Clock, Target, Users, Sparkles, ArrowRight, Download } from 'lucide-react';

interface InspirationVideo {
  id: string;
  thumbnail: string;
  title: string;
  creator: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  duration: string;
  category: string;
  targetAudience: string;
  similarityScore: number;
  keyTakeaways: string[];
}

export function VideoInspiration() {
  const [videos, setVideos] = useState<InspirationVideo[]>([
    {
      id: '1',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600',
      title: 'Morning Skincare Routine 2024',
      creator: '@beautyexpert',
      views: '1.2M',
      likes: '245K',
      comments: '3.2K',
      shares: '15K',
      duration: '0:45',
      category: 'Beauty & Skincare',
      targetAudience: 'Women 18-34',
      similarityScore: 92,
      keyTakeaways: [
        'Quick, engaging transitions',
        'Product close-ups with text overlays',
        'Natural lighting techniques'
      ]
    },
    {
      id: '2',
      thumbnail: 'https://images.unsplash.com/photo-1596273312170-6c05c3021adf?w=400&h=600',
      title: '5 Must-Have Beauty Tools',
      creator: '@glowguide',
      views: '890K',
      likes: '178K',
      comments: '2.8K',
      shares: '12K',
      duration: '0:60',
      category: 'Beauty & Skincare',
      targetAudience: 'Women 25-45',
      similarityScore: 88,
      keyTakeaways: [
        'Educational content format',
        'Before/after demonstrations',
        'Expert tips integration'
      ]
    },
    {
      id: '3',
      thumbnail: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&h=600',
      title: 'Night Skincare Secrets',
      creator: '@skincarepro',
      views: '950K',
      likes: '200K',
      comments: '4.1K',
      shares: '18K',
      duration: '0:55',
      category: 'Beauty & Skincare',
      targetAudience: 'Women 20-40',
      similarityScore: 85,
      keyTakeaways: [
        'Relaxing ambiance setup',
        'Step-by-step routine guide',
        'Product layering techniques'
      ]
    },
    {
      id: '4',
      thumbnail: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&h=600',
      title: 'Anti-Aging Essentials',
      creator: '@agelessbeauty',
      views: '780K',
      likes: '156K',
      comments: '2.9K',
      shares: '14K',
      duration: '0:50',
      category: 'Beauty & Skincare',
      targetAudience: 'Women 30-50',
      similarityScore: 82,
      keyTakeaways: [
        'Scientific explanations',
        'Ingredient spotlights',
        'Long-term benefits focus'
      ]
    },
    {
      id: '5',
      thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=600',
      title: 'Quick Makeup Transformation',
      creator: '@makeupmaster',
      views: '1.1M',
      likes: '220K',
      comments: '3.8K',
      shares: '16K',
      duration: '0:40',
      category: 'Beauty & Skincare',
      targetAudience: 'Women 18-35',
      similarityScore: 90,
      keyTakeaways: [
        'Time-saving techniques',
        'Product application hacks',
        'Professional finish tips'
      ]
    },
    {
      id: '6',
      thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=600',
      title: 'Viral Beauty Hacks Tested',
      creator: '@beautyhacker',
      views: '1.5M',
      likes: '280K',
      comments: '5.2K',
      shares: '22K',
      duration: '0:58',
      category: 'Beauty & Skincare',
      targetAudience: 'Women 18-40',
      similarityScore: 87,
      keyTakeaways: [
        'Trend analysis',
        'Reality vs expectations',
        'Money-saving alternatives'
      ]
    }
  ]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Sparkles className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Today's Video Inspiration</h2>
              <p className="text-gray-600">Curated content based on your niche and style</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download className="h-5 w-5" />
            <span>Export Insights</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Your Niche</span>
            </div>
            <p className="text-gray-700">Beauty & Skincare</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Target Audience</span>
            </div>
            <p className="text-gray-700">Women, 18-35</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Best Posting Time</span>
            </div>
            <p className="text-gray-700">7:00 PM - 9:00 PM</p>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Video Preview */}
            <div className="relative aspect-[9/16] bg-gray-900">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                  <Play className="h-8 w-8 text-white" />
                </button>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                {video.duration}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white font-semibold mb-1">{video.title}</h3>
                <p className="text-white/80 text-sm">{video.creator}</p>
              </div>
            </div>

            {/* Video Stats */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {video.similarityScore}% Match
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{video.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{video.likes}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Takeaways</h4>
                  <div className="space-y-1">
                    {video.keyTakeaways.map((takeaway, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-indigo-600 mt-1" />
                        <p className="text-sm text-gray-600">{takeaway}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
                  <Sparkles className="h-4 w-4" />
                  <span>Get More Insights</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}