// Omnibus of Fun — Network Data & Types

export interface OmnibusNode {
  id: number;
  label: string;
  depth: number;
  active: boolean;
  parent?: number;
}

export interface OmnibusConnection {
  from: number;
  to: number;
}

export interface OmnibusNetwork {
  nodes: OmnibusNode[];
  connections: OmnibusConnection[];
}

// Riso palette for the Omnibus
export const OMNIBUS_COLORS = {
  yellow: '#FFE800',
  skyBlue: '#4982CF',
  federalBlue: '#3D5588',
  green: '#00A95C',
  pink: '#FF48B0',
  red: '#FF4C65',
  darkBg: '#1a2a3a',
  darkerBg: '#0f1a26',
  cream: '#f2f0ec',
  bookRed: '#c0392b',
  bookRedDark: '#922b21',
  gridLine: 'rgba(0,169,92,0.06)',
  connectionLine: 'rgba(61,85,136,0.3)',
} as const;

// Depth → node color mapping
export function getNodeColor(depth: number, active: boolean): string {
  if (!active) return OMNIBUS_COLORS.red;
  switch (depth) {
    case 0: return OMNIBUS_COLORS.yellow;
    case 1: return OMNIBUS_COLORS.pink;
    case 2: return OMNIBUS_COLORS.skyBlue;
    default: return OMNIBUS_COLORS.green;
  }
}

// Depth → node radius mapping
export function getNodeRadius(depth: number, active: boolean): number {
  if (!active) return 3;
  switch (depth) {
    case 0: return 10;
    case 1: return 7;
    case 2: return 5;
    default: return 4;
  }
}

// Generate the demo network (replace with real crawler data later)
export function generateNetwork(): OmnibusNetwork {
  const nodes: OmnibusNode[] = [];
  const connections: OmnibusConnection[] = [];

  // Seed node
  nodes.push({ id: 0, label: 'zineth.world', depth: 0, active: true });

  // Depth 1
  const d1 = ['strangeloop.net', 'glitchgarden.xyz', 'voidlabel.co', 'softcircuit.club', 'neonpasture.org'];
  d1.forEach((s) => {
    nodes.push({ id: nodes.length, label: s, depth: 1, active: true, parent: 0 });
  });

  // Depth 2
  const d2 = [
    'pixeldust.cafe', 'mythictype.net', 'binaryflora.com', 'quietserver.zone',
    'tangleweb.io', 'fossilnet.org', 'chromadream.xyz', 'patchwork.gallery',
    'driftcode.cc', 'hollowstack.net', 'lucidframe.art', 'zeroglitch.space',
  ];
  d2.forEach((s, i) => {
    const parent = 1 + Math.floor(i / 3);
    nodes.push({ id: nodes.length, label: s, depth: 2, active: Math.random() > 0.1, parent });
  });

  // Depth 3
  const d3 = [
    'mossgrid.club', 'phantomcache.net', 'velvetbyte.org', 'warpfield.zone',
    'solartape.cc', 'ghostmenu.io', 'nectardata.xyz', 'foldspace.art',
    'bleachwave.net', 'coreloop.gallery', 'sporelink.org', 'twilightapi.com',
    'humvault.cc', 'oddpixel.zone', 'neuralweed.net', 'aethertype.art',
    'cosmicjunk.org', 'mutefreq.io', 'lazerglyph.xyz', 'dustchain.net',
    'cryptopetal.cc', 'voidfern.art', 'hyperlichen.zone', 'staticbloom.org',
  ];
  d3.forEach((s, i) => {
    const parent = 6 + Math.floor(i / 2);
    nodes.push({ id: nodes.length, label: s, depth: 3, active: Math.random() > 0.15, parent });
  });

  // Build connections
  nodes.forEach((n) => {
    if (n.parent !== undefined) {
      connections.push({ from: n.parent, to: n.id });
    }
  });

  return { nodes, connections };
}

// Seeded random for consistent "discovered" dates
export function getDiscoveryDate(nodeId: number): string {
  const month = 1 + ((nodeId * 7 + 3) % 3);
  const day = 1 + ((nodeId * 13 + 5) % 28);
  return `2026.0${month}.${String(day).padStart(2, '0')}`;
}
