'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Tag, Plus, Edit } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Neural Network Expressivity',
    excerpt: 'Exploring the theoretical foundations and practical implications of neural network expressivity in modern deep learning architectures.',
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    readTime: 8,
    tags: ['Deep Learning', 'Theory', 'Neural Networks'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
  {
    id: '2',
    title: 'High-Dimensional Statistics in Practice',
    excerpt: 'Real-world applications of high-dimensional statistical methods in genomics, finance, and machine learning.',
    author: 'Prof. Michael Rodriguez',
    date: '2024-01-10',
    readTime: 12,
    tags: ['Statistics', 'Applications', 'High-Dimensional'],
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Transformer Models: Beyond Natural Language',
    excerpt: 'How transformer architectures are revolutionizing scientific computing and numerical simulations.',
    author: 'Dr. Alex Kumar',
    date: '2024-01-05',
    readTime: 10,
    tags: ['Transformers', 'Scientific Computing', 'Innovation'],
    image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    title: 'Optimization Landscapes in Deep Learning',
    excerpt: 'Understanding the complex optimization landscapes that emerge in deep neural networks and their implications.',
    author: 'Emily Watson',
    date: '2023-12-28',
    readTime: 15,
    tags: ['Optimization', 'Deep Learning', 'Theory'],
    image: 'https://images.pexels.com/photos/8386427/pexels-photo-8386427.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`research-card rounded-2xl overflow-hidden group ${featured ? 'lg:col-span-2' : ''}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            featured ? 'h-64' : 'h-48'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="research-tag px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className={`font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-colors ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          {post.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>

        <Link href={`/blog/${post.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            <span>Read More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </motion.article>
  );

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
              Research Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Insights, discoveries, and thoughts from our research team on the latest developments in machine learning and AI
            </p>
            
            <Link href="/blog/write">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Edit className="w-5 h-5" />
                <span>Write New Post</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-gradient text-center">
                Featured Article
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
                Our latest insights and breakthrough research
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <BlogCard post={featuredPost} featured />
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Stay updated with our ongoing research and discoveries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 text-gradient">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Subscribe to our newsletter for the latest research insights and updates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}