import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide button logic
      setShowScroll(window.scrollY > 500);
      
      // Calculate scroll percentage for inner fill
      const bodyHeight = document.body.scrollHeight;
      const scrollPos = window.innerHeight + window.scrollY;
      let percentage = (scrollPos / bodyHeight) * 100;
      if (percentage > 100) {
        percentage = 100;
      }
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="#"
      data-target="html"
      className={`scroll-to-target scroll-to-top ${showScroll ? ' show' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <span className="scroll-to-top__wrapper">
        <span 
          className="scroll-to-top__inner"
          style={{ width: `${scrollPercentage}%` }}
        ></span>
      </span>
      <span className="scroll-to-top__text"> Go Back Top</span>
    </a>
  );
};

export default ScrollToTopButton;