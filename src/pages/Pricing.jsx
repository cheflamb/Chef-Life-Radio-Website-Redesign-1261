import React from 'react';
import { motion } from 'framer-motion';
import PricingCards from '../components/PricingCards';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDollarSign, FiShield, FiHelpCircle, FiMail } = FiIcons;

const Pricing = () => {
  const faqs = [
    {
      question: "What's included in each ticket tier?",
      answer: "Each tier builds upon the previous one. Gen Admin gives you basic access, VIP adds priority seating and exclusive content, while Inner Circle provides personal coaching and mastermind access."
    },
    {
      question: "Can I upgrade my ticket later?",
      answer: "Yes! You can upgrade to a higher tier at any time. Contact us and we'll help you with the upgrade process and credit any previous payments."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with your experience, we'll provide a full refund within the first 30 days."
    },
    {
      question: "How do I access the exclusive content?",
      answer: "After purchase, you'll receive login credentials to our member portal where all exclusive content, recordings, and community features are available."
    },
    {
      question: "Are these one-time payments or subscriptions?",
      answer: "These are one-time payments for lifetime access to your chosen tier. No recurring charges or hidden fees."
    }
  ];

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
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-clr-red to-clr-gold rounded-full flex items-center justify-center">
                <SafeIcon icon={FiDollarSign} className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold font-easterly text-gray-900 mb-4">
              Invest in Your <span className="gradient-text">Transformation</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 font-poppins">
              Choose the level of access that matches your commitment to breaking toxic kitchen culture and building a sustainable culinary career.
            </p>
            <blockquote className="brand-voice-quote text-lg text-clr-blue border-l-4 border-clr-gold pl-6 italic font-montserrat max-w-2xl mx-auto">
              "Real transformation isn't free. But neither is staying stuck in toxic patterns that break your spirit and sabotage your success."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <PricingCards />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold font-easterly text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-clr-blue font-poppins">
              Everything you need to know about joining the transformation.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiHelpCircle} className="text-clr-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-gotham">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 font-poppins leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SafeIcon icon={FiShield} className="text-4xl text-clr-gold mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-easterly mb-4">
              Secure & Trusted Payments
            </h2>
            <p className="text-clr-gray font-poppins">
              Your payment information is protected by industry-leading security standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-clr-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiShield} className="text-clr-gold text-xl" />
              </div>
              <h3 className="font-semibold mb-2 font-gotham">256-bit SSL Encryption</h3>
              <p className="text-sm text-clr-gray font-poppins">Bank-level security for all transactions</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-clr-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiDollarSign} className="text-clr-gold text-xl" />
              </div>
              <h3 className="font-semibold mb-2 font-gotham">Stripe Powered</h3>
              <p className="text-sm text-clr-gray font-poppins">Trusted by millions of businesses worldwide</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-clr-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiMail} className="text-clr-gold text-xl" />
              </div>
              <h3 className="font-semibold mb-2 font-gotham">24/7 Support</h3>
              <p className="text-sm text-clr-gray font-poppins">We're here to help with any questions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-clr-red to-clr-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-easterly">
              Ready to Transform Your Culinary Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-poppins">
              Join thousands of culinary professionals who've chosen growth over stagnation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#pricing" 
                className="inline-flex items-center px-8 py-4 bg-white text-clr-red font-gotham font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Choose Your Plan
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-8 py-4 bg-transparent text-white font-gotham font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-clr-red transition-colors"
              >
                Have Questions?
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;