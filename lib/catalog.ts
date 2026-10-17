export type CategoryId =
  | 'electronics'
  | 'fashion'
  | 'footwear'
  | 'home'
  | 'beauty'
  | 'lifestyle'
  | 'accessories'
export type Market = 'BD' | 'INTL'
export type Locale = 'en'

export type ProductOption = { size?: string; color?: string }
export type ProductVariant = {
  id: string
  sku: string
  options: ProductOption
  stock: number
}
export type ProductImage = { src: string; alt: string }

export type Product = {
  id: string
  slug: string
  title: string
  category: CategoryId
  description: string
  image: string
  price: { BDT: number; USD: number }
  compareAt?: { BDT: number; USD: number }
  badge?: string
  tag?: 'new' | 'popular' | 'sale'
  accent: string
  stock: number
  gallery?: ProductImage[]
  variants?: ProductVariant[]
}

export const categories: {
  id: CategoryId
  label: string
  description: string
  tint: string
}[] = [
  {
    id: 'electronics',
    label: 'Electronics',
    description: 'Tech for every day',
    tint: '#EAF0FF',
  },
  {
    id: 'fashion',
    label: 'Fashion',
    description: 'Made for your style',
    tint: '#FFF0E9',
  },
  {
    id: 'footwear',
    label: 'Shoes & Footwear',
    description: 'Every step in style',
    tint: '#F0EEFC',
  },
  {
    id: 'home',
    label: 'Home & Living',
    description: 'Refresh your space',
    tint: '#EDF8F0',
  },
  {
    id: 'beauty',
    label: 'Beauty',
    description: 'Little daily luxuries',
    tint: '#F9EEFB',
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    description: 'Everyday essentials',
    tint: '#FFF5D9',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    description: 'The perfect details',
    tint: '#EAF8FA',
  },
]

