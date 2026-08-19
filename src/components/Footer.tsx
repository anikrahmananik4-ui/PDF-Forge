import React from 'react';
import { FileText, ShieldCheck, Lock, Heart } from 'lucide-react';
import { PDF_TOOLS } from '../data/toolsData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('/')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                PDF<span className="text-blue-400">Forge</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Every PDF Tool You Need. In One Place. Merge, split, compress, convert, edit, and manage your PDF files online with maximum security.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>TLS 256-bit encrypted • 100% Automatic File Cleanup</span>
            </div>
          </div>

          {/* Col 2: Popular Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Popular Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {PDF_TOOLS.filter((t) => t.popular).slice(0, 6).map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => onNavigate(tool.path)}
                    className="hover:text-white transition-colors"
                  >
                    {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Convert & Edit */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Convert & Edit</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('/tools/jpg-to-pdf')} className="hover:text-white transition-colors">JPG to PDF</button></li>
              <li><button onClick={() => onNavigate('/tools/pdf-to-jpg')} className="hover:text-white transition-colors">PDF to JPG</button></li>
              <li><button onClick={() => onNavigate('/tools/pdf-to-word')} className="hover:text-white transition-colors">PDF to Word</button></li>
              <li><button onClick={() => onNavigate('/tools/word-to-pdf')} className="hover:text-white transition-colors">Word to PDF</button></li>
              <li><button onClick={() => onNavigate('/tools/pdf-editor')} className="hover:text-white transition-colors">PDF Editor</button></li>
              <li><button onClick={() => onNavigate('/tools/ocr-pdf')} className="hover:text-white transition-colors">OCR PDF</button></li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">Contact</button></li>
              <li><button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => onNavigate('/pricing')} className="hover:text-white transition-colors">Pricing Plans</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} PDFForge. A project by SRA Digital Labs & Anik-Matrix Innovations.</p>
          <p className="flex items-center gap-1">
            Founded by Sahadatur Rahman Anik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
