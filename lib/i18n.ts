import type { Locale } from "@/lib/catalog";

const words = {
  en: {
    shop: "Shop", deals: "Deals", categories: "Categories", newArrivals: "New arrivals", about: "About us",
    searchPlaceholder: "Search products, categories, and more...", search: "Search", cart: "Cart", wishlist: "Wishlist", account: "Account",
    discover: "Discover what you love.", heroTitle: "Everyday finds. Extraordinary living.",
    heroText: "Fresh ideas, smart essentials and little luxuries — thoughtfully picked for all the ways you live.",
    shopNow: "Explore collection", browseDeals: "Shop the deals", shopByCategory: "Shop by category", categorySubtitle: "A little something for every part of life.",
    featured: "Trending right now", featuredSub: "The everyday favorites worth a closer look.", viewAll: "View all products",
    addToCart: "Add to cart", added: "Added to cart", new: "New", discoverMore: "Discover more",
    bestValue: "Good things, great prices", readyToGo: "Find something special today", shopCollection: "Shop collection",
    freeShipping: "Shipping offers on eligible orders", easyReturns: "Easy returns guidance", secureCheckout: "Secure checkout planned",
    global: "Shopping in Bangladesh & beyond", quickLinks: "Explore", subscribeTitle: "A little more inspiration.", subscribeText: "Newsletter sign-up will be available soon.",
  },
  bn: {
    shop: "শপ", deals: "অফার", categories: "ক্যাটাগরি", newArrivals: "নতুন পণ্য", about: "আমাদের সম্পর্কে",
    searchPlaceholder: "পণ্য ও ক্যাটাগরি খুঁজুন...", search: "খুঁজুন", cart: "কার্ট", wishlist: "পছন্দের তালিকা", account: "অ্যাকাউন্ট",
    discover: "আপনার পছন্দের জিনিস খুঁজুন।", heroTitle: "প্রতিদিনের প্রয়োজন, আরও সুন্দর জীবন।",
    heroText: "নিত্যদিনের দরকারি পণ্য, নতুন আইডিয়া ও পছন্দের আয়োজন—এক জায়গায়।",
    shopNow: "পণ্য দেখুন", browseDeals: "অফার দেখুন", shopByCategory: "ক্যাটাগরি অনুযায়ী কিনুন", categorySubtitle: "প্রতিদিনের জীবনের সব প্রয়োজনের জন্য।",
    featured: "এখন জনপ্রিয়", featuredSub: "আপনার জন্য বেছে নেওয়া পছন্দের সব পণ্য।", viewAll: "সব পণ্য দেখুন",
    addToCart: "কার্টে যোগ করুন", added: "কার্টে যোগ হয়েছে", new: "নতুন", discoverMore: "আরও দেখুন",
    bestValue: "ভালো পণ্য, ভালো দাম", readyToGo: "পছন্দের কিছু খুঁজে নিন", shopCollection: "কালেকশন দেখুন",
    freeShipping: "নির্বাচিত অর্ডারে শিপিং অফার", easyReturns: "সহজ রিটার্ন নির্দেশনা", secureCheckout: "নিরাপদ চেকআউট আসছে",
    global: "বাংলাদেশ ও বিশ্বব্যাপী কেনাকাটা", quickLinks: "এক্সপ্লোর করুন", subscribeTitle: "নতুন কিছু খুঁজুন।", subscribeText: "নিউজলেটার সুবিধা শীঘ্রই আসছে।",
  },
} as const;

export function dictionary(locale: Locale) { return words[locale]; }
