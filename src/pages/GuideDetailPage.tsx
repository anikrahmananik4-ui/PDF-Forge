import React from 'react';
import { GuideArticle } from '../data/guidesData';
import { Clock, User, Calendar, ArrowLeft, ArrowRight, CheckCircle2, Shield, Lightbulb } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { AdSlot } from '../components/AdSlot';

interface GuideDetailPageProps {
  article: GuideArticle;
  onNavigate: (path: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ article, onNavigate }) => {
  const canonicalUrl = `https://ais-dev-xjbfiikcx4utwuofvac2jx-107699198401.asia-southeast1.run.app/guides/${article.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.metaDescription,
      datePublished: article.publishedDate,
      author: {
        '@type': 'Person',
        name: 'Sahadatur Rahman Anik',
        jobTitle: 'Full-Stack Developer & SEO Specialist',
        worksFor: {
          '@type': 'Organization',
          name: 'SRA Digital Labs'
        }
      },
      publisher: {
        '@type': 'Organization',
        name: 'SRA Digital Labs',
        url: 'https://ais-dev-xjbfiikcx4utwuofvac2jx-107699198401.asia-southeast1.run.app'
      },
      mainEntityOfPage: canonicalUrl
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  ];

  return (
    <>
      <SEOHead
        title={article.seoTitle}
        description={article.metaDescription}
        canonicalUrl={canonicalUrl}
        ogType="article"
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Breadcrumb Back */}
        <button
          onClick={() => onNavigate('/guides')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </button>

        {/* Article Header */}
        <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readingTime}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.publishedDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {article.summary}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
            <User className="w-4 h-4 text-blue-500" />
            <span>Written by <strong>{article.author}</strong></span>
          </div>
        </div>

        {/* Call-to-action Tool Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Ready to process your PDF files?</h3>
            <p className="text-xs text-blue-100">Use our free, private online {article.relatedToolTitle} now.</p>
          </div>
          <button
            onClick={() => onNavigate(article.relatedToolPath)}
            className="px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 font-extrabold text-xs rounded-xl shadow-lg transition-colors shrink-0 flex items-center gap-2"
          >
            Open {article.relatedToolTitle} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {section.heading}
              </h2>

              <p>{section.content}</p>

              {section.steps && (
                <ol className="space-y-3 pl-2 my-4">
                  {section.steps.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">{step}</span>
                    </li>
                  ))}
                </ol>
              )}

              {section.tip && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 rounded-2xl border border-amber-200 dark:border-amber-800/80 flex items-start gap-3 text-xs sm:text-sm">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pro Tip:</strong> {section.tip}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        <AdSlot type="banner" />

        {/* FAQ Section */}
        {article.faqs.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {article.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Brand Info */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
          <Shield className="w-5 h-5 text-blue-500 shrink-0" />
          <span>
            SRA PDF is an online PDF toolkit developed by SRA Digital Labs, founded by Sahadatur Rahman Anik. Files uploaded for processing are automatically deleted after 1 hour.
          </span>
        </div>
      </div>
    </>
  );
};
