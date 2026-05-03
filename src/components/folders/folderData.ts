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
    id: 'ZN-004',
    title: '[ALL_SEEING.ritual]',
    status: 'SEALED',
    tag: 'SEALED — CLEARANCE REQUIRED',
    body: 'This file has been sealed by order of [REDACTED]. Access requires clearance level [REDACTED] or above. Unauthorized attempts to view this file will be logged and reported to [REDACTED]. The contents pertain to a series of coordinated events observed across seven unrelated locations on [REDACTED]. Witnesses at each site reported identical phenomena despite having no communication with one another. The ritual designation was applied after analysis revealed a temporal pattern consistent with [REDACTED]. Further details are available only through secure channels.',
  },
  {
    id: 'ZN-004',
    title: '[Brand-book-01.pdf]',
    status: 'ARCHIVED',
    tag: 'ARCHIVED',
    type: 'flipbook',
    body: 'PLACEHOLDER — Colin will replace this with his brand-voiced teaser copy. Three to four sentences. Should feel like an in-world archive document description, slightly cryptic, deadpan.',
    manifestUrl: '/artifacts/brand-book-01/manifest.json',
    bookTitle: 'BRAND BOOK 01',
    bookOrientation: 'portrait',
  },
  {
    id: 'ZN-005',
    title: '[Omnibus-Rebrand-Guidelines.pdf]',
    status: 'ARCHIVED',
    tag: 'ARCHIVED',
    type: 'flipbook',
    body: 'PLACEHOLDER — Colin will replace with brand-voiced teaser describing the fictional rebrand from Omnibus Brand Systems to Zineth. Should reference the leaked-internal-document feel and parody-of-corporate-rebrand-decks aesthetic.',
    manifestUrl: '/artifacts/omnibus-rebrand/manifest.json',
    bookTitle: 'OMNIBUS → ZINETH · REBRAND GUIDELINES',
    bookOrientation: 'portrait',
  },
];
