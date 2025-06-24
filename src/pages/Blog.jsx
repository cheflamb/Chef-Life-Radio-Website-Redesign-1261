import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiUser, FiArrowRight, FiSearch, FiTag } = FiIcons;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const mockPosts = [
          {
            id: 1,
            title: "The Mirror Doesn't Lie: Why Self-Awareness Is Your Kitchen's Missing Ingredient",
            excerpt: "We hold up mirrors, not because we're cruel, but because we're kind. Sometimes the most loving thing we can do is show you what you can't see yourself.",
            content: "Full article content here...",
            author: "Chef Life Radio Team",
            publishDate: "2024-01-15",
            readTime: "6 min read",
            category: "Transformation",
            tags: ["self-awareness", "toxic culture", "leadership", "mirror work"],
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            slug: "the-mirror-doesnt-lie-self-awareness",
            featured: true,
            brandVoice: "introspective-edge"
          },
          {
            id: 2,
            title: "Breaking the Kitchen's Toxic Normal: What We've Normalized That Shouldn't Be",
            excerpt: "Just because something is common doesn't make it healthy. We challenge the 'that's just how kitchens are' mentality because normal doesn't mean right.",
            content: "Full article content here...",
            author: "Maria Rodriguez",
            publishDate: "2024-01-12",
            readTime: "8 min read",
            category: "Culture Change",
            tags: ["toxic culture", "kitchen culture", "leadership", "transformation"],
            imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            slug: "breaking-kitchen-toxic-normal",
            featured: false,
            brandVoice: "restorative-rebel"
          },
          {
            id: 3,
            title: "From Survival Mode to Leadership: The Emotional Work Nobody Talks About",
            excerpt: "Moving from line cook to leader isn't just about technical skills. It's about the emotional depth required to transform yourself and those around you.",
            content: "Full article content here...",
            author: "David Chen",
            publishDate: "2024-01-10",
            readTime: "7 min read",
            category: "Leadership",
            tags: ["emotional intelligence", "leadership", "personal growth", "kitchen management"],
            imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            slug: "survival-mode-to-leadership",
            featured: false,
            brandVoice: "emotional-depth"
          },
          {
            id: 4,
            title: "The Operational Truth: Building Systems That Support Humans, Not Break Them",
            excerpt: "Efficiency without humanity is just sophisticated brutality. Here's how to build operational systems that honor both performance and people.",
            content: "Full article content here...",
            author: "Sarah Johnson",
            publishDate: "2024-01-08",
            readTime: "9 min read",
            category: "Operations",
            tags: ["systems", "operations", "human-centered design", "kitchen management"],
            imageUrl: "https://images.unsplash.com/photo-1556909114-4f6e4d6d0c5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            slug: "operational-truth-human-systems",
            featured: false,
            brandVoice: "operational-coach"
          },
          {
            id: 5,
            title: "The Sardonic Truth About 'Passion' in the Kitchen",
            excerpt: "They told us to follow our passion. They didn't mention passion could become a prison. Let's talk about the uncomfortable truth behind culinary 'calling.'",
            content: "Full article content here...",
            author: "Chef Life Radio Team",
            publishDate: "2024-01-05",
            readTime: "5 min read",
            category: "Mindset",
            tags: ["passion", "burnout", "career", "reality check"],
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            slug: "sardonic-truth-about-passion",
            featured: false,
            brandVoice: "sardonic-mystic"
          },
          {
            id: 6,
            title: "Gritty Resolve: When the Kitchen Tests Your Soul",
            excerpt: "Every chef faces moments that test their resolve. Not the flashy TV moments—the real ones. The 3 AM inventory. The staff walkout. The moments that forge you or break you.",
            content: "Full article content here...",
            author: "Maria Rodriguez",
            publishDate: "2024-01-03",
            readTime: "6 min read",
            category: "Resilience",
            tags: ["resilience", "mental toughness", "perseverance", "chef life"],
            imageUrl: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            slug: "gritty-resolve-kitchen-tests-soul",
            featured: false,
            brandVoice: "gritty-resolve"
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 1000));
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = ['all', 'Transformation', 'Culture Change', 'Leadership', 'Operations', 'Mindset', 'Resilience'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBrandVoiceStyles = (voice) => {
    const styles = {
      'sardonic-mystic': 'border-l-4 border-clr-red italic',
      'restorative-rebel': 'border-l-4 border-clr-gold font-semibold',
      'operational-coach': 'border-l-4 border-clr-blue',
      'emotional-depth': 'border-l-4 border-clr-red',
      'introspective-edge': 'border-l-4 border-clr-gold italic',
      'gritty-resolve': 'border-l-4 border-clr-red font-bold'
    };
    return styles[voice] || '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-clr-red/10 to-clr-gold/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold font-easterly text-gray-900 mb-4">
              The <span className="gradient-text">Mirror</span> Chronicles
            </h1>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl text-gray-700 font-poppins">
                We don't write to make you feel better. We write to make you get better.
              </p>
              <blockquote className="brand-voice-quote text-lg text-clr-red border-l-4 border-clr-gold pl-6 italic font-montserrat">
                "Sometimes the most loving thing we can do is show you what you can't see yourself."
              </blockquote>
              <p className="text-base text-clr-blue font-poppins">
                Raw insights on transforming kitchen culture, leadership, and the messy work of professional growth.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-clr-red focus:border-transparent font-poppins"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors font-gotham ${
                    selectedCategory === category
                      ? 'bg-clr-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-clr-red/10 hover:text-clr-red'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="flex items-center space-x-4">
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {currentPosts.find(post => post.featured) && (
                <motion.div
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {(() => {
                    const featuredPost = currentPosts.find(post => post.featured);
                    return (
                      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-clr-gold">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          <div className="relative h-64 lg:h-auto">
                            <img
                              src={featuredPost.imageUrl}
                              alt={featuredPost.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-clr-gold text-white px-4 py-2 rounded-full font-medium font-gotham">
                              Featured Mirror
                            </div>
                          </div>
                          <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4 font-montserrat">
                              <div className="flex items-center">
                                <SafeIcon icon={FiUser} className="mr-1" />
                                {featuredPost.author}
                              </div>
                              <div className="flex items-center">
                                <SafeIcon icon={FiCalendar} className="mr-1" />
                                {formatDate(featuredPost.publishDate)}
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-gotham ${
                                featuredPost.category === 'Transformation' ? 'bg-clr-red/10 text-clr-red' :
                                featuredPost.category === 'Culture Change' ? 'bg-clr-gold/10 text-clr-gold' :
                                'bg-clr-blue/10 text-clr-blue'
                              }`}>
                                {featuredPost.category}
                              </span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-easterly">
                              {featuredPost.title}
                            </h2>
                            <div className={`mb-6 pl-4 ${getBrandVoiceStyles(featuredPost.brandVoice)}`}>
                              <p className="text-gray-600 text-lg font-poppins">
                                {featuredPost.excerpt}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500 font-montserrat">{featuredPost.readTime}</span>
                              <Link
                                to={`/blog/${featuredPost.slug}`}
                                className="inline-flex items-center px-6 py-3 gradient-bg text-white font-gotham font-semibold rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                              >
                                Read the Mirror
                                <SafeIcon icon={FiArrowRight} className="ml-2" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.filter(post => !post.featured).map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium font-gotham ${
                        post.category === 'Transformation' ? 'bg-clr-red text-white' :
                        post.category === 'Culture Change' ? 'bg-clr-gold text-white' :
                        post.category === 'Leadership' ? 'bg-clr-blue text-white' :
                        post.category === 'Operations' ? 'bg-clr-gray text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3 font-montserrat">
                        <div className="flex items-center">
                          <SafeIcon icon={FiUser} className="mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <SafeIcon icon={FiCalendar} className="mr-1" />
                          {formatDate(post.publishDate)}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 font-gotham">
                        {post.title}
                      </h3>
                      
                      <div className={`mb-4 pl-3 ${getBrandVoiceStyles(post.brandVoice)}`}>
                        <p className="text-gray-600 line-clamp-3 font-poppins">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-montserrat">{post.readTime}</span>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center text-clr-red hover:text-clr-gold font-medium transition-colors font-gotham"
                        >
                          Read More
                          <SafeIcon icon={FiArrowRight} className="ml-1 text-sm" />
                        </Link>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
                        <SafeIcon icon={FiTag} className="text-gray-400 text-sm" />
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-montserrat">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-16">
                  <nav className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors font-gotham ${
                          currentPage === i + 1
                            ? 'bg-clr-red text-white'
                            : 'bg-white text-gray-700 hover:bg-clr-red/10 hover:text-clr-red'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </>
          )}

          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg font-poppins">No mirrors found for that search.</p>
              <p className="text-sm text-gray-400 mt-2 font-montserrat">Try adjusting your search terms or categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-clr-red to-clr-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-easterly">
              Ready to Look in the Mirror?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-poppins">
              Join thousands of culinary professionals who've stopped pretending everything is fine and started doing the real work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/podcast"
                className="inline-flex items-center px-8 py-4 bg-white text-clr-red font-gotham font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Start Listening
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white font-gotham font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-clr-red transition-colors"
              >
                Share Your Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;