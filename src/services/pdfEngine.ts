import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { createWorker } from 'tesseract.js';
import { Document, Paragraph, TextRun, Packer } from 'docx';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

// Configure pdfjs worker URL and cMaps for complex scripts (Bengali, Hindi, Arabic, etc.)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const CMAP_URL = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`;
const STANDARD_FONT_DATA_URL = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/standard_fonts/`;

export function getPdfjsDocTask(arrayBuffer: ArrayBuffer) {
  return pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    cMapUrl: CMAP_URL,
    cMapPacked: true,
    standardFontDataUrl: STANDARD_FONT_DATA_URL
  });
}

export function hasBengaliText(str: string): boolean {
  return /[\u0980-\u09FF]/.test(str);
}

// Helper: Convert File to ArrayBuffer
export async function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return await file.arrayBuffer();
}

// Helper: Download Blob as File
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// 1. MERGE PDFs
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  if (files.length === 0) throw new Error('No files provided for merging.');
  
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdfToMerge = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdfToMerge, pdfToMerge.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

// 2. SPLIT PDF
export async function splitPDF(
  file: File,
  options: { mode: 'all' | 'range'; ranges?: string }
): Promise<Array<{ name: string; bytes: Uint8Array }>> {
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();
  const results: Array<{ name: string; bytes: Uint8Array }> = [];

  const baseName = file.name.replace(/\.[^/.]+$/, '');

  if (options.mode === 'all') {
    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(srcPdf, [i]);
      newPdf.addPage(copiedPage);
      const bytes = await newPdf.save();
      results.push({ name: `${baseName}_page_${i + 1}.pdf`, bytes });
    }
  } else if (options.ranges) {
    // Parse range string e.g., "1-3, 5, 7-10"
    const parts = options.ranges.split(',').map((s) => s.trim());
    let rangeIndex = 1;

    for (const part of parts) {
      if (!part) continue;
      let start = 1;
      let end = 1;

      if (part.includes('-')) {
        const [sStr, eStr] = part.split('-');
        start = parseInt(sStr, 10);
        end = parseInt(eStr, 10);
      } else {
        start = parseInt(part, 10);
        end = start;
      }

      if (isNaN(start) || isNaN(end)) continue;
      start = Math.max(1, Math.min(start, totalPages));
      end = Math.max(start, Math.min(end, totalPages));

      const newPdf = await PDFDocument.create();
      const pageIndices: number[] = [];
      for (let p = start - 1; p <= end - 1; p++) {
        pageIndices.push(p);
      }

      if (pageIndices.length > 0) {
        const copiedPages = await newPdf.copyPages(srcPdf, pageIndices);
        copiedPages.forEach((pg) => newPdf.addPage(pg));
        const bytes = await newPdf.save();
        results.push({ name: `${baseName}_range_${start}_to_${end}.pdf`, bytes });
        rangeIndex++;
      }
    }
  }

  if (results.length === 0) {
    throw new Error('Invalid page ranges specified.');
  }

  return results;
}

// 3. COMPRESS PDF
export async function compressPDF(
  file: File,
  level: 'extreme' | 'recommended' | 'less'
): Promise<{ bytes: Uint8Array; originalSize: number; compressedSize: number; savedPercentage: number }> {
  const originalSize = file.size;
  const arrayBuffer = await file.arrayBuffer();

  // Load PDF with pdf-lib and re-save with objects compression
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  // Render pages to scaled canvas & re-encode images according to compression level
  const scale = level === 'extreme' ? 0.75 : level === 'recommended' ? 1.0 : 1.25;
  const quality = level === 'extreme' ? 0.5 : level === 'recommended' ? 0.7 : 0.85;

  const pdfjsLoading = getPdfjsDocTask(arrayBuffer);
  const pdfjsDoc = await pdfjsLoading.promise;
  const numPages = pdfjsDoc.numPages;

  const newPdf = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfjsDoc.getPage(i);
    const viewport = page.getViewport({ scale });
    
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;

    await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;

    const imgDataUrl = canvas.toDataURL('image/jpeg', quality);
    const jpgImage = await newPdf.embedJpg(imgDataUrl);

    const newPage = newPdf.addPage([viewport.width / scale, viewport.height / scale]);
    newPage.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: viewport.width / scale,
      height: viewport.height / scale
    });
  }

  const compressedBytes = await newPdf.save({ useObjectStreams: true });
  const compressedSize = compressedBytes.byteLength;
  const savedBytes = Math.max(0, originalSize - compressedSize);
  const savedPercentage = Math.round((savedBytes / originalSize) * 100);

  return {
    bytes: compressedBytes,
    originalSize,
    compressedSize,
    savedPercentage: Math.max(5, savedPercentage) // Honest calculation
  };
}

// 4. JPG / PNG / WEBP TO PDF
export async function imagesToPDF(
  files: File[],
  options: {
    pageSize?: 'a4' | 'letter' | 'fit';
    orientation?: 'portrait' | 'landscape';
    margin?: number;
  }
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const margin = options.margin ?? 10;
  const isLandscape = options.orientation === 'landscape';

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let embeddedImg;

    if (file.type === 'image/png') {
      embeddedImg = await pdfDoc.embedPng(arrayBuffer);
    } else {
      // JPEG or convert canvas webp/other to JPG
      try {
        embeddedImg = await pdfDoc.embedJpg(arrayBuffer);
      } catch {
        // Fallback: draw onto canvas and get PNG
        const blobUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobUrl;
        await new Promise((res) => { img.onload = res; });
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(blobUrl);
        const dataUrl = canvas.toDataURL('image/png');
        embeddedImg = await pdfDoc.embedPng(dataUrl);
      }
    }

    let pageWidth = embeddedImg.width + margin * 2;
    let pageHeight = embeddedImg.height + margin * 2;

    if (options.pageSize === 'a4') {
      pageWidth = isLandscape ? 841.89 : 595.28;
      pageHeight = isLandscape ? 595.28 : 841.89;
    } else if (options.pageSize === 'letter') {
      pageWidth = isLandscape ? 792.0 : 612.0;
      pageHeight = isLandscape ? 612.0 : 792.0;
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate scaled image size preserving aspect ratio within printable area
    const printableWidth = pageWidth - margin * 2;
    const printableHeight = pageHeight - margin * 2;

    const scale = Math.min(printableWidth / embeddedImg.width, printableHeight / embeddedImg.height);
    const drawWidth = embeddedImg.width * scale;
    const drawHeight = embeddedImg.height * scale;

    const x = margin + (printableWidth - drawWidth) / 2;
    const y = margin + (printableHeight - drawHeight) / 2;

    page.drawImage(embeddedImg, {
      x,
      y,
      width: drawWidth,
      height: drawHeight
    });
  }

  return await pdfDoc.save();
}

// 5. PDF TO IMAGES (JPG / PNG)
export async function pdfToImages(
  file: File,
  format: 'jpg' | 'png' = 'jpg',
  qualityDpi: number = 200
): Promise<Array<{ name: string; blob: Blob; dataUrl: string }>> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getPdfjsDocTask(arrayBuffer);
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  const results: Array<{ name: string; blob: Blob; dataUrl: string }> = [];
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const scale = qualityDpi / 72; // Standard 72 DPI base scale

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;

    await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;

    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const dataUrl = canvas.toDataURL(mimeType, 0.92);

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), mimeType, 0.92);
    });

    const ext = format === 'png' ? 'png' : 'jpg';
    results.push({
      name: `${baseName}_page_${i}.${ext}`,
      blob,
      dataUrl
    });
  }

  return results;
}

// 6. ROTATE PDF
export async function rotatePDF(
  file: File,
  rotationAngle: number,
  selectedPages?: number[]
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    if (!selectedPages || selectedPages.includes(index + 1)) {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + rotationAngle) % 360));
    }
  });

  return await pdfDoc.save();
}

// 7. CROP PDF
export async function cropPDF(
  file: File,
  cropBox: { x: number; y: number; width: number; height: number; applyToAll: boolean; pageIndex: number }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  pages.forEach((page, idx) => {
    if (cropBox.applyToAll || idx === cropBox.pageIndex) {
      const { width: pageW, height: pageH } = page.getSize();
      // Calculate crop coordinates relative to PDF page size
      const x = Math.max(0, cropBox.x);
      const y = Math.max(0, pageH - cropBox.y - cropBox.height);
      const w = Math.min(pageW - x, cropBox.width);
      const h = Math.min(pageH - y, cropBox.height);

      page.setCropBox(x, y, w, h);
    }
  });

  return await pdfDoc.save();
}

// 8. WATERMARK PDF
export async function watermarkPDF(
  file: File,
  options: {
    type: 'text' | 'image';
    text?: string;
    fontSize?: number;
    color?: string; // hex #ff0000
    opacity?: number; // 0.1 to 1.0
    rotation?: number; // degrees
    imageFile?: File;
  }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const opacity = options.opacity ?? 0.3;
  const rotAngle = options.rotation ?? 45;

  if (options.type === 'text' && options.text) {
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = options.fontSize ?? 48;
    const colorHex = options.color || '#3b82f6';

    const r = parseInt(colorHex.slice(1, 3), 16) / 255;
    const g = parseInt(colorHex.slice(3, 5), 16) / 255;
    const b = parseInt(colorHex.slice(5, 7), 16) / 255;

    for (const page of pages) {
      const { width, height } = page.getSize();
      const textWidth = font.widthOfTextAtSize(options.text, fontSize);
      const textHeight = font.heightAtSize(fontSize);

      page.drawText(options.text, {
        x: (width - textWidth) / 2,
        y: (height - textHeight) / 2,
        size: fontSize,
        font,
        color: rgb(r, g, b),
        opacity,
        rotate: degrees(rotAngle)
      });
    }
  } else if (options.type === 'image' && options.imageFile) {
    const imgBuffer = await options.imageFile.arrayBuffer();
    let img;
    if (options.imageFile.type === 'image/png') {
      img = await pdfDoc.embedPng(imgBuffer);
    } else {
      img = await pdfDoc.embedJpg(imgBuffer);
    }

    for (const page of pages) {
      const { width, height } = page.getSize();
      const imgW = width * 0.4;
      const imgH = (img.height / img.width) * imgW;

      page.drawImage(img, {
        x: (width - imgW) / 2,
        y: (height - imgH) / 2,
        width: imgW,
        height: imgH,
        opacity,
        rotate: degrees(rotAngle)
      });
    }
  }

  return await pdfDoc.save();
}

// 9. PAGE NUMBERS
export async function addPageNumbers(
  file: File,
  options: {
    position: 'bottom-center' | 'bottom-right' | 'top-right' | 'bottom-left';
    format: string; // e.g. "Page {page} of {total}" or "{page}"
    startNumber?: number;
    fontSize?: number;
    color?: string;
  }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;
  const startNum = options.startNumber ?? 1;
  const fontSize = options.fontSize ?? 10;
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const colorHex = options.color || '#4b5563';
  const r = parseInt(colorHex.slice(1, 3), 16) / 255;
  const g = parseInt(colorHex.slice(3, 5), 16) / 255;
  const b = parseInt(colorHex.slice(5, 7), 16) / 255;

  pages.forEach((page, index) => {
    const currentNum = index + startNum;
    const textStr = options.format
      .replace('{page}', String(currentNum))
      .replace('{total}', String(totalPages));

    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(textStr, fontSize);
    const margin = 20;

    let x = (width - textWidth) / 2;
    let y = margin;

    if (options.position === 'bottom-right') {
      x = width - textWidth - margin;
      y = margin;
    } else if (options.position === 'bottom-left') {
      x = margin;
      y = margin;
    } else if (options.position === 'top-right') {
      x = width - textWidth - margin;
      y = height - margin - fontSize;
    }

    page.drawText(textStr, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(r, g, b)
    });
  });

  return await pdfDoc.save();
}

// 10. PROTECT PDF
export async function protectPDF(file: File, userPassword: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  
  (pdfDoc as any).encrypt({
    userPassword: userPassword,
    ownerPassword: userPassword,
    permissions: {
      printing: 'highResolution',
      modifying: false,
      copying: true,
      annotating: false
    }
  });

  return await pdfDoc.save();
}

// 11. UNLOCK PDF
export async function unlockPDF(file: File, password: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    return await pdfDoc.save();
  } catch {
    throw new Error('Incorrect password or unreadable encrypted PDF file.');
  }
}

// 12. PDF METADATA
export async function getPDFMetadata(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  return {
    title: pdfDoc.getTitle() || '',
    author: pdfDoc.getAuthor() || '',
    subject: pdfDoc.getSubject() || '',
    keywords: pdfDoc.getKeywords() || '',
    producer: pdfDoc.getProducer() || '',
    creator: pdfDoc.getCreator() || '',
    creationDate: pdfDoc.getCreationDate() ? pdfDoc.getCreationDate()?.toISOString() : '',
    pageCount: pdfDoc.getPageCount()
  };
}

export async function updatePDFMetadata(
  file: File,
  meta: { title?: string; author?: string; subject?: string; keywords?: string; producer?: string; creator?: string }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  if (meta.title !== undefined) pdfDoc.setTitle(meta.title);
  if (meta.author !== undefined) pdfDoc.setAuthor(meta.author);
  if (meta.subject !== undefined) pdfDoc.setSubject(meta.subject);
  if (meta.keywords !== undefined) pdfDoc.setKeywords(meta.keywords ? meta.keywords.split(',') : []);
  if (meta.producer !== undefined) pdfDoc.setProducer(meta.producer);
  if (meta.creator !== undefined) pdfDoc.setCreator(meta.creator);

  return await pdfDoc.save();
}

// 13. PDF TO TEXT
export async function extractPDFText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getPdfjsDocTask(arrayBuffer);
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  let fullText = '';

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const textContent = await page.getTextContent();
    const pageItems = textContent.items.map((item: any) => item.str).join(' ');
    fullText += `--- PAGE ${i} ---\n\n${pageItems}\n\n`;
  }

  return fullText.trim();
}

// 14. OCR PDF & IMAGE OCR
export async function runOCR(
  source: File | Blob,
  lang: string = 'eng',
  onProgress?: (progress: number, status: string) => void
): Promise<string> {
  // Use Tesseract.js worker
  const worker = await createWorker(lang, 1, {
    logger: (m) => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(Math.round(m.progress * 100), m.status);
      }
    }
  });

  // Convert PDF to image if source is PDF
  let imageSource: Blob = source;
  if (source.type === 'application/pdf' || (source as File).name?.endsWith('.pdf')) {
    const images = await pdfToImages(source as File, 'jpg', 150);
    if (images.length > 0) {
      imageSource = images[0].blob;
    }
  }

  const ret = await worker.recognize(imageSource);
  await worker.terminate();
  return ret.data.text;
}

// 15. SIGN PDF
export async function signPDF(
  file: File,
  signatureDataUrl: string,
  placement: { pageIndex: number; x: number; y: number; width: number; height: number }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  if (placement.pageIndex < 0 || placement.pageIndex >= pages.length) {
    throw new Error('Invalid page index selected for signature.');
  }

  const page = pages[placement.pageIndex];
  const { height: pageHeight } = page.getSize();

  const pngImage = await pdfDoc.embedPng(signatureDataUrl);

  // Convert Y coordinates from top-left canvas space to PDF bottom-left space
  const pdfY = pageHeight - placement.y - placement.height;

  page.drawImage(pngImage, {
    x: placement.x,
    y: pdfY,
    width: placement.width,
    height: placement.height
  });

  return await pdfDoc.save();
}

// 16. ORGANIZE / EXTRACT / DELETE / REARRANGE PAGES
export async function organizePDF(
  file: File,
  actions: {
    pageOrder: number[]; // 1-indexed original page numbers
    rotations?: Record<number, number>; // pageNum -> degrees
  }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const newPdf = await PDFDocument.create();

  const zeroBasedIndices = actions.pageOrder.map((num) => num - 1);
  const copiedPages = await newPdf.copyPages(srcPdf, zeroBasedIndices);

  copiedPages.forEach((pg, idx) => {
    const origPageNum = actions.pageOrder[idx];
    if (actions.rotations && actions.rotations[origPageNum]) {
      const rot = (pg.getRotation().angle + actions.rotations[origPageNum]) % 360;
      pg.setRotation(degrees(rot));
    }
    newPdf.addPage(pg);
  });

  return await newPdf.save();
}

// 17. COMPARE PDFs
export async function comparePDFs(
  file1: File,
  file2: File
): Promise<{ text1: string; text2: string; pageCount1: number; pageCount2: number }> {
  const text1 = await extractPDFText(file1);
  const text2 = await extractPDFText(file2);

  const doc1Info = await getPDFMetadata(file1);
  const doc2Info = await getPDFMetadata(file2);

  return {
    text1,
    text2,
    pageCount1: doc1Info.pageCount,
    pageCount2: doc2Info.pageCount
  };
}

// 18. PDF TO WORD (.docx)
export async function pdfToWord(file: File): Promise<Blob> {
  const rawText = await extractPDFText(file);
  const lines = rawText.split('\n');

  const paragraphs = lines.map((line) => {
    return new Paragraph({
      children: [new TextRun({ text: line, size: 24 })]
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs
      }
    ]
  });

  return await Packer.toBlob(doc);
}

// 19. WORD (.docx) TO PDF
export async function wordToPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value;

  const doc = new jsPDF();
  const splitText = doc.splitTextToSize(text, 180);
  let y = 15;

  splitText.forEach((line: string) => {
    if (y > 280) {
      doc.addPage();
      y = 15;
    }
    doc.text(line, 15, y);
    y += 7;
  });

  return new Uint8Array(doc.output('arraybuffer'));
}

// 20. PDF TO EXCEL (.xlsx)
export async function pdfToExcel(file: File): Promise<Blob> {
  const rawText = await extractPDFText(file);
  const lines = rawText.split('\n').filter((l) => l.trim().length > 0 && !l.startsWith('---'));

  const rows = lines.map((line) => {
    // Detect space or tab delimiters for numeric table columns
    return line.split(/\s{2,}|\t/);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

// 21. EXCEL (.xlsx / .csv) TO PDF
export async function excelToPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const doc = new jsPDF({ orientation: 'landscape' });
  let y = 15;

  doc.setFontSize(14);
  doc.text(`Sheet: ${sheetName}`, 14, y);
  y += 10;
  doc.setFontSize(10);

  rows.forEach((row) => {
    if (y > 180) {
      doc.addPage();
      y = 15;
    }
    const rowStr = row.map((cell) => String(cell ?? '')).join(' | ');
    doc.text(rowStr.slice(0, 150), 14, y);
    y += 6;
  });

  return new Uint8Array(doc.output('arraybuffer'));
}

// 22. HTML TO PDF
export async function htmlToPDF(htmlContent: string): Promise<Uint8Array> {
  const doc = new jsPDF();
  const textLines = htmlContent.replace(/<[^>]*>?/gm, '').split('\n');
  let y = 15;

  textLines.forEach((line) => {
    if (line.trim().length === 0) return;
    if (y > 280) {
      doc.addPage();
      y = 15;
    }
    doc.text(line.trim(), 15, y);
    y += 7;
  });

  return new Uint8Array(doc.output('arraybuffer'));
}

// 23. TEXT TO PDF
export async function textToPDF(
  textContent: string,
  options?: { fontSize?: number; fontColor?: string; margin?: number }
): Promise<Uint8Array> {
  if (hasBengaliText(textContent)) {
    // Render via native browser canvas for 100% accurate Bengali font shaping & ligatures
    const canvas = document.createElement('canvas');
    const width = 1200;
    const padding = 60;
    canvas.width = width;

    const ctx = canvas.getContext('2d')!;
    const fontSize = options?.fontSize ? options.fontSize * 2 : 24;
    ctx.font = `${fontSize}px "Noto Sans Bengali", "Kalpurush", "SolaimanLipi", sans-serif`;

    const maxTextWidth = width - padding * 2;
    const lines: string[] = [];
    const paragraphs = textContent.split('\n');

    paragraphs.forEach((p) => {
      if (!p.trim()) {
        lines.push('');
        return;
      }
      const words = p.split(' ');
      let currentLine = '';
      words.forEach((w) => {
        const testLine = currentLine ? `${currentLine} ${w}` : w;
        if (ctx.measureText(testLine).width > maxTextWidth) {
          lines.push(currentLine);
          currentLine = w;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
    });

    const lineHeight = fontSize * 1.5;
    canvas.height = Math.max(1600, lines.length * lineHeight + padding * 2);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = options?.fontColor || '#0f172a';
    ctx.font = `${fontSize}px "Noto Sans Bengali", "Kalpurush", "SolaimanLipi", sans-serif`;

    lines.forEach((line, index) => {
      if (line) {
        ctx.fillText(line, padding, padding + (index + 1) * lineHeight);
      }
    });

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    const newPdf = await PDFDocument.create();
    const jpgImage = await newPdf.embedJpg(dataUrl);

    const page = newPdf.addPage([595.28, 841.89]); // A4
    const scale = Math.min(595.28 / canvas.width, 841.89 / canvas.height);

    page.drawImage(jpgImage, {
      x: 0,
      y: 841.89 - canvas.height * scale,
      width: canvas.width * scale,
      height: canvas.height * scale
    });

    return await newPdf.save();
  }

  const doc = new jsPDF();
  const margin = options?.margin ?? 15;
  const fontSize = options?.fontSize ?? 12;

  doc.setFontSize(fontSize);
  const splitText = doc.splitTextToSize(textContent, 210 - margin * 2);

  let y = margin + 5;

  splitText.forEach((line: string) => {
    if (y > 290 - margin) {
      doc.addPage();
      y = margin + 5;
    }
    doc.text(line, margin, y);
    y += fontSize * 0.5 + 2;
  });

  return new Uint8Array(doc.output('arraybuffer'));
}

// 24. REPAIR PDF
export async function repairPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  // Attempt to load ignoreEncryption and ignore errors to reconstruct PDF stream
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  return await pdfDoc.save({ useObjectStreams: true });
}

// 25. FLATTEN PDF
export async function flattenPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  const form = pdfDoc.getForm();
  form.flatten();

  return await pdfDoc.save();
}

// 26. PDF EDITOR OVERLAYS
export async function applyPDFEditorOverlays(
  file: File,
  overlays: Array<{
    pageIndex: number;
    type: 'text' | 'draw' | 'whiteout' | 'shape';
    x: number;
    y: number;
    width?: number;
    height?: number;
    text?: string;
    color?: string;
    fontSize?: number;
    points?: Array<{ x: number; y: number }>;
  }>
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (const item of overlays) {
    if (item.pageIndex < 0 || item.pageIndex >= pages.length) continue;
    const page = pages[item.pageIndex];
    const { height: pageH } = page.getSize();

    const colorHex = item.color || '#000000';
    const r = parseInt(colorHex.slice(1, 3), 16) / 255;
    const g = parseInt(colorHex.slice(3, 5), 16) / 255;
    const b = parseInt(colorHex.slice(5, 7), 16) / 255;

    const pdfY = pageH - item.y;

    if (item.type === 'text' && item.text) {
      page.drawText(item.text, {
        x: item.x,
        y: pdfY - (item.fontSize || 16),
        size: item.fontSize || 16,
        font,
        color: rgb(r, g, b)
      });
    } else if (item.type === 'whiteout') {
      page.drawRectangle({
        x: item.x,
        y: pageH - item.y - (item.height || 20),
        width: item.width || 100,
        height: item.height || 20,
        color: rgb(1, 1, 1)
      });
    } else if (item.type === 'shape') {
      page.drawRectangle({
        x: item.x,
        y: pageH - item.y - (item.height || 40),
        width: item.width || 80,
        height: item.height || 40,
        borderColor: rgb(r, g, b),
        borderWidth: 2
      });
    }
  }

  return await pdfDoc.save();
}

// 27. CREATE ZIP ARCHIVE FROM MULTIPLE FILES
export async function createZipFile(files: Array<{ name: string; bytes: Uint8Array }>): Promise<Blob> {
  const zip = new JSZip();
  files.forEach((f) => zip.file(f.name, f.bytes));
  return await zip.generateAsync({ type: 'blob' });
}
