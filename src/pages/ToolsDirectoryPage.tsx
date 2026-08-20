import React, { useState } from 'react';
import { PDF_TOOLS, TOOL_CATEGORIES } from '../data/toolsData';
import { PDFTool, ToolCategory } from '../types/pdf';
import { ToolCard } from '../components/ToolCard';
import { Search, Grid, LayoutGrid, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface ToolsDirectoryPageProps {
  onSelectTool: (tool: PDFTool) => void;
}

export const ToolsDirectoryPage: React.FC<ToolsDirectoryPageProps> = ({ onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const canonicalUrl = 'https://ais-dev-xjbfiikcx4utwuofvac2jx-107699198401.asia-southeast1.run.app/tools';

  const filteredTools = PDF_TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'ALL' || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tool.keywords && tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Online PDF Tools — SRA PDF',
    description: 'Browse the full collection of free online PDF tools. Merge, split, compress, edit, convert, OCR, and sign PDF files securely.',
    url: canonicalUrl,
    hasPart: PDF_TOOLS.map((tool) => ({
      '@type': 'WebPage',
      name: tool.title,
      url: `https://ais-dev-xjbfiikcx4utwuofvac2jx-107699198401.asia-southeast1.run.app${tool.path}`
    }))
  };

  return (
    <>
      <SEOHead
        title="All PDF Tools — Complete Online PDF Suite | SRA PDF"
        description="Browse all 25+ free online PDF tools. Merge, split, compress, edit, convert to Word/Excel/JPG, OCR, and sign PDFs securely with SRA PDF."
        canonicalUrl={canonicalUrl}
        jsonLd={jsonLd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <LayoutGrid className="w-3.5 h-3.5" /> Full Utility Index
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            All PDF Tools Directory
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Every tool you need to merge, split, compress, edit, convert, and secure your PDF documents in one organized suite.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PDF tools (e.g. merge, compress, word, ocr)..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-slate-900 dark:text-white"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              All Tools ({PDF_TOOLS.length})
            </button>
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ToolCategory)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onClick={() => onSelectTool(tool)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-3 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-md mx-auto">
            <Filter className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No tools found</h3>
            <p className="text-xs text-slate-500">Try searching for another term like "compress" or "word".</p>
          </div>
        )}

        {/* Footer Brand Attribution */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center max-w-4xl mx-auto leading-relaxed">
          <strong>SRA PDF</strong> is developed by <strong>SRA Digital Labs</strong>, founded by <strong>Sahadatur Rahman Anik</strong>. All PDF processing operations take place in isolated temporary memory with automatic 1-hour cleanup.
        </div>
      </div>
    </>
  );
};
