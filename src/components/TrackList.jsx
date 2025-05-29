import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiMoreHorizontal, FiHeart, FiClock } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const TrackList = ({ tracks }) => {
  const { darkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-dark-lighter/50' : 'bg-white/50'} backdrop-blur-sm`}>
      {/* Table Header */}
      <div className={`grid grid-cols-12 gap-4 px-6 py-3 text-sm border-b ${
        darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'
      }`}>
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-5">TITLE</div>
        <div className="col-span-3">ALBUM</div>
        <div className="col-span-2">GENRE</div>
        <div className="col-span-1 flex justify-end">
          <FiClock />
        </div>
      </div>
      
      {/* Table Body */}
      <div>
        {tracks.map((track, index) => (
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
              {track.genre}
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
  );
};

export default TrackList;
