import supabase from './supabase';

class ContentManager {
  // Podcast Episodes
  async getLatestEpisode() {
    try {
      const { data, error } = await supabase
        .from('podcast_episodes_clr2024')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching latest episode:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllEpisodes(limit = null) {
    try {
      let query = supabase
        .from('podcast_episodes_clr2024')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching episodes:', error);
      return { success: false, error: error.message };
    }
  }

  async getFeaturedEpisodes() {
    try {
      const { data, error } = await supabase
        .from('podcast_episodes_clr2024')
        .select('*')
        .eq('status', 'published')
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching featured episodes:', error);
      return { success: false, error: error.message };
    }
  }

  // Blog Posts
  async getRecentBlogPosts(limit = 3) {
    try {
      const { data, error } = await supabase
        .from('blog_posts_clr2024')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { success: false, error: error.message };
    }
  }

  async getBlogPostBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('blog_posts_clr2024')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      
      // Increment view count
      await this.incrementBlogPostViews(data.id);
      
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return { success: false, error: error.message };
    }
  }

  async incrementBlogPostViews(postId) {
    try {
      const { error } = await supabase.rpc('increment_blog_views', {
        post_id: postId
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error incrementing blog views:', error);
    }
  }

  async searchBlogPosts(searchTerm, category = 'all') {
    try {
      let query = supabase
        .from('blog_posts_clr2024')
        .select('*')
        .eq('status', 'published');

      if (category !== 'all') {
        query = query.eq('category', category);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
      }

      const { data, error } = await query.order('published_at', { ascending: false });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error searching blog posts:', error);
      return { success: false, error: error.message };
    }
  }

  // Events
  async getUpcomingEvents(limit = 3) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('events_clr2024')
        .select('*')
        .gte('date', today)
        .neq('status', 'completed')
        .order('date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllEvents() {
    try {
      const { data, error } = await supabase
        .from('events_clr2024')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching all events:', error);
      return { success: false, error: error.message };
    }
  }

  async getEventById(eventId) {
    try {
      const { data, error } = await supabase
        .from('events_clr2024')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching event:', error);
      return { success: false, error: error.message };
    }
  }

  // Newsletter Management
  async subscribeToNewsletter(email, name = null, source = 'website') {
    try {
      const unsubscribeToken = crypto.randomUUID();
      
      const { data, error } = await supabase
        .from('newsletter_subscribers_clr2024')
        .insert([{
          email: email.toLowerCase().trim(),
          name: name?.trim() || null,
          source,
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
          // Unique constraint violation - already subscribed
          return { 
            success: false, 
            error: 'Email already subscribed',
            code: 'ALREADY_SUBSCRIBED'
          };
        }
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      return { success: false, error: error.message };
    }
  }

  // Contact Messages
  async submitContactMessage(messageData) {
    try {
      const { data, error } = await supabase
        .from('contact_messages_clr2024')
        .insert([{
          ...messageData,
          status: 'new'
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting contact message:', error);
      return { success: false, error: error.message };
    }
  }

  // Event Registration
  async registerForEvent(eventId, registrationData) {
    try {
      const confirmationNumber = `CLR-${Date.now()}`;
      
      const { data, error } = await supabase
        .from('event_registrations_clr2024')
        .insert([{
          event_id: eventId,
          ...registrationData,
          confirmation_number: confirmationNumber,
          status: 'confirmed'
        }])
        .select()
        .single();

      if (error) throw error;

      // Update event attendee count
      await this.updateEventAttendeeCount(eventId, registrationData.tickets);

      return { success: true, data };
    } catch (error) {
      console.error('Error registering for event:', error);
      return { success: false, error: error.message };
    }
  }

  async updateEventAttendeeCount(eventId, ticketCount) {
    try {
      const { error } = await supabase.rpc('update_event_attendees', {
        event_id: eventId,
        ticket_count: ticketCount
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error updating event attendee count:', error);
    }
  }

  // Analytics and Stats
  async getContentStats() {
    try {
      const [episodeCount, blogCount, eventCount, subscriberCount] = await Promise.all([
        supabase.from('podcast_episodes_clr2024').select('id', { count: 'exact' }).eq('status', 'published'),
        supabase.from('blog_posts_clr2024').select('id', { count: 'exact' }).eq('status', 'published'),
        supabase.from('events_clr2024').select('id', { count: 'exact' }),
        supabase.from('newsletter_subscribers_clr2024').select('id', { count: 'exact' }).eq('status', 'active')
      ]);

      return {
        success: true,
        data: {
          episodes: episodeCount.count || 0,
          blogPosts: blogCount.count || 0,
          events: eventCount.count || 0,
          subscribers: subscriberCount.count || 0
        }
      };
    } catch (error) {
      console.error('Error fetching content stats:', error);
      return { success: false, error: error.message };
    }
  }

  // RSS Feed Integration
  async syncPodcastFeed(feedUrl = 'https://feeds.captivate.fm/therealchefliferadio/') {
    try {
      // This would integrate with the RSS feed parsing
      // For now, return success to indicate the function exists
      console.log('RSS feed sync would happen here:', feedUrl);
      return { success: true, message: 'RSS sync functionality ready for implementation' };
    } catch (error) {
      console.error('Error syncing podcast feed:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new ContentManager();