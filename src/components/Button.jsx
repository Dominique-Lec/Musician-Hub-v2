import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon = null,
  iconPosition = 'left'
}) => {
  const baseClasses = 'rounded-full font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg hover:shadow-primary/30 active:scale-95',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-lg hover:shadow-secondary/30 active:scale-95',
    accent: 'bg-accent text-white hover:bg-accent-dark shadow-md hover:shadow-lg hover:shadow-accent/30 active:scale-95',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-95',
    ghost: 'bg-transparent text-primary hover:bg-primary/10 active:scale-95',
    spotify: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg hover:shadow-primary/30 active:scale-95',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3',
    xl: 'text-lg px-8 py-4',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClasses = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClasses} ${className}`}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};

export default Button;
