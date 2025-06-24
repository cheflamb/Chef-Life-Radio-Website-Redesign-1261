import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';
import emailService from '../lib/emailService';

const { FiMail, FiSend, FiTarget } = FiIcons;

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const unsubscribeToken = crypto.randomUUID();

      const { data, error } = await supabase
        .from('newsletter_subscribers_clr2024')
        .insert([{
          email: email.toLowerCase().trim(),
          name: name.trim() || null,
          source: 'website_newsletter',
          status: 'active',
          unsubscribe_token: unsubscribeToken,
          preferences: {
            frequency: 'weekly',
            topics: ['all'],
            format: 'html'
          }
        }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          toast.info('You\'re already part of the transformation! Check your email for our latest insights.');
          setEmail('');
          setName('');
          return;
        }
        throw error;
      }

      const emailResult = await emailService.sendWelcomeEmail({
        email: email.toLowerCase().trim(),
        name: name.trim() || 'Fellow Chef',
        unsubscribe_token: unsubscribeToken
      });

      if (emailResult.success) {
        toast.success(
          'Welcome to the transformation! Check your email for confirmation and your first dose of insight.',
          { autoClose: 7000 }
        );
      } else {
        toast.success(
          'You\'re now part of the transformation! Welcome email coming soon.',
          { autoClose: 5000 }
        );
      }

      setEmail('');
      setName('');
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error('Something went wrong. Try again or contact us directly at hello@chefliferadio.com');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-clr-red py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-clr-gold rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTarget} className="text-3xl text-black" />
            </div>
          </div>
          
          <h2 className="text-5xl font-gotham font-bold text-white mb-6">
            Ready to Look in the Mirror?
          </h2>
          
          <div className="space-y-6 mb-8 max-w-2xl mx-auto">
            <p className="text-xl text-white font-poppins">
              Get the insights that cut through the noise. No fluff, no fake positivity. 
              Just the real tools for real transformation.
            </p>
            <blockquote className="text-lg text-white border-l-4 border-clr-gold pl-6 italic font-montserrat">
              "The kitchen doesn't have to break you to make you."
            </blockquote>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg form-input text-black font-poppins"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <SafeIcon icon={FiMail} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg form-input text-black font-poppins"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="px-8 py-4 bg-clr-gold text-black font-gotham font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <SafeIcon icon={FiSend} className="mr-2" />
                      Start Transforming
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-white font-montserrat">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-clr-gold rounded-full mr-2"></div>
              No BS, ever
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-clr-gold rounded-full mr-2"></div>
              Real transformation
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-clr-gold rounded-full mr-2"></div>
              Unsubscribe anytime
            </div>
          </div>

          <div className="mt-6 text-xs text-white font-montserrat opacity-75">
            📧 You'll receive a welcome email with immediate access to our latest transformative episode
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;