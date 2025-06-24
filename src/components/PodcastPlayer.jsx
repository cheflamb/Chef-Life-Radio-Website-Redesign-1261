import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2, FiExternalLink, FiRadio } = FiIcons;

const PodcastPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [latestEpisode, setLatestEpisode] = useState(null);
  const [showEmbedded, setShowEmbedded] = useState(true);

  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        const { data, error } = await supabase
          .from('podcast_episodes_clr2024')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          const episode = data[0];
          setLatestEpisode({
            title: episode.title,
            description: episode.description,
            duration: episode.duration,
            publishDate: episode.published_at,
            audioUrl: episode.audio_url || "https://feeds.captivate.fm/therealchefliferadio/",
            imageUrl: episode.image_url || "/clr-podcast-cover.png",
            guestName: episode.guest_name,
            episodeNumber: episode.episode_number
          });
          const [minutes, seconds] = episode.duration.split(':');
          setDuration(parseInt(minutes) * 60 + parseInt(seconds));
        } else {
          setLatestEpisode({
            title: "Breaking the Toxic Kitchen Culture: The Mirror Episode",
            description: "We hold up mirrors, not because we're cruel, but because we're kind. Sometimes the most loving thing we can do is show you what you can't see yourself.",
            duration: "45:32",
            publishDate: "2024-01-15",
            audioUrl: "https://feeds.captivate.fm/therealchefliferadio/",
            imageUrl: "/clr-podcast-cover.png",
            guestName: "Maria Rodriguez",
            episodeNumber: 1
          });
          setDuration(2732);
        }
      } catch (error) {
        console.error('Error fetching latest episode:', error);
        setLatestEpisode({
          title: "Breaking the Toxic Kitchen Culture: The Mirror Episode",
          description: "We hold up mirrors, not because we're cruel, but because we're kind.",
          duration: "45:32",
          publishDate: "2024-01-15",
          audioUrl: "https://feeds.captivate.fm/therealchefliferadio/",
          imageUrl: "/clr-podcast-cover.png",
          guestName: "Maria Rodriguez",
          episodeNumber: 1
        });
        setDuration(2732);
      }
    };

    fetchLatestEpisode();
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!latestEpisode) {
    return (
      <div className="card p-6 animate-pulse bg-white">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="card p-6 shadow-lg bg-white border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Episode Info */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-shrink-0">
          <img
            src={latestEpisode.imageUrl}
            alt={latestEpisode.title}
            className="w-20 h-20 rounded-lg object-cover shadow-md"
            onError={(e) => {
              e.target.src = "/clr-logo-main.png";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-gotham font-semibold text-black truncate text-lg">
            {latestEpisode.title}
          </h3>
          <p className="text-sm text-gray-600 truncate font-poppins">
            {latestEpisode.description}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-xs text-clr-red font-montserrat font-medium uppercase tracking-wide">
              Episode {latestEpisode.episodeNumber} • {latestEpisode.duration}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-600 font-montserrat">
              {formatDate(latestEpisode.publishDate)}
            </span>
          </div>
          {latestEpisode.guestName && (
            <p className="text-xs text-gray-500 font-montserrat mt-1">
              Guest: {latestEpisode.guestName}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowEmbedded(!showEmbedded)}
            className="p-2 text-gray-500 hover:text-clr-gold transition-colors rounded-lg"
            title={showEmbedded ? "Show Custom Player" : "Show Embedded Player"}
          >
            <SafeIcon icon={FiRadio} className="text-lg" />
          </button>
          <a
            href="https://feeds.captivate.fm/therealchefliferadio/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-clr-gold transition-colors rounded-lg"
            title="Open in Podcast App"
          >
            <SafeIcon icon={FiExternalLink} className="text-lg" />
          </a>
        </div>
      </div>

      {/* Captivate FM Embedded Player */}
      {showEmbedded ? (
        <div className="mb-4">
          <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <iframe
              style={{ width: '100%', height: '100%' }}
              frameBorder="no"
              scrolling="no"
              allow="clipboard-write"
              seamless
              src="https://player.captivate.fm/show/1732ebe2-8fb0-4b83-837a-109af6810a94/latest/"
              title="Chef Life Radio Latest Episode Player"
            />
          </div>
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span className="font-montserrat">🎧 Live from Captivate FM</span>
            <button
              onClick={() => setShowEmbedded(false)}
              className="text-clr-red hover:text-red-800 transition-colors font-gotham"
            >
              Switch to Custom Player
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1 font-montserrat">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={((currentTime / duration) * 100) || 0}
              onChange={handleProgressChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #8B0000 0%, #8B0000 ${((currentTime / duration) * 100) || 0}%, #e5e5e5 ${((currentTime / duration) * 100) || 0}%, #e5e5e5 100%)`
              }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-clr-red transition-colors rounded-lg">
                <SafeIcon icon={FiSkipBack} className="text-xl" />
              </button>
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 bg-clr-red rounded-full flex items-center justify-center text-white hover:bg-red-800 transition-colors shadow-lg"
              >
                <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="text-xl ml-0.5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-clr-red transition-colors rounded-lg">
                <SafeIcon icon={FiSkipForward} className="text-xl" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiVolume2} className="text-gray-600" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8B0000 0%, #8B0000 ${volume}%, #e5e5e5 ${volume}%, #e5e5e5 100%)`
                }}
              />
            </div>
            <button
              onClick={() => setShowEmbedded(true)}
              className="text-clr-red hover:text-red-800 transition-colors text-sm font-gotham"
            >
              Use Live Player
            </button>
          </div>
        </>
      )}

      {/* Subscription Links */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2 font-montserrat">Listen on your favorite platform</p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://feeds.captivate.fm/therealchefliferadio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-clr-red text-white px-3 py-1 rounded-full hover:bg-red-800 transition-colors font-gotham"
            >
              RSS Feed
            </a>
            <a
              href="#"
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-clr-gold hover:text-black transition-colors font-gotham"
            >
              Apple Podcasts
            </a>
            <a
              href="#"
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-clr-red hover:text-white transition-colors font-gotham"
            >
              Spotify
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PodcastPlayer;