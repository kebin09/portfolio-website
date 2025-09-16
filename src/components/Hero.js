import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Mail, Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const { personal, social } = portfolioData;

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Interactive Particle Background */}
      <ParticleBackground />
      
      {/* Static background gradient */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20" />
      
      {/* Raining Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 bg-gradient-to-b from-cyan-400 to-transparent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${20 + Math.random() * 30}px`,
            }}
            animate={{
              y: [-50, window.innerHeight + 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8"
          >
            <motion.div className="space-y-8">
              {/* Greeting */}
              <motion.p
                className="text-lg text-cyan-400 font-mono tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                 Hello, I'm
                 Hello, I'm
              </motion.p>
              
              {/* Futuristic Name Display */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <div className="glitch-container group cursor-pointer">
                  <h1 className="glitch-text font-mono text-6xl md:text-8xl font-bold text-white leading-none">
                    <div className="relative">
                      <span className="block">KEBIN</span>
                      <span className="block ml-8 -mt-2">MAHARJAN</span>
                    </div>
                  </h1>
                </div>
              </motion.div>
              
              <motion.div
                className="text-xl md:text-2xl font-mono text-cyan-300 tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                {'Creative Developer'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    animate={{
                      y: [0, -10, 0],
                      rotateZ: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: "easeInOut"
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {personal.bio}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="btn btn-primary group enhanced-button"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code size={20} />
                View My Work
                <span className="ml-2">→</span>
              </motion.a>
              
              <motion.a
                href="#contact"
                className="btn btn-secondary group enhanced-button"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {Object.entries(social).map(([platform, url], index) => {
                const Icon = socialIcons[platform];
                const platformColors = {
                  github: 'hover:shadow-white/50',
                  linkedin: 'hover:shadow-blue-500/50',
                  instagram: 'hover:shadow-pink-500/50',
                  facebook: 'hover:shadow-blue-600/50'
                };
                return Icon ? (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 ${platformColors[platform]} hover:shadow-lg`}
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 + index * 0.1 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ) : null;
              })}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hidden md:flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Static glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Image container */}
              <div className="relative w-80 h-96 md:w-96 md:h-[500px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src={personal.image}
                  alt={personal.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Status indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>



        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div
            className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <ArrowDown size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;