import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute top-full mt-2 left-0 z-10 w-72 p-4 bg-white text-gray-900 text-sm rounded-lg shadow-lg">
          {content}
          {/* Arrow */}
          <div className="absolute -top-2 left-4 w-4 h-4 bg-white transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
