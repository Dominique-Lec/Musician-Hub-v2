import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
        darkMode 
          ? 'bg-dark-lighter text-primary hover:bg-dark-lighter/80 hover:text-primary-light shadow-md' 
          : 'bg-light-darker/80 text-primary hover:bg-light-darker hover:text-primary-dark shadow-md'
      }`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <FiSun className="text-xl" />
      ) : (
        <FiMoon className="text-xl" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
