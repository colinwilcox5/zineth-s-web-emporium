import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shopProducts } from '@/data/shopProducts';
import {
  SHOP, FONT_DISPLAY, FONT_MONO,
  ShopTopNav, ShopFooter, ProductPlaceholder, TagPill,
} from './shopChrome';

const SIZES = ['S', 'M', 'L', 'XL'];

const ShopDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = useMemo(() => shopProducts.find(p => p.slug === slug), [slug]);
  const [thumbIdx, setThumbIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    if (product) document.title = `${product.name} · Zineth`;
  }, [product]);

  if (!product) {
    return (
      <div style={{ background: SHOP.cream, minHeight: '100vh' }}>
        <ShopTopNav showFilters={false} />
        <div style={{ maxWidth: 800, margin: '120px auto', padding: 32, textAlign: 'center' }}>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 36, color: SHOP.black }}>Not Found</h1>
          <p style={{ fontFamily: FONT_MONO, color: SHOP.fed, marginTop: 16 }}>
            That ware does not exist in the archive.
          </p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            style={{
              marginTop: 24,
              fontFamily: FONT_DISPLAY, textTransform: 'uppercase',
              fontSize: 12, letterSpacing: '0.06em',
              padding: '10px 18px', borderRadius: 999,
              background: SHOP.yellow, color: SHOP.black,
              border: 'none', cursor: 'pointer',
            }}
          >
            Back to grid
          </button>
        </div>
        <ShopFooter />
      </div>
    );
  }

  // Build a synthetic thumb list — 4 placeholder slots until real images land.
  const thumbs = product.imageThumbs && product.imageThumbs.length
    ? product.imageThumbs
    : [null, null, null, null];

  return (
    <div style={{ background: SHOP.cream, minHeight: '100vh', color: SHOP.black }}>
      <ShopDetailStyles />
      <ShopTopNav showFilters={false} />

      <main className="shop-detail">
        {/* LEFT: imagery */}
        <section className="shop-detail-media">
          <div className="shop-detail-primary">
            {product.imagePrimary
              ? <img src={product.imagePrimary} alt={product.name} />
              : <ProductPlaceholder variant={thumbIdx % 2 === 0 ? 'primary' : 'alt'} label={`View ${thumbIdx + 1}`} />}
          </div>
          <div className="shop-detail-thumbs">
            {thumbs.map((src, i) => (
              <button
                key={i}
                type="button"
                className="shop-detail-thumb"
                data-active={i === thumbIdx ? 'true' : 'false'}
                onClick={() => setThumbIdx(i)}
                aria-label={`View ${i + 1}`}
              >
                {src
                  ? <img src={src} alt="" />
                  : <ProductPlaceholder variant={i % 2 === 0 ? 'primary' : 'alt'} />}
              </button>
            ))}
          </div>
        </section>

        {/* RIGHT: details */}
        <section className="shop-detail-info">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="shop-link"
            style={{
              fontFamily: FONT_DISPLAY, fontWeight: 600,
              fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: SHOP.fed, background: 'none', border: 'none',
              cursor: 'pointer', padding: 0, alignSelf: 'flex-start',
            }}
          >
            ← Return to Grid
          </button>

          <h1
            style={{
              fontFamily: FONT_DISPLAY, fontWeight: 700,
              fontSize: 36, lineHeight: 1.1,
              letterSpacing: '0.03em', textTransform: 'uppercase',
              color: SHOP.black, marginTop: 24,
            }}
          >
            {product.name}
          </h1>

          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: FONT_MONO, fontWeight: 500,
              fontSize: 18, color: SHOP.fed,
              fontVariantNumeric: 'tabular-nums',
            }}>{product.price}</span>
            {product.tag && <TagPill label={product.tag} inline />}
          </div>

          <p
            style={{
              fontFamily: FONT_DISPLAY, fontWeight: 400,
              fontSize: 15, lineHeight: 1.6,
              color: SHOP.fed, marginTop: 24,
            }}
          >
            {product.description}
          </p>

          {product.category === 'shirts' && (
            <div style={{ marginTop: 32 }}>
              <div style={{
                fontFamily: FONT_DISPLAY, fontSize: 11,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: SHOP.fed, marginBottom: 10,
              }}>Size</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {SIZES.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className="shop-pill"
                    data-active={s === size ? 'true' : 'false'}
                    style={{
                      fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 600,
                      letterSpacing: '0.06em',
                      padding: '6px 14px', borderRadius: 999,
                      border: 'none',
                      background: s === size ? SHOP.yellow : 'transparent',
                      color: s === size ? SHOP.black : SHOP.fed,
                      cursor: 'pointer',
                      transition: 'background 180ms ease, color 180ms ease',
                      boxShadow: s === size ? 'none' : `inset 0 0 0 1px ${SHOP.fed}`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: 40,
              background: SHOP.pink,
              color: SHOP.cream,
              fontFamily: FONT_MONO, fontSize: 14,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: 16, textAlign: 'center',
            }}
          >
            Preview Only — Coming Soon
          </div>

          <p
            style={{
              fontFamily: FONT_MONO, fontSize: 12,
              color: SHOP.fed, marginTop: 12, lineHeight: 1.5,
            }}
          >
            wares from this drop will be available soon. notify list opens when zine 02 ships.
          </p>
        </section>
      </main>

      <ShopFooter />
    </div>
  );
};

const ShopDetailStyles = () => (
  <style>{`
    .shop-detail {
      max-width: 1280px;
      margin: 0 auto;
      padding: 80px 32px;
      display: grid;
      grid-template-columns: 60% 40%;
      gap: 0;
    }
    @media (max-width: 900px) {
      .shop-detail { grid-template-columns: 1fr; gap: 48px; padding: 48px 24px; }
    }

    .shop-detail-media { display: flex; flex-direction: column; gap: 16px; }
    .shop-detail-primary {
      width: 100%;
      aspect-ratio: 1 / 1;
      background: ${SHOP.cream};
      overflow: hidden;
    }
    .shop-detail-primary img {
      width: 100%; height: 100%; object-fit: contain; display: block;
    }
    .shop-detail-thumbs { display: flex; gap: 8px; }
    .shop-detail-thumb {
      width: 60px; height: 60px;
      padding: 0; border: 1px solid transparent;
      background: ${SHOP.cream};
      cursor: pointer;
      overflow: hidden;
      transition: border-color 180ms ease;
    }
    .shop-detail-thumb[data-active='true'] { border-color: ${SHOP.fed}; }
    .shop-detail-thumb:hover { border-color: ${SHOP.yellow}; }
    .shop-detail-thumb img { width: 100%; height: 100%; object-fit: contain; }

    .shop-detail-info {
      display: flex; flex-direction: column;
      padding-left: 32px;
    }
    @media (max-width: 900px) {
      .shop-detail-info { padding-left: 0; }
    }

    .shop-link:hover { color: ${SHOP.yellow} !important; }
    .shop-pill[data-active='false']:hover {
      box-shadow: inset 0 -2px 0 ${SHOP.yellow};
    }
  `}</style>
);

export default ShopDetail;