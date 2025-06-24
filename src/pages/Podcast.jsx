import React,{useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PodcastPlayer from '../components/PodcastPlayer';

const {FiPlay,FiCalendar,FiClock,FiDownload,FiShare2,FiHeart,FiSearch,FiExternalLink,FiMic}=FiIcons;

const Podcast=()=> {
  const [episodes,setEpisodes]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [searchTerm,setSearchTerm]=useState('');
  const [selectedCategory,setSelectedCategory]=useState('all');

  useEffect(()=> {
    // Simulate fetching episodes from RSS feed
    const fetchEpisodes=async ()=> {
      try {
        const mockEpisodes=[ 
          {
            id: 1,
            title: "Breaking the Toxic Kitchen Culture",
            description: "Join us as we dive deep into transforming the harmful patterns that have plagued professional kitchens for decades. We explore real solutions for creating healthier work environments.",
            duration: "45:32",
            publishDate: "2024-01-15",
            category: "Transformation",
            audioUrl: "https://feeds.captivate.fm/therealchefliferadio/episode1.mp3",
            imageUrl: "/clr-podcast-cover.png",
            featured: true,
            plays: 25420,
            likes: 1250
          },
          {
            id: 2,
            title: "From Line Cook to Leader: Finding Your Voice",
            description: "Discover how to transition from surviving in the kitchen to thriving as a culinary leader. Real stories,practical advice,and transformational insights.",
            duration: "38:15",
            publishDate: "2024-01-10",
            category: "Leadership",
            audioUrl: "https://feeds.captivate.fm/therealchefliferadio/episode2.mp3",
            imageUrl: "/clr-podcast-cover.png",
            featured: false,
            plays: 18750,
            likes: 980
          },
          {
            id: 3,
            title: "The Mirror Episode: What You Can't See",
            description: "Sometimes the most loving thing we can do is show you what you can't see yourself. A deep dive into self-awareness and professional growth.",
            duration: "42:18",
            publishDate: "2024-01-05",
            category: "Transformation",
            audioUrl: "https://feeds.captivate.fm/therealchefliferadio/episode3.mp3",
            imageUrl: "/clr-podcast-cover.png",
            featured: false,
            plays: 22100,
            likes: 1156
          },
          {
            id: 4,
            title: "Sustainable Success: Building Without Burning Out",
            description: "Learn how to build a successful culinary career without sacrificing your mental health,relationships,or personal values.",
            duration: "35:45",
            publishDate: "2024-01-01",
            category: "Wellness",
            audioUrl: "https://feeds.captivate.fm/therealchefliferadio/episode4.mp3",
            imageUrl: "/clr-podcast-cover.png",
            featured: false,
            plays: 19800,
            likes: 987
          }
        ];

        await new Promise(resolve=> setTimeout(resolve,1000));
        setEpisodes(mockEpisodes);
      } catch (error) {
        console.error('Error fetching episodes:',error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  },[]);

  const categories=['all','Transformation','Leadership','Wellness','Business'];

  const filteredEpisodes=episodes.filter(episode=> {
    const matchesSearch=episode.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       episode.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory=selectedCategory==='all' || episode.category===selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate=(dateString)=> {
    const date=new Date(dateString);
    return date.toLocaleDateString('en-US',{
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{opacity: 0,y: 30}}
            animate={{opacity: 1,y: 0}}
            transition={{duration: 0.6}}
          >
            <div className="flex justify-center mb-8">
              <img 
                src="/clr-podcast-cover.png" 
                alt="Chef Life Radio Podcast" 
                className="w-32 h-32 rounded-2xl shadow-2xl"
                onError={(e)=> {
                  e.target.style.display='none';
                  e.target.nextSibling.style.display='flex';
                }}
              />
              <div 
                className="w-32 h-32 bg-gradient-to-br from-clr-red to-clr-gold rounded-2xl flex items-center justify-center shadow-2xl" 
                style={{display: 'none'}}
              >
                <SafeIcon icon={FiPlay} className="text-white text-4xl" />
              </div>
            </div>
            <h1 className="text-5xl font-bold font-easterly text-gray-900 mb-4">
              Chef Life Radio <span className="gradient-text">Podcast</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 font-poppins">
              Raw conversations that challenge toxic kitchen culture. We don't just inspire—we transform. 
              Equal parts sardonic mystic,restorative rebel,and operational coach.
            </p>

            {/* Podcast Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-clr-red font-gotham">150+</div>
                <div className="text-sm text-gray-600 font-montserrat">Episodes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-clr-red font-gotham">25K+</div>
                <div className="text-sm text-gray-600 font-montserrat">Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-clr-red font-gotham">4.8</div>
                <div className="text-sm text-gray-600 font-montserrat">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-clr-red font-gotham">3+</div>
                <div className="text-sm text-gray-600 font-montserrat">Years Deep</div>
              </div>
            </div>
          </motion.div>

          {/* Featured Player */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{opacity: 0,y: 30}}
            animate={{opacity: 1,y: 0}}
            transition={{duration: 0.6,delay: 0.2}}
          >
            <PodcastPlayer />
          </motion.div>
        </div>
      </section>

      {/* Main Captivate FM Episodes Player */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{opacity: 0,y: 30}}
            whileInView={{opacity: 1,y: 0}}
            transition={{duration: 0.6}}
            viewport={{once: true}}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-clr-red to-clr-gold rounded-full flex items-center justify-center">
                <SafeIcon icon={FiMic} className="text-2xl text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold font-easterly text-gray-900 mb-4">
              All <span className="gradient-text">Episodes</span>
            </h2>
            <p className="text-xl text-clr-blue max-w-3xl mx-auto font-poppins">
              Browse our complete library of transformative conversations. Every episode designed to challenge the status quo and inspire real change.
            </p>
          </motion.div>

          {/* Captivate FM Embedded Player */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
            initial={{opacity: 0,y: 30}}
            whileInView={{opacity: 1,y: 0}}
            transition={{duration: 0.6,delay: 0.2}}
            viewport={{once: true}}
          >
            <div className="p-6 bg-gradient-to-r from-clr-red to-clr-gold text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold font-easterly mb-2">🎧 Live Episode Player</h3>
                  <p className="text-white/90 font-poppins">Stream all episodes directly from our Captivate FM feed</p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    <span>Live Feed</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Captivate FM Player */}
            <div style={{width: '100%', height: '600px', marginBottom: '0px', borderRadius: '0px', overflow: 'hidden'}}>
              <iframe 
                style={{width: '100%', height: '600px'}} 
                frameBorder="no" 
                scrolling="no" 
                allow="clipboard-write" 
                seamless 
                src="https://player.captivate.fm/show/1732ebe2-8fb0-4b83-837a-109af6810a94"
                title="Chef Life Radio All Episodes Player"
              />
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600 font-montserrat">
                  <div className="flex items-center">
                    <SafeIcon icon={FiMic} className="mr-2 text-clr-red" />
                    <span>Powered by Captivate FM</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Auto-updating feed</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <a 
                    href="https://feeds.captivate.fm/therealchefliferadio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-clr-red hover:text-clr-gold transition-colors text-sm font-gotham"
                  >
                    <SafeIcon icon={FiExternalLink} className="mr-1" />
                    RSS Feed
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Episodes Highlight */}
          <motion.div 
            className="mb-12"
            initial={{opacity: 0,y: 30}}
            whileInView={{opacity: 1,y: 0}}
            transition={{duration: 0.6,delay: 0.4}}
            viewport={{once: true}}
          >
            <h3 className="text-2xl font-bold font-easterly text-gray-900 mb-8 text-center">
              Recent <span className="gradient-text">Transformations</span>
            </h3>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1,2,3,4].map((i)=> (
                  <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-full"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEpisodes.slice(0,4).map((episode,index)=> (
                  <motion.div 
                    key={episode.id} 
                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${episode.featured ? 'ring-2 ring-clr-gold' : ''}`}
                    initial={{opacity: 0,y: 30}}
                    whileInView={{opacity: 1,y: 0}}
                    transition={{duration: 0.6,delay: index * 0.1}}
                    viewport={{once: true}}
                  >
                    <div className="flex space-x-4">
                      <img 
                        src={episode.imageUrl} 
                        alt={episode.title}
                        className="w-16 h-16 object-cover rounded-lg shadow-md flex-shrink-0"
                        onError={(e)=> {
                          e.target.src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 line-clamp-2 font-gotham">
                            {episode.title}
                          </h4>
                          {episode.featured && (
                            <span className="px-2 py-1 bg-clr-gold text-white rounded-full text-xs font-medium font-gotham ml-2">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 font-poppins">
                          {episode.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 font-montserrat">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <SafeIcon icon={FiCalendar} className="mr-1" />
                              {formatDate(episode.publishDate)}
                            </div>
                            <div className="flex items-center">
                              <SafeIcon icon={FiClock} className="mr-1" />
                              {episode.duration}
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-clr-red/10 text-clr-red rounded-full font-gotham">
                            {episode.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Subscribe Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{opacity: 0,y: 30}}
            whileInView={{opacity: 1,y: 0}}
            transition={{duration: 0.6,delay: 0.6}}
            viewport={{once: true}}
          >
            <div className="text-center">
              <img 
                src="/clr-podcast-cover.png" 
                alt="Chef Life Radio Podcast" 
                className="w-24 h-24 rounded-xl shadow-lg mx-auto mb-6"
                onError={(e)=> {
                  e.target.style.display='none';
                }}
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-easterly">Subscribe to Transform</h3>
              <p className="text-gray-600 mb-6 font-poppins">
                Never miss an episode of raw conversations and real transformation. Subscribe on your favorite platform.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a 
                  href="https://feeds.captivate.fm/therealchefliferadio/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-clr-red hover:bg-clr-red/5 transition-colors font-gotham font-medium"
                >
                  RSS Feed
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-clr-gold hover:bg-clr-gold/5 transition-colors font-gotham font-medium"
                >
                  Apple Podcasts
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-clr-blue hover:bg-clr-blue/5 transition-colors font-gotham font-medium"
                >
                  Spotify
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-clr-red hover:bg-clr-red/5 transition-colors font-gotham font-medium"
                >
                  Google Podcasts
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Podcast;