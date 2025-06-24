// Enhanced Analytics Service for Chef Life Radio with GA4 Integration
class AnalyticsService {
  constructor() {
    this.userId = this.generateUserId();
    this.sessionId = this.generateSessionId();
    this.isInitialized = false;
    this.queue = [];
    this.gaIds = {
      ga4: 'G-J22BB7N5LF',
      gtm: 'GT-MBLK5B3'
    };
  }

  // Initialize analytics with Chef Life Radio GA4 configuration
  init(config = {}) {
    try {
      // Initialize Google Analytics 4
      this.loadGoogleAnalytics();
      
      // Initialize Google Tag Manager
      this.loadGoogleTagManager();

      // Set up user tracking
      this.setupUserTracking();
      
      // Process queued events
      this.processQueue();
      
      this.isInitialized = true;
      console.log('📊 Chef Life Radio Analytics initialized with GA4');
    } catch (error) {
      console.error('Analytics initialization error:', error);
    }
  }

  // Load Google Analytics 4 with Chef Life Radio configuration
  loadGoogleAnalytics() {
    if (typeof window === 'undefined') return;

    // Create gtag script for GA4
    const ga4Script = document.createElement('script');
    ga4Script.async = true;
    ga4Script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaIds.ga4}`;
    document.head.appendChild(ga4Script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    
    // Configure GA4 with Chef Life Radio specific settings
    window.gtag('config', this.gaIds.ga4, {
      // Basic configuration
      page_title: document.title,
      page_location: window.location.href,
      user_id: this.userId,
      
      // Chef Life Radio specific custom dimensions
      custom_map: {
        custom_dimension_1: 'brand_voice',      // sardonic-mystic, restorative-rebel, etc.
        custom_dimension_2: 'content_category', // podcast, blog, event
        custom_dimension_3: 'user_journey_stage', // discovery, engagement, conversion
        custom_dimension_4: 'content_theme'     // toxic-culture, leadership, transformation
      },
      
      // Enhanced ecommerce for event tickets
      send_page_view: true,
      
      // Privacy settings
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    // Set up Chef Life Radio user properties
    window.gtag('set', 'user_properties', {
      user_type: 'chef_life_radio_visitor',
      session_id: this.sessionId
    });
  }

  // Load Google Tag Manager
  loadGoogleTagManager() {
    if (typeof window === 'undefined') return;

    // GTM script
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${this.gaIds.gtm}`;
    document.head.appendChild(gtmScript);

    // GTM noscript fallback
    const gtmNoscript = document.createElement('noscript');
    gtmNoscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${this.gaIds.gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(gtmNoscript);

    // Initialize dataLayer for GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
  }

