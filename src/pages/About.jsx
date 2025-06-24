import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMic, FiUsers, FiAward, FiTarget, FiHeart, FiStar, FiShield, FiCompass } = FiIcons;

const About = () => {
  const teamMembers = [
    {
      name: "Chef Maria Rodriguez",
      role: "Host & Transformation Guide",
      bio: "15 years in professional kitchens taught Maria that excellence and toxicity don't have to be married. She's here to help you divorce them.",
      image: "https://images.unsplash.com/photo-1494790108755-2616c96b7f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      signature: "/aml-signature.png"
    },
    {
      name: "David Chen",
      role: "Producer & Culture Challenger",
      bio: "Former line cook turned media producer. David knows what it's like to live the toxic culture we're working to transform.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Sarah Johnson",
      role: "Content Director & Mirror Holder",
      bio: "Sarah curates the hard conversations that other platforms won't touch. She believes discomfort is the price of growth.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const principles = [
    {
      icon: FiShield,
      title: "We Challenge Toxic Normal",
      description: "Just because something is common doesn't make it healthy. We call out the toxic patterns that the industry has normalized."
    },
    {
      icon: FiCompass,
      title: "Transformation Over Inspiration",
      description: "We're not here to make you feel good about where you are. We're here to help you get where you need to be."
    },
    {
      icon: FiTarget,
      title: "Mirror Before Motivation",
      description: "Sometimes the most loving thing we can do is show you what you can't see yourself."
    },
    {
      icon: FiHeart,
      title: "Emotional Depth",
      description: "We go deep into the emotional work that creates lasting change, not just surface-level tips and tricks."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
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
                className="w-20 h-20 bg-gradient-to-br from-clr-red to-clr-gold rounded-full flex items-center justify-center"
                style={{ display: 'none' }}
              >
                <SafeIcon icon={FiMic} className="text-white text-3xl" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold font-easterly text-gray-900 mb-4">
              We Hold Up <span className="gradient-text">The Mirror</span>
            </h1>
            <p className="text-xl font-poppins text-gray-700 max-w-3xl mx-auto">
              We're not here to tell you what you want to hear. We're here to show you what you need to see.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold font-easterly text-gray-900 mb-6">Born from Burnout</h2>
              <div className="space-y-6 font-poppins text-gray-700 text-lg leading-relaxed">
                <p>
                  Chef Life Radio started in a moment of brutal honesty. Three industry veterans sitting in a dive bar at 2 AM, 
                  finally admitting what we'd all been thinking: <span className="introspective-edge">"The kitchen is breaking us, 
                  and we're calling it character building."</span>
                </p>
                
                <blockquote className="brand-voice-quote text-clr-red pl-6 border-l-4 border-clr-gold">
                  "We realized we'd become experts at everything except taking care of ourselves and our teams."
                </blockquote>
                
                <p>
                  That night, we made a pact. We'd stop pretending that toxic was normal. 
                  We'd stop celebrating dysfunction as dedication. We'd start holding up the mirror 
                  that the industry desperately needed but was too afraid to look into.
                </p>
                
                <p className="operational-coach font-medium">
                  Three years later, we've built a platform that doesn't just talk about food—we talk about the humans behind the food, 
                  and the culture that either breaks them or makes them whole.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Chef Life Radio - Behind the Scenes"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              
              {/* Brand Asset Overlay */}
              <div className="absolute bottom-4 right-4">
                <img 
                  src="/brand-asset-1.png" 
                  alt="Brand Asset" 
                  className="h-12 w-auto opacity-75"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Ecosystem */}
      <section className="py-20 bg-clr-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-easterly text-gray-900 mb-4">
              Our Ecosystem of Transformation
            </h2>
            <p className="text-xl font-poppins text-clr-blue max-w-3xl mx-auto">
              Multiple platforms, one mission: transforming culinary culture from the inside out.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src="/clr-logo-main.png" 
                alt="Chef Life Radio" 
                className="h-16 w-auto mx-auto mb-4"
              />
              <h3 className="text-xl font-bold font-gotham text-gray-900 mb-3">Chef Life Radio</h3>
              <p className="text-gray-600 font-poppins">
                The flagship podcast challenging toxic kitchen culture with raw conversations and transformational insights.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src="/clr-espanol.png" 
                alt="Chef Life Radio En Español" 
                className="h-16 w-auto mx-auto mb-4"
              />
              <h3 className="text-xl font-bold font-gotham text-gray-900 mb-3">CLR En Español</h3>
              <p className="text-gray-600 font-poppins">
                Bringing transformation to Spanish-speaking culinary professionals with culturally relevant content and conversations.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img 
                src="/chef-life-coaching.png" 
                alt="Chef Life Coaching" 
                className="h-16 w-auto mx-auto mb-4"
              />
              <h3 className="text-xl font-bold font-gotham text-gray-900 mb-3">Chef Life Coaching</h3>
              <p className="text-gray-600 font-poppins">
                One-on-one coaching and group programs for culinary professionals ready to transform their careers and lives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-easterly mb-4">
              Our Guiding Principles
            </h2>
            <p className="text-xl font-poppins text-clr-gray max-w-3xl mx-auto">
              These aren't just values on a wall. These are the principles that guide every conversation, 
              every piece of content, every interaction we have.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-8 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mb-6">
                  <SafeIcon icon={principle.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 font-gotham">{principle.title}</h3>
                <p className="text-clr-gray leading-relaxed font-poppins">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-easterly text-gray-900 mb-4">
              The Voices Behind the Mirror
            </h2>
            <p className="text-xl font-poppins text-clr-blue max-w-3xl mx-auto">
              We're not perfect. We're still doing the work. But we're doing it together, 
              and we're sharing what we learn along the way.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-gotham">{member.name}</h3>
                  <p className="text-clr-red font-medium mb-3 font-montserrat font-caption">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed font-poppins">{member.bio}</p>
                  
                  {/* Signature for specific team member */}
                  {member.signature && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <img 
                        src={member.signature} 
                        alt="Signature" 
                        className="h-8 w-auto opacity-75"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-clr-gray/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-easterly text-gray-900 mb-6">
              Ready to Look in the Mirror?
            </h2>
            
            <blockquote className="brand-voice-quote text-xl text-clr-blue mb-8 font-montserrat">
              "The kitchen doesn't have to break you to make you. 
              But first, you have to be willing to see what's breaking you."
            </blockquote>
            
            <p className="text-lg font-poppins text-gray-700 mb-8">
              This work isn't easy. It's not comfortable. But it's necessary. 
              And you don't have to do it alone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/podcast"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-clr-red to-clr-gold text-white font-gotham font-semibold rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Start Listening
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-clr-blue font-gotham font-semibold rounded-xl border-2 border-clr-blue hover:bg-clr-blue hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Join the Conversation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;