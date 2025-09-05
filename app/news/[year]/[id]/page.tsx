import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';
import { Components } from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Calendar, ArrowLeft, Share2, Bookmark, Tag, Clock, CalendarClock } from 'lucide-react';
import Link from 'next/link';
import { ImageCarousel } from '@/components/ImageCarousel';
import { NewsItem } from '@/lib/news-data';

const newsDirectory = path.join(process.cwd(), "news");

// Required for static export
export async function generateStaticParams() {
  const years = fs.readdirSync(newsDirectory);
  const paths: { year: string; id: string }[] = [];

  years.forEach((year) => {
    const yearDir = path.join(newsDirectory, year);
    const files = fs.readdirSync(yearDir);

    files.forEach((file) => {
      if (file.endsWith(".md")) {
        const id = path.basename(file, ".md");
        paths.push({ year, id });
      }
    });
  });

  return paths;
}

// ✅ Make this async and await params
export default async function NewsPage(props: {
  params: Promise<{ year: string; id: string }>;
}) {
  const { year, id } = await props.params;


  try {
    const filePath = path.join(newsDirectory, year, `${id}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const getTypeColor = (type: any) => {
    switch (type) {
      case 'publication': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'award': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'event': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'announcement': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      }
    };

    return (

    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 gradient-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/news">
              <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 mb-6 font-medium">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to News Home</span>
              </button>
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(data.type)}`}>
                {data.type}
              </span>
              
              {data.tags && data.tags.map((tag: any) => (
                <span
                  key={tag}
                  className="research-tag px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200 leading-tight">
              {data.title}
            </h1>

            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(data.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarClock className="w-4 h-4" />
                  <span>Uploaded: {new Date(data.date).toLocaleDateString('en-US', {
                    year: '2-digit',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> 

      {/* Featured Image */}
      {data.images && data.images.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <ImageCarousel images={data.images} />
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container mx-auto px-6">
          <article className="max-w-4xl mx-auto">
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
                //   code: ({ node, inline, className, children, ...props }) => {
                   code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    // return !inline && match ? (
                    return match ? (
                      <div className="relative">
                        <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                          {match[1]}
                        </div>
                        {/* <pre className={className} {...props}> */}
                          <code>{children}</code>
                        {/* </pre> */}
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              More News
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay updated with our latest announcements
            </p>
          </div>

          <div className="text-center">
            <Link href="/news">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                View All News
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="p-4 text-red-600">
        Could not load news {id} for {year}.
      </div>
    );

  }
}
