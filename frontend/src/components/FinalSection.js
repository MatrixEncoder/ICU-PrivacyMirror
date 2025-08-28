import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import DigitalRain from './DigitalRain';

const FinalSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Digital Rain Background */}
      <DigitalRain />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-transparent z-10" />
      
      <div className="text-center relative z-20 px-4">
        {/* Main CTA Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold font-orbitron tracking-wider mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
              Privacy is Power.
            </span>
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-white"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.5)",
                  "0 0 40px rgba(160, 32, 240, 0.8)",
                  "0 0 20px rgba(0, 255, 255, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Protect it.
            </motion.span>
          </h2>
        </motion.div>

        {/* Animated Glowing Border */}
        <motion.div 
          className="absolute inset-0 rounded-xl border-2 border-transparent"
          animate={{ 
            borderColor: [
              "rgba(0, 255, 255, 0.3)",
              "rgba(160, 32, 240, 0.6)", 
              "rgba(0, 170, 255, 0.4)",
              "rgba(0, 255, 255, 0.3)"
            ],
            boxShadow: [
              "0 0 30px rgba(0, 255, 255, 0.2)",
              "0 0 60px rgba(160, 32, 240, 0.4)",
              "0 0 30px rgba(0, 170, 255, 0.3)",
              "0 0 30px rgba(0, 255, 255, 0.2)"
            ]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Button 
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-orbitron text-xl px-12 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            style={{
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(160, 32, 240, 0.2)"
            }}
          >
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 5px rgba(255, 255, 255, 0.8)",
                  "0 0 15px rgba(255, 255, 255, 1)",
                  "0 0 5px rgba(255, 255, 255, 0.8)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Learn More Soon
            </motion.span>
          </Button>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          className="text-cyan-300/80 text-lg mt-8 font-orbitron tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1 }}
        >
          The future of digital freedom starts with awareness
        </motion.p>
      </div>
    </section>
  );
};

export default FinalSection;