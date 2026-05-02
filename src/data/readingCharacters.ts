export interface ReadingCharacter {
  slug: string;
  name: string;
  source: string;
  description: string;
  index: number;
}

export const readingCharacters: ReadingCharacter[] = [
  {
    slug: 'pantagruel-01',
    name: 'CHARACTER 01',
    source: 'from Pantagruel · book ?? · ch. ??',
    description: 'A figure first illustrated in the 19th-century woodcut tradition. The original engraving has been lost. This rotation is reconstructed from a single surviving photograph.',
    index: 1,
  },
  {
    slug: 'pantagruel-02',
    name: 'CHARACTER 02',
    source: 'from Pantagruel · book ?? · ch. ??',
    description: 'One of the lesser-recognized figures from the satirical episodes. Survived in only one printing. Recovered for this archive.',
    index: 2,
  },
  {
    slug: 'pantagruel-03',
    name: 'CHARACTER 03',
    source: 'from Pantagruel · book ?? · ch. ??',
    description: "A character whose appearance was disputed across editions. The version shown here is the cataloger's own composite reconstruction.",
    index: 3,
  },
  {
    slug: 'pantagruel-04',
    name: 'CHARACTER 04',
    source: 'from Pantagruel · book ?? · ch. ??',
    description: 'The fourth and final figure in this collection. Originally rendered by an unnamed apprentice. The rotating reconstruction preserves the original line work.',
    index: 4,
  },
];