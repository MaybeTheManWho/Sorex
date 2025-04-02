import Link from 'next/link';

const Button = ({ 
  children, 
  href, 
  variant = 'primary', 
  className = '', 
  onClick,
  minecraft = false,
  ...props 
}) => {
  // Base classes
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-all duration-300 transform hover:scale-105';
  
  // Variant specific classes
  const variantClasses = {
    primary: 'bg-primary-green text-white hover:bg-secondary-green shadow-md',
    outline: 'border-2 border-primary-green text-primary-green hover:bg-gray-100',
    secondary: 'bg-stone-gray text-gray-800 hover:bg-gray-300 shadow-md',
  };
  
  // Minecraft style
  const minecraftClasses = 'border-b-4 border-dark-green hover:border-b-0 hover:mt-1 hover:mb-0';
  
  // Combine classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${minecraft ? minecraftClasses : ''} ${className}`;
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button className={buttonClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;