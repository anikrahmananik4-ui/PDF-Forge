import React, { useEffect, useRef, useState } from 'react';
import { Type, Square, Eraser, Trash2, Save, Undo, Redo } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

export interface OverlayItem {
  id: string;
  pageIndex: number;
  type: 'text' | 'whiteout' | 'shape';
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  color?: string;
  fontSize?: number;
}

interface PDFEditorCanvasProps {
  file: File;
  onSave: (overlays: OverlayItem[]) => void;
}

export const PDFEditorCanvas: React.FC<PDFEditorCanvasProps> = ({ file, onSave }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTool, setActiveTool] = useState<'text' | 'whiteout' | 'shape'>('text');
  const [color, setColor] = useState('#3b82f6');
  const [fontSize, setFontSize] = useState(18);
  const [textInput, setTextInput] = useState('Sample Text');
  const [overlays, setOverlays] = useState<OverlayItem[]>([]);
  const [pageViewport, setPageViewport] = useState<{ width: number; height: number }>({ width: 595, height: 842 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let active = true;

    async function renderPDFPage() {
      try {
        const ab = await file.arrayBuffer();
        const cMapUrl = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`;
        const standardFontDataUrl = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/standard_fonts/`;
        const pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(ab),
          cMapUrl,
          cMapPacked: true,
          standardFontDataUrl
        }).promise;
        if (!active) return;
        setTotalPages(pdf.numPages);

        const page = await pdf.getPage(currentPage + 1);
        const viewport = page.getViewport({ scale: 1.2 });
        setPageViewport({ width: viewport.width, height: viewport.height });

        if (canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d')!;

          await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
        }
      } catch (err) {
        console.error('Error rendering page in editor:', err);
      }
    }

    renderPDFPage();

    return () => {
      active = false;
    };
  }, [file, currentPage]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newOverlay: OverlayItem = {
      id: `overlay-${Date.now()}-${Math.random()}`,
      pageIndex: currentPage,
      type: activeTool,
      x,
      y,
      color,
      fontSize,
      text: activeTool === 'text' ? textInput : undefined,
      width: activeTool === 'whiteout' ? 120 : activeTool === 'shape' ? 100 : undefined,
      height: activeTool === 'whiteout' ? 30 : activeTool === 'shape' ? 60 : undefined
    };

    setOverlays([...overlays, newOverlay]);
  };

  const removeOverlay = (id: string) => {
    setOverlays(overlays.filter((o) => o.id !== id));
  };

  const currentPageOverlays = overlays.filter((o) => o.pageIndex === currentPage);

  return (
    <div className="space-y-6">
      {/* Editor Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 text-white rounded-2xl shadow-xl">
        {/* Tool Selectors */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTool('text')}
            className={`p-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors ${
              activeTool === 'text' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Type className="w-4 h-4" /> Text
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('whiteout')}
            className={`p-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors ${
              activeTool === 'whiteout' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eraser className="w-4 h-4" /> Whiteout
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('shape')}
            className={`p-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors ${
              activeTool === 'shape' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Square className="w-4 h-4" /> Rectangle
          </button>
        </div>

        {/* Dynamic Tool Config */}
        {activeTool === 'text' && (
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type text to insert..."
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              title="Text Color"
            />
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
            >
              <option value={12}>12px</option>
              <option value={16}>16px</option>
              <option value={20}>20px</option>
              <option value={24}>24px</option>
              <option value={32}>32px</option>
            </select>
          </div>
        )}

        {/* Page Switcher & Save */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <button
              disabled={currentPage <= 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-2.5 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-40"
            >
              Prev
            </button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-2.5 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>

          <button
            onClick={() => onSave(overlays)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" /> Save PDF
          </button>
        </div>
      </div>

      {/* Editor Stage Area */}
      <div className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 overflow-x-auto">
        <div
          onClick={handleCanvasClick}
          className="relative cursor-crosshair border border-slate-300 dark:border-slate-700 shadow-2xl bg-white rounded-lg overflow-hidden"
          style={{ width: pageViewport.width, height: pageViewport.height }}
        >
          <canvas ref={canvasRef} className="block w-full h-full" />

          {/* Render Overlays on top of page */}
          {currentPageOverlays.map((item) => (
            <div
              key={item.id}
              className="absolute group border border-dashed border-blue-500 hover:border-red-500 rounded p-1 cursor-pointer bg-white/20 backdrop-blur-[1px]"
              style={{
                left: item.x,
                top: item.y,
                width: item.width,
                height: item.height
              }}
            >
              {item.type === 'text' && (
                <span
                  style={{
                    color: item.color,
                    fontSize: `${item.fontSize}px`,
                    fontWeight: 'bold',
                    lineHeight: 1
                  }}
                >
                  {item.text}
                </span>
              )}

              {item.type === 'whiteout' && (
                <div
                  className="w-full h-full bg-white border border-slate-300"
                  style={{ width: item.width, height: item.height }}
                ></div>
              )}

              {item.type === 'shape' && (
                <div
                  className="w-full h-full border-2"
                  style={{
                    borderColor: item.color,
                    width: item.width,
                    height: item.height
                  }}
                ></div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOverlay(item.id);
                }}
                className="absolute -top-3 -right-3 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          Click anywhere on the PDF page to place your selected tool ({activeTool})
        </p>
      </div>
    </div>
  );
};
