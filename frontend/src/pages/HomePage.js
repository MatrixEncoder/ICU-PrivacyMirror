import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AwarenessSection from '../components/AwarenessSection';
import InteractiveMirror from '../components/InteractiveMirror';
import FinalSection from '../components/FinalSection';
import ParticleBackground from '../components/ParticleBackground';
import ScanLines from '../components/ScanLines';

const HomePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#06060a] overflow-x-hidden">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY, opacity: backgroundOpacity }}
      >
        <ParticleBackground />
      </motion.div>
      
      {/* Scan Lines Overlay */}
      <ScanLines />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <AwarenessSection />
        <InteractiveMirror />
        <FinalSection />
      </div>
    </div>
  );
};

export default HomePage;