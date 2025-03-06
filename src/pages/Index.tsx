
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ComingSoon from '../components/ComingSoon';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Set page title and description
    document.title = "Khel Poker - Coming Soon";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-poker-navy"
    >
      <Hero />
      <ComingSoon />
      <Footer />
    </motion.div>
  );
};

export default Index;
