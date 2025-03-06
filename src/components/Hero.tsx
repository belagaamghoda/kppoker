
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CardAnimation from './CardAnimation';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-poker-navy z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-poker-royal/20 to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDEydjZIMzZ6TTE4IDM0aDEydjZIMTh6TTM2IDE2aDEydjZIMzZ6TTE4IDE2aDEydjZIMTh6TTI3IDI1aDZ2MTBoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
      </div>

      {/* Card Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <CardAnimation />
      </div>

      {/* Content */}
      <div className="container max-w-5xl z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-block mb-1">
            <span className="text-poker-accent bg-poker-accent/10 px-3 py-1 rounded-full text-sm font-medium tracking-wider">
              COMING SOON
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight md:leading-tight">
            <span className="text-gradient">KHEL POKER</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Where every hand tells a story and every play makes a legend
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
