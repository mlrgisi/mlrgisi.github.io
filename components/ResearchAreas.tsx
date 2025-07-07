'use client';

import { motion } from 'framer-motion';
import { Brain, Network, BarChart3, Cpu, Database, Zap } from 'lucide-react';

const researchAreas = [
  {
    icon: Brain,
    title: 'General Machine Learning',
    description: 'Clustering Algorithms, Optimization Techniques, and theoretical foundations of machine learning systems.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Network,
    title: 'Deep Learning Models',
    description: 'GAN, VAE, Transformers, and Topological Deep Learning Models.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Database,
    title: 'High-dimensional Statistics',
    description: 'Statistical methods for high-dimensional data analysis, Causal Inference and Optimal Transport.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    icon: BarChart3,
    title: 'Model Expressivity',
    description: 'Understanding the representational capacity and theoretical limits of neural networks.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  // {
  //   icon: Cpu,
  //   title: 'Computational Methods',
  //   description: 'Efficient algorithms, parallel computing, and scalable machine learning implementations.',
  //   color: 'from-indigo-500 to-blue-500',
  //   bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
  // },
  {
    icon: Zap,
    title: 'AI Applications',
    description: 'Real-world applications of AI in various domains including Healthcare.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
];

export function ResearchAreas() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Research Areas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our interdisciplinary research spans multiple domains of deep learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="research-card p-8 rounded-2xl hover-lift group"
            >
              <div className={`w-16 h-16 rounded-2xl ${area.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`w-8 h-8 bg-gradient-to-r ${area.color} rounded-lg flex items-center justify-center`}>
                  <area.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                {area.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {area.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className={`h-1 bg-gradient-to-r ${area.color} rounded-full mt-6`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}