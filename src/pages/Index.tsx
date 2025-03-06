
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ComingSoon from '../components/ComingSoon';
import Footer from '../components/Footer';

const Index = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set page title and description
    document.title = "Khel Poker - Coming Soon";

    // Spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !containerRef.current) return;
      
      const container = containerRef.current.getBoundingClientRect();
      const x = e.clientX - container.left;
      const y = e.clientY - container.top;
      
      spotlightRef.current.style.left = `${x}px`;
      spotlightRef.current.style.top = `${y}px`;
      spotlightRef.current.style.width = '600px';
      spotlightRef.current.style.height = '600px';
      spotlightRef.current.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.opacity = '0';
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black spotlight-container"
    >
      <div ref={spotlightRef} className="spotlight"></div>
      <Hero />
      <ComingSoon />
      <Footer />
    </motion.div>
  );
};

export default Index;
