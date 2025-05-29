import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPlus, FiUsers, FiShoppingBag, FiMessageCircle, FiStar } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useCommunity } from '../contexts/CommunityContext'
import { useService } from '../contexts/ServiceContext'
import Navbar from '../components/Navbar'
import { useTheme } from '../contexts/ThemeContext'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const communityContext = useCommunity()
  const serviceContext = useService()
  const { darkMode } = useTheme()
  
  const [userCommunities, setUserCommunities] = useState([])
  const [userServices, setUserServices] = useState([])
  
  useEffect(() => {
    // In a real app, we would fetch user-specific data
    // For demo, we'll just show some of the sample communities and services
    if (communityContext && communityContext.communities) {
      setUserCommunities(communityContext.communities.slice(0, 2))
    }
    
    if (serviceContext && serviceContext.services) {
      setUserServices(serviceContext.services.slice(0, 2))
    }
  }, [communityContext, serviceContext])
  
  const stats = [
    {
      icon: <FiUsers className="text-primary text-xl" />,
      label: 'Communities',
      value: userCommunities.length,
      link: '/communities'
    },
    {
      icon: <FiShoppingBag className="text-secondary text-xl" />,
      label: 'Services',
      value: userServices.length,
      link: '/communities/all/services'
    },
    {
      icon: <FiMessageCircle className="text-accent text-xl" />,
      label: 'Messages',
      value: 5,
      link: '/messages'
    },
    {
      icon: <FiStar className="text-primary text-xl" />,
      label: 'Reviews',
      value: 12,
      link: '/profile#reviews'
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-light' : 'text-dark'}`}>Welcome, {currentUser?.name}</h1>
                <p className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>Here's what's happening with your musician profile</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/profile" className="btn-outline">
                  View Profile
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Link
                  key={index}
                  to={stat.link}
                  className={`card flex flex-col items-center text-center p-4 ${
                    darkMode 
                      ? 'hover:bg-dark-lighter/80' 
                      : 'hover:bg-light-darker/10'
                  } transition-colors`}
                >
                  <div className="mb-2">{stat.icon}</div>
                  <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-light' : 'text-dark'}`}>{stat.value}</div>
                  <div className={darkMode ? 'text-light-darker text-sm' : 'text-dark-lighter text-sm'}>{stat.label}</div>
                </Link>
              ))}
            </div>
            
            {/* Communities */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-dark'}`}>Your Communities</h2>
                <Link to="/communities" className="text-primary hover:underline text-sm">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userCommunities.map((community) => (
                  <Link
                    key={community.id}
                    to={`/communities/${community.id}`}
                    className={`card overflow-hidden ${
                      darkMode 
                        ? 'hover:bg-dark-lighter/80' 
                        : 'hover:bg-light-darker/10'
                    } transition-colors`}
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold mb-1 ${darkMode ? 'text-light' : 'text-dark'}`}>{community.name}</h3>
                      <p className={darkMode ? 'text-light-darker text-sm mb-2' : 'text-dark-lighter text-sm mb-2'}>
                        {community.members} members
                      </p>
                      <div className={`text-xs ${
                        darkMode 
                          ? 'text-light-darker bg-dark' 
                          : 'text-dark-lighter bg-light-darker/10'
                        } inline-block px-2 py-1 rounded`}>
                        {community.category}
                      </div>
                    </div>
                  </Link>
                ))}
                
                <Link
                  to="/communities"
                  className={`card flex flex-col items-center justify-center p-6 border-2 border-dashed ${
                    darkMode 
                      ? 'border-gray-700 hover:border-primary' 
                      : 'border-gray-300 hover:border-primary'
                  } transition-colors`}
                >
                  <FiPlus className="text-2xl mb-2 text-primary" />
                  <span className={darkMode ? 'text-light' : 'text-dark'}>Join More Communities</span>
                </Link>
              </div>
            </div>
            
            {/* Services */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-dark'}`}>Your Services</h2>
                <Link to="/communities/all/services" className="text-primary hover:underline text-sm">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userServices.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className={`card overflow-hidden ${
                      darkMode 
                        ? 'hover:bg-dark-lighter/80' 
                        : 'hover:bg-light-darker/10'
                    } transition-colors`}
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold mb-1 ${darkMode ? 'text-light' : 'text-dark'}`}>{service.title}</h3>
                      <div className="flex items-center mb-2">
                        <span className="text-primary font-bold">${service.price}</span>
                        <span className={`${darkMode ? 'text-light-darker' : 'text-dark-lighter'} text-sm ml-1`}>
                          • {service.deliveryTime} day delivery
                        </span>
                      </div>
                      <div className={`text-xs ${
                        darkMode 
                          ? 'text-light-darker bg-dark' 
                          : 'text-dark-lighter bg-light-darker/10'
                        } inline-block px-2 py-1 rounded`}>
                        {service.category}
                      </div>
                    </div>
                  </Link>
                ))}
                
                <Link
                  to="/services/create"
                  className={`card flex flex-col items-center justify-center p-6 border-2 border-dashed ${
                    darkMode 
                      ? 'border-gray-700 hover:border-primary' 
                      : 'border-gray-300 hover:border-primary'
                  } transition-colors`}
                >
                  <FiPlus className="text-2xl mb-2 text-primary" />
                  <span className={darkMode ? 'text-light' : 'text-dark'}>Create New Service</span>
                </Link>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>Recent Activity</h2>
              
              <div className="card">
                <div className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
                  <div className="py-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <FiUsers className="text-primary" />
                      </div>
                      <div>
                        <p className={darkMode ? 'text-light' : 'text-dark'}>
                          You joined the <span className="text-primary">Guitar Enthusiasts</span> community
                        </p>
                        <p className={darkMode ? 'text-light-darker text-sm mt-1' : 'text-dark-lighter text-sm mt-1'}>2 days ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                        <FiShoppingBag className="text-secondary" />
                      </div>
                      <div>
                        <p className={darkMode ? 'text-light' : 'text-dark'}>
                          You created a new service: <span className="text-secondary">Professional Guitar Recording</span>
                        </p>
                        <p className={darkMode ? 'text-light-darker text-sm mt-1' : 'text-dark-lighter text-sm mt-1'}>3 days ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                        <FiMessageCircle className="text-accent" />
                      </div>
                      <div>
                        <p className={darkMode ? 'text-light' : 'text-dark'}>
                          <span className="text-accent">Sophia Chen</span> sent you a message
                        </p>
                        <p className={darkMode ? 'text-light-darker text-sm mt-1' : 'text-dark-lighter text-sm mt-1'}>5 days ago</p>
                      </div>
                    </div>
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

export default Dashboard
