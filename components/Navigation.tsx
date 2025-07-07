'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { NewsNotification } from './NewsNotification';
import ISI from '../public/ISI.png';
import WSDL from '../public/WSDLLogo.png';
import MLRG from '../public/MLRG.png';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showWinterSchoolPopup, setShowWinterSchoolPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
    { href: '/publications', label: 'Publications' },
    // { href: '/blog', label: 'Blog' },
    // { href: '/miscellaneous', label: 'Miscellaneous' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {/*<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-200 via-indigo-400 to-purple-500 p-[3px] flex items-center justify-center">*/}
                <div className="w-10 h-10 rounded-lg bg-gray-900 p-[3px] flex items-center justify-center">
                  <img
                    src={MLRG.src}
                    alt="Lab Logo"
                    className="w-30 h-25 object-cover"
                  />
                </div>


                {/* <div className="flex flex-col">
                  <span className="font-bold text-lg text-gradient leading-tight">ML</span>
                  <span className="font-semibold text-sm text-gradient leading-tight">Research Lab</span>
                </div> */}
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNews(!showNews)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </motion.button>

              {/* Winter School Icon - Desktop Only */}
              <div className="relative">
                <motion.a
                  href="https://www.isical.ac.in/~wsdl"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setShowWinterSchoolPopup(true)}
                  onMouseLeave={() => setShowWinterSchoolPopup(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors block"
                >
                  <img
                    src={WSDL.src}
                    alt="Winter School on Deep Learning"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </motion.a>

                {/* Winter School Popup - Fixed positioning */}
                <AnimatePresence>
                  {showWinterSchoolPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-2 mt-2 p-4 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center z-50"
                    >
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Winter School on Deep Learning
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        One of ECSU's Flagship Programs!
                      </p>
                      <span className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                        Learn More →
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>

              {/* Institutional Logo - Desktop Only */}
              <Link href="https://web.isical.ac.in" target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <img
                    src={ISI.src}
                    alt="ISI Logo"
                    width="35"
                    height="25"
                    className="rounded-sm object-cover border border-gray-300 dark:border-gray-600"
                  />
                  {/* <span className="text-md font-medium text-gray-700 dark:text-gray-300">
                    ISI
                  </span> */}
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between h-16">
            {/* Institutional Logo - Mobile Left */}
            <Link href="https://web.isical.ac.in" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1"
              >
                <img
                  
                    src={ISI.src}
                    alt="ISI Logo"
                  className="w-8 h-8 rounded-lg object-cover border border-gray-300 dark:border-gray-600"
                />
              </motion.div>
            </Link>

            {/* ML Research Lab Logo - Mobile Center */}
            <Link href="/" className="flex items-center space-x-2">
              {/* <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Lab Logo"
                className="w-8 h-8 rounded-lg object-cover border-2 border-blue-500"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-gradient leading-tight">ML</span>
                <span className="font-semibold text-xs text-gradient leading-tight">Research Lab</span>
              </div> */}
                {/*<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-200 via-indigo-400 to-purple-500 p-[3px] flex items-center justify-center">*/}
                <div className="w-10 h-10 rounded-lg bg-gray-900 p-[3px] flex items-center justify-center">
                  <img
                    src={MLRG.src}
                    alt="Lab Logo"
                    className="w-30 h-25 object-cover"
                  />
                </div>
            </Link>

            {/* Mobile Actions - Right */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNews(!showNews)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-effect border-t border-gray-200 dark:border-gray-700"
            >
              <div className="container mx-auto px-6 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Winter School Link - Mobile */}
                <a
                  href="https://www.isical.ac.in/~wsdl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={WSDL.src}
                      alt="Winter School on Deep Learning"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>WSDL</span>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* News Notification */}
      <NewsNotification isOpen={showNews} onClose={() => setShowNews(false)} />
    </>
  );
}
