'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Search, Brain, BookOpen, FileText, Lightbulb, Coffee } from 'lucide-react';

export default function NotFound() {
  const [currentThought, setCurrentThought] = useState(0);
  const [bookPages, setBookPages] = useState(0);
  const [paperStack, setPaperStack] = useState(0);
  const [isThinking, setIsThinking] = useState(true);

  const thoughts = [
    "Hmm, where could this page be?",
    "Let me check my research notes...",
    "Maybe it's in another paper?",
    "This is quite puzzling...",
    "Perhaps I need more coffee?",
    "Wait, let me think about this...",
    "Could it be in the bibliography?",
    "Time to search more systematically..."
  ];

  const researchPapers = [
    "Neural Network Architecture",
    "Deep Learning Fundamentals", 
    "Statistical Learning Theory",
    "Machine Learning Algorithms",
    "Data Science Methodology",
    "Artificial Intelligence Basics"
  ];

  // Cycle through thoughts
  useEffect(() => {
    const thoughtInterval = setInterval(() => {
      setCurrentThought(prev => (prev + 1) % thoughts.length);
    }, 3000);

    return () => clearInterval(thoughtInterval);
  }, []);

  // Animate book page flipping
  useEffect(() => {
    const pageInterval = setInterval(() => {
      setBookPages(prev => (prev + 1) % 20);
    }, 1500);

    return () => clearInterval(pageInterval);
  }, []);

  // Animate paper stack shuffling
  useEffect(() => {
    const paperInterval = setInterval(() => {
      setPaperStack(prev => (prev + 1) % researchPapers.length);
    }, 2000);

    return () => clearInterval(paperInterval);
  }, []);

  // Toggle thinking state
  useEffect(() => {
    const thinkingInterval = setInterval(() => {
      setIsThinking(prev => !prev);
    }, 4000);

    return () => clearInterval(thinkingInterval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Papers */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`paper-${i}`}
            className="absolute w-16 h-20 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <div className="p-2">
              <div className="w-full h-1 bg-gray-300 dark:bg-gray-500 rounded mb-1" />
              <div className="w-3/4 h-1 bg-gray-300 dark:bg-gray-500 rounded mb-1" />
              <div className="w-full h-1 bg-gray-300 dark:bg-gray-500 rounded mb-1" />
              <div className="w-1/2 h-1 bg-gray-300 dark:bg-gray-500 rounded" />
            </div>
          </motion.div>
        ))}

        {/* Floating Books */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`book-${i}`}
            className="absolute w-12 h-16 bg-gradient-to-b from-blue-600 to-blue-800 rounded-sm shadow-lg"
            style={{
              right: `${5 + i * 15}%`,
              top: `${15 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, -3, 3, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            <div className="w-full h-1 bg-yellow-400 mt-1" />
            <div className="w-full h-1 bg-white mt-8" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* 404 with Animated Character */}
          <div className="mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-8xl md:text-9xl font-bold text-gradient mb-8"
            >
              404
            </motion.div>

            {/* Animated Researcher Character */}
            <div className="relative mx-auto w-64 h-64 mb-8">
              {/* Desk */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-16 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg shadow-lg" />
              
              {/* Person (simplified) */}
              <motion.div
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
                animate={{
                  y: isThinking ? [0, -5, 0] : [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Head */}
                <div className="w-16 h-16 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full mx-auto mb-2 relative">
                  {/* Eyes */}
                  <div className="absolute top-5 left-4 w-2 h-2 bg-gray-800 rounded-full" />
                  <div className="absolute top-5 right-4 w-2 h-2 bg-gray-800 rounded-full" />
                  {/* Thinking expression */}
                  <motion.div
                    className="absolute top-7 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-600 rounded-full"
                    animate={{
                      scaleY: isThinking ? [1, 0.5, 1] : 1,
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </div>
                
                {/* Body */}
                <div className="w-12 h-20 bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg mx-auto" />
              </motion.div>

              {/* Animated Book */}
              <motion.div
                className="absolute bottom-12 left-8 w-16 h-12 bg-gradient-to-r from-green-600 to-green-800 rounded shadow-lg origin-left"
                animate={{
                  rotateY: bookPages % 2 === 0 ? 0 : 180,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-1 bg-yellow-400 mt-1" />
                <BookOpen className="w-4 h-4 text-white absolute top-2 right-2" />
              </motion.div>

              {/* Paper Stack */}
              <div className="absolute bottom-12 right-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={paperStack}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-12 h-16 bg-white dark:bg-gray-700 rounded shadow-lg border border-gray-200 dark:border-gray-600 p-1"
                  >
                    <div className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                      {researchPapers[paperStack]}
                    </div>
                    <div className="mt-1 space-y-1">
                      <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-500 rounded" />
                      <div className="w-3/4 h-0.5 bg-gray-300 dark:bg-gray-500 rounded" />
                      <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-500 rounded" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Coffee Cup */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 translate-x-8"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-6 h-8 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-lg border-2 border-amber-600 relative">
                  <div className="absolute -right-1 top-2 w-2 h-3 border-2 border-amber-600 rounded-r-lg" />
                  <Coffee className="w-3 h-3 text-amber-800 absolute top-1 left-1.5" />
                </div>
              </motion.div>

              {/* Thought Bubble */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                animate={{
                  scale: isThinking ? [1, 1.1, 1] : [1, 0.95, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-3 shadow-lg border border-gray-200 dark:border-gray-600 relative max-w-xs">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentThought}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-gray-800 dark:text-gray-200 font-medium"
                    >
                      {thoughts[currentThought]}
                    </motion.p>
                  </AnimatePresence>
                  
                  {/* Thought bubble tail */}
                  <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white dark:bg-gray-700 border-r border-b border-gray-200 dark:border-gray-600 transform rotate-45" />
                </div>
              </motion.div>

              {/* Thinking Dots */}
              <div className="absolute top-4 right-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-blue-500 rounded-full inline-block mx-1"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Research Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Our researcher is deeply engrossed in finding the page you're looking for. 
              It seems to have wandered off into the vast library of knowledge. 
              Let's help you navigate back to familiar territory.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Return to Research Lab</span>
              </motion.button>
            </Link>

            <Link href="/publications">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Browse Publications</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Or continue your research journey:
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { href: '/team', label: 'Meet Our Researchers', icon: Brain },
                { href: '/demo', label: 'Interactive Demos', icon: Search },
                { href: '/contact', label: 'Collaborate With Us', icon: Coffee },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors group"
                >
                  <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Additional Floating Elements */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-10 right-10 w-16 h-16 text-blue-500 opacity-20"
      >
        <Brain className="w-full h-full" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 left-10 w-12 h-12 text-purple-500 opacity-30"
      >
        <Search className="w-full h-full" />
      </motion.div>
    </div>
  );
}