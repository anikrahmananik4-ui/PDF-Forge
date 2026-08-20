import React, { useState } from 'react';
import { FileText, Sun, Moon, Menu, X, Search, ChevronDown, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TOOL_CATEGORIES, PDF_TOOLS } from '../data/toolsData';
import { PDFTool } from '../types/pdf';
import { Logo } from './Logo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => handleLinkClick('/')}
            className="cursor-pointer"
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleLinkClick('/tools')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentPath === '/tools'
                  ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Tools
            </button>

            {/* Popular Shortcut Categories */}
            {TOOL_CATEGORIES.slice(0, 4).map((cat) => {
              const toolsInCat = PDF_TOOLS.filter((t) => t.category === cat.id);
              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(cat.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span>{cat.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === cat.id && (
                    <div className="absolute top-full left-0 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {toolsInCat.map((tool) => (
                        <div
                          key={tool.id}
                          onClick={() => handleLinkClick(tool.path)}
                          className="px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-slate-700/60 cursor-pointer flex flex-col transition-colors"
                        >
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                            {tool.title}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-400 line-clamp-1">
                            {tool.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => handleLinkClick('/guides')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentPath.startsWith('/guides')
                  ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Guides
            </button>

            <button
              onClick={() => handleLinkClick('/pricing')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentPath === '/pricing'
                  ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Pricing
            </button>
          </nav>

          {/* Controls Right */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Search tools"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Toggle theme mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={() => handleLinkClick('/dashboard')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-md shadow-blue-600/20"
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleLinkClick('/')}
              className="px-3 py-2 rounded-xl text-left font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('/tools')}
              className="px-3 py-2 rounded-xl text-left font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              All Tools (33)
            </button>
            <button
              onClick={() => handleLinkClick('/pricing')}
              className="px-3 py-2 rounded-xl text-left font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Pricing
            </button>
            <button
              onClick={() => handleLinkClick('/dashboard')}
              className="px-3 py-2 rounded-xl text-left font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              User Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
