/** Proposed PUBLIC content API shape, aligned with Admin's local merchandising editor.
 * No browser-local cross-app sync, publication, or network calls are performed.
 */
export type PublicBanner = {
  id: string
  headline: string
  subheading: string
  imageUrl: string
  imageAlt: string
  ctaLabel: string
  ctaHref: string
  slot: 'hero' | 'secondary'
  active: boolean
  sortOrder: number
}
export type PublicFeaturedCollection = {
  id: string
  slug: string
  title: string
  productIds: string[]
  active: boolean
  sortOrder: number
}
export type PublicHomepageContent = {
  banners: PublicBanner[]
  collections: PublicFeaturedCollection[]
  revision: string
}

/** Only same-site paths may be exposed to the storefront from future content API. */
export function safeStorefrontHref(value: string): boolean {
  return (
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.includes('\\') &&
    !/[\u0000-\u001f]/.test(value)
  )
}

/** Resolve only explicitly matched product IDs; no product-name guessing. */
export function resolveFeaturedIds(
  ids: readonly string[],
  availableIds: readonly string[],
) {
  const available = new Set(availableIds)
  return {
    resolved: [...new Set(ids)].filter((id) => available.has(id)),
    unresolved: [...new Set(ids)].filter((id) => !available.has(id)),
  }
}
