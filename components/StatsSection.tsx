'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Calendar, School2 } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10+',
    label: 'Research Scholars',
    color: 'text-blue-500',
  },
  {
    icon: BookOpen,
    value: '50+',
    label: 'Publications',
    color: 'text-purple-500',
  },
  {
    icon: Calendar,
    value: '12',
    label: 'Years Active',
    color: 'text-orange-500',
  },
  {
    icon: School2,
    value: '11+',
    label: 'Grad Students',
    color: 'text-green-500',
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Research Impact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Numbers that reflect our commitment to advancing machine learning research
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="glass-effect p-8 rounded-2xl hover-lift">
                <div className={`inline-flex p-4 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-200"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}