import React, { useRef, useState } from 'react';
import { Upload, File, Trash2, Plus, AlertCircle, FileText, Image as ImageIcon } from 'lucide-react';
import { UploadedFile } from '../types/pdf';
import * as pdfjsLib from 'pdfjs-dist';

interface FileUploaderProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  acceptedTypes: string[]; // e.g. ['.pdf'], ['.jpg', '.png']
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMb?: number;
  title?: string;
  subtitle?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onFilesChange,
  acceptedTypes,
  multiple = false,
  maxFiles = 20,
  maxSizeMb = 50,
  title = 'Select or Drop Files Here',
  subtitle = 'Drag and drop files here, or click to browse'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processIncomingFiles = async (incomingList: FileList | File[]) => {
    setErrorMsg(null);
    const newFiles: UploadedFile[] = [...files];

    for (let i = 0; i < incomingList.length; i++) {
      const file = incomingList[i];

      // File size validation
      const fileSizeMb = file.size / (1024 * 1024);
      if (fileSizeMb > maxSizeMb) {
        setErrorMsg(`"${file.name}" exceeds maximum allowed file size of ${maxSizeMb}MB.`);
        continue;
      }

      // Check duplicate
      if (newFiles.some((f) => f.name === file.name && f.size === file.size)) {
        continue;
      }

      if (!multiple && newFiles.length >= 1) {
        // Replace if single file mode
        newFiles.length = 0;
      }

      if (multiple && newFiles.length >= maxFiles) {
        setErrorMsg(`Maximum limit of ${maxFiles} files reached.`);
        break;
      }

      let pageCount = undefined;
      let previewUrl = undefined;

      // Extract PDF page count or create image preview
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        try {
          const ab = await file.arrayBuffer();
          const pdfDoc = await pdfjsLib.getDocument({ data: new Uint8Array(ab) }).promise;
          pageCount = pdfDoc.numPages;
        } catch {
          // ignore error if encrypted
        }
      } else if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }

      newFiles.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        pageCount,
        previewUrl,
        rotation: 0
      });
    }

    onFilesChange(newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processIncomingFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processIncomingFiles(e.target.files);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = files.find((f) => f.id === id);
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    onFilesChange(files.filter((f) => f.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const acceptString = acceptedTypes.join(',');

  return (
    <div className="w-full space-y-4">
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 rounded-xl text-sm border border-red-200 dark:border-red-900">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {files.length === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700 hover:border-blue-500/70 hover:bg-slate-50/80 dark:hover:bg-slate-900/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={acceptString}
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Upload className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">{subtitle}</p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-2">
              <span className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-md shadow-blue-600/20">
                Browse Files
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
              Supports: {acceptedTypes.join(', ')} • Max size: {maxSizeMb}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {files.map((fileItem, idx) => (
              <div
                key={fileItem.id}
                className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 overflow-hidden">
                    {fileItem.previewUrl ? (
                      <img src={fileItem.previewUrl} alt="preview" className="w-full h-full object-cover" />
                    ) : fileItem.type === 'application/pdf' || fileItem.name.endsWith('.pdf') ? (
                      <FileText className="w-5 h-5 text-red-500" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                      {multiple ? `${idx + 1}. ` : ''}{fileItem.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatSize(fileItem.size)}
                      {fileItem.pageCount !== undefined && ` • ${fileItem.pageCount} pages`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(fileItem.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-colors shrink-0 ml-2"
                  title="Remove file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {multiple && files.length < maxFiles && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700"
              >
                <Plus className="w-4 h-4" /> Add More Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple={multiple}
                accept={acceptString}
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
