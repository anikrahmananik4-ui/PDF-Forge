import React, { useState } from 'react';
import { Check, Sparkles, MessageCircle, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface PricingPageProps {
  onSelectFree?: () => void;
  onNavigate?: (path: string) => void;
  isModal?: boolean;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onSelectFree, onNavigate }) => {
  const [annual, setAnnual] = useState(false);

  const handleFreeStart = () => {
    // Reset usage limit counter
    localStorage.setItem('sra_pdf_usage_count', '0');
    if (onSelectFree) {
      onSelectFree();
    } else if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const handleBuyWhatsApp = (planName: string, price: string) => {
    const message = `আসসালামু আলাইকুম (Hello SRA PDF Team)! 👋

আমি SRA PDF-এর ${planName} (${price}) প্ল্যানটি কিনতে চাই। 

📌 Plan: ${planName}
💰 Price: ${price}
🌐 Website: SRA PDF (sra-pdf.com)

অনুগ্রহ করে পেমেন্ট পদ্ধতি (bKash/Nagad/Bank/Card) এবং অ্যাকাউন্ট অ্যাক্টিভেশনের তথ্য দিয়ে সাহায্য করুন। ধন্যবাদ!`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/8801859334774?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Simple & Transparent Pricing / সহজ এবং সাশ্রয়ী মূল্য
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Choose Your SRA PDF Plan
        </h1>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400">
          Use all tools for free, or upgrade to Pro for unlimited batch operations, priority speed, and zero daily limits.
        </p>

        {/* Toggle Billing */}
        <div className="flex items-center justify-center gap-3 pt-2">
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
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 space-y-6 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-all">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center justify-between">
                Free Starter <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-300">Free Forever</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">For casual document editing & quick PDF tasks</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
              <span className="text-xs text-slate-400">/ ৳০ ফ্রি</span>
            </div>

            <button
              onClick={handleFreeStart}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-blue-600" /> Get Started Free / ফ্রিতে ব্যবহার করুন
            </button>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Access to all 33 PDF tools</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 3-4 free conversions per session</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 50MB per file</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Fast browser-side processing</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 100% privacy & auto-delete</li>
            </ul>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="relative bg-white dark:bg-slate-800 border-2 border-blue-600 rounded-3xl p-8 space-y-6 shadow-2xl scale-[1.03] flex flex-col justify-between">
          <span className="absolute -top-3.5 right-6 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[10px] uppercase tracking-wider rounded-full shadow-md">
            ★ Most Popular / সেরা পছন্দ
          </span>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro Pass</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">For freelancers, professionals & power users</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                {annual ? '$7' : '$9'}
              </span>
              <span className="text-xs text-slate-400">/ month ({annual ? '৳৭৫০/মাস' : '৳৯৫০/মাস'})</span>
            </div>

            <button
              onClick={() => handleBuyWhatsApp('Pro Pass', annual ? '$7/month (Annual)' : '$9/month')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Upgrade via WhatsApp / ওয়াটসঅ্যাপে ক্রয় করুন
            </button>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> <strong>Unlimited</strong> file operations</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 2GB per file size limit</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Batch convert up to 100 files at once</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Ultra-fast OCR with Bengali support</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Priority 24/7 direct WhatsApp support</li>
            </ul>
          </div>
        </div>

        {/* Business Plan */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 space-y-6 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-all">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Business Team</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">For agencies, offices & enterprise teams</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                {annual ? '$23' : '$29'}
              </span>
              <span className="text-xs text-slate-400">/ month</span>
            </div>

            <button
              onClick={() => handleBuyWhatsApp('Business Team Plan', annual ? '$23/month (Annual)' : '$29/month')}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-black dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Contact Sales / কথা বলুন
            </button>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Dedicated REST API access keys</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 5GB per file upload</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Custom branding & signatures</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Team member management</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Support & Guarantee Note */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Need help choosing or custom payment?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Instant activation available via bKash, Nagad, Rocket, Bank Transfer or International Cards.</p>
          </div>
        </div>
        <button
          onClick={() => handleBuyWhatsApp('General Inquiry', 'Custom')}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shrink-0"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp Support (+8801859334774)
        </button>
      </div>
    </div>
  );
};

