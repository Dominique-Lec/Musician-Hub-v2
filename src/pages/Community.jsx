import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiUsers, FiMusic, FiMapPin } from 'react-icons/fi'
import { useCommunity } from '../contexts/CommunityContext'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from '../components/Navbar'

const Community = () => {
  const { communities } = useCommunity()
  const { darkMode } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredCommunities, setFilteredCommunities] = useState([])
  
  const categories = ['All', 'Rock', 'Jazz', 'Classical', 'Hip Hop', 'Electronic', 'Folk', 'Blues']
  
  useEffect(() => {
    if (communities) {
      let filtered = [...communities]
      
      if (searchTerm) {
        filtered = filtered.filter(community => 
          community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          community.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(community => 
          community.category === selectedCategory
        )
      }
      
      setFilteredCommunities(filtered)
    }
  }, [communities, searchTerm, selectedCategory])
  
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
                <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-light' : 'text-dark'}`}>Music Communities</h1>
                <p className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>Connect with musicians who share your interests</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/communities/create" className="btn-primary">
                  Create Community
                </Link>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className={`flex items-center rounded-lg px-4 py-2 ${
                    darkMode 
                      ? 'bg-dark-lighter border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <FiSearch className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <input
                      type="text"
                      placeholder="Search communities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`ml-2 w-full bg-transparent focus:outline-none ${
                        darkMode ? 'text-light' : 'text-dark'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="md:w-64">
                  <div className={`flex items-center rounded-lg px-4 py-2 ${
                    darkMode 
                      ? 'bg-dark-lighter border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <FiFilter className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={`ml-2 w-full bg-transparent focus:outline-none ${
                        darkMode ? 'text-light' : 'text-dark'
                      }`}
                    >
                      {categories.map((category) => (
                        <option 
                          key={category} 
                          value={category}
                          className={darkMode ? 'bg-dark-lighter' : 'bg-white'}
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Communities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <Link
                  key={community.id}
                  to={`/communities/${community.id}`}
                  className={`card overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    darkMode 
                      ? 'hover:bg-dark-lighter/80' 
                      : 'hover:bg-light-darker/10'
                  }`}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-light' : 'text-dark'}`}>{community.name}</h3>
                    <p className={`mb-4 line-clamp-2 ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>
                      {community.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <FiUsers className="text-primary mr-2" />
                        <span className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>
                          {community.members} members
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <FiMusic className="text-secondary mr-2" />
                        <span className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>
                          {community.category}
                        </span>
                      </div>
                      
                      {community.location && (
                        <div className="flex items-center">
                          <FiMapPin className="text-accent mr-2" />
                          <span className={darkMode ? 'text-light-darker' : 'text-dark-lighter'}>
                            {community.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {filteredCommunities.length === 0 && (
              <div className={`text-center py-12 ${darkMode ? 'text-light-darker' : 'text-dark-lighter'}`}>
                <p className="text-lg">No communities found matching your search criteria.</p>
                <p className="mt-2">Try adjusting your filters or create a new community!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Community
