import { motion } from 'framer-motion';
import { FiUsers, FiMusic, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const CommunityCard = ({ community }) => {
  const { darkMode } = useTheme();
  const { id, name, description, memberCount, genre, image, recentActivity } = community;
  
  return (
    <motion.div 
      className={`card overflow-hidden hover-lift ${
        darkMode ? 'bg-dark-lighter' : 'bg-white'
      }`}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Green overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-60"></div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-xl text-white">{name}</h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <FiMusic />
            <span>{genre}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-secondary-content text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between text-sm text-secondary-content mb-4">
          <div className="flex items-center gap-1">
            <FiUsers className="text-primary" />
            <span>{memberCount} members</span>
          </div>
          <div className="flex items-center gap-1">
            <FiCalendar className="text-primary" />
            <span>{recentActivity}</span>
          </div>
        </div>
        
        <Link to={`/communities/${id}`}>
          <motion.button 
            className="btn-primary w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Community
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
