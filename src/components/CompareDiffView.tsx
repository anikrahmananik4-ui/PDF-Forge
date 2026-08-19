import React from 'react';
import { GitCompare, CheckCircle2, AlertCircle } from 'lucide-react';

interface CompareDiffViewProps {
  doc1Name: string;
  doc2Name: string;
  text1: string;
  text2: string;
  pageCount1: number;
  pageCount2: number;
}

export const CompareDiffView: React.FC<CompareDiffViewProps> = ({
  doc1Name,
  doc2Name,
  text1,
  text2,
  pageCount1,
  pageCount2
}) => {
  // Simple word diff algorithm
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);

  const isIdentical = text1.trim() === text2.trim();

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
            PDF Document Comparison Analysis
          </span>
        </div>
        {isIdentical ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" /> Documents Are Identical
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <AlertCircle className="w-3.5 h-3.5" /> Differences Detected
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document 1 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-[200px]">
              Original: {doc1Name}
            </h4>
            <span className="text-xs text-slate-500">{pageCount1} pages</span>
          </div>
          <div className="h-96 overflow-y-auto p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">
            {text1 || 'No text extracted.'}
          </div>
        </div>

        {/* Document 2 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-[200px]">
              Modified: {doc2Name}
            </h4>
            <span className="text-xs text-slate-500">{pageCount2} pages</span>
          </div>
          <div className="h-96 overflow-y-auto p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">
            {text2 || 'No text extracted.'}
          </div>
        </div>
      </div>
    </div>
  );
};
