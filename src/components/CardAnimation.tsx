
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cardSuits = ['♠', '♥', '♦', '♣'];
const cardValues = ['A', 'K', 'Q', 'J', '10'];

interface Card {
  id: number;
  suit: string;
  value: string;
  x: number;
  y: number;
  rotation: number;
  delay: number;
}

const CardAnimation = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const cardIdRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to generate a random card
  const generateRandomCard = (id: number, delay: number = 0) => {
    const suit = cardSuits[Math.floor(Math.random() * cardSuits.length)];
    const value = cardValues[Math.floor(Math.random() * cardValues.length)];
    
    return {
      id,
      suit,
      value,
      x: Math.random() * 80 - 40,
      y: Math.random() * 80 - 40,
      rotation: Math.random() * 30 - 15,
      delay
    };
  };

  useEffect(() => {
    // Generate initial cards for animation
    const initialCards = Array.from({ length: 7 }, (_, i) => 
      generateRandomCard(cardIdRef.current + i, i * 0.2)
    );
    
    cardIdRef.current += initialCards.length;
    setCards(initialCards);
    
    // Set up interval to add new cards continuously
    intervalRef.current = setInterval(() => {
      setCards(prevCards => {
        // Remove the oldest card if we have more than 7
        const updatedCards = prevCards.length >= 7 
          ? [...prevCards.slice(1)] 
          : [...prevCards];
        
        // Add a new card
        return [...updatedCards, generateRandomCard(cardIdRef.current++)];
      });
    }, 3000); // Add a new card every 3 seconds
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ 
              x: -1000, 
              y: -200 + card.y, 
              rotate: -45,
              opacity: 0
            }}
            animate={{ 
              x: `calc(50% + ${card.x}px)`, 
              y: `calc(50% + ${card.y}px)`, 
              rotate: card.rotation,
              opacity: 0.7
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.5 }
            }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 20,
              delay: card.delay,
              duration: 0.8
            }}
            className={`absolute w-14 h-20 md:w-20 md:h-28 rounded-md flex items-center justify-center text-xl md:text-2xl font-bold bg-white shadow-lg ${
              card.suit === '♥' || card.suit === '♦' ? 'text-poker-accent' : 'text-poker-navy'
            }`}
          >
            <div className="absolute top-1 left-1 text-sm md:text-base">{card.value}</div>
            <div className="text-2xl md:text-4xl">{card.suit}</div>
            <div className="absolute bottom-1 right-1 text-sm md:text-base rotate-180">{card.value}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CardAnimation;
