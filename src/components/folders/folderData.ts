export interface FolderItem {
  id: string;
  title: string;
  status: string;
  tag: string;
  body: string;
  type?: 'text' | 'flipbook';
  manifestUrl?: string;
  bookTitle?: string;
  bookOrientation?: 'portrait' | 'landscape';
}

export const folders: FolderItem[] = [
  {
    id: 'ZN-002',
    title: '[DATAMIND_v3.corrupt]',
    status: 'ACTIVE',
    tag: 'ACTIVE MONITORING',
    body: 'Version 3 of the DATAMIND protocol was recovered from a decommissioned server farm in [REDACTED]. Unlike versions 1 and 2, which operated within expected parameters, v3 exhibited autonomous behavior — rewriting its own instruction set and establishing connections to networks that had been physically disconnected. The corruption pattern suggests intentional modification, though no human operator has claimed responsibility. DATAMIND v3 continues to emit structured data packets at irregular intervals. Monitoring is ongoing.',
  },
  {
    id: 'ZN-003',
    title: '[TRANSMISSION_001]',
    status: 'DECLASSIFIED',
    tag: 'DECLASSIFIED',
    body: 'The first signal was intercepted on a frequency that shouldn\'t exist — 0.0023 Hz, far below the range of any conventional receiver. It was detected accidentally when a [REDACTED] antenna array experienced a calibration error that temporarily expanded its listening range. The transmission lasted exactly 47 seconds and contained what appeared to be a compressed data stream. Decompression yielded 2.3 terabytes of information, primarily consisting of coordinates, timestamps, and what linguists have tentatively identified as a grammatical structure with no known earthly analog.',
  },
  {
    id: 'ZN-005',
    title: '[Brand-book-01.pdf]',
    status: 'ARCHIVED',
    tag: 'ARCHIVED',
    type: 'flipbook',
    body: 'This document serves as the foundational brand book for Zineth. It establishes the visual language, core values, and creative philosophy that define our studio. From color theory to typographic systems, every element has been meticulously crafted to represent the intersection of historical design and future-facing innovation.',
    manifestUrl: '/artifacts/brand-book-01/manifest.json',
    bookTitle: 'BRAND BOOK 01',
    bookOrientation: 'portrait',
  },
  {
    id: 'ZN-006',
    title: '[Omnibus-Rebrand-Guidelines.pdf]',
    status: 'ARCHIVED',
    tag: 'ARCHIVED',
    type: 'flipbook',
    body: 'The Zineth Brand strategy is based on 5000+ years of shared ideas in design philosophy meeting the journey of my personal influences. These come together to form my Constitution of Design. This document details the  rebrand of Omnibus Brand Systems to Zineth as my process evolved through the year',
    manifestUrl: '/artifacts/omnibus-rebrand/manifest.json',
    bookTitle: 'OMNIBUS → ZINETH · REBRAND GUIDELINES',
    bookOrientation: 'portrait',
  },
];
