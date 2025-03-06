
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, Zap } from 'lucide-react';
import EmailSignup from './EmailSignup';

const ComingSoon = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-poker-gold" />,
      title: "Immersive Experience",
      description: "Step into our virtual poker paradise where every detail is crafted for maximum engagement"
    },
    {
      icon: <Zap className="h-6 w-6 text-poker-gold" />,
      title: "Lightning Fast Gameplay",
      description: "Feel the rush with our ultra-responsive platform that keeps the action flowing seamlessly"
    },
    {
      icon: <Clock className="h-6 w-6 text-poker-gold" />,
      title: "24/7 Availability",
      description: "Your seat at the table is always ready, whenever inspiration strikes"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16 content-reveal">
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
            Our team of poker virtuosos and tech masterminds are creating something extraordinary. 
            We're redefining online poker with a perfect blend of cutting-edge technology and classic poker tradition.
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
              className="glass rounded-xl p-6 text-center content-reveal"
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
          className="glass rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto content-reveal"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Secure Your Seat at the Table
          </h3>
          <p className="text-gray-300 mb-8">
            Join our exclusive circle of early access players and be the first to experience the next evolution in online poker.
          </p>
          <EmailSignup />
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
