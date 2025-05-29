import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import Button from '../components/Button';
import { useTheme } from '../contexts/ThemeContext';

const carouselSlides = [
  {
    id: 1,
    title: "Where every music scene lives.",
    description: "Discover thousands of musicians, bands, and collaborators. Connect with your local music community.",
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    position: "right"
  },
  {
    id: 2,
    title: "Share your talent with the world.",
    description: "Offer your musical services, collaborate on projects, and grow your professional network.",
    image: "https://images.pexels.com/photos/4088012/pexels-photo-4088012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    position: "left"
  },
  {
    id: 3,
    title: "Connect with musicians like you.",
    description: "Join communities based on your interests, instruments, or musical style.",
    image: "https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    position: "right"
  }
];

const StartPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { darkMode } = useTheme();
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
            </svg>
            <span className="ml-2 text-xl font-bold text-white">MusicianHub</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button variant="ghost" size="md" className="text-white border border-white/30 hover:bg-white/10">
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="md">
              Create account
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Carousel */}
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${carouselSlides[currentSlide].image})`,
                filter: 'brightness(0.6)'
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
            
            <div className={`absolute inset-0 flex items-center ${
              carouselSlides[currentSlide].position === 'right' 
                ? 'justify-end pr-8 md:pr-16 lg:pr-24 text-right' 
                : 'justify-start pl-8 md:pl-16 lg:pl-24 text-left'
            }`}>
              <div className="max-w-lg p-4">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                >
                  {carouselSlides[currentSlide].title}
                </motion.h1>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-white/80 mb-8"
                >
                  {carouselSlides[currentSlide].description}
                </motion.p>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link to="/register">
                    <Button variant="primary" size="lg">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/communities">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                      Explore Communities
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center space-x-2 z-10">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="relative bg-black py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className={`relative flex-1 w-full max-w-xl transition-all duration-300 ${
            isSearchFocused ? 'scale-105' : ''
          }`}>
            <input
              type="text"
              placeholder="Search for musicians, communities, or services"
              className="w-full bg-white/10 border border-white/20 text-white rounded-full py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-primary"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
          </div>
          <span className="text-white/60">or</span>
          <Link to="/services/new">
            <Button variant="primary" size="lg">
              Offer your services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
