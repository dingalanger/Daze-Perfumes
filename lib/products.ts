export type Product = {
  id: string
  slug: string
  name: string
  price: number
  category: 'Signature' | 'Zodiac'
  shortDescription: string
  longDescription: string
  notes: string[]
  image: string
}

export const products: Product[] = [
  {
    id: 'pear',
    slug: 'pear',
    name: 'Pear',
    price: 120,
    category: 'Signature',
    shortDescription: 'Juicy Asian pear with a crisp, cool sparkle and soft musk.',
    longDescription:
      'Inspired by orchard mornings, Pear opens with a juicy Asian pear accord over a cool, dew‑kissed breeze. A silken veil of lily and white musk settles into a soft, modern skin scent.',
    notes: ['Asian Pear', 'Lily Petals', 'White Musk', 'Cool Breeze'],
    image: '/images/Pear.png',
  },
  {
    id: 'boba',
    slug: 'boba-tea',
    name: 'Boba Tea',
    price: 120,
    category: 'Signature',
    shortDescription: 'Milky black tea with brown sugar pearls and vanilla cream.',
    longDescription:
      'Comforting and addictive, Boba Tea blends steamed black tea and warm brown sugar with a swirl of vanilla cream. A cozy gourmand with a gentle, modern finish.',
    notes: ['Black Tea', 'Brown Sugar', 'Vanilla Cream', 'Soft Woods'],
    image: '/images/Boba.png',
  },
  {
    id: 'rice',
    slug: 'steamed-rice',
    name: 'Steamed Rice',
    price: 120,
    category: 'Signature',
    shortDescription: 'Warm steamed jasmine rice with a soft, comforting aura.',
    longDescription:
      'An intimate, minimalist scent that captures the warmth of steamed jasmine rice. Clean musk and airy comfort create a serene, cocooning trail.',
    notes: ['Jasmine Rice', 'Rice Steam Accord', 'Clean Musk', 'Soft Warmth'],
    image: '/images/Steamed rice.png',
  },
  {
    id: 'stallion',
    slug: 'stallion',
    name: 'Stallion',
    price: 120,
    category: 'Zodiac',
    shortDescription: 'Year of the Horse limited edition. Dark leather, osmanthus, and amber.',
    longDescription:
      'A gallop of dark leather illuminated by golden osmanthus and amber. Stallion rides between shadow and glow with a confident, modern elegance.',
    notes: ['Osmanthus', 'Dark Leather', 'Amber', 'Saffron'],
    image: '/images/Stallion.png',
  },
] 