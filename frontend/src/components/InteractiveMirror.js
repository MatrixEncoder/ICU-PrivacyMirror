import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveMirror = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyeBlink, setEyeBlink] = useState(false);
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        mouseX.set(x * 100);
        mouseY.set(y * 100);
        setMousePosition({ x, y });
      }
    };

    // Eye blink effect
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, 4000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
      <div className="text-center relative">
        <motion.h2 
          className="text-3xl md:text-4xl font-orbitron text-cyan-300 mb-12 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          You Are Being Watched
        </motion.h2>

        {/* Interactive Digital Silhouette */}
        <div className="relative w-80 h-80 mx-auto">
          {/* Glowing Base Circle */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 backdrop-blur-sm"
            animate={{ 
              rotate: 360,
              boxShadow: [
                "0 0 20px rgba(0, 255, 255, 0.3)",
                "0 0 60px rgba(160, 32, 240, 0.4)",
                "0 0 20px rgba(0, 255, 255, 0.3)"
              ]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Morphing Geometric Shape */}
          <motion.div 
            className="absolute inset-8 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 backdrop-blur-md border border-cyan-300/30"
            style={{ 
              x: springX, 
              y: springY,
              clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
            }}
            animate={{ 
              clipPath: [
                "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
              ]
            }}
            transition={{ 
              clipPath: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Inner Pulse Effect */}
            <motion.div 
              className="absolute inset-2 bg-gradient-to-br from-cyan-300/30 to-transparent rounded-lg"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>

          {/* Floating Eye Animation */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className="relative w-full h-full">
              {/* Eye Outer Ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-cyan-300/60 bg-black/40 backdrop-blur-sm"
                animate={{ 
                  borderColor: [
                    "rgba(0, 255, 255, 0.6)",
                    "rgba(160, 32, 240, 0.6)",
                    "rgba(0, 255, 255, 0.6)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Eye Pupil */}
              <motion.div 
                className="absolute top-1/2 left-1/2 w-6 h-6 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  x: mousePosition.x * 8, 
                  y: mousePosition.y * 8 
                }}
                animate={{ 
                  boxShadow: [
                    "0 0 10px rgba(0, 255, 255, 0.8)",
                    "0 0 20px rgba(0, 255, 255, 1)",
                    "0 0 10px rgba(0, 255, 255, 0.8)"
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Blink Effect */}
              {eyeBlink && (
                <motion.div 
                  className="absolute inset-0 bg-black rounded-full"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </div>
          </motion.div>

          {/* Scanning Lines */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
            animate={{ y: [-320, 320] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ height: "2px" }}
          />
        </div>

        <motion.p 
          className="text-lg text-purple-300 mt-8 font-orbitron tracking-wide opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Move your cursor and feel the presence
        </motion.p>
      </div>
    </section>
  );
};

export default InteractiveMirror;