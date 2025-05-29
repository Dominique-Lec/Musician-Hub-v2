import { motion } from 'framer-motion';

const SpotifyGreenButton = ({ children, icon, size = 'md', onClick }) => {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };
  
  return (
    <motion.button
      className={`bg-primary hover:bg-primary-dark text-white font-medium rounded-full flex items-center justify-center gap-2 transition-colors ${sizeClasses[size]}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default SpotifyGreenButton;
