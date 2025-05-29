import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiEdit2, FiUser, FiMail, FiMusic, FiMapPin, FiLink, FiCalendar } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from '../components/Navbar'

const Profile = () => {
  const { currentUser } = useAuth()
  const { darkMode } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  
  // Mock data for the profile
  const userProfile = {
    ...currentUser,
    location: 'New York, NY',
    bio: 'Professional guitarist with 10+ years of experience. Specializing in rock, blues, and jazz. Available for session work, teaching, and live performances.',
    website: 'www.johndoemusic.com',
    joinDate: 'January 2023',
    skills: ['Guitar', 'Music Production', 'Songwriting', 'Teaching', 'Live Performance'],
    stats: {
      followers: 245,
      following: 128,
      completedServices: 37,
      reviews: 28,
      rating: 4.9
    }
  }
  
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
            {/* Profile Header */}
            <div className={`card mb-8 relative overflow-hidden ${darkMode ? 'bg-dark-lighter' : 'bg-white'}`}>
              <div className="h-48 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
              
              <div className="px-6 pb-6 relative">
                <div className="flex flex-col md:flex-row md:items-end -mt-16 md:-mt-20">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-dark overflow-hidden">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 md:mb-2 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{userProfile.name}</h1>
                        <p className={`text-lg ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>{userProfile.instrument}</p>
                      </div>
                      
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`mt-4 md:mt-0 flex items-center px-4 py-2 rounded-lg ${
                          darkMode 
                            ? 'bg-dark-lighter hover:bg-dark border border-gray-700' 
                            : 'bg-light-darker/10 hover:bg-light-darker/20 border border-gray-200'
                        } transition-colors`}
                      >
                        <FiEdit2 className="mr-2" />
                        <span className={darkMode ? 'text-light' : 'text-dark'}>Edit Profile</span>
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center">
                        <FiMapPin className={`mr-2 ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`} />
                        <span className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>{userProfile.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FiLink className={`mr-2 ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`} />
                        <a 
                          href={`https://${userProfile.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline"
                        >
                          {userProfile.website}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <FiCalendar className={`mr-2 ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`} />
                        <span className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>Joined {userProfile.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`mt-6 ${darkMode ? 'text-light' : 'text-dark'}`}>
                  <h2 className="text-xl font-semibold mb-2">About</h2>
                  <p className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>{userProfile.bio}</p>
                </div>
                
                <div className="mt-6">
                  <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-light' : 'text-dark'}`}>Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className={`px-3 py-1 rounded-full text-sm ${
                          darkMode 
                            ? 'bg-dark text-light-darker border border-gray-700' 
                            : 'bg-light-darker/10 text-dark-lighter border border-gray-200'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className={`card p-4 text-center ${darkMode ? 'bg-dark-lighter' : 'bg-white'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{userProfile.stats.followers}</div>
                <div className={darkMode ? 'text-light-darker text-sm' : 'text-dark-lighter text-sm'}>Followers</div>
              </div>
              
              <div className={`card p-4 text-center ${darkMode ? 'bg-dark-lighter' : 'bg-white'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{userProfile.stats.following}</div>
                <div className={darkMode ? 'text-light-darker text-sm' : 'text-dark-lighter text-sm'}>Following</div>
              </div>
              
              <div className={`card p-4 text-center ${darkMode ? 'bg-dark-lighter' : 'bg-white'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{userProfile.stats.completedServices}</div>
                <div className={darkMode ? 'text-light-darker text-sm' : 'text-dark-lighter text-sm'}>Services</div>
              </div>
              
              <div className={`card p-4 text-center ${darkMode ? 'bg-dark-lighter' : 'bg-white'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{userProfile.stats.reviews}</div>
                <div className={darkMode ? 'text-light-darker text-sm' : 'text-dark-lighter text-sm'}>Reviews</div>
              </div>
              
              <div className={`card p-4 text-center ${darkMode ? 'bg-dark-lighter' : 'bg-white'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{userProfile.stats.rating}</div>
                <div className={darkMode ? 'text-light-darker text-sm' : 'text-dark-lighter text-sm'}>Rating</div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className={`card mb-8 ${darkMode ? 'bg-dark-lighter' : 'bg-white'}`}>
              <div className="p-6">
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${
                      darkMode ? 'bg-dark' : 'bg-light-darker/10'
                    } flex items-center justify-center mr-4`}>
                      <FiUser className="text-primary" />
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>Full Name</div>
                      <div className={darkMode ? 'text-light' : 'text-dark'}>{userProfile.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${
                      darkMode ? 'bg-dark' : 'bg-light-darker/10'
                    } flex items-center justify-center mr-4`}>
                      <FiMail className="text-primary" />
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>Email</div>
                      <div className={darkMode ? 'text-light' : 'text-dark'}>{userProfile.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${
                      darkMode ? 'bg-dark' : 'bg-light-darker/10'
                    } flex items-center justify-center mr-4`}>
                      <FiMusic className="text-primary" />
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>Primary Instrument</div>
                      <div className={darkMode ? 'text-light' : 'text-dark'}>{userProfile.instrument}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div id="reviews">
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>Reviews</h2>
              
              <div className={`card ${darkMode ? 'bg-dark-lighter' : 'bg-white'}`}>
                <div className={`p-6 ${darkMode ? 'text-light' : 'text-dark'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold mr-2">{userProfile.stats.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(userProfile.stats.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>Based on {userProfile.stats.reviews} reviews</p>
                    </div>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
                    {[
                      {
                        name: 'Sarah Johnson',
                        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        rating: 5,
                        date: '2 weeks ago',
                        comment: 'John is an incredible guitarist! He helped me record guitar tracks for my EP and the quality was outstanding. Very professional and easy to work with.'
                      },
                      {
                        name: 'Michael Rodriguez',
                        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        rating: 5,
                        date: '1 month ago',
                        comment: 'I took a few guitar lessons with John and learned more in 3 sessions than I did in months of trying to teach myself. Highly recommended for beginners!'
                      },
                      {
                        name: 'Emily Chen',
                        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        rating: 4,
                        date: '2 months ago',
                        comment: 'John played guitar for my wedding ceremony and did a fantastic job. He was very accommodating with song requests and added a special touch to our day.'
                      }
                    ].map((review, index) => (
                      <div key={index} className="py-6">
                        <div className="flex items-start">
                          <img 
                            src={review.avatar} 
                            alt={review.name} 
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium">{review.name}</h3>
                              <span className={darkMode ? 'text-light-darker text-sm' : 'text-dark-lighter text-sm'}>{review.date}</span>
                            </div>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile
