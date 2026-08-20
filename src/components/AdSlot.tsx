import React from 'react';

interface AdSlotProps {
  type?: 'banner' | 'inline' | 'sidebar';
  label?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  type = 'inline',
  label = 'Advertisement / স্পন্সরড',
  className = ''
}) => {
  return (
    <div
      className={`bg-slate-50/80 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 text-center text-xs text-slate-400 dark:text-slate-500 overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2 px-1 uppercase tracking-wider">
        <span>{label}</span>
        <span>SRA PDF Partner</span>
      </div>
      
      <div className="min-h-[90px] flex flex-col items-center justify-center bg-white dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700 p-3 space-y-1 shadow-inner">
        <p className="font-bold text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
          ⚡ SRA PDF Pro — High-Speed Batch PDF Engine
        </p>
        <p className="text-[11px] text-slate-400 max-w-md mx-auto">
          Process unlimited multi-gigabyte documents locally with instant TLS encryption powered by SRA Digital Labs.
        </p>
      </div>
    </div>
  );
};
