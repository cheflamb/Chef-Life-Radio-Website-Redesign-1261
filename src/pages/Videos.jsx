import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlay, FiCalendar, FiEye, FiThumbsUp, FiSearch, FiFilter } = FiIcons;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Mock video data - Chef Life Radio focused content
        const mockVideos = [
          {
            id: 1,
            title: "Chef Life Radio: Breaking Toxic Kitchen Culture - Full Interview",
            description: "Watch the complete unedited interview that started the movement. Raw, honest conversation about transforming kitchen culture from the inside out.",
            youtubeId: "dQw4w9WgXcQ", // Replace with real YouTube IDs
            thumbnail: "/clr-podcast-cover.png",
            duration: "45:32",
            publishDate: "2024-01-15",
            views: 35420,
            likes: 2150,
            category: "Full Interview",
            featured: true
          },
          {
            id: 2,
            title: "CLR Highlights: The Mirror Moment That Changed Everything",
            description: "The most powerful 5 minutes from our breakthrough episode about self-awareness and leadership transformation.",
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "/clr-podcast-cover.png",
            duration: "5:23",
            publishDate: "2024-01-12",
            views: 18750,
            likes: 1890,
            category: "Highlight Reel",
            featured: false
          },
          {
            id: 3,
            title: "Chef Life Radio Short: From Line Cook to Leader",
            description: "Quick wisdom for busy culinary professionals. How to transition from surviving to thriving in 60 seconds.",
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "/clr-podcast-cover.png",
            duration: "1:15",
            publishDate: "2024-01-10",
            views: 22100,
            likes: 1650,
            category: "Short",
            featured: false
          },
          {
            id: 4,
            title: "Behind the Scenes: Chef Life Radio Studio Tour",
            description: "Get an exclusive look inside the Chef Life Radio studio where transformation happens. See where the magic is made.",
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "/clr-podcast-cover.png",
            duration: "8:45",
            publishDate: "2024-01-08",
            views: 12300,
            likes: 890,
            category: "Behind the Scenes",
            featured: false
          },
          {
            id: 5,
            title: "Chef Life Radio: The Emotional Depth of Leadership - Full Episode",
            description: "Deep dive into the emotional work required for true culinary leadership. This episode changed lives.",
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "/clr-podcast-cover.png",
            duration: "52:18",
            publishDate: "2024-01-05",
            views: 28900,
            likes: 2320,
            category: "Full Interview",
            featured: false
          },
          {
            id: 6,
            title: "CLR Quick Wisdom: Toxic vs. Tough - Know the Difference",
            description: "Essential insight for every kitchen leader. Learn to distinguish between being tough and being toxic.",
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "/clr-podcast-cover.png",
            duration: "2:45",
            publishDate: "2024-01-03",
            views: 41200,
            likes: 3150,
            category: "Short",
            featured: false
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 1000));
        setVideos(mockVideos);
        setSelectedVideo(mockVideos.find(v => v.featured) || mockVideos[0]);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const categories = ['all', 'Full Interview', 'Highlight Reel', 'Short', 'Behind the Scenes'];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <img
                src="/clr-podcast-cover.png"
                alt="Chef Life Radio Videos"
                className="w-32 h-32 rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="w-32 h-32 bg-gradient-to-br from-clr-red to-clr-gold rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ display: 'none' }}
              >
                <SafeIcon icon={FiPlay} className="text-white text-4xl" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold font-easterly text-gray-900 mb-4">
              Chef Life Radio <span className="gradient-text">Videos</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-poppins">
              Watch our most transformative podcast interviews, powerful highlight reels, and quick wisdom shorts. 
              See the conversations that are changing kitchen culture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Video Player */}
      {selectedVideo && !isLoading && (
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-video">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  width="100%"
                  height="100%"
                  controls
                  playing={false}
                />
              </div>
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-easterly">
                  {selectedVideo.title}
                </h2>
                <p className="text-gray-600 mb-4 font-poppins">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500 font-montserrat">
                    <div className="flex items-center">
                      <SafeIcon icon={FiCalendar} className="mr-1" />
                      {formatDate(selectedVideo.publishDate)}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiEye} className="mr-1" />
                      {formatViews(selectedVideo.views)} views
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiThumbsUp} className="mr-1" />
                      {formatViews(selectedVideo.likes)} likes
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-clr-red/10 text-clr-red rounded-full text-sm font-medium font-gotham">
                    {selectedVideo.category}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Video Library */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-clr-red focus:border-transparent font-poppins"
                />
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiFilter} className="text-gray-500" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors font-gotham ${
                      selectedCategory === category
                        ? 'bg-clr-red text-white'
                        : 'bg-white text-gray-700 hover:bg-clr-red/10 hover:text-clr-red'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Video Grid */}
          {isLoading ? (
            <div className="video-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-300"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="flex items-center space-x-4">
                      <div className="h-3 bg-gray-300 rounded w-16"></div>
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="video-grid">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                    selectedVideo?.id === video.id ? 'ring-2 ring-clr-red' : ''
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <SafeIcon icon={FiPlay} className="text-2xl text-gray-900 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-montserrat">
                      {video.duration}
                    </div>
                    {video.featured && (
                      <div className="absolute top-2 left-2 bg-clr-gold text-white text-xs px-2 py-1 rounded-full font-gotham">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 font-gotham">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-poppins">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <SafeIcon icon={FiEye} className="mr-1" />
                          {formatViews(video.views)}
                        </div>
                        <div className="flex items-center">
                          <SafeIcon icon={FiThumbsUp} className="mr-1" />
                          {formatViews(video.likes)}
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-clr-red/10 text-clr-red rounded-full font-gotham">
                        {video.category}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 font-montserrat">
                      {formatDate(video.publishDate)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredVideos.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg font-poppins">No videos found matching your criteria.</p>
            </div>
          )}

          {/* Subscribe Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <img
                src="/clr-podcast-cover.png"
                alt="Chef Life Radio Videos"
                className="w-24 h-24 rounded-xl shadow-lg mx-auto mb-6"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-easterly">
                Subscribe for More Transformation
              </h3>
              <p className="text-gray-600 mb-6 font-poppins">
                Never miss our latest interviews, highlights, and quick wisdom videos. 
                Subscribe to our YouTube channel and join the movement.
              </p>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-gotham font-semibold rounded-xl hover:bg-red-700 transition-colors"
                >
                  <SafeIcon icon={FiPlay} className="mr-2" />
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;