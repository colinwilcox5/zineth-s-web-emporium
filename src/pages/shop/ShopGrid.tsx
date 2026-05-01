import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  shopProducts,
  ShopCategory,
  ShopProduct,
} from '@/data/shopProducts';
import {
  SHOP, FONT_DISPLAY, FONT_MONO,
  ShopTopNav, ShopFooter, ProductPlaceholder, TagPill,
} from './shopChrome';

const ShopGrid = () => {
  const [params, setParams] = useSearchParams();
  const initial = (params.get('cat') as ShopCategory | null) ?? 'all';
  const [category, setCategory] = useState<ShopCategory>(initial);

  useEffect(() => { document.title = 'Emporium · Zineth'; }, []);

  // Sync category → URL so RETURN TO GRID restores the filter via history.
  useEffect(() => {
    const next = new URLSearchParams(params);
    if (category === 'all') next.delete('cat'); else next.set('cat', category);
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const visible = useMemo(
    () => category === 'all' ? shopProducts : shopProducts.filter(p => p.category === category),
    [category],
  );

  return (
    <div style={{ background: SHOP.cream, minHeight: '100vh', color: SHOP.black }}>
      <ShopGridStyles />
      <ShopTopNav activeCategory={category} onCategoryChange={setCategory} />

      {/* HERO BAND */}
      <section
        style={{
          background: SHOP.cream,
          padding: '64px 32px',
          minHeight: 200,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: FONT_DISPLAY, fontWeight: 800,
            fontSize: 'clamp(40px, 8vw, 64px)',
            letterSpacing: '0.06em',
            color: SHOP.black, margin: 0,
          }}
        >
          EMPORIUM
        </h1>
        <p
          style={{
            fontFamily: FONT_MONO, fontSize: 14,
            color: SHOP.fed, marginTop: 16,
            letterSpacing: '0.02em',
          }}
        >
          wares from the field — limited drops, no restocks
        </p>
      </section>

      {/* GRID */}
      <section
        style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '32px 32px 80px',
        }}
      >
        <div className="shop-grid">
          {visible.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <ShopFooter />
    </div>
  );
};

// ──────────────────────────────────────────────
//  PRODUCT CARD
// ──────────────────────────────────────────────
const ProductCard = ({ product }: { product: ShopProduct }) => {
  return (
    <Link to={`/shop/${product.slug}`} className="shop-card">
      <div className="shop-card-image">
        {/* Reserve space for the alt image so hover swap doesn't shift layout. */}
        <div className="shop-card-image-primary">
          {product.imagePrimary
            ? <img src={product.imagePrimary} alt={product.name} />
            : <ProductPlaceholder variant="primary" />}
        </div>
        <div className="shop-card-image-alt">
          {product.imageAlt
            ? <img src={product.imageAlt} alt="" />
            : <ProductPlaceholder variant="alt" />}
        </div>
        {product.tag && <TagPill label={product.tag} />}
      </div>

      <div className="shop-card-meta">
        <span className="shop-card-name">{product.name}</span>
        <span className="shop-card-price">{product.price}</span>
      </div>
    </Link>
  );
};

// ──────────────────────────────────────────────
//  Card hover/grid CSS — keeps the hover effects clean and overrides
//  the dark-register cursor styles inherited from the global app.
// ──────────────────────────────────────────────
const ShopGridStyles = () => (
  <style>{`
    .shop-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      column-gap: 28px;
      row-gap: 48px;
    }
    @media (max-width: 1024px) {
      .shop-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 640px) {
      .shop-grid { grid-template-columns: 1fr; }
    }

    .shop-card {
      display: block;
      text-decoration: none;
      color: inherit;
      transform-origin: center center;
      transition: transform 250ms ease-out, box-shadow 250ms ease-out;
      cursor: pointer;
    }
    .shop-card:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(61, 85, 136, 0.12);
    }

    .shop-card-image {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      background: ${SHOP.cream};
      overflow: hidden;
    }
    .shop-card-image-primary,
    .shop-card-image-alt {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      transition: opacity 250ms ease-out;
    }
    .shop-card-image-primary img,
    .shop-card-image-alt img {
      width: 100%; height: 100%;
      object-fit: contain;
      display: block;
    }
    .shop-card-image-alt { opacity: 0; }
    .shop-card:hover .shop-card-image-alt { opacity: 1; }
    .shop-card:hover .shop-card-image-primary { opacity: 0; }

    .shop-card-meta {
      display: flex; flex-direction: column;
      gap: 6px;
      margin-top: 16px;
    }
    .shop-card-name {
      font-family: ${FONT_DISPLAY};
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: ${SHOP.black};
      position: relative;
      padding-bottom: 6px;
      width: fit-content;
    }
    .shop-card-name::after {
      content: '';
      position: absolute;
      left: 0; right: 0; bottom: 0;
      height: 4px;
      background: ${SHOP.yellow};
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform 250ms ease-out;
    }
    .shop-card:hover .shop-card-name::after {
      transform: scaleX(1);
    }
    .shop-card-price {
      font-family: ${FONT_MONO};
      font-weight: 400;
      font-size: 13px;
      color: ${SHOP.fed};
      font-variant-numeric: tabular-nums;
    }

    .shop-link:hover { color: ${SHOP.yellow} !important; }
    .shop-pill[data-active='false']:hover {
      box-shadow: inset 0 -2px 0 ${SHOP.yellow};
    }
  `}</style>
);

export default ShopGrid;