// PatchPanel — Utility Closet's re-skin of the webchain graph as a
// telephone-exchange-style breaker panel. Reuses omnibusData.ts.
import { useMemo, useState } from 'react';
import { generateNetwork, getNodeColor } from '../omnibusData';
import { SIGIL_COLORS } from '../sceneTypes';

const PatchPanel = () => {
  const network = useMemo(() => generateNetwork(), []);
  const [hovered, setHovered] = useState<number | null>(null);

  // Lay nodes out in a grid by depth: depth 0 top, then concentric rows
  const positions = useMemo(() => {
    const map = new Map<number, { x: number; y: number }>();
    const byDepth = new Map<number, number[]>();
    network.nodes.forEach((n) => {
      const arr = byDepth.get(n.depth) || [];
      arr.push(n.id);
      byDepth.set(n.depth, arr);
    });
    const depths = Array.from(byDepth.keys()).sort((a, b) => a - b);
    depths.forEach((depth) => {
      const ids = byDepth.get(depth)!;
      const yBase = 8 + depth * 22;
      ids.forEach((id, i) => {
        const x = ((i + 0.5) / ids.length) * 96 + 2;
        map.set(id, { x, y: yBase });
      });
    });
    return map;
  }, [network]);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, #2a2418, #1a1410)`,
      border: `4px solid ${SIGIL_COLORS.yellow}80`,
      boxShadow: 'inset 0 0 24px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Title plate */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0,
        padding: 6, textAlign: 'center',
        background: SIGIL_COLORS.black,
        borderBottom: `1px solid ${SIGIL_COLORS.yellow}`,
        fontFamily: '"Space Mono", monospace',
        fontSize: 9, letterSpacing: 3, color: SIGIL_COLORS.yellow,
        textTransform: 'uppercase', fontWeight: 700,
      }}>
        OMNIBUS PATCH PANEL — SIGNAL ROUTING
      </div>

      {/* Cables (connections) */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {network.connections.map((c, i) => {
          const a = positions.get(c.from);
          const b = positions.get(c.to);
          if (!a || !b) return null;
          const node = network.nodes.find((n) => n.id === c.to);
          const color = node ? getNodeColor(node.depth, true) : SIGIL_COLORS.green;
          const midY = (a.y + b.y) / 2 + 8;
          return (
            <path
              key={i}
              d={`M ${a.x}% ${a.y}% C ${a.x}% ${midY}%, ${b.x}% ${midY}%, ${b.x}% ${b.y}%`}
              stroke={color}
              strokeWidth={1.4}
              fill="none"
              opacity={0.55}
            />
          );
        })}
      </svg>

      {/* Ports */}
      {network.nodes.map((node) => {
        const pos = positions.get(node.id);
        if (!pos) return null;
        const color = getNodeColor(node.depth, node.active);
        const isHovered = hovered === node.id;
        return (
          <div
            key={node.id}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'absolute',
              left: `${pos.x}%`, top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              width: 14, height: 14,
              borderRadius: '50%',
              background: SIGIL_COLORS.black,
              border: `2px solid ${color}`,
              boxShadow: node.active
                ? `0 0 6px ${color}, inset 0 0 4px ${color}`
                : 'inset 0 0 4px rgba(255,76,101,0.3)',
              cursor: 'none',
            }}
          >
            {/* LED */}
            <div style={{
              position: 'absolute', inset: 3,
              borderRadius: '50%',
              background: color,
              opacity: node.active ? 1 : 0.3,
              animation: node.active ? 'ledPulse 2s ease-in-out infinite' : undefined,
            }} />
            {/* Tooltip */}
            {isHovered && (
              <div style={{
                position: 'absolute', bottom: '160%', left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: '"Space Mono", monospace',
                fontSize: 9, letterSpacing: 1, color: SIGIL_COLORS.cream,
                background: SIGIL_COLORS.black,
                border: `1px solid ${color}`,
                padding: '3px 6px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 10,
              }}>
                {node.label} · D-{node.depth}
              </div>
            )}
          </div>
        );
      })}

      {/* Footer plate */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: 4, textAlign: 'center',
        background: SIGIL_COLORS.black,
        borderTop: `1px solid ${SIGIL_COLORS.yellow}40`,
        fontFamily: '"Space Mono", monospace',
        fontSize: 7, letterSpacing: 2, color: SIGIL_COLORS.green,
        textTransform: 'uppercase',
      }}>
        {network.nodes.filter((n) => n.active).length}/{network.nodes.length} ACTIVE — LAST SWEEP 14:33 UTC
      </div>
    </div>
  );
};

export default PatchPanel;
