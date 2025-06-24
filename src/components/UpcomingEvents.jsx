import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const { FiCalendar, FiClock, FiMapPin, FiUsers, FiExternalLink, FiVideo } = FiIcons;

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('events_clr2024')
          .select('*')
          .gte('date', today)
          .neq('status', 'completed')
          .order('date', { ascending: true })
          .limit(3);

        if (error) throw error;

        if (data && data.length > 0) {
          setEvents(data);
        } else {
          // Fallback to mock data if no real events exist
          const mockEvents = [
            {
              id: 1,
              title: "Chef Life Radio LIVE: Breaking Toxic Kitchen Culture",
              description: "Join us for a live recording of Chef Life Radio as we dive deep into breaking the toxic patterns that have plagued professional kitchens.",
              date: "2024-02-15",
              time: "19:00:00",
              end_time: "21:30:00",
              type: "live",
              location: "Live Studio Recording",
              venue: "Chef Life Radio Studio, New York, NY",
              price: 45,
              max_attendees: 75,
              current_attendees: 52,
              image_url: "/clr-podcast-cover.png",
              featured: true,
              host: "Chef Life Radio Team"
            },
            {
              id: 2,
              title: "The Mirror Workshop: Self-Awareness for Kitchen Leaders",
              description: "A deep-dive workshop designed specifically for culinary professionals ready to examine their leadership style and create lasting change.",
              date: "2024-02-28",
              time: "10:00:00",
              end_time: "16:00:00",
              type: "workshop",
              location: "Interactive Workshop",
              venue: "Culinary Institute Workshop Space, Brooklyn, NY",
              price: 125,
              max_attendees: 25,
              current_attendees: 18,
              image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              featured: false,
              host: "Maria Rodriguez & David Chen"
            }
          ];
          setEvents(mockEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to mock data on error
        const mockEvents = [
          {
            id: 1,
            title: "Chef Life Radio LIVE: Breaking Toxic Kitchen Culture",
            description: "Join us for a live recording of Chef Life Radio as we dive deep into breaking the toxic patterns that have plagued professional kitchens.",
            date: "2024-02-15",
            time: "19:00:00",
            end_time: "21:30:00",
            type: "live",
            location: "Live Studio Recording",
            venue: "Chef Life Radio Studio, New York, NY",
            price: 45,
            max_attendees: 75,
            current_attendees: 52,
            image_url: "/clr-podcast-cover.png",
            featured: true,
            host: "Chef Life Radio Team"
          }
        ];
        setEvents(mockEvents);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getAvailabilityColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              <div className="flex items-center space-x-4">
                <div className="h-8 bg-gray-300 rounded w-20"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg font-poppins">No upcoming transformation sessions scheduled.</p>
        <p className="text-sm text-gray-400 mt-2 font-montserrat">Check back soon for new events!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
            event.featured ? 'ring-2 ring-clr-gold' : ''
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            {event.featured && (
              <div className="absolute top-4 left-4 bg-clr-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
            )}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
              <SafeIcon icon={event.type === 'live' ? FiVideo : FiUsers} className="text-clr-red" />
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 font-gotham">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2 font-poppins">
              {event.description}
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiCalendar} className="mr-2 text-clr-red" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiClock} className="mr-2 text-clr-red" />
                {formatTime(event.time)} {event.end_time && `- ${formatTime(event.end_time)}`}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiMapPin} className="mr-2 text-clr-red" />
                {event.venue || event.location}
              </div>
              {event.host && (
                <div className="text-sm text-gray-600">
                  <strong>Host:</strong> {event.host}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <span className="text-gray-500">Availability: </span>
                <span className={`font-medium ${getAvailabilityColor(event.current_attendees, event.max_attendees)}`}>
                  {event.max_attendees - event.current_attendees} spots left
                </span>
              </div>
              <div className="text-lg font-bold text-clr-red">
                ${event.price}
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/events`}
                className="flex-1 bg-clr-red text-white text-center py-2 px-4 rounded-lg hover:bg-clr-red/90 transition-colors font-medium"
              >
                Register Now
              </Link>
              <button className="p-2 border border-gray-300 rounded-lg hover:border-clr-red hover:text-clr-red transition-colors">
                <SafeIcon icon={FiExternalLink} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UpcomingEvents;