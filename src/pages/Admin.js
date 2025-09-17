import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Save, X, Eye, EyeOff, 
  BarChart3, Users, FileText, Settings,
  Search, Calendar, TrendingUp
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState({
    projects: [],
    blogs: [],
    messages: [],
    personal: {}
  });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const handleLogin = (formData) => {
    if (formData.password === 'newpassword123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      toast.success('Welcome back! 🎉');
    } else {
      toast.error('Invalid credentials! 🔒');
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem('portfolioData', JSON.stringify(newData));
    toast.success('Changes saved successfully! ✨');
  };

  const handleAddProject = (formData) => {
    const newProject = {
      id: Date.now(),
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()),
      featured: formData.featured || false,
      createdAt: new Date().toISOString()
    };
    
    const newData = {
      ...data,
      projects: [...data.projects, newProject]
    };
    
    saveData(newData);
    reset();
    setEditingItem(null);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const newData = {
        ...data,
        projects: data.projects.filter(project => project.id !== id)
      };
      saveData(newData);
      toast.success('Project deleted successfully! 🗑️');
    }
  };

  const handleAddBlog = (formData) => {
    const newBlog = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
      tags: formData.tags.split(',').map(t => t.trim()),
      createdAt: new Date().toISOString()
    };
    
    const newData = {
      ...data,
      blogs: [...data.blogs, newBlog]
    };
    
    saveData(newData);
    reset();
    setEditingItem(null);
  };

  const startEdit = (item, type) => {
    setEditingItem({ ...item, type });
    if (type === 'project') {
      setValue('title', item.title);
      setValue('description', item.description);
      setValue('image', item.image);
      setValue('technologies', item.technologies.join(', '));
      setValue('github', item.github);
      setValue('demo', item.demo);
      setValue('featured', item.featured);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully! 👋');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'blogs', label: 'Blogs', icon: Users },
    { id: 'messages', label: 'Messages', icon: Settings },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Projects', value: data.projects.length, icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { label: 'Blog Posts', value: data.blogs.length, icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Messages', value: data.messages.length, icon: Settings, color: 'from-green-500 to-emerald-500' },
    { label: 'Featured Projects', value: data.projects.filter(p => p.featured).length, icon: TrendingUp, color: 'from-orange-500 to-red-500' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-card p-8 w-full max-w-md relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold gradient-text mb-2">Admin Portal</h2>
            <p className="text-gray-400">Enter your credentials to continue</p>
          </motion.div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  className="form-control pr-12"
                  placeholder="Enter admin password"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Access Dashboard
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900/50 relative">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card m-4 p-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage your portfolio content</p>
          </div>
          <motion.button
            onClick={logout}
            className="btn btn-danger"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      </motion.header>

      <div className="flex gap-4 p-4">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-64 glass-card p-6"
        >
          <nav className="space-y-2">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <tab.icon size={20} />
                {tab.label}
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-6 hover-lift"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">{stat.label}</p>
                          <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                          <stat.icon size={24} className="text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {data.projects.slice(0, 3).map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FileText size={16} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{project.title}</p>
                          <p className="text-gray-400 text-sm">Project created</p>
                        </div>
                        <div className="text-gray-400 text-sm">
                          <Calendar size={14} className="inline mr-1" />
                          {new Date(project.createdAt || Date.now()).toLocaleDateString()}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Projects Header */}
                <div className="glass-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Projects</h2>
                      <p className="text-gray-400">Manage your portfolio projects</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="relative">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search projects..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="form-control pl-10 w-64"
                        />
                      </div>
                      <motion.button
                        onClick={() => setEditingItem({ type: 'project' })}
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={20} />
                        Add Project
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Project Form */}
                <AnimatePresence>
                  {editingItem?.type === 'project' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      className="glass-card p-6"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">
                          {editingItem.id ? 'Edit Project' : 'Add New Project'}
                        </h3>
                        <motion.button
                          onClick={() => {
                            setEditingItem(null);
                            reset();
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X size={20} className="text-gray-400" />
                        </motion.button>
                      </div>
                      
                      <form
                        onSubmit={handleSubmit(handleAddProject)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        <div className="form-group">
                          <label className="form-label">Project Title</label>
                          <input
                            {...register('title', { required: 'Title is required' })}
                            className="form-control"
                            placeholder="Enter project title"
                          />
                          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Image URL</label>
                          <input
                            {...register('image', { required: 'Image URL is required' })}
                            className="form-control"
                            placeholder="/project-image.png"
                          />
                          {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>}
                        </div>
                        
                        <div className="md:col-span-2 form-group">
                          <label className="form-label">Description</label>
                          <textarea
                            {...register('description', { required: 'Description is required' })}
                            className="form-control"
                            rows={3}
                            placeholder="Describe your project"
                          />
                          {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Technologies</label>
                          <input
                            {...register('technologies', { required: 'Technologies are required' })}
                            className="form-control"
                            placeholder="React, Node.js, MongoDB"
                          />
                          {errors.technologies && <p className="text-red-400 text-sm mt-1">{errors.technologies.message}</p>}
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">GitHub URL</label>
                          <input
                            {...register('github')}
                            className="form-control"
                            placeholder="https://github.com/username/repo"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Demo URL</label>
                          <input
                            {...register('demo')}
                            className="form-control"
                            placeholder="https://demo-url.com"
                          />
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            {...register('featured')}
                            className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <label className="text-sm font-medium text-gray-300">Featured Project</label>
                        </div>
                        
                        <div className="md:col-span-2">
                          <motion.button
                            type="submit"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Save size={20} />
                            {editingItem.id ? 'Update Project' : 'Create Project'}
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Projects List */}
                <div className="grid gap-4">
                  {data.projects
                    .filter(project => 
                      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      project.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-6 hover-lift"
                    >
                      <div className="flex items-center gap-6">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-white">{project.title}</h3>
                            {project.featured && (
                              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex gap-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => startEdit(project, 'project')}
                            className="p-2 text-indigo-400 hover:bg-indigo-500/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'blogs' && (
              <motion.div
                key="blogs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="glass-card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
                      <p className="text-gray-400">Manage your blog content</p>
                    </div>
                    <motion.button
                      onClick={() => setEditingItem({ type: 'blog' })}
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus size={20} />
                      Add Blog Post
                    </motion.button>
                  </div>

                  {editingItem?.type === 'blog' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-6 bg-white/5 rounded-lg"
                    >
                      <form onSubmit={handleSubmit(handleAddBlog)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="form-label">Title</label>
                            <input
                              {...register('title', { required: 'Title is required' })}
                              className="form-control"
                              placeholder="Blog post title"
                            />
                          </div>
                          <div>
                            <label className="form-label">Tags</label>
                            <input
                              {...register('tags')}
                              className="form-control"
                              placeholder="React, JavaScript, Web Development"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Content</label>
                          <textarea
                            {...register('content', { required: 'Content is required' })}
                            className="form-control"
                            rows={6}
                            placeholder="Write your blog post content..."
                          />
                        </div>
                        <div className="flex gap-4">
                          <button type="submit" className="btn btn-primary">
                            <Save size={20} />
                            Save Blog Post
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingItem(null)}
                            className="btn btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    {data.blogs.map((blog, index) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white/5 rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">{blog.title}</h3>
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{blog.content}</p>
                            <div className="flex gap-2">
                              {blog.tags?.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="glass-card p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
                    <p className="text-gray-400">Messages from your portfolio contact form</p>
                  </div>

                  <div className="space-y-4">
                    {data.messages.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-400">No messages yet</p>
                      </div>
                    ) : (
                      data.messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-white/5 rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-white">{message.name}</h3>
                              <p className="text-indigo-400">{message.email}</p>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {new Date(message.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-300">{message.message}</p>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Admin;