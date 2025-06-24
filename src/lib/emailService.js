import supabase from './supabase';

class EmailService {
  constructor() {
    this.baseUrl = 'https://api.resend.com/emails';
    this.apiKey = 'YOUR_RESEND_API_KEY'; // Replace with actual API key
  }

  // Queue an email to be sent
  async queueEmail(emailData) {
    try {
      const { data, error } = await supabase
        .from('email_queue_clr2024')
        .insert([{
          to_email: emailData.to,
          from_email: emailData.from || 'hello@chefliferadio.com',
          from_name: emailData.fromName || 'Chef Life Radio',
          subject: emailData.subject,
          html_content: emailData.html,
          text_content: emailData.text,
          template_name: emailData.templateName,
          variables: emailData.variables || {}
        }]);

      if (error) throw error;

      // In production, trigger email sending via webhook or background job
      // For demo, we'll simulate immediate sending
      if (emailData.sendNow) {
        await this.sendQueuedEmail(data[0].id);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error queueing email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send welcome email for newsletter signup
  async sendWelcomeEmail(subscriberData) {
    try {
      const template = await this.getTemplate('newsletter_welcome');
      if (!template) throw new Error('Welcome email template not found');

      const variables = {
        name: subscriberData.name || 'Fellow Chef',
        latest_episode_url: 'https://chefliferadio.com/podcast',
        unsubscribe_url: `https://chefliferadio.com/unsubscribe?token=${subscriberData.unsubscribe_token}`,
        preferences_url: `https://chefliferadio.com/preferences?token=${subscriberData.unsubscribe_token}`
      };

      const emailContent = this.processTemplate(template, variables);

      return await this.queueEmail({
        to: subscriberData.email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        templateName: 'newsletter_welcome',
        variables,
        sendNow: true
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send contact form confirmation
  async sendContactConfirmation(contactData) {
    try {
      const template = await this.getTemplate('contact_confirmation');
      if (!template) throw new Error('Contact confirmation template not found');

      const variables = {
        name: contactData.name,
        purpose: contactData.purpose,
        subject: contactData.subject,
        preferred_contact: contactData.preferred_contact,
        submitted_date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const emailContent = this.processTemplate(template, variables);

      return await this.queueEmail({
        to: contactData.email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        templateName: 'contact_confirmation',
        variables,
        sendNow: true
      });
    } catch (error) {
      console.error('Error sending contact confirmation:', error);
      return { success: false, error: error.message };
    }
  }

  // Send event registration confirmation
  async sendEventConfirmation(registrationData) {
    try {
      const template = await this.getTemplate('event_registration_confirmation');
      if (!template) throw new Error('Event confirmation template not found');

      const variables = {
        name: registrationData.name,
        event_title: registrationData.event.title,
        event_date: new Date(registrationData.event.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        event_time: registrationData.event.time,
        event_location: registrationData.event.venue,
        ticket_count: registrationData.tickets,
        ticket_price: registrationData.event.price,
        total_amount: registrationData.total_amount,
        confirmation_number: registrationData.confirmation_number || `CLR-${Date.now()}`
      };

      const emailContent = this.processTemplate(template, variables);

      return await this.queueEmail({
        to: registrationData.email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        templateName: 'event_registration_confirmation',
        variables,
        sendNow: true
      });
    } catch (error) {
      console.error('Error sending event confirmation:', error);
      return { success: false, error: error.message };
    }
  }

  // Get email template from database
  async getTemplate(templateName) {
    try {
      const { data, error } = await supabase
        .from('email_templates_clr2024')
        .select('*')
        .eq('name', templateName)
        .eq('active', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching template:', error);
      return null;
    }
  }

  // Process template with variables
  processTemplate(template, variables) {
    let html = template.html_content;
    let text = template.text_content;
    let subject = template.subject;

    // Replace variables in content
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, variables[key] || '');
      text = text.replace(regex, variables[key] || '');
      subject = subject.replace(regex, variables[key] || '');
    });

    return { html, text, subject };
  }

  // Send queued email (would be called by background job in production)
  async sendQueuedEmail(queueId) {
    try {
      // Get email from queue
      const { data: queueItem, error: queueError } = await supabase
        .from('email_queue_clr2024')
        .select('*')
        .eq('id', queueId)
        .single();

      if (queueError) throw queueError;

      // Simulate email sending (in production, integrate with email service)
      const emailSent = await this.sendViaProvider(queueItem);

      // Update queue status
      const updateData = emailSent.success 
        ? { status: 'sent', sent_at: new Date().toISOString() }
        : { status: 'failed', error_message: emailSent.error, retry_count: (queueItem.retry_count || 0) + 1 };

      await supabase
        .from('email_queue_clr2024')
        .update(updateData)
        .eq('id', queueId);

      return emailSent;
    } catch (error) {
      console.error('Error sending queued email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send email via provider (Resend, SendGrid, etc.)
  async sendViaProvider(emailData) {
    try {
      // For demo purposes, we'll simulate successful sending
      // In production, replace with actual email service API call
      console.log('📧 Email would be sent:', {
        to: emailData.to_email,
        from: `${emailData.from_name} <${emailData.from_email}>`,
        subject: emailData.subject,
        template: emailData.template_name
      });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate 95% success rate
      const success = Math.random() > 0.05;
      
      if (success) {
        return { success: true, messageId: `msg_${Date.now()}` };
      } else {
        throw new Error('Simulated email service failure');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Handle unsubscribe
  async unsubscribe(token) {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers_clr2024')
        .update({ 
          status: 'unsubscribed',
          updated_at: new Date().toISOString()
        })
        .eq('unsubscribe_token', token);

      if (error) throw error;
      return { success: true, message: 'Successfully unsubscribed' };
    } catch (error) {
      console.error('Unsubscribe error:', error);
      return { success: false, error: error.message };
    }
  }

  // Update email preferences
  async updatePreferences(token, preferences) {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers_clr2024')
        .update({ 
          preferences,
          updated_at: new Date().toISOString()
        })
        .eq('unsubscribe_token', token);

      if (error) throw error;
      return { success: true, message: 'Preferences updated successfully' };
    } catch (error) {
      console.error('Update preferences error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get email statistics
  async getEmailStats() {
    try {
      const { data: queueStats, error: queueError } = await supabase
        .from('email_queue_clr2024')
        .select('status, created_at')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      const { data: subscriberStats, error: subError } = await supabase
        .from('newsletter_subscribers_clr2024')
        .select('status, created_at');

      if (queueError || subError) throw queueError || subError;

      const emailsSent = queueStats.filter(item => item.status === 'sent').length;
      const emailsFailed = queueStats.filter(item => item.status === 'failed').length;
      const emailsPending = queueStats.filter(item => item.status === 'pending').length;

      const activeSubscribers = subscriberStats.filter(item => item.status === 'active').length;
      const unsubscribed = subscriberStats.filter(item => item.status === 'unsubscribed').length;

      return {
        success: true,
        stats: {
          emails: {
            sent: emailsSent,
            failed: emailsFailed,
            pending: emailsPending,
            total: queueStats.length
          },
          subscribers: {
            active: activeSubscribers,
            unsubscribed,
            total: subscriberStats.length
          }
        }
      };
    } catch (error) {
      console.error('Error fetching email stats:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new EmailService();