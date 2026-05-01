export interface ShopProduct {
  slug: string;
  name: string;
  category: 'shirts' | 'hats' | 'posters';
  price: string;
  tag?: string;
  description: string;
  // Image fields are reserved for Colin's real assets in /public/shop/products/.
  // Leaving them empty triggers the diagonal-stripe placeholder pattern.
  imagePrimary?: string;
  imageAlt?: string;
  imageThumbs?: string[];
}

export const shopProducts: ShopProduct[] = [
  // SHIRTS
  { slug: 'omnibus-tee-cream', name: 'Omnibus Tee — Cream', category: 'shirts', price: '$45.00', tag: 'LIMITED', description: 'Heavyweight 100% cotton tee in cream with the Z-sigil printed in fluorescent pink. Drop-shoulder fit, double-needle stitched. Limited to 200 units across the run.' },
  { slug: 'fog-forest-tee', name: 'Fog Forest Tee', category: 'shirts', price: '$50.00', description: 'Hand-screened forest tableau across the back panel in a 4-color Riso registration. Front: small Z-sigil left chest. Cotton 220gsm.' },
  { slug: 'idol-doorway-longsleeve', name: 'Idol Doorway L/S', category: 'shirts', price: '$65.00', tag: 'ARCHIVE', description: 'Long-sleeve in Federal blue with the steel-door composition printed across the back in yellow and cream. From the Idol Doorway capsule. Final pieces in stock.' },
  { slug: 'great-room-tee-black', name: 'Great Room Tee — Black', category: 'shirts', price: '$50.00', description: 'Black 240gsm tee with the Great Room canopy ceiling print on the back in a single yellow pass. Front: small Bacchus motif left chest in pink.' },

  // HATS
  { slug: 'z-sigil-cap-cream', name: 'Z-Sigil Cap — Cream', category: 'hats', price: '$40.00', description: 'Six-panel unstructured dad cap in cream cotton twill. Z-sigil embroidered front-center in pink and yellow. Adjustable strap-back with brass slider.' },
  { slug: 'cd-rom-bucket-fed-blue', name: 'CD-ROM Bucket — Federal Blue', category: 'hats', price: '$45.00', tag: 'LIMITED', description: 'Bucket hat in Federal blue cotton canvas with a CD-ROM-era startup-screen embroidery on the front panel. 50-unit run.' },

  // POSTERS
  { slug: 'foyer-print-18x24', name: 'Foyer Print — 18×24', category: 'posters', price: '$30.00', description: 'Open-edition Riso print of the Foyer tableau on cream 80lb cover. Printed in 4 colors at Tiny Splendor in Oakland. Signed and numbered.' },
  { slug: 'observatory-print-24x36', name: 'Observatory Print — 24×36', category: 'posters', price: '$45.00', tag: 'ARCHIVE', description: 'Large-format Riso of the Observatory composition. Limited edition of 75. Each numbered by hand. Cream paper, 5-color registration.' },
  { slug: 'sigil-poster-set', name: 'Sigil Poster Set (3)', category: 'posters', price: '$60.00', description: 'Set of three 12×18 posters: Z-Sigil Anatomy, Bacchus Bas-Relief Studies, and the Octopus diagram from the Great Room hidden panel. Sold only as a set.' },
];

export const SHOP_CATEGORIES = ['all', 'shirts', 'hats', 'posters'] as const;
export type ShopCategory = typeof SHOP_CATEGORIES[number];

export const GREAT_ROOM_PATH = '/omnibus#great-room';