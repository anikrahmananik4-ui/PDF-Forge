import React from 'react';
import { PDFTool } from '../types/pdf';
import { Icon } from './Icon';

interface ToolCardProps {
  tool: PDFTool;
  onClick?: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-5 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {tool.badge && (
        <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300">
          {tool.badge}
        </span>
      )}

      <div className="space-y-3">
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-700/80 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
          <Icon name={tool.iconName} className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {tool.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      <div className="pt-4 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Use Tool</span>
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </div>
    </div>
  );
};
