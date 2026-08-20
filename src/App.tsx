import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchBar } from './components/SearchBar';
import { HomePage } from './pages/HomePage';
import { ToolsDirectoryPage } from './pages/ToolsDirectoryPage';
import { ToolRunnerPage } from './pages/ToolRunnerPage';
import { GuidesPage } from './pages/GuidesPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { PricingPage } from './pages/PricingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage, ContactPage, PrivacyPage, TermsPage } from './pages/StaticPages';
import { PDF_TOOLS } from './data/toolsData';
import { GUIDES_DATA } from './data/guidesData';
import { PDFTool } from './types/pdf';
import { X } from 'lucide-react';

const getInitialPath = (): string => {
  if (typeof window === 'undefined') return '/';

  // 1. Check URL query params for fallback redirects (e.g. ?p=/merge-pdf)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const paramPath = urlParams.get('p') || urlParams.get('path');
    if (paramPath) {
      const decoded = decodeURIComponent(paramPath);
      const cleanPath = decoded.startsWith('/') ? decoded : '/' + decoded;
      // Clean up the query parameter in the browser address bar
      window.history.replaceState({}, '', cleanPath);
      return cleanPath;
    }
  } catch {
    // Ignore query parse error
  }

  // 2. Check URL Hash (e.g. #/merge-pdf or #merge-pdf)
  if (window.location.hash) {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    if (rawHash) {
      return '/' + rawHash;
    }
  }

  // 3. Fallback to standard pathname
  return window.location.pathname || '/';
};

export function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());
  const [activeTool, setActiveTool] = useState<PDFTool | null>(null);
  const [activeGuideSlug, setActiveGuideSlug] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Synchronize router paths
  useEffect(() => {
    const handleLocationChange = () => {
      const path = getInitialPath();
      setCurrentPath(path);
      resolvePath(path);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    resolvePath(currentPath);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const resolvePath = (path: string) => {
    // 1. Tool Matching (support both clean /merge-pdf AND legacy /tools/merge-pdf)
    let cleanPath = path;
    if (cleanPath.startsWith('/tools/')) {
      cleanPath = '/' + cleanPath.replace('/tools/', '');
    }

    const matchedTool = PDF_TOOLS.find(
      (t) => t.path === path || t.path === cleanPath || t.id === cleanPath.replace('/', '')
    );

    if (matchedTool) {
      setActiveTool(matchedTool);
      setActiveGuideSlug(null);
      return;
    }

    setActiveTool(null);

    // 2. Guides Matching
    if (path.startsWith('/guides/')) {
      const slug = path.replace('/guides/', '');
      setActiveGuideSlug(slug);
    } else {
      setActiveGuideSlug(null);
    }
  };

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    resolvePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectTool = (tool: PDFTool) => {
    navigateTo(tool.path);
    setSearchModalOpen(false);
  };

  // Active guide article lookup
  const activeGuideArticle = activeGuideSlug
    ? GUIDES_DATA.find((g) => g.slug === activeGuideSlug)
    : null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      <main className="flex-1">
        {activeTool ? (
          <ToolRunnerPage
            tool={activeTool}
            onSelectTool={selectTool}
            onGoHome={() => navigateTo('/')}
          />
        ) : activeGuideArticle ? (
          <GuideDetailPage
            article={activeGuideArticle}
            onNavigate={navigateTo}
          />
        ) : currentPath === '/guides' ? (
          <GuidesPage onNavigate={navigateTo} />
        ) : currentPath === '/tools' ? (
          <ToolsDirectoryPage onSelectTool={selectTool} />
        ) : currentPath === '/pricing' ? (
          <PricingPage onNavigate={navigateTo} onSelectFree={() => navigateTo('/')} />
        ) : currentPath === '/dashboard' ? (
          <DashboardPage />
        ) : currentPath === '/about' ? (
          <AboutPage />
        ) : currentPath === '/contact' ? (
          <ContactPage />
        ) : currentPath === '/privacy' ? (
          <PrivacyPage />
        ) : currentPath === '/terms' ? (
          <TermsPage />
        ) : (
          <HomePage onSelectTool={selectTool} onNavigate={navigateTo} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Search Modal Overlay */}
      {searchModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Search PDF Tools
              </span>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <SearchBar onSelectTool={selectTool} autoFocus={true} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
