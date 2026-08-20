import React, { useState } from 'react';
import { PDFTool, UploadedFile, ProcessingState, ProcessingResult } from '../types/pdf';
import { FileUploader } from '../components/FileUploader';
import { ProcessingStateUI } from '../components/ProcessingState';
import { ResultCard } from '../components/ResultCard';
import { ToolCard } from '../components/ToolCard';
import { PDF_TOOLS } from '../data/toolsData';
import { Icon } from '../components/Icon';
import * as pdfEngine from '../services/pdfEngine';
import { VisualPageOrganizer } from '../components/VisualPageOrganizer';
import { PDFEditorCanvas } from '../components/PDFEditorCanvas';
import { SignaturePad } from '../components/SignaturePad';
import { SignaturePlacer } from '../components/SignaturePlacer';
import { CompareDiffView } from '../components/CompareDiffView';
import { SEOHead } from '../components/SEOHead';
import { AdSlot } from '../components/AdSlot';
import { UsageLimitModal } from '../components/UsageLimitModal';
import { getUsageCount, incrementUsageCount, hasReachedLimit, resetUsageCount, MAX_FREE_USAGE } from '../utils/usageTracker';
import { addJobToHistory } from '../utils/historyTracker';
import { ArrowLeft, Sparkles, Sliders, Shield, CheckCircle2, Lock, HelpCircle, Eye, EyeOff, Key, Zap } from 'lucide-react';

interface ToolRunnerPageProps {
  tool: PDFTool;
  onSelectTool: (tool: PDFTool) => void;
  onGoHome: () => void;
}

