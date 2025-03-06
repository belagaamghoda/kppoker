
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, Zap } from 'lucide-react';
import EmailSignup from './EmailSignup';

const ComingSoon = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-poker-gold" />,
      title: "Immersive Experience",
      description: "A next-level poker adventure designed to captivate your senses"
    },
    {
      icon: <Zap className="h-6 w-6 text-poker-gold" />,
      title: "Lightning Fast Gameplay",
      description: "Seamless real-time action with zero lag and instant responses"
    },
    {
      icon: <Clock className="h-6 w-6 text-poker-gold" />,
      title: "24/7 Availability",
      description: "Join the table anytime, anywhere with games running round the clock"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Crafting the Ultimate <span className="text-gradient">Poker Experience</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Our team of poker enthusiasts and tech wizards are building something extraordinary. 
            A digital poker haven that combines stunning aesthetics with flawless functionality.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="glass rounded-xl p-6 text-center"
            >
              <div className="bg-poker-royal/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Be the First to Know
          </h3>
          <p className="text-gray-300 mb-8">
            Join our exclusive waitlist and be among the first players to experience Khel Poker when we launch.
          </p>
          <EmailSignup />
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
