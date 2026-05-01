import { Link, useNavigate } from 'react-router-dom';
import { GREAT_ROOM_PATH, SHOP_CATEGORIES, ShopCategory } from '@/data/shopProducts';

// ──────────────────────────────────────────────
//  PALETTE — Swedish-minimalist register
// ──────────────────────────────────────────────
export const SHOP = {
  cream:    '#f2f0ec',
  black:    '#0A0A0A',
  fed:      '#3D5588',
  yellow:   '#FFE800',
  pink:     '#FF48B0',
  sky:      '#4982CF',
  fedSoft:  'rgba(61,85,136,0.12)',
};

export const FONT_DISPLAY = '"Space Grotesk", system-ui, sans-serif';
export const FONT_MONO    = '"Space Mono", monospace';

// ──────────────────────────────────────────────
//  TOP NAV
// ──────────────────────────────────────────────
interface TopNavProps {
  activeCategory?: ShopCategory;
  onCategoryChange?: (c: ShopCategory) => void;
  showFilters?: boolean;
}

export const ShopTopNav = ({ activeCategory = 'all', onCategoryChange, showFilters = true }: TopNavProps) => {
  const navigate = useNavigate();
  return (
    <nav
      style={{
        position: 'sticky', top: 0, zIndex: 30,
        height: 64,
        background: SHOP.cream,
        borderBottom: `1px solid ${SHOP.fed}`,
        display: 'flex', alignItems: 'center',
        padding: '0 32px',
        gap: 24,
      }}
    >
      {/* Left: sigil + back link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: '0 0 auto' }}>
        <ZSigilMark />
        <button
          type="button"
          onClick={() => navigate(GREAT_ROOM_PATH)}
          className="shop-link"
          style={{
            fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 600,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            color: SHOP.fed, background: 'none', border: 'none',
            cursor: 'pointer', padding: 0,
          }}
        >
          ← Return to the Great Room
        </button>
      </div>

      {/* Center: filters */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {showFilters && (
          <div style={{ display: 'flex', gap: 4 }}>
            {SHOP_CATEGORIES.map((c) => (
              <CategoryPill
                key={c}
                label={c.toUpperCase()}
                active={c === activeCategory}
                onClick={() => onCategoryChange?.(c)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right: PREVIEW ONLY pill */}
      <div style={{ flex: '0 0 auto' }}>
        <span
          style={{
            background: SHOP.pink, color: SHOP.cream,
            fontFamily: FONT_MONO, fontSize: 11,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: 4,
          }}
        >
          Preview Only
        </span>
      </div>
    </nav>
  );
};

const CategoryPill = ({ label, active, onClick }: { label: string; active: boolean; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="shop-pill"
    data-active={active ? 'true' : 'false'}
    style={{
      fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 600,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      padding: '8px 16px', borderRadius: 999,
      border: 'none',
      background: active ? SHOP.yellow : 'transparent',
      color: active ? SHOP.black : SHOP.fed,
      cursor: 'pointer',
      transition: 'background 180ms ease, color 180ms ease',
    }}
  >
    {label}
  </button>
);

// Tiny stand-in sigil mark — keeps chrome self-contained.
const ZSigilMark = () => (
  <Link
    to="/"
    aria-label="Zineth"
    style={{
      width: 24, height: 24, display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center',
      border: `1.5px solid ${SHOP.fed}`,
      borderRadius: 4,
      fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700,
      color: SHOP.fed, textDecoration: 'none',
      lineHeight: 1,
    }}
  >
    Z
  </Link>
);

// ──────────────────────────────────────────────
//  FOOTER
// ──────────────────────────────────────────────
export const ShopFooter = () => {
  const navigate = useNavigate();
  return (
    <footer
      style={{
        marginTop: 120,
        height: 80,
        background: SHOP.cream,
        borderTop: `1px solid ${SHOP.fed}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
        fontFamily: FONT_MONO, fontSize: 12, color: SHOP.fed,
      }}
    >
      <span style={{ letterSpacing: '0.04em' }}>© ZINETH 2026 · all wares previewed only</span>
      <button
        type="button"
        onClick={() => navigate(GREAT_ROOM_PATH)}
        className="shop-link"
        style={{
          fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 600,
          letterSpacing: '0.04em', textTransform: 'uppercase',
          color: SHOP.fed, background: 'none', border: 'none',
          cursor: 'pointer', padding: 0,
        }}
      >
        ← back to the great room
      </button>
    </footer>
  );
};

// ──────────────────────────────────────────────
//  PLACEHOLDER IMAGE — diagonal stripes over cream
// ──────────────────────────────────────────────
interface PlaceholderProps {
  variant?: 'primary' | 'alt';
  label?: string;
}

export const ProductPlaceholder = ({ variant = 'primary', label }: PlaceholderProps) => {
  // 'alt' shifts the stripe color slightly so the hover-swap reads.
  const stripeColor = variant === 'primary'
    ? 'rgba(61,85,136,0.08)'
    : 'rgba(255,72,176,0.10)';
  const angle = variant === 'primary' ? 45 : -45;
  return (
    <div
      aria-hidden
      style={{
        width: '100%', height: '100%',
        background: `repeating-linear-gradient(${angle}deg, ${stripeColor} 0 1px, transparent 1px 12px), ${SHOP.cream}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT_MONO, fontSize: 10,
        color: 'rgba(61,85,136,0.45)',
        letterSpacing: '0.12em', textTransform: 'uppercase',
      }}
    >
      {label ?? 'Image Pending'}
    </div>
  );
};

// ──────────────────────────────────────────────
//  Tag pill (LIMITED / ARCHIVE / PREVIEW ONLY)
// ──────────────────────────────────────────────
export const TagPill = ({ label, inline = false }: { label: string; inline?: boolean }) => (
  <span
    style={{
      display: 'inline-block',
      background: SHOP.pink, color: SHOP.cream,
      fontFamily: FONT_MONO, fontSize: 11,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '4px 10px', borderRadius: 4,
      ...(inline ? {} : { position: 'absolute', top: 12, right: 12, zIndex: 2 }),
    }}
  >
    {label}
  </span>
);