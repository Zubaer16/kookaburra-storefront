export type CategoryId = "electronics" | "fashion" | "home" | "beauty" | "lifestyle" | "accessories";
export type Market = "BD" | "INTL";
export type Locale = "en" | "bn";

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: CategoryId;
  description: string;
  image: string;
  price: { BDT: number; USD: number };
  compareAt?: { BDT: number; USD: number };
  badge?: string;
  tag?: "new" | "popular" | "sale";
  accent: string;
  stock: number;
};

export const categories: { id: CategoryId; label: string; bn: string; description: string; tint: string }[] = [
  { id: "electronics", label: "Electronics", bn: "ইলেকট্রনিক্স", description: "Tech for every day", tint: "#EAF0FF" },
  { id: "fashion", label: "Fashion", bn: "ফ্যাশন", description: "Made for your style", tint: "#FFF0E9" },
  { id: "home", label: "Home & Living", bn: "ঘর ও জীবন", description: "Refresh your space", tint: "#EDF8F0" },
  { id: "beauty", label: "Beauty", bn: "বিউটি", description: "Little daily luxuries", tint: "#F9EEFB" },
  { id: "lifestyle", label: "Lifestyle", bn: "লাইফস্টাইল", description: "Everyday essentials", tint: "#FFF5D9" },
  { id: "accessories", label: "Accessories", bn: "অ্যাক্সেসরিজ", description: "The perfect details", tint: "#EAF8FA" },
];

// Patch 01 preview catalog: all amounts are illustrative per-market prices, NOT currency conversions.
// Never use these client-side values as the authority for future production checkout.
export const products: Product[] = [
  { id: "p-headphones", slug: "sonic-wireless-headphones", title: "Sonic Studio Wireless Headphones", category: "electronics", description: "Rich sound, soft-cushioned comfort and a streamlined design that goes everywhere with you.", image: "/products/headphones.svg", price: { BDT: 5490, USD: 59 }, compareAt: { BDT: 7290, USD: 79 }, badge: "Bestseller", tag: "popular", accent: "#EDF0FA", stock: 24 },
  { id: "p-bag", slug: "everyday-canvas-tote", title: "Everyday Canvas Tote Bag", category: "fashion", description: "A roomy, lightweight everyday companion with a clean silhouette and practical design.", image: "/products/tote.svg", price: { BDT: 1890, USD: 22 }, accent: "#F8F0E9", badge: "New", tag: "new", stock: 40 },
  { id: "p-watch", slug: "orbit-classic-watch", title: "Orbit Classic Wrist Watch", category: "accessories", description: "Understated design with a bold dial, designed to look good from work to weekends.", image: "/products/watch.svg", price: { BDT: 3290, USD: 39 }, compareAt: { BDT: 4200, USD: 48 }, tag: "sale", accent: "#EEF3F8", stock: 18 },
  { id: "p-serum", slug: "dew-hydrating-serum", title: "Dew Hydrating Face Serum", category: "beauty", description: "A refreshing self-care essential in a minimal glass-inspired bottle.", image: "/products/serum.svg", price: { BDT: 1250, USD: 16 }, badge: "New", tag: "new", accent: "#F7EEF4", stock: 30 },
  { id: "p-speaker", slug: "echo-mini-speaker", title: "Echo Mini Portable Speaker", category: "electronics", description: "Compact and versatile portable sound with a refined fabric-inspired finish.", image: "/products/speaker.svg", price: { BDT: 2990, USD: 35 }, compareAt: { BDT: 3590, USD: 41 }, tag: "sale", accent: "#E8F1F6", stock: 13 },
  { id: "p-chair", slug: "arc-lounge-chair", title: "Arc Modern Lounge Chair", category: "home", description: "An inviting sculptural chair to bring warmth and a modern edge to your favorite corner.", image: "/products/chair.svg", price: { BDT: 10900, USD: 129 }, accent: "#F1EEE8", stock: 7 },
  { id: "p-sneaker", slug: "motion-everyday-sneaker", title: "Motion Everyday Sneakers", category: "fashion", description: "A lightweight, go-anywhere silhouette designed for effortless daily style.", image: "/products/sneaker.svg", price: { BDT: 3790, USD: 46 }, compareAt: { BDT: 4590, USD: 55 }, tag: "sale", accent: "#F3F0E9", stock: 32 },
  { id: "p-lamp", slug: "halo-table-lamp", title: "Halo Ambient Table Lamp", category: "home", description: "Warm lighting and a timeless curved silhouette for calm, considered spaces.", image: "/products/lamp.svg", price: { BDT: 2390, USD: 29 }, badge: "Trending", tag: "popular", accent: "#F9F1E5", stock: 21 },
];

export function findProduct(slug: string) { return products.find((product) => product.slug === slug); }
export function productById(id: string) { return products.find((product) => product.id === id); }
export function categoryById(id: CategoryId) { return categories.find((category) => category.id === id); }
export function formatPrice(amount: number, market: Market, locale: Locale = "en") {
  const currency = market === "BD" ? "BDT" : "USD";
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US", {
    style: "currency", currency, maximumFractionDigits: 0,
  }).format(amount);
}
export function productPrice(product: Product, market: Market) {
  return product.price[market === "BD" ? "BDT" : "USD"];
}
export function comparePrice(product: Product, market: Market) {
  return product.compareAt?.[market === "BD" ? "BDT" : "USD"];
}
