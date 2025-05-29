import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SpotifyProgressBar = ({ 
  value = 0, 
  max = 100, 
  onChange,
  showThumb = true,
  height = 4,
  className = ''
}) => {
  const { darkMode } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  const percentage = (localValue / max) * 100;
  
  const handleClick = (e) => {
    if (!onChange) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newValue = (clickPosition / rect.width) * max;
    
    setLocalValue(newValue);
    onChange(newValue);
  };
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !onChange) return;
      
      const progressBar = document.getElementById('spotify-progress-bar');
      if (!progressBar) return;
      
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const newValue = (clickPosition / rect.width) * max;
      
      setLocalValue(newValue);
      onChange(newValue);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, max, onChange]);
  
  return (
    <div 
      id="spotify-progress-bar"
      className={`relative cursor-pointer ${className}`}
      style={{ height: `${height}px` }}
      onClick={handleClick}
    >
      <div 
        className={`absolute inset-0 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
      ></div>
      <div 
        className="absolute inset-y-0 left-0 bg-primary rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
      {showThumb && (
        <motion.div 
          className={`absolute top-1/2 -translate-y-1/2 -ml-2 w-4 h-4 rounded-full bg-white border-2 border-primary ${
            isDragging ? 'scale-125' : 'scale-0'
          } ${onChange ? 'group-hover:scale-100' : 'hidden'}`}
          style={{ left: `${percentage}%` }}
          animate={{ scale: isDragging ? 1.25 : percentage > 0 ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
        ></motion.div>
      )}
    </div>
  );
};

export default SpotifyProgressBar;
