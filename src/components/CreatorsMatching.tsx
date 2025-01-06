import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Award, Sparkles, MessageSquare, AlertCircle, Loader2, TrendingUp, Star, Clock } from 'lucide-react';
import os from 'os';
import icon from '../assets/grey_human_icon.jpg';
interface Creator {
  id: string;
  name: string;
  avatar: string;
  category: {
    id: string;
    name: string;};
  followers: string;
  engagement: string;
  specialties: string[];
  recent_work: string[];
  rating: number;
  response_time: string;
  price: string;
}

interface Category{
  id: string;
  name: string;
}

export function CreatorsMatching() {
  const [filters, setFilters] = useState({
    category: '',
    minFollowers: '',
    maxBudget: '',
    specialties: [] as string[]
  });

  // const [creators, setCreators] = useState<Creator[]>([
  //   {
  //     id: '1',
  //     name: 'Sarah Chen',
  //     avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  //     category: 'Fashion & Lifestyle',
  //     followers: '250K',
  //     engagement: '4.8%',
  //     specialties: ['Fashion', 'Beauty', 'Lifestyle'],
  //     recentWork: ['Zara Campaign', 'Beauty Tutorial Series'],
  //     rating: 4.9,
  //     responseTime: '< 2 hours',
  //     price: '$1,000 - $3,000'
  //   },
  //   {
  //     id: '2',
  //     name: 'Alex Rivera',
  //     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  //     category: 'Tech & Gaming',
  //     followers: '500K',
  //     engagement: '5.2%',
  //     specialties: ['Gaming', 'Tech Reviews', 'Streaming'],
  //     recentWork: ['Gaming Hardware Review', 'Live Stream Series'],
  //     rating: 4.8,
  //     responseTime: '< 1 hour',
  //     price: '$2,000 - $5,000'
  //   },
  //   {
  //     id: '3',
  //     name: 'Emma Thompson',
  //     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  //     category: 'Health & Wellness',
  //     followers: '750K',
  //     engagement: '6.1%',
  //     specialties: ['Fitness', 'Nutrition', 'Wellness'],
  //     recentWork: ['Nike Fitness Campaign', 'Wellness Workshop'],
  //     rating: 5.0,
  //     responseTime: '< 3 hours',
  //     price: '$3,000 - $7,000'
  //   },
  //   {
  //     id: '4',
  //     name: 'David Kim',
  //     avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  //     category: 'Food & Cooking',
  //     followers: '1.2M',
  //     engagement: '4.5%',
  //     specialties: ['Cooking', 'Recipe Development', 'Food Photography'],
  //     recentWork: ['HelloFresh Partnership', 'Cooking Show Series'],
  //     rating: 4.7,
  //     responseTime: '< 4 hours',
  //     price: '$2,500 - $6,000'
  //   }
  // ]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const creatorsPerPage = 5;

  // Fetch creators data on component load
  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/api/creators`);
        if (!response.ok) {
          throw new Error('Failed to fetch creators data');
        }
        const data = await response.json();
        setCreators(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/api/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories data');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchCreators();
    fetchCategories();
    
  }, []);

  // Calculate the creators to display based on the current page
  const indexOfLastCreator = currentPage * creatorsPerPage;
  const indexOfFirstCreator = indexOfLastCreator - creatorsPerPage;
  const currentCreators = creators.slice(indexOfFirstCreator, indexOfLastCreator);

  // Pagination controls
  let totalPages = Math.ceil(creators.length / creatorsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Filters:', filters);
    setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/api/creators/${filters.category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories data');
        }
        const data = await response.json();
        setCreators(data);
        setCurrentPage(1);
        totalPages = Math.ceil(creators.length / creatorsPerPage);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Creator Matching</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min. Followers
                </label>
                <input
                  type="text"
                  value={filters.minFollowers}
                  onChange={(e) => setFilters({ ...filters, minFollowers: e.target.value })}
                  placeholder="e.g., 100K"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Budget
                </label>
                <input
                  type="text"
                  value={filters.maxBudget}
                  onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                  placeholder="e.g., $5000"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search Creators
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Trending Categories */}
          <div className="bg-white p-6 rounded-xl shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Trending Categories</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
                <span>Fashion & Lifestyle</span>
                <TrendingUp className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
                <span>Tech Reviews</span>
                <TrendingUp className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
                <span>Wellness</span>
                <TrendingUp className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {currentCreators.map((creator) => (
              <div key={creator.id} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <img
                    src={icon}
                    alt={creator.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{creator.name}</h3>
                        <p className="text-gray-600">{creator.category.name}</p>
                      </div>
                      <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors">
                        Connect
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Followers</div>
                        <div className="text-lg font-semibold text-gray-900">{creator.followers}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Engagement Rate</div>
                        <div className="text-lg font-semibold text-gray-900">{creator.engagement}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Price Range</div>
                        <div className="text-lg font-semibold text-gray-900">{creator.price}</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {creator.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Work</h4>
                      <div className="flex flex-wrap gap-2">
                        {creator.recent_work.map((work, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {work}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium">{creator.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">Response Time: {creator.response_time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
          </div>

          {/* Success Stories */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium">Fashion Campaign</h3>
                </div>
                <p className="text-sm text-gray-600">
                  300% ROI increase with Sarah Chen's influencer marketing campaign
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">Tech Product Launch</h3>
                </div>
                <p className="text-sm text-gray-600">
                  5x engagement boost with Alex Rivera's product review series
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}