import React from 'react';
import { GUIDES_DATA, GuideArticle } from '../data/guidesData';
import { BookOpen, Clock, User, ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface GuidesPageProps {
  onNavigate: (path: string) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ onNavigate }) => {
  const canonicalUrl = 'https://ais-dev-xjbfiikcx4utwuofvac2jx-107699198401.asia-southeast1.run.app/guides';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'PDF Guides & Tutorials — SRA PDF',
    description: 'Learn how to merge, split, compress, edit, convert, and sign PDF files online with step-by-step guides by SRA Digital Labs.',
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'SRA Digital Labs',
      founder: {
        '@type': 'Person',
        name: 'Sahadatur Rahman Anik'
      }
    }
  };

  return (
    <>
      <SEOHead
        title="PDF Guides & Step-by-Step Tutorials | SRA PDF"
        description="Learn how to merge, split, compress, edit, convert, and sign PDF files online with free step-by-step guides by SRA Digital Labs."
        canonicalUrl={canonicalUrl}
        jsonLd={jsonLd}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> PDF Knowledge Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            PDF Guides & Step-by-Step Tutorials
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Master document management with easy, practical guides on merging, compressing, converting, and editing PDF documents online.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES_DATA.map((article) => (
            <div
              key={article.slug}
              onClick={() => onNavigate(`/guides/${article.slug}`)}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readingTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-medium truncate max-w-[180px]">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {article.author}
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Author & Brand Attribution Section */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> Crafted by SRA Digital Labs
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              SRA PDF is an online PDF toolkit developed by SRA Digital Labs, founded by Sahadatur Rahman Anik. All guides are regularly audited for technical accuracy.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/about')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shrink-0 shadow-md shadow-blue-600/20"
          >
            About SRA PDF
          </button>
        </div>
      </div>
    </>
  );
};
