'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Upload, X, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export default function WriteBlogPage() {
  const [post, setPost] = useState<BlogPost>({
    title: '',
    excerpt: '',
    content: `# Your Blog Post Title

## Introduction

Start writing your blog post here. You can use **Markdown** syntax for formatting.

### Code Examples

You can include code snippets in various languages:

\`\`\`python
def hello_world():
    print("Hello, World!")
    return "Welcome to our research blog!"

# Example usage
message = hello_world()
\`\`\`

\`\`\`javascript
function calculateExpressivity(depth, width) {
    return Math.log(width) * Math.sqrt(depth) / (width + depth);
}

console.log(calculateExpressivity(10, 100));
\`\`\`

### Mathematical Equations

You can include LaTeX equations:

Inline math: $E = mc^2$

Block equations:
$$\\frac{\\partial L}{\\partial w} = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i) x_i$$

Complex equations:
$$\\mathcal{L}(\\theta) = -\\frac{1}{N} \\sum_{i=1}^{N} \\left[ y_i \\log(\\sigma(f_\\theta(x_i))) + (1-y_i) \\log(1-\\sigma(f_\\theta(x_i))) \\right]$$

### Tables

| Model | Accuracy | Parameters |
|-------|----------|------------|
| ResNet-50 | 76.2% | 25.6M |
| Transformer | 84.1% | 110M |
| Our Model | 87.3% | 45M |

### Lists

1. First research finding
2. Second important result
3. Future work directions

- Bullet point one
- Bullet point two
- Bullet point three

### Blockquotes

> "The best way to predict the future is to invent it." - Alan Kay

### Images

You can add images using standard markdown syntax:
![Research Lab](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800)

Happy writing! 🚀
`,
    author: '',
    tags: [],
    image: '',
    featured: false,
  });

  const [newTag, setNewTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    // In a real application, this would save to a database or CMS
    console.log('Saving blog post:', post);
    alert('Blog post saved successfully!');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Write New Blog Post
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Create engaging content with code snippets and mathematical equations
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{previewMode ? 'Edit' : 'Preview'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Post</span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Editor */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2">
              <div className="research-card p-6 rounded-2xl">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl font-semibold"
                    placeholder="Enter your blog post title..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={post.excerpt}
                    onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Brief description of your blog post..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <div data-color-mode="auto">
                    <MDEditor
                      value={post.content}
                      onChange={(value) => setPost(prev => ({ ...prev, content: value || '' }))}
                      preview={previewMode ? 'preview' : 'edit'}
                      height={600}
                      data-color-mode="auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Settings */}
              <div className="research-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Post Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={post.author}
                      onChange={(e) => setPost(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Author name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      value={post.image}
                      onChange={(e) => setPost(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={post.featured}
                      onChange={(e) => setPost(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Featured Post
                    </label>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="research-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Tags
                </h3>
                
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add tag"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className="research-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Writing Help
                </h3>
                
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <strong>Code Blocks:</strong>
                    <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      ```python<br />
                      your_code_here<br />
                      ```
                    </code>
                  </div>
                  
                  <div>
                    <strong>Math Equations:</strong>
                    <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      $inline$ or $$block$$
                    </code>
                  </div>
                  
                  <div>
                    <strong>Supported Languages:</strong>
                    <p className="mt-1">Python, JavaScript, R, MATLAB, C++, Java, and more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}