  // Generate consistent user ID
  generateUserId() {
    if (typeof window === 'undefined') return 'server_user';
    
    let userId = localStorage.getItem('clr_user_id');
    if (!userId) {
      userId = `clr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('clr_user_id', userId);
    }
    return userId;
  }

  // Generate session ID
  generateSessionId() {
    if (typeof window === 'undefined') return 'server_session';
    
    let sessionId = sessionStorage.getItem('clr_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('clr_session_id', sessionId);
    }
    return sessionId;
  }

  // Setup user tracking with CLR-specific events
  setupUserTracking() {
    if (typeof window === 'undefined') return;

    // Track initial page view with CLR context
    this.trackPageView({
      site_section: this.getSiteSection(),
      content_type: this.getContentType(),
      user_journey_stage: 'discovery'
    });

    // Enhanced engagement tracking
    this.setupEngagementTracking();
    this.setupFormTracking();
    this.setupContentTracking();
  }

  // Get site section from URL
  getSiteSection() {
    const path = window.location.pathname;
    if (path.includes('/podcast')) return 'podcast';
    if (path.includes('/blog')) return 'blog';
    if (path.includes('/events')) return 'events';
    if (path.includes('/about')) return 'about';
    if (path.includes('/contact')) return 'contact';
    return 'home';
  }

  // Get content type from URL and context
  getContentType() {
    const path = window.location.pathname;
    if (path.includes('/podcast')) return 'audio_content';
    if (path.includes('/blog')) return 'article_content';
    if (path.includes('/events')) return 'event_content';
    if (path.includes('/videos')) return 'video_content';
    return 'page_content';
  }

  // Track page views with GA4 and GTM
  trackPageView(customData = {}) {
    const pageData = {
      event: 'page_view',
      event_category: 'engagement',
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      user_id: this.userId,
      session_id: this.sessionId,
      site_section: this.getSiteSection(),
      content_type: this.getContentType(),
      ...customData
    };

    // GA4 tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageData.page_title,
        page_location: pageData.page_location,
        page_referrer: document.referrer,
        user_id: this.userId,
        custom_dimension_1: customData.brand_voice || '',
        custom_dimension_2: pageData.content_type,
        custom_dimension_3: customData.user_journey_stage || 'discovery',
        custom_dimension_4: customData.content_theme || ''
      });
    }

    // GTM dataLayer push
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'clr_page_view',
        page_data: pageData,
        user_properties: {
          user_id: this.userId,
          session_id: this.sessionId,
          site_section: pageData.site_section
        }
      });
    }

    this.trackToDatabase('page_view', 'engagement', window.location.pathname, null, pageData);
  }

  // Enhanced event tracking for GA4
  trackEvent(eventData) {
    if (!this.isInitialized) {
      this.queue.push({ type: 'event', data: eventData });
      return;
    }

    // Enhance event data with CLR context
    const enhancedData = {
      ...eventData,
      user_id: this.userId,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      site_section: this.getSiteSection()
    };

    // GA4 event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventData.event || eventData.event_name, {
        event_category: eventData.event_category,
        event_label: eventData.event_label,
        value: eventData.value,
        user_id: this.userId,
        custom_dimension_1: eventData.brand_voice || '',
        custom_dimension_2: eventData.content_category || '',
        custom_dimension_3: eventData.user_journey_stage || '',
        custom_dimension_4: eventData.content_theme || '',
        // Additional GA4 parameters
        engagement_time_msec: eventData.engagement_time || 0,
        session_engaged: true
      });
    }

    // GTM dataLayer push
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: `clr_${eventData.event || eventData.event_name}`,
        event_data: enhancedData,
        user_properties: {
          user_id: this.userId,
          session_id: this.sessionId
        }
      });
    }

    console.log('📊 CLR Analytics Event:', enhancedData);
  }

  // Chef Life Radio specific tracking methods with GA4 enhancement
  
  // Track podcast plays with enhanced GA4 events
  trackPodcastPlay(episodeId, episodeTitle, duration = null) {
    const eventData = {
      event: 'podcast_play',
      event_category: 'audio_engagement',
      event_label: episodeTitle,
      content_type: 'podcast',
      content_id: episodeId,
      content_title: episodeTitle,
      brand_voice: 'podcast',
      content_category: 'audio_content',
      user_journey_stage: 'engagement',
      content_theme: this.extractContentTheme(episodeTitle)
    };

    this.trackEvent(eventData);

    // Enhanced GA4 media event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'play', {
        content_type: 'podcast',
        content_id: episodeId,
        content_name: episodeTitle,
        custom_dimension_1: 'podcast_audio',
        custom_dimension_2: 'audio_content'
      });
    }

    this.trackContentInteraction('podcast', episodeId, 'play', {
      episode_title: episodeTitle,
      duration: duration,
      brand_voice: 'podcast',
      content_category: 'audio_content'
    });
  }

  // Track blog reads with brand voice analysis
  trackBlogRead(postId, postTitle, readTime = null, brandVoice = null) {
    const eventData = {
      event: 'blog_read',
      event_category: 'content_engagement',
      event_label: postTitle,
      content_type: 'blog',
      content_id: postId,
      content_title: postTitle,
      brand_voice: brandVoice,
      content_category: 'article_content',
      user_journey_stage: 'engagement',
      content_theme: this.extractContentTheme(postTitle),
      read_time: readTime
    };

    this.trackEvent(eventData);

    // GA4 content engagement
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        content_type: 'blog_post',
        content_id: postId,
        content_name: postTitle,
        custom_dimension_1: brandVoice || 'unknown',
        custom_dimension_2: 'article_content',
        custom_dimension_4: this.extractContentTheme(postTitle)
      });
    }

    this.trackContentInteraction('blog', postId, 'view', {
      post_title: postTitle,
      read_time: readTime,
      brand_voice: brandVoice,
      content_category: 'article_content'
    });
  }

  // Track newsletter signups with GA4 conversion
  trackNewsletterSignup(source = 'website') {
    const eventData = {
      event: 'newsletter_signup',
      event_category: 'conversion',
      event_label: 'newsletter_form',
      value: 1,
      conversion_type: 'newsletter_signup',
      source: source,
      user_journey_stage: 'conversion',
      content_theme: 'community_building'
    };

    this.trackEvent(eventData);

    // GA4 conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sign_up', {
        method: source,
        value: 1,
        currency: 'USD',
        custom_dimension_3: 'conversion'
      });
    }

    this.trackConversion('newsletter_signup', 1, {
      source: source,
      form_location: window.location.pathname
    });
  }

  // Track event registrations with enhanced ecommerce
  trackEventRegistration(eventId, eventTitle, ticketPrice = null) {
    const eventData = {
      event: 'event_registration',
      event_category: 'conversion',
      event_label: eventTitle,
      value: ticketPrice,
      content_type: 'event',
      content_id: eventId,
      content_title: eventTitle,
      user_journey_stage: 'conversion',
      content_theme: 'live_events'
    };

    this.trackEvent(eventData);

    // GA4 purchase event for ticket sales
    if (typeof window !== 'undefined' && window.gtag && ticketPrice) {
      window.gtag('event', 'purchase', {
        transaction_id: `clr_event_${eventId}_${Date.now()}`,
        value: ticketPrice,
        currency: 'USD',
        items: [{
          item_id: eventId,
          item_name: eventTitle,
          category: 'event_ticket',
          quantity: 1,
          price: ticketPrice
        }],
        custom_dimension_2: 'event_content',
        custom_dimension_3: 'conversion'
      });
    }

    this.trackConversion('event_registration', ticketPrice, {
      event_id: eventId,
      event_title: eventTitle,
      ticket_price: ticketPrice
    });
  }

  // Track feedback submissions
  trackFeedbackSubmission(feedbackType = 'general') {
    const eventData = {
      event: 'feedback_submission',
      event_category: 'conversion',
      event_label: 'feedback_form',
      value: 1,
      feedback_type: feedbackType,
      user_journey_stage: 'engagement',
      content_theme: 'user_feedback'
    };

    this.trackEvent(eventData);

    // GA4 conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'feedback_submit', {
        feedback_type: feedbackType,
        source: 'floating_widget',
        custom_dimension_3: 'conversion'
      });
    }

    this.trackConversion('feedback_submission', 1, {
      feedback_type: feedbackType,
      source: 'floating_widget'
    });
  }

  // Track social shares
  trackSocialShare(platform, contentType, contentId) {
    const eventData = {
      event: 'social_share',
      event_category: 'social_engagement',
      event_label: `${platform}_${contentType}`,
      platform: platform,
      content_type: contentType,
      content_id: contentId,
      user_journey_stage: 'engagement'
    };

    this.trackEvent(eventData);

    // GA4 share event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: contentType,
        item_id: contentId
      });
    }
  }

  // Extract content theme from titles
  extractContentTheme(title) {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('toxic') || titleLower.includes('culture')) {
      return 'toxic_culture_transformation';
    } else if (titleLower.includes('leadership') || titleLower.includes('leader')) {
      return 'culinary_leadership';
    } else if (titleLower.includes('mirror') || titleLower.includes('self')) {
      return 'self_awareness';
    } else if (titleLower.includes('operational') || titleLower.includes('system')) {
      return 'operational_excellence';
    } else if (titleLower.includes('emotional') || titleLower.includes('burnout')) {
      return 'emotional_wellness';
    }
    
    return 'general_transformation';
  }

  // Enhanced engagement tracking
  setupEngagementTracking() {
    if (typeof window === 'undefined') return;

    // Scroll depth tracking with GA4 events
    let maxScroll = 0;
    const scrollMilestones = [25, 50, 75, 90, 100];
    
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      scrollMilestones.forEach(milestone => {
        if (scrollPercent >= milestone && maxScroll < milestone) {
          maxScroll = milestone;
          
          // GA4 scroll event
          if (window.gtag) {
            window.gtag('event', 'scroll', {
              percent_scrolled: milestone,
              custom_dimension_3: 'engagement'
            });
          }
          
          this.trackEvent({
            event: 'scroll_depth',
            event_category: 'engagement',
            event_label: `${milestone}%`,
            value: milestone,
            content_theme: this.extractContentTheme(document.title)
          });
        }
      });
    });

    // Time on page tracking
    this.startTime = Date.now();
    this.engagementTimer = setInterval(() => {
      const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
      
      // Track engagement milestones
      if (timeOnPage === 30 || timeOnPage === 60 || timeOnPage === 120) {
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'page_engagement',
            value: timeOnPage
          });
        }
      }
    }, 1000);

    // Track when user leaves
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
      
      if (window.gtag) {
        window.gtag('event', 'page_exit', {
          engagement_time_msec: timeOnPage * 1000,
          custom_dimension_3: 'exit'
        });
      }
      
      clearInterval(this.engagementTimer);
    });
  }

  // Enhanced content tracking
  setupContentTracking() {
    if (typeof window === 'undefined') return;

    // Video/Audio engagement with GA4 media events
    document.addEventListener('play', (e) => {
      if (e.target.tagName === 'VIDEO' || e.target.tagName === 'AUDIO') {
        if (window.gtag) {
          window.gtag('event', 'video_start', {
            video_title: e.target.title || 'embedded_media',
            video_url: e.target.src || window.location.href
          });
        }
        
        this.trackEvent({
          event: 'media_play',
          event_category: 'content_engagement',
          event_label: e.target.src || 'embedded_media',
          content_type: e.target.tagName.toLowerCase()
        });
      }
    }, true);

    // Track file downloads
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href) {
        const url = new URL(link.href, window.location.origin);
        const isDownload = link.hasAttribute('download') || 
                          /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|mp3|mp4)$/i.test(url.pathname);
        
        if (isDownload) {
          if (window.gtag) {
            window.gtag('event', 'file_download', {
              file_name: url.pathname.split('/').pop(),
              file_extension: url.pathname.split('.').pop(),
              link_url: link.href
            });
          }
        }
      }
    });
  }

  // Setup form tracking
  setupFormTracking() {
    if (typeof window === 'undefined') return;

    // Newsletter signup tracking
    document.addEventListener('submit', (e) => {
      const form = e.target;
      
      if (form.querySelector('input[type="email"]')) {
        const formType = this.identifyFormType(form);
        this.trackConversion('form_submission', null, {
          form_type: formType,
          form_location: window.location.pathname
        });
      }
    });
  }

  // Identify form type
  identifyFormType(form) {
    const formText = form.textContent.toLowerCase();
    
    if (formText.includes('newsletter') || formText.includes('subscribe')) {
      return 'newsletter';
    } else if (formText.includes('contact')) {
      return 'contact';
    } else if (formText.includes('register') || formText.includes('event')) {
      return 'event_registration';
    }
    
    return 'unknown';
  }

  // Track to database (existing method enhanced)
  async trackToDatabase(eventName, category, label = null, value = null, customData = {}) {
    try {
      const { default: supabase } = await import('./supabase');
      
      const eventData = {
        event_name: eventName,
        event_category: category,
        event_label: label,
        event_value: value,
        user_id: this.userId,
        session_id: this.sessionId,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        custom_properties: {
          ...customData,
          ga4_tracking_id: this.gaIds.ga4,
          gtm_container_id: this.gaIds.gtm
        }
      };

      const { error } = await supabase
        .from('analytics_events_clr2024')
        .insert([eventData]);

      if (error) {
        console.warn('Database tracking error:', error);
      }
    } catch (error) {
      console.warn('Database tracking failed:', error);
    }
  }

  // Track content interaction with GA4 enhancement
  async trackContentInteraction(contentType, contentId, interactionType, customData = {}) {
    const eventData = {
      event: `${contentType}_${interactionType}`,
      event_category: 'content_engagement',
      event_label: `${contentType}_${contentId}`,
      content_type: contentType,
      content_id: contentId,
      interaction_type: interactionType,
      ...customData
    };

    this.trackEvent(eventData);

    // Track to database
    try {
      const { default: supabase } = await import('./supabase');
      
      await supabase.rpc('track_content_interaction', {
        p_content_type: contentType,
        p_content_id: contentId,
        p_content_slug: customData.slug || null,
        p_metric_type: interactionType,
        p_metric_value: customData.value || 1,
        p_user_id: this.userId,
        p_session_id: this.sessionId,
        p_source: customData.source || 'website'
      });
    } catch (error) {
      console.warn('Content interaction tracking failed:', error);
    }
  }

  // Track conversions with GA4 enhancement
  async trackConversion(conversionType, value = null, customData = {}) {
    const eventData = {
      event: 'conversion',
      event_category: 'conversion',
      event_label: conversionType,
      value: value,
      conversion_type: conversionType,
      user_journey_stage: 'conversion',
      ...customData
    };

    this.trackEvent(eventData);

    // Track to database
    try {
      const { default: supabase } = await import('./supabase');
      
      await supabase.rpc('track_conversion', {
        p_conversion_type: conversionType,
        p_user_id: this.userId,
        p_session_id: this.sessionId,
        p_conversion_value: value,
        p_source: customData.source || 'website',
        p_medium: customData.medium || 'organic',
        p_campaign: customData.campaign || null,
        p_custom_data: customData
      });
    } catch (error) {
      console.warn('Conversion tracking failed:', error);
    }
  }

  // Process queued events
  processQueue() {
    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (item.type === 'event') {
        this.trackEvent(item.data);
      }
    }
  }

  // Get analytics data (existing methods remain the same)
  async getAnalyticsData(startDate, endDate) {
    try {
      const { default: supabase } = await import('./supabase');
      
      const { data, error } = await supabase.rpc('get_analytics_dashboard', {
        p_start_date: startDate,
        p_end_date: endDate
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      return { success: false, error: error.message };
    }
  }

  // Get top content
  async getTopContent(contentType = 'blog', metricType = 'view', limit = 10, days = 30) {
    try {
      const { default: supabase } = await import('./supabase');
      
      const { data, error } = await supabase.rpc('get_top_content', {
        p_content_type: contentType,
        p_metric_type: metricType,
        p_limit: limit,
        p_days: days
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching top content:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create global analytics instance
const analytics = new AnalyticsService();

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      analytics.init();
    });
  } else {
    analytics.init();
  }
}

export default analytics;