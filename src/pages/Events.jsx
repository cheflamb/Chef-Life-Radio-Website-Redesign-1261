import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';
import emailService from '../lib/emailService';
import 'react-calendar/dist/Calendar.css';

const { FiCalendar, FiClock, FiMapPin, FiUsers, FiDollarSign, FiMic, FiX, FiCreditCard, FiCheck, FiRadio } = FiIcons;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    tickets: 1
  });
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events_clr2024')
          .select('*')
          .order('date', { ascending: true });

        if (error) throw error;

        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to mock data
        const mockEvents = [
          {
            id: 1,
            title: "Chef Life Radio LIVE: Breaking Toxic Kitchen Culture",
            description: "Join us for a live recording of Chef Life Radio as we dive deep into breaking the toxic patterns that have plagued professional kitchens.",
            date: "2024-02-15",
            time: "19:00:00",
            end_time: "21:00:00",
            type: "live",
            location: "Live Studio Recording",
            venue: "Chef Life Radio Studio, New York, NY",
            price: 45.00,
            max_attendees: 75,
            current_attendees: 52,
            image_url: "/clr-podcast-cover.png",
            featured: true,
            host: "Chef Life Radio Team",
            includes: [
              "Live podcast recording experience",
              "Meet & greet with hosts",
              "Behind-the-scenes studio access",
              "Complimentary refreshments"
            ],
            requirements: [
              "Must be 18+ to attend",
              "No recording devices allowed"
            ]
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

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsRegistering(true);

    try {
      const confirmationNumber = `CLR-${Date.now()}`;
      const totalAmount = selectedEvent.price * registrationData.tickets;

      // Insert registration
      const { data: registration, error: regError } = await supabase
        .from('event_registrations_clr2024')
        .insert([{
          event_id: selectedEvent.id,
          name: registrationData.name.trim(),
          email: registrationData.email.toLowerCase().trim(),
          phone: registrationData.phone?.trim() || null,
          tickets: registrationData.tickets,
          total_amount: totalAmount,
          confirmation_number: confirmationNumber,
          status: 'confirmed'
        }])
        .select()
        .single();

      if (regError) throw regError;

      // Update event attendee count
      const newAttendeeCount = selectedEvent.current_attendees + registrationData.tickets;
      const { error: updateError } = await supabase
        .from('events_clr2024')
        .update({ 
          current_attendees: newAttendeeCount,
          sold_out: newAttendeeCount >= selectedEvent.max_attendees
        })
        .eq('id', selectedEvent.id);

      if (updateError) throw updateError;

      // Send confirmation email
      const emailResult = await emailService.sendEventConfirmation({
        name: registrationData.name.trim(),
        email: registrationData.email.toLowerCase().trim(),
        tickets: registrationData.tickets,
        total_amount: totalAmount,
        confirmation_number: confirmationNumber,
        event: selectedEvent
      });

      if (emailResult.success) {
        toast.success(
          'Registration successful! Check your email for confirmation and event details.',
          { autoClose: 7000 }
        );
      } else {
        toast.success('Registration successful! Confirmation email coming soon.');
      }

      setIsModalOpen(false);
      setRegistrationData({ name: '', email: '', phone: '', tickets: 1 });
      
      // Update local state
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, current_attendees: newAttendeeCount }
          : event
      ));
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again or contact us directly.');
    } finally {
      setIsRegistering(false);
    }
  };

  const openRegistration = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const today = new Date();
  const upcomingEvents = events.filter(event => 
    new Date(event.date) >= today && event.type !== 'past'
  );
  const pastEvents = events.filter(event => 
    new Date(event.date) < today || event.type === 'past'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-clr-red to-clr-gold rounded-full flex items-center justify-center">
                <SafeIcon icon={FiRadio} className="text-white text-3xl" />
              </div>
            </div>
            <h1 className="text-5xl font-bold font-easterly text-gray-900 mb-4">
              Chef Life Radio <span className="gradient-text">LIVE</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Experience the raw, transformative conversations of Chef Life Radio recorded live in front of an audience. 
              Witness the magic as we challenge toxic kitchen culture together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-gotham">Event Calendar</h3>
                <Calendar
                  value={selectedDate}
                  onChange={setSelectedDate}
                  tileClassName={({ date }) => {
                    const hasEvent = getEventsForDate(date).length > 0;
                    return hasEvent ? 'has-event' : '';
                  }}
                  className="w-full"
                />
                {getEventsForDate(selectedDate).length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3 font-gotham">
                      Events on {selectedDate.toLocaleDateString()}
                    </h4>
                    <div className="space-y-2">
                      {getEventsForDate(selectedDate).map(event => (
                        <div key={event.id} className="p-3 bg-clr-red/10 rounded-lg">
                          <h5 className="font-medium text-gray-900 text-sm font-gotham">{event.title}</h5>
                          <p className="text-xs text-gray-600 font-montserrat">{formatTime(event.time)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Upcoming Events */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 font-easterly">Upcoming Live Shows</h2>
                {isLoading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                        <div className="flex space-x-4">
                          <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
                          <div className="flex-1 space-y-3">
                            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                          event.featured ? 'ring-2 ring-clr-gold' : ''
                        }`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-48 h-48 md:h-auto">
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                              }}
                            />
                            {event.featured && (
                              <div className="absolute top-4 left-4 bg-clr-gold text-white px-3 py-1 rounded-full text-sm font-medium font-gotham">
                                Featured
                              </div>
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                              <SafeIcon icon={FiMic} className="text-clr-red" />
                            </div>
                          </div>
                          
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 font-gotham">
                                  {event.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2 font-poppins">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600 font-montserrat">
                                  <SafeIcon icon={FiCalendar} className="mr-2 text-clr-red" />
                                  {formatDate(event.date)}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 font-montserrat">
                                  <SafeIcon icon={FiClock} className="mr-2 text-clr-red" />
                                  {formatTime(event.time)} - {formatTime(event.end_time)}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 font-montserrat">
                                  <SafeIcon icon={FiMapPin} className="mr-2 text-clr-red" />
                                  {event.location}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600 font-montserrat">
                                  <SafeIcon icon={FiUsers} className="mr-2 text-clr-red" />
                                  <span className={getAvailabilityColor(event.current_attendees, event.max_attendees)}>
                                    {event.max_attendees - event.current_attendees} spots left
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 font-montserrat">
                                  <SafeIcon icon={FiDollarSign} className="mr-2 text-clr-red" />
                                  ${event.price}
                                </div>
                                <div className="text-sm text-gray-600 font-montserrat">
                                  Host: {event.host}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500 font-montserrat">
                                {event.current_attendees}/{event.max_attendees} registered
                              </div>
                              <button
                                onClick={() => openRegistration(event)}
                                disabled={event.current_attendees >= event.max_attendees}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors font-gotham ${
                                  event.current_attendees >= event.max_attendees
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'gradient-bg text-white hover:opacity-90'
                                }`}
                              >
                                {event.current_attendees >= event.max_attendees ? 'Sold Out' : 'Get Tickets'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 font-easterly">Past Live Shows</h2>
                  <div className="space-y-4">
                    {pastEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        className="bg-white rounded-xl shadow-lg p-6 opacity-75"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.75, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 font-gotham">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 font-poppins">
                              {event.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 font-montserrat">
                              <span>{formatDate(event.date)}</span>
                              <span>•</span>
                              <span>{event.sold_out ? 'Sold Out' : `${event.current_attendees}/${event.max_attendees} attended`}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content max-w-2xl mx-auto mt-20 bg-white rounded-2xl shadow-2xl overflow-hidden"
        overlayClassName="modal-overlay fixed inset-0 z-50 flex items-start justify-center p-4"
      >
        {selectedEvent && (
          <div>
            <div className="relative h-48">
              <img
                src={selectedEvent.image_url}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                }}
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <SafeIcon icon={FiX} className="text-gray-700" />
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-easterly">
                Get Tickets for {selectedEvent.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 font-gotham">Event Details</h3>
                  <div className="space-y-2 text-sm text-gray-600 font-montserrat">
                    <div className="flex items-center">
                      <SafeIcon icon={FiCalendar} className="mr-2" />
                      {formatDate(selectedEvent.date)}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="mr-2" />
                      {formatTime(selectedEvent.time)} - {formatTime(selectedEvent.end_time)}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiMapPin} className="mr-2" />
                      {selectedEvent.venue}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 font-gotham">What's Included</h3>
                  <ul className="text-sm text-gray-600 space-y-1 font-poppins">
                    {selectedEvent.includes?.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <SafeIcon icon={FiCheck} className="mr-2 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <form onSubmit={handleRegistration} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-gotham">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={registrationData.name}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clr-red font-poppins"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-gotham">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clr-red font-poppins"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      📧 You'll receive confirmation and event details via email
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-gotham">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={registrationData.phone}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clr-red font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-gotham">
                      Number of Tickets
                    </label>
                    <select
                      value={registrationData.tickets}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, tickets: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-clr-red font-poppins"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-lg font-semibold font-gotham">
                    <span>Total:</span>
                    <span>${selectedEvent.price * registrationData.tickets}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <SafeIcon icon={FiCheck} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Instant Confirmation</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    You'll receive an immediate confirmation email with event details, 
                    directions, and what to expect.
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full flex items-center justify-center px-6 py-3 gradient-bg text-white font-semibold rounded-lg hover:opacity-90 transition-opacity font-gotham disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRegistering ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <SafeIcon icon={FiCreditCard} className="mr-2" />
                  )}
                  {isRegistering ? 'Processing...' : 'Purchase Tickets'}
                </button>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Events;