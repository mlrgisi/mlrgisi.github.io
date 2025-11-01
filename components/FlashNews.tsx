'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface ImportantMessageModalProps {
  title?: string;
  message?: string;
  closeButtonText?: string;
  storageKey?: string;
}

{/* We're excited to share some important updates:

## New Research Publication
Our latest paper on **Neural Network Expressivity** has been accepted at **ICML 2024**! 

The expressivity bound can be mathematically expressed as:

$$E(f) = \\sup_{x \\in X} |f(x) - f^*(x)| \\leq C \\cdot \\log(W) \\cdot \\sqrt{D}$$

Where:
- $E(f)$ represents the expressivity measure
- $W$ is the network width  
- $D$ is the network depth
- $C$ is a universal constant
*/}


export function ImportantMessageModal({
  title = "Important Announcement",
  message = `# WSDL 2026 is Live! 🎉

Mark Your Calendars! [WSDL 2026](https://web.isical.ac.in/~wsdl) | Jan 16 – Mar 8, 2026

Registration will begin soon.

---

*This message will only appear once. Thank you for visiting our lab!*`,
  closeButtonText = "Visit!",
  storageKey = "important-message-shown"
}: ImportantMessageModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the message has been shown before
    const hasBeenShown = sessionStorage.getItem(storageKey);
    
    if (!hasBeenShown) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const handleClose = () => {
    setIsVisible(false);
    // Mark as shown in sessionStorage
    sessionStorage.setItem(storageKey, 'true');
  };
  
  const visit = () => {
    setIsVisible(false);
    // Mark as shown in sessionStorage
    sessionStorage.setItem(storageKey, 'true');
    // window.open('https://sites.google.com/view/wsdl2026', '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50 w-full max-w-2xl  mx-auto"
          >
            <div className="glassomorphism-modal rounded-3xl p-8 max-h-[80vh] overflow-y-auto shadow-2xl border border-white/20 dark:border-gray-700/30">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-blue-500/20 dark:bg-blue-400/20">
                    <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {title}
                  </h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8
                            prose-headings:text-gray-800 dark:prose-headings:text-gray-100
                            prose-p:text-gray-700 dark:prose-p:text-gray-300
                            prose-strong:text-gray-800 dark:prose-strong:text-gray-200
                            prose-code:text-blue-600 dark:prose-code:text-blue-400
                            prose-code:bg-blue-50 dark:prose-code:bg-blue-900/30
                            prose-code:px-2 prose-code:py-1 prose-code:rounded
                            prose-a:text-blue-600 dark:prose-a:text-blue-400
                            prose-blockquote:border-l-blue-500
                            prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/20
                            prose-blockquote:backdrop-blur-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-4 text-gradient">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>
                    ),
                    hr: () => (
                      <hr className="my-6 border-gray-300/50 dark:border-gray-600/50" />
                    ),
                  }}
                >
                  {message}
                </ReactMarkdown>
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={visit}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {closeButtonText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
