import React from 'react';
import { X, Lock, Sparkles } from 'lucide-react';
import { PricingPage } from '../pages/PricingPage';

interface UsageLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFree: () => void;
  onNavigate?: (path: string) => void;
}

export const UsageLimitModal: React.FC<UsageLimitModalProps> = ({
  isOpen,
  onClose,
  onSelectFree,
  onNavigate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Notice Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 sm:p-8 shrink-0 flex items-start justify-between gap-4 relative">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white">
              <Lock className="w-3.5 h-3.5" /> Free Limit Reached / ব্যবহারের সীমা শেষ
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              You've Used Your Free 3 PDF Operations!
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              আপনি ফ্রি সেশনের ৩টি ফাইল অপারেশন সম্পন্ন করেছেন। ফ্রিতে পুনরায় ব্যবহার করতে <strong>Get Started Free</strong>-তে ক্লিক করুন, অথবা আনলিমিটেড ফাইলের জন্য ওয়াটসঅ্যাপে <strong>Pro Pass</strong> আপগ্রেড করুন।
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors shrink-0"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Pricing Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <PricingPage
            onSelectFree={() => {
              onSelectFree();
              onClose();
            }}
            onNavigate={(path) => {
              if (onNavigate) onNavigate(path);
              onClose();
            }}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
};
