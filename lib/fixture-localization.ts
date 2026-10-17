import type { CategoryId, Locale, Product, ProductOption } from '@/lib/catalog'
import type { PreviewOrder } from '@/lib/account-preview'

/**
 * Patch 08: display-only Bangla translations for public, fictional fixtures.
 * Keys use stable ids instead of UI text. Product prices, SKUs, order data and
 * stored cart identifiers stay unchanged. The future API should supply locale
 * fields (or a translation resource), not depend on these sample mappings.
 */
type LocalizedProduct = { title: string; description: string }

const banglaProducts: Record<string, LocalizedProduct> = {
  'p-headphones': {
    title: 'সনিক স্টুডিও ওয়্যারলেস হেডফোন',
    description:
      'সমৃদ্ধ সাউন্ড, নরম কুশনের আরাম এবং যেকোনো জায়গায় মানানসই সহজ ডিজাইন।',
  },
  'p-bag': {
    title: 'এভরিডে ক্যানভাস টোট ব্যাগ',
    description:
      'হালকা ও প্রশস্ত ব্যাগ—প্রতিদিনের জিনিস বহনের জন্য সহজ, সুন্দর নকশা।',
  },
  'p-watch': {
    title: 'অরবিট ক্লাসিক হাতঘড়ি',
    description: 'অফিস থেকে ছুটির দিন—সাধারণ অথচ আকর্ষণীয় ডায়ালের নকশা।',
  },
  'p-serum': {
    title: 'ডিউ হাইড্রেটিং ফেস সিরাম',
    description: 'দৈনন্দিন ত্বকের যত্নের জন্য সতেজ অনুভূতির একটি নমুনা পণ্য।',
  },
  'p-speaker': {
    title: 'ইকো মিনি পোর্টেবল স্পিকার',
    description:
      'ছোট আকারে বহনযোগ্য সাউন্ড ও কাপড়ের মতো আবরণের পরিপাটি ডিজাইন।',
  },
  'p-chair': {
    title: 'আর্ক মডার্ন লাউঞ্জ চেয়ার',
    description: 'ঘরের পছন্দের কোণকে আরামদায়ক ও আধুনিক করে তোলার জন্য চেয়ার।',
  },
  'p-sneaker': {
    title: 'মোশন এভরিডে স্নিকার্স',
    description:
      'প্রতিদিনের ব্যবহার ও স্বাচ্ছন্দ্যময় চলাফেরার জন্য হালকা স্নিকার্স।',
  },
  'p-shirt': {
    title: 'ডেব্রেক কটন ক্রু টি-শার্ট',
    description:
      'প্রতিদিনের পোশাকের জন্য সহজ ক্রু-নেক ডিজাইনের আরামদায়ক কটন টি-শার্ট।',
  },
  'p-loafers': {
    title: 'হারবার ক্লাসিক লোফার',
    description: 'প্রতিদিনের পোশাকের সঙ্গে মানানসই ক্লাসিক ও সহজ নকশার লোফার।',
  },
  'p-bottle': {
    title: 'ট্রেইল ইনসুলেটেড ওয়াটার বোতল',
    description:
      'বাইরে চলাফেরা ও দৈনন্দিন ব্যবহারের জন্য সহজে বহনযোগ্য পানির বোতল।',
  },
  'p-lamp': {
    title: 'হ্যালো অ্যাম্বিয়েন্ট টেবিল ল্যাম্প',
    description:
      'পড়ার টেবিল বা ঘরের কোণে নরম আলো ও আধুনিক সাজের নমুনা ল্যাম্প।',
  },
}

const banglaCategories: Record<CategoryId, string> = {
  electronics: 'প্রতিদিনের প্রয়োজনীয় প্রযুক্তি',
  fashion: 'নিজস্ব স্টাইলে সাজুন',
  footwear: 'প্রতিটি পদক্ষেপে স্টাইল',
  home: 'ঘর সাজান নতুনভাবে',
  beauty: 'প্রতিদিনের ছোট যত্ন',
  lifestyle: 'দৈনন্দিন দরকারি পণ্য',
  accessories: 'সুন্দর ছোটখাটো অনুষঙ্গ',
}

