import { useState } from 'react';
import { OMNIBUS_COLORS } from './omnibusData';

const NominationConsole = () => {
  const [nominations, setNominations] = useState(['glitchgarden.xyz', 'voidlabel.co', '', '', '']);
  const [copied, setCopied] = useState(false);

  const filledCount = nominations.filter(n => n.trim() !== '').length;
  const remaining = 5 - filledCount;

  const handleChange = (index: number, value: string) => {
    const next = [...nominations];
    next[index] = value;
    setNominations(next);
  };

  // Build the HTML snippet from current nominations
  const snippet = [
    `<link rel="webchain" href="https://omnibus.zineth.world" />`,
    ...nominations
      .filter(n => n.trim())
      .map(n => `<link rel="webchain-nomination" href="https://${n.replace(/^https?:\/\//, '')}" />`),
  ].join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }}>
      <div style={{
        background: OMNIBUS_COLORS.darkerBg,
        border: `1px solid ${OMNIBUS_COLORS.federalBlue}`,
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 14px',
          background: OMNIBUS_COLORS.federalBlue,
          borderBottom: `1px solid rgba(255,255,255,0.1)`,
        }}>
          <span style={{ fontSize: 9, color: OMNIBUS_COLORS.cream, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
            Omnibus of Fun — Nomination Terminal
          </span>
          <span style={{ fontSize: 8, color: OMNIBUS_COLORS.green }}>
            Session Active
          </span>
        </div>

        {/* Console body */}
        <div style={{ padding: 20 }}>
          {/* Output */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(0,169,92,0.2)',
            borderRadius: 2,
            padding: 16,
            marginBottom: 20,
            fontSize: 10,
            color: OMNIBUS_COLORS.green,
            lineHeight: 1.8,
          }}>
            <div>OMNIBUS GLOBAL // BRAND SYSTEMS DIVISION</div>
            <div>NOMINATION TERMINAL v2.1</div>
            <div>————————————————————————————————————</div>
            <div style={{ marginTop: 8 }}>
              {'>'}{' '}
              <span style={{ color: OMNIBUS_COLORS.cream }}>CREDENTIAL VERIFIED — Zine 01 / Code ZN-0042</span>
            </div>
            <div>
              {'>'}{' '}
              <span style={{ color: OMNIBUS_COLORS.yellow }}>NOMINATION SLOTS: {remaining} of 5 remaining</span>
            </div>
            <div>
              {'>'}{' '}
              <span style={{ color: OMNIBUS_COLORS.cream }}>YOUR NODE: yoursite.com — ACTIVE — Depth 2</span>
            </div>
            <div>
              {'>'}{' '}
              <span style={{ color: OMNIBUS_COLORS.cream }}>NOMINATED BY: strangeloop.net</span>
            </div>
            <div>
              {'>'}{' '}
              <span style={{ color: OMNIBUS_COLORS.pink }}>YOUR NOMINEES: {nominations.filter(n => n.trim()).join(', ') || '(none)'}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <span>Ready for input.</span>
              <span style={{ animation: 'blink 1s step-end infinite' }}>█</span>
            </div>
          </div>

          {/* Your Position panel */}
          <div style={{
            background: 'rgba(61,85,136,0.15)',
            border: `1px solid rgba(61,85,136,0.3)`,
            borderRadius: 3,
            padding: 16,
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{
                fontSize: 9, fontWeight: 700, color: OMNIBUS_COLORS.cream,
                textTransform: 'uppercase', letterSpacing: 1,
              }}>
                Your Position in the Network
              </span>
              <span style={{ fontSize: 8, color: OMNIBUS_COLORS.skyBlue }}>
                Node #23 / Depth 2
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { num: remaining, label: 'Nominations Left' },
                { num: filledCount, label: 'Sites You Nominated' },
                { num: 7, label: 'Sites in Your Branch' },
              ].map(({ num, label }) => (
                <div key={label} style={{
                  background: 'rgba(0,0,0,0.2)', borderRadius: 2, padding: 12, textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: 28, fontWeight: 700, color: OMNIBUS_COLORS.yellow,
                  }}>
                    {num}
                  </div>
                  <div style={{
                    fontSize: 8, color: 'rgba(242,240,236,0.5)',
                    textTransform: 'uppercase', letterSpacing: 1, marginTop: 4,
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nomination form */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: 9, color: OMNIBUS_COLORS.green,
              textTransform: 'uppercase', letterSpacing: 1,
              marginBottom: 12, fontWeight: 700,
            }}>
              [ Submit Nomination ] — Enter URL to nominate
            </div>

            {nominations.map((val, i) => {
              const filled = val.trim() !== '';
              const isLocked = i < 2; // First two are "existing" nominations in the demo
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
                }}>
                  <span style={{
                    fontSize: 9, color: 'rgba(242,240,236,0.3)', width: 30, textAlign: 'right',
                    fontFamily: '"Space Mono", monospace',
                  }}>
                    {String(i + 1).padStart(2, '0')} ›
                  </span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleChange(i, e.target.value)}
                    disabled={isLocked}
                    placeholder="https://..."
                    style={{
                      flex: 1,
                      fontFamily: '"Space Mono", monospace',
                      fontSize: 12,
                      padding: '8px 12px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(0,169,92,0.3)',
                      color: isLocked ? 'rgba(242,240,236,0.5)' : OMNIBUS_COLORS.cream,
                      borderRadius: 2,
                      outline: 'none',
                    }}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = OMNIBUS_COLORS.pink; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(0,169,92,0.3)'; }}
                  />
                  <span style={{
                    fontSize: 8,
                    color: filled ? OMNIBUS_COLORS.green : 'rgba(242,240,236,0.2)',
                    width: 60, textAlign: 'right',
                  }}>
                    {filled ? '● ACTIVE' : '○ EMPTY'}
                  </span>
                </div>
              );
            })}

            <button
              onClick={() => {}}
              style={{
                marginTop: 12,
                fontFamily: '"Space Mono", monospace',
                fontSize: 10,
                padding: '10px 20px',
                background: 'transparent',
                border: `1px solid ${OMNIBUS_COLORS.pink}`,
                color: OMNIBUS_COLORS.pink,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: 1,
                transition: 'all 0.2s',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = OMNIBUS_COLORS.pink;
                (e.currentTarget as HTMLElement).style.color = OMNIBUS_COLORS.darkerBg;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = OMNIBUS_COLORS.pink;
              }}
            >
              [ Transmit Nominations ]
            </button>
          </div>

          {/* HTML Snippet */}
          <div>
            <div style={{
              fontSize: 9, color: OMNIBUS_COLORS.skyBlue,
              textTransform: 'uppercase', letterSpacing: 1,
              marginBottom: 10, fontWeight: 700,
            }}>
              [ Your Markup ] — Add this to your site's &lt;head&gt; to register
            </div>

            <pre style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(73,130,207,0.3)',
              borderRadius: 2,
              padding: 14,
              fontSize: 10,
              color: OMNIBUS_COLORS.cream,
              lineHeight: 1.8,
              overflowX: 'auto',
              margin: 0,
            }}>
              <span style={{ color: OMNIBUS_COLORS.skyBlue }}>&lt;link</span>{' '}
              <span style={{ color: OMNIBUS_COLORS.green }}>rel=</span>
              <span style={{ color: OMNIBUS_COLORS.yellow }}>"webchain"</span>{'\n'}
              {'      '}<span style={{ color: OMNIBUS_COLORS.green }}>href=</span>
              <span style={{ color: OMNIBUS_COLORS.yellow }}>"https://omnibus.zineth.world"</span>{' '}
              <span style={{ color: OMNIBUS_COLORS.skyBlue }}>/&gt;</span>
              {nominations.filter(n => n.trim()).map((n) => (
                <span key={n}>
                  {'\n'}<span style={{ color: OMNIBUS_COLORS.skyBlue }}>&lt;link</span>{' '}
                  <span style={{ color: OMNIBUS_COLORS.green }}>rel=</span>
                  <span style={{ color: OMNIBUS_COLORS.yellow }}>"webchain-nomination"</span>{'\n'}
                  {'      '}<span style={{ color: OMNIBUS_COLORS.green }}>href=</span>
                  <span style={{ color: OMNIBUS_COLORS.yellow }}>"https://{n.replace(/^https?:\/\//, '')}"</span>{' '}
                  <span style={{ color: OMNIBUS_COLORS.skyBlue }}>/&gt;</span>
                </span>
              ))}
            </pre>

            <button
              onClick={handleCopy}
              style={{
                marginTop: 8,
                fontFamily: '"Space Mono", monospace',
                fontSize: 9,
                padding: '6px 12px',
                background: 'transparent',
                border: 'none',
                color: OMNIBUS_COLORS.skyBlue,
                cursor: 'pointer',
                opacity: 0.6,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; }}
            >
              {copied ? '✓ COPIED' : '[ Copy to Clipboard ]'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominationConsole;
