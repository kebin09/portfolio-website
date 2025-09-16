import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Filter, Star, Eye } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { portfolioData } from '../data/portfolio';

const Projects = () => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [filter, setFilter] = useState('all');
  const [, setHoveredProject] = useState(null);
  const { projects } = portfolioData;

  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.technologies.some(tech => 
        tech.toLowerCase().includes(filter.toLowerCase())
      ));

  const allTechnologies = [...new Set(projects.flatMap(p => p.technologies))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              My <span className="gradient-text">Projects</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Explore my latest work and creative solutions
            </motion.p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <AnimatePresence mode="wait">
              <motion.button
                key="all"
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter size={16} className="inline mr-2" />
                All Projects ({projects.length})
              </motion.button>
              
              <motion.button
                key="featured"
                onClick={() => setFilter('featured')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === 'featured'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star size={16} className="inline mr-2" />
                Featured
              </motion.button>
              
              {allTechnologies.slice(0, 4).map(tech => (
                <motion.button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === tech
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="group relative"
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="glass-card p-6 h-full relative overflow-hidden">
                    {/* Project Image */}
                    <div className="relative mb-6 rounded-xl overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-700"
                        whileHover={{ scale: 1.1 }}
                      />
                      
                      {/* Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white text-center font-medium hover:bg-white/30 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github size={16} className="inline mr-2" />
                            Code
                          </motion.a>
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-indigo-500/80 backdrop-blur-sm border border-indigo-400/50 rounded-lg px-4 py-2 text-white text-center font-medium hover:bg-indigo-500 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink size={16} className="inline mr-2" />
                            Demo
                          </motion.a>
                        </div>
                      </motion.div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <motion.div
                          className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                        >
                          <Star size={12} className="inline mr-1" />
                          Featured
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Project Content */}
                    <div className="space-y-4">
                      <motion.h3
                        className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300"
                        layoutId={`title-${project.id}`}
                      >
                        {project.title}
                      </motion.h3>
                      
                      <motion.p
                        className="text-gray-400 text-sm leading-relaxed"
                        layoutId={`description-${project.id}`}
                      >
                        {project.description}
                      </motion.p>
                      
                      {/* Technologies */}
                      <motion.div
                        className="flex flex-wrap gap-2"
                        layoutId={`tech-${project.id}`}
                      >
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium border border-indigo-500/30"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.05 + 0.3 }}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 0.3)" }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Hover Effect Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View More Button */}
          {filteredProjects.length > 6 && (
            <motion.div
              className="text-center mt-12"
              variants={itemVariants}
            >
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={20} />
                View More Projects
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;