
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-white/5 content-reveal">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <h2 className="text-2xl font-bold text-gradient">
              <span className="first-letter-large">K</span>HEL <span className="first-letter-large">P</span>OKER
            </h2>
            <p className="text-sm text-gray-400 mt-1">Raise the stakes. Elevate the game.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-right mb-6 md:mb-0"
          >
            <p className="text-sm text-white/80">
              Founded by <span className="text-poker-gold font-medium">Parth Sharma</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Bringing a passion for poker to the digital realm
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Khel Poker. All rights reserved.
            </p>
            <div className="mt-2 flex space-x-4 justify-center md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
