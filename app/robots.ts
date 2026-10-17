import type { MetadataRoute } from 'next'

/** Preview-only: crawling is disabled until real catalog, SEO and legal pages exist. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: '/' }],
  }
}
