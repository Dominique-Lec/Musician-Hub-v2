import { useTheme } from '../contexts/ThemeContext';

const GreenAccentCard = ({ children, accentPosition = 'top' }) => {
  const { darkMode } = useTheme();
  
  const accentClasses = {
    top: 'border-t-4 border-primary',
    bottom: 'border-b-4 border-primary',
    left: 'border-l-4 border-primary',
    right: 'border-r-4 border-primary',
  };
  
  return (
    <div 
      className={`rounded-lg overflow-hidden ${accentClasses[accentPosition]} ${
        darkMode ? 'bg-dark-lighter hover:bg-dark-lighter/80' : 'bg-white hover:bg-gray-50'
      } transition-all duration-200 hover:shadow-md`}
    >
      {children}
    </div>
  );
};

export default GreenAccentCard;
