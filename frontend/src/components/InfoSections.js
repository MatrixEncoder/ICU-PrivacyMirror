import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shield, Search, AlertTriangle, Eye, Lock, Globe } from 'lucide-react';

const InfoSections = () => {
  const infoSections = [
    {
      id: 'what-is',
      title: 'What is Privacy Mirror?',
      icon: <Eye className="h-8 w-8" />,
      content: [
        'Privacy Mirror is an advanced OSINT (Open Source Intelligence) tool that reveals your digital footprint across the internet.',
        'By analyzing publicly available information, it shows how exposed your personal data is and calculates a Privacy Exposure Score.',
        'This score helps you understand your digital privacy risks and take appropriate action to protect yourself.'
      ]
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      icon: <Search className="h-8 w-8" />,
      content: [
        '1. Enter your email, username, or domain',
        '2. Our system queries multiple OSINT databases and tools',
        '3. We analyze findings from Sherlock (username search), Holehe (email platform detection), and WHOIS (domain information)',
        '4. A Privacy Exposure Score (0-100) is calculated based on the number and severity of exposures',
        '5. Receive a detailed report with actionable recommendations'
      ]
    },
    {
      id: 'why-matters',
      title: 'Why It Matters',
      icon: <AlertTriangle className="h-8 w-8" />,
      content: [
        'Your digital footprint can be used for identity theft, social engineering attacks, and privacy violations.',
        'Cybercriminals often gather public information before launching targeted attacks.',
        'Knowing your exposure helps you make informed decisions about your online presence.',
        'Regular privacy checks help you maintain control over your digital identity.'
      ]
    }
  ];

  const features = [
    {
      title: 'Username Analysis',
      description: 'Discover where your username appears across 400+ platforms',
      icon: <Globe className="h-6 w-6" />
    },
    {
      title: 'Email Detection',
      description: 'Find which services your email is registered with',
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: 'Domain Intelligence',
      description: 'Get detailed WHOIS information and registration data',
      icon: <Lock className="h-6 w-6" />
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {infoSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-cyan-400/30 h-full hover:border-cyan-400/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-cyan-300 font-orbitron flex items-center gap-3">
                    <div className="text-purple-400">
                      {section.icon}
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-300 text-sm leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-12">
            Advanced OSINT Capabilities
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg mb-4 mx-auto">
                  <div className="text-cyan-400">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold font-orbitron text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-400/30">
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold font-orbitron text-white mb-4">
                  Your Privacy is Protected
                </h4>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  We operate with complete privacy. No data is stored, logged, or tracked. 
                  All checks are performed in real-time and results are ephemeral. 
                  Your information stays yours.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InfoSections;