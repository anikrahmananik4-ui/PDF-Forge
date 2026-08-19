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
import { CompareDiffView } from '../components/CompareDiffView';
import { ArrowLeft, Sparkles, Sliders } from 'lucide-react';

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
  const [metaTitle, setMetaTitle] = useState('');
  const [metaAuthor, setMetaAuthor] = useState('');
  const [ocrLang, setOcrLang] = useState('eng');
  const [rawTextContent, setRawTextContent] = useState('Sample document text content...');
  const [rawHtmlContent, setRawHtmlContent] = useState('<h1>Document Title</h1><p>Sample HTML content...</p>');

  // Extra Compare state
  const [compareResultData, setCompareResultData] = useState<{ text1: string; text2: string; pageCount1: number; pageCount2: number } | null>(null);

  const relatedTools = PDF_TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  const handleStartProcess = async () => {
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
          // Convert blob to bytes for ZIP
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
        if (!protectPassword) throw new Error('Please enter a password to protect the PDF.');
        outputBytes = await pdfEngine.protectPDF(firstFile, protectPassword);
        outputFilename = `protected_${firstFile.name}`;
      } else if (tool.id === 'unlock-pdf') {
        outputBytes = await pdfEngine.unlockPDF(firstFile, unlockPassword);
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
        // Fallback pass-through
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

      setProcessingState({ stage: 'completed', progress: 100, message: 'Done!' });
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back & Title Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tools
        </button>

        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Icon name={tool.iconName} className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {tool.title}
          </h1>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {tool.description}
        </p>
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
                    setProcessingState({ stage: 'completed', progress: 100, message: 'Done!' });
                  }}
                />
              )}

              {/* PDF Editor View */}
              {tool.id === 'pdf-editor' && (
                <PDFEditorCanvas
                  file={files[0].file}
                  onSave={async (overlays) => {
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
                    setProcessingState({ stage: 'completed', progress: 100, message: 'Done!' });
                  }}
                />
              )}

              {/* Sign PDF View */}
              {tool.id === 'sign-pdf' && (
                <SignaturePad
                  onSignatureDone={async (sigDataUrl) => {
                    const startTime = Date.now();
                    setProcessingState({ stage: 'processing', progress: 80, message: 'Applying signature stamp...' });
                    const bytes = await pdfEngine.signPDF(files[0].file, sigDataUrl, {
                      pageIndex: 0,
                      x: 100,
                      y: 100,
                      width: 200,
                      height: 80
                    });
                    setResult({
                      filename: `signed_${files[0].name}`,
                      size: bytes.byteLength,
                      originalSize: files[0].size,
                      processingTimeMs: Date.now() - startTime,
                      blob: new Blob([bytes], { type: 'application/pdf' })
                    });
                    setProcessingState({ stage: 'completed', progress: 100, message: 'Done!' });
                  }}
                />
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
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 max-w-md mx-auto">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Set PDF Password</h3>
                  <input
                    type="password"
                    value={protectPassword}
                    onChange={(e) => setProtectPassword(e.target.value)}
                    placeholder="Enter strong password..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>
              )}

              {tool.id === 'unlock-pdf' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 max-w-md mx-auto">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Enter PDF Password</h3>
                  <input
                    type="password"
                    value={unlockPassword}
                    onChange={(e) => setUnlockPassword(e.target.value)}
                    placeholder="Enter current password..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
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
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">How to use {tool.title}</h3>
        <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {tool.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>

      {/* TOOL FAQS */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {tool.faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{faq.question}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>
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
    </div>
  );
};
