'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, Eye } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  image: string;
  views: number;
}

// Mock blog post data - in a real app, this would come from a CMS or database
const getBlogPost = (slug: string): BlogPost | null => {
  const posts: Record<string, BlogPost> = {
    '1': {
      id: '1',
      title: 'The Future of Neural Network Expressivity',
      content: `
# Introduction

Neural network expressivity has become a cornerstone of modern deep learning research. In this comprehensive analysis, we explore the theoretical foundations and practical implications of neural network expressivity.

## Mathematical Foundations

The expressivity of a neural network can be mathematically described using the following equation:

$$E(f) = \\sup_{x \\in X} |f(x) - f^*(x)|$$

Where $E(f)$ represents the expressivity measure, $f$ is our neural network function, and $f^*$ is the target function.

### Key Theorems

**Universal Approximation Theorem**: Any continuous function on a compact subset of $\\mathbb{R}^n$ can be uniformly approximated by a feedforward neural network with a single hidden layer.

## Code Implementation

Here's a Python implementation of a basic expressivity measure:

\`\`\`python
import torch
import torch.nn as nn
import numpy as np

class ExpressivityMeasure:
    def __init__(self, model, target_function):
        self.model = model
        self.target_function = target_function
    
    def compute_expressivity(self, x_samples):
        """
        Compute the expressivity measure for given samples
        """
        with torch.no_grad():
            model_outputs = self.model(x_samples)
            target_outputs = self.target_function(x_samples)
            
            # L-infinity norm (supremum)
            expressivity = torch.max(torch.abs(model_outputs - target_outputs))
            
        return expressivity.item()
    
    def analyze_layer_contributions(self):
        """
        Analyze how each layer contributes to expressivity
        """
        contributions = {}
        
        for name, layer in self.model.named_modules():
            if isinstance(layer, (nn.Linear, nn.Conv2d)):
                # Compute layer-specific metrics
                weight_norm = torch.norm(layer.weight)
                contributions[name] = {
                    'weight_norm': weight_norm.item(),
                    'parameters': sum(p.numel() for p in layer.parameters())
                }
        
        return contributions

# Example usage
model = nn.Sequential(
    nn.Linear(10, 64),
    nn.ReLU(),
    nn.Linear(64, 32),
    nn.ReLU(),
    nn.Linear(32, 1)
)

def target_function(x):
    return torch.sin(x.sum(dim=1, keepdim=True))

expressivity_analyzer = ExpressivityMeasure(model, target_function)
x_test = torch.randn(1000, 10)
expressivity_score = expressivity_analyzer.compute_expressivity(x_test)
print(f"Expressivity Score: {expressivity_score:.4f}")
\`\`\`

## Advanced Concepts

### Depth vs Width Trade-offs

Recent research has shown that the relationship between network depth and width significantly impacts expressivity:

\`\`\`javascript
// JavaScript implementation for visualization
function computeExpressivitySurface(depths, widths) {
    const surface = [];
    
    for (let d of depths) {
        const row = [];
        for (let w of widths) {
            // Theoretical expressivity bound
            const expressivity = Math.log(w) * Math.sqrt(d) / (w + d);
            row.push(expressivity);
        }
        surface.push(row);
    }
    
    return surface;
}

// Visualization parameters
const depths = Array.from({length: 20}, (_, i) => i + 1);
const widths = Array.from({length: 50}, (_, i) => (i + 1) * 10);
const expressivitySurface = computeExpressivitySurface(depths, widths);
\`\`\`

## Experimental Results

Our experiments demonstrate several key findings:

1. **Depth Scaling**: Expressivity scales logarithmically with depth
2. **Width Scaling**: Linear relationship with width up to a saturation point
3. **Activation Functions**: ReLU networks show different expressivity patterns compared to sigmoid networks

### Statistical Analysis

The following R code was used for statistical analysis:

\`\`\`r
# Load required libraries
library(ggplot2)
library(dplyr)

# Load experimental data
data <- read.csv("expressivity_experiments.csv")

# Perform ANOVA
model <- aov(expressivity ~ depth * width * activation, data = data)
summary(model)

# Create visualization
ggplot(data, aes(x = depth, y = expressivity, color = activation)) +
  geom_point() +
  geom_smooth(method = "loess") +
  facet_wrap(~width) +
  theme_minimal() +
  labs(title = "Neural Network Expressivity Analysis",
       x = "Network Depth",
       y = "Expressivity Measure")
\`\`\`

## Theoretical Implications

The implications of our findings extend beyond practical applications:

> "The expressivity of neural networks is not merely a function of their size, but rather emerges from the complex interplay between architecture, initialization, and optimization dynamics." - *Our Research Team*

### Future Directions

1. **Quantum Neural Networks**: Exploring expressivity in quantum computing contexts
2. **Sparse Networks**: Understanding how sparsity affects expressivity
3. **Dynamic Architectures**: Networks that adapt their structure during training

## Conclusion

Neural network expressivity remains a rich area of research with significant implications for both theoretical understanding and practical applications. Our analysis provides new insights into the fundamental limits and capabilities of deep learning systems.

The mathematical framework we've developed offers a principled approach to analyzing and comparing different architectures, while our experimental results provide empirical validation of theoretical predictions.

## References

1. Cybenko, G. (1989). Approximation by superpositions of a sigmoidal function.
2. Hornik, K. (1991). Approximation capabilities of multilayer feedforward networks.
3. Montufar, G. et al. (2014). On the number of linear regions of deep neural networks.
      `,
      excerpt: 'Exploring the theoretical foundations and practical implications of neural network expressivity in modern deep learning architectures.',
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      readTime: 8,
      tags: ['Deep Learning', 'Theory', 'Neural Networks'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 1247,
    }
  };
  
  return posts[slug] || null;
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogPost = getBlogPost(params.slug);
    setPost(blogPost);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Back to Blog
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 gradient-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 mb-6 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </motion.button>
            </Link>

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

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none
                          prose-headings:text-gray-800 dark:prose-headings:text-gray-200
                          prose-p:text-gray-600 dark:prose-p:text-gray-400
                          prose-strong:text-gray-800 dark:prose-strong:text-gray-200
                          prose-code:text-blue-600 dark:prose-code:text-blue-400
                          prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                          prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                          prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900
                          prose-pre:border dark:prose-pre:border-gray-700
                          prose-blockquote:border-l-blue-500
                          prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20
                          prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                          prose-a:text-blue-500 hover:prose-a:text-blue-600
                          prose-img:rounded-lg prose-img:shadow-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeRaw]}
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="relative">
                        <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                          {match[1]}
                        </div>
                        <pre className={className} {...props}>
                          <code>{children}</code>
                        </pre>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              Related Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Continue exploring our research insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Related posts would be loaded here */}
            <div className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              More related articles coming soon...
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}