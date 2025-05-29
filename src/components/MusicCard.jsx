import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const MusicCard = ({ image, title, artist, genre, onClick }) => {
  const { darkMode } = useTheme();
  
  return (
    <motion.div 
      className={`rounded-lg overflow-hidden cursor-pointer ${
        darkMode ? 'bg-dark-lighter hover:bg-dark-lighter/80' : 'bg-white hover:bg-gray-50'
      } transition-all duration-200`}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <motion.div 
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiPlay className="text-white text-xl ml-1" />
          </motion.div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm truncate">{title}</h3>
        <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {artist} • {genre}
        </p>
      </div>
    </motion.div>
  );
};

export default MusicCard;
