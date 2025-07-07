'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Users, Calendar, Award} from 'lucide-react';
import { ConferenceBanner } from './ConferenceBanner';

interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  booktitle: string;
  year: number;
  jctype: 'journal' | 'conference';
  abstract?: string;
  keywords: string[];
  doi?: string;
  url?: string;
  featured?: boolean;
}


const featuredPapers = [
  {
    title: 'Information preservation with wasserstein autoencoders: generation consistency and adversarial robustness',
    authors: ['Anish Chakrabarty', 'Arkaprabha Basu', 'Swagatam Das'],
    journal: 'Statistics and Computing (StatComp)',
    year: 2025,
    abstract: 'Amongst the numerous variants Variational Autoencoder (VAE) has inspired, the Wasserstein Autoencoder (WAE) stands out due to its heightened generative quality and intriguing theoretical properties. ...',
    keywords: ['Deep generative models', 'Wasserstein autoencoder', 'Maximum Mean Discrepancy', 'Minimum distance estimation', 'Robustness'],
    featured: true,
  },
  {
    title: 'Algorithmic Fairness in Lesion Classification by Mitigating Class Imbalance and Skin Tone Bias',
    authors: ['Faizanuddin Ansari', 'Tapabrata Chakraborti', 'Swagatam Das'],
    journal: 'The Medical Image Computing and Computer Assisted Intervention Society (MICCAI)',
    year: 2024,
    abstract: 'Deep learning models have  shown considerable promise in the classification of skin lesions. However, a notable challenge arises from their  inherent bias towards dominant skin tones and the issue ...',
    keywords: ['Algorithmic Fairness', 'Imbalance', 'Skin Tone'],
    featured: true,
  },
  {
    title: 'Enhancing Contrastive Clustering with Negative Pair-guided Regularization',
    authors: ['Abhishek Kumar', 'Anish Chakrabarty', 'Sankha Subhra Mullick', 'Swagatam Das'],
    journal: 'Transaction of Machine Learning Research (TMLR)',
    year: 2024,
    abstract: 'Contrastive Learning (CL) aims to create effective embeddings for input data by minimizing the distance between positive pairs, i.e., different augmentatiobs orviews of the same sample. To avoid ...',
    keywords: ['Contrastive Learning', 'Clustering', 'Regularization'],
    featured: true,
  },
];

export function FeaturedPublications() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold mb-6 text-gradient">
            Featured Publications
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Highlighting our prominent Works at some pretigious venues
          </p>
        </motion.div>

        {/* Conference Banner */}
        <div className='mb-12'>
          <ConferenceBanner />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {featuredPapers.map((paper, index) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="research-card p-6 rounded-2xl group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    Featured
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </motion.button>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-colors">
                {paper.title}
              </h3>

              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{paper.authors.length} authors</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{paper.year}</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {paper.abstract}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {paper.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="research-tag px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {paper.journal}
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/publications">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              View All Publications
            </motion.button>
          </Link>
        </motion.div> */}
      </div>
    </section>
  );
}
