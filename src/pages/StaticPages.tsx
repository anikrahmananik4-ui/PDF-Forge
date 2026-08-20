import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Zap, Laptop, Code, Send, User, Building, Lock, FileText, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
    {/* Header */}
    <div className="space-y-4 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
        <Globe className="w-3.5 h-3.5" /> About SRA PDF
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
        Advanced & Secure PDF Platform
      </h1>
      <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
        Welcome to SRA PDF, an advanced and secure platform designed to make your daily PDF management effortless, fast, and professional.
      </p>
    </div>

    {/* Mission Banner */}
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3">
      <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
        <TargetIcon className="w-6 h-6" /> Our Mission
      </h2>
      <p className="text-sm sm:text-base text-blue-50 leading-relaxed font-medium">
        Our mission is to simplify complex document workflows with smart, high-performance tools and deliver a premium digital experience for both personal and professional use.
      </p>
    </div>

    {/* Why Choose SRA PDF */}
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center">
        Why Choose SRA PDF?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Lightning-Fast Performance</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Seamlessly merge, split, compress, edit, and convert your PDF documents in seconds.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Top-Tier Security & Privacy</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Your data privacy is our priority. Uploaded files are handled with strict security measures and are automatically removed after processing.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Laptop className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Modern & Clean Interface</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Built with a smooth, responsive, and futuristic UI that works seamlessly across all desktop and mobile devices.
          </p>
        </div>
      </div>
    </div>

    {/* About the Creator */}
    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
          <Code className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">About the Creator</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">SRA Digital Labs & Anik-Matrix Innovations</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        SRA PDF is a modern digital initiative crafted under <strong>SRA Digital Labs</strong> and <strong>Anik-Matrix Innovations</strong>. Founded by <strong>Sahadatur Rahman Anik</strong>—a Full-Stack Developer and SEO Expert—the platform represents a commitment to building innovative, reliable, and high-quality digital solutions driven by technology and creativity.
      </p>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />
          <span>Founder: <strong>Sahadatur Rahman Anik</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-indigo-500" />
          <span>Organization: <strong>SRA Digital Labs</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-emerald-500" />
          <span>Email: <a href="mailto:sradigitallabs@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">sradigitallabs@gmail.com</a></span>
        </div>
      </div>
    </div>
  </div>
);

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Contact Us</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Have questions, feedback, or need support with SRA PDF? Get in touch with us:
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Email Address</span>
            <a href="mailto:sradigitallabs@gmail.com" className="text-base font-bold text-blue-600 dark:text-blue-400 hover:underline">
              sradigitallabs@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <Building className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Platform & Ownership</span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              SRA PDF (A project by SRA Digital Labs & Anik-Matrix Innovations)
            </span>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="p-8 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 rounded-3xl text-center space-y-3 border border-emerald-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold">Message Received!</h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-300">Thank you for reaching out. We will respond shortly.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-4"
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Name</label>
            <input
              required
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              required
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message</label>
            <textarea
              required
              rows={4}
              placeholder="How can we help you?"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-slate-700 dark:text-slate-300">
    <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Privacy Policy for SRA PDF</h1>
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <span>Effective Date: August 20, 2026</span>
        <span>•</span>
        <span>Last Updated: August 20, 2026</span>
      </div>
    </div>

    <p className="text-xs sm:text-sm leading-relaxed">
      At SRA PDF (a product powered by <strong>SRA Digital Labs</strong> and <strong>Anik-Matrix Innovations</strong>), accessible via our web application, one of our main priorities is the privacy of our visitors and users. This Privacy Policy document outlines the types of information that is collected and recorded by SRA PDF and how we use, process, and protect it.
    </p>

    <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Information We Collect</h3>
        <p>We only collect minimal data necessary to provide you with a fast, seamless, and secure PDF management experience.</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li><strong>Uploaded Files & Documents:</strong> When you use our PDF tools (such as merging, splitting, compressing, or converting files), your uploaded files are temporarily processed on our secure servers.</li>
          <li><strong>Log & Usage Data:</strong> Like most web applications, SRA PDF collects non-personally identifiable information automatically. This includes browser type, operating system, referring URLs, device type, date/time stamps, and basic usage statistics.</li>
          <li><strong>Cookies & Technical Data:</strong> We may use essential cookies and local storage to save your session preferences and ensure the smooth execution of file processing tasks.</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">2. How We Use Your Information</h3>
        <p>The information we process is strictly used to operate, maintain, and improve our services:</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li>To process, edit, convert, or compress your uploaded PDF files as requested.</li>
          <li>To ensure system stability, detect technical errors, and optimize server performance.</li>
          <li>To protect our infrastructure against unauthorized access, malicious attacks, or abusive usage.</li>
          <li>To respond to user inquiries or support requests sent to <a href="mailto:sradigitallabs@gmail.com" className="text-blue-600 hover:underline">sradigitallabs@gmail.com</a>.</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">3. File Processing & Automatic Deletion</h3>
        <p>Your document security and data privacy are core principles of SRA PDF:</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li><strong>No Permanent File Storage:</strong> Your uploaded files are never permanently stored, indexed, or archived on our servers.</li>
          <li><strong>Automatic Deletion:</strong> All uploaded files, temporary processing copies, and output files are automatically and permanently deleted from our temporary storage (<code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-[11px]">TEMP_FILE_TTL</code>) shortly after processing.</li>
          <li><strong>No File Content Inspection:</strong> We do not view, analyze, read, share, or sell the contents of your uploaded documents under any circumstances.</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">4. Data Sharing & Third-Party Services</h3>
        <p>SRA PDF does not sell, trade, rent, or lease your personal information or uploaded file data to third parties.</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li><strong>Infrastructure & Hosting:</strong> We utilize secure, industry-standard hosting providers and serverless infrastructures (such as Supabase and cloud hosting services) strictly to run our backend code and process data securely.</li>
          <li><strong>Legal Requirements:</strong> We may disclose non-file usage logs only if required to do so by law or in response to valid requests by public authorities.</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">5. Security Measures</h3>
        <p>We implement robust technical and organizational security measures to protect your data against unauthorized access, alteration, disclosure, or destruction:</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li>End-to-end encrypted transport protocols (HTTPS / SSL) for all data transferred between your device and our servers.</li>
          <li>Strict access controls and automated temporary file lifecycle policies (<code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-[11px]">MAX_FILE_SIZE</code> and auto-cleanup time-to-live triggers).</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">6. User Rights & Data Protection</h3>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li><strong>Right to Access & Erase:</strong> Since we do not permanently store your uploaded files or require user accounts for basic tools, no personal document history is retained on our platform.</li>
          <li><strong>Opt-Out:</strong> You can clear cookies or local storage at any time directly through your web browser settings.</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">7. Children's Information</h3>
        <p>SRA PDF does not knowingly collect any personally identifiable information from children under the age of 13. If you believe your child provided personal information on our website, please contact us immediately, and we will promptly remove such information from our records.</p>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">8. Changes to This Privacy Policy</h3>
        <p>We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted directly on this page with an updated "Last Updated" date. We encourage users to review this page periodically.</p>
      </section>

      <section className="space-y-2 bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">9. Contact Us</h3>
        <p>If you have additional questions, concerns, or require more information about our Privacy Policy, do not hesitate to contact us:</p>
        <div className="text-xs space-y-1 pt-2">
          <p><strong>Owner & Operator:</strong> Sahadatur Rahman Anik</p>
          <p><strong>Organization:</strong> SRA Digital Labs & Anik-Matrix Innovations</p>
          <p><strong>Email:</strong> <a href="mailto:sradigitallabs@gmail.com" className="text-blue-600 hover:underline">sradigitallabs@gmail.com</a></p>
        </div>
      </section>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-slate-700 dark:text-slate-300">
    <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Terms and Conditions for SRA PDF</h1>
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <span>Effective Date: August 20, 2026</span>
        <span>•</span>
        <span>Last Updated: August 20, 2026</span>
      </div>
    </div>

    <p className="text-xs sm:text-sm leading-relaxed">
      Welcome to SRA PDF (a product powered by <strong>SRA Digital Labs</strong> and <strong>Anik-Matrix Innovations</strong>). By accessing or using our web application and services, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all of these Terms, please do not use our service.
    </p>

    <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h3>
        <p>By using SRA PDF, you confirm that you are at least 13 years old (or the age of legal majority in your jurisdiction) and possess the legal capacity to enter into a binding agreement.</p>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Description of Service</h3>
        <p>SRA PDF provides online file management tools, including but not limited to PDF editing, merging, splitting, compressing, and converting ("Services"). We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without prior notice.</p>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Acceptable Use Policy</h3>
        <p>You agree to use SRA PDF strictly for lawful purposes. You are solely responsible for all content, documents, and data you upload, process, or download using our platform.</p>
        <h4 className="font-bold text-xs uppercase tracking-wider text-red-600 dark:text-red-400 pt-2">Prohibited Activities:</h4>
        <p>You must NOT use SRA PDF to:</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li>Upload, process, or distribute files that contain malware, viruses, spyware, or any other malicious code.</li>
          <li>Upload content that violates copyright, trademark, patent, or other intellectual property rights of any third party.</li>
          <li>Process documents containing illegal, fraudulent, harassing, defamatory, or hateful materials.</li>
          <li>Attempt to gain unauthorized access to our servers, infrastructure, databases, or API endpoints.</li>
          <li>Reverse engineer, decompile, or attempt to extract the source code of the web application.</li>
          <li>Use automated bots, scrapers, or scripts to flood or abuse our system infrastructure beyond fair system usage limits (<code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-[11px]">MAX_FILE_SIZE</code> and session limits).</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">4. Intellectual Property Rights</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 pl-2">
          <li><strong>Our Content:</strong> The SRA PDF name, logos, UI designs, graphics, branding, code, and overall functionality are the exclusive property of SRA Digital Labs / Anik-Matrix Innovations and founder Sahadatur Rahman Anik.</li>
          <li><strong>Your Documents:</strong> We claim zero ownership or copyright over the documents you upload, process, or create using SRA PDF. Your files remain 100% your property.</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">5. File Lifespan & Automated Deletion</h3>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li>Files uploaded to SRA PDF are temporarily stored only for as long as necessary to complete the requested processing.</li>
          <li>All temporary files and outputs are automatically purged according to our server's Time-To-Live (<code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-[11px]">TEMP_FILE_TTL</code>) configuration.</li>
          <li>SRA PDF is not a cloud backup or permanent storage service. You are responsible for maintaining local copies of your original files. We are not liable for any lost or deleted data resulting from session timeouts or automatic server cleanups.</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">6. Disclaimer of Warranties</h3>
        <p>SRA PDF is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, whether express or implied.</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li>We do not guarantee that file conversions, edits, or processing will be 100% error-free, lossless, or uninterrupted.</li>
          <li>We do not guarantee that our platform will meet your specific business or legal formatting requirements.</li>
          <li>You use our tools and process sensitive files at your own risk.</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">7. Limitation of Liability</h3>
        <p>To the maximum extent permitted by applicable law, SRA PDF, SRA Digital Labs, Anik-Matrix Innovations, and its owner Sahadatur Rahman Anik shall not be held liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to:</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
          <li>Loss of data, files, or information.</li>
          <li>System downtime, server downtime, or loss of profits.</li>
          <li>Unauthorized access to or alteration of your transmissions or file data caused by third-party vulnerabilities beyond our reasonable control.</li>
        </ul>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">8. Third-Party Links & Infrastructure</h3>
        <p>Our platform may rely on third-party cloud hosting, infrastructure providers (such as Supabase), or external services. We are not responsible for the privacy practices, uptime, or content of any third-party providers or linked websites.</p>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">9. Indemnification</h3>
        <p>You agree to defend, indemnify, and hold harmless SRA PDF, SRA Digital Labs, and its creator against any claims, liabilities, damages, losses, or expenses (including legal fees) arising out of your violation of these Terms or misuse of the service.</p>
      </section>

      <section className="space-y-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">10. Modifications to Terms</h3>
        <p>We reserve the right to revise and update these Terms and Conditions at any time. Changes will take effect immediately upon posting to this page. Continued use of SRA PDF after updates signifies your acceptance of the revised terms.</p>
      </section>

      <section className="space-y-2 bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">11. Contact Us</h3>
        <p>For questions regarding these Terms and Conditions, please contact us at:</p>
        <div className="text-xs space-y-1 pt-2">
          <p><strong>Owner & Developer:</strong> Sahadatur Rahman Anik</p>
          <p><strong>Agency:</strong> SRA Digital Labs & Anik-Matrix Innovations</p>
          <p><strong>Email:</strong> <a href="mailto:sradigitallabs@gmail.com" className="text-blue-600 hover:underline">sradigitallabs@gmail.com</a></p>
        </div>
      </section>
    </div>
  </div>
);

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
