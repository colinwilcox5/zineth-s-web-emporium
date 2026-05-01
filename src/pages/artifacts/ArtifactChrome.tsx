import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export const ART = {
  bg: "#0a1119",
  cream: "#f2f0ec",
  fed: "#3D5588",
  yellow: "#FFE800",
  pink: "#FF48B0",
};

export const Rule = () => (
  <div
    aria-hidden
    style={{
      color: ART.fed,
      opacity: 0.3,
      fontFamily: "'Space Mono', monospace",
      fontSize: 14,
      letterSpacing: "0.1em",
      margin: "32px 0",
      userSelect: "none",
      whiteSpace: "nowrap",
      overflow: "hidden",
    }}
  >
    ─────────────────────────────────────────────────────────────────────────────
  </div>
);

export const SectionHeader = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: "'Space Mono', monospace",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: ART.yellow,
      margin: "0 0 16px 0",
    }}
  >
    <span style={{ color: ART.yellow, marginRight: 8 }}>[§]</span>
    {children}
  </h2>
);

export const ReturnLink = ({ label = "← RETURN TO HOMEPAGE" }: { label?: string }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      onMouseEnter={(e) => (e.currentTarget.style.color = ART.yellow)}
      onMouseLeave={(e) => (e.currentTarget.style.color = ART.cream)}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: ART.cream,
        transition: "color 150ms",
      }}
    >
      {label}
    </button>
  );
};

interface ArtifactPageProps {
  filename: string;
  classification: string;
  lastModified: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const ArtifactPage = ({
  filename,
  classification,
  lastModified,
  title,
  subtitle,
  children,
}: ArtifactPageProps) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: ART.bg,
        color: ART.cream,
        fontFamily: "'Space Mono', monospace",
        position: "relative",
      }}
    >
      {/* Scan-line overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 800,
          margin: "0 auto",
          padding: "80px 64px",
        }}
      >
        <ReturnLink />
        <Rule />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "8px 24px",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ color: ART.fed, fontWeight: 700 }}>FILE</span>
          <span style={{ color: ART.cream }}>{filename}</span>
          <span style={{ color: ART.fed, fontWeight: 700 }}>CLASSIFICATION</span>
          <span style={{ color: ART.pink, fontWeight: 700 }}>{classification}</span>
          <span style={{ color: ART.fed, fontWeight: 700 }}>LAST MODIFIED</span>
          <span style={{ color: ART.cream }}>{lastModified}</span>
        </div>

        <Rule />

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 48,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: ART.cream,
            margin: "32px 0 12px 0",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 16,
            color: ART.fed,
            margin: "0 0 48px 0",
          }}
        >
          {subtitle}
        </p>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 1.6,
            color: ART.cream,
          }}
        >
          {children}
        </div>

        <div style={{ height: 80 }} />

        <Rule />
        <div style={{ textAlign: "center", fontSize: 12, color: ART.cream }}>
          <div style={{ marginBottom: 16, letterSpacing: "0.1em" }}>END OF DOCUMENT</div>
          <ReturnLink />
        </div>
      </div>
    </div>
  );
};

export const Body = ({ children }: { children: ReactNode }) => (
  <div style={{ marginBottom: 24 }}>{children}</div>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p style={{ margin: "0 0 16px 0" }}>{children}</p>
);

export const Pre = ({ children }: { children: ReactNode }) => (
  <pre
    style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: 13,
      lineHeight: 1.6,
      color: ART.cream,
      margin: "0 0 16px 0",
      whiteSpace: "pre-wrap",
    }}
  >
    {children}
  </pre>
);