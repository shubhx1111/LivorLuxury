import React from 'react';
import { motion } from 'framer-motion';
import './VibrantBackground.css';

const VibrantBackground = () => {
  return (
    <div className="vibrant-bg-container">
      {/* Orb 1: Deep Indigo / Purple */}
      <motion.div 
        className="vibrant-orb orb-purple"
        animate={{
          x: ['-20%', '30%', '-10%', '-20%'],
          y: ['-10%', '40%', '20%', '-10%'],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orb 2: Warm Regal Gold */}
      <motion.div 
        className="vibrant-orb orb-gold"
        animate={{
          x: ['30%', '-20%', '10%', '30%'],
          y: ['20%', '-15%', '40%', '20%'],
          scale: [1.2, 0.8, 1.1, 1.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orb 3: Luxurious Rose Gold / Magenta */}
      <motion.div 
        className="vibrant-orb orb-rose"
        animate={{
          x: ['-10%', '20%', '40%', '-10%'],
          y: ['50%', '10%', '-10%', '50%'],
          scale: [0.9, 1.2, 0.8, 0.9],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orb 4: Deep Sapphire / Teal */}
      <motion.div 
        className="vibrant-orb orb-teal"
        animate={{
          x: ['40%', '-10%', '-30%', '40%'],
          y: ['-10%', '30%', '10%', '-10%'],
          scale: [1, 1.4, 0.9, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Dynamic Noise texture & overlay grid */}
      <div className="vibrant-noise"></div>
      <div className="vibrant-overlay"></div>
    </div>
  );
};

export default VibrantBackground;
