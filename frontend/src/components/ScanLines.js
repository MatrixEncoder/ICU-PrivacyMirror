import React from 'react';
import { motion } from 'framer-motion';

const ScanLines = () => {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      {/* Horizontal scan lines */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.02) 2px,
            rgba(0, 255, 255, 0.02) 4px
          )`
        }}
      />
      
      {/* Moving scan line */}
      <motion.div 
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        animate={{ y: [0, window.innerHeight || 800] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ 
          filter: 'blur(1px)',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
        }}
      />
      
      {/* Vertical glitch lines */}
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          opacity: [0, 0.1, 0],
          x: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 0.2, 
          repeat: Infinity,
          repeatDelay: 5
        }}
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 1px,
            rgba(255, 0, 0, 0.05) 1px,
            rgba(255, 0, 0, 0.05) 2px
          )`
        }}
      />
    </div>
  );
};

export default ScanLines;