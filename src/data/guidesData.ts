export interface GuideArticle {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  publishedDate: string;
  author: string;
  readingTime: string;
  category: string;
  relatedToolPath: string;
  relatedToolTitle: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    steps?: string[];
    tip?: string;
  }[];
  faqs: { question: string; answer: string }[];
}

export const GUIDES_DATA: GuideArticle[] = [
  {
    slug: 'how-to-merge-pdf-files',
    title: 'How to Merge PDF Files Online Easily and Securely',
    seoTitle: 'How to Merge PDF Files Online (Step-by-Step) | SRA PDF',
    metaDescription: 'Learn how to combine multiple PDF files into one single PDF document online for free. Follow our quick step-by-step guide.',
    publishedDate: '2026-08-15',
    author: 'Sahadatur Rahman Anik (SRA Digital Labs)',
    readingTime: '3 min read',
    category: 'Organize',
    relatedToolPath: '/merge-pdf',
    relatedToolTitle: 'Merge PDF Tool',
    summary: 'Combining multiple PDF documents into a single organized file simplifies document management and sharing. Learn the best way to merge PDFs online with SRA PDF.',
    sections: [
      {
        heading: 'Why Merge PDF Files?',
        content: 'Whether you are consolidating monthly reports, combining scanned receipts, or compiling chapters of an ebook, merging PDFs eliminates file clutter and ensures recipients receive one cohesive document.'
      },
      {
        heading: 'Step-by-Step Guide to Merge PDFs Online',
        content: 'Merging PDFs on SRA PDF requires no software downloads or account sign-ups.',
        steps: [
          'Navigate to the SRA PDF Merge PDF tool.',
          'Click "Choose Files" or drag and drop your PDF documents into the upload area.',
          'Arrange the file thumbnails in the exact page order you want them to appear.',
          'Click the "Merge PDF" button to process your document instantly.',
          'Click "Download Merged PDF" to save the consolidated file to your device.'
        ],
        tip: 'Pro Tip: Before merging, make sure none of the input PDFs are password-protected. If one is locked, use the Unlock PDF tool first!'
      },
      {
        heading: 'Security & File Privacy',
        content: 'All file processing on SRA PDF occurs in isolated temporary server memory. Uploaded documents are automatically deleted after 1 hour (TEMP_FILE_TTL), ensuring complete confidentiality for your personal and commercial files.'
      }
    ],
    faqs: [
      { question: 'Is there a limit to how many PDFs I can merge at once?', answer: 'You can merge up to 20 PDF files simultaneously for free on SRA PDF.' },
      { question: 'Does merging affect text quality?', answer: 'No, SRA PDF preserves all original vector graphics, embedded fonts, and text rendering fidelity.' }
    ]
  },
  {
    slug: 'how-to-compress-pdf-without-losing-quality',
    title: 'How to Compress a PDF Without Losing Too Much Quality',
    seoTitle: 'How to Compress a PDF File Without Quality Loss | SRA PDF',
    metaDescription: 'Reduce PDF file size for email and web uploads without sacrificing text clarity or image sharpness. Step-by-step PDF compression guide.',
    publishedDate: '2026-08-16',
    author: 'Sahadatur Rahman Anik (SRA Digital Labs)',
    readingTime: '4 min read',
    category: 'Optimize',
    relatedToolPath: '/compress-pdf',
    relatedToolTitle: 'Compress PDF Tool',
    summary: 'Large PDF documents can exceed email attachment limits or take too long to download on mobile devices. Learn how to optimize and shrink PDF file size efficiently.',
    sections: [
      {
        heading: 'Understanding PDF File Size Compression',
        content: 'PDF file size is primarily driven by high-resolution raster images, uncompressed font subsets, and complex vector streams. Smart compression re-samples embedded images while maintaining crisp vector typography.'
      },
      {
        heading: 'How to Compress PDF Files on SRA PDF',
        content: 'Follow these quick steps to shrink your PDF file size:',
        steps: [
          'Open the Compress PDF tool on SRA PDF.',
          'Upload the PDF document you want to compress.',
          'Choose your compression level: Extreme (maximum size reduction), Recommended (balanced size & clarity), or Less Compression (highest image quality).',
          'Click "Compress PDF" and observe the exact percentage and megabyte savings.',
          'Download your optimized PDF file.'
        ],
        tip: 'For email attachments under 10MB, the "Recommended Compression" mode yields up to 70% size reduction while keeping graphics crystal clear.'
      },
      {
        heading: 'When to Use Extreme Compression',
        content: 'Use Extreme Compression when sending documents over slow mobile networks or uploading to web forms with strict file size caps under 2MB.'
      }
    ],
    faqs: [
      { question: 'Will compressing a PDF make text blurry?', answer: 'No, text typography remains sharp because vector font outlines are preserved.' }
    ]
  },
  {
    slug: 'how-to-convert-pdf-to-word',
    title: 'How to Convert PDF to Editable Word (.docx) Documents',
    seoTitle: 'How to Convert PDF to Word (.docx) Online | SRA PDF',
    metaDescription: 'Turn non-editable PDF files into structured Microsoft Word documents (.docx) for quick editing and formatting updates.',
    publishedDate: '2026-08-17',
    author: 'Sahadatur Rahman Anik (SRA Digital Labs)',
    readingTime: '3 min read',
    category: 'Convert',
    relatedToolPath: '/pdf-to-word',
    relatedToolTitle: 'PDF to Word Tool',
    summary: 'Need to edit a text document or table saved as a PDF? Learn how to convert PDF files into fully editable Word documents in seconds.',
    sections: [
      {
        heading: 'Why Convert PDF to Word?',
        content: 'PDFs are great for viewing, but making structural text edits, replacing images, or updating tables is cumbersome. Converting to DOCX format unlocks full editing capabilities in Microsoft Word, Google Docs, or LibreOffice.'
      },
      {
        heading: 'Steps to Convert PDF to DOCX Online',
        content: 'Convert your PDF to Word effortlessly:',
        steps: [
          'Go to the SRA PDF PDF to Word Converter.',
          'Upload your PDF file.',
          'Click "Convert to Word" to initiate text and paragraph structure parsing.',
          'Download your ready-to-edit DOCX file.'
        ],
        tip: 'If your PDF is a scanned image of text, use our OCR PDF tool first to extract editable text!'
      }
    ],
    faqs: [
      { question: 'Is Microsoft Office required on my computer?', answer: 'No, all conversion processing is executed directly online.' }
    ]
  },
  {
    slug: 'how-to-convert-jpg-images-to-pdf',
    title: 'How to Convert JPG & PNG Images to a Single PDF',
    seoTitle: 'How to Convert JPG Images to PDF Online | SRA PDF',
    metaDescription: 'Combine photos, screenshots, and scanned image files into a single structured PDF document for free.',
    publishedDate: '2026-08-18',
    author: 'Sahadatur Rahman Anik (SRA Digital Labs)',
    readingTime: '3 min read',
    category: 'Convert',
    relatedToolPath: '/jpg-to-pdf',
    relatedToolTitle: 'JPG to PDF Tool',
    summary: 'Submitting assignment photos, receipts, or legal documents as individual JPGs can be messy. Learn how to package images into a single clean PDF file.',
    sections: [
      {
        heading: 'Benefits of Packaging Photos into PDF',
        content: 'PDF files maintain consistent page margins, orientation, and resolution across all screen sizes, preventing missing or misordered photos.'
      },
      {
        heading: 'How to Convert JPG/PNG to PDF Step-by-Step',
        content: 'Follow these steps to turn your pictures into a PDF:',
        steps: [
          'Open the JPG to PDF tool on SRA PDF.',
          'Select and upload one or multiple JPG, PNG, or WebP images.',
          'Adjust page size (A4, Letter, Auto-fit), orientation (Portrait/Landscape), and margin padding.',
          'Click "Convert to PDF" and download your newly compiled PDF file.'
        ]
      }
    ],
    faqs: [
      { question: 'Can I reorder images before converting?', answer: 'Yes! Drag and drop photo thumbnails into your desired sequence.' }
    ]
  },
  {
    slug: 'how-to-sign-pdf-online',
    title: 'How to Electronic Sign a PDF Document Online',
    seoTitle: 'How to Sign a PDF Document Online for Free | SRA PDF',
    metaDescription: 'Draw, type, or upload an image signature to sign contracts and legal PDF forms online with ease.',
    publishedDate: '2026-08-19',
    author: 'Sahadatur Rahman Anik (SRA Digital Labs)',
    readingTime: '3 min read',
    category: 'Security',
    relatedToolPath: '/sign-pdf',
    relatedToolTitle: 'Sign PDF Tool',
    summary: 'Signing contracts, agreements, and tax forms no longer requires printing or scanning paper documents. Learn how to place an electronic signature on any PDF file.',
    sections: [
      {
        heading: 'Methods to Sign PDFs Online',
        content: 'SRA PDF supports three flexible signature creation options: drawing with a mouse/touchscreen, typing in formal script typography, or uploading a high-resolution photo of your physical signature.'
      },
      {
        heading: 'How to Sign Your PDF Document',
        content: 'Follow these simple steps:',
        steps: [
          'Upload your document to the SRA PDF Sign PDF tool.',
          'Select your signature creation mode: Draw, Type, or Image Upload.',
          'Place the signature stamp on the appropriate signature line.',
          'Resize and adjust opacity if desired.',
          'Click "Sign & Download PDF" to permanently embed your electronic signature.'
        ]
      }
    ],
    faqs: [
      { question: 'Are my signatures saved securely?', answer: 'Signatures are stored strictly in your browser session for convenience and are never uploaded to remote databases.' }
    ]
  }
];
