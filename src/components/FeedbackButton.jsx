import React, { useState } from 'react';
import { FeedbackWorkflow } from '@questlabs/react-sdk';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import questConfig from '../questConfig';
import { useAnalytics } from '../hooks/useAnalytics';

const { FiMessageSquare } = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { trackEvent, trackFeedbackSubmission } = useAnalytics();

  const handleFeedbackClick = () => {
    setIsOpen((prev) => !prev);
    
    // Track feedback button interaction
    trackEvent({
      event: 'feedback_button_click',
      event_category: 'engagement',
      event_label: 'floating_feedback',
      value: 1,
      user_journey_stage: 'engagement',
      content_theme: 'user_feedback'
    });

    // GA4 specific event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'feedback_interaction', {
        interaction_type: 'button_click',
        ui_element: 'floating_button',
        custom_dimension_3: 'engagement'
      });
    }
  };

  const handleFeedbackSubmit = () => {
    // Track feedback submission
    trackFeedbackSubmission('general');
    
    // GA4 conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'feedback_submit', {
        feedback_type: 'general',
        source: 'floating_widget',
        custom_dimension_3: 'conversion'
      });
    }
  };

  const generateUserId = () => {
    // Try to get existing user ID from localStorage
    let userId = localStorage.getItem('clr_user_id');
    if (!userId) {
      // Generate a simple user ID if none exists
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('clr_user_id', userId);
    }
    return userId;
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={handleFeedbackClick}
        style={{
          background: questConfig.PRIMARY_COLOR,
          zIndex: 9999
        }}
        className="flex gap-1 rounded-t-md rounded-b-none justify-end items-center px-3 text-sm leading-5 font-semibold py-2 text-white fixed top-[calc(50%-20px)] -right-10 rotate-[270deg] transition-all h-9 hover:right-0 hover:shadow-lg font-gotham"
        title="Share your feedback"
      >
        <div className="w-fit h-fit rotate-90 transition-all duration-300">
          <SafeIcon icon={FiMessageSquare} className="text-white" />
        </div>
        <p className="text-white text-sm font-medium leading-none">Feedback</p>
      </button>

      {/* Feedback Workflow Component */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
            <FeedbackWorkflow
              uniqueUserId={generateUserId()}
              questId={questConfig.QUEST_FEEDBACK_QUESTID}
              isOpen={isOpen}
              accent={questConfig.PRIMARY_COLOR}
              onClose={() => setIsOpen(false)}
              onSubmit={handleFeedbackSubmit}
              style={{
                borderRadius: '1rem',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              <FeedbackWorkflow.ThankYou />
            </FeedbackWorkflow>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;