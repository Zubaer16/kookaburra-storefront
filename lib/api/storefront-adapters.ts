/**
 * Read-only projections from storefront fixtures into the shared Admin/API draft.
 * Fixture IDs, prices and availability remain preview-only: never use these
 * adapters to settle payments, reserve stock or migrate database identities.
 */
import {
  categories,
  productById,
  productGallery,
  products,
  type Product,
  type ProductVariant,
} from '@/lib/catalog'
import type { CartLine } from '@/stores/commerce-store'
import type {
  ApiCartItem,
  ApiCategory,
  ApiMoney,
  ApiProduct,
  ApiVariant,
} from '@/lib/api/contracts'

export function usdMinor(amount: number): number {
  if (
    !Number.isFinite(amount) ||
    amount < 0 ||
    !Number.isSafeInteger(Math.round(amount * 100))
  ) {
    throw new Error('Invalid preview USD amount')
  }
  return Math.round((amount + Number.EPSILON) * 100)
}

export function previewMoney(amount: number): ApiMoney {
  return { amountMinor: usdMinor(amount), currency: 'USD' }
}

export function categoryToApi(
  category: (typeof categories)[number],
  sortOrder: number,
): ApiCategory {
  return {
    id: category.id, // Slug-like preview ID; NOT a backend UUID.
    slug: category.id,
    parentId: null, // Current storefront categories are flat fixtures.
    name: { en: category.label },
    sortOrder,
    active: true,
  }
}

export function variantToApi(variant: ProductVariant): ApiVariant {
  const options: Record<string, string> = {}
  if (variant.options.size?.trim()) options.size = variant.options.size.trim()
  if (variant.options.color?.trim())
    options.color = variant.options.color.trim()
  return {
    id: variant.id,
    sku: variant.sku,
    options,
    available: variant.stock > 0,
  }
}

export function productToApi(product: Product): ApiProduct {
  const result: ApiProduct = {
    id: product.id, // Retain storefront ID until a reviewed identity mapping exists.
    slug: product.slug,
    categoryIds: [product.category],
    title: { en: product.title },
    description: { en: product.description },
    images: productGallery(product).map(({ src, alt }) => ({
      url: src,
      alt: { en: alt },
    })),
    // A simple product has NO invented variant ID. Future server design must
    // decide how a simple product is represented for stock/fulfillment.
    variants: product.variants?.map(variantToApi) ?? [],
    price: previewMoney(product.price),
    purchasable: product.variants
      ? product.variants.some((v) => v.stock > 0)
      : product.stock > 0,
  }
  if (product.compareAt !== undefined)
    result.compareAt = previewMoney(product.compareAt)
  return result
}

export function previewCategoriesAsApi(): ApiCategory[] {
  return categories.map(categoryToApi)
}

export function previewProductsAsApi(): ApiProduct[] {
  return products.map(productToApi)
}

/** Preserve all original cart IDs and variant selections, including legacy nulls. */
export function cartToApiItems(lines: readonly CartLine[]): ApiCartItem[] {
  return lines.map(({ productId, variantId, quantity }) => ({
    productId,
    variantId: variantId ?? null,
    quantity,
  }))
}

/** Informative only; unresolved variants are never selected by guessing. */
export function unresolvedCartVariants(lines: readonly CartLine[]): string[] {
  return lines.flatMap((line) => {
    const product = productById(line.productId)
    if (!product) return [line.productId]
    if (!product.variants?.length) return line.variantId ? [line.productId] : []
    return product.variants.some((v) => v.id === line.variantId)
      ? []
      : [line.productId]
  })
}
