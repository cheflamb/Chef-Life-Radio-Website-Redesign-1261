# Chef Life Radio - Google Analytics 4 Setup Guide

## 🎯 **GA4 Configuration Complete**

Your Chef Life Radio website is now fully integrated with Google Analytics 4 using your tracking IDs:
- **GA4 Property**: `G-J22BB7N5LF`
- **Google Tag Manager**: `GT-MBLK5B3`

## 📊 **What's Been Configured**

### **1. Enhanced Measurement**
Automatically tracks:
- **Page views** - Every page visit
- **Scrolls** - 90% scroll depth milestone
- **Outbound clicks** - Links to external sites
- **Site search** - Internal search functionality
- **Video engagement** - YouTube video interactions
- **File downloads** - PDF, audio, and document downloads

### **2. Custom Dimensions**
Set up 4 custom dimensions specific to Chef Life Radio:

| Dimension | Purpose | Example Values |
|-----------|---------|----------------|
| `custom_dimension_1` | Brand Voice | sardonic-mystic, restorative-rebel, operational-coach |
| `custom_dimension_2` | Content Category | podcast, blog, event, video |
| `custom_dimension_3` | User Journey Stage | discovery, engagement, conversion |
| `custom_dimension_4` | Content Theme | toxic_culture_transformation, culinary_leadership |

### **3. Content Groupings**
- **Content Group 1**: Chef Life Radio (site-wide)
- **Content Group 2**: Culinary Transformation (theme-based)

### **4. Privacy Settings**
- **IP Anonymization**: Enabled
- **Google Signals**: Disabled (privacy-first)
- **Ad Personalization**: Disabled

## 🔧 **GA4 Admin Setup Required**

### **Step 1: Configure Custom Dimensions**
In your GA4 property (`G-J22BB7N5LF`), go to **Admin > Custom Definitions > Custom Dimensions** and create:

```
1. Brand Voice
   - Parameter name: brand_voice
   - Scope: Event
   - Description: Chef Life Radio brand voice categories

2. Content Category  
   - Parameter name: content_category
   - Scope: Event
   - Description: Type of content (podcast, blog, event)

3. User Journey Stage
   - Parameter name: user_journey_stage
   - Scope: Event  
   - Description: Stage in user transformation journey

4. Content Theme
   - Parameter name: content_theme
   - Scope: Event
   - Description: Thematic content categorization
```

### **Step 2: Set Up Conversions**
Mark these events as conversions in **Admin > Events**:
- `sign_up` (Newsletter signups)
- `purchase` (Event ticket sales)
- `podcast_play` (Podcast engagement)
- `blog_read` (Content engagement)

### **Step 3: Configure Audiences**
Create audiences for:
- **Engaged Podcast Listeners** (played >30 seconds)
- **Blog Readers** (viewed >1 blog post)
- **Newsletter Subscribers** (completed signup)
- **Event Attendees** (purchased tickets)

## 📈 **Key Events Being Tracked**

### **Automatic Events**
- `page_view` - Every page load
- `scroll` - 90% scroll depth
- `click` - Outbound link clicks
- `file_download` - Document downloads
- `video_start` - Video play events

### **Chef Life Radio Custom Events**
- `podcast_play` - Podcast episode starts
- `blog_read` - Blog post views
- `newsletter_signup` - Email signups
- `event_registration` - Ticket purchases
- `feedback_submission` - Feedback form submissions

### **Enhanced Ecommerce Events**
- `purchase` - Event ticket sales
- `view_item` - Content views
- `add_to_cart` - (Future: merchandise)

## 🎪 **Google Tag Manager Configuration**

Your GTM container (`GT-MBLK5B3`) should include:

### **Built-in Variables (Enable these)**
- Page URL
- Page Title
- Referrer
- User Agent
- Scroll Depth Percentage
- Video Title
- Video URL

### **Custom Variables**
```javascript
// User ID Variable
function() {
  return localStorage.getItem('clr_user_id') || 'anonymous';
}

// Session ID Variable  
function() {
  return sessionStorage.getItem('clr_session_id') || 'no_session';
}

// Site Section Variable
function() {
  var path = {{Page Path}};
  if (path.indexOf('/podcast') > -1) return 'podcast';
  if (path.indexOf('/blog') > -1) return 'blog';
  if (path.indexOf('/events') > -1) return 'events';
  return 'other';
}
```

### **Recommended Tags**
1. **GA4 Configuration Tag** (already firing)
2. **Facebook Pixel** (future social tracking)
3. **Hotjar** (user behavior analysis)
4. **Email Marketing Pixels** (Mailchimp, ConvertKit)

## 📊 **Custom Reports to Create**

### **1. Content Performance Report**
- **Dimensions**: Page Title, Brand Voice, Content Category
- **Metrics**: Views, Engagement Rate, Conversions
- **Filter**: Content Category contains "blog" OR "podcast"

### **2. User Journey Analysis**
- **Dimensions**: User Journey Stage, Content Theme
- **Metrics**: Users, Sessions, Conversion Rate
- **Segments**: New vs Returning Users

### **3. Podcast Analytics**
- **Dimensions**: Event Name, Custom Dimension 1 (Brand Voice)
- **Metrics**: Event Count, Unique Users
- **Filter**: Event Name = "podcast_play"

### **4. Newsletter Performance**
- **Dimensions**: Source/Medium, Page Path
- **Metrics**: Sign-ups (Conversions)
- **Filter**: Conversion Event = "sign_up"

## 🔍 **Real-time Monitoring**

### **Events to Watch in Real-time**
- Newsletter signups (`sign_up`)
- Podcast plays (`podcast_play`) 
- Blog engagement (`blog_read`)
- Event registrations (`purchase`)

### **Debugging Events**
Use **Admin > DebugView** to verify events are firing correctly:
1. Enable debug mode in your browser
2. Navigate through your site
3. Verify custom parameters are populating

## 🎯 **Key Metrics for Chef Life Radio**

### **Engagement Metrics**
- **Podcast Play Rate**: % of visitors who play podcasts
- **Blog Reading Time**: Average time on blog posts
- **Newsletter Signup Rate**: % of visitors who subscribe
- **Cross-content Consumption**: Blog readers who listen to podcasts

### **Brand Voice Performance**
- **Engagement by Brand Voice**: Which voice drives most interaction
- **Conversion by Voice**: Which voice converts best
- **Content Theme Popularity**: Most engaging transformation topics

### **User Journey Analysis**
- **Discovery to Engagement**: Time to first content interaction
- **Engagement to Conversion**: Path to newsletter signup
- **Multi-visit Behavior**: Return visitor content preferences

## 🚀 **Advanced Analytics Features**

### **Predictive Metrics (Available Soon)**
- **Purchase Probability**: Likelihood to buy event tickets
- **Churn Probability**: Risk of losing newsletter subscribers
- **Revenue Prediction**: Forecasted event ticket sales

### **Attribution Modeling**
- Track multi-channel conversion paths
- Understand which content drives newsletter signups
- Optimize content strategy based on attribution data

---

## ✅ **Setup Complete!**

Your Chef Life Radio website now has enterprise-level analytics with:
- ✅ **GA4 tracking** with your actual property ID
- ✅ **Google Tag Manager** integration  
- ✅ **Custom dimensions** for brand voice and content analysis
- ✅ **Enhanced ecommerce** for event ticket tracking
- ✅ **Privacy-compliant** configuration
- ✅ **Real-time event monitoring**

Start monitoring your transformation impact immediately! 📊🎙️✨