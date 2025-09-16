import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { portfolioData } from '../data/portfolio';

const Resume = () => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const { education, personal } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="resume" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 font-mono"
          >
            {'My Journey'.split('').map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                animate={{
                  y: [0, -8, 0],
                  color: ['#00ffff', '#ff00ff', '#00ffff']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h2>

          <div className="relative">
            {/* Animated Timeline Path */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full">
              <motion.div
                className="absolute top-0 w-2 h-2 bg-cyan-400 rounded-full -left-0.5 shadow-lg shadow-cyan-400/50"
                animate={{
                  y: [0, 400, 0],
                  boxShadow: [
                    '0 0 10px #00ffff',
                    '0 0 20px #ff00ff',
                    '0 0 10px #00ffff'
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <div className="space-y-12 pl-20">
              
              {education.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="glass-card p-6 relative border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  {/* Timeline Node */}
                  <div className="absolute -left-20 top-6 w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-2 border-white shadow-lg" />
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">
                        {item.degree}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <MapPin size={16} className="text-purple-400" />
                        <span className="font-mono text-sm">{item.institution}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-pink-400" />
                        <span className={`px-3 py-1 rounded-full text-sm font-mono border ${
                          item.status === 'ongoing'
                            ? 'bg-green-500/20 border-green-500/50 text-green-300'
                            : 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                        }`}>
                          {item.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <motion.a
              href={personal.resume}
              download
              className="btn btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download Full Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;