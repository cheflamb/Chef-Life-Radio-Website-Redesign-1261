import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiUser, FiArrowLeft, FiShare2, FiHeart, FiBookmark, FiTag } = FiIcons;

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Mock post data - in real implementation, fetch based on slug
        const mockPost = {
          id: 1,
          title: "10 Essential Knife Skills Every Home Cook Should Master",
          content: `
            <p>Knife skills are the foundation of great cooking. Whether you're a beginner or looking to refine your technique, mastering these essential cuts will transform your time in the kitchen.</p>
            
            <h2>The Basic Cuts</h2>
            <p>Every chef needs to know these fundamental knife cuts:</p>
            
            <h3>1. The Rock Chop</h3>
            <p>The rock chop is your go-to technique for most chopping tasks. Keep the tip of your knife on the cutting board and use a rocking motion to slice through ingredients.</p>
            
            <h3>2. Julienne</h3>
            <p>Perfect matchstick cuts that cook evenly and look professional. Start with a stable base by cutting a small slice off one side of your ingredient.</p>
            
            <h3>3. Brunoise</h3>
            <p>Tiny, uniform cubes perfect for mirepoix and garnishes. This precise cut requires patience but elevates any dish.</p>
            
            <h2>Safety First</h2>
            <p>Remember these safety tips:</p>
            <ul>
              <li>Keep your knives sharp - dull knives are dangerous</li>
              <li>Use the claw grip to protect your fingers</li>
              <li>Cut on a stable surface with a cutting board</li>
              <li>Take your time - speed comes with practice</li>
            </ul>
            
            <h2>Practice Makes Perfect</h2>
            <p>Like any skill, knife work improves with practice. Start with softer vegetables like onions and peppers before moving to harder ingredients.</p>
          `,
          excerpt: "Learn the fundamental knife techniques that will transform your cooking and make meal prep faster and more enjoyable.",
          author: "Chef Maria Rodriguez",
          publishDate: "2024-01-15",
          readTime: "5 min read",
          category: "Techniques",
          tags: ["knife skills", "cooking basics", "techniques"],
          imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          slug: "essential-knife-skills-home-cook"
        };

        const mockRelatedPosts = [
          {
            id: 2,
            title: "The Art of French Mother Sauces",
            slug: "french-mother-sauces-guide",
            imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          },
          {
            id: 3,
            title: "Farm-to-Table: Building Relationships",
            slug: "farm-to-table-local-suppliers",
            imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 1000));
        setPost(mockPost);
        setRelatedPosts(mockRelatedPosts);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link to="/blog" className="text-amber-600 hover:text-amber-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="mr-2" />
            Back to Blog
          </Link>

          {/* Hero Image */}
          <motion.div
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </motion.div>

          {/* Article Header */}
          <motion.header
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <SafeIcon icon={FiUser} className="mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiCalendar} className="mr-1" />
                {formatDate(post.publishDate)}
              </div>
              <span>{post.readTime}</span>
              <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTag} className="text-gray-400" />
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-amber-600 transition-colors">
                  <SafeIcon icon={FiShare2} />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                  <SafeIcon icon={FiHeart} />
                </button>
                <button className="p-2 text-gray-500 hover:text-amber-600 transition-colors">
                  <SafeIcon icon={FiBookmark} />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            className="prose prose-lg max-w-none mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              className="mt-16 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <img
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;