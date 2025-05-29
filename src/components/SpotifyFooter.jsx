import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGlobe, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';

const SpotifyFooter = () => {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();
  
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
    }
  ];
  
  const socialLinks = [
    { icon: <FiInstagram size={20} />, path: 'https://instagram.com' },
    { icon: <FiTwitter size={20} />, path: 'https://twitter.com' },
    { icon: <FiFacebook size={20} />, path: 'https://facebook.com' },
  ];
  
  return (
    <footer className={`py-12 ${darkMode ? 'bg-dark' : 'bg-light-darker/30'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className={`text-sm font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{section.title}</h4>
              <ul className="space-y-3">
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
          
          <div>
            <h4 className={`text-sm font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Social</h4>
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full ${darkMode ? 'bg-dark-lighter' : 'bg-white'} flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-primary transition-colors duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            
            <LanguageSwitcher />
          </div>
        </div>
        
        <div className={`h-px w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-300'} mb-6`}></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 md:mb-0">
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
          
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            &copy; {currentYear} MuseLink AB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SpotifyFooter;
