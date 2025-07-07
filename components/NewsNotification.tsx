'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  type: 'publication' | 'award' | 'event' | 'announcement';
  content: string;
  link?: string;
}

const newsItems: NewsItem[] = [
  {
    id: '5',
    title: 'Pre-PhD Seminars',
    date: '2025-06-20',
    type: 'announcement',
    content: 'We congratulate our SRFs Mr. Anish, Mr. Faizan, and Mr. Kushal for presenting their thoughtful works in the Pre-PhD Seminars.',
  },
  {
    id: '4',
    title: 'Recent Publications',
    date: '2025-06-10',
    type: 'publication',
    content: 'Works led by Anish, Faizanuddin, and Kushal have been published in StatComp, EAAI, and TNNLS  respectively.',
  },
  {
    id: '3',
    title: 'Mrs Susmita Ghosh has sucessfully defended her PhD thesis',
    date: '2025-05-16',
    type: 'award',
    content: 'We are congratulate Mrs Susmita Ghosh on the successful defence of her doctoral research.'
  },
  {
    id: '2',
    type: 'announcement',
    title: 'New Research Members Join',
    date: '2025-06-15',
    content: 'We welcome two talented PhD students to our research group this semester.',
  },
  {
    id: '1',
    type: 'announcement',
    title: 'India AI',
    date: '2025-03-10',
    content: 'Mr. Shivam Jhangid (MTech) has received fellowship from India AI Mission under the supervision of Prof. Das.',
  }
];

interface NewsNotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsNotification({ isOpen, onClose }: NewsNotificationProps) {
  const getTypeColor = (type: NewsItem['type']) => {
    switch (type) {
      case 'publication': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'award': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'event': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'announcement': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* News Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] z-50"
          >
            <div className="citation-popup rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Latest News
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {newsItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {item.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {item.content}
                    </p>

                    {item.link && (
                      <motion.a
                      href={item.link}
                      target='_blank'
                      >
                      <button className="flex items-center text-sm text-blue-500 hover:text-blue-600 transition-colors">
                        <span>Read more</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </button>
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
