import { motion } from 'framer-motion';
import { FiStar, FiClock, FiDollarSign } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const ServiceCard = ({ service }) => {
  const { darkMode } = useTheme();
  const { id, title, description, price, rating, provider, image, category } = service;
  
  return (
    <motion.div 
      className={`card overflow-hidden hover-lift ${
        darkMode ? 'bg-dark-lighter' : 'bg-white'
      } border-t-4 border-primary`}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className="badge badge-primary">{category}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-center gap-1 text-primary">
            <FiStar className="fill-current" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
        
        <p className="text-secondary-content text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
            <img 
              src={provider.avatar} 
              alt={provider.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium">{provider.name}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-secondary-content mb-4">
          <div className="flex items-center gap-1">
            <FiClock className="text-primary" />
            <span>{service.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiDollarSign className="text-primary" />
            <span>Starting at ${price}</span>
          </div>
        </div>
        
        <Link to={`/services/${id}`}>
          <motion.button 
            className="btn-primary w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
