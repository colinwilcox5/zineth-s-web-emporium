import { useRef, useEffect, useCallback } from 'react';
import { OMNIBUS_COLORS, getNodeColor, getNodeRadius } from './omnibusData';
import type { OmnibusNetwork } from './omnibusData';

interface SignalGraphProps {
  network: OmnibusNetwork;
  height?: string;
}

interface NodePosition {
  x: number;
  y: number;
}

const SignalGraph = ({ network, height = '500px' }: SignalGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const positionsRef = useRef<NodePosition[]>([]);

  const layoutNodes = useCallback((W: number, H: number): NodePosition[] => {
    const cx = W / 2;
    const cy = H / 2;
    const positions: NodePosition[] = [];

    network.nodes.forEach((node, i) => {
      let x: number, y: number;

      if (node.depth === 0) {
        x = cx;
        y = cy;
      } else if (node.depth === 1) {
        const angle = (i - 1) * (Math.PI * 2 / 5) - Math.PI / 2;
        const radius = Math.min(W, H) * 0.2;
        x = cx + Math.cos(angle) * radius;
        y = cy + Math.sin(angle) * radius;
      } else if (node.depth === 2) {
        const parentPos = positions[node.parent!];
        const siblings = network.nodes.filter(n => n.parent === node.parent);
        const sibIdx = siblings.indexOf(node);
        const parentAngle = Math.atan2(parentPos.y - cy, parentPos.x - cx);
        const spread = 0.8;
        const angle = parentAngle + (sibIdx - (siblings.length - 1) / 2) * spread;
        const radius = Math.min(W, H) * 0.2;
        x = parentPos.x + Math.cos(angle) * radius;
        y = parentPos.y + Math.sin(angle) * radius;
      } else {
        const parentPos = positions[node.parent!];
        if (parentPos) {
          const siblings = network.nodes.filter(n => n.parent === node.parent);
          const sibIdx = siblings.indexOf(node);
          const parentAngle = Math.atan2(parentPos.y - cy, parentPos.x - cx);
          const spread = 0.6;
          const angle = parentAngle + (sibIdx - (siblings.length - 1) / 2) * spread;
          const radius = Math.min(W, H) * 0.15;
          x = parentPos.x + Math.cos(angle) * radius;
          y = parentPos.y + Math.sin(angle) * radius;
        } else {
          x = Math.random() * W;
          y = Math.random() * H;
        }
      }

      x = Math.max(30, Math.min(W - 30, x));
      y = Math.max(30, Math.min(H - 30, y));
      positions.push({ x, y });
    });

    return positions;
  }, [network]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = OMNIBUS_COLORS.gridLine;
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    const positions = layoutNodes(W, H);
    positionsRef.current = positions;

    // Connections
    ctx.lineWidth = 1;
    network.connections.forEach(conn => {
      const from = positions[conn.from];
      const to = positions[conn.to];
      if (!from || !to) return;
      const toNode = network.nodes[conn.to];
      ctx.strokeStyle = toNode.active ? OMNIBUS_COLORS.connectionLine : 'rgba(255,76,101,0.15)';
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });

    // Nodes
    network.nodes.forEach((node, i) => {
      const pos = positions[i];
      if (!pos) return;

      const color = getNodeColor(node.depth, node.active);
      const radius = getNodeRadius(node.depth, node.active);

      // Glow
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 4, 0, Math.PI * 2);
      ctx.fillStyle = 'transparent';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Dot
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = node.active ? 1 : 0.4;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Label for seed + depth 1
      if (node.depth <= 1) {
        ctx.font = '9px "Space Mono", monospace';
        ctx.fillStyle = OMNIBUS_COLORS.cream;
        ctx.globalAlpha = 0.6;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, pos.x, pos.y + radius + 14);
        ctx.globalAlpha = 1;
      }
    });
  }, [network, layoutNodes]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  return (
    <div style={{ position: 'relative', width: '100%', height, background: OMNIBUS_COLORS.darkerBg, borderRadius: 4, overflow: 'hidden' }}>
      {/* Grid overlay via CSS */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${OMNIBUS_COLORS.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${OMNIBUS_COLORS.gridLine} 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    </div>
  );
};

export default SignalGraph;
