import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import emailService from '../lib/emailService';

const { FiCheck, FiX, FiMail, FiSettings } = FiIcons;

const Unsubscribe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    frequency: 'weekly',
    topics: ['all'],
    format: 'html'
  });
  const [showPreferences, setShowPreferences] = useState(false);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const handleUnsubscribe = async () => {
    if (!token) {
      toast.error('Invalid unsubscribe link. Please contact us directly.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await emailService.unsubscribe(token);
      
      if (result.success) {
        setIsUnsubscribed(true);
        toast.success('You have been successfully unsubscribed.');
      } else {
        toast.error('Something went wrong. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      toast.error('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePreferences = async () => {
    if (!token) {
      toast.error('Invalid preferences link. Please contact us directly.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await emailService.updatePreferences(token, preferences);
      
      if (result.success) {
        toast.success('Your email preferences have been updated successfully.');
        setShowPreferences(false);
      } else {
        toast.error('Something went wrong. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Update preferences error:', error);
      toast.error('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiX} className="text-2xl text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Link</h1>
          <p className="text-gray-600 mb-6">
            This unsubscribe link appears to be invalid or expired.
          </p>
          <p className="text-sm text-gray-500">
            If you're trying to unsubscribe, please contact us directly at{' '}
            <a href="mailto:hello@chefliferadio.com" className="text-clr-red hover:text-clr-gold">
              hello@chefliferadio.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (isUnsubscribed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <SafeIcon icon={FiCheck} className="text-2xl text-green-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Successfully Unsubscribed</h1>
          <p className="text-gray-600 mb-6">
            You have been removed from our email list. We're sorry to see you go.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            If you change your mind, you can always resubscribe by visiting our website 
            and signing up again.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 gradient-bg text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Chef Life Radio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-clr-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiMail} className="text-2xl text-clr-red" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-easterly">
              Manage Your Email Preferences
            </h1>
            <p className="text-gray-600">
              We're sorry to see you considering leaving. Before you go, would you like to 
              adjust your email preferences instead?
            </p>
          </div>

          {!showPreferences ? (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="font-semibold text-amber-800 mb-2">Wait! Consider This Instead</h3>
                <p className="text-amber-700 text-sm">
                  Instead of unsubscribing completely, you can customize how often you hear from us 
                  and what topics you're interested in. This way, you'll only get the content that 
                  matters most to you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex items-center justify-center px-6 py-4 bg-clr-blue text-white rounded-lg hover:bg-clr-blue-dark transition-colors"
                >
                  <SafeIcon icon={FiSettings} className="mr-2" />
                  Update Preferences
                </button>
                <button
                  onClick={handleUnsubscribe}
                  disabled={isLoading}
                  className="flex items-center justify-center px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <SafeIcon icon={FiX} className="mr-2" />
                  )}
                  {isLoading ? 'Processing...' : 'Unsubscribe Completely'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Frequency</h3>
                <div className="space-y-2">
                  {[
                    { value: 'weekly', label: 'Weekly - Our regular transformation insights' },
                    { value: 'biweekly', label: 'Bi-weekly - Less frequent, more curated' },
                    { value: 'monthly', label: 'Monthly - Just the highlights' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="frequency"
                        value={option.value}
                        checked={preferences.frequency === option.value}
                        onChange={(e) => setPreferences(prev => ({ ...prev, frequency: e.target.value }))}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Topics</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All content - Full transformation experience' },
                    { value: 'podcast', label: 'Podcast updates only - New episodes and highlights' },
                    { value: 'events', label: 'Events only - Live shows and workshops' },
                    { value: 'blog', label: 'Blog posts only - Written insights and articles' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={preferences.topics.includes(option.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPreferences(prev => ({
                              ...prev,
                              topics: [...prev.topics, option.value]
                            }));
                          } else {
                            setPreferences(prev => ({
                              ...prev,
                              topics: prev.topics.filter(topic => topic !== option.value)
                            }));
                          }
                        }}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Format</h3>
                <div className="space-y-2">
                  {[
                    { value: 'html', label: 'Rich HTML - Full design and images' },
                    { value: 'text', label: 'Plain text - Simple, fast loading' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="format"
                        value={option.value}
                        checked={preferences.format === option.value}
                        onChange={(e) => setPreferences(prev => ({ ...prev, format: e.target.value }))}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  onClick={handleUpdatePreferences}
                  disabled={isLoading || preferences.topics.length === 0}
                  className="flex-1 flex items-center justify-center px-6 py-3 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <SafeIcon icon={FiCheck} className="mr-2" />
                  )}
                  {isLoading ? 'Updating...' : 'Save Preferences'}
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Questions? Contact us at{' '}
              <a href="mailto:hello@chefliferadio.com" className="text-clr-red hover:text-clr-gold">
                hello@chefliferadio.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Unsubscribe;