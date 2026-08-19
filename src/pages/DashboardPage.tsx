import React, { useState, useEffect } from 'react';
import { History, Trash2, FileText, Download, Zap, HardDrive, Clock } from 'lucide-react';
import { RecentJob } from '../types/pdf';

export const DashboardPage: React.FC = () => {
  const [history, setHistory] = useState<RecentJob[]>([]);

  useEffect(() => {
    const cached = localStorage.getItem('pdfforge_history');
    if (cached) {
      try {
        setHistory(JSON.parse(cached));
      } catch {
        // ignore
      }
    } else {
      // Mock initial recent history items for rich initial view
      const demoHistory: RecentJob[] = [
        {
          id: 'job-1',
          toolId: 'merge-pdf',
          toolTitle: 'Merge PDF',
          filename: 'merged_reports.pdf',
          originalSize: 1024 * 1024 * 12.4,
          outputSize: 1024 * 1024 * 11.8,
          timestamp: Date.now() - 3600000 * 2
        },
        {
          id: 'job-2',
          toolId: 'compress-pdf',
          toolTitle: 'Compress PDF',
          filename: 'compressed_contract.pdf',
          originalSize: 1024 * 1024 * 15.2,
          outputSize: 1024 * 1024 * 4.6,
          timestamp: Date.now() - 3600000 * 24
        }
      ];
      setHistory(demoHistory);
      localStorage.setItem('pdfforge_history', JSON.stringify(demoHistory));
    }
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('pdfforge_history');
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const totalProcessedBytes = history.reduce((acc, item) => acc + item.originalSize, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            User Workspace Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track recent document processing sessions and local activity logs
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300 hover:bg-red-100 text-xs font-bold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {/* Stats Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Jobs Completed</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{history.length}</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Processed</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{formatSize(totalProcessedBytes)}</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Auto File Cleanup</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Active (1 Hour TTL)</span>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity History</h3>
        </div>

        {history.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500 dark:text-slate-400">
            No recent processing history found.
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
                      Tool: {item.toolTitle} • {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs shrink-0 ml-4">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                    {formatSize(item.outputSize)}
                  </span>
                  <span className="text-slate-400">Original: {formatSize(item.originalSize)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