const banglaColors: Record<string, string> = {
  Natural: 'ন্যাচারাল',
  Charcoal: 'চারকোল',
  'Cloud White': 'ক্লাউড হোয়াইট',
  Stone: 'স্টোন',
  Sand: 'স্যান্ড',
  Navy: 'নেভি',
  Espresso: 'এসপ্রেসো',
  Black: 'কালো',
  Brown: 'বাদামি',
}

const banglaMilestones: Record<string, string> = {
  'Order placed': 'অর্ডার করা হয়েছে',
  'Preparing items': 'পণ্য প্রস্তুত হচ্ছে',
  'Handed to carrier': 'কুরিয়ারকে দেওয়া হয়েছে',
  Delivered: 'ডেলিভারি সম্পন্ন',
}

const banglaNotes: Record<string, string> = {
  'Demo order received': 'নমুনা অর্ডার গ্রহণ করা হয়েছে',
  'Sample fulfillment started': 'নমুনা অর্ডার প্রস্তুত শুরু হয়েছে',
  'Sample parcel on the way': 'নমুনা পার্সেল পথে রয়েছে',
  'Awaiting simulated completion': 'নমুনা ডেলিভারি সম্পন্ন হওয়া বাকি',
  'Sample parcel dispatched': 'নমুনা পার্সেল পাঠানো হয়েছে',
  'Sample shipment completed': 'নমুনা ডেলিভারি সম্পন্ন হয়েছে',
  'Sample fulfillment in progress': 'নমুনা পণ্য প্রস্তুতির কাজ চলছে',
  'Not dispatched in this demo': 'এই নমুনায় এখনো পাঠানো হয়নি',
  'Not delivered in this demo': 'এই নমুনায় এখনো ডেলিভারি হয়নি',
}

const orderItemNames: Record<string, string> = {
  'Daybreak Cotton Tee': 'ডেব্রেক কটন টি-শার্ট',
  'Harbor Classic Loafers': 'হারবার ক্লাসিক লোফার',
  'Sonic Studio Wireless Headphones': 'সনিক স্টুডিও ওয়্যারলেস হেডফোন',
  'Everyday Canvas Tote Bag': 'এভরিডে ক্যানভাস টোট ব্যাগ',
}

const orderOptions: Record<string, string> = {
  'Navy · M': 'নেভি · M',
  'Brown · 41': 'বাদামি · 41',
  Standard: 'সাধারণ',
  Natural: 'ন্যাচারাল',
}

export function productText(
  product: Product,
  locale: Locale,
): LocalizedProduct {
  return locale === 'bn' ? (banglaProducts[product.id] ?? product) : product
}

export function categoryDescription(
  id: CategoryId,
  description: string,
  locale: Locale,
) {
  return locale === 'bn' ? (banglaCategories[id] ?? description) : description
}

export function localizeOption(option: ProductOption, locale: Locale): string {
  return [option.color, option.size]
    .filter(Boolean)
    .map((value) => (locale === 'bn' ? (banglaColors[value!] ?? value) : value))
    .join(' · ')
}

export function localizeOrderItem(title: string, locale: Locale) {
  return locale === 'bn' ? (orderItemNames[title] ?? title) : title
}
export function localizeOrderOption(option: string, locale: Locale) {
  return locale === 'bn' ? (orderOptions[option] ?? option) : option
}
export function localizeMilestone(label: string, locale: Locale) {
  return locale === 'bn' ? (banglaMilestones[label] ?? label) : label
}
export function localizeMilestoneNote(note: string, locale: Locale) {
  return locale === 'bn' ? (banglaNotes[note] ?? note) : note
}
export function localizeShippingLabel(order: PreviewOrder, locale: Locale) {
  if (locale !== 'bn') return order.shippingLabel
  return order.market === 'BD'
    ? 'বাংলাদেশ · নমুনা সাধারণ ডেলিভারি'
    : 'আন্তর্জাতিক · নমুনা সাধারণ শিপিং'
}
