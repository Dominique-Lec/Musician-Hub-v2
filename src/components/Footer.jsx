import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiInstagram, FiFacebook, FiGlobe, FiChevronDown } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { useTheme } from '../contexts/ThemeContext'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { darkMode } = useTheme()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Jobs', path: '/jobs' },
        { name: 'For the Record', path: '/news' },
      ]
    },
    {
      title: 'Communities',
      links: [
        { name: 'For Artists', path: '/for-artists' },
        { name: 'Developers', path: '/developers' },
        { name: 'Advertising', path: '/advertising' },
        { name: 'Investors', path: '/investors' },
        { name: 'Vendors', path: '/vendors' },
      ]
    },
    {
      title: 'Useful Links',
      links: [
        { name: 'Support', path: '/support' },
        { name: 'Free Mobile App', path: '/download' },
        { name: 'Popular by Country', path: '/charts' },
      ]
    },
    {
      title: 'MuseLink Plans',
      links: [
        { name: 'Premium Individual', path: '/premium' },
        { name: 'Premium Duo', path: '/premium-duo' },
        { name: 'Premium Family', path: '/premium-family' },
        { name: 'Premium Student', path: '/student' },
        { name: 'Free Plan', path: '/free' },
      ]
    }
  ]
  
  const socialLinks = [
    { icon: <FiInstagram size={20} />, path: 'https://instagram.com' },
    { icon: <FiTwitter size={20} />, path: 'https://twitter.com' },
    { icon: <FiFacebook size={20} />, path: 'https://facebook.com' },
    { icon: <FiGithub size={20} />, path: 'https://github.com' },
  ]

  const languages = [
    'English', 'Español', 'Français', 'Deutsch', 'Italiano', 
    'Português', '日本語', '한국어', '中文', 'العربية', 
    'Русский', 'Svenska', 'Nederlands', 'Polski'
  ]

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen)
  }

  const selectLanguage = (language) => {
    setSelectedLanguage(language)
    setIsLanguageOpen(false)
  }

  return (
    <footer className={`pt-16 pb-8 ${darkMode ? 'bg-dark' : 'bg-light-darker/30'}`}>
      <div className="container mx-auto">
        {/* Top section with logo and links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Logo />
            <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
              The ultimate platform for musicians to build communities, offer services, and collaborate on projects.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full ${darkMode ? 'bg-dark-lighter' : 'bg-white'} flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors duration-200`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors duration-200`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Middle section with legal links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          <Link to="/legal" className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors duration-200`}>
            Legal
          </Link>
          <Link to="/privacy-center" className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors duration-200`}>
            Privacy Center
          </Link>
          <Link to="/privacy-policy" className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors duration-200`}>
            Privacy Policy
          </Link>
          <Link to="/cookies" className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors duration-200`}>
            Cookies
          </Link>
          <Link to="/about-ads" className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors duration-200`}>
            About Ads
          </Link>
          <Link to="/accessibility" className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors duration-200`}>
            Accessibility
          </Link>
        </div>
        
        {/* Bottom section with language selector and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-gray-800">
          {/* Language selector - Spotify style */}
          <div className="relative mb-4 md:mb-0">
            <motion.button
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                darkMode 
                  ? 'bg-dark-lighter text-gray-300 hover:bg-dark-lighter/80' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } transition-all duration-200`}
              onClick={toggleLanguageDropdown}
              whileTap={{ scale: 0.98 }}
            >
              <FiGlobe className="text-primary" />
              <span>{selectedLanguage}</span>
              <FiChevronDown className={`transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </motion.button>
            
            <AnimatePresence>
              {isLanguageOpen && (
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
                    {languages.map((language) => (
                      <button
                        key={language}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                          selectedLanguage === language 
                            ? 'bg-primary/20 text-primary' 
                            : darkMode 
                              ? 'text-gray-300 hover:bg-dark/50 hover:text-primary' 
                              : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                        }`}
                        onClick={() => selectLanguage(language)}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              &copy; {currentYear} MuseLink AB
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