// Storefront sample catalog: all amounts are illustrative per-market prices, NOT currency conversions.
// Never use these client-side values as the authority for future production checkout.
export const products: Product[] = [
  {
    id: 'p-headphones',
    slug: 'sonic-wireless-headphones',
    title: 'Sonic Studio Wireless Headphones',
    category: 'electronics',
    description:
      'Rich sound, soft-cushioned comfort and a streamlined design that goes everywhere with you.',
    image: '/products/headphones.svg',
    price: { BDT: 5490, USD: 59 },
    compareAt: { BDT: 7290, USD: 79 },
    badge: 'Bestseller',
    tag: 'popular',
    accent: '#EDF0FA',
    stock: 24,
  },
  {
    id: 'p-bag',
    slug: 'everyday-canvas-tote',
    title: 'Everyday Canvas Tote Bag',
    category: 'fashion',
    description:
      'A roomy, lightweight everyday companion with a clean silhouette and practical design.',
    image: '/products/tote.svg',
    price: { BDT: 1890, USD: 22 },
    accent: '#F8F0E9',
    badge: 'New',
    tag: 'new',
    stock: 40,
    variants: [
      {
        id: 'p-bag-onesize-natural',
        sku: 'P-BAG-ONESIZE-NATURAL',
        options: { color: 'Natural' },
        stock: 20,
      },
      {
        id: 'p-bag-onesize-charcoal',
        sku: 'P-BAG-ONESIZE-CHARCOAL',
        options: { color: 'Charcoal' },
        stock: 20,
      },
    ],
  },
  {
    id: 'p-watch',
    slug: 'orbit-classic-watch',
    title: 'Orbit Classic Wrist Watch',
    category: 'accessories',
    description:
      'Understated design with a bold dial, designed to look good from work to weekends.',
    image: '/products/watch.svg',
    price: { BDT: 3290, USD: 39 },
    compareAt: { BDT: 4200, USD: 48 },
    tag: 'sale',
    accent: '#EEF3F8',
    stock: 18,
  },
  {
    id: 'p-serum',
    slug: 'dew-hydrating-serum',
    title: 'Dew Hydrating Face Serum',
    category: 'beauty',
    description:
      'A refreshing self-care essential in a minimal glass-inspired bottle.',
    image: '/products/serum.svg',
    price: { BDT: 1250, USD: 16 },
    badge: 'New',
    tag: 'new',
    accent: '#F7EEF4',
    stock: 30,
  },
  {
    id: 'p-speaker',
    slug: 'echo-mini-speaker',
    title: 'Echo Mini Portable Speaker',
    category: 'electronics',
    description:
      'Compact and versatile portable sound with a refined fabric-inspired finish.',
    image: '/products/speaker.svg',
    price: { BDT: 2990, USD: 35 },
    compareAt: { BDT: 3590, USD: 41 },
    tag: 'sale',
    accent: '#E8F1F6',
    stock: 13,
  },
  {
    id: 'p-chair',
    slug: 'arc-lounge-chair',
    title: 'Arc Modern Lounge Chair',
    category: 'home',
    description:
      'An inviting sculptural chair to bring warmth and a modern edge to your favorite corner.',
    image: '/products/chair.svg',
    price: { BDT: 10900, USD: 129 },
    accent: '#F1EEE8',
    stock: 7,
  },
  {
    id: 'p-sneaker',
    slug: 'motion-everyday-sneaker',
    title: 'Motion Everyday Sneakers',
    category: 'footwear',
    description:
      'A lightweight, go-anywhere silhouette designed for effortless daily style.',
    image: '/products/sneaker.svg',
    price: { BDT: 3790, USD: 46 },
    compareAt: { BDT: 4590, USD: 55 },
    tag: 'sale',
    accent: '#F3F0E9',
    stock: 32,
    variants: [
      {
        id: 'p-sneaker-40-cloudwhite',
        sku: 'P-SNEAKER-40-CLOUDWHITE',
        options: { size: '40', color: 'Cloud White' },
        stock: 4,
      },
      {
        id: 'p-sneaker-41-cloudwhite',
        sku: 'P-SNEAKER-41-CLOUDWHITE',
        options: { size: '41', color: 'Cloud White' },
        stock: 4,
      },
      {
        id: 'p-sneaker-42-cloudwhite',
        sku: 'P-SNEAKER-42-CLOUDWHITE',
        options: { size: '42', color: 'Cloud White' },
        stock: 3,
      },
      {
        id: 'p-sneaker-43-cloudwhite',
        sku: 'P-SNEAKER-43-CLOUDWHITE',
        options: { size: '43', color: 'Cloud White' },
        stock: 3,
      },
      {
        id: 'p-sneaker-44-cloudwhite',
        sku: 'P-SNEAKER-44-CLOUDWHITE',
        options: { size: '44', color: 'Cloud White' },
        stock: 2,
      },
      {
        id: 'p-sneaker-40-stone',
        sku: 'P-SNEAKER-40-STONE',
        options: { size: '40', color: 'Stone' },
        stock: 4,
      },
      {
        id: 'p-sneaker-41-stone',
        sku: 'P-SNEAKER-41-STONE',
        options: { size: '41', color: 'Stone' },
        stock: 4,
      },
      {
        id: 'p-sneaker-42-stone',
        sku: 'P-SNEAKER-42-STONE',
        options: { size: '42', color: 'Stone' },
        stock: 3,
      },
      {
        id: 'p-sneaker-43-stone',
        sku: 'P-SNEAKER-43-STONE',
        options: { size: '43', color: 'Stone' },
        stock: 3,
      },
      {
        id: 'p-sneaker-44-stone',
        sku: 'P-SNEAKER-44-STONE',
        options: { size: '44', color: 'Stone' },
        stock: 2,
      },
    ],
    gallery: [
      {
        src: '/products/sneaker.svg',
        alt: 'Motion sneakers side view illustration',
      },
      {
        src: '/products/sneaker-detail.svg',
        alt: 'Motion sneakers outsole and lace detail illustration',
      },
    ],
  },
  {
    id: 'p-shirt',
    slug: 'daybreak-cotton-tee',
    title: 'Daybreak Cotton Crew T-Shirt',
    category: 'fashion',
    description:
      'An easy-fit everyday essential with a soft cotton feel and a timeless silhouette.',
    image: '/products/tshirt.svg',
    price: { BDT: 1290, USD: 18 },
    compareAt: { BDT: 1590, USD: 22 },
    badge: 'New color',
    tag: 'new',
    accent: '#F6E9DF',
    stock: 38,
    variants: [
      {
        id: 'p-shirt-s-sand',
        sku: 'P-SHIRT-S-SAND',
        options: { size: 'S', color: 'Sand' },
        stock: 5,
      },
      {
        id: 'p-shirt-m-sand',
        sku: 'P-SHIRT-M-SAND',
        options: { size: 'M', color: 'Sand' },
        stock: 5,
      },
      {
        id: 'p-shirt-l-sand',
        sku: 'P-SHIRT-L-SAND',
        options: { size: 'L', color: 'Sand' },
        stock: 4,
      },
      {
        id: 'p-shirt-xl-sand',
        sku: 'P-SHIRT-XL-SAND',
        options: { size: 'XL', color: 'Sand' },
        stock: 4,
      },
      {
        id: 'p-shirt-s-navy',
        sku: 'P-SHIRT-S-NAVY',
        options: { size: 'S', color: 'Navy' },
        stock: 5,
      },
      {
        id: 'p-shirt-m-navy',
        sku: 'P-SHIRT-M-NAVY',
        options: { size: 'M', color: 'Navy' },
        stock: 5,
      },
      {
        id: 'p-shirt-l-navy',
        sku: 'P-SHIRT-L-NAVY',
        options: { size: 'L', color: 'Navy' },
        stock: 5,
      },
      {
        id: 'p-shirt-xl-navy',
        sku: 'P-SHIRT-XL-NAVY',
        options: { size: 'XL', color: 'Navy' },
        stock: 5,
      },
    ],
    gallery: [
      {
        src: '/products/tshirt.svg',
        alt: 'Daybreak t-shirt front illustration',
      },
      {
        src: '/products/tshirt-detail.svg',
        alt: 'Daybreak t-shirt fabric and neckline illustration',
      },
    ],
  },
  {
    id: 'p-loafers',
    slug: 'harbor-classic-loafers',
    title: 'Harbor Classic Everyday Loafers',
    category: 'footwear',
    description:
      'A smart-casual footwear staple designed for daily comfort and versatile styling.',
    image: '/products/loafers.svg',
    price: { BDT: 4590, USD: 54 },
    badge: 'Just landed',
    tag: 'new',
    accent: '#EFF0F4',
    stock: 27,
    variants: [
      {
        id: 'p-loafers-40-espresso',
        sku: 'P-LOAFERS-40-ESPRESSO',
        options: { size: '40', color: 'Espresso' },
        stock: 4,
      },
      {
        id: 'p-loafers-41-espresso',
        sku: 'P-LOAFERS-41-ESPRESSO',
        options: { size: '41', color: 'Espresso' },
        stock: 4,
      },
      {
        id: 'p-loafers-42-espresso',
        sku: 'P-LOAFERS-42-ESPRESSO',
        options: { size: '42', color: 'Espresso' },
        stock: 3,
      },
      {
        id: 'p-loafers-43-espresso',
        sku: 'P-LOAFERS-43-ESPRESSO',
        options: { size: '43', color: 'Espresso' },
        stock: 3,
      },
      {
        id: 'p-loafers-40-black',
        sku: 'P-LOAFERS-40-BLACK',
        options: { size: '40', color: 'Black' },
        stock: 4,
      },
      {
        id: 'p-loafers-41-black',
        sku: 'P-LOAFERS-41-BLACK',
        options: { size: '41', color: 'Black' },
        stock: 3,
      },
      {
        id: 'p-loafers-42-black',
        sku: 'P-LOAFERS-42-BLACK',
        options: { size: '42', color: 'Black' },
        stock: 3,
      },
      {
        id: 'p-loafers-43-black',
        sku: 'P-LOAFERS-43-BLACK',
        options: { size: '43', color: 'Black' },
        stock: 3,
      },
    ],
    gallery: [
      {
        src: '/products/loafers.svg',
        alt: 'Harbor loafers product illustration',
      },
      {
        src: '/products/loafers-detail.svg',
        alt: 'Harbor loafers stitching detail illustration',
      },
    ],
  },
  {
    id: 'p-bottle',
    slug: 'trail-insulated-bottle',
    title: 'Trail Insulated Water Bottle',
    category: 'lifestyle',
    description:
      'A reusable, insulated bottle with a durable shape for commutes, workouts and days out.',
    image: '/products/bottle.svg',
    price: { BDT: 1490, USD: 19 },
    compareAt: { BDT: 1850, USD: 24 },
    tag: 'sale',
    accent: '#EAF6F4',
    stock: 34,
  },
  {
    id: 'p-lamp',
    slug: 'halo-table-lamp',
    title: 'Halo Ambient Table Lamp',
    category: 'home',
    description:
      'Warm lighting and a timeless curved silhouette for calm, considered spaces.',
    image: '/products/lamp.svg',
    price: { BDT: 2390, USD: 29 },
    badge: 'Trending',
    tag: 'popular',
    accent: '#F9F1E5',
    stock: 21,
  },
]

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}
export function productById(id: string) {
  return products.find((product) => product.id === id)
}
export function categoryById(id: CategoryId) {
  return categories.find((category) => category.id === id)
}
export function formatPrice(
  amount: number,
  market: Market,
  _locale: Locale = 'en',
) {
  void _locale
  const currency = market === 'BD' ? 'BDT' : 'USD'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
export function productPrice(product: Product, market: Market) {
  return product.price[market === 'BD' ? 'BDT' : 'USD']
}
export function comparePrice(product: Product, market: Market) {
  return product.compareAt?.[market === 'BD' ? 'BDT' : 'USD']
}

// This is local UI fixture data. Production stock, variants and prices must come
// from the independent backend; never trust these fields during checkout.
export function productVariant(
  product: Product,
  variantId?: string,
): ProductVariant | undefined {
  return product.variants?.find((variant) => variant.id === variantId)
}
export function productAvailableStock(product: Product): number {
  return product.variants
    ? product.variants.reduce((sum, variant) => sum + variant.stock, 0)
    : product.stock
}
export function cartLineKey(productId: string, variantId?: string) {
  return `${productId}::${variantId ?? 'base'}`
}
export function productGallery(product: Product): ProductImage[] {
  return product.gallery?.length
    ? product.gallery
    : [{ src: product.image, alt: `${product.title} product illustration` }]
}
export function optionSummary(variant?: ProductVariant): string {
  if (!variant) return ''
  return [
    variant.options.color,
    variant.options.size && `Size ${variant.options.size}`,
  ]
    .filter(Boolean)
    .join(' · ')
}
