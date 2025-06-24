import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMic, FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiYoutube, FiFacebook } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img 
                  src="/clr-logo-main.png" 
                  alt="Chef Life Radio Logo" 
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-12 h-12 bg-clr-red rounded-lg flex items-center justify-center" 
                  style={{ display: 'none' }}
                >
                  <SafeIcon icon={FiMic} className="text-white text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-gotham font-bold text-black">Chef Life Radio</h3>
                <p className="text-sm text-gray-600 font-montserrat uppercase tracking-wider">Transform Your Journey</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed font-poppins max-w-sm">
              Your premier destination for culinary conversations, transformation insights, 
              and challenging the toxic norms of kitchen culture.
            </p>

            {/* Additional Brand Logos */}
            <div className="flex items-center space-x-4 pt-4">
              <img 
                src="/clr-espanol.png" 
                alt="Chef Life Radio En Español" 
                className="h-8 w-auto opacity-75 hover:opacity-100 transition-opacity" 
              />
              <img 
                src="/chef-life-coaching.png" 
                alt="Chef Life Coaching" 
                className="h-8 w-auto opacity-75 hover:opacity-100 transition-opacity" 
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-gotham font-semibold mb-6 text-black">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-clr-red transition-colors font-poppins">Home</Link></li>
              <li><Link to="/podcast" className="text-gray-600 hover:text-clr-red transition-colors font-poppins">Podcast</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-clr-red transition-colors font-poppins">Blog</Link></li>
              <li><Link to="/videos" className="text-gray-600 hover:text-clr-red transition-colors font-poppins">Videos</Link></li>
              <li><Link to="/events" className="text-gray-600 hover:text-clr-red transition-colors font-poppins">Events</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-clr-red transition-colors font-poppins">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-clr-red transition-colors font-poppins">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-gotham font-semibold mb-6 text-black">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="text-clr-red" />
                <span className="text-gray-600 text-sm font-poppins">hello@chefliferadio.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="text-clr-red" />
                <span className="text-gray-600 text-sm font-poppins">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="text-clr-red" />
                <span className="text-gray-600 text-sm font-poppins">New York, NY</span>
              </li>
            </ul>

            {/* Signature */}
            <div className="mt-8">
              <img 
                src="/aml-signature.png" 
                alt="AML Signature" 
                className="h-12 w-auto opacity-75" 
              />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-gotham font-semibold mb-6 text-black">Follow Us</h4>
            <div className="flex space-x-3 mb-8">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-clr-red hover:text-white transition-colors"
              >
                <SafeIcon icon={FiInstagram} className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-clr-red hover:text-white transition-colors"
              >
                <SafeIcon icon={FiTwitter} className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-clr-red hover:text-white transition-colors"
              >
                <SafeIcon icon={FiYoutube} className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-clr-red hover:text-white transition-colors"
              >
                <SafeIcon icon={FiFacebook} className="text-lg" />
              </a>
            </div>

            <div>
              <h5 className="text-sm font-gotham font-semibold mb-3 text-black">Transform Together</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-l-lg text-sm form-input font-poppins"
                />
                <button className="px-4 py-2 bg-clr-red text-white rounded-r-lg hover:bg-red-800 transition-colors font-gotham font-medium">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <p className="text-gray-600 text-sm font-poppins">
              © 2024 Chef Life Radio. All rights reserved.
            </p>
            <img 
              src="/brand-asset-1.png" 
              alt="Brand Asset" 
              className="h-6 w-auto opacity-50" 
            />
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-clr-red text-sm transition-colors font-poppins">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-clr-red text-sm transition-colors font-poppins">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-clr-red text-sm transition-colors font-poppins">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;