import React from 'react';

const Logo = () => {
  return (
    <div className="flex justify-center">
      <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-8 h-8 text-white"
        >
          <path 
            fillRule="evenodd" 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-2h2v2h-2zm0-5V7h2v6h-2z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </div>
  );
};

export default Logo;