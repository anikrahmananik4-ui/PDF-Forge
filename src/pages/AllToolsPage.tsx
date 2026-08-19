import React, { useState } from 'react';
import { PDF_TOOLS, TOOL_CATEGORIES } from '../data/toolsData';
import { PDFTool } from '../types/pdf';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';

interface AllToolsPageProps {
  onSelectTool: (tool: PDFTool) => void;
}

export const AllToolsPage: React.FC<AllToolsPageProps> = ({ onSelectTool }) => {
  const [selectedCat, setSelectedCat] = useState<string>('ALL');

  const filteredTools = selectedCat === 'ALL'
    ? PDF_TOOLS
    : PDF_TOOLS.filter((t) => t.category === selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          All Online PDF Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Everything you need to convert, compress, edit, organize, sign, and secure your PDF documents in one powerful online workspace.
        </p>

        <div className="pt-2">
          <SearchBar onSelectTool={onSelectTool} />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <button
          onClick={() => setSelectedCat('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            selectedCat === 'ALL'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          All Tools ({PDF_TOOLS.length})
        </button>
        {TOOL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedCat === cat.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} onClick={() => onSelectTool(tool)} />
        ))}
      </div>
    </div>
  );
};
