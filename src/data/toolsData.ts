import { PDFTool } from '../types/pdf';

export const PDF_TOOLS: PDFTool[] = [
  // ORGANIZE
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one unified document online for free.',
    seoH1: 'Merge PDF Files Online — Free PDF Joiner',
    seoTitle: 'Merge PDF Online — Combine PDF Files Free | SRA PDF',
    seoMetaDescription: 'Combine multiple PDF files into one unified document online for free. Reorder pages, merge documents securely with no installation required.',
    category: 'ORGANIZE',
    path: '/merge-pdf',
    iconName: 'GitMerge',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 20,
    badge: 'Popular',
    relatedToolIds: ['split-pdf', 'compress-pdf', 'organize-pdf', 'pdf-to-word'],
    keywords: ['merge PDF', 'combine PDF', 'merge PDF online', 'PDF joiner', 'combine PDF files free'],
    instructions: [
      'Upload two or more PDF files from your computer, phone, or cloud storage.',
      'Drag and drop the uploaded document cards to rearrange their order.',
      'Click the "Merge PDF" button to process and combine all files into one document.',
      'Download your merged PDF file instantly or save it to your device.'
    ],
    faqs: [
      { question: 'Is my file data kept private when merging PDFs?', answer: 'Yes! All file processing occurs in isolated secure processing memory, and temporary files are automatically deleted after 1 hour.' },
      { question: 'Can I merge password-protected PDFs?', answer: 'You can merge protected PDFs after unlocking them using our Unlock PDF tool.' },
      { question: 'Is there a limit on how many files I can merge?', answer: 'You can merge up to 20 files at once for free on SRA PDF.' }
    ]
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Split PDF documents into individual pages or custom page ranges instantly.',
    seoH1: 'Split PDF Online — Extract PDF Pages Free',
    seoTitle: 'Split PDF Online — Separate PDF Pages Free | SRA PDF',
    seoMetaDescription: 'Split PDF documents into individual pages or custom page ranges instantly. Fast, private, and free online PDF splitter tool.',
    category: 'ORGANIZE',
    path: '/split-pdf',
    iconName: 'Scissors',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    relatedToolIds: ['merge-pdf', 'extract-pages', 'delete-pages', 'compress-pdf'],
    keywords: ['split PDF', 'separate PDF pages', 'extract PDF pages', 'PDF splitter online'],
    instructions: [
      'Select and upload the PDF file you want to split.',
      'Choose whether to extract custom ranges (e.g., 1-5, 8-12) or split all pages into separate files.',
      'Click "Split PDF" to process the document.',
      'Download your split PDF files individually or as a single packaged ZIP file.'
    ],
    faqs: [
      { question: 'Can I split specific custom page ranges?', answer: 'Yes, you can enter custom ranges like "1-3, 5, 7-10".' },
      { question: 'Will image quality degrade after splitting?', answer: 'No, splitting preserves 100% of the original vector graphics, text, and image quality.' }
    ]
  },
  {
    id: 'organize-pdf',
    title: 'Organize PDF',
    description: 'Visually reorder, rotate, duplicate, or delete individual pages in your PDF document.',
    seoH1: 'Organize PDF Pages Visually Online',
    seoTitle: 'Organize PDF Pages Online — Reorder & Sort PDF | SRA PDF',
    seoMetaDescription: 'Visually reorder, rotate, duplicate, or delete individual pages in your PDF document. Drag and drop page thumbnails with ease.',
    category: 'ORGANIZE',
    path: '/organize-pdf',
    iconName: 'LayoutGrid',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['merge-pdf', 'rearrange-pages', 'rotate-pdf', 'delete-pages'],
    keywords: ['organize PDF', 'reorder PDF pages', 'sort PDF pages', 'PDF page manager'],
    instructions: [
      'Upload your PDF file to view interactive visual page thumbnails.',
      'Drag page thumbnails into your desired order, rotate orientations, or delete unwanted pages.',
      'Click "Save & Download" to generate your newly organized PDF.'
    ],
    faqs: [
      { question: 'Can I duplicate pages in the visual organizer?', answer: 'Yes, click the duplicate icon on any page thumbnail to duplicate it.' }
    ]
  },
  {
    id: 'extract-pages',
    title: 'Extract PDF Pages',
    description: 'Select and extract specific pages from any PDF document into a new tailored file.',
    seoH1: 'Extract Pages From PDF Online Free',
    seoTitle: 'Extract PDF Pages Online — Save Selected Pages | SRA PDF',
    seoMetaDescription: 'Select and extract specific pages from any PDF document. Create a new tailored PDF containing only the pages you need.',
    category: 'ORGANIZE',
    path: '/extract-pdf-pages',
    iconName: 'FileOutput',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['split-pdf', 'delete-pages', 'merge-pdf', 'organize-pdf'],
    keywords: ['extract PDF pages', 'save specific PDF pages', 'pull pages from PDF'],
    instructions: [
      'Upload your PDF document.',
      'Type page numbers or click page thumbnails to select pages for extraction.',
      'Click "Extract Pages" to build a clean new PDF with only your selected pages.'
    ],
    faqs: [
      { question: 'Can I extract non-consecutive pages?', answer: 'Yes, you can pick any combination of non-consecutive pages.' }
    ]
  },
  {
    id: 'delete-pages',
    title: 'Delete PDF Pages',
    description: 'Remove unnecessary or confidential pages from your PDF file online.',
    seoH1: 'Delete Pages From PDF Document Free',
    seoTitle: 'Delete PDF Pages Online — Remove Unwanted Pages | SRA PDF',
    seoMetaDescription: 'Remove unnecessary or confidential pages from your PDF file online. Fast, secure, and preserves original file formatting.',
    category: 'ORGANIZE',
    path: '/delete-pdf-pages',
    iconName: 'Trash2',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['extract-pages', 'split-pdf', 'organize-pdf', 'compress-pdf'],
    keywords: ['delete PDF pages', 'remove pages from PDF', 'delete page PDF online'],
    instructions: [
      'Upload your PDF file.',
      'Click the trash icon on page thumbnails or enter page numbers to remove.',
      'Click "Delete Pages" to download the cleaned PDF document.'
    ],
    faqs: [
      { question: 'Are original files modified?', answer: 'No, a new PDF file is generated, leaving your uploaded file untouched.' }
    ]
  },
  {
    id: 'rearrange-pages',
    title: 'Rearrange PDF',
    description: 'Reorder pages in a PDF file with intuitive drag-and-drop handles.',
    seoH1: 'Rearrange PDF Page Order Online',
    seoTitle: 'Rearrange PDF Pages — Change Page Order Free | SRA PDF',
    seoMetaDescription: 'Reorder pages in a PDF file with intuitive drag-and-drop handles. Change PDF page sequence instantly online.',
    category: 'ORGANIZE',
    path: '/reorder-pdf-pages',
    iconName: 'ArrowUpRight',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['organize-pdf', 'rotate-pdf', 'merge-pdf', 'split-pdf'],
    keywords: ['rearrange PDF pages', 'change PDF page order', 'reorder pages in PDF'],
    instructions: [
      'Upload your PDF document.',
      'Drag page thumbnails into your preferred sequential order.',
      'Click "Rearrange PDF" to download the reordered document.'
    ],
    faqs: [
      { question: 'Does rearranging alter page content?', answer: 'No, only the page placement order within the vector stream is updated.' }
    ]
  },

  // OPTIMIZE
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Compress PDF files online without losing quality. Optimize PDF file size for web and email.',
    seoH1: 'Compress PDF Online — Reduce PDF File Size Free',
    seoTitle: 'Compress PDF Online — Reduce File Size Free | SRA PDF',
    seoMetaDescription: 'Compress PDF files online without losing quality. Choose Extreme, Recommended, or Less compression to optimize PDF file size for web and email.',
    category: 'OPTIMIZE',
    path: '/compress-pdf',
    iconName: 'FileArchive',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    relatedToolIds: ['merge-pdf', 'pdf-to-word', 'split-pdf', 'repair-pdf'],
    keywords: ['compress PDF', 'reduce PDF size', 'PDF compressor', 'compress PDF online', 'reduce PDF file size'],
    instructions: [
      'Upload the large PDF file you wish to compress.',
      'Select your preferred compression mode: Extreme, Recommended, or Less Compression.',
      'Click "Compress PDF" to reduce document file size.',
      'View your exact megabyte savings percentage and download your compressed PDF.'
    ],
    faqs: [
      { question: 'How much can a PDF be compressed?', answer: 'Depending on embedded image density and vector content, files are typically reduced by 30% to 75%.' },
      { question: 'Will my text become blurry?', answer: 'Recommended compression optimizes image resolutions while keeping text and vector typography sharp.' }
    ]
  },
  {
    id: 'repair-pdf',
    title: 'Repair PDF',
    description: 'Recover data and fix broken or corrupted PDF structures online.',
    seoH1: 'Repair Corrupted or Damaged PDF Files Online',
    seoTitle: 'Repair PDF Online — Fix Corrupted PDF Files Free | SRA PDF',
    seoMetaDescription: 'Recover data and fix broken or corrupted PDF structures online. Free PDF repair engine rebuilds damaged xref tables.',
    category: 'OPTIMIZE',
    path: '/repair-pdf',
    iconName: 'Wrench',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['compress-pdf', 'flatten-pdf', 'unlock-pdf', 'organize-pdf'],
    keywords: ['repair PDF', 'fix corrupt PDF', 'recover PDF file', 'repair broken PDF online'],
    instructions: [
      'Upload your damaged or unreadable PDF document.',
      'Our repair engine rebuilds file xref tables and object pointers.',
      'Download the recovered PDF file.'
    ],
    faqs: [
      { question: 'Can every corrupt PDF be repaired?', answer: 'Most missing headers and indexing table errors are standardly recoverable.' }
    ]
  },
  {
    id: 'flatten-pdf',
    title: 'Flatten PDF',
    description: 'Convert interactive PDF form fields, checkboxes, and annotations permanently into flat background page graphics.',
    seoH1: 'Flatten PDF Forms and Annotations Online',
    seoTitle: 'Flatten PDF Online — Lock Forms & Layers Free | SRA PDF',
    seoMetaDescription: 'Convert interactive PDF form fields, checkboxes, and annotations permanently into flat background page graphics.',
    category: 'OPTIMIZE',
    path: '/flatten-pdf',
    iconName: 'Layers',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['compress-pdf', 'pdf-editor', 'sign-pdf', 'protect-pdf'],
    keywords: ['flatten PDF', 'flatten PDF form', 'make PDF uneditable', 'lock PDF layers'],
    instructions: [
      'Upload a PDF containing interactive forms, signatures, or annotations.',
      'Click "Flatten PDF".',
      'Download a flattened PDF with unmodifiable form content.'
    ],
    faqs: [
      { question: 'Why flatten a PDF?', answer: 'Flattening prevents recipient editing of form fields, signatures, and markups across different PDF readers.' }
    ]
  },

  // CONVERT
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Convert JPG, PNG, or WebP images into a professional PDF document with custom layout.',
    seoH1: 'Convert JPG to PDF Online Free',
    seoTitle: 'JPG to PDF Converter — Convert Images to PDF Free | SRA PDF',
    seoMetaDescription: 'Convert JPG, PNG, or WebP images into a professional PDF document. Combine multiple photos into one PDF file with custom page layout.',
    category: 'CONVERT',
    path: '/jpg-to-pdf',
    iconName: 'Image',
    popular: true,
    acceptedFileTypes: ['.jpg', '.jpeg', '.png', '.webp'],
    maxFiles: 30,
    badge: 'Popular',
    relatedToolIds: ['png-to-pdf', 'pdf-to-jpg', 'compress-pdf', 'merge-pdf'],
    keywords: ['JPG to PDF', 'convert JPG to PDF', 'image to PDF converter', 'photos to PDF free'],
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
    description: 'Convert PNG graphics and screenshots with full color fidelity into clean PDF documents.',
    seoH1: 'Convert PNG Images to PDF Online',
    seoTitle: 'PNG to PDF Converter — Convert PNG to PDF Free | SRA PDF',
    seoMetaDescription: 'Convert PNG graphics and screenshots with full color fidelity into clean PDF documents. High-quality image conversion.',
    category: 'CONVERT',
    path: '/png-to-pdf',
    iconName: 'FileImage',
    acceptedFileTypes: ['.png'],
    maxFiles: 30,
    relatedToolIds: ['jpg-to-pdf', 'pdf-to-png', 'pdf-to-jpg', 'compress-pdf'],
    keywords: ['PNG to PDF', 'convert PNG to PDF', 'PNG to PDF converter free'],
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
    description: 'Extract all pages of a PDF document into high-resolution JPG images or a packaged ZIP file.',
    seoH1: 'Convert PDF to JPG Images Online',
    seoTitle: 'PDF to JPG Converter — Convert PDF Pages to Images | SRA PDF',
    seoMetaDescription: 'Extract all pages of a PDF document into high-resolution JPG images. Download image files individually or packaged in a ZIP archive.',
    category: 'CONVERT',
    path: '/pdf-to-jpg',
    iconName: 'FileSpreadsheet',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['pdf-to-png', 'jpg-to-pdf', 'pdf-to-word', 'compress-pdf'],
    keywords: ['PDF to JPG', 'convert PDF to JPG', 'extract images from PDF', 'PDF to image converter'],
    instructions: [
      'Upload your PDF file.',
      'Select page rendering resolution quality (72 to 300 DPI).',
      'Click "Convert to JPG" and download image files or a packaged ZIP archive.'
    ],
    faqs: [
      { question: 'What image quality is produced?', answer: 'Images are exported in high-definition 300 DPI JPEG quality.' }
    ]
  },
  {
    id: 'pdf-to-png',
    title: 'PDF to PNG',
    description: 'Convert PDF pages into crisp PNG image files with maximum graphic sharpness.',
    seoH1: 'Convert PDF to High Quality PNG Online',
    seoTitle: 'PDF to PNG Converter — Export PDF as PNG Free | SRA PDF',
    seoMetaDescription: 'Convert PDF pages into crisp PNG image files. High-resolution rendering with maximum graphic sharpness.',
    category: 'CONVERT',
    path: '/pdf-to-png',
    iconName: 'ImagePlus',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['pdf-to-jpg', 'png-to-pdf', 'jpg-to-pdf', 'compress-pdf'],
    keywords: ['PDF to PNG', 'convert PDF to PNG', 'export PDF to PNG free'],
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
    description: 'Convert PDF documents into editable Microsoft Word (.docx) files preserving formatting.',
    seoH1: 'Convert PDF to Word DOCX Online Free',
    seoTitle: 'PDF to Word Converter — Convert PDF to DOCX Free | SRA PDF',
    seoMetaDescription: 'Convert PDF documents into editable Microsoft Word (.docx) files. Preserves text formatting, paragraphs, and structure.',
    category: 'CONVERT',
    path: '/pdf-to-word',
    iconName: 'FileText',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    relatedToolIds: ['word-to-pdf', 'pdf-to-excel', 'pdf-editor', 'compress-pdf'],
    keywords: ['PDF to Word', 'convert PDF to Word', 'PDF to DOCX', 'editable Word from PDF'],
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
    description: 'Convert Microsoft Word (.docx, .doc) files into clean, readable PDF format online.',
    seoH1: 'Convert Word Documents (DOCX) to PDF Free',
    seoTitle: 'Word to PDF Converter — Convert DOCX to PDF Free | SRA PDF',
    seoMetaDescription: 'Convert Microsoft Word (.docx, .doc) files into clean, readable PDF format online. Instant and accurate layout conversion.',
    category: 'CONVERT',
    path: '/word-to-pdf',
    iconName: 'FileUp',
    popular: true,
    acceptedFileTypes: ['.docx', '.doc'],
    maxFiles: 1,
    relatedToolIds: ['pdf-to-word', 'excel-to-pdf', 'ppt-to-pdf', 'compress-pdf'],
    keywords: ['Word to PDF', 'convert Word to PDF', 'DOCX to PDF converter free'],
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
    description: 'Extract tabular data from PDF files directly into editable Excel spreadsheets (.xlsx).',
    seoH1: 'Convert PDF Data Tables to Excel Spreadsheets',
    seoTitle: 'PDF to Excel Converter — Extract Tables to XLSX | SRA PDF',
    seoMetaDescription: 'Extract tabular data from PDF files directly into editable Excel spreadsheets (.xlsx). Fast data table extraction.',
    category: 'CONVERT',
    path: '/pdf-to-excel',
    iconName: 'FileSpreadsheet',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['excel-to-pdf', 'pdf-to-word', 'pdf-to-text', 'compress-pdf'],
    keywords: ['PDF to Excel', 'convert PDF to XLSX', 'extract PDF table to Excel'],
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
    description: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files into clean, printable PDF documents.',
    seoH1: 'Convert Excel Spreadsheets to PDF Online',
    seoTitle: 'Excel to PDF Converter — Convert XLSX to PDF Free | SRA PDF',
    seoMetaDescription: 'Convert Excel spreadsheets (.xlsx, .xls) and CSV files into clean, printable PDF documents with neat row alignments.',
    category: 'CONVERT',
    path: '/excel-to-pdf',
    iconName: 'Table',
    acceptedFileTypes: ['.xlsx', '.xls', '.csv'],
    maxFiles: 1,
    relatedToolIds: ['pdf-to-excel', 'word-to-pdf', 'ppt-to-pdf', 'compress-pdf'],
    keywords: ['Excel to PDF', 'convert XLSX to PDF', 'CSV to PDF converter free'],
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
    description: 'Convert PDF documents into editable PowerPoint presentations (.pptx).',
    seoH1: 'Convert PDF to PowerPoint Presentation (PPTX)',
    seoTitle: 'PDF to PowerPoint Converter — PDF to PPTX Free | SRA PDF',
    seoMetaDescription: 'Convert PDF documents into editable PowerPoint presentations (.pptx). Transform PDF pages into slides instantly.',
    category: 'CONVERT',
    path: '/pdf-to-ppt',
    iconName: 'Presentation',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['ppt-to-pdf', 'pdf-to-word', 'pdf-to-jpg', 'compress-pdf'],
    keywords: ['PDF to PowerPoint', 'PDF to PPTX', 'convert PDF to slides'],
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
    description: 'Convert PowerPoint presentations (.pptx, .ppt) into portable PDF documents.',
    seoH1: 'Convert PowerPoint Slides to PDF Online',
    seoTitle: 'PowerPoint to PDF Converter — PPTX to PDF Free | SRA PDF',
    seoMetaDescription: 'Convert PowerPoint presentations (.pptx, .ppt) into portable PDF documents. Preserves slide layout ratios.',
    category: 'CONVERT',
    path: '/ppt-to-pdf',
    iconName: 'FileInput',
    acceptedFileTypes: ['.pptx', '.ppt'],
    maxFiles: 1,
    relatedToolIds: ['pdf-to-ppt', 'word-to-pdf', 'excel-to-pdf', 'compress-pdf'],
    keywords: ['PowerPoint to PDF', 'PPTX to PDF', 'convert slides to PDF free'],
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
    description: 'Convert HTML code snippets or web documents into formatted PDF files online.',
    seoH1: 'Convert HTML Code to PDF Document',
    seoTitle: 'HTML to PDF Converter — Convert Web Code to PDF | SRA PDF',
    seoMetaDescription: 'Convert HTML code snippets or web documents into formatted PDF files online. Free HTML rendering engine.',
    category: 'CONVERT',
    path: '/html-to-pdf',
    iconName: 'Code',
    acceptedFileTypes: ['.html', '.htm', '.txt'],
    maxFiles: 1,
    relatedToolIds: ['text-to-pdf', 'pdf-to-text', 'word-to-pdf', 'compress-pdf'],
    keywords: ['HTML to PDF', 'convert HTML to PDF', 'web page code to PDF'],
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
    description: 'Convert plain text notes or TXT documents into a clean PDF file.',
    seoH1: 'Convert Text File to PDF Online Free',
    seoTitle: 'Text to PDF Converter — Convert TXT to PDF Free | SRA PDF',
    seoMetaDescription: 'Convert plain text notes or TXT documents into a clean PDF file with custom font and margin formatting.',
    category: 'CONVERT',
    path: '/text-to-pdf',
    iconName: 'FileCode2',
    acceptedFileTypes: ['.txt'],
    maxFiles: 1,
    relatedToolIds: ['html-to-pdf', 'pdf-to-text', 'word-to-pdf', 'compress-pdf'],
    keywords: ['text to PDF', 'TXT to PDF', 'convert plain text to PDF'],
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
    description: 'Add text, freehand drawings, highlights, shapes, whiteout redactions, and signatures to your PDF.',
    seoH1: 'Edit PDF Files Online — Free Online PDF Editor',
    seoTitle: 'Edit PDF Online — Add Text, Annotate & Draw Free | SRA PDF',
    seoMetaDescription: 'Add text, freehand drawings, highlights, shapes, whiteout redactions, and signatures to your PDF online for free.',
    category: 'EDIT',
    path: '/edit-pdf',
    iconName: 'Edit3',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    relatedToolIds: ['sign-pdf', 'watermark-pdf', 'page-numbers', 'rotate-pdf'],
    keywords: ['edit PDF', 'PDF editor online', 'annotate PDF', 'free PDF editor'],
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
    description: 'Rotate individual pages or all pages of your PDF document permanently.',
    seoH1: 'Rotate PDF Pages Online (90°, 180°, 270°)',
    seoTitle: 'Rotate PDF Online — Turn PDF Pages Permanently | SRA PDF',
    seoMetaDescription: 'Rotate individual pages or all pages of your PDF document permanently. Fast online PDF page rotation.',
    category: 'EDIT',
    path: '/rotate-pdf',
    iconName: 'RotateCw',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['crop-pdf', 'organize-pdf', 'rearrange-pages', 'pdf-editor'],
    keywords: ['rotate PDF', 'rotate PDF pages', 'turn PDF landscape to portrait'],
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
    description: 'Trim page margins or isolate specific visual areas of your PDF pages online.',
    seoH1: 'Crop PDF Margins Online Free',
    seoTitle: 'Crop PDF Pages Online — Trim PDF Margins Free | SRA PDF',
    seoMetaDescription: 'Trim page margins or isolate specific visual areas of your PDF pages online. Adjustable visual bounding crop handle.',
    category: 'EDIT',
    path: '/crop-pdf',
    iconName: 'Crop',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['rotate-pdf', 'pdf-editor', 'watermark-pdf', 'compress-pdf'],
    keywords: ['crop PDF', 'trim PDF margins', 'crop PDF pages online free'],
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
    description: 'Add custom text stamps or image watermarks to your PDF pages.',
    seoH1: 'Add Watermark to PDF Documents Online',
    seoTitle: 'Watermark PDF Online — Add Text Stamp or Logo | SRA PDF',
    seoMetaDescription: 'Add custom text stamps or image watermarks to your PDF pages. Customize position, opacity, font size, and rotation angle.',
    category: 'EDIT',
    path: '/watermark-pdf',
    iconName: 'Stamp',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['page-numbers', 'pdf-editor', 'protect-pdf', 'sign-pdf'],
    keywords: ['watermark PDF', 'add watermark to PDF', 'PDF watermark generator'],
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
    description: 'Add customizable sequential page numbering to PDF headers or footers.',
    seoH1: 'Add Page Numbers to PDF Files Online',
    seoTitle: 'Add Page Numbers to PDF — Number PDF Pages Free | SRA PDF',
    seoMetaDescription: 'Add customizable sequential page numbering to PDF headers or footers. Select position, start index, and number formatting.',
    category: 'EDIT',
    path: '/pdf-page-number',
    iconName: 'Hash',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['watermark-pdf', 'pdf-editor', 'organize-pdf', 'merge-pdf'],
    keywords: ['page numbers PDF', 'add page numbers to PDF', 'number PDF pages online'],
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
    description: 'Inspect and edit document Title, Author, Subject, Keywords, and Creator properties of any PDF document.',
    seoH1: 'View and Edit PDF Metadata Attributes',
    seoTitle: 'Edit PDF Metadata Online — Change PDF Title & Author | SRA PDF',
    seoMetaDescription: 'Inspect and edit document Title, Author, Subject, Keywords, and Creator properties of any PDF document.',
    category: 'EDIT',
    path: '/metadata-pdf',
    iconName: 'Info',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['protect-pdf', 'flatten-pdf', 'pdf-editor', 'compress-pdf'],
    keywords: ['edit PDF metadata', 'change PDF title', 'change PDF author', 'PDF info editor'],
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
    description: 'Encrypt your PDF files with strong password protection to prevent unauthorized access.',
    seoH1: 'Password Protect PDF Files Online',
    seoTitle: 'Protect PDF Online — Password Protect PDF Free | SRA PDF',
    seoMetaDescription: 'Encrypt your PDF files with strong password protection. Prevent unauthorized opening, reading, or printing.',
    category: 'SECURITY',
    path: '/protect-pdf',
    iconName: 'Lock',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    relatedToolIds: ['unlock-pdf', 'sign-pdf', 'watermark-pdf', 'compress-pdf'],
    keywords: ['protect PDF', 'password protect PDF', 'encrypt PDF file online'],
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
    description: 'Remove password security and printing restrictions from encrypted PDF documents online.',
    seoH1: 'Unlock Password Protected PDF Files Online',
    seoTitle: 'Unlock PDF Online — Remove Password Restrictions | SRA PDF',
    seoMetaDescription: 'Remove password security and printing restrictions from encrypted PDF documents online.',
    category: 'SECURITY',
    path: '/unlock-pdf',
    iconName: 'Unlock',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['protect-pdf', 'pdf-editor', 'repair-pdf', 'merge-pdf'],
    keywords: ['unlock PDF', 'remove PDF password', 'decrypt PDF file free'],
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
    description: 'Draw, type, or upload an image signature to digitally sign your PDF pages online for free.',
    seoH1: 'Sign PDF Documents Online — Free Electronic Signature',
    seoTitle: 'Sign PDF Online — Free Electronic Signature Tool | SRA PDF',
    seoMetaDescription: 'Draw, type, or upload an image signature to digitally sign your PDF pages online for free.',
    category: 'SECURITY',
    path: '/sign-pdf',
    iconName: 'PenTool',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    relatedToolIds: ['protect-pdf', 'pdf-editor', 'flatten-pdf', 'watermark-pdf'],
    keywords: ['sign PDF', 'electronic signature PDF', 'sign PDF document online free'],
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
    description: 'Compare two PDF documents side by side to detect visual and textual differences automatically.',
    seoH1: 'Compare Two PDF Files Side by Side Online',
    seoTitle: 'Compare PDF Files Online — Diff & Visual Difference | SRA PDF',
    seoMetaDescription: 'Compare two PDF documents side by side to detect visual and textual differences automatically.',
    category: 'SECURITY',
    path: '/compare-pdf',
    iconName: 'GitCompare',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 2,
    relatedToolIds: ['pdf-to-text', 'pdf-metadata', 'ocr-pdf', 'pdf-editor'],
    keywords: ['compare PDF', 'PDF diff tool', 'compare two PDF files online'],
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
    description: 'Recognize text in scanned PDF documents with high precision OCR (English, Bengali, Spanish, French, German).',
    seoH1: 'OCR PDF — Optical Character Recognition for Scanned PDFs',
    seoTitle: 'OCR PDF Online — Convert Scanned PDF to Searchable Text | SRA PDF',
    seoMetaDescription: 'Recognize text in scanned PDF documents with high precision OCR (English, Bengali, Spanish, French, German). Extract searchable text.',
    category: 'OCR',
    path: '/ocr-pdf',
    iconName: 'ScanText',
    popular: true,
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    badge: 'Popular',
    relatedToolIds: ['image-ocr', 'pdf-to-text', 'pdf-to-word', 'compress-pdf'],
    keywords: ['OCR PDF', 'scanned PDF to text', 'searchable PDF OCR', 'PDF OCR Bengali'],
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
    description: 'Extract editable text from JPG, PNG, or WebP image files online.',
    seoH1: 'Extract Text From Image Online (JPG, PNG OCR)',
    seoTitle: 'Image OCR Online — Extract Text From Photos & Screenshots | SRA PDF',
    seoMetaDescription: 'Extract editable text from JPG, PNG, or WebP image files online. Optical character recognition for receipts, documents, and photos.',
    category: 'OCR',
    path: '/image-ocr',
    iconName: 'FileSearch',
    acceptedFileTypes: ['.jpg', '.jpeg', '.png', '.webp'],
    maxFiles: 1,
    relatedToolIds: ['ocr-pdf', 'jpg-to-pdf', 'pdf-to-text', 'png-to-pdf'],
    keywords: ['image OCR', 'extract text from photo', 'picture to text converter'],
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
    seoH1: 'Convert PDF to Plain Text File (.txt) Online',
    seoTitle: 'PDF to Text Converter — Extract Text From PDF | SRA PDF',
    seoMetaDescription: 'Extract raw text content from PDF files for editing, copying, or analysis. Fast text extraction with one click.',
    category: 'OCR',
    path: '/pdf-to-text',
    iconName: 'FileSpreadsheet',
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    relatedToolIds: ['ocr-pdf', 'text-to-pdf', 'pdf-to-word', 'compare-pdf'],
    keywords: ['PDF to text', 'extract text from PDF', 'convert PDF to TXT online'],
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
