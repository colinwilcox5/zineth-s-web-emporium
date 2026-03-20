// ZINETH — Lore content for the Wolfenstein room

export interface LoreEntry {
  id: string;
  title: string;
  text: string;
}

export const LORE_ENTRIES: Record<string, LoreEntry> = {
  'lore-1': {
    id: 'lore-1',
    title: 'TRANSMISSION 001',
    text: `DATE: ████-██-██
ORIGIN: UNKNOWN FREQUENCY

We found the signal buried in a decommissioned printer. 
A Riso machine, serial number scratched off. 
When we fed it blank paper, it printed the same image 
over and over: a diamond shape, fluorescent pink, 
with coordinates encoded in the halftone pattern.

The coordinates led to a domain registration. 
ZINETH.

We don't know who registered it. 
The WHOIS data loops back to itself.`,
  },
  'lore-2': {
    id: 'lore-2',
    title: 'TRANSMISSION 002',
    text: `DATE: ████-██-██
ORIGIN: INTERNAL MEMO

The clothing arrived without a shipping label. 
No return address. No invoice. Just garments — 
each with a tag reading "ARMOR CLASS: ∞" 
in embossed foil.

Lab analysis confirms the fabric is normal cotton. 
But the print process is unfamiliar. Some kind 
of multi-pass risograph technique that shouldn't 
work on textiles.

The intern who opened the box says she can hear 
humming when she wears the jacket. 
We've reassigned her to a different project.`,
  },
  'lore-3': {
    id: 'lore-3',
    title: 'TRANSMISSION 003',
    text: `DATE: ████-██-██
ORIGIN: FIELD REPORT

The gallery appeared overnight in the basement 
of a parking structure on 4th and Main. 
No construction permits. No security footage 
of anyone entering or leaving.

Inside: six framed prints, each one a different 
color from the ZINETH spectrum. A single folding 
chair. A guest book with one entry:

"You found the room. 
 The room always existed. 
 You just weren't looking at the right frequency."

Signed: Z`,
  },
  'lore-4': {
    id: 'lore-4',
    title: 'TRANSMISSION 004',
    text: `DATE: ████-██-██
ORIGIN: INTERCEPTED BROADCAST

[STATIC]
...the void is not empty. The void is full 
of everything that hasn't been printed yet. 
Every color exists there, waiting for someone 
to align the drums and lay down the ink.

ZINETH is not a brand. ZINETH is a frequency. 
You don't buy ZINETH. You tune into it.

If you're reading this, your receiver is 
already calibrated.

Welcome to the signal.
[END TRANSMISSION]`,
  },
};

export interface ArtEntry {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; // To be filled with actual artwork URLs later
  placeholder: string; // CSS gradient or color for placeholder
}

export const ART_ENTRIES: Record<string, ArtEntry> = {
  'art-1': {
    id: 'art-1',
    title: 'ARTIFACT I: GENESIS PRINT',
    description: 'The first known ZINETH output. Origin unknown.',
    placeholder: `linear-gradient(135deg, #FFE800, #FF48B0)`,
  },
  'art-2': {
    id: 'art-2',
    title: 'ARTIFACT II: FREQUENCY MAP',
    description: 'A cartographic rendering of signals detected in the void.',
    placeholder: `linear-gradient(135deg, #4982CF, #00A95C)`,
  },
  'art-3': {
    id: 'art-3',
    title: 'ARTIFACT III: THE WATCHER',
    description: 'This one watches back.',
    placeholder: `linear-gradient(135deg, #FF4C65, #3D5588)`,
  },
  'art-4': {
    id: 'art-4',
    title: 'ARTIFACT IV: STATIC PRAYER',
    description: 'Recovered from a corrupted floppy disk labeled "DO NOT PRINT."',
    placeholder: `linear-gradient(135deg, #00A95C, #FFE800)`,
  },
};
