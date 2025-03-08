
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check current auth status
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        duration: 3000,
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Function to format the Khel Poker text with larger first letters
  const formatKhelPoker = () => {
    const isMobile = window.innerWidth < 640;
    
    if (isMobile) {
      // Mobile layout - stack vertically
      return (
        <div className="flex flex-col items-center md:items-start">
          <span><span className="first-letter-large">K</span>HEL</span>
          <span><span className="first-letter-large">P</span>OKER</span>
        </div>
      );
    } else {
      return (
        <>
          <span className="first-letter-large">K</span>HEL <span className="first-letter-large">P</span>OKER
        </>
      );
    }
  };

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
            <h2 className="text-2xl font-bold footer-text-gradient">
              {formatKhelPoker()}
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
              Founded by <a href="https://www.linkedin.com/in/ca-parth/" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:underline">Parth Sharma</a>
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
            <div className="flex items-center justify-center md:justify-end space-x-4 mb-4">
              {/* Sign-in button is temporarily removed as requested */}
            </div>
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
