export type ShopQueryState = {
  text: string
  category: string
  tag: string
  sort: string
  price: string
  stockOnly: boolean
}

/** Keeps the browser URL shareable without encoding default filter values. */
export function buildShopQuery(state: ShopQueryState): string {
  const params = new URLSearchParams()
  if (state.text.trim()) params.set('q', state.text.trim())
  if (state.category) params.set('category', state.category)
  if (state.tag) params.set('tag', state.tag)
  if (state.sort && state.sort !== 'featured') params.set('sort', state.sort)
  if (state.price && state.price !== 'all') params.set('price', state.price)
  if (state.stockOnly) params.set('stock', '1')
  const search = params.toString()
  return `/shop${search ? `?${search}` : ''}`
}
