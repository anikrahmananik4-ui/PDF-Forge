import React from 'react';
import { Loader2, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ProcessingStage } from '../types/pdf';

interface ProcessingStateProps {
  stage: ProcessingStage;
  progress: number;
  message: string;
  error?: string;
  onRetry?: () => void;
}

export const ProcessingStateUI: React.FC<ProcessingStateProps> = ({
  stage,
  progress,
  message,
  error,
  onRetry
}) => {
  const stageLabels: Record<ProcessingStage, string> = {
    uploading: 'Uploading File...',
    analyzing: 'Analyzing Document...',
    processing: 'Processing PDF...',
    finalizing: 'Finalizing Output...',
    completed: 'Processing Complete!',
    error: 'Processing Error'
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl text-center space-y-6">
      {stage === 'error' ? (
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Processing Failed</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{error || message}</p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-600/20"
            >
              Try Again
            </button>
          )}
        </div>
      ) : stage === 'completed' ? (
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Ready for Download!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{message}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 py-4">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-700"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
            ></div>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {stageLabels[stage]}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Files processed securely and deleted automatically</span>
          </div>
        </div>
      )}
    </div>
  );
};
