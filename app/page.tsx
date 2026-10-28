'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { ResearchAreas } from '@/components/ResearchAreas';
import { RecentNewsSection } from '@/components/RecentNewsSection';
import { NewsCard } from '@/components/NewsCard';
import { StatsSection } from '@/components/StatsSection';
import { FeaturedPublications } from '@/components/FeaturedPublications';
import { useLastUpdated } from '@/components/LastUpdatedContext';
import { NewsNotification } from '@/components/NewsNotification';
import { ImportantMessageModal } from '@/components/FlashNews';
import Link from 'next/link';

export default function Home() {
  const { setLastUpdated } = useLastUpdated();
  const [showNews, setShowNews] = useState(false);
  
  const handleBellClick = () => {
    setShowNews(true);
  };
  useEffect(() => {
    setLastUpdated('2025-09-01');
  }, [setLastUpdated]);

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="fixed inset-0 neural-network-bg opacity-30 pointer-events-none" />

      <ImportantMessageModal />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Research Areas */}
      <ResearchAreas />
      
      {/* Stats Section */}
      <StatsSection />

      {/* Recent News Section */}
      <RecentNewsSection onBellClick={handleBellClick} />
      
      {/* Featured Publications */}
      <FeaturedPublications />

      
      {/* Call to Action */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-gradient">
              Join Our Research Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Explore cutting-edge research, collaborate with brilliant minds, and push the boundaries of machine learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/publications">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  View Publications <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/team">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                >
                  Meet Our Team
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

       {/* News Notification */}
      <NewsNotification isOpen={showNews} onClose={() => setShowNews(false)} />
    </div>
  );
}
