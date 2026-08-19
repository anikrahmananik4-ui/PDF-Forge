import React, { useRef, useState } from 'react';
import { PenTool, Upload, Type, RotateCcw, Check } from 'lucide-react';

interface SignaturePadProps {
  onSignatureDone: (dataUrl: string) => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSignatureDone }) => {
  const [tab, setTab] = useState<'draw' | 'type' | 'upload'>('draw');
  const [typedName, setTypedName] = useState('John Doe');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const rect = canvas.getBoundingClientRect();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const rect = canvas.getBoundingClientRect();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSave = () => {
    if (tab === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        onSignatureDone(dataUrl);
      }
    } else if (tab === 'type') {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 150;
      const ctx = canvas.getContext('2d')!;
      ctx.font = 'italic 48px cursive';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(typedName, 200, 75);

      onSignatureDone(canvas.toDataURL('image/png'));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSignatureDone(String(event.target.result));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl space-y-6 max-w-lg mx-auto">
      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-700/60 p-1 rounded-2xl">
        <button
          onClick={() => setTab('draw')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
            tab === 'draw' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" /> Draw
        </button>
        <button
          onClick={() => setTab('type')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
            tab === 'type' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <Type className="w-3.5 h-3.5" /> Type
        </button>
        <button
          onClick={() => setTab('upload')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
            tab === 'upload' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <Upload className="w-3.5 h-3.5" /> Upload Image
        </button>
      </div>

      {/* Tab Contents */}
      {tab === 'draw' && (
        <div className="space-y-3">
          <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl bg-slate-50 dark:bg-slate-900 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={440}
              height={180}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-44 cursor-crosshair block"
            />
          </div>
          <div className="flex justify-between items-center text-xs">
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 text-slate-500 hover:text-red-500 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear Canvas
            </button>
            <span className="text-slate-400">Draw using mouse or touch</span>
          </div>
        </div>
      )}

      {tab === 'type' && (
        <div className="space-y-4">
          <input
            type="text"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            placeholder="Enter your full name..."
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="p-8 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white text-center">
            <span className="font-serif italic text-3xl text-slate-900 font-bold tracking-wide">
              {typedName || 'Your Signature'}
            </span>
          </div>
        </div>
      )}

      {tab === 'upload' && (
        <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl text-center space-y-3">
          <Upload className="w-8 h-8 text-blue-500 mx-auto" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Upload Signature Image (PNG or JPG)
          </p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      )}

      {tab !== 'upload' && (
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-colors"
        >
          <Check className="w-4 h-4" /> Apply Signature
        </button>
      )}
    </div>
  );
};
