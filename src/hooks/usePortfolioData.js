import { useState } from 'react';

export const usePortfolioData = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    
    return {
      projects: [],
      blogs: [],
      messages: [],
      personal: {
        name: "Kebin Maharjan",
        title: "Creative Developer",
        bio: "I'm a passionate developer and designer with experience creating beautiful, functional digital experiences.",
        image: "/k.jpg",
        email: "mhrznkebin@gmail.com",
        phone: "+977 9840883710",
        location: "Kathmandu, Nepal",
        resume: "/Resume.pdf"
      },
      skills: [
        { name: "JavaScript", percentage: 90 },
        { name: "Java", percentage: 40 },
        { name: "React", percentage: 85 },
        { name: "UI/UX Design", percentage: 80 }
      ],
      education: [
        {
          id: 1,
          degree: "Bachelor's in Computer Application",
          institution: "Tribhuvan University, Kathmandu",
          period: "2021 - Present",
          status: "ongoing"
        },
        {
          id: 2,
          degree: "High School - Computer Science",
          institution: "Everst Innovative College, Kathmandu",
          period: "2019 - 2021",
          status: "completed"
        }
      ],
      social: {
        facebook: "https://www.facebook.com/kebin.maharjan.93",
        instagram: "https://www.instagram.com/kebn___/",
        linkedin: "https://www.linkedin.com/in/kebin-maharjan-21428b374/",
        github: "https://github.com/kebinmaharjan"
      }
    };
  });

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem('portfolioData', JSON.stringify(newData));
  };

  const addProject = (project) => {
    const newProject = {
      id: Date.now(),
      ...project,
      createdAt: new Date().toISOString()
    };
    
    const updatedData = {
      ...data,
      projects: [...data.projects, newProject]
    };
    
    saveData(updatedData);
    return newProject;
  };

  const updateProject = (id, updates) => {
    const updatedProjects = data.projects.map(project =>
      project.id === id ? { ...project, ...updates } : project
    );
    
    saveData({ ...data, projects: updatedProjects });
  };

  const deleteProject = (id) => {
    const updatedProjects = data.projects.filter(project => project.id !== id);
    saveData({ ...data, projects: updatedProjects });
  };

  const addBlog = (blog) => {
    const newBlog = {
      id: Date.now(),
      ...blog,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    
    const updatedData = {
      ...data,
      blogs: [...data.blogs, newBlog]
    };
    
    saveData(updatedData);
    return newBlog;
  };

  const updateBlog = (id, updates) => {
    const updatedBlogs = data.blogs.map(blog =>
      blog.id === id ? { ...blog, ...updates } : blog
    );
    
    saveData({ ...data, blogs: updatedBlogs });
  };

  const deleteBlog = (id) => {
    const updatedBlogs = data.blogs.filter(blog => blog.id !== id);
    saveData({ ...data, blogs: updatedBlogs });
  };

  const addMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      ...message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const updatedData = {
      ...data,
      messages: [...data.messages, newMessage]
    };
    
    saveData(updatedData);
    return newMessage;
  };

  const markMessageAsRead = (id) => {
    const updatedMessages = data.messages.map(message =>
      message.id === id ? { ...message, read: true } : message
    );
    
    saveData({ ...data, messages: updatedMessages });
  };

  const deleteMessage = (id) => {
    const updatedMessages = data.messages.filter(message => message.id !== id);
    saveData({ ...data, messages: updatedMessages });
  };

  return {
    data,
    addProject,
    updateProject,
    deleteProject,
    addBlog,
    updateBlog,
    deleteBlog,
    addMessage,
    markMessageAsRead,
    deleteMessage
  };
};