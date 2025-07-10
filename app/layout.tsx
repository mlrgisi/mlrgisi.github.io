import './globals.css';

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LastUpdatedProvider } from '@/components/LastUpdatedContext';
import { PageInfoTray } from '@/components/PageInfoTray';
import { ImportantMessageModal } from '@/components/FlashNews';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Machine Learning Research Group | MLRG | ISI',
  description: 'Cutting-edge research in Machine Learning, Deep Learning Models, Expressivity, and High-dimensional Statistics',
  keywords: 'machine learning, deep learning, AI research, neural networks, statistics, ISI, Indian Statistical Institute, Swagatam Das',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LastUpdatedProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <PageInfoTray />
              {/* <ImportantMessageModal /> */}
            </div>
          </LastUpdatedProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
