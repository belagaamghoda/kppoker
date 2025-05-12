import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CardAnimation from './CardAnimation';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const founderRef = useRef<HTMLParagraphElement>(null);
  const isMobileRef = useRef(window.innerWidth < 640);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
    
    // Ensure page loads at top
    window.scrollTo(0, 0);
    
    // Force the page to start at the top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari

    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 640;
    };

    window.addEventListener('resize', checkMobile);
    checkMobile();

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mouse move handler for proximity-based hover effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobileRef.current) return;

    const applyProximityEffect = (element: HTMLElement | null, maxDistance: number = 200) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      // Get mouse position relative to viewport
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate center of element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from mouse to center of element
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + 
        Math.pow(mouseY - centerY, 2)
      );

      // Scale opacity based on distance (closer = brighter)
      const opacityValue = Math.max(0.3, 1 - Math.min(distance / maxDistance, 0.7));
      element.style.opacity = opacityValue.toString();
    };

    // Apply effect to each text element
    if (titleRef.current) {
      const headingLetters = titleRef.current.querySelectorAll('.letter-span');
      headingLetters.forEach(letter => {
        const letterEl = letter as HTMLSpanElement;
        const rect = letterEl.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(e.clientX - (rect.left + rect.width / 2), 2) + 
          Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        
        // More precise effect for letters - closer distance threshold
        const maxLetterDistance = 100;
        const opacity = Math.max(0.3, 1 - Math.min(distance / maxLetterDistance, 0.7));
        letterEl.style.opacity = opacity.toString();
      });
    }
    
    // Apply to subtitle and founder text
    applyProximityEffect(subtitleRef.current);
    applyProximityEffect(founderRef.current);
  };

  // Reset opacity when mouse leaves
  const handleMouseLeave = () => {
    if (isMobileRef.current) return;

    const resetOpacity = (element: HTMLElement | null, defaultOpacity: string = '0.3') => {
      if (!element) return;
      element.style.opacity = defaultOpacity;
    };

    // Reset title letter opacity
    if (titleRef.current) {
      const headingLetters = titleRef.current.querySelectorAll('.letter-span');
      headingLetters.forEach(letter => {
        (letter as HTMLSpanElement).style.opacity = '0.3';
      });
    }

    // Reset subtitle and founder text
    resetOpacity(subtitleRef.current);
    resetOpacity(founderRef.current);
  };

  // Function to create letter-by-letter spans for title
  const formatTitle = (title: string) => {
    // For mobile, keep the current simplified approach
    if (isMobileRef.current) {
      return (
        <>
          <span className="inline-block mb-3">
            <span className="first-letter-large">K</span>
            <span>HEL</span>
          </span>
          <span className="inline-block">
            <span className="first-letter-large">P</span>
            <span>OKER</span>
          </span>
        </>
      );
    }
    
    // For desktop, create individual letter spans for precise hover
    const word1 = "KHEL";
    const word2 = "POKER";
    
    return (
      <>
        <span className="inline-block mr-2 md:mr-3">
          {word1.split('').map((letter, idx) => (
            <span 
              key={`khel-${idx}`} 
              className={`letter-span ${idx === 0 ? 'first-letter-large' : ''}`}
            >
              {letter}
            </span>
          ))}
        </span>
        <span className="inline-block">
          {word2.split('').map((letter, idx) => (
            <span 
              key={`poker-${idx}`} 
              className={`letter-span ${idx === 0 ? 'first-letter-large' : ''}`}
            >
              {letter}
            </span>
          ))}
        </span>
      </>
    );
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full bg-poker-royal/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDEydjZIMzZ6TTE4IDM0aDEydjZIMTh6TTM2IDE2aDEydjZIMzZ6TTE4IDE2aDEydjZIMTh6TTI3IDI1aDZ2MTBoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
      </div>

      {/* Card Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <CardAnimation />
      </div>

      {/* Content */}
      <div className="container max-w-5xl z-10 text-center mobile-heading-adjust">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-block mb-1 coming-soon-badge">
            <span className="text-red-500 bg-red-500/10 border border-red-500 px-4 py-1.5 rounded-full text-lg md:text-xl font-medium tracking-wider">
              COMING SOON
            </span>
          </div>
          
          <h1 
            ref={titleRef} 
            className="text-5xl md:text-8xl font-bold leading-tight md:leading-tight hover-effect"
          >
            <span className="text-gradient">
              {formatTitle("KHEL POKER")}
            </span>
          </h1>
          
          <p 
            ref={subtitleRef} 
            className="text-sm md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed hover-effect"
            style={{ opacity: isMobileRef.current ? '1' : '0.3', transition: 'opacity 0.2s ease' }}
          >
            Where strategy meets fortune, and legends are born with every hand
          </p>
          
          <p 
            ref={founderRef} 
            className="text-sm text-gray-400 italic hover-effect"
            style={{ opacity: isMobileRef.current ? '1' : '0.3', transition: 'opacity 0.2s ease' }}
          >
            A vision by <a href="https://www.linkedin.com/in/ca-parth/" target="_blank" rel="noopener noreferrer" className="text-poker-gold font-medium hover:underline">Parth Sharma</a>, Founder
          </p>
        </motion.div>
      </div>

      {/* Subtle down arrow animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce flex justify-center">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-poker-silver"
          >
            <path 
              d="M7 13L12 18L17 13" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M7 7L12 12L17 7" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
