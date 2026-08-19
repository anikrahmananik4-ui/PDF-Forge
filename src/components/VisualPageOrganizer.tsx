import React, { useEffect, useState } from 'react';
import { RotateCw, Trash2, Copy, Move, Check } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

interface PageItem {
  id: string;
  originalPageNum: number; // 1-indexed
  rotation: number; // 0, 90, 180, 270
  selected: boolean;
  thumbnailUrl?: string;
}

interface VisualPageOrganizerProps {
  file: File;
  onApply: (pageOrder: number[], rotations: Record<number, number>, selectedPages: number[]) => void;
  mode?: 'organize' | 'extract' | 'delete' | 'rearrange';
}

export const VisualPageOrganizer: React.FC<VisualPageOrganizerProps> = ({
  file,
  onApply,
  mode = 'organize'
}) => {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    async function loadThumbnails() {
      setLoading(true);
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
        const total = pdf.numPages;

        const list: PageItem[] = [];

        for (let i = 1; i <= total; i++) {
          const pg = await pdf.getPage(i);
          const viewport = pg.getViewport({ scale: 0.3 });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d')!;

          await pg.render({ canvasContext: ctx, viewport, canvas } as any).promise;
          const thumbnailUrl = canvas.toDataURL('image/png');

          list.push({
            id: `page-${i}-${Math.random()}`,
            originalPageNum: i,
            rotation: 0,
            selected: mode === 'extract' ? false : true,
            thumbnailUrl
          });
        }

        if (active) {
          setPages(list);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error rendering thumbnails:', err);
        setLoading(false);
      }
    }

    loadThumbnails();

    return () => {
      active = false;
    };
  }, [file, mode]);

  const rotatePage = (index: number) => {
    const updated = [...pages];
    updated[index].rotation = (updated[index].rotation + 90) % 360;
    setPages(updated);
  };

  const deletePage = (index: number) => {
    if (pages.length <= 1) return;
    setPages(pages.filter((_, i) => i !== index));
  };

  const duplicatePage = (index: number) => {
    const item = pages[index];
    const newItem: PageItem = {
      ...item,
      id: `page-${item.originalPageNum}-dup-${Math.random()}`
    };
    const updated = [...pages];
    updated.splice(index + 1, 0, newItem);
    setPages(updated);
  };

  const toggleSelect = (index: number) => {
    const updated = [...pages];
    updated[index].selected = !updated[index].selected;
    setPages(updated);
  };

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    const updated = [...pages];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(targetIdx, 0, moved);
    setPages(updated);
    setDraggedIdx(targetIdx);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const handleSubmit = () => {
    const pageOrder = pages.map((p) => p.originalPageNum);
    const rotations: Record<number, number> = {};
    pages.forEach((p) => {
      if (p.rotation > 0) rotations[p.originalPageNum] = p.rotation;
    });
    const selectedPages = pages.filter((p) => p.selected).map((p) => p.originalPageNum);

    onApply(pageOrder, rotations, selectedPages);
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 dark:text-slate-400 space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-medium">Rendering PDF page thumbnails...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">
          Total Pages: <span className="font-bold text-slate-900 dark:text-white">{pages.length}</span>
          {mode === 'extract' && (
            <span className="ml-3 text-blue-600 dark:text-blue-400">
              Selected: {pages.filter((p) => p.selected).length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {mode === 'extract' && (
            <button
              onClick={() => setPages(pages.map((p) => ({ ...p, selected: true })))}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Select All
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md shadow-blue-600/20"
          >
            Apply & Save PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pages.map((page, idx) => (
          <div
            key={page.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            onClick={() => mode === 'extract' && toggleSelect(idx)}
            className={`group relative bg-white dark:bg-slate-800 border-2 rounded-2xl p-3 shadow-sm transition-all duration-200 cursor-move ${
              mode === 'extract' && page.selected
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/30'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
          >
            <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
              {page.thumbnailUrl ? (
                <img
                  src={page.thumbnailUrl}
                  alt={`Page ${idx + 1}`}
                  className="w-full h-full object-contain transition-transform"
                  style={{ transform: `rotate(${page.rotation}deg)` }}
                />
              ) : (
                <span className="text-xs text-slate-400">Page {page.originalPageNum}</span>
              )}

              {mode === 'extract' && (
                <div
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                    page.selected ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  {page.selected ? <Check className="w-3.5 h-3.5" /> : null}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                #{idx + 1} <span className="text-[10px] text-slate-400">(Orig P.{page.originalPageNum})</span>
              </span>

              <div className="flex items-center space-x-1 opacity-90 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    rotatePage(idx);
                  }}
                  className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                  title="Rotate page 90°"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicatePage(idx);
                  }}
                  className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                  title="Duplicate page"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePage(idx);
                  }}
                  className="p-1 text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                  title="Delete page"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
