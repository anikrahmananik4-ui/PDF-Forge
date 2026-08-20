import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Lock, Sparkles, FileCheck, BookOpen } from 'lucide-react';
import { PDF_TOOLS, TOOL_CATEGORIES } from '../data/toolsData';
import { PDFTool } from '../types/pdf';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { SEOHead } from '../components/SEOHead';
import { AdSlot } from '../components/AdSlot';

interface HomePageProps {
  onSelectTool: (tool: PDFTool) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTool, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const popularTools = PDF_TOOLS.filter((t) => t.popular);

  const displayedTools = selectedCategory === 'ALL'
    ? PDF_TOOLS
    : PDF_TOOLS.filter((t) => t.category === selectedCategory);

  const canonicalUrl = 'https://ais-dev-xjbfiikcx4utwuofvac2jx-107699198401.asia-southeast1.run.app/';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SRA PDF — Online Suite',
      url: canonicalUrl,
      description: 'Free online PDF management suite. Merge, split, compress, edit, convert, OCR, and sign PDF files securely with SRA PDF.',
      publisher: {
        '@type': 'Organization',
        name: 'SRA Digital Labs',
        founder: {
          '@type': 'Person',
          name: 'Sahadatur Rahman Anik'
        }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is SRA PDF free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! All standard PDF operations including merging, splitting, compressing, converting, and editing are 100% free with no account creation required.'
          }
        },
        {
          '@type': 'Question',
          name: 'Are my uploaded documents safe?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolute security is our top priority. All uploaded files are processed over TLS 256-bit encrypted channels and temporary files are automatically deleted after 1 hour.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the maximum file size limit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The free tier supports up to 50MB per file upload, which comfortably accommodates large e-books, scanned reports, and multi-page presentations.'
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="SRA PDF — Online Suite | Free PDF Merge, Split, Compress & Edit"
        description="Every PDF tool you need in one place. Merge, split, compress, convert PDF to Word/JPG, OCR, edit, and sign PDF files online for free with SRA PDF."
        canonicalUrl={canonicalUrl}
        jsonLd={jsonLd}
      />

      <div className="space-y-20 pb-20">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-blue-50/80 via-white to-white dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> 100% Free & Secure Online PDF Tools
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Every PDF Tool You Need. <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  In One Place.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Merge, split, compress, convert, edit, sign, and protect your PDF files online. Fast, secure, and easy to use on any device.
              </p>
            </div>

            {/* Quick Search */}
            <div className="pt-2">
              <SearchBar onSelectTool={onSelectTool} />
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('/tools')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-600/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                Explore All 33 Tools <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('/guides')}
                className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-base border border-slate-200 dark:border-slate-700 shadow-md transition-all flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-blue-600" /> Read How-To Guides
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 dark:text-slate-400 pt-6">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>TLS Encrypted Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant Speed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-500" />
                <span>Auto File Deletion</span>
              </div>
            </div>
          </div>
        </section>

        {/* POPULAR TOOLS GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Most Popular Tools
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Frequently used PDF utilities chosen by thousands of users daily
              </p>
            </div>
            <button
              onClick={() => onNavigate('/tools')}
              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All 33 Tools →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onClick={() => onSelectTool(tool)} />
            ))}
          </div>
        </section>

        {/* CATEGORIZED TOOL EXPLORER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Full PDF Utility Directory
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Browse our comprehensive suite by functional category
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Categories ({PDF_TOOLS.length})
            </button>
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onClick={() => onSelectTool(tool)} />
            ))}
          </div>

          <div className="pt-4">
            <AdSlot type="banner" />
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-slate-50 dark:bg-slate-800/40 py-16 border-y border-slate-200/80 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Why Professionals Choose SRA PDF
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Built with security, speed, and privacy at its absolute core
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">100% Privacy & Auto-Deletion</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Your document privacy is guaranteed. Temporary processing files are permanently deleted automatically after processing.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Blazing Fast Processing</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Utilizes high-performance client vector streams and Node processing engines for sub-second conversions.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Universal Compatibility</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Works flawlessly across Windows, macOS, Linux, iOS, and Android web browsers without installing any plugins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              How It Works in 3 Simple Steps
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No registration or complicated software installation required
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-sm relative">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-md shadow-blue-600/30">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select Your Tool & Upload</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Choose from 33 PDF tools and drag & drop your files into the upload area.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-sm relative">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-md shadow-blue-600/30">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Configure Options & Process</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Adjust settings like page ranges, compression level, or watermarks, then click process.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-sm relative">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-md shadow-blue-600/30">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Download Your Result</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Instantly download your output file or packaged ZIP archive with zero waiting times.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Have questions? Here are answers to common inquiries
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-2">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Is SRA PDF free to use?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Yes! All standard PDF operations including merging, splitting, compressing, converting, and editing are 100% free with no account creation required.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-2">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Are my uploaded documents safe?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Absolute security is our top priority. All uploaded files are processed over TLS 256-bit encrypted channels and temporary files are automatically deleted after 1 hour.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-2">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">What is the maximum file size limit?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                The free tier supports up to 50MB per file upload, which comfortably accommodates large e-books, scanned reports, and multi-page presentations.
              </p>
            </div>
          </div>
        </section>

        {/* BRAND FOOTER ATTRIBUTION */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center max-w-4xl mx-auto leading-relaxed">
          <strong>SRA PDF — Online Suite</strong> is developed by <strong>SRA Digital Labs</strong>, founded by <strong>Sahadatur Rahman Anik</strong>. Designed for fast, secure, browser-based document processing.
        </div>
      </div>
    </>
  );
};
