import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers, FiMusic, FiMapPin, FiCalendar, FiMessageCircle, FiShare2 } from 'react-icons/fi'
import { useCommunity } from '../contexts/CommunityContext'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from '../components/Navbar'

const CommunityDetails = () => {
  const { id } = useParams()
  const { getCommunityById } = useCommunity()
  const { darkMode } = useTheme()
  const [community, setCommunity] = useState(null)
  const [isJoined, setIsJoined] = useState(false)
  
  useEffect(() => {
    if (id) {
      const foundCommunity = getCommunityById(id)
      setCommunity(foundCommunity)
      
      // For demo purposes, randomly set joined status
      setIsJoined(Math.random() > 0.5)
    }
  }, [id, getCommunityById])
  
  if (!community) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-dark' : 'bg-light'}`}>
        <Navbar />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  // Mock data for community details
  const members = [
    {
      id: '1',
      name: 'John Doe',
      instrument: 'Guitar',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isAdmin: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      instrument: 'Vocals',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '3',
      name: 'Michael Rodriguez',
      instrument: 'Drums',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '4',
      name: 'Emily Chen',
      instrument: 'Piano',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]
  
  const events = [
    {
      id: '1',
      title: 'Weekly Jam Session',
      date: 'Every Thursday, 7:00 PM',
      location: 'Downtown Music Studio',
      attendees: 12
    },
    {
      id: '2',
      title: 'Summer Concert Series',
      date: 'July 15, 2023, 6:00 PM',
      location: 'Central Park Amphitheater',
      attendees: 28
    },
    {
      id: '3',
      title: 'Songwriting Workshop',
      date: 'August 5, 2023, 2:00 PM',
      location: 'Virtual (Zoom)',
      attendees: 18
    }
  ]
  
  const discussions = [
    {
      id: '1',
      title: 'Favorite guitar pedals for blues?',
      author: 'John Doe',
      date: '2 days ago',
      replies: 15
    },
    {
      id: '2',
      title: 'Looking for a vocalist for upcoming gig',
      author: 'Sarah Johnson',
      date: '1 week ago',
      replies: 8
    },
    {
      id: '3',
      title: 'New album recommendations',
      author: 'Michael Rodriguez',
      date: '2 weeks ago',
      replies: 24
    }
  ]
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Community Header */}
            <div className={`card mb-8 overflow-hidden ${darkMode ? 'bg-dark-lighter' : 'bg-white'}`}>
              <div className="h-64 relative">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h1 className="text-3xl font-bold text-white mb-2">{community.name}</h1>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-white/80">
                      <FiUsers className="mr-2" />
                      <span>{community.members} members</span>
                    </div>
                    
                    <div className="flex items-center text-white/80">
                      <FiMusic className="mr-2" />
                      <span>{community.category}</span>
                    </div>
                    
                    {community.location && (
                      <div className="flex items-center text-white/80">
                        <FiMapPin className="mr-2" />
                        <span>{community.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <p className={`md:max-w-2xl ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>
                    {community.description}
                  </p>
                  
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                      onClick={() => setIsJoined(!isJoined)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isJoined
                          ? darkMode
                            ? 'bg-dark border border-gray-700 text-light hover:bg-dark-lighter'
                            : 'bg-light-darker/10 border border-gray-200 text-dark hover:bg-light-darker/20'
                          : 'bg-primary text-white hover:bg-primary-dark'
                      }`}
                    >
                      {isJoined ? 'Joined' : 'Join Community'}
                    </button>
                    
                    <button className={`p-2 rounded-lg ${
                      darkMode 
                        ? 'bg-dark border border-gray-700 text-light hover:bg-dark-lighter' 
                        : 'bg-light-darker/10 border border-gray-200 text-dark hover:bg-light-darker/20'
                    }`}>
                      <FiShare2 />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Members */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-dark'}`}>Members</h2>
                      <Link to={`/communities/${id}/members`} className="text-primary text-sm hover:underline">
                        View All
                      </Link>
                    </div>
                    
                    <div className={`rounded-lg overflow-hidden border ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      {members.map((member, index) => (
                        <Link
                          key={member.id}
                          to={`/profile/${member.id}`}
                          className={`flex items-center p-3 ${
                            index !== members.length - 1
                              ? darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                              : ''
                          } ${
                            darkMode 
                              ? 'hover:bg-dark' 
                              : 'hover:bg-light-darker/5'
                          } transition-colors`}
                        >
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div>
                            <div className="flex items-center">
                              <span className={darkMode ? 'text-light' : 'text-dark'}>{member.name}</span>
                              {member.isAdmin && (
                                <span className="ml-2 text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
                                  Admin
                                </span>
                              )}
                            </div>
                            <div className={`text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>
                              {member.instrument}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Upcoming Events */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-dark'}`}>Upcoming Events</h2>
                      <Link to={`/communities/${id}/events`} className="text-primary text-sm hover:underline">
                        View All
                      </Link>
                    </div>
                    
                    <div className={`rounded-lg overflow-hidden border ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      {events.map((event, index) => (
                        <Link
                          key={event.id}
                          to={`/events/${event.id}`}
                          className={`block p-3 ${
                            index !== events.length - 1
                              ? darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                              : ''
                          } ${
                            darkMode 
                              ? 'hover:bg-dark' 
                              : 'hover:bg-light-darker/5'
                          } transition-colors`}
                        >
                          <h3 className={`font-medium mb-1 ${darkMode ? 'text-light' : 'text-dark'}`}>{event.title}</h3>
                          <div className="flex items-center mb-1">
                            <FiCalendar className={`mr-2 text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`} />
                            <span className={`text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <FiMapPin className={`mr-2 text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`} />
                            <span className={`text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>{event.location}</span>
                          </div>
                          <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${
                            darkMode 
                              ? 'bg-dark text-light-darker' 
                              : 'bg-light-darker/10 text-dark-lighter'
                          }`}>
                            {event.attendees} attending
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent Discussions */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-dark'}`}>Recent Discussions</h2>
                      <Link to={`/communities/${id}/discussions`} className="text-primary text-sm hover:underline">
                        View All
                      </Link>
                    </div>
                    
                    <div className={`rounded-lg overflow-hidden border ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      {discussions.map((discussion, index) => (
                        <Link
                          key={discussion.id}
                          to={`/discussions/${discussion.id}`}
                          className={`block p-3 ${
                            index !== discussions.length - 1
                              ? darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                              : ''
                          } ${
                            darkMode 
                              ? 'hover:bg-dark' 
                              : 'hover:bg-light-darker/5'
                          } transition-colors`}
                        >
                          <h3 className={`font-medium mb-1 ${darkMode ? 'text-light' : 'text-dark'}`}>{discussion.title}</h3>
                          <div className="flex items-center justify-between">
                            <div className={`text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>
                              By {discussion.author} • {discussion.date}
                            </div>
                            <div className="flex items-center">
                              <FiMessageCircle className={`mr-1 ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`} />
                              <span className={`text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>{discussion.replies}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-dark'}`}>Community Services</h2>
                <Link to={`/communities/${id}/services`} className="text-primary hover:underline text-sm">
                  View All Services
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Link
                    key={i}
                    to={`/services/${i}`}
                    className={`card overflow-hidden ${
                      darkMode 
                        ? 'hover:bg-dark-lighter/80' 
                        : 'hover:bg-light-darker/10'
                    } transition-colors`}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={`https://images.pexels.com/photos/45243${i}/pexels-photo-45243${i}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                        alt={`Service ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold mb-1 ${darkMode ? 'text-light' : 'text-dark'}`}>
                        {i === 1 ? 'Professional Guitar Recording' : i === 2 ? 'Music Production Services' : 'Songwriting Collaboration'}
                      </h3>
                      <div className="flex items-center mb-2">
                        <span className="text-primary font-bold">${i === 1 ? '50' : i === 2 ? '120' : '80'}</span>
                        <span className={`${darkMode ? 'text-light-darker' : 'text-dark-lighter'} text-sm ml-1`}>
                          • {i === 1 ? '2' : i === 2 ? '5' : '3'} day delivery
                        </span>
                      </div>
                      <div className={`text-xs ${
                        darkMode 
                          ? 'text-light-darker bg-dark' 
                          : 'text-dark-lighter bg-light-darker/10'
                        } inline-block px-2 py-1 rounded`}>
                        {i === 1 ? 'Recording' : i === 2 ? 'Production' : 'Composition'}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CommunityDetails
