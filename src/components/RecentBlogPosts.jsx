import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const { FiCalendar, FiUser, FiArrowRight } = FiIcons;

const RecentBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts_clr2024')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;

        if (data && data.length > 0) {
          setPosts(data);
        } else {
          // Fallback to mock data if no real data exists
          const mockPosts = [
            {
              id: 1,
              title: "The Mirror Doesn't Lie: Why Self-Awareness Is Your Kitchen's Missing Ingredient",
              excerpt: "We hold up mirrors, not because we're cruel, but because we're kind. Sometimes the most loving thing we can do is show you what you can't see yourself.",
              author: "Chef Life Radio Team",
              published_at: "2024-01-15",
              read_time: "6 min read",
              image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              slug: "the-mirror-doesnt-lie-self-awareness",
              category: "Transformation",
              brand_voice: "introspective-edge"
            },
            {
              id: 2,
              title: "Breaking the Kitchen's Toxic Normal: What We've Normalized That Shouldn't Be",
              excerpt: "Just because something is common doesn't make it healthy. We challenge the 'that's just how kitchens are' mentality because normal doesn't mean right.",
              author: "Maria Rodriguez",
              published_at: "2024-01-12",
              read_time: "8 min read",
              image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              slug: "breaking-kitchen-toxic-normal",
              category: "Culture Change",
              brand_voice: "restorative-rebel"
            },
            {
              id: 3,
              title: "From Survival Mode to Leadership: The Emotional Work Nobody Talks About",
              excerpt: "Moving from line cook to leader isn't just about technical skills. It's about the emotional depth required to transform yourself and those around you.",
              author: "David Chen",
              published_at: "2024-01-10",
              read_time: "7 min read",
              image_url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              slug: "survival-mode-to-leadership",
              category: "Leadership",
              brand_voice: "emotional-depth"
            }
          ];
          setPosts(mockPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback to mock data on error
        const mockPosts = [
          {
            id: 1,
            title: "The Mirror Doesn't Lie: Why Self-Awareness Is Your Kitchen's Missing Ingredient",
            excerpt: "We hold up mirrors, not because we're cruel, but because we're kind. Sometimes the most loving thing we can do is show you what you can't see yourself.",
            author: "Chef Life Radio Team",
            published_at: "2024-01-15",
            read_time: "6 min read",
            image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            slug: "the-mirror-doesnt-lie-self-awareness",
            category: "Transformation",
            brand_voice: "introspective-edge"
          }
        ];
        setPosts(mockPosts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium font-gotham ${
              post.category === 'Transformation' ? 'bg-clr-red text-white' :
              post.category === 'Culture Change' ? 'bg-clr-gold text-white' :
              post.category === 'Leadership' ? 'bg-clr-blue text-white' :
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
                {formatDate(post.published_at)}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 font-gotham">
              {post.title}
            </h3>
            <div className={`mb-4 pl-3 ${getBrandVoiceStyles(post.brand_voice)}`}>
              <p className="text-gray-600 line-clamp-3 font-poppins">
                {post.excerpt}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-montserrat">{post.read_time}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center text-clr-red hover:text-clr-gold font-medium transition-colors font-gotham"
              >
                Read the Mirror
                <SafeIcon icon={FiArrowRight} className="ml-1 text-sm" />
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default RecentBlogPosts;