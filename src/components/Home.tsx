import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Video, 
  Upload, 
  BarChart2, 
  ArrowRight,
  Users,
  Target,
  Package,
  Pen,
  Bot,
  ClipboardList
} from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 rounded-3xl" />
        <div className="relative h-[500px] rounded-3xl overflow-hidden">
          <img 
            src="https://www.veeqo.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fhfb264dqso7g%2F6mkY1naGAJTZ26Dzc34TK7%2F0855964747c7494c4d0d8c46dff9861f%2Ftiktok_shop_guide.jpg&w=2560&q=75"
            alt="Social Media Content Creation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-3xl mx-auto text-center px-4">
              <h1 className="text-5xl font-bold text-white mb-6">
                Transform Your Social Commerce with our all-in-one AI platform
              </h1>
           
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Go to my dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Our End-to-End AI Solution
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From market research to inventory management, our AI-powered platform provides everything you need to succeed in social commerce. Analyze markets, create engaging content, manage campaigns, and optimize your operations - all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <Link
          to="/market-research"
          className="group relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/90" />
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
            alt="Market Research"
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <BarChart2 className="h-8 w-8 text-indigo-400" />
              <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Market Research</h2>
            <p className="text-gray-200 text-sm">
              AI-powered market analysis and competitor insights
            </p>
          </div>
        </Link>

        <Link
          to="/strategy"
          className="group relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/90" />
          <img 
            src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80"
            alt="Strategy Creation"
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <Pen className="h-8 w-8 text-purple-400" />
              <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Strategy Creation</h2>
            <p className="text-gray-200 text-sm">
              Data-driven marketing strategies and planning
            </p>
          </div>
        </Link>

        <Link
          to="/content"
          className="group relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/90" />
          <img 
            src="https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?auto=format&fit=crop&w=800&q=80"
            alt="Video Production"
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <Video className="h-8 w-8 text-purple-400" />
              <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Video Production</h2>
            <p className="text-gray-200 text-sm">
              Create trending short-form videos with AI assistance
            </p>
          </div>
        </Link>

        <Link
          to="/creators"
          className="group relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-900/90" />
          <img 
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=800&q=80"
            alt="Influencer Marketing"
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-pink-400" />
              <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Creator Network</h2>
            <p className="text-gray-200 text-sm">
              Connect with trending influencers and creators
            </p>
          </div>
        </Link>

        <Link
          to="/copilot"
          className="group relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/90" />
          <img 
            src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80"
            alt="AI Assistant"
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <Bot className="h-8 w-8 text-blue-400" />
              <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Live Co-pilot</h2>
            <p className="text-gray-200 text-sm">
              Real-time AI assistance for your live streams
            </p>
          </div>
        </Link>

        <Link
          to="/campaigns"
          className="group relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/90" />
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
            alt="Ad Campaigns"
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-indigo-400" />
              <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Ad Campaigns</h2>
            <p className="text-gray-200 text-sm">
              Smart ad placement and optimization using AI
            </p>
          </div>
        </Link>

        <Link
          to="/crm"
          className="group relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/90" />
          <img 
            src="https://s29814.pcdn.co/wp-content/uploads/2022/10/Shutterstock_749265139-1.png.webp"
            alt="CRM"
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <ClipboardList className="h-8 w-8 text-purple-400" />
              <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Smart CRM</h2>
            <p className="text-gray-200 text-sm">
              AI-powered customer relationship management
            </p>
          </div>
        </Link>

        <Link
          to="/inventory"
          className="group relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-900/90" />
          <img 
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80"
            alt="Inventory"
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <Package className="h-8 w-8 text-pink-400" />
              <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Inventory</h2>
            <p className="text-gray-200 text-sm">
              Smart inventory management with predictive analytics
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;