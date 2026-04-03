// Mid-century activity-book style instruction card

interface InstructionCardProps {
  number: number;
  heading: string;
  body: string;
  note: string;
}

const InstructionCard = ({ number, heading, body, note }: InstructionCardProps) => {
  return (
    <div style={{
      position: 'relative',
      background: '#f2f0ec',
      borderRadius: 4,
      padding: 32,
      fontFamily: '"Space Mono", monospace',
      color: '#3D5588',
    }}>
      {/* Double red border (mid-century book cover style) */}
      <div style={{
        position: 'absolute', inset: 8,
        border: '2px solid #c0392b',
        borderRadius: 2,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 12,
        border: '1px solid #c0392b',
        borderRadius: 2,
        pointerEvents: 'none',
      }} />

      {/* Big red number */}
      <div style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: 72,
        fontWeight: 700,
        color: '#c0392b',
        lineHeight: 1,
        marginBottom: 8,
        textAlign: 'center',
      }}>
        {number}
      </div>

      {/* Heading */}
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: 2,
        textAlign: 'center',
        marginBottom: 16,
        color: '#3D5588',
      }}>
        {heading}
      </div>

      {/* Body */}
      <div style={{
        fontSize: 10,
        lineHeight: 1.8,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
      }}>
        {body}
      </div>

      {/* Note at bottom */}
      <div style={{
        fontSize: 8,
        color: '#999',
        textAlign: 'center',
        textTransform: 'uppercase' as const,
        letterSpacing: 1,
      }}>
        {note}
      </div>
    </div>
  );
};

export default InstructionCard;
