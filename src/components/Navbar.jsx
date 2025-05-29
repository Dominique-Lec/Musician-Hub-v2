import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiSearch, FiHome, FiUsers, FiShoppingBag, FiUser, FiMusic, FiHeart, FiCompass } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const { darkMode } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [location.pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Always accessible navigation links regardless of authentication status
  const navLinks = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Explore', path: '/explore', icon: <FiCompass /> },
    { name: 'Communities', path: '/communities', icon: <FiUsers /> },
    { name: 'Services', path: '/services', icon: <FiShoppingBag /> },
    { name: 'Library', path: '/library', icon: <FiMusic /> },
  ]

  // Authentication-specific links
  const authLinks = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
        { name: 'Profile', path: '/profile', icon: <FiUser /> },
        { name: 'Favorites', path: '/favorites', icon: <FiHeart /> },
      ]
    : [
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
      ]

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 py-3 transition-all duration-300 ${
      scrolled 
        ? (darkMode 
            ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-primary/10' 
            : 'bg-white/95 backdrop-blur-md shadow-md shadow-black/5 border-b border-primary/10')
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Search Bar - Spotify-inspired with green focus ring */}
        <div className={`hidden md:flex items-center max-w-xs w-full mx-4 ${
          darkMode 
            ? 'bg-dark-lighter/80 text-light border border-dark-lighter' 
            : 'bg-light-darker/80 text-dark border border-light-darker'
        } rounded-full px-4 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200`}>
          <FiSearch className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search for music, artists, or services..." 
            className="bg-transparent border-none outline-none w-full text-sm"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-full ${
                  location.pathname === link.path
                    ? 'bg-primary/20 text-primary'
                    : darkMode 
                      ? 'text-gray-400 hover:text-primary hover:bg-dark-lighter/80' 
                      : 'text-gray-600 hover:text-primary hover:bg-light-darker/80'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {authLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'btn-primary'
                    : index === authLinks.length - 1 && !isAuthenticated
                      ? 'bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark'
                      : darkMode 
                        ? 'text-gray-400 hover:text-primary px-4 py-2 rounded-full hover:bg-dark-lighter/80' 
                        : 'text-gray-600 hover:text-primary px-4 py-2 rounded-full hover:bg-light-darker/80'
                }`}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <button
                onClick={logout}
                className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-full ${
                  darkMode 
                    ? 'text-gray-400 hover:text-primary hover:bg-dark-lighter/80' 
                    : 'text-gray-600 hover:text-primary hover:bg-light-darker/80'
                }`}
              >
                Logout
              </button>
            )}
            
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full ${
              darkMode 
                ? 'text-primary hover:text-primary-light hover:bg-dark-lighter' 
                : 'text-primary hover:text-primary-dark hover:bg-gray-100'
            }`}
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Spotify-inspired slide-in with green accents */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={`md:hidden absolute top-full left-0 w-full overflow-hidden ${
              darkMode 
                ? 'bg-dark-lighter/95 backdrop-blur-md border-b border-gray-800' 
                : 'bg-white/95 backdrop-blur-md border-b border-gray-200'
            }`}
          >
            <div className="container mx-auto py-4">
              {/* Mobile Search */}
              <div className={`flex items-center mb-4 ${
                darkMode 
                  ? 'bg-dark/80 text-light border border-dark' 
                  : 'bg-light-darker/80 text-dark border border-light-darker'
              } rounded-full px-4 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200`}>
                <FiSearch className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none w-full text-sm"
                />
              </div>
              
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      location.pathname === link.path
                        ? 'bg-primary/20 text-primary'
                        : darkMode 
                          ? 'text-gray-400 hover:text-primary hover:bg-dark/50' 
                          : 'text-gray-600 hover:text-primary hover:bg-light-darker/80'
                    }`}
                    onClick={closeMenu}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                
                <div className={`h-px my-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                
                {authLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      location.pathname === link.path
                        ? 'bg-primary/20 text-primary'
                        : index === authLinks.length - 1 && !isAuthenticated
                          ? 'bg-primary/90 text-white'
                          : darkMode 
                            ? 'text-gray-400 hover:text-primary hover:bg-dark/50' 
                            : 'text-gray-600 hover:text-primary hover:bg-light-darker/80'
                    }`}
                    onClick={closeMenu}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                ))}
                
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      logout()
                      closeMenu()
                    }}
                    className={`text-sm font-medium py-3 px-4 rounded-lg text-left transition-all duration-200 flex items-center gap-3 ${
                      darkMode 
                        ? 'text-gray-400 hover:text-primary hover:bg-dark/50' 
                        : 'text-gray-600 hover:text-primary hover:bg-light-darker/80'
                    }`}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
