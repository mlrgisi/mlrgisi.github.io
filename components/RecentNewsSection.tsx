'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { getAllNewsItems, NewsItem } from '@/lib/news-data';

interface RecentNewsSectionProps {
  onBellClick: () => void;
}

export function RecentNewsSection({ onBellClick }: RecentNewsSectionProps) {
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const allNews = getAllNewsItems();
    const now = new Date();
    const fifteenDaysAgo = new Date(now.getTime() - (15 * 24 * 60 * 60 * 1000));

    // Filter news from the last 15 days
    const recent = allNews.filter(item => {
      const newsDate = new Date(item.date);
      return newsDate >= fifteenDaysAgo;
    });

    setRecentNews(recent);
    setIsVisible(recent.length > 0);
  }, []);

  if (!isVisible || recentNews.length === 0) {
    return null;
  }

  const getTypeColor = (type: NewsItem['type']) => {
    switch (type) {
      case 'publication': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'award': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'event': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'announcement': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const latestNews = recentNews[0];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Bell className="w-6 h-6 text-blue-500" />
            <h2 className="text-4xl font-bold text-gradient">
              Recent News
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Catch up on the latest highlights from the last 30 days.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Featured Latest News */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="research-card p-8 rounded-2xl mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {latestNews.images && latestNews.images.length > 0 && (
                <div className="lg:w-1/3">
                  <img
                    src={latestNews.images[0].url}
                    alt={latestNews.images[0].caption}
                    className="w-full h-48 lg:h-full object-cover rounded-lg"
                  />
                </div>
              )}

              <div className={latestNews.images && latestNews.images.length > 0 ? 'lg:w-2/3' : 'w-full'}>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(latestNews.type)}`}>
                    {latestNews.type}
                  </span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(latestNews.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                  {latestNews.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {latestNews.content}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  

                  <Link href={`/news/${latestNews.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Read Full Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Other Recent News */}
          {/* {recentNews.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentNews.slice(1, 3).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="research-card p-6 rounded-2xl"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {item.content}
                  </p>

                  <Link href={`/news`}>
                    <button className="flex items-center text-sm text-blue-500 hover:text-blue-600 transition-colors">
                      <span>Read more</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>
          )} */}

          {/* View All News Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-8"
          >
            <div className="flex flex-col lg:flex-row gap-6"></div>
            {/* <Link href="/news"> */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBellClick}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Bell className="w-4 h-4" />
                <span>View All Recent News</span>
              </motion.button>
            {/* </Link> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}