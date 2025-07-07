'use client';

import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Award, BookOpen, Users } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    type: 'publication',
    title: 'New Paper Accepted at EAAI 2025',
    date: '2025-06-10',
    content: 'Our groundbreaking research on transformer architectures for scientific computing has been accepted.',
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    id: 2,
    type: 'project',
    title: 'India AI',
    date: '2025-03-10',
    content: 'Mr. Shivam Jhangid (MTech) has been received fellowship from India AI Mission under the supervision of Prof. Das.',
    icon: Award,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    id: 3,
    type: 'team',
    title: 'New Research Members Join',
    date: '2024-01-05',
    content: 'We welcome three talented PhD students to our research group this semester.',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
];

export function NewsCard() {
  return (
    <div className="space-y-4">
      {newsItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="glass-effect p-4 rounded-lg hover-lift group cursor-pointer"
        >
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${item.bgColor} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">
                  {item.title}
                </h4>
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {item.content}
              </p>
              
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(item.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}