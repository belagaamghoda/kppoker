
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CardAnimation from './CardAnimation';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
    
    // Ensure page loads at top
    window.scrollTo(0, 0);
    
    // Force the page to start at the top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari
  }, []);

  // Function to style the first letter of each word
  const formatTitle = (title: string) => {
    // For "KHEL POKER" with specific styling for mobile
    const isMobile = window.innerWidth < 640;
    
    if (isMobile) {
      // Mobile layout - stack vertically with proper spacing
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
    } else {
      // Desktop layout
      return (
        <>
          <span className="inline-block mr-2 md:mr-3">
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
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
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
      <div className="container max-w-5xl z-10 text-center content-reveal mobile-heading-adjust">
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
          
          <h1 className="text-5xl md:text-8xl font-bold leading-tight md:leading-tight">
            <span className="text-gradient">
              {formatTitle("KHEL POKER")}
            </span>
          </h1>
          
          <p className="text-sm md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Where strategy meets fortune, and legends are born with every hand
          </p>
          
          <p className="text-sm text-gray-400 italic">
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
