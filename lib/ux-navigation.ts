/** Shared, framework-independent keyboard logic; Flutter can mirror this behavior. */
export type HorizontalNavigationKey =
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Home'
  | 'End'

/** Returns null when the key is not handled. RTL locale does not mean RTL layout here. */
export function nextHorizontalIndex(
  index: number,
  key: string,
  total: number,
): number | null {
  if (
    !Number.isInteger(index) ||
    !Number.isInteger(total) ||
    total < 1 ||
    index < 0 ||
    index >= total
  )
    return null
  switch (key) {
    case 'ArrowRight':
      return (index + 1) % total
    case 'ArrowLeft':
      return (index - 1 + total) % total
    case 'Home':
      return 0
    case 'End':
      return total - 1
    default:
      return null
  }
}