export const ToolRunnerPage: React.FC<ToolRunnerPageProps> = ({
  tool,
  onSelectTool,
  onGoHome
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadedFile[]>([]); // For compare tool
  const [processingState, setProcessingState] = useState<ProcessingState | null>(null);
  const [result, setResult] = useState<ProcessingResult | null>(null);

  // Usage Limit State
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [usageCount, setUsageCount] = useState<number>(getUsageCount());

  // Tool Specific Options
  const [compressLevel, setCompressLevel] = useState<'extreme' | 'recommended' | 'less'>('recommended');
  const [splitMode, setSplitMode] = useState<'all' | 'range'>('all');
  const [splitRanges, setSplitRanges] = useState('1-3, 5');
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'fit'>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [rotationAngle, setRotationAngle] = useState(90);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkColor, setWatermarkColor] = useState('#3b82f6');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkRotation, setWatermarkRotation] = useState(45);
  const [pageNumPos, setPageNumPos] = useState<'bottom-center' | 'bottom-right' | 'top-right' | 'bottom-left'>('bottom-center');
  const [pageNumFormat, setPageNumFormat] = useState('Page {page} of {total}');
  const [protectPassword, setProtectPassword] = useState('');
  const [unlockPassword, setUnlockPassword] = useState('');
  const [showProtectPass, setShowProtectPass] = useState(false);
  const [showUnlockPass, setShowUnlockPass] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaAuthor, setMetaAuthor] = useState('');
  const [ocrLang, setOcrLang] = useState('eng');
  const [rawTextContent, setRawTextContent] = useState('Sample document text content...');
  const [rawHtmlContent, setRawHtmlContent] = useState('<h1>Document Title</h1><p>Sample HTML content...</p>');

  // Extra Compare state
  const [compareResultData, setCompareResultData] = useState<{ text1: string; text2: string; pageCount1: number; pageCount2: number } | null>(null);
  const [activeSignatureUrl, setActiveSignatureUrl] = useState<string | null>(null);

  // SEO Info
  const canonicalUrl = `https://ais-dev-xjbfiikcx4utwuofvac2jx-107699198401.asia-southeast1.run.app${tool.path}`;
  const seoTitle = tool.seoTitle || `${tool.title} Online Free — SRA PDF`;
  const seoDesc = tool.seoMetaDescription || tool.description;
  const seoH1 = tool.seoH1 || tool.title;

  // JSON-LD Schema
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${tool.title} — SRA PDF`,
      url: canonicalUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      publisher: {
        '@type': 'Organization',
        name: 'SRA Digital Labs',
        founder: {
          '@type': 'Person',
          name: 'Sahadatur Rahman Anik'
        }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://ais-dev-xjbfiikcx4utwuofvac2jx-107699198401.asia-southeast1.run.app/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Tools',
          item: 'https://ais-dev-xjbfiikcx4utwuofvac2jx-107699198401.asia-southeast1.run.app/tools'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: tool.title,
          item: canonicalUrl
        }
      ]
    }
  ];

  // Related Tools Lookup
  let relatedTools: PDFTool[] = [];
  if (tool.relatedToolIds && tool.relatedToolIds.length > 0) {
    relatedTools = PDF_TOOLS.filter((t) => tool.relatedToolIds?.includes(t.id));
  }
  if (relatedTools.length < 4) {
    const extraCategoryTools = PDF_TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id && !relatedTools.some((rt) => rt.id === t.id));
    relatedTools = [...relatedTools, ...extraCategoryTools].slice(0, 4);
  }

  const handleStartProcess = async () => {
    if (hasReachedLimit()) {
      setShowLimitModal(true);
      return;
    }

    if (files.length === 0 && tool.id !== 'text-to-pdf' && tool.id !== 'html-to-pdf') {
      alert('Please upload a file to proceed.');
      return;
    }

    const startTime = Date.now();
    setProcessingState({ stage: 'uploading', progress: 20, message: 'Uploading document...' });

    try {
      await new Promise((res) => setTimeout(res, 300));
      setProcessingState({ stage: 'analyzing', progress: 45, message: 'Analyzing document structure...' });

      let outputBytes: Uint8Array | null = null;
      let outputBlob: Blob | null = null;
      let outputFilename = `processed_${tool.id}.pdf`;
      let originalTotalSize = files.reduce((acc, f) => acc + f.size, 0);

      await new Promise((res) => setTimeout(res, 300));
      setProcessingState({ stage: 'processing', progress: 75, message: `Processing with ${tool.title}...` });

      const firstFile = files[0]?.file;

      if (tool.id === 'merge-pdf') {
        const rawFiles = files.map((f) => f.file);
        outputBytes = await pdfEngine.mergePDFs(rawFiles);
        outputFilename = 'merged_document.pdf';
      } else if (tool.id === 'split-pdf') {
        const splitResults = await pdfEngine.splitPDF(firstFile, { mode: splitMode, ranges: splitRanges });
        if (splitResults.length === 1) {
          outputBytes = splitResults[0].bytes;
          outputFilename = splitResults[0].name;
        } else {
          outputBlob = await pdfEngine.createZipFile(splitResults);
          outputFilename = `${firstFile.name.replace(/\.[^/.]+$/, '')}_split_pages.zip`;
        }
      } else if (tool.id === 'compress-pdf') {
        const compRes = await pdfEngine.compressPDF(firstFile, compressLevel);
        outputBytes = compRes.bytes;
        outputFilename = `compressed_${firstFile.name}`;
      } else if (tool.id === 'jpg-to-pdf' || tool.id === 'png-to-pdf') {
        const rawFiles = files.map((f) => f.file);
        outputBytes = await pdfEngine.imagesToPDF(rawFiles, { pageSize, orientation });
        outputFilename = 'converted_images.pdf';
      } else if (tool.id === 'pdf-to-jpg' || tool.id === 'pdf-to-png') {
        const format = tool.id === 'pdf-to-png' ? 'png' : 'jpg';
        const imgResults = await pdfEngine.pdfToImages(firstFile, format);
        if (imgResults.length === 1) {
          outputBlob = imgResults[0].blob;
          outputFilename = imgResults[0].name;
        } else {
          const zipList = imgResults.map((item) => ({ name: item.name, bytes: new Uint8Array() }));
          for (let i = 0; i < imgResults.length; i++) {
            const ab = await imgResults[i].blob.arrayBuffer();
            zipList[i].bytes = new Uint8Array(ab);
          }
          outputBlob = await pdfEngine.createZipFile(zipList);
          outputFilename = `${firstFile.name.replace(/\.[^/.]+$/, '')}_images.zip`;
        }
      } else if (tool.id === 'rotate-pdf') {
        outputBytes = await pdfEngine.rotatePDF(firstFile, rotationAngle);
        outputFilename = `rotated_${firstFile.name}`;
      } else if (tool.id === 'watermark-pdf') {
        outputBytes = await pdfEngine.watermarkPDF(firstFile, {
          type: 'text',
          text: watermarkText,
          color: watermarkColor,
          opacity: watermarkOpacity,
          rotation: watermarkRotation
        });
        outputFilename = `watermarked_${firstFile.name}`;
      } else if (tool.id === 'page-numbers') {
        outputBytes = await pdfEngine.addPageNumbers(firstFile, {
          position: pageNumPos,
          format: pageNumFormat
        });
        outputFilename = `numbered_${firstFile.name}`;
      } else if (tool.id === 'protect-pdf') {
        if (!protectPassword || !protectPassword.trim()) {
          throw new Error('Please enter a password in the password box above to protect your PDF.');
        }
        outputBytes = await pdfEngine.protectPDF(firstFile, protectPassword.trim());
        outputFilename = `protected_${firstFile.name}`;
      } else if (tool.id === 'unlock-pdf') {
        if (!unlockPassword || !unlockPassword.trim()) {
          throw new Error('This PDF is password-protected. Please enter the password in the box above to unlock it.');
        }
        outputBytes = await pdfEngine.unlockPDF(firstFile, unlockPassword.trim());
        outputFilename = `unlocked_${firstFile.name}`;
      } else if (tool.id === 'pdf-metadata') {
        outputBytes = await pdfEngine.updatePDFMetadata(firstFile, {
          title: metaTitle || undefined,
          author: metaAuthor || undefined
        });
        outputFilename = `metadata_updated_${firstFile.name}`;
      } else if (tool.id === 'pdf-to-text') {
        const textStr = await pdfEngine.extractPDFText(firstFile);
        outputBlob = new Blob([textStr], { type: 'text/plain' });
        outputFilename = `${firstFile.name.replace(/\.[^/.]+$/, '')}.txt`;
      } else if (tool.id === 'ocr-pdf' || tool.id === 'image-ocr') {
        const textStr = await pdfEngine.runOCR(firstFile, ocrLang, (progress) => {
          setProcessingState({ stage: 'processing', progress, message: `OCR Scanning (${progress}%)...` });
        });
        outputBlob = new Blob([textStr], { type: 'text/plain' });
        outputFilename = `ocr_extracted_${firstFile.name.replace(/\.[^/.]+$/, '')}.txt`;
      } else if (tool.id === 'pdf-to-word') {
        outputBlob = await pdfEngine.pdfToWord(firstFile);
        outputFilename = `${firstFile.name.replace(/\.[^/.]+$/, '')}.docx`;
      } else if (tool.id === 'word-to-pdf') {
        outputBytes = await pdfEngine.wordToPDF(firstFile);
        outputFilename = `${firstFile.name.replace(/\.[^/.]+$/, '')}.pdf`;
      } else if (tool.id === 'pdf-to-excel') {
        outputBlob = await pdfEngine.pdfToExcel(firstFile);
        outputFilename = `${firstFile.name.replace(/\.[^/.]+$/, '')}.xlsx`;
      } else if (tool.id === 'excel-to-pdf') {
        outputBytes = await pdfEngine.excelToPDF(firstFile);
        outputFilename = `${firstFile.name.replace(/\.[^/.]+$/, '')}.pdf`;
      } else if (tool.id === 'html-to-pdf') {
        outputBytes = await pdfEngine.htmlToPDF(rawHtmlContent);
        outputFilename = 'document_from_html.pdf';
        originalTotalSize = new Blob([rawHtmlContent]).size;
      } else if (tool.id === 'text-to-pdf') {
        outputBytes = await pdfEngine.textToPDF(rawTextContent);
        outputFilename = 'document_from_text.pdf';
        originalTotalSize = new Blob([rawTextContent]).size;
      } else if (tool.id === 'repair-pdf') {
        outputBytes = await pdfEngine.repairPDF(firstFile);
        outputFilename = `repaired_${firstFile.name}`;
      } else if (tool.id === 'flatten-pdf') {
        outputBytes = await pdfEngine.flattenPDF(firstFile);
        outputFilename = `flattened_${firstFile.name}`;
      } else if (tool.id === 'compare-pdf') {
        if (!secondFile[0]?.file) throw new Error('Please upload both Document 1 and Document 2 to compare.');
        const diffData = await pdfEngine.comparePDFs(firstFile, secondFile[0].file);
        setCompareResultData(diffData);
        setProcessingState(null);
        return;
      } else {
        const ab = await firstFile.arrayBuffer();
        outputBytes = new Uint8Array(ab);
      }

      setProcessingState({ stage: 'finalizing', progress: 95, message: 'Finalizing document output...' });
      await new Promise((res) => setTimeout(res, 200));

      const finalBlob = outputBlob || new Blob([outputBytes!], { type: 'application/pdf' });
      const duration = Date.now() - startTime;

      setResult({
        filename: outputFilename,
        size: finalBlob.size,
        originalSize: Math.max(originalTotalSize, finalBlob.size),
        processingTimeMs: duration,
        blob: finalBlob
      });

      addJobToHistory({
        toolId: tool.id,
        toolTitle: tool.title,
        filename: outputFilename,
        originalSize: Math.max(originalTotalSize, finalBlob.size),
        outputSize: finalBlob.size
      });

      setProcessingState({ stage: 'completed', progress: 100, message: 'Done!' });
      const newCount = incrementUsageCount();
      setUsageCount(newCount);
      if (newCount >= MAX_FREE_USAGE) {
        setShowLimitModal(true);
      }
    } catch (err: any) {
      console.error('Processing Error:', err);
      setProcessingState({
        stage: 'error',
        progress: 0,
        message: 'Processing failed',
        error: err.message || 'An unexpected error occurred.'
      });
    }
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonicalUrl={canonicalUrl}
        jsonLd={jsonLd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Back & Title Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Tools
          </button>

          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Icon name={tool.iconName} className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {seoH1}
            </h1>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {tool.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-2">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /> 100% Secure & Private</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-500" /> No Registration Needed</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-purple-500" /> Auto-Deletes in 1 Hour</span>
          </div>
        </div>

        {/* WORKFLOW PIPELINE: Upload -> Options -> Processing -> Result */}
        {result ? (
          <ResultCard
            result={result}
            onProcessAnother={() => {
              setResult(null);
              setProcessingState(null);
              setFiles([]);
            }}
            onGoHome={onGoHome}
          />
        ) : processingState ? (
          <ProcessingStateUI
            stage={processingState.stage}
            progress={processingState.progress}
            message={processingState.message}
            error={processingState.error}
            onRetry={() => {
              setProcessingState(null);
              handleStartProcess();
            }}
          />
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Compare PDF Dual Upload */}
            {tool.id === 'compare-pdf' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Document 1 (Original)</h3>
                  <FileUploader
                    files={files}
                    onFilesChange={setFiles}
                    acceptedTypes={['.pdf']}
                    multiple={false}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Document 2 (Modified)</h3>
                  <FileUploader
                    files={secondFile}
                    onFilesChange={setSecondFile}
                    acceptedTypes={['.pdf']}
                    multiple={false}
                  />
                </div>
              </div>
            ) : tool.id === 'text-to-pdf' ? (
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Text Content</label>
                <textarea
                  rows={8}
                  value={rawTextContent}
                  onChange={(e) => setRawTextContent(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : tool.id === 'html-to-pdf' ? (
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">HTML Code</label>
                <textarea
                  rows={8}
                  value={rawHtmlContent}
                  onChange={(e) => setRawHtmlContent(e.target.value)}
                  className="w-full p-4 font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <FileUploader
                files={files}
                onFilesChange={setFiles}
                acceptedTypes={tool.acceptedFileTypes}
                multiple={tool.maxFiles ? tool.maxFiles > 1 : true}
                maxFiles={tool.maxFiles}
              />
            )}

            {/* Interactive Tool Special Editors */}
            {files.length > 0 && files[0].file && (
              <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                {/* Visual Page Organizer View */}
                {['organize-pdf', 'extract-pages', 'delete-pages', 'rearrange-pages'].includes(tool.id) && (
                  <VisualPageOrganizer
                    file={files[0].file}
                    mode={tool.id.includes('extract') ? 'extract' : 'organize'}
                    onApply={async (pageOrder, rotations, selectedPages) => {
                      if (hasReachedLimit()) {
                        setShowLimitModal(true);
                        return;
                      }
                      const startTime = Date.now();
                      setProcessingState({ stage: 'processing', progress: 80, message: 'Generating page layout...' });
                      const bytes = await pdfEngine.organizePDF(files[0].file, {
                        pageOrder: tool.id.includes('extract') ? selectedPages : pageOrder,
                        rotations
                      });
                      setResult({
                        filename: `organized_${files[0].name}`,
                        size: bytes.byteLength,
                        originalSize: files[0].size,
                        processingTimeMs: Date.now() - startTime,
                        blob: new Blob([bytes], { type: 'application/pdf' })
                      });
                      addJobToHistory({
                        toolId: tool.id,
                        toolTitle: tool.title,
                        filename: `organized_${files[0].name}`,
                        originalSize: files[0].size,
                        outputSize: bytes.byteLength
                      });
                      setProcessingState({ stage: 'completed', progress: 100, message: 'Done!' });
                      const newCount = incrementUsageCount();
                      setUsageCount(newCount);
                      if (newCount >= MAX_FREE_USAGE) {
                        setShowLimitModal(true);
                      }
                    }}
                  />
                )}

                {/* PDF Editor View */}
                {tool.id === 'pdf-editor' && (
                  <PDFEditorCanvas
                    file={files[0].file}
                    onSave={async (overlays) => {
                      if (hasReachedLimit()) {
                        setShowLimitModal(true);
                        return;
                      }
                      const startTime = Date.now();
                      setProcessingState({ stage: 'processing', progress: 80, message: 'Burning editor annotations into PDF...' });
                      const bytes = await pdfEngine.applyPDFEditorOverlays(files[0].file, overlays as any);
                      setResult({
                        filename: `edited_${files[0].name}`,
                        size: bytes.byteLength,
                        originalSize: files[0].size,
                        processingTimeMs: Date.now() - startTime,
                        blob: new Blob([bytes], { type: 'application/pdf' })
                      });
                      addJobToHistory({
                        toolId: tool.id,
                        toolTitle: tool.title,
                        filename: `edited_${files[0].name}`,
                        originalSize: files[0].size,
                        outputSize: bytes.byteLength
                      });
                      setProcessingState({ stage: 'completed', progress: 100, message: 'Done!' });
                      const newCount = incrementUsageCount();
                      setUsageCount(newCount);
                      if (newCount >= MAX_FREE_USAGE) {
                        setShowLimitModal(true);
                      }
                    }}
                  />
                )}

                {/* Sign PDF View */}
                {tool.id === 'sign-pdf' && (
                  !activeSignatureUrl ? (
                    <SignaturePad
                      onSignatureDone={(sigDataUrl) => {
                        setActiveSignatureUrl(sigDataUrl);
                      }}
                    />
                  ) : (
                    <SignaturePlacer
                      file={files[0].file}
                      signatureDataUrl={activeSignatureUrl}
                      onChangeSignature={() => setActiveSignatureUrl(null)}
                      onApplySignature={async (placement) => {
                        if (hasReachedLimit()) {
                          setShowLimitModal(true);
                          return;
                        }
                        const startTime = Date.now();
                        setProcessingState({ stage: 'processing', progress: 80, message: 'Applying signature stamp to document...' });
                        try {
                          const bytes = await pdfEngine.signPDF(files[0].file, activeSignatureUrl, placement);
                          setResult({
                            filename: `signed_${files[0].name}`,
                            size: bytes.byteLength,
                            originalSize: files[0].size,
                            processingTimeMs: Date.now() - startTime,
                            blob: new Blob([bytes], { type: 'application/pdf' })
                          });
                          addJobToHistory({
                            toolId: tool.id,
                            toolTitle: tool.title,
                            filename: `signed_${files[0].name}`,
                            originalSize: files[0].size,
                            outputSize: bytes.byteLength
                          });
                          setProcessingState({ stage: 'completed', progress: 100, message: 'Done!' });
                          const newCount = incrementUsageCount();
                          setUsageCount(newCount);
                          if (newCount >= MAX_FREE_USAGE) {
                            setShowLimitModal(true);
                          }
                        } catch (err: any) {
                          setProcessingState({
                            stage: 'error',
                            progress: 0,
                            message: 'Failed to sign PDF',
                            error: err.message || 'Error embedding signature.'
                          });
                        }
                      }}
                    />
                  )
                )}

                {/* Watermark PDF Control Options */}
                {tool.id === 'watermark-pdf' && (
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6 max-w-xl mx-auto text-left shadow-lg">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                      <Sliders className="w-5 h-5 text-blue-600" />
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                        Watermark Settings / ওয়াটারমার্কের সেটিংস
                      </h3>
                    </div>

                    {/* Custom Watermark Text Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Watermark Text / ওয়াটারমার্কের লেখা:
                      </label>
                      <input
                        type="text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="Enter watermark text (e.g. CONFIDENTIAL, গোপনীয়)..."
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Watermark Color & Opacity Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Color Selection */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Color / রঙ:
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={watermarkColor}
                            onChange={(e) => setWatermarkColor(e.target.value)}
                            className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 shrink-0"
                          />
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {['#3b82f6', '#ef4444', '#10b981', '#6b7280', '#000000', '#8b5cf6'].map((hex) => (
                              <button
                                key={hex}
                                type="button"
                                onClick={() => setWatermarkColor(hex)}
                                style={{ backgroundColor: hex }}
                                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                                  watermarkColor === hex ? 'border-blue-500 scale-110 shadow-md' : 'border-white dark:border-slate-800'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Opacity Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                          <span>Transparency / স্বচ্ছতা:</span>
                          <span>{Math.round(watermarkOpacity * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={watermarkOpacity}
                          onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>
                    </div>

                    {/* Rotation Angle */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Rotation Angle / কোণ:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { label: 'Diagonal 45°', val: 45 },
                          { label: 'Reverse -45°', val: -45 },
                          { label: 'Horizontal 0°', val: 0 },
                          { label: 'Vertical 90°', val: 90 }
                        ].map((rot) => (
                          <button
                            key={rot.val}
                            type="button"
                            onClick={() => setWatermarkRotation(rot.val)}
                            className={`py-2 px-2 text-xs font-bold rounded-xl border transition-colors ${
                              watermarkRotation === rot.val
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {rot.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live Preview Card */}
                    <div className="p-6 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-center relative overflow-hidden h-28 flex items-center justify-center">
                      <span className="text-xs text-slate-400 absolute top-2 left-3 font-semibold uppercase tracking-wider">
                        Live Watermark Preview
                      </span>
                      <span
                        style={{
                          color: watermarkColor,
                          opacity: watermarkOpacity,
                          transform: `rotate(${watermarkRotation}deg)`
                        }}
                        className="font-black text-2xl tracking-widest uppercase select-none transition-all duration-200"
                      >
                        {watermarkText || 'WATERMARK'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Standard Options Controls */}
                {tool.id === 'compress-pdf' && (
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-600" /> Choose Compression Level
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'recommended', label: 'Recommended', desc: 'Good quality, balanced compression' },
                        { id: 'extreme', label: 'Extreme', desc: 'Smaller size, maximum compression' },
                        { id: 'less', label: 'Less Compression', desc: 'High quality, minor reduction' }
                      ].map((lvl) => (
                        <div
                          key={lvl.id}
                          onClick={() => setCompressLevel(lvl.id as any)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            compressLevel === lvl.id
                              ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500/30'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{lvl.label}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{lvl.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tool.id === 'protect-pdf' && (
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 max-w-md mx-auto text-left">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-blue-500" />
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Set PDF Password / পাসওয়ার্ড সেট করুন</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Enter a password to protect your document with AES-256 encryption.
                    </p>
                    <div className="relative">
                      <input
                        type={showProtectPass ? "text" : "password"}
                        value={protectPassword}
                        onChange={(e) => setProtectPassword(e.target.value)}
                        placeholder="Enter encryption password..."
                        className="w-full pl-4 pr-11 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowProtectPass(!showProtectPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showProtectPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {tool.id === 'unlock-pdf' && (
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 max-w-md mx-auto text-left">
                    <div className="flex items-center gap-2">
                      <Key className="w-5 h-5 text-amber-500" />
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Enter PDF Password / পাসওয়ার্ড দিন</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Enter the existing password of the protected PDF to unlock it.
                    </p>
                    <div className="relative">
                      <input
                        type={showUnlockPass ? "text" : "password"}
                        value={unlockPassword}
                        onChange={(e) => setUnlockPassword(e.target.value)}
                        placeholder="Enter current password..."
                        className="w-full pl-4 pr-11 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowUnlockPass(!showUnlockPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showUnlockPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {tool.id === 'ocr-pdf' && (
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 max-w-md mx-auto">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Select OCR Language</h3>
                    <select
                      value={ocrLang}
                      onChange={(e) => setOcrLang(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    >
                      <option value="eng">English (eng)</option>
                      <option value="ben">Bengali (ben)</option>
                      <option value="spa">Spanish (spa)</option>
                      <option value="fra">French (fra)</option>
                      <option value="deu">German (deu)</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Render Action Button if not using custom inline save */}
            {!['organize-pdf', 'extract-pages', 'delete-pages', 'rearrange-pages', 'pdf-editor', 'sign-pdf'].includes(tool.id) && (
              <button
                onClick={handleStartProcess}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Sparkles className="w-5 h-5" /> Process {tool.title}
              </button>
            )}

            {/* Render Comparison Results view if available */}
            {compareResultData && (
              <CompareDiffView
                doc1Name={files[0]?.name || 'Doc 1'}
                doc2Name={secondFile[0]?.name || 'Doc 2'}
                text1={compareResultData.text1}
                text2={compareResultData.text2}
                pageCount1={compareResultData.pageCount1}
                pageCount2={compareResultData.pageCount2}
              />
            )}
          </div>
        )}

        {/* HOW TO USE GUIDE */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" /> How to use {tool.title}
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {tool.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* TOOL FAQS */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" /> Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {tool.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{faq.question}</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SPONSORED AD SLOT */}
        <div className="max-w-4xl mx-auto">
          <AdSlot type="banner" />
        </div>

        {/* RELATED TOOLS */}
        {relatedTools.length > 0 && (
          <div className="space-y-6 max-w-7xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Related PDF Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedTools.map((t) => (
                <ToolCard key={t.id} tool={t} onClick={() => onSelectTool(t)} />
              ))}
            </div>
          </div>
        )}

        {/* BRAND ENTITY ATTRIBUTION FOOTER */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center max-w-4xl mx-auto leading-relaxed">
          <strong>SRA PDF — Online Suite</strong> is developed by <strong>SRA Digital Labs</strong>, founded by <strong>Sahadatur Rahman Anik</strong>. Designed for fast, secure, browser-based document processing.
        </div>
      </div>

      <UsageLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onSelectFree={() => {
          resetUsageCount();
          setUsageCount(0);
          setShowLimitModal(false);
        }}
        onNavigate={(path) => {
          setShowLimitModal(false);
          if (path === '/') onGoHome();
        }}
      />
    </>
  );
};
