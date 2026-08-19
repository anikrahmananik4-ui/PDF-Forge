import { PDFTool } from '../types/pdf';

export const PDF_TOOLS: PDFTool[] = [
  // ORGANIZE
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one unified document in your preferred order.',
    category: 'ORGANIZE',
    path: '/tools/merge-pdf',
    iconName: 'GitMerge',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 20,
    badge: 'Popular',
    instructions: [
      'Upload two or more PDF files from your computer or mobile device.',
      'Drag and drop the file cards to reorder them as desired.',
      'Click the "Merge PDF" button to combine all files into a single document.',
      'Download your merged PDF file instantly.'
    ],
    faqs: [
      { question: 'Is my file data kept private when merging PDFs?', answer: 'Yes! All file processing happens securely in isolated processing memory and temporary files are automatically deleted.' },
      { question: 'Can I merge password-protected PDFs?', answer: 'You can merge protected PDFs if you unlock them first using our Unlock PDF tool.' },
      { question: 'Is there a limit on how many files I can merge?', answer: 'You can merge up to 20 files at once for free.' }
    ]
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Extract specific page ranges or split every page into separate PDF files.',
    category: 'ORGANIZE',
    path: '/tools/split-pdf',
    iconName: 'Scissors',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    instructions: [
      'Select and upload the PDF file you want to split.',
      'Choose whether to extract custom ranges (e.g., 1-5, 8-12) or split all pages.',
      'Click "Split PDF" to process the document.',
      'Download the split PDF files individually or as a compressed ZIP file.'
    ],
    faqs: [
      { question: 'Can I split specific custom page ranges?', answer: 'Yes, you can enter custom ranges like "1-3, 5, 7-10".' },
      { question: 'Will image quality degrade after splitting?', answer: 'No, splitting preserves 100% of the original PDF vector graphics and text rendering quality.' }
    ]
  },
  {
    id: 'organize-pdf',
    title: 'Organize PDF',
    description: 'Sort, reorder, rotate, or delete individual pages of your PDF document visually.',
    category: 'ORGANIZE',
    path: '/tools/organize-pdf',
    iconName: 'LayoutGrid',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF file to see visual page thumbnails.',
      'Drag page thumbnails to reorder, use buttons to rotate or delete unwanted pages.',
      'Click "Save & Download" to generate the newly structured PDF.'
    ],
    faqs: [
      { question: 'Can I duplicate pages in the visual organizer?', answer: 'Yes, click the duplicate button on any thumbnail to duplicate that page.' }
    ]
  },
  {
    id: 'extract-pages',
    title: 'Extract PDF Pages',
    description: 'Pull out selected pages from a PDF and save them as a new PDF document.',
    category: 'ORGANIZE',
    path: '/tools/extract-pages',
    iconName: 'FileOutput',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF file.',
      'Enter page numbers or click thumbnails to select pages for extraction.',
      'Click "Extract Pages" to build a clean new PDF with only your selected pages.'
    ],
    faqs: [
      { question: 'Can I extract non-consecutive pages?', answer: 'Yes, you can pick any combination of pages.' }
    ]
  },
  {
    id: 'delete-pages',
    title: 'Delete PDF Pages',
    description: 'Remove unnecessary or sensitive pages from your PDF file.',
    category: 'ORGANIZE',
    path: '/tools/delete-pages',
    iconName: 'Trash2',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload the PDF file.',
      'Click the trash icon on page thumbnails or type page numbers to remove.',
      'Click "Delete Pages" to download the updated PDF without those pages.'
    ],
    faqs: [
      { question: 'Are original files modified?', answer: 'No, a new PDF file is generated, leaving your original file untouched.' }
    ]
  },
  {
    id: 'rearrange-pages',
    title: 'Rearrange PDF',
    description: 'Drag and drop page thumbnails to rearrange the page sequence of your PDF.',
    category: 'ORGANIZE',
    path: '/tools/rearrange-pages',
    iconName: 'ArrowUpRight',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF file.',
      'Drag thumbnails into your preferred sequential order.',
      'Click "Rearrange PDF" to download the re-ordered document.'
    ],
    faqs: [
      { question: 'Does rearranging alter page content?', answer: 'No, only page placement order within the file vector stream is updated.' }
    ]
  },

  // OPTIMIZE
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce file size while optimizing maximum visual quality for web and email.',
    category: 'OPTIMIZE',
    path: '/tools/compress-pdf',
    iconName: 'FileArchive',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    instructions: [
      'Upload the large PDF file you wish to compress.',
      'Select your desired compression level: Extreme, Recommended, or Less Compression.',
      'Click "Compress PDF" to reduce the file size.',
      'View exact megabyte savings percentage and download your compressed file.'
    ],
    faqs: [
      { question: 'How much can a PDF be compressed?', answer: 'Depending on embedded image density and vector content, files are typically reduced by 30% to 75%.' },
      { question: 'Will my text become blurry?', answer: 'Recommended compression optimizes image resolutions without affecting sharp vector typography.' }
    ]
  },
  {
    id: 'repair-pdf',
    title: 'Repair PDF',
    description: 'Recover data and fix broken or corrupted PDF file structures.',
    category: 'OPTIMIZE',
    path: '/tools/repair-pdf',
    iconName: 'Wrench',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your damaged or unreadable PDF document.',
      'Our engine rebuilds file xref tables and object pointers.',
      'Download the repaired PDF file if recovery succeeds.'
    ],
    faqs: [
      { question: 'Can every corrupt PDF be repaired?', answer: 'It depends on severe byte corruption, but most missing headers and indexing table issues are standardly recoverable.' }
    ]
  },
  {
    id: 'flatten-pdf',
    title: 'Flatten PDF',
    description: 'Convert interactive form fields and annotations permanently into base page graphics.',
    category: 'OPTIMIZE',
    path: '/tools/flatten-pdf',
    iconName: 'Layers',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload a PDF containing interactive forms or annotations.',
      'Click "Flatten PDF".',
      'Download a unmodifiable PDF with fixed graphical content.'
    ],
    faqs: [
      { question: 'Why flatten a PDF?', answer: 'Flattening prevents recipient editing of form fields, signatures, and markups across different PDF viewers.' }
    ]
  },

  // CONVERT
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Convert JPG, PNG, or WebP images into a professional PDF document.',
    category: 'CONVERT',
    path: '/tools/jpg-to-pdf',
    iconName: 'Image',
    popular: true,
    acceptedFileTypes: ['.jpg', '.jpeg', '.png', '.webp'],
    maxFiles: 30,
    badge: 'Popular',
    instructions: [
      'Upload one or multiple image files (JPG, PNG, WebP).',
      'Configure orientation, page size (A4, Letter, Fit), margins, and page layout.',
      'Click "Convert to PDF" to generate and download your PDF.'
    ],
    faqs: [
      { question: 'Can I combine multiple photos into a single PDF document?', answer: 'Yes! Upload multiple images and arrange them in your preferred sequence before converting.' }
    ]
  },
  {
    id: 'png-to-pdf',
    title: 'PNG to PDF',
    description: 'Convert PNG graphics and screenshots with full color fidelity into PDF.',
    category: 'CONVERT',
    path: '/tools/png-to-pdf',
    iconName: 'FileImage',
    acceptedFileTypes: ['.png'],
    maxFiles: 30,
    instructions: [
      'Select PNG images to upload.',
      'Set page size and layout preferences.',
      'Download your rendered PDF file.'
    ],
    faqs: [
      { question: 'Are transparent PNG backgrounds supported?', answer: 'Yes, transparent backgrounds render cleanly on white PDF pages.' }
    ]
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Extract all pages of a PDF document into high-resolution JPG images.',
    category: 'CONVERT',
    path: '/tools/pdf-to-jpg',
    iconName: 'FileSpreadsheet',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF file.',
      'Select page rendering resolution quality.',
      'Click "Convert to JPG" and download image files or a packaged ZIP archive.'
    ],
    faqs: [
      { question: 'What image quality is produced?', answer: 'Images are exported in high-definition 300 DPI JPEG quality.' }
    ]
  },
  {
    id: 'pdf-to-png',
    title: 'PDF to PNG',
    description: 'Render PDF document pages into crisp, high-quality PNG image files.',
    category: 'CONVERT',
    path: '/tools/pdf-to-png',
    iconName: 'ImagePlus',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF document.',
      'Click "Convert to PNG".',
      'Download individual PNG files or a consolidated ZIP file.'
    ],
    faqs: [
      { question: 'Can I extract specific page ranges to PNG?', answer: 'Yes, select custom page numbers in the options panel.' }
    ]
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF documents into editable Microsoft Word (.docx) documents.',
    category: 'CONVERT',
    path: '/tools/pdf-to-word',
    iconName: 'FileText',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    instructions: [
      'Upload your PDF file.',
      'Click "Convert to Word".',
      'Download your structured DOCX document for easy editing in Microsoft Word or Google Docs.'
    ],
    faqs: [
      { question: 'Will formatting and paragraphs be preserved?', answer: 'Text structures, formatting, headings, and paragraphs are reconstructed into Word format.' }
    ]
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Convert Microsoft Word (.docx, .doc) files into clean, readable PDF format.',
    category: 'CONVERT',
    path: '/tools/word-to-pdf',
    iconName: 'FileUp',
    popular: true,
    acceptedFileTypes: ['.docx', '.doc'],
    maxFiles: 1,
    instructions: [
      'Upload your Word document (.docx or .doc).',
      'Click "Convert to PDF".',
      'Download your rendered PDF file.'
    ],
    faqs: [
      { question: 'Is Microsoft Office required on my computer?', answer: 'No, conversion is handled directly online.' }
    ]
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    description: 'Extract tabular data from PDF files directly into Excel spreadsheets (.xlsx).',
    category: 'CONVERT',
    path: '/tools/pdf-to-excel',
    iconName: 'FileSpreadsheet',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF containing data tables.',
      'Click "Convert to Excel".',
      'Download your formatted .xlsx spreadsheet file.'
    ],
    faqs: [
      { question: 'Does table extraction work on multi-page reports?', answer: 'Yes, tables are detected across pages and exported into worksheet rows.' }
    ]
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel to PDF',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) into clean, printable PDF documents.',
    category: 'CONVERT',
    path: '/tools/excel-to-pdf',
    iconName: 'Table',
    acceptedFileTypes: ['.xlsx', '.xls', '.csv'],
    maxFiles: 1,
    instructions: [
      'Upload your Excel spreadsheet or CSV file.',
      'Click "Convert to PDF".',
      'Download your neatly formatted PDF table.'
    ],
    faqs: [
      { question: 'Can I convert CSV files?', answer: 'Yes, CSV files are converted cleanly into formatted tabular PDFs.' }
    ]
  },
  {
    id: 'pdf-to-ppt',
    title: 'PDF to PowerPoint',
    description: 'Convert PDF files into editable PowerPoint presentations (.pptx).',
    category: 'CONVERT',
    path: '/tools/pdf-to-ppt',
    iconName: 'Presentation',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF file.',
      'Click "Convert to PowerPoint".',
      'Download your editable PPTX slide deck.'
    ],
    faqs: [
      { question: 'Will each page become an individual slide?', answer: 'Yes, every PDF page is transformed into a slide.' }
    ]
  },
  {
    id: 'ppt-to-pdf',
    title: 'PowerPoint to PDF',
    description: 'Convert PowerPoint slides (.pptx, .ppt) into a portable PDF document.',
    category: 'CONVERT',
    path: '/tools/ppt-to-pdf',
    iconName: 'FileInput',
    acceptedFileTypes: ['.pptx', '.ppt'],
    maxFiles: 1,
    instructions: [
      'Upload your presentation file.',
      'Click "Convert to PDF".',
      'Download your slide PDF.'
    ],
    faqs: [
      { question: 'Are slide dimensions maintained?', answer: 'Yes, widescreen 16:9 or 4:3 slide ratios are accurately mapped.' }
    ]
  },
  {
    id: 'html-to-pdf',
    title: 'HTML to PDF',
    description: 'Convert HTML code snippets or web articles into formatted PDF documents.',
    category: 'CONVERT',
    path: '/tools/html-to-pdf',
    iconName: 'Code',
    acceptedFileTypes: ['.html', '.htm', '.txt'],
    maxFiles: 1,
    instructions: [
      'Paste your raw HTML code or upload an HTML file.',
      'Select margins and page format preferences.',
      'Click "Convert to PDF" and download.'
    ],
    faqs: [
      { question: 'Are inline styles supported?', answer: 'Yes, standard CSS and inline HTML formatting rules are rendered into PDF.' }
    ]
  },
  {
    id: 'text-to-pdf',
    title: 'Text to PDF',
    description: 'Convert plain text notes or file documents into a structured PDF file.',
    category: 'CONVERT',
    path: '/tools/text-to-pdf',
    iconName: 'FileCode2',
    acceptedFileTypes: ['.txt'],
    maxFiles: 1,
    instructions: [
      'Type or paste text content into the text area, or upload a .txt file.',
      'Choose font style, font size, margins, and page orientation.',
      'Click "Generate PDF" to download.'
    ],
    faqs: [
      { question: 'Does text auto-wrap across pages?', answer: 'Yes, text is paginated and wrapped with standard margins.' }
    ]
  },

  // EDIT
  {
    id: 'pdf-editor',
    title: 'PDF Editor',
    description: 'Add text, freehand drawings, highlights, shapes, whiteout redactions, and images to your PDF.',
    category: 'EDIT',
    path: '/tools/pdf-editor',
    iconName: 'Edit3',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    instructions: [
      'Upload the PDF file you wish to annotate or edit.',
      'Use toolbar controls to add text elements, draw annotations, insert shapes, highlight text, or whiteout sections.',
      'Click "Save & Download" to burn your modifications permanently into the PDF file.'
    ],
    faqs: [
      { question: 'Is this an interactive vector overlay editor?', answer: 'Yes, you can place annotations, text boxes, drawings, and whiteout boxes anywhere on any page.' }
    ]
  },
  {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    description: 'Rotate individual pages or all pages of your PDF document by 90°, 180°, or 270°.',
    category: 'EDIT',
    path: '/tools/rotate-pdf',
    iconName: 'RotateCw',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF document.',
      'Click page thumbnails to rotate specific pages or use global controls to rotate all pages.',
      'Click "Apply Rotation" to download the updated file.'
    ],
    faqs: [
      { question: 'Can I rotate landscape pages to portrait orientation?', answer: 'Yes, click clockwise or counter-clockwise until pages are oriented correctly.' }
    ]
  },
  {
    id: 'crop-pdf',
    title: 'Crop PDF',
    description: 'Trim page margins or isolate specific visual areas of your PDF pages.',
    category: 'EDIT',
    path: '/tools/crop-pdf',
    iconName: 'Crop',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF file.',
      'Adjust the visual drag handles on the crop box preview.',
      'Choose whether to apply crop margins to the current page or all pages.',
      'Click "Crop PDF" to render and download.'
    ],
    faqs: [
      { question: 'Is cropping non-destructive to underlying vector resolution?', answer: 'Yes, vector streams are clipped cleanly to the designated crop bounding box.' }
    ]
  },
  {
    id: 'watermark-pdf',
    title: 'Watermark PDF',
    description: 'Add custom text stamp or image watermarks to your PDF pages.',
    category: 'EDIT',
    path: '/tools/watermark-pdf',
    iconName: 'Stamp',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF document.',
      'Select Text or Image watermark type.',
      'Customize text content, size, color, opacity, rotation angle, and position grid.',
      'Click "Add Watermark" to generate your stamped PDF.'
    ],
    faqs: [
      { question: 'Can I adjust opacity so content remains visible underneath?', answer: 'Yes, opacity can be set from 10% to 100% transparency.' }
    ]
  },
  {
    id: 'page-numbers',
    title: 'Page Numbers',
    description: 'Add customizable sequential page numbering to your PDF document headers or footers.',
    category: 'EDIT',
    path: '/tools/page-numbers',
    iconName: 'Hash',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF document.',
      'Choose page number placement (bottom-center, top-right, etc.), starting index, format (e.g. "Page X of Y"), and font style.',
      'Click "Add Page Numbers" to process and download.'
    ],
    faqs: [
      { question: 'Can I start numbering from page 2 onwards?', answer: 'Yes, you can configure offset start numbers and target page ranges.' }
    ]
  },
  {
    id: 'pdf-metadata',
    title: 'PDF Metadata',
    description: 'Inspect and edit document Title, Author, Subject, Keywords, and Creator properties.',
    category: 'EDIT',
    path: '/tools/pdf-metadata',
    iconName: 'Info',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF document.',
      'View existing metadata fields.',
      'Modify Title, Author, Subject, Keywords, or Producer values.',
      'Click "Save Metadata" to download the updated PDF file.'
    ],
    faqs: [
      { question: 'Can I remove existing author and metadata information for privacy?', answer: 'Yes, simply clear the text fields and save.' }
    ]
  },

  // SECURITY
  {
    id: 'protect-pdf',
    title: 'Protect PDF',
    description: 'Encrypt your PDF with password protection to prevent unauthorized opening.',
    category: 'SECURITY',
    path: '/tools/protect-pdf',
    iconName: 'Lock',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    instructions: [
      'Upload the PDF file you wish to secure.',
      'Enter and confirm a strong password.',
      'Click "Protect PDF" to apply standard AES encryption.',
      'Download your password-protected PDF file.'
    ],
    faqs: [
      { question: 'Are passwords stored on your server?', answer: 'No! Passwords are never stored or logged anywhere.' }
    ]
  },
  {
    id: 'unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove password security and restrictions from a PDF document.',
    category: 'SECURITY',
    path: '/tools/unlock-pdf',
    iconName: 'Unlock',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your encrypted PDF document.',
      'Provide the current decryption password.',
      'Click "Unlock PDF" to strip security encryption.',
      'Download your unlocked, open PDF file.'
    ],
    faqs: [
      { question: 'Do I need the correct password to unlock?', answer: 'Yes, you must supply the valid password to legally decrypt and unlock your PDF.' }
    ]
  },
  {
    id: 'sign-pdf',
    title: 'Sign PDF',
    description: 'Draw, type, or upload an image signature to digitally sign your PDF pages.',
    category: 'SECURITY',
    path: '/tools/sign-pdf',
    iconName: 'PenTool',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    instructions: [
      'Upload the PDF document needing a signature.',
      'Draw your signature on the canvas, type your name in a script font, or upload a signature image.',
      'Position, scale, and place your signature stamp on the desired page.',
      'Click "Sign & Download PDF".'
    ],
    faqs: [
      { question: 'Can I save my drawn signature for future use?', answer: 'Yes, drawn signatures are cached in your browser session for convenience.' }
    ]
  },
  {
    id: 'compare-pdf',
    title: 'Compare PDF',
    description: 'Compare two PDF documents side-by-side to detect visual and textual differences.',
    category: 'SECURITY',
    path: '/tools/compare-pdf',
    iconName: 'GitCompare',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 2,
    instructions: [
      'Upload Document 1 (Original) and Document 2 (Modified).',
      'Click "Compare PDFs".',
      'Review side-by-side page visual differences and highlighted text additions or removals.'
    ],
    faqs: [
      { question: 'How are text differences detected?', answer: 'Our engine parses extracted page text character by character and flags additions in green and deletions in red.' }
    ]
  },

  // OCR
  {
    id: 'ocr-pdf',
    title: 'OCR PDF',
    description: 'Recognize text in scanned PDF documents and generate searchable, copyable text.',
    category: 'OCR',
    path: '/tools/ocr-pdf',
    iconName: 'ScanText',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    instructions: [
      'Upload your scanned PDF document.',
      'Select recognition language (English, Bengali, Spanish, French, German, etc.).',
      'Click "Start OCR" to analyze document page images.',
      'Preview recognized text, copy to clipboard, or download as searchable PDF / TXT file.'
    ],
    faqs: [
      { question: 'Which OCR engine is used?', answer: 'We run high-precision Tesseract OCR neural networks directly for maximum optical character accuracy.' },
      { question: 'Is Bengali language supported?', answer: 'Yes! Select Bengali (ben) in the OCR language dropdown.' }
    ]
  },
  {
    id: 'image-ocr',
    title: 'Image OCR',
    description: 'Extract editable text from JPG, PNG, or WebP image files.',
    category: 'OCR',
    path: '/tools/image-ocr',
    iconName: 'FileSearch',
    acceptedFileTypes: ['.jpg', '.jpeg', '.png', '.webp'],
    maxFiles: 1,
    instructions: [
      'Upload your photo or screenshot image.',
      'Choose optical language recognition.',
      'Click "Extract Text".',
      'Copy extracted text or download as a TXT document.'
    ],
    faqs: [
      { question: 'Can I extract text from receipts or document photos?', answer: 'Yes, clear high-contrast camera photos yield excellent character accuracy.' }
    ]
  },
  {
    id: 'pdf-to-text',
    title: 'PDF to Text',
    description: 'Extract raw text content from PDF files for editing, copying, or analysis.',
    category: 'OCR',
    path: '/tools/pdf-to-text',
    iconName: 'FileSpreadsheet',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    instructions: [
      'Upload your PDF file.',
      'Click "Extract Text".',
      'View extracted text in the editor, copy with one click, or download a .txt file.'
    ],
    faqs: [
      { question: 'Is this faster than full OCR?', answer: 'Yes! Direct text extraction parses embedded PDF fonts instantly without heavy optical neural processing.' }
    ]
  }
];

export const TOOL_CATEGORIES: { id: string; name: string; iconName: string; description: string }[] = [
  { id: 'ORGANIZE', name: 'Organize PDF', iconName: 'FolderTree', description: 'Merge, split, organize, extract, delete, and reorder PDF pages.' },
  { id: 'OPTIMIZE', name: 'Optimize PDF', iconName: 'Zap', description: 'Compress, repair, and flatten PDF documents.' },
  { id: 'CONVERT', name: 'Convert PDF', iconName: 'Repeat', description: 'Convert to and from JPG, PNG, Word, Excel, PowerPoint, HTML, and Text.' },
  { id: 'EDIT', name: 'Edit PDF', iconName: 'Edit3', description: 'Edit, rotate, crop, watermark, and add page numbers or metadata.' },
  { id: 'SECURITY', name: 'Security & Sign', iconName: 'ShieldCheck', description: 'Protect with passwords, unlock, sign documents, and compare diffs.' },
  { id: 'OCR', name: 'OCR & Text', iconName: 'ScanText', description: 'Extract searchable text from scanned PDFs and photos.' }
];
