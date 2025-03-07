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

    // Enhanced spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !containerRef.current) return;
      
      const container = containerRef.current.getBoundingClientRect();
      const x = e.clientX - container.left;
      const y = e.clientY - container.top;
      
      spotlightRef.current.style.left = `${x}px`;
      spotlightRef.current.style.top = `${y}px`;
      spotlightRef.current.style.width = '700px'; // Increased from 600px for more intensity
      spotlightRef.current.style.height = '700px'; // Increased from 600px for more intensity
      spotlightRef.current.style.opacity = '1';
      
      // Add custom spotlight effect on content
      const elements = document.querySelectorAll('.content-reveal');
      elements.forEach(el => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to element center
        const distance = Math.sqrt(
          Math.pow(e.clientX - elCenterX, 2) + 
          Math.pow(e.clientY - elCenterY, 2)
        );
        
        // Create a normalized opacity value based on distance
        // Closer elements are more visible (up to 1), farther elements are less visible (down to 0.1)
        const maxDistance = 400; // Reduced from 500 for more pronounced effect
        const opacity = distance < maxDistance 
          ? 0.1 + 0.9 * (1 - Math.min(distance / maxDistance, 1)) // Changed from 0.15 + 0.85 for more contrast
          : 0.1; // Changed from 0.15 for darker text by default
        
        // Special treatment for email signup
        if ((el as HTMLElement).querySelector('form.max-w-md')) {
          // Keep the email form more visible
          (el as HTMLElement).style.opacity = Math.max(opacity, 0.7).toString();
        } else {
          (el as HTMLElement).style.opacity = opacity.toString();
        }
      });
    };

    const handleMouseLeave = () => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.opacity = '0';
      
      // Reset all content reveal elements to base opacity
      const elements = document.querySelectorAll('.content-reveal');
      elements.forEach(el => {
        if ((el as HTMLElement).querySelector('form.max-w-md')) {
          // Keep the email form more visible even when not hovering
          (el as HTMLElement).style.opacity = '0.7';
        } else {
          (el as HTMLElement).style.opacity = '0.1'; // Changed from 0.15 for darker text by default
        }
      });
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
