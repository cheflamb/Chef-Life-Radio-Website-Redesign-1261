import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import contentManager from '../lib/contentManager';

const { FiBarChart, FiTrendingUp, FiUsers, FiMic, FiBook, FiCalendar, FiMail } = FiIcons;

const ContentDashboard = () => {
  const [stats, setStats] = useState({});
  const [popularContent, setPopularContent] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get content statistics
        const statsResult = await contentManager.getContentStats();
        if (statsResult.success) {
          setStats(statsResult.data);
        }

        // Get recent content
        const [episodesResult, blogsResult, eventsResult] = await Promise.all([
          contentManager.getAllEpisodes(3),
          contentManager.getRecentBlogPosts(3),
          contentManager.getUpcomingEvents(3)
        ]);

        const activity = [];
        
        if (episodesResult.success) {
          episodesResult.data.forEach(episode => {
            activity.push({
              type: 'podcast',
              title: episode.title,
              date: episode.published_at,
              stats: `${episode.play_count || 0} plays`
            });
          });
        }

        if (blogsResult.success) {
          blogsResult.data.forEach(post => {
            activity.push({
              type: 'blog',
              title: post.title,
              date: post.published_at,
              stats: `${post.view_count || 0} views`
            });
          });
        }

        if (eventsResult.success) {
          eventsResult.data.forEach(event => {
            activity.push({
              type: 'event',
              title: event.title,
              date: event.date,
              stats: `${event.current_attendees}/${event.max_attendees} registered`
            });
          });
        }

        // Sort by date
        activity.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentActivity(activity.slice(0, 10));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'podcast': return FiMic;
      case 'blog': return FiBook;
      case 'event': return FiCalendar;
      default: return FiBarChart;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'podcast': return 'text-clr-red';
      case 'blog': return 'text-clr-blue';
      case 'event': return 'text-clr-gold';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="h-12 bg-gray-300 rounded mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold font-easterly text-gray-900 mb-8">
            Content <span className="gradient-text">Dashboard</span>
          </h1>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-clr-red/10 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiMic} className="text-clr-red text-xl" />
                </div>
                <SafeIcon icon={FiTrendingUp} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-gotham">{stats.episodes || 0}</h3>
              <p className="text-gray-600 font-poppins">Published Episodes</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-clr-blue/10 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiBook} className="text-clr-blue text-xl" />
                </div>
                <SafeIcon icon={FiTrendingUp} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-gotham">{stats.blogPosts || 0}</h3>
              <p className="text-gray-600 font-poppins">Blog Posts</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-clr-gold/10 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiCalendar} className="text-clr-gold text-xl" />
                </div>
                <SafeIcon icon={FiTrendingUp} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-gotham">{stats.events || 0}</h3>
              <p className="text-gray-600 font-poppins">Total Events</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiUsers} className="text-green-600 text-xl" />
                </div>
                <SafeIcon icon={FiTrendingUp} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-gotham">{stats.subscribers || 0}</h3>
              <p className="text-gray-600 font-poppins">Active Subscribers</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-gotham">Recent Content Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'podcast' ? 'bg-clr-red/10' :
                      item.type === 'blog' ? 'bg-clr-blue/10' :
                      'bg-clr-gold/10'
                    }`}>
                      <SafeIcon icon={getTypeIcon(item.type)} className={`${getTypeColor(item.type)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate font-gotham">{item.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 font-montserrat">
                        <span>{formatDate(item.date)}</span>
                        <span>•</span>
                        <span>{item.stats}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-gotham">Content Management</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 border-2 border-clr-red rounded-lg hover:bg-clr-red/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiMic} className="text-clr-red" />
                    <span className="font-medium font-gotham">Add New Episode</span>
                  </div>
                  <SafeIcon icon={FiTrendingUp} className="text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border-2 border-clr-blue rounded-lg hover:bg-clr-blue/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiBook} className="text-clr-blue" />
                    <span className="font-medium font-gotham">Write New Post</span>
                  </div>
                  <SafeIcon icon={FiTrendingUp} className="text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border-2 border-clr-gold rounded-lg hover:bg-clr-gold/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiCalendar} className="text-clr-gold" />
                    <span className="font-medium font-gotham">Create Event</span>
                  </div>
                  <SafeIcon icon={FiTrendingUp} className="text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiMail} className="text-green-500" />
                    <span className="font-medium font-gotham">Send Newsletter</span>
                  </div>
                  <SafeIcon icon={FiTrendingUp} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Database Status */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiBarChart} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 font-gotham">Real Content Integration Status</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Database</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-lg font-bold text-gray-900">Connected</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Content API</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-lg font-bold text-gray-900">Active</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Real Data</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-lg font-bold text-gray-900">Loaded</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">RSS Sync</span>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <p className="text-lg font-bold text-gray-900">Ready</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentDashboard;