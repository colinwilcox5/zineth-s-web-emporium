import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SignalGraph from '@/components/omnibus/SignalGraph';
import InstructionCard from '@/components/omnibus/InstructionCard';
import NodeList from '@/components/omnibus/NodeList';
import NominationConsole from '@/components/omnibus/NominationConsole';
import { generateNetwork, OMNIBUS_COLORS } from '@/components/omnibus/omnibusData';

type LayerView = 'public' | 'gated';

const OmnibusOfFun = () => {
  const navigate = useNavigate();
  const [layer, setLayer] = useState<LayerView>('public');
  const network = useMemo(() => generateNetwork(), []);
  const activeCount = network.nodes.filter(n => n.active).length;
  const darkCount = network.nodes.filter(n => !n.active).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: OMNIBUS_COLORS.darkBg,
      color: OMNIBUS_COLORS.cream,
      fontFamily: '"Space Mono", monospace',
    }}>
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 100,
          fontFamily: '"Space Mono", monospace',
          fontSize: 10,
          padding: '6px 14px',
          border: `1px solid ${OMNIBUS_COLORS.federalBlue}`,
          background: 'rgba(15,26,38,0.9)',
          color: OMNIBUS_COLORS.cream,
          cursor: 'pointer',
          letterSpacing: 1,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = OMNIBUS_COLORS.yellow; (e.currentTarget as HTMLElement).style.color = OMNIBUS_COLORS.yellow; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = OMNIBUS_COLORS.federalBlue; (e.currentTarget as HTMLElement).style.color = OMNIBUS_COLORS.cream; }}
      >
        ← BACK TO ZINETH
      </button>

      {/* Layer Switcher (will be removed when gating is wired up) */}
      <div style={{
        position: 'fixed', top: 16, right: 16, zIndex: 100,
        display: 'flex', gap: 4,
        background: 'rgba(15,26,38,0.9)',
        padding: 4, borderRadius: 3,
        border: `1px solid ${OMNIBUS_COLORS.federalBlue}`,
      }}>
        <span style={{ fontSize: 8, color: 'rgba(242,240,236,0.4)', padding: '6px 8px' }}>View:</span>
        {(['public', 'gated'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLayer(l)}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 10,
              padding: '6px 14px',
              border: `1px solid ${layer === l ? OMNIBUS_COLORS.yellow : OMNIBUS_COLORS.federalBlue}`,
              background: layer === l ? OMNIBUS_COLORS.federalBlue : 'transparent',
              color: layer === l ? OMNIBUS_COLORS.yellow : OMNIBUS_COLORS.cream,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 1,
              transition: 'all 0.2s',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Header */}
      <div style={{
        position: 'relative',
        padding: '80px 40px 60px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${OMNIBUS_COLORS.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${OMNIBUS_COLORS.gridLine} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        <div style={{
          fontSize: 9, textTransform: 'uppercase', letterSpacing: 3,
          color: 'rgba(242,240,236,0.4)', marginBottom: 30,
          position: 'relative',
        }}>
          Omnibus Global — Brand Systems Division
        </div>

        {/* Title block with red double border */}
        <div style={{
          position: 'relative',
          display: 'inline-block',
          padding: '40px 60px',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            border: `2px solid ${OMNIBUS_COLORS.bookRed}`,
            borderRadius: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', inset: 4,
            border: `1px solid ${OMNIBUS_COLORS.bookRed}`,
            borderRadius: 2, pointerEvents: 'none',
          }} />

          <div style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 14, fontWeight: 300, letterSpacing: 12,
            color: OMNIBUS_COLORS.bookRed, marginBottom: 4,
            textTransform: 'uppercase',
          }}>
            T H E
          </div>
          <div style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 48, fontWeight: 300, letterSpacing: 2,
            color: OMNIBUS_COLORS.cream, lineHeight: 1.1,
          }}>
            omnibus of
          </div>
          <div style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 72, fontWeight: 700,
            color: OMNIBUS_COLORS.bookRed, lineHeight: 1,
          }}>
            FUN
          </div>
          <div style={{
            fontSize: 9, color: 'rgba(242,240,236,0.5)',
            marginTop: 16, lineHeight: 1.8, letterSpacing: 1,
          }}>
            <div>A Complete Compendium of Interesting Websites</div>
            <div>Arranged and Fully Indexed for Easy Browsing</div>
          </div>
        </div>

        <div style={{
          fontSize: 10, fontStyle: 'italic',
          color: 'rgba(242,240,236,0.3)',
          marginTop: 30, position: 'relative',
        }}>
          "A cyclopedia of good times for all ages, anywhere."
        </div>
      </div>

      {/* Status Bar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24,
        padding: '14px 40px',
        background: 'rgba(0,0,0,0.2)',
        borderTop: '1px solid rgba(61,85,136,0.2)',
        borderBottom: '1px solid rgba(61,85,136,0.2)',
      }}>
        {[
          { label: 'Network Status:', value: '● LIVE', live: true, pulse: true },
          { label: 'Active Nodes:', value: String(activeCount) },
          { label: 'Last Crawl:', value: '2026.04.02 — 14:33 UTC' },
          { label: 'New Signals:', value: '+3', live: true },
          { label: 'Nodes Dark:', value: String(darkCount), color: OMNIBUS_COLORS.red },
        ].map(({ label, value, live, pulse, color }) => (
          <div key={label} style={{ fontSize: 9, letterSpacing: 1 }}>
            <span style={{ color: 'rgba(242,240,236,0.4)' }}>{label}</span>{' '}
            <span style={{
              color: color || (live ? OMNIBUS_COLORS.green : OMNIBUS_COLORS.cream),
              fontWeight: 700,
              animation: pulse ? 'flicker 3s infinite' : undefined,
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* PUBLIC LAYER */}
      {layer === 'public' && (
        <>
          {/* Graph */}
          <div style={{ padding: '40px 40px 0' }}>
            <div style={{
              fontSize: 9, textTransform: 'uppercase', letterSpacing: 2,
              color: 'rgba(242,240,236,0.4)', marginBottom: 16,
              borderBottom: '1px solid rgba(61,85,136,0.2)',
              paddingBottom: 8,
            }}>
              [ Signal Map ] — All Tracked Transmissions
            </div>
            <SignalGraph network={network} height="500px" />
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12,
              fontSize: 9, color: 'rgba(242,240,236,0.4)',
            }}>
              {[
                { color: OMNIBUS_COLORS.yellow, label: 'Seed Node (Zineth)' },
                { color: OMNIBUS_COLORS.pink, label: 'Depth 1 — Direct Nomination' },
                { color: OMNIBUS_COLORS.skyBlue, label: 'Depth 2' },
                { color: OMNIBUS_COLORS.green, label: 'Depth 3+' },
                { color: OMNIBUS_COLORS.red, label: 'Node Dark' },
              ].map(({ color, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: color, boxShadow: `0 0 4px ${color}`,
                  }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Instruction cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24, padding: '40px 40px',
          }}>
            <InstructionCard number={1} heading="Get Nominated" body="Someone in the network nominates your website. They vouch for you with one of their five precious nomination slots." note="You cannot join without a nomination" />
            <InstructionCard number={2} heading="Nominate Others" body="Once you're in, you get five nomination slots of your own. Choose wisely — each nomination extends the network by one node." note="Choose sites that spark joy" />
          </div>

          {/* Node directory */}
          <div style={{ padding: '0 40px 40px' }}>
            <div style={{
              fontSize: 9, textTransform: 'uppercase', letterSpacing: 2,
              color: 'rgba(242,240,236,0.4)', marginBottom: 16,
              borderBottom: '1px solid rgba(61,85,136,0.2)',
              paddingBottom: 8,
            }}>
              [ Directory ] — {network.nodes.length} Tracked Nodes — Ordered by Nomination Depth
            </div>
            <NodeList nodes={network.nodes} />
          </div>
        </>
      )}

      {/* GATED LAYER */}
      {layer === 'gated' && (
        <>
          {/* Smaller graph */}
          <div style={{ padding: '40px 40px 0' }}>
            <div style={{
              fontSize: 9, textTransform: 'uppercase', letterSpacing: 2,
              color: 'rgba(242,240,236,0.4)', marginBottom: 16,
              borderBottom: '1px solid rgba(61,85,136,0.2)',
              paddingBottom: 8,
            }}>
              [ Transmission Console ] — Authenticated View — Credential: ZN-0042
            </div>
            <SignalGraph network={network} height="300px" />
          </div>

          {/* Console */}
          <div style={{ padding: '40px' }}>
            <NominationConsole />
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '40px 40px 20px',
        borderTop: '1px solid rgba(61,85,136,0.2)',
      }}>
        <div style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 14, fontWeight: 700,
          color: OMNIBUS_COLORS.bookRed,
          marginBottom: 8,
        }}>
          Omnibus Global
        </div>
        <div style={{
          fontSize: 9, color: 'rgba(242,240,236,0.3)',
          letterSpacing: 1,
        }}>
          A Complete Collection of Everything That Matters
        </div>
      </div>

      {/* Bottom Marquee */}
      <div style={{
        background: OMNIBUS_COLORS.federalBlue,
        padding: '8px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'omnibusMarquee 30s linear infinite',
        }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} style={{
              fontSize: 9, letterSpacing: 3, color: OMNIBUS_COLORS.yellow,
              fontFamily: '"Space Mono", monospace',
            }}>
              The Omnibus of Fun — A Cyclopedia of Good Times for All Ages Anywhere — Presented by Omnibus Global — Brand Systems Division — Est. 2026 —{' '}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee keyframes injected via style tag */}
      <style>{`
        @keyframes omnibusMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default OmnibusOfFun;
