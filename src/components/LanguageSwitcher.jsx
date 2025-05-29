import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const LanguageSwitcher = () => {
  const { currentLanguageName, availableLanguages, changeLanguage } = useLanguage();
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <motion.button
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
          darkMode 
            ? 'bg-dark-lighter text-gray-300 hover:bg-dark-lighter/80' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        } transition-all duration-200`}
        onClick={toggleDropdown}
        whileTap={{ scale: 0.98 }}
      >
        <FiGlobe className="text-primary" />
        <span>{currentLanguageName}</span>
        <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-full mb-2 left-0 w-48 max-h-60 overflow-y-auto rounded-lg shadow-xl z-50 ${
              darkMode 
                ? 'bg-dark-lighter border border-gray-800' 
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="py-2">
              {availableLanguages.map((language) => (
                <button
                  key={language.code}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                    currentLanguageName === language.name 
                      ? 'bg-primary/20 text-primary' 
                      : darkMode 
                        ? 'text-gray-300 hover:bg-dark/50 hover:text-primary' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                  }`}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
