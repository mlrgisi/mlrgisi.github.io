'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, AlertTriangle, X } from 'lucide-react';

interface ExternalLinkWrapperProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function ExternalLinkWrapper({ 
  href, 
  children, 
  className = '', 
  target = '_blank',
  rel = 'noopener noreferrer',
  ...props 
}: ExternalLinkWrapperProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Define trusted domains that should not show the alert
  const trustedDomains = [
    'doi.org',
    'scholar.google.com',
    'github.io',
    'isical.ac.in', // Your university domain
    'isical.ac.in', // Your lab domain
  ];

  // Check if the link is external and not in trusted domains
  const isExternalLink = (url: string) => {
    try {
      const link = new URL(url, window.location.origin);
      const currentDomain = window.location.hostname;
      
      // If it's the same domain, it's internal
      if (link.hostname === currentDomain) {
        return false;
      }
      
      // Check if it's in trusted domains
      const isTrusted = trustedDomains.some(domain => 
        link.hostname === domain || link.hostname.endsWith('.' + domain) || link.protocol === "mailto:" ||  link.protocol === "tel:"

      );
      
      return !isTrusted;
    } catch {
      return false;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isExternalLink(href)) {
      e.preventDefault();
      setShowAlert(true);
      setCountdown(4);
    }
    // If it's internal or trusted, let the default behavior happen
  };

  const handleContinue = () => {
    setIsRedirecting(true);
    window.open(href, target, rel);
    setShowAlert(false);
    setIsRedirecting(false);
  };

  const handleCancel = () => {
    setShowAlert(false);
    setCountdown(4);
  };

  // Countdown effect
  useEffect(() => {
    if (showAlert && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showAlert && countdown === 0) {
      handleContinue();
    }
  }, [showAlert, countdown]);

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        className={className}
        target={isExternalLink(href) ? undefined : target}
        rel={isExternalLink(href) ? undefined : rel}
        {...props}
      >
        {children}
      </a>

      {/* External Link Alert Modal */}
      <AnimatePresence>
        {showAlert && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={handleCancel}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center p-4 z-50 w-full max-w-md mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
                      <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        External Link Warning
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        You're leaving our lab website
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancel}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    You are about to visit an external website not owned by our research lab:
                  </p>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg break-all">
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm font-mono text-gray-800 dark:text-gray-200">
                        {href}
                      </span>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {countdown}
                        </span>
                      </div>
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        {countdown > 0 ? `Redirecting in ${countdown} second${countdown !== 1 ? 's' : ''}...` : 'Redirecting...'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                    disabled={isRedirecting}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center space-x-2"
                    disabled={isRedirecting}
                  >
                    <span>Continue</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}