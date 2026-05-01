import { ArtifactPage, SectionHeader, Rule, P, ART } from "./ArtifactChrome";

const RitualDiagram = () => {
  const cx = 100;
  const cy = 100;
  const r = 78;
  const numerals = ["I", "II", "III", "IV", "V", "VI", "VII"];
  return (
    <div style={{ margin: "32px 0", textAlign: "center" }}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 320, height: "auto" }}>
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={ART.cream} strokeWidth={1.5} />

        {/* Seven radial dashes + numerals */}
        {numerals.map((n, i) => {
          const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
          const x1 = cx + Math.cos(angle) * (r - 6);
          const y1 = cy + Math.sin(angle) * (r - 6);
          const x2 = cx + Math.cos(angle) * (r + 6);
          const y2 = cy + Math.sin(angle) * (r + 6);
          const tx = cx + Math.cos(angle) * (r + 16);
          const ty = cy + Math.sin(angle) * (r + 16);
          return (
            <g key={n}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ART.cream} strokeWidth={1.5} />
              <text
                x={tx}
                y={ty}
                fill={ART.fed}
                fontFamily="'Space Mono', monospace"
                fontSize={9}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {n}
              </text>
            </g>
          );
        })}

        {/* Eye: almond outline */}
        <path
          d={`M ${cx - 38} ${cy} Q ${cx} ${cy - 28} ${cx + 38} ${cy} Q ${cx} ${cy + 28} ${cx - 38} ${cy} Z`}
          fill="none"
          stroke={ART.pink}
          strokeWidth={1.5}
        />
        {/* Iris */}
        <circle cx={cx} cy={cy} r={11} fill="none" stroke={ART.pink} strokeWidth={1.5} />
        {/* Pupil / yellow center */}
        <circle cx={cx} cy={cy} r={5} fill={ART.yellow} />
      </svg>
    </div>
  );
};

const AllSeeingRitual = () => (
  <ArtifactPage
    filename="ALL_SEEING.ritual"
    classification="RESTRICTED · BY HAND ONLY"
    lastModified="before the calendar"
    title="ALL_SEEING.ritual"
    subtitle="instructions for the seventh sight"
  >
    <SectionHeader>PREPARATION</SectionHeader>
    <P>
      The ritual requires no special materials. It requires only that you have not slept in the past
      sixteen hours and that you are alone in a room with at least one window. The window must face
      east.
    </P>
    <P>
      Do not perform this ritual in the presence of others. Do not perform it more than twice in a
      calendar year. Do not perform it within four days of a birthday — yours or another's.
    </P>

    <RitualDiagram />
    <Rule />

    <SectionHeader>STEPS</SectionHeader>
    <P>
      (I)&nbsp;&nbsp;&nbsp;&nbsp;Sit on the floor with your back against the wall opposite the
      window. The window must remain in your peripheral vision but not your direct line of sight.
    </P>
    <P>(II)&nbsp;&nbsp;&nbsp;Close one eye. It does not matter which.</P>
    <P>
      (III)&nbsp;&nbsp;Hold this position until you observe the room differently. The first
      observation will be wrong. Wait for the second.
    </P>
    <P>
      (IV)&nbsp;&nbsp;&nbsp;When the second observation arrives, do not move. Do not blink. Allow
      the room to continue its presentation.
    </P>
    <P>
      (V)&nbsp;&nbsp;&nbsp;&nbsp;Note what is missing from the room. Something will be missing that
      was present before. The missing object is the artifact of the ritual.
    </P>
    <P>
      (VI)&nbsp;&nbsp;&nbsp;Open the closed eye. The missing object will return. Do not search for
      it. Do not name it.
    </P>
    <P>(VII)&nbsp;&nbsp;Stand. Leave the room. The ritual is complete.</P>

    <Rule />

    <SectionHeader>AFTERCARE</SectionHeader>
    <P>
      For seven days following the ritual, you will see things differently from how others see them.
      This is expected. It is not permanent. It will fade.
    </P>
    <P>
      If after seven days the difference has not faded, the ritual has taken hold permanently. There
      is no procedure for reversal. We do not recommend the ritual to those who would find this
      outcome unwelcome.
    </P>

    <Rule />

    <SectionHeader>APPENDIX</SectionHeader>
    <P>
      There is no appendix. There has never been an appendix. If you find one, it is not part of
      this document.
    </P>
  </ArtifactPage>
);

export default AllSeeingRitual;