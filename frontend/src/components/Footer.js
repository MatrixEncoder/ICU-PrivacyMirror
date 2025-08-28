import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-cyan-400/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                ICU
              </div>
              <Shield className="h-8 w-8 text-cyan-400" />
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Advanced privacy exposure checking using open-source intelligence tools. 
              Know your digital footprint, protect your privacy.
            </p>
            <div className="text-sm text-gray-500">
              Every time, Everywhere... but with your consent.
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-cyan-300 font-orbitron font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#privacy-policy" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Disclaimer
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-cyan-300 font-orbitron font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a 
                href="mailto:contact@icu-privacy.com" 
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                contact@icu-privacy.com
              </a>
              <a 
                href="https://github.com/icu-privacy" 
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                Open Source
              </a>
              <a 
                href="https://twitter.com/icu_privacy" 
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
                @icu_privacy
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-gray-500 text-sm">
            © 2025 ICU Privacy. Built for digital freedom.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              No data stored • Ephemeral checks
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;