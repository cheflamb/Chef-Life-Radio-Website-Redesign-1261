import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import FeedbackButton from './components/FeedbackButton';
import Home from './pages/Home';
import Podcast from './pages/Podcast';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import Events from './pages/Events';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Unsubscribe from './pages/Unsubscribe';
import ContentDashboard from './pages/ContentDashboard';
import questConfig from './questConfig';
import './App.css';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              {/* Development Dashboard - Remove in production */}
              <Route path="/dashboard" element={<ContentDashboard />} />
            </Routes>
          </main>
          <Footer />
          
          {/* Global Feedback Button - Available on all pages */}
          <FeedbackButton />
          
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </QuestProvider>
  );
}

export default App;