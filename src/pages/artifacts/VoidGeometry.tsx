import { ArtifactPage, SectionHeader, Rule, P, ART } from "./ArtifactChrome";

const voids = [
  { num: "I", shape: "circle" },
  { num: "II", shape: "square" },
  { num: "III", shape: "hexagon" },
  { num: "IV", shape: "polygon" },
  { num: "V", shape: "nested" },
  { num: "VI", shape: "spiral" },
];

const VoidShape = ({ shape }: { shape: string }) => {
  const stroke = ART.cream;
  const sw = 1.5;
  switch (shape) {
    case "circle":
      return <circle cx="50" cy="50" r="34" fill="none" stroke={stroke} strokeWidth={sw} />;
    case "square":
      return <rect x="18" y="18" width="64" height="64" fill="none" stroke={stroke} strokeWidth={sw} />;
    case "hexagon":
      return (
        <polygon
          points="50,14 84,32 84,68 50,86 16,68 16,32"
          fill="none"
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    case "polygon":
      return (
        <polygon
          points="22,30 62,16 86,42 74,78 38,84 14,58"
          fill="none"
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    case "nested":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw}>
          <rect x="14" y="14" width="72" height="72" />
          <rect x="26" y="26" width="48" height="48" />
          <rect x="38" y="38" width="24" height="24" />
        </g>
      );
    case "spiral":
      return (
        <path
          d="M50 50 m0 0 a6 6 0 1 1 6 6 a12 12 0 1 1 -18 -6 a20 20 0 1 1 24 -22 a30 30 0 1 1 -38 18"
          fill="none"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      );
    default:
      return null;
  }
};

const VoidsDiagram = () => (
  <div style={{ margin: "32px 0" }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
      }}
    >
      {voids.map((v) => (
        <div key={v.num} style={{ textAlign: "center" }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", maxWidth: 140, height: "auto" }}>
            <VoidShape shape={v.shape} />
          </svg>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: ART.fed,
              marginTop: 8,
              letterSpacing: "0.08em",
            }}
          >
            {v.num}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VoidGeometry = () => (
  <ArtifactPage
    filename="VOID_GEOMETRY.atlas"
    classification="PUBLIC ARCHIVE · UNCLASSIFIED"
    lastModified="2025.11.04"
    title="VOID_GEOMETRY"
    subtitle="a topology of absent surfaces · vol. 01"
  >
    <SectionHeader>PREMISE</SectionHeader>
    <P>
      Negative space is not absence. It is a structure with its own architecture, occupying its own
      dimensions, propagating its own grammar. The discipline of void geometry is the patient mapping
      of these structures — what fills the page when nothing is drawn, what shapes a gap takes when
      bordered by attention.
    </P>
    <P>
      This atlas catalogs six categories of voids, each with its own behavior under translation,
      rotation, and pressure. The reader should not expect resolution. The voids resist resolution
      by definition.
    </P>

    <VoidsDiagram />
    <Rule />

    <SectionHeader>THE SIX VOIDS</SectionHeader>
    <P>
      I.&nbsp;&nbsp;&nbsp;THE BREATHING VOID — expands and contracts in opposition to surrounding
      mass. Most common in domestic interiors and library architecture.
    </P>
    <P>
      II.&nbsp;&nbsp;THE LOCKED VOID — fixed-perimeter, non-deformable. The interior cannot be
      entered. Behavior under sustained observation: nominal.
    </P>
    <P>
      III.&nbsp;THE NESTED VOID — voids within voids. Recursion depth is bounded only by the
      observer's patience.
    </P>
    <P>
      IV.&nbsp;&nbsp;THE LEAKING VOID — boundary is permeable in one direction. Material enters but
      does not exit. Storage capacity is presumed infinite.
    </P>
    <P>
      V.&nbsp;&nbsp;&nbsp;THE FALSE VOID — appears empty but contains a structure rendered in a
      frequency the observer cannot resolve. Distinguishable from true voids only by sustained
      pressure.
    </P>
    <P>
      VI.&nbsp;&nbsp;THE ECHO VOID — produces a measurable signal when struck, despite being empty.
      Signal characteristics depend on observer position. No known applications.
    </P>

    <Rule />

    <SectionHeader>FIELD NOTES (excerpt)</SectionHeader>
    <P>
      The cataloger spent four months mapping the breathing void at the western terminus of the
      Foyer corridor. The void's amplitude was 11cm at the deepest measurement, contracting to
      negligible during periods of high foot traffic. No conclusions were drawn. The cataloger left
      the project.
    </P>
    <P>The original field notes are presumed lost.</P>
  </ArtifactPage>
);

export default VoidGeometry;