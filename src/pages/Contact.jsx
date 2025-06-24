import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';
import emailService from '../lib/emailService';

const { FiMail, FiPhone, FiMapPin, FiUser, FiMessageSquare, FiSend, FiArrowRight, FiArrowLeft, FiCheck } = FiIcons;

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    email: '',
    phone: '',
    // Step 2: Purpose
    purpose: '',
    subject: '',
    // Step 3: Message
    message: '',
    preferredContact: 'email',
    // Step 4: Additional Info
    company: '',
    website: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert contact message
      const { data, error } = await supabase
        .from('contact_messages_clr2024')
        .insert([{
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          phone: formData.phone?.trim() || null,
          purpose: formData.purpose,
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          preferred_contact: formData.preferredContact,
          company: formData.company?.trim() || null,
          website: formData.website?.trim() || null,
          budget: formData.budget || null,
          timeline: formData.timeline || null,
          status: 'new'
        }])
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email
      const emailResult = await emailService.sendContactConfirmation({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        purpose: formData.purpose,
        subject: formData.subject.trim(),
        preferred_contact: formData.preferredContact
      });

      if (emailResult.success) {
        toast.success(
          'Thank you! Your message has been sent and you\'ll receive a confirmation email shortly. We\'ll respond within 24 hours.',
          { autoClose: 7000 }
        );
      } else {
        toast.success('Thank you! Your message has been sent successfully. We\'ll respond within 24 hours.');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        purpose: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        company: '',
        website: '',
        budget: '',
        timeline: ''
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Something went wrong. Please try again or email us directly at hello@chefliferadio.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name.trim() && formData.email.trim();
      case 2:
        return formData.purpose && formData.subject.trim();
      case 3:
        return formData.message.trim();
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const purposes = [
    'Podcast Guest Appearance',
    'Collaboration Opportunity',
    'Media Interview',
    'Event Booking',
    'Sponsorship Inquiry',
    'General Question',
    'Other'
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
    'To be discussed'
  ];

  const timelineOptions = [
    'ASAP',
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Flexible'
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
            <h1 className="text-5xl font-bold font-easterly text-gray-900 mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We'd love to hear from you! Whether you're interested in appearing on our podcast, 
              collaborating on a project, or just want to say hello, we're here to connect.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={FiMail} className="text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">hello@chefliferadio.com</p>
                      <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={FiPhone} className="text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={FiMapPin} className="text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-600">New York, NY</p>
                      <p className="text-sm text-gray-500 mt-1">Available for virtual meetings worldwide</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Response Time</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">General Inquiries</span>
                      <span className="text-sm font-medium text-green-600">24 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Collaboration</span>
                      <span className="text-sm font-medium text-green-600">48 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Media Requests</span>
                      <span className="text-sm font-medium text-green-600">Same day</span>
                    </div>
                  </div>
                </div>

                {/* Email notification preview */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <SafeIcon icon={FiMail} className="text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">Auto-confirmation</span>
                    </div>
                    <p className="text-xs text-blue-700">
                      You'll receive an instant confirmation email when you submit your message, 
                      including a summary of your inquiry.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Multi-step Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                    <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`flex-1 h-2 rounded-full transition-colors ${
                          step <= currentStep ? 'bg-amber-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Basic Info</span>
                    <span>Purpose</span>
                    <span>Message</span>
                    <span>Details</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <motion.div
                      className="form-step space-y-6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your email address"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          📧 You'll receive an instant confirmation email
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Purpose */}
                  {currentStep === 2 && (
                    <motion.div
                      className="form-step space-y-6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose of Contact</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What's this about? *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {purposes.map((purpose) => (
                            <label
                              key={purpose}
                              className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                                formData.purpose === purpose
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-gray-300 hover:border-amber-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="purpose"
                                value={purpose}
                                checked={formData.purpose === purpose}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <span className="text-sm font-medium">{purpose}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Brief subject line"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Message */}
                  {currentStep === 3 && (
                    <motion.div
                      className="form-step space-y-6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Message</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                          placeholder="Tell us more about your inquiry..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Contact Method
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="email"
                              checked={formData.preferredContact === 'email'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Email
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="phone"
                              checked={formData.preferredContact === 'phone'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Phone
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Additional Details */}
                  {currentStep === 4 && (
                    <motion.div
                      className="form-step space-y-6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Details (Optional)</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company/Organization
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Your company name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Website
                          </label>
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Budget Range
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timeline
                          </label>
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          >
                            <option value="">Select timeline</option>
                            {timelineOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <SafeIcon icon={FiCheck} className="text-amber-600 mr-2" />
                          <span className="text-sm font-medium text-amber-800">Ready to submit</span>
                        </div>
                        <p className="text-xs text-amber-700">
                          Your message will be sent immediately, and you'll receive a confirmation email 
                          with a summary of your inquiry.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                        currentStep === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                      }`}
                      disabled={currentStep === 1}
                    >
                      <SafeIcon icon={FiArrowLeft} className="mr-2" />
                      Previous
                    </button>

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                        className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                          validateStep(currentStep)
                            ? 'gradient-bg text-white hover:opacity-90'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Next
                        <SafeIcon icon={FiArrowRight} className="ml-2" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !validateStep(3)}
                        className={`flex items-center px-8 py-3 rounded-xl font-medium transition-colors ${
                          isSubmitting || !validateStep(3)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'gradient-bg text-white hover:opacity-90'
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        ) : (
                          <SafeIcon icon={FiSend} className="mr-2" />
                        )}
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;