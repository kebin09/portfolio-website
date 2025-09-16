import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Search, Filter } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Blog = () => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = usePortfolioData();
  const { blogs } = data;

  const allTags = [...new Set(blogs?.flatMap(blog => blog.tags || []) || [])];
  
  const filteredBlogs = blogs?.filter(blog => {
    const matchesTag = selectedTag === 'all' || (blog.tags && blog.tags.includes(selectedTag));
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  }) || [];

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const readingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(' ').length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Latest <span className="gradient-text">Blog Posts</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights from my development journey
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center"
          >
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control pl-10 w-80"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <motion.button
                onClick={() => setSelectedTag('all')}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedTag === 'all'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter size={14} className="inline mr-1" />
                All ({blogs.length})
              </motion.button>
              
              {allTags.slice(0, 5).map(tag => (
                <motion.button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="glass-card overflow-hidden group cursor-pointer"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(blog.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {readingTime(blog.content || blog.excerpt)} min read
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors duration-300">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30"
                          >
                            <Tag size={10} className="inline mr-1" />
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-indigo-400 font-medium group-hover:gap-4 transition-all duration-300">
                      <span>Read More</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredBlogs.length === 0 && (searchTerm || selectedTag !== 'all') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="glass-card p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <motion.button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag('all');
                  }}
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;