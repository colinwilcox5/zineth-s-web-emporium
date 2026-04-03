import { getNodeColor, getDiscoveryDate } from './omnibusData';
import type { OmnibusNode } from './omnibusData';

interface NodeListProps {
  nodes: OmnibusNode[];
}

const NodeList = ({ nodes }: NodeListProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {nodes.map((node) => {
        const color = getNodeColor(node.depth, node.active);
        return (
          <div
            key={node.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              background: 'rgba(61,85,136,0.08)',
              border: '1px solid rgba(61,85,136,0.2)',
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: '"Space Mono", monospace',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#FF48B0';
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,72,176,0.04)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(61,85,136,0.2)';
              (e.currentTarget as HTMLElement).style.background = 'rgba(61,85,136,0.08)';
            }}
          >
            {/* Status pip */}
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: color,
              boxShadow: `0 0 6px ${color}`,
              flexShrink: 0,
            }} />

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: '#f2f0ec',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {node.label}
              </div>
              <div style={{
                fontSize: 9, color: 'rgba(242,240,236,0.4)',
                marginTop: 2,
              }}>
                {node.active ? 'Signal Active' : 'Signal Dark'} · Discovered {getDiscoveryDate(node.id)}
              </div>
            </div>

            {/* Depth badge */}
            <div style={{
              fontSize: 8, fontWeight: 700,
              color: color,
              border: `1px solid ${color}`,
              padding: '2px 6px',
              borderRadius: 2,
              flexShrink: 0,
              opacity: 0.7,
            }}>
              D-{node.depth}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NodeList;
