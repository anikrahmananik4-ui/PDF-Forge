export type ToolCategory = 
  | 'ORGANIZE'
  | 'OPTIMIZE'
  | 'CONVERT'
  | 'EDIT'
  | 'SECURITY'
  | 'OCR';

export interface PDFTool {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  path: string;
  iconName: string;
  popular?: boolean;
  acceptedFileTypes: string[]; // e.g. ['.pdf'], ['.jpg', '.png', '.webp'], ['.docx']
  maxFiles?: number;
  badge?: string;
  instructions: string[];
  faqs: { question: string; answer: string }[];
  relatedToolIds?: string[];
  seoH1?: string;
  seoTitle?: string;
  seoMetaDescription?: string;
  keywords?: string[];
}

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  pageCount?: number;
  rotation?: number; // 0, 90, 180, 270
}

export type ProcessingStage = 'uploading' | 'analyzing' | 'processing' | 'finalizing' | 'completed' | 'error';

export interface ProcessingState {
  stage: ProcessingStage;
  progress: number; // 0 to 100
  message: string;
  error?: string;
}

export interface ProcessingResult {
  filename: string;
  downloadUrl: string;
  size: number;
  originalSize: number;
  processingTimeMs: number;
  pageCount?: number;
  blob?: Blob;
  type?: string;
}

export interface RecentJob {
  id: string;
  toolId: string;
  toolTitle: string;
  filename: string;
  originalSize: number;
  outputSize: number;
  timestamp: number;
  downloadUrl?: string;
}

export interface AdminSettings {
  siteName: string;
  maxFileSizeMb: number;
  tempFileTtlHours: number;
  maintenanceMode: boolean;
  adsEnabled: boolean;
  adsenseClient?: string;
  enabledTools: Record<string, boolean>;
  pricingFreeLimitMb: number;
}
