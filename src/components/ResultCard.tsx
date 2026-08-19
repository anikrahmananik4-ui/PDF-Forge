import React from 'react';
import { Download, RefreshCw, Home, CheckCircle2, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import { ProcessingResult } from '../types/pdf';

interface ResultCardProps {
  result: ProcessingResult;
  onProcessAnother: () => void;
  onGoHome: () => void;
  downloadLabel?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onProcessAnother,
  onGoHome,
  downloadLabel = 'Download File'
}) => {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const savedBytes = result.originalSize - result.size;
  const savedPercent = result.originalSize > 0 ? Math.round((savedBytes / result.originalSize) * 100) : 0;

  const handleDownload = () => {
    if (result.blob) {
      const url = URL.createObjectURL(result.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else if (result.downloadUrl) {
      const a = document.createElement('a');
      a.href = result.downloadUrl;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl p-8 space-y-6 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
          Your PDF is Ready!
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          File processed successfully in {(result.processingTimeMs / 1000).toFixed(1)}s
        </p>
      </div>

      {/* Stats Details Box */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <FileText className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
              {result.filename}
            </span>
          </div>
          {savedPercent > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Sparkles className="w-3 h-3" /> Saved {savedPercent}%
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Original Size</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {formatSize(result.originalSize)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Processed Size</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              {formatSize(result.size)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleDownload}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Download className="w-5 h-5" />
          {downloadLabel}
        </button>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={onProcessAnother}
            className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Process Another
          </button>
          <button
            onClick={onGoHome}
            className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" /> Home
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Your files are encrypted and automatically deleted after processing.</span>
      </div>
    </div>
  );
};
