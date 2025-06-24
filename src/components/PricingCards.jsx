import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiStar, FiCrown, FiZap } = FiIcons;

const PricingCards = () => {
  const pricingPlans = [
    {
      name: "Tickets Gen Admin",
      amount: 2,
      priceId: "price_1RdYZZCUug8OolviCLAG79bI",
      paymentLink: "https://buy.stripe.com/eVq28q9xM94o29hbNn4Ni03",
      currency: "usd",
      icon: FiCheck,
      description: "Get started with essential access to Chef Life Radio events and content.",
      features: [
        "Access to general admission events",
        "Monthly newsletter with exclusive insights",
        "Community forum access",
        "Basic event recordings"
      ],
      popular: false,
      color: "from-clr-blue to-clr-blue-light"
    },
    {
      name: "Tickets VIP",
      amount: 10,
      priceId: "price_1RdYZZCUug8OolvikszmUhHm",
      paymentLink: "https://buy.stripe.com/9B68wO4dsa8seW32cN4Ni05",
      currency: "usd",
      icon: FiStar,
      description: "Enhanced experience with priority access and exclusive content.",
      features: [
        "VIP seating at live events",
        "Priority booking for workshops",
        "Exclusive behind-the-scenes content",
        "Direct access to Q&A sessions",
        "Premium event recordings",
        "Monthly coaching call access"
      ],
      popular: true,
      color: "from-clr-gold to-clr-gold-light"
    },
    {
      name: "Tickets Inner Circle",
      amount: 25,
      priceId: "price_1RdYZZCUug8OolviYnHb7cg0",
      paymentLink: "https://buy.stripe.com/5kQ14m39ocgA3dl4kV4Ni04",
      currency: "usd",
      icon: FiCrown,
      description: "Ultimate transformation experience with personal access and premium benefits.",
      features: [
        "Inner Circle exclusive events",
        "One-on-one coaching session",
        "Personal transformation roadmap",
        "Direct messaging with hosts",
        "Exclusive mastermind group access",
        "First access to new programs",
        "Custom industry insights",
        "Annual transformation retreat invite"
      ],
      popular: false,
      color: "from-clr-red to-clr-red-light"
    }
  ];

  const handlePurchase = (paymentLink) => {
    window.open(paymentLink, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-clr-gray/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-clr-red to-clr-gold rounded-full flex items-center justify-center">
              <SafeIcon icon={FiZap} className="text-2xl text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold font-easterly text-gray-900 mb-4">
            Join the <span className="gradient-text">Transformation</span>
          </h2>
          <p className="text-xl text-clr-blue max-w-3xl mx-auto font-poppins">
            Choose your level of commitment to transforming kitchen culture. Each tier offers deeper access to our community and exclusive content.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.priceId}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular ? 'border-clr-gold ring-4 ring-clr-gold/20' : 'border-gray-200 hover:border-clr-red/30'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-clr-gold text-white px-6 py-2 rounded-full text-sm font-bold font-gotham shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>

              <div className="p-8">
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <SafeIcon icon={plan.icon} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-gotham">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-poppins mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center mb-6">
                    <span className="text-5xl font-bold text-gray-900 font-gotham">
                      ${plan.amount}
                    </span>
                    <span className="text-gray-500 ml-2 font-montserrat">
                      /{plan.currency.toUpperCase()}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <SafeIcon 
                        icon={FiCheck} 
                        className="text-green-500 mt-1 mr-3 flex-shrink-0" 
                      />
                      <span className="text-gray-700 font-poppins text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan.paymentLink)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 font-gotham ${
                    plan.popular
                      ? 'bg-gradient-to-r from-clr-gold to-clr-gold-light text-white shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-clr-red to-clr-red-light text-white hover:opacity-90'
                  }`}
                >
                  Get Started Now
                </button>

                <p className="text-center text-xs text-gray-500 mt-4 font-montserrat">
                  Secure payment via Stripe • Cancel anytime
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <blockquote className="brand-voice-quote text-xl text-clr-red mb-6 font-montserrat italic max-w-3xl mx-auto">
            "The kitchen doesn't have to break you to make you. But transformation requires investment—in yourself, your growth, and your future."
          </blockquote>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 font-montserrat">
            <div className="flex items-center">
              <SafeIcon icon={FiCheck} className="text-green-500 mr-2" />
              30-day money-back guarantee
            </div>
            <div className="flex items-center">
              <SafeIcon icon={FiCheck} className="text-green-500 mr-2" />
              Secure Stripe payments
            </div>
            <div className="flex items-center">
              <SafeIcon icon={FiCheck} className="text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCards;