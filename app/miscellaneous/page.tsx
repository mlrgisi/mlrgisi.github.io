'use client';

import { motion } from 'framer-motion';
import { Download, Image, Code, Database, FileText, ExternalLink, Calendar, Users } from 'lucide-react';

interface SoftwareItem {
  id: string;
  name: string;
  description: string;
  version: string;
  downloads: number;
  language: string;
  license: string;
  downloadUrl: string;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'conference' | 'lab' | 'event' | 'award';
  date: string;
}

const softwareItems: SoftwareItem[] = [
  {
    id: '1',
    name: 'DeepExpressivity',
    description: 'A Python library for analyzing neural network expressivity and theoretical bounds.',
    version: '2.1.0',
    downloads: 1250,
    language: 'Python',
    license: 'MIT',
    downloadUrl: '#',
  },
  {
    id: '2',
    name: 'HighDimStats',
    description: 'Statistical tools for high-dimensional data analysis and sparse regularization.',
    version: '1.8.3',
    downloads: 890,
    language: 'R/Python',
    license: 'Apache 2.0',
    downloadUrl: '#',
  },
  {
    id: '3',
    name: 'TransformerSci',
    description: 'Transformer architectures optimized for scientific computing applications.',
    version: '0.9.2',
    downloads: 567,
    language: 'PyTorch',
    license: 'BSD-3',
    downloadUrl: '#',
  },
];

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'ICML 2024 Conference',
    description: 'Our team presenting at the International Conference on Machine Learning',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'conference',
    date: '2024-07-21',
  },
  {
    id: '2',
    title: 'Lab Research Meeting',
    description: 'Weekly research discussion and collaboration session',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'lab',
    date: '2024-01-15',
  },
  {
    id: '3',
    title: 'Best Paper Award',
    description: 'Dr. Sarah Chen receiving the Best Paper Award at NeurIPS 2023',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'award',
    date: '2023-12-10',
  },
  {
    id: '4',
    title: 'AI Workshop 2023',
    description: 'Hosting the annual AI and Machine Learning Workshop',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'event',
    date: '2023-11-15',
  },
  {
    id: '5',
    title: 'Research Collaboration',
    description: 'International collaboration meeting with partner institutions',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'lab',
    date: '2023-10-20',
  },
  {
    id: '6',
    title: 'Graduate Student Symposium',
    description: 'Annual symposium showcasing graduate student research',
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'event',
    date: '2023-09-12',
  },
];

export default function MiscellaneousPage() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'conference': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'lab': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'event': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'award': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Resources & Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300  leading-relaxed">
              Explore our software tools, research resources, and visual highlights from our lab activities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Software Downloads */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Software & Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Open-source software and research tools developed by our team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="research-card p-6 rounded-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Code className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    v{item.version}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                  {item.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Language:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{item.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">License:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{item.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Downloads:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{item.downloads.toLocaleString()}</span>
                  </div>
                </div>

                <motion.a
                  href={item.downloadUrl}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Lab Gallery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Visual highlights from our research activities, conferences, and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="research-card rounded-2xl overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Additional Resources
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Datasets, documentation, and other research materials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Database,
                title: 'Research Datasets',
                description: 'Curated datasets used in our research',
                count: '15+ datasets',
                color: 'text-blue-500',
                bgColor: 'bg-blue-100 dark:bg-blue-900/30',
              },
              {
                icon: FileText,
                title: 'Technical Reports',
                description: 'Detailed technical documentation',
                count: '25+ reports',
                color: 'text-green-500',
                bgColor: 'bg-green-100 dark:bg-green-900/30',
              },
              {
                icon: Users,
                title: 'Collaboration',
                description: 'Partner institutions and projects',
                count: '10+ partners',
                color: 'text-purple-500',
                bgColor: 'bg-purple-100 dark:bg-purple-900/30',
              },
              {
                icon: Calendar,
                title: 'Events',
                description: 'Workshops and seminars',
                count: '20+ events',
                color: 'text-orange-500',
                bgColor: 'bg-orange-100 dark:bg-orange-900/30',
              },
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="research-card p-6 rounded-2xl text-center hover-lift"
              >
                <div className={`w-16 h-16 ${resource.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <resource.icon className={`w-8 h-8 ${resource.color}`} />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {resource.description}
                </p>
                
                <span className="text-sm font-medium text-blue-500">
                  {resource.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}