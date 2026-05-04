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
    name: 'Ron Khan',
    source: 'from Pantagruel\'s Drolatic Daydreams',
    description: 'Ron is a Tulpa of Terrific Times. He is also an empath.',
    index: 1,
  },
  {
    slug: 'pantagruel-02',
    name: 'Universal Public Friend',
    source: 'from Pantagruel\'s Drolatic Daydreams',
    description: 'Universal Public Friend notarized the baptism of the last living Dodo Bird. His Love Language is acts of service.',
    index: 2,
  },
  {
    slug: 'pantagruel-03',
    name: 'Hal',
    source: 'from Pantagruel\'s Drolatic Daydreams',
    description: 'Hal hate laptops so much. To the well, they go!',
    index: 3,
  },
  {
    slug: 'pantagruel-04',
    name: 'The Stomp Donkey',
    source: 'from Pantagruel\'s Drolatic Daydreams',
    description: 'Despite being an extremely slow learner, Stomp Donkey was nominated to the undersecretary of Health and Human Services this last year. He could not get through the confirmation process due to his past tweets and also due to being some sort of anthropomorphic jar.',
    index: 4,
  },
];