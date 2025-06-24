import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from '../lib/analytics';

// Hook for component-level analytics
export const useAnalytics = () => {
  const location = useLocation();

  // Track page view
  const trackPageView = useCallback((customData = {}) => {
    analytics.trackPageView(customData);
  }, []);

  // Track custom event
  const trackEvent = useCallback((eventData) => {
    analytics.trackEvent(eventData);
  }, []);

  // Track content interaction
  const trackContentInteraction = useCallback((contentType, contentId, interactionType, customData = {}) => {
    analytics.trackContentInteraction(contentType, contentId, interactionType, customData);
  }, []);

  // Track conversion
  const trackConversion = useCallback((conversionType, value = null, customData = {}) => {
    analytics.trackConversion(conversionType, value, customData);
  }, []);

  // Chef Life Radio specific tracking
  const trackPodcastPlay = useCallback((episodeId, episodeTitle, duration = null) => {
    analytics.trackPodcastPlay(episodeId, episodeTitle, duration);
  }, []);

  const trackBlogRead = useCallback((postId, postTitle, readTime = null, brandVoice = null) => {
    analytics.trackBlogRead(postId, postTitle, readTime, brandVoice);
  }, []);

  const trackNewsletterSignup = useCallback((source = 'website') => {
    analytics.trackNewsletterSignup(source);
  }, []);

  const trackEventRegistration = useCallback((eventId, eventTitle, ticketPrice = null) => {
    analytics.trackEventRegistration(eventId, eventTitle, ticketPrice);
  }, []);

  const trackFeedbackSubmission = useCallback((feedbackType = 'general') => {
    analytics.trackFeedbackSubmission(feedbackType);
  }, []);

  const trackSocialShare = useCallback((platform, contentType, contentId) => {
    analytics.trackSocialShare(platform, contentType, contentId);
  }, []);

  return {
    trackPageView,
    trackEvent,
    trackContentInteraction,
    trackConversion,
    trackPodcastPlay,
    trackBlogRead,
    trackNewsletterSignup,
    trackEventRegistration,
    trackFeedbackSubmission,
    trackSocialShare,
    currentPath: location.pathname
  };
};

// Hook for analytics data fetching
export const useAnalyticsData = () => {
  const getAnalyticsData = useCallback(async (startDate, endDate) => {
    return await analytics.getAnalyticsData(startDate, endDate);
  }, []);

  const getTopContent = useCallback(async (contentType = 'blog', metricType = 'view', limit = 10, days = 30) => {
    return await analytics.getTopContent(contentType, metricType, limit, days);
  }, []);

  return {
    getAnalyticsData,
    getTopContent
  };
};

export default useAnalytics;