import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    // Initialize analytics
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-sm">
          We use cookies to improve your experience. By continuing to use our site, you agree to our use of cookies.
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={acceptCookies}
            className="bg-clr-red text-white px-4 py-2 rounded hover:bg-clr-red-dark"
          >
            Accept
          </button>
          <a href="/privacy" className="text-clr-gold hover:text-clr-gold-light">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;