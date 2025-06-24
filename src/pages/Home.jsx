import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PodcastPlayer from '../components/PodcastPlayer';
import NewsletterSignup from '../components/NewsletterSignup';
import RecentBlogPosts from '../components/RecentBlogPosts';
import UpcomingEvents from '../components/UpcomingEvents';

const { FiPlay, FiMic, FiUsers, FiAward, FiTrendingUp, FiStar, FiCalendar, FiBook, FiTarget } = FiIcons;

const Home = () => {
  const [stats, setStats] = useState({
    episodes: 0,
    listeners: 0,
    reviews: 0,
    years: 0
  });

  useEffect(() => {
    const targetStats = {
      episodes: 150,
      listeners: 25000,
      reviews: 500,
      years: 3
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setStats({
        episodes: Math.floor(targetStats.episodes * progress),
        listeners: Math.floor(targetStats.listeners * progress),
        reviews: Math.floor(targetStats.reviews * progress),
        years: Math.floor(targetStats.years * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo Integration in Hero */}
              <div className="flex items-center space-x-4 mb-8">
                <img 
                  src="/clr-logo-main.png" 
                  alt="Chef Life Radio Logo" 
                  className="h-20 w-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-20 h-20 bg-clr-red rounded-2xl flex items-center justify-center" 
                  style={{ display: 'none' }}
                >
                  <SafeIcon icon={FiMic} className="text-white text-3xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-gotham font-bold text-black">Chef Life Radio</h1>
                  <p className="text-sm text-gray-600 font-montserrat uppercase tracking-wider">Transform Your Journey</p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-6xl lg:text-7xl font-gotham font-bold text-black leading-tight">
                  We Don't Just{' '}
                  <span className="text-clr-red">Inspire</span>
                  <br />
                  <span className="text-clr-gold">We Transform</span>
                </h2>
                
                <div className="space-y-6">
                  <p className="text-xl font-poppins text-black leading-relaxed">
                    For chefs who feel like something's missing, even when the plates are perfect.
                  </p>
                  
                  <blockquote className="text-lg text-gray-600 border-l-4 border-clr-gold pl-6 italic font-montserrat">
                    "We speak with the gritty resolve of a line cook, the introspective edge of a coach, 
                    and the emotional depth of a leader who's been through the fire."
                  </blockquote>
                  
                  <p className="text-base font-poppins text-black">
                    <strong>Equal parts sardonic mystic, restorative rebel, and operational coach.</strong> 
                    We challenge the toxic norms of kitchen culture and hold up a mirror to what's possible.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/podcast"
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-gotham font-semibold hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <SafeIcon icon={FiPlay} className="mr-2" />
                  Start Your Transformation
                </Link>
                <Link
                  to="/about"
                  className="btn-outline inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-gotham font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Our Story
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-gotham font-bold text-clr-red">{stats.episodes}+</div>
                  <div className="text-sm text-gray-600 font-montserrat uppercase tracking-wide">Episodes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-gotham font-bold text-clr-red">{stats.listeners.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600 font-montserrat uppercase tracking-wide">Transformed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-gotham font-bold text-clr-red">{stats.reviews}+</div>
                  <div className="text-sm text-gray-600 font-montserrat uppercase tracking-wide">Breakthroughs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-gotham font-bold text-clr-red">{stats.years}+</div>
                  <div className="text-sm text-gray-600 font-montserrat uppercase tracking-wide">Years Deep</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Chef Life Radio - Transform Your Kitchen Culture"
                  className="hero-image shadow-2xl rounded-2xl"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <PodcastPlayer />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-clr-gold rounded-lg flex items-center justify-center mx-auto mb-8">
              <SafeIcon icon={FiTarget} className="text-2xl text-black" />
            </div>
            <h2 className="text-5xl font-gotham font-bold mb-8 text-black">
              We Hold Up The Mirror
            </h2>
            <div className="space-y-6 text-lg font-poppins">
              <p className="text-2xl text-clr-red font-montserrat italic">
                "The kitchen doesn't have to break you to make you."
              </p>
              <p className="text-gray-700 leading-relaxed">
                We're here for the chefs who've mastered every technique but still feel lost. 
                Who've built successful careers on foundations that feel hollow. Who know there's 
                more to this life than the toxic culture we've normalized.
              </p>
              <p className="text-clr-gold font-gotham font-medium">
                This isn't about perfect plates or pristine pass times. This is about perfect 
                alignment between who you are and how you lead.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-gotham font-bold text-black mb-4">
              Why We're Different
            </h2>
            <p className="text-xl font-poppins text-gray-600 max-w-3xl mx-auto">
              We don't just talk about food. We talk about the humans behind the food, 
              and the culture that either breaks them or makes them whole.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiMic,
                title: 'Raw Conversations',
                description: 'No fluff, no fake positivity. Real talk with chefs who\'ve been through the fire and came back holding wisdom.',
                accent: 'clr-red'
              },
              {
                icon: FiUsers,
                title: 'Toxic Culture Breakers',
                description: 'We challenge the "that\'s just how kitchens are" mentality. Because normal doesn\'t mean healthy.',
                accent: 'clr-gold'
              },
              {
                icon: FiAward,
                title: 'Operational Wisdom',
                description: 'Practical strategies for leading teams, managing stress, and building sustainable success.',
                accent: 'clr-red'
              },
              {
                icon: FiTrendingUp,
                title: 'Transformation Focus',
                description: 'We\'re not here to make you feel good. We\'re here to help you get good at feeling.',
                accent: 'clr-gold'
              },
              {
                icon: FiStar,
                title: 'Mirror Holders',
                description: 'Sometimes the most loving thing we can do is show you what you can\'t see yourself.',
                accent: 'clr-red'
              },
              {
                icon: FiCalendar,
                title: 'Community Healing',
                description: 'Live sessions where we practice new ways of being together in this industry.',
                accent: 'clr-gold'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-${feature.accent === 'clr-red' ? 'clr-red' : 'clr-gold'} rounded-lg flex items-center justify-center mb-6`}>
                  <SafeIcon icon={feature.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-gotham font-semibold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="font-poppins text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-gotham font-bold text-black mb-4">
              Latest Insights
            </h2>
            <p className="text-xl font-poppins text-gray-600">
              Deep dives into the messy, beautiful work of transforming kitchen culture.
            </p>
          </motion.div>
          
          <RecentBlogPosts />
          
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="btn-primary inline-flex items-center px-8 py-4 rounded-lg font-gotham font-semibold hover:bg-red-800 transition-all duration-300 transform hover:scale-105"
            >
              <SafeIcon icon={FiBook} className="mr-2" />
              Read All Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-gotham font-bold text-black mb-4">
              Transform Together
            </h2>
            <p className="text-xl font-poppins text-gray-600">
              Live sessions where we practice new ways of being in this industry.
            </p>
          </motion.div>
          
          <UpcomingEvents />
          
          <div className="text-center mt-12">
            <Link
              to="/events"
              className="btn-secondary inline-flex items-center px-8 py-4 rounded-lg font-gotham font-semibold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
            >
              <SafeIcon icon={FiCalendar} className="mr-2" />
              Join the Movement
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
};

export default Home;