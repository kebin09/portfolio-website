import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Footer = () => {
  const { personal, social } = portfolioData;
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: social.facebook, label: 'Facebook' },
    { icon: Instagram, href: social.instagram, label: 'Instagram' },
    { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
   // { icon: Github, href: social.github, label: 'GitHub' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="border-t border-gray-700 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 flex items-center justify-center gap-2">
              © {currentYear} {personal.name}. Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart size={16} className="text-red-500 fill-current" />
              </motion.span>
              All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;