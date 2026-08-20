import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Check, RotateCcw, Move, ZoomIn, ZoomOut, FileCheck } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

interface SignaturePlacerProps {
  file: File;
  signatureDataUrl: string;
  onApplySignature: (placement: {
    pageIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
  onChangeSignature: () => void;
}

export const SignaturePlacer: React.FC<SignaturePlacerProps> = ({
  file,
  signatureDataUrl,
  onApplySignature,
  onChangeSignature
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 600, height: 800 });
  const [pdfPagePt, setPdfPagePt] = useState<{ width: number; height: number }>({ width: 595.28, height: 841.89 });

  // Signature Overlay State in canvas pixels
  const [sigPos, setSigPos] = useState<{ x: number; y: number }>({ x: 200, y: 500 });
  const [sigSize, setSigSize] = useState<{ width: number; height: number }>({ width: 180, height: 75 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    async function renderPage() {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const cMapUrl = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`;
        const standardFontDataUrl = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/standard_fonts/`;

        const pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
          cMapUrl,
          cMapPacked: true,
          standardFontDataUrl
        }).promise;

        if (!active) return;
        setTotalPages(pdf.numPages);

        const page = await pdf.getPage(currentPage + 1);
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        setPdfPagePt({ width: unscaledViewport.width, height: unscaledViewport.height });

        // Display scale factor (responsive to container width max ~650px)
        const targetWidth = Math.min(650, window.innerWidth - 60);
        const scale = targetWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale });

        setCanvasSize({ width: viewport.width, height: viewport.height });

        if (canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d')!;

          await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
        }
      } catch (err) {
        console.error('Error rendering page for signature placement:', err);
      }
    }

    renderPage();

    return () => {
      active = false;
    };
  }, [file, currentPage]);

  // Center signature on first render or page change
  useEffect(() => {
    setSigPos({
      x: Math.max(20, (canvasSize.width - sigSize.width) / 2),
      y: Math.max(20, canvasSize.height - sigSize.height - 100)
    });
  }, [canvasSize.width, canvasSize.height]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - sigPos.x,
        y: e.clientY - rect.top - sigPos.y
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;

      // Clamp inside canvas bounds
      const clampedX = Math.max(0, Math.min(newX, canvasSize.width - sigSize.width));
      const clampedY = Math.max(0, Math.min(newY, canvasSize.height - sigSize.height));

      setSigPos({ x: clampedX, y: clampedY });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const newX = Math.max(0, Math.min(clickX - sigSize.width / 2, canvasSize.width - sigSize.width));
      const newY = Math.max(0, Math.min(clickY - sigSize.height / 2, canvasSize.height - sigSize.height));

      setSigPos({ x: newX, y: newY });
    }
  };

  const handleResizeSig = (delta: number) => {
    const newWidth = Math.max(80, Math.min(350, sigSize.width + delta));
    const newHeight = newWidth * (75 / 180); // preserve aspect ratio
    setSigSize({ width: newWidth, height: newHeight });
  };

  const handleConfirmPlacement = () => {
    const scaleX = pdfPagePt.width / canvasSize.width;
    const scaleY = pdfPagePt.height / canvasSize.height;

    onApplySignature({
      pageIndex: currentPage,
      x: sigPos.x * scaleX,
      y: sigPos.y * scaleY,
      width: sigSize.width * scaleX,
      height: sigSize.height * scaleY
    });
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl space-y-6 max-w-2xl mx-auto text-left">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-600" /> Position Signature / স্বাক্ষর বসান
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Drag or click on the page to place your signature anywhere.
          </p>
        </div>

        <button
          onClick={onChangeSignature}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Re-draw Signature
        </button>
      </div>

      {/* Toolbar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
        {/* Page Switcher */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <button
            disabled={currentPage <= 0}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Signature Size Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Signature Size:</span>
          <button
            onClick={() => handleResizeSig(-20)}
            className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            title="Decrease Signature Size"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleResizeSig(20)}
            className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            title="Increase Signature Size"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Page View Stage */}
      <div className="flex justify-center bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl overflow-auto border border-slate-200/80 dark:border-slate-700/80">
        <div
          ref={containerRef}
          onClick={handleCanvasClick}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative shadow-2xl rounded-lg overflow-hidden cursor-crosshair select-none bg-white"
          style={{ width: canvasSize.width, height: canvasSize.height }}
        >
          <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />

          {/* Draggable Signature Overlay Box */}
          <div
            onPointerDown={handlePointerDown}
            style={{
              left: `${sigPos.x}px`,
              top: `${sigPos.y}px`,
              width: `${sigSize.width}px`,
              height: `${sigSize.height}px`
            }}
            className={`absolute cursor-grab active:cursor-grabbing border-2 border-dashed rounded-lg flex items-center justify-center transition-shadow ${
              isDragging
                ? 'border-blue-600 bg-blue-500/20 shadow-2xl scale-105'
                : 'border-blue-500 bg-blue-500/10 hover:border-blue-600 hover:bg-blue-500/15 shadow-md'
            }`}
          >
            <img
              src={signatureDataUrl}
              alt="Signature Stamp"
              className="w-full h-full object-contain pointer-events-none drop-shadow"
            />
            <div className="absolute -top-3 -right-3 bg-blue-600 text-white p-1 rounded-full shadow-lg">
              <Move className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleConfirmPlacement}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
      >
        <Check className="w-5 h-5" /> Apply Signature to PDF / ডকুমেন্টে স্বাক্ষর সম্পাদন করুন
      </button>
    </div>
  );
};
