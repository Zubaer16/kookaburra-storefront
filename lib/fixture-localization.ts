import type { CategoryId, Locale, Product, ProductOption } from '@/lib/catalog'
import type { PreviewOrder } from '@/lib/account-preview'

/** Presentation helpers for English-only sample catalog and order content. */
export function productText(
  product: Product,
  _locale?: Locale,
): Pick<Product, 'title' | 'description'> {
  void _locale
  return product
}

export function categoryDescription(
  _id: CategoryId,
  description: string,
  _locale?: Locale,
) {
  void _id
  void _locale
  return description
}

export function localizeOption(
  option: ProductOption,
  _locale?: Locale,
): string {
  void _locale
  return [option.color, option.size].filter(Boolean).join(' · ')
}

export function localizeOrderItem(title: string, _locale?: Locale) {
  void _locale
  return title
}
export function localizeOrderOption(option: string, _locale?: Locale) {
  void _locale
  return option
}
export function localizeMilestone(label: string, _locale?: Locale) {
  void _locale
  return label
}
export function localizeMilestoneNote(note: string, _locale?: Locale) {
  void _locale
  return note
}
export function localizeShippingLabel(order: PreviewOrder, _locale?: Locale) {
  void _locale
  return order.shippingLabel
}
