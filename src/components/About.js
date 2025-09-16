import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { portfolioData } from '../data/portfolio';

const About = () => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const { personal, skills } = portfolioData;

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            About <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Me</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative">
                <motion.div
                  className="w-80 h-96 rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={personal.image}
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Who am I?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {personal.bio}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or hiking in the mountains for inspiration.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="glass-card p-4 text-center"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="text-2xl font-bold text-cyan-500 mb-2"
                      initial={{ scale: 0 }}
                      animate={isIntersecting ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                    >
                      {skill.percentage}%
                    </motion.div>
                    <div className="text-sm font-medium">{skill.name}</div>
                    <motion.div
                      className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2"
                      initial={{ width: 0 }}
                      animate={isIntersecting ? { width: "100%" } : { width: 0 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      <motion.div
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isIntersecting ? { width: `${skill.percentage}%` } : { width: 0 }}
                        transition={{ delay: index * 0.1 + 0.9, duration: 1 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;