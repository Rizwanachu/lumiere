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

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "1",
    slug: "classic-gold-dome-ring",
    name: "Classic Dome Ring",
    price: 350,
    category: "rings",
    metal: "14k Gold",
    images: [
      u("photo-1602751584552-8ba73aad10e1"),
      u("photo-1610694955371-d4a3e0ce4b52"),
      u("photo-1589128777073-263566ae5e4d"),
    ],
    description: "A substantial, sculptural dome ring crafted in solid 14k gold. Designed for everyday impact.",
    materials: "Solid 14k yellow gold. Water-friendly and sweat-proof.",
    inStock: true,
    isBestseller: true,
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
      u("photo-1588444837495-c6cfeb53f32d"),
      u("photo-1601121141461-9d6647bca1ed"),
      u("photo-1602751584552-8ba73aad10e1"),
    ],
    description: "A continuous line of ethically sourced diamonds set in 18k gold. The ultimate heirloom.",
    materials: "18k gold, 2.5tcw round brilliant diamonds (VS1, G-H color).",
    inStock: true,
    lowStock: true,
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
      u("photo-1535632066927-ab7c9ab60908"),
      u("photo-1610694955371-d4a3e0ce4b52"),
      u("photo-1611085583191-a3b181a88401"),
    ],
    description: "Lustrous, organic baroque pearls suspended from simple 14k gold huggies.",
    materials: "14k gold, freshwater cultured baroque pearls.",
    inStock: true,
  },
  {
    id: "4",
    slug: "chain-link-bracelet",
    name: "Heavy Link Bracelet",
    price: 495,
    category: "bracelets",
    metal: "14k Gold",
    images: [
      u("photo-1602173574767-37ac01994b2a"),
      u("photo-1588444837495-c6cfeb53f32d"),
      u("photo-1611591437281-460bfbe1220a"),
    ],
    description: "A solid, weighty chain bracelet with a seamless clasp. Substantial enough to wear alone.",
    materials: "Solid 14k gold chain. 7 inches in length.",
    inStock: true,
    isNew: true,
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
      u("photo-1611591437281-460bfbe1220a"),
      u("photo-1584302179602-e4c3d3fd629d"),
      u("photo-1602751584552-8ba73aad10e1"),
    ],
    description: "A striking emerald cut diamond in a minimal platinum bezel setting.",
    materials: "Platinum, 1.5ct emerald cut lab-grown diamond (VVS2, F color).",
    inStock: true,
    isBestseller: true,
  },
  {
    id: "6",
    slug: "textured-hoops",
    name: "Textured Wide Hoops",
    price: 220,
    category: "earrings",
    metal: "14k Gold",
    images: [
      u("photo-1535632066927-ab7c9ab60908"),
      u("photo-1611085583191-a3b181a88401"),
      u("photo-1584302179602-e4c3d3fd629d"),
    ],
    description: "Wide, hollow hoops with a hand-hammered texture for catching the light.",
    materials: "Solid 14k yellow gold.",
    inStock: true,
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
      u("photo-1588444837495-c6cfeb53f32d"),
      u("photo-1589128777073-263566ae5e4d"),
      u("photo-1602751584552-8ba73aad10e1"),
    ],
    description: "A deep blue Australian sapphire on a delicate, sparkling chain.",
    materials: "18k yellow gold, 0.8ct oval cut blue sapphire.",
    inStock: false,
  },
  {
    id: "8",
    slug: "signet-ring-silver",
    name: "Engravable Signet",
    price: 195,
    category: "rings",
    metal: "Sterling Silver",
    images: [
      u("photo-1589128777073-263566ae5e4d"),
      u("photo-1584302179602-e4c3d3fd629d"),
      u("photo-1601121141461-9d6647bca1ed"),
    ],
    description: "A modern take on the traditional signet, polished to a mirror finish.",
    materials: "Solid 925 sterling silver.",
    inStock: true,
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
      u("photo-1611085583191-a3b181a88401"),
      u("photo-1535632066927-ab7c9ab60908"),
      u("photo-1589128777073-263566ae5e4d"),
    ],
    description: "Classic, brilliant-cut diamond studs in a secure three-prong martini setting.",
    materials: "14k gold, 0.5tcw natural diamonds (SI1, H color).",
    inStock: true,
    isBestseller: true,
  },
  {
    id: "10",
    slug: "herringbone-chain",
    name: "Liquid Herringbone Chain",
    price: 380,
    category: "necklaces",
    metal: "14k Gold",
    images: [
      u("photo-1601121141461-9d6647bca1ed"),
      u("photo-1610694955371-d4a3e0ce4b52"),
      u("photo-1588444837495-c6cfeb53f32d"),
    ],
    description: "A flat, slinky chain that drapes beautifully and reflects light like water.",
    materials: "Solid 14k gold, 3mm width.",
    inStock: true,
    isNew: true,
  },
  {
    id: "11",
    slug: "cigar-band-ring",
    name: "Cigar Band Ring",
    price: 420,
    category: "rings",
    metal: "18k Gold",
    images: [
      u("photo-1611591437281-460bfbe1220a"),
      u("photo-1610694955371-d4a3e0ce4b52"),
      u("photo-1602751584552-8ba73aad10e1"),
    ],
    description: "A wide, flat band. Simple, bold, and incredibly comfortable.",
    materials: "18k yellow gold. Comfort fit interior.",
    inStock: true,
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
      u("photo-1588444837495-c6cfeb53f32d"),
      u("photo-1602173574767-37ac01994b2a"),
      u("photo-1601121141461-9d6647bca1ed"),
    ],
    description: "A continuous line of vivid green lab-grown emeralds.",
    materials: "14k gold, 3tcw lab-grown emeralds.",
    inStock: true,
    lowStock: true,
  },
  {
    id: "13",
    slug: "diamond-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    price: 890,
    category: "bracelets",
    metal: "18k Gold",
    stone: "Diamond",
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
      u("photo-1602173574767-37ac01994b2a"),
      u("photo-1588444837495-c6cfeb53f32d"),
    ],
    description: "A classic diamond tennis bracelet set in 18k gold. Each stone hand-selected for brilliance.",
    materials: "18k yellow gold, 2.0tcw round brilliant diamonds (VS2, G color).",
    inStock: true,
    isBestseller: true,
  },
];
