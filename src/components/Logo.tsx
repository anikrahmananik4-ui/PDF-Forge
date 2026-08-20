import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "w-10 h-10",
  showText = true,
  textClassName = "text-slate-900 dark:text-white"
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center space-x-2.5 group select-none">
      <div className={`relative ${className} rounded-xl overflow-hidden shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0 bg-slate-800`}>
        {!imgError ? (
          <img
            src="/logo.png"
            alt="SRA PDF Logo"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-red-500 flex flex-col items-center justify-center text-white p-1">
            <FileText className="w-5 h-5 text-white" />
            <span className="text-[9px] font-black tracking-tighter leading-none -mt-0.5">SRA</span>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`text-xl font-black tracking-tight flex items-center gap-1 ${textClassName}`}>
            SRA <span className="text-blue-600 dark:text-blue-400">PDF</span>
          </span>
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 -mt-1 tracking-wider uppercase">
            Online Suite
          </span>
        </div>
      )}
    </div>
  );
};
