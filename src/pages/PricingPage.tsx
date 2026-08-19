import React, { useState } from 'react';
import { Check, Sparkles, Shield, Zap, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Simple Transparent Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Choose the Perfect PDF Plan
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Use all PDF tools for free, or upgrade to Pro for higher limits, batch processing, and dedicated cloud workers.
        </p>

        {/* Toggle Billing */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-xs font-bold ${!annual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${annual ? 'translate-x-6' : ''}`} />
          </button>
          <span className={`text-xs font-bold ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Annual <span className="text-emerald-500 font-extrabold">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free Plan</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">For casual PDF editing & quick conversions</p>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
            <span className="text-xs text-slate-400">/ forever</span>
          </div>

          <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-bold text-sm transition-colors">
            Get Started Free
          </button>

          <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-700">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Access to all 33 PDF tools</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 50MB per file</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Standard conversion speed</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Automatic file cleanup</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="relative bg-white dark:bg-slate-800 border-2 border-blue-600 rounded-3xl p-8 space-y-6 shadow-2xl scale-[1.03]">
          <span className="absolute -top-3 right-6 px-3 py-1 bg-blue-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-md">
            Most Popular
          </span>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro Pass</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">For freelancers and power document users</p>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {annual ? '$7' : '$9'}
            </span>
            <span className="text-xs text-slate-400">/ month</span>
          </div>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all">
            Upgrade to Pro
          </button>

          <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-700">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Unlimited file processing</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 2GB per file</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Batch processing up to 100 files</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Priority OCR speed & Bengali language support</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Ad-free workspace</li>
          </ul>
        </div>

        {/* Business Plan */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Business Team</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">For agencies and enterprise teams</p>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {annual ? '$23' : '$29'}
            </span>
            <span className="text-xs text-slate-400">/ month</span>
          </div>

          <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-bold text-sm transition-colors">
            Contact Sales
          </button>

          <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-700">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Dedicated REST API access</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 5GB per file upload</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Custom branding & signatures</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Dedicated 24/7 SLA support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
