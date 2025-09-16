import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrame;
    
    const updateMousePosition = (e) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-150 ease-out animate-spin"
      style={{
        left: mousePosition.x - 18,
        top: mousePosition.y - 24,
        transform: `scale(${isHovering ? 1.3 : 1})`,
        animationDuration: '3s'
      }}
    >
      <svg width="36" height="48" viewBox="0 0 24 32" fill="none">
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B"/>
            <stop offset="50%" stopColor="#FF4444"/>
            <stop offset="100%" stopColor="#CC0000"/>
          </linearGradient>
          <radialGradient id="visorGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
            <stop offset="40%" stopColor="#E6F3FF" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#B3D9FF" stopOpacity="0.5"/>
          </radialGradient>
          <filter id="shadow">
            <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
        </defs>
        <path d="M6 8C6 4 8 2 12 2C16 2 18 4 18 8V20C18 24 16 26 12 26C8 26 6 24 6 20V8Z" fill="url(#bodyGrad)" stroke="#990000" strokeWidth="0.5" filter="url(#shadow)"/>
        <ellipse cx="12" cy="10" rx="6" ry="4" fill="url(#visorGrad)" stroke="#4A90E2" strokeWidth="0.5"/>
        <ellipse cx="10" cy="9" rx="1" ry="0.5" fill="#FFFFFF" opacity="0.8"/>
        <rect x="8" y="24" width="3" height="6" rx="1.5" fill="url(#bodyGrad)" stroke="#990000" strokeWidth="0.5" filter="url(#shadow)"/>
        <rect x="13" y="24" width="3" height="6" rx="1.5" fill="url(#bodyGrad)" stroke="#990000" strokeWidth="0.5" filter="url(#shadow)"/>
        <rect x="16" y="12" width="4" height="8" rx="2" fill="#E63946" stroke="#990000" strokeWidth="0.5" filter="url(#shadow)"/>
      </svg>
    </div>
  );
};

export default CustomCursor;