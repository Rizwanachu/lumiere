export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets';
  metal: '14k Gold' | '18k Gold' | 'Sterling Silver' | 'Rose Gold' | 'Platinum';
  stone?: string;
  images: string[];
  description: string;
  materials: string;
  inStock: boolean;
  lowStock?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "classic-gold-dome-ring",
    name: "Classic Dome Ring",
    price: 350,
    category: "rings",
    metal: "14k Gold",
    images: [
      "https://images.unsplash.com/photo-1611591437268-dfc6fbdab9d4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478514-469077228a8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A substantial, sculptural dome ring crafted in solid 14k gold. Designed for everyday impact.",
    materials: "Solid 14k yellow gold. Water-friendly and sweat-proof.",
    inStock: true,
    isBestseller: true
  },
  {
    id: "2",
    slug: "diamond-tennis-necklace",
    name: "Diamond Rivière Necklace",
    price: 2400,
    category: "necklaces",
    metal: "18k Gold",
    stone: "Diamond",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530e55622067?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515562259-D0B2C5E7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A continuous line of ethically sourced diamonds set in 18k gold. The ultimate heirloom.",
    materials: "18k gold, 2.5tcw round brilliant diamonds (VS1, G-H color).",
    inStock: true,
    lowStock: true
  },
  {
    id: "3",
    slug: "organic-pearl-drops",
    name: "Baroque Pearl Drops",
    price: 185,
    salePrice: 150,
    category: "earrings",
    metal: "14k Gold",
    stone: "Pearl",
    images: [
      "https://images.unsplash.com/photo-1543294001-f1cd4b1bcd5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582214309324-cfdb22f99d55?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Lustrous, organic baroque pearls suspended from simple 14k gold huggies.",
    materials: "14k gold, freshwater cultured baroque pearls.",
    inStock: true
  },
  {
    id: "4",
    slug: "chain-link-bracelet",
    name: "Heavy Link Bracelet",
    price: 495,
    category: "bracelets",
    metal: "14k Gold",
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583060233486-53860cb67bd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A solid, weighty chain bracelet with a seamless clasp. Substantial enough to wear alone.",
    materials: "Solid 14k gold chain. 7 inches in length.",
    inStock: true,
    isNew: true
  },
  {
    id: "5",
    slug: "emerald-cut-solitaire",
    name: "Emerald Cut Solitaire Ring",
    price: 3200,
    category: "rings",
    metal: "Platinum",
    stone: "Diamond",
    images: [
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036161-d603afccf925?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A striking emerald cut diamond in a minimal platinum bezel setting.",
    materials: "Platinum, 1.5ct emerald cut lab-grown diamond (VVS2, F color).",
    inStock: true,
    isBestseller: true
  },
  {
    id: "6",
    slug: "textured-hoops",
    name: "Textured Wide Hoops",
    price: 220,
    category: "earrings",
    metal: "14k Gold",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e2523d1e4dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582214309324-cfdb22f99d55?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Wide, hollow hoops with a hand-hammered texture for catching the light.",
    materials: "14k gold plating over sterling silver core.",
    inStock: true
  },
  {
    id: "7",
    slug: "sapphire-pendant",
    name: "Blue Sapphire Pendant",
    price: 850,
    category: "necklaces",
    metal: "18k Gold",
    stone: "Sapphire",
    images: [
      "https://images.unsplash.com/photo-1599643478514-469077228a8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515562259-D0B2C5E7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A deep blue Australian sapphire on a delicate, sparkling chain.",
    materials: "18k yellow gold, 0.8ct oval cut blue sapphire.",
    inStock: false
  },
  {
    id: "8",
    slug: "signet-ring-silver",
    name: "Engravable Signet",
    price: 195,
    category: "rings",
    metal: "Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1506630368879-13809fb0366a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591437268-dfc6fbdab9d4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A modern take on the traditional signet, polished to a mirror finish.",
    materials: "Solid 925 sterling silver.",
    inStock: true
  },
  {
    id: "9",
    slug: "diamond-studs",
    name: "Everyday Diamond Studs",
    price: 650,
    salePrice: 580,
    category: "earrings",
    metal: "14k Gold",
    stone: "Diamond",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1635767798638-3e2523d1e4dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582214309324-cfdb22f99d55?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Classic, brilliant-cut diamond studs in a secure three-prong martini setting.",
    materials: "14k gold, 0.5tcw natural diamonds (SI1, H color).",
    inStock: true,
    isBestseller: true
  },
  {
    id: "10",
    slug: "herringbone-chain",
    name: "Liquid Herringbone Chain",
    price: 380,
    category: "necklaces",
    metal: "14k Gold",
    images: [
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643477877-530e55622067?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515562259-D0B2C5E7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A flat, slinky chain that drapes beautifully and reflects light like water.",
    materials: "Solid 14k gold, 3mm width.",
    inStock: true,
    isNew: true
  },
  {
    id: "11",
    slug: "cigar-band-ring",
    name: "Cigar Band Ring",
    price: 420,
    category: "rings",
    metal: "18k Gold",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506630368879-13809fb0366a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A wide, flat band. Simple, bold, and incredibly comfortable.",
    materials: "18k yellow gold. Comfort fit interior.",
    inStock: true
  },
  {
    id: "12",
    slug: "emerald-tennis-bracelet",
    name: "Emerald Tennis Bracelet",
    price: 1800,
    category: "bracelets",
    metal: "14k Gold",
    stone: "Emerald",
    images: [
      "https://images.unsplash.com/photo-1583060233486-53860cb67bd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A continuous line of vivid green lab-grown emeralds.",
    materials: "14k gold, 3tcw lab-grown emeralds.",
    inStock: true,
    lowStock: true
  }
];
