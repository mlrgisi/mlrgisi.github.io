'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CalendarClock, Tag, Clock, ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLastUpdated } from '@/components/LastUpdatedContext';
import { getAllNewsItems, NewsItem } from '@/lib/news-data';
import { ImageCarousel } from '@/components/ImageCarousel';

export default function NewsPage() {
  const { setLastUpdated } = useLastUpdated();
  const allNews = getAllNewsItems();

  useEffect(() => {
    setLastUpdated('2026-02-09');
  }, [setLastUpdated]);

  // Group news by year
  const newsByYear = useMemo(() => {
    const grouped = allNews.reduce((acc, item) => {
      const year = new Date(item.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {} as Record<number, NewsItem[]>);

    // Sort years in descending order
    const sortedYears = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => b - a);

    return sortedYears.map(year => ({
      year,
      items: grouped[year].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }));
  }, [allNews]);

  const getTypeColor = (type: NewsItem['type']) => {
    switch (type) {
      case 'publication': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'award': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'event': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'announcement': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const NewsCard = ({ item }: { item: NewsItem }) => (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="research-card rounded-2xl overflow-hidden group"
    >
      {/* Image Carousel */}
      {item.images && item.images.length > 0 && (
        <div className="relative h-64">
          <ImageCarousel images={item.images} />
        </div>
      )}

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
            {item.type}
          </span>
          
          {item.tags && item.tags.map((tag) => (
            <span
              key={tag}
              className="research-tag px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link href={`/news/${new Date(item.uploadDate).getFullYear()}/${item.id}`}>
          <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-colors">
            {item.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {item.content}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarClock className="w-4 h-4" />
              <span>{new Date(item.uploadDate).toLocaleDateString('en-US', {
                year: '2-digit',
                month: 'short',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>

        <Link href={`/news/${new Date(item.uploadDate).getFullYear()}/${item.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            <span>Read Full Story</span>
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
              News & Updates
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Stay updated with the latest news, achievements, and announcements from our research lab
            </p>
          </motion.div>
        </div>
      </section>

      {/* News by Year */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {newsByYear.map(({ year, items }, yearIndex) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: yearIndex * 0.1 }}
              className="mb-16"
            >
              {/* Year Header */}
              <div className="flex items-center mb-8">
                <div className="flex items-center space-x-4">
                  <h2 className="text-4xl font-bold text-gradient">
                    {year}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                  {items.length} {items.length === 1 ? 'update' : 'updates'}
                </span>
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Archive Notice */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              Looking for Older News?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Our complete news archive contains all announcements, achievements, and updates from our research lab since its inception.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
            >
              <span>View Archive</span>
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
