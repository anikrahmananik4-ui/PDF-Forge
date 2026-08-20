import React, { useState, useEffect } from 'react';
import { History, Trash2, FileText, Zap, HardDrive, Clock, ArrowRight, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import { RecentJob, PDFTool } from '../types/pdf';
import { getJobHistory, clearJobHistory, removeJobFromHistory } from '../utils/historyTracker';
import { getUsageCount, MAX_FREE_USAGE, resetUsageCount } from '../utils/usageTracker';
import { PDF_TOOLS } from '../data/toolsData';

interface DashboardPageProps {
  onNavigate?: (path: string) => void;
  onSelectTool?: (tool: PDFTool) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectTool }) => {
  const [history, setHistory] = useState<RecentJob[]>([]);
  const [usageCount, setUsageCount] = useState<number>(0);

  const syncData = () => {
    setHistory(getJobHistory());
    setUsageCount(getUsageCount());
  };

  useEffect(() => {
    // Initial sync of real local data
    syncData();

    // Listen for real-time history updates across application tabs and events
    const handleHistoryUpdate = (e: Event) => {
      if ((e as CustomEvent).detail) {
        setHistory((e as CustomEvent).detail);
      } else {
        syncData();
      }
      setUsageCount(getUsageCount());
    };

    window.addEventListener('sra_history_updated', handleHistoryUpdate);
    window.addEventListener('storage', syncData);

    return () => {
      window.removeEventListener('sra_history_updated', handleHistoryUpdate);
      window.removeEventListener('storage', syncData);
    };
  }, []);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your real activity log?')) {
      clearJobHistory();
      setHistory([]);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeJobFromHistory(id);
    setHistory(getJobHistory());
  };

  const handleResetSessionUsage = () => {
    resetUsageCount();
    setUsageCount(0);
  };

  const formatSize = (bytes: number) => {
    if (!bytes || bytes <= 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const totalProcessedBytes = history.reduce((acc, item) => acc + (item.originalSize || 0), 0);
  const popularTools = PDF_TOOLS.filter((t) => t.popular).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Real-Time Live Workspace
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            User Activity & Workspace Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time tracking for your PDF file operations, session limits, and processing history
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/60 text-xs font-bold transition-colors shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {/* Real-Time Stats Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Real Operations Done</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{history.length}</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Volume Processed</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{formatSize(totalProcessedBytes)}</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Free Tier Counter</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {usageCount} / {MAX_FREE_USAGE} Used
              </span>
            </div>
          </div>
          {usageCount > 0 && (
            <button
              onClick={handleResetSessionUsage}
              title="Reset Free Usage Counter"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            </button>
          )}
        </div>
      </div>

      {/* History Table or Clean Empty State */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Live Activity History</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {history.length} {history.length === 1 ? 'record' : 'records'}
          </span>
        </div>

        {history.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-700/60 text-slate-400 flex items-center justify-center">
              <Layers className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">No operations performed yet</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Your real processing history will appear here instantly as soon as you convert, merge, compress, or edit PDF files.
              </p>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('/tools')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all mt-2"
              >
                Browse All PDF Tools <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60 overflow-x-auto">
            {history.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-700 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                      {item.filename}
                    </p>
                    <p className="text-xs text-slate-400">
                      Tool: <strong className="text-slate-600 dark:text-slate-300">{item.toolTitle}</strong> • {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <div className="text-right text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Output: {formatSize(item.outputSize)}
                    </span>
                    <span className="text-slate-400">Original: {formatSize(item.originalSize)}</span>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove item"
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Access Tools */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick Access Popular Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => {
                if (onSelectTool) onSelectTool(tool);
                else if (onNavigate) onNavigate(tool.path);
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-1">{tool.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
