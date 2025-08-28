import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Glitch effect interval
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const glitchVariants = {
    normal: { 
      x: 0, 
      textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff" 
    },
    glitch: { 
      x: [0, -2, 2, 0], 
      textShadow: [
        "0 0 20px #00ffff, 0 0 40px #00ffff",
        "2px 0 0 #ff0000, -2px 0 0 #00ffff",
        "-2px 0 0 #ff0000, 2px 0 0 #00ffff",
        "0 0 20px #00ffff, 0 0 40px #00ffff"
      ],
      transition: { duration: 0.15 }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Holographic Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-pattern"></div>
      </div>

      {/* Ambient Glow */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      <div className="text-center z-10">
        {/* ICU Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1 
            className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-orbitron tracking-wider"
            variants={glitchVariants}
            animate={glitchActive ? "glitch" : "normal"}
            style={{ 
              fontFamily: 'Orbitron, monospace',
              filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))'
            }}
          >
            ICU
          </motion.h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-2xl md:text-3xl text-cyan-300 font-light tracking-widest font-orbitron">
            Every time, Everywhere…
          </p>
        </motion.div>

        {/* Pulsing Border */}
        <motion.div 
          className="absolute inset-0 rounded-lg border-2 border-cyan-400/30"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(0, 255, 255, 0.3)",
              "0 0 60px rgba(0, 255, 255, 0.6)", 
              "0 0 20px rgba(0, 255, 255, 0.3)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;