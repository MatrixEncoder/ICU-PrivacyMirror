import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AwarenessMessage = ({ message, animationType, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getAnimation = () => {
    switch (animationType) {
      case 'glitch':
        return {
          initial: { opacity: 0, x: -50 },
          animate: isInView ? { 
            opacity: 1, 
            x: 0,
            textShadow: [
              "0 0 5px #00ffff",
              "2px 0 0 #ff0000, -2px 0 0 #00ffff",
              "0 0 5px #00ffff"
            ]
          } : {},
          transition: { 
            duration: 0.8, 
            delay,
            textShadow: { duration: 0.3, repeat: 2 }
          }
        };
      case 'typewriter':
        return {
          initial: { width: 0, opacity: 0 },
          animate: isInView ? { width: "auto", opacity: 1 } : {},
          transition: { duration: 1.5, delay, ease: "easeInOut" }
        };
      case 'zoom':
        return {
          initial: { opacity: 0, scale: 0.3 },
          animate: isInView ? { opacity: 1, scale: 1 } : {},
          transition: { duration: 0.8, delay, ease: "easeOut" }
        };
      case 'slide':
        return {
          initial: { opacity: 0, y: 100, skewY: 5 },
          animate: isInView ? { opacity: 1, y: 0, skewY: 0 } : {},
          transition: { duration: 1, delay, ease: "easeOut" }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : {},
          transition: { duration: 1, delay }
        };
    }
  };

  const animation = getAnimation();

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center relative">
      {/* Background Shift */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10"
        animate={isInView ? { opacity: [0, 0.3, 0] } : {}}
        transition={{ duration: 2, delay }}
      />
      
      <motion.div
        className="text-center px-4 relative z-10"
        {...animation}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white font-orbitron tracking-wide">
          {message}
        </h2>
        
        {/* Glassmorphism Panel */}
        <motion.div 
          className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-lg -z-10"
          animate={isInView ? { 
            boxShadow: [
              "0 0 0 rgba(0, 255, 255, 0)",
              "0 0 30px rgba(0, 255, 255, 0.3)",
              "0 0 0 rgba(0, 255, 255, 0)"
            ]
          } : {}}
          transition={{ duration: 2, delay: delay + 0.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};

const AwarenessSection = () => {
  const messages = [
    { text: "Your clicks are tracked.", type: "glitch", delay: 0.2 },
    { text: "Your camera sees you.", type: "typewriter", delay: 0.4 },
    { text: "Your data speaks louder than you.", type: "zoom", delay: 0.6 },
    { text: "Your privacy is fragile.", type: "slide", delay: 0.8 }
  ];

  return (
    <div className="relative">
      {messages.map((message, index) => (
        <AwarenessMessage 
          key={index}
          message={message.text}
          animationType={message.type}
          delay={message.delay}
        />
      ))}
    </div>
  );
};

export default AwarenessSection;