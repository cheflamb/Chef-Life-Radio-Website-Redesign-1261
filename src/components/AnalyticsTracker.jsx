import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from '../lib/analytics';

const AnalyticsTracker = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    analytics.trackPageView({
      page_path: location.pathname,
      page_search: location.search,
      page_hash: location.hash
    });
  }, [location]);

  // Track outbound clicks
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.href) {
        const url = new URL(link.href, window.location.origin);
        
        // Track external links
        if (url.hostname !== window.location.hostname) {
          analytics.trackEvent({
            event: 'outbound_click',
            event_category: 'navigation',
            event_label: url.hostname,
            destination_url: link.href
          });
        }
        
        // Track specific internal links
        if (link.href.includes('/podcast') || 
            link.href.includes('/blog') || 
            link.href.includes('/events')) {
          analytics.trackEvent({
            event: 'internal_navigation',
            event_category: 'navigation',
            event_label: url.pathname,
            source_page: location.pathname
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [location]);

  return <>{children}</>;
};

export default AnalyticsTracker;