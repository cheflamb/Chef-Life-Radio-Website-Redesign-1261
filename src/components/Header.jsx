import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX, FiMic, FiHome, FiBook, FiVideo, FiMail, FiCalendar, FiUser } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: FiHome },
    { name: 'Podcast', path: '/podcast', icon: FiMic },
    { name: 'Blog', path: '/blog', icon: FiBook },
    { name: 'Videos', path: '/videos', icon: FiVideo },
    { name: 'Events', path: '/events', icon: FiCalendar },
    { name: 'About', path: '/about', icon: FiUser },
    { name: 'Contact', path: '/contact', icon: FiMail },
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b border-gray-200' 
          : 'bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img 
                src="/clr-logo-main.png" 
                alt="Chef Life Radio Logo" 
                className="h-14 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="w-14 h-14 bg-clr-red rounded-lg flex items-center justify-center" 
                style={{ display: 'none' }}
              >
                <SafeIcon icon={FiMic} className="text-white text-2xl" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-gotham font-bold text-black leading-tight">
                Chef Life Radio
              </h1>
              <p className="text-sm text-gray-600 font-montserrat uppercase tracking-wider">
                Transform Your Journey
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-clr-red text-white'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={item.icon} className="text-lg" />
                <span className="font-gotham font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-black hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="text-2xl" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden py-4 border-t border-gray-200 bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`nav-link flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-clr-red text-white'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span className="font-gotham font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;