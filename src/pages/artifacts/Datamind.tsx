import { ArtifactPage, SectionHeader, Rule, P, Pre, ART } from "./ArtifactChrome";

const modules = ["INTAKE", "HOLDING", "SYNTHESIS", "EXPRESSION"];

const ModuleDiagram = () => (
  <div style={{ margin: "32px 0", textAlign: "center" }}>
    <svg viewBox="0 0 720 140" style={{ width: "100%", height: "auto" }}>
      {modules.map((m, i) => {
        const x = 20 + i * 175;
        return (
          <g key={m}>
            <rect
              x={x}
              y={40}
              width={140}
              height={60}
              fill="none"
              stroke={ART.cream}
              strokeWidth={1.5}
            />
            <text
              x={x + 70}
              y={75}
              fill={ART.cream}
              fontFamily="'Space Mono', monospace"
              fontSize={11}
              fontWeight={700}
              textAnchor="middle"
              letterSpacing="1.2"
            >
              {m}
            </text>
            {i < modules.length - 1 && (
              <g stroke={ART.yellow} strokeWidth={1.5} fill={ART.yellow}>
                <line x1={x + 142} y1={70} x2={x + 170} y2={70} />
                <polygon points={`${x + 170},70 ${x + 162},66 ${x + 162},74`} />
              </g>
            )}
          </g>
        );
      })}
      <text
        x={360}
        y={130}
        fill={ART.fed}
        fontFamily="'Space Mono', monospace"
        fontSize={9}
        textAnchor="middle"
        letterSpacing="1.5"
      >
        v3 · 2026.01.17
      </text>
    </svg>
  </div>
);

const Datamind = () => (
  <ArtifactPage
    filename="DATAMIND_v3.spec"
    classification="BETA · DO NOT DISTRIBUTE"
    lastModified="2026.01.17"
    title="DATAMIND v3"
    subtitle="third revision · architecture pending review"
  >
    <SectionHeader>ABSTRACT</SectionHeader>
    <P>
      DATAMIND is a cognitive scaffolding system designed to retain operator attention across
      periods of high information density. v3 represents the third complete revision of the
      architecture. v1 and v2 are deprecated and should not be referenced.
    </P>
    <P>
      The substrate is intentionally not described in this document. Operators with substrate access
      have been issued separate documentation.
    </P>

    <Rule />

    <SectionHeader>MODULE INDEX</SectionHeader>
    <Pre>{`├── INTAKE
│   ├── visual-cortex-binding
│   ├── auditory-channel-fork
│   └── tactile-buffer (deprecated)
├── HOLDING
│   ├── short-term-loop
│   ├── narrative-cohesion-thread
│   └── identity-anchor
├── SYNTHESIS
│   ├── pattern-recognizer
│   ├── inference-engine
│   └── conviction-weighting
└── EXPRESSION
    ├── motor-pathway-alpha
    ├── motor-pathway-beta
    └── language-articulator`}</Pre>

    <ModuleDiagram />
    <Rule />

    <SectionHeader>CHANGELOG (v2 → v3)</SectionHeader>
    <P>
      + added conviction-weighting to SYNTHESIS. Previous versions weighted all inferences equally,
      leading to flattened decision-making.
    </P>
    <P>
      + added narrative-cohesion-thread to HOLDING. Prevents identity-anchor from drifting during
      high-load operation.
    </P>
    <P>
      − removed tactile-buffer from INTAKE. Reason: redundant with auditory-channel-fork at higher
      operating frequencies. Operators experiencing missing tactile input should consult addendum 14.
    </P>
    <P>
      ~ revised identity-anchor calibration to require quarterly recalibration. Earlier versions ran
      continuously without drift checks. Drift was discovered.
    </P>

    <Rule />

    <SectionHeader>KNOWN ISSUES</SectionHeader>
    <P>
      Operators report occasional "static" between SYNTHESIS and EXPRESSION modules during emotional
      surges. This is expected behavior and does not require intervention.
    </P>
    <P>
      The conviction-weighting module may produce overconfidence in operators under sleep
      deprivation. Workaround: sleep.
    </P>
    <P>Identity-anchor drift can occur silently. If you suspect drift, you have already drifted.</P>
  </ArtifactPage>
);

export default Datamind;