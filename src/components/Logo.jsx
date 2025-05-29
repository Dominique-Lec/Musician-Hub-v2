import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Logo = () => {
  const { darkMode } = useTheme();
  
  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pure Spotify green background */}
        <div className="absolute inset-0 bg-primary rounded-full"></div>
        <div className={`z-10 font-bold text-lg ${darkMode ? 'text-dark' : 'text-white'}`}>M</div>
      </motion.div>
      <motion.span 
        className="font-bold text-xl tracking-tight"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <span className="text-primary">Muse</span>
        <span className={darkMode ? 'text-light' : 'text-dark'}>Link</span>
      </motion.span>
    </motion.div>
  );
};

export default Logo;
