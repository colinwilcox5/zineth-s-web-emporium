export interface FolderItem {
  id: string;
  title: string;
  status: string;
  tag: string;
  body: string;
}

export const folders: FolderItem[] = [
  {
    id: 'ZN-001',
    title: '[VOID_GEOMETRY.exe]',
    status: 'ARCHIVED',
    tag: 'RESTRICTED',
    body: 'The first geometry was discovered in the static between channels. It pulsed at a frequency that matched no known broadcast standard. Researchers at [REDACTED] initially dismissed it as interference, but pattern analysis revealed a recursive structure — a shape that contained itself infinitely. Those who stared at the raw data for too long reported seeing the geometry when they closed their eyes. Three technicians requested transfers. One stopped speaking entirely. The geometry was archived and access restricted to Level 4 clearance and above.',
  },
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
];
