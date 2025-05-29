import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiHeart, FiClock, FiMoreHorizontal, FiPlay } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'
import SpotifyGreenButton from '../components/SpotifyGreenButton'

const Favorites = () => {
  const { darkMode } = useTheme()
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  // Mock data for favorite tracks
  const favoriteTracks = [
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      addedDate: '2023-05-15',
      duration: '3:20',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'As It Was',
      artist: 'Harry Styles',
      album: "Harry's House",
      addedDate: '2023-06-22',
      duration: '2:47',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'Heat Waves',
      artist: 'Glass Animals',
      album: 'Dreamland',
      addedDate: '2023-04-10',
      duration: '3:59',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      title: 'Stay',
      artist: 'The Kid LAROI, Justin Bieber',
      album: 'F*CK LOVE 3: OVER YOU',
      addedDate: '2023-07-05',
      duration: '2:21',
      image: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      title: 'Easy On Me',
      artist: 'Adele',
      album: '30',
      addedDate: '2023-03-18',
      duration: '3:44',
      image: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 6,
      title: 'Bad Habits',
      artist: 'Ed Sheeran',
      album: '=',
      addedDate: '2023-02-14',
      duration: '3:51',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 7,
      title: 'good 4 u',
      artist: 'Olivia Rodrigo',
      album: 'SOUR',
      addedDate: '2023-01-30',
      duration: '2:58',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ]
  
  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
            <FiHeart className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Liked Songs</h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {favoriteTracks.length} songs
            </p>
          </div>
        </div>
        
        <SpotifyGreenButton icon={<FiPlay />}>
          Play All
        </SpotifyGreenButton>
      </div>
      
      {/* Tracks Table - Spotify style */}
      <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-dark-lighter/50' : 'bg-white/50'} backdrop-blur-sm`}>
        {/* Table Header */}
        <div className={`grid grid-cols-12 gap-4 px-6 py-3 text-sm border-b ${
          darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'
        }`}>
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">TITLE</div>
          <div className="col-span-3">ALBUM</div>
          <div className="col-span-2">DATE ADDED</div>
          <div className="col-span-1 flex justify-end">
            <FiClock />
          </div>
        </div>
        
        {/* Table Body */}
        <div>
          {favoriteTracks.map((track, index) => (
            <motion.div 
              key={track.id}
              className={`grid grid-cols-12 gap-4 px-6 py-3 items-center ${
                darkMode 
                  ? 'hover:bg-dark/50' 
                  : 'hover:bg-light-darker/30'
              } transition-colors duration-200 cursor-pointer ${
                hoveredIndex === index ? 'bg-primary/10' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="col-span-1 flex justify-center">
                {hoveredIndex === index ? (
                  <motion.button 
                    className="text-primary"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiPlay />
                  </motion.button>
                ) : (
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{index + 1}</span>
                )}
              </div>
              
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                  <img src={track.image} alt={track.title} className="w-full h-full object-cover" />
                </div>
                <div className="truncate">
                  <div className={`font-medium truncate ${hoveredIndex === index ? 'text-primary' : ''}`}>{track.title}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>{track.artist}</div>
                </div>
              </div>
              
              <div className={`col-span-3 truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {track.album}
              </div>
              
              <div className={`col-span-2 truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {new Date(track.addedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              
              <div className="col-span-1 flex items-center justify-end gap-3">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{track.duration}</span>
                <div className="relative group">
                  <motion.button 
                    className={`p-1.5 rounded-full ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 ${
                      darkMode ? 'hover:bg-dark' : 'hover:bg-light-darker'
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiMoreHorizontal className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors`} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favorites
