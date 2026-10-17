'use client'

import { useMemo } from 'react'
import { usePreviewCopy } from '@/hooks/use-preview-copy'
import type { Product, ProductVariant } from '@/lib/catalog'

type Props = {
  product: Product
  color: string
  size: string
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
}
export function ProductOptions({
  product,
  color,
  size,
  onColorChange,
  onSizeChange,
}: Props) {
  const t = usePreviewCopy()
  const variants = product.variants ?? []
  const colors = useMemo(
    () => [
      ...new Set(
        variants.map((v) => v.options.color).filter((v): v is string => !!v),
      ),
    ],
    [variants],
  )
  const sizes = useMemo(
    () => [
      ...new Set(
        variants.map((v) => v.options.size).filter((v): v is string => !!v),
      ),
    ],
    [variants],
  )
  if (!variants.length) return null
  const matchingVariant = (option: {
    color?: string
    size?: string
  }): ProductVariant | undefined =>
    variants.find(
      (v) =>
        (!option.color || v.options.color === option.color) &&
        (!option.size || v.options.size === option.size) &&
        v.stock > 0,
    )
  return (
    <div className="mt-6 space-y-5">
      {!!colors.length && (
        <fieldset>
          <legend className="mb-2.5 text-sm font-extrabold">
            {t.productOptionColor}{' '}
            <span className="font-normal text-muted">
              {color || `· ${t.productSelectColor}`}
            </span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {colors.map((value) => {
              const disabled = !matchingVariant({
                color: value,
                size: size || undefined,
              })
              return (
                <button
                  type="button"
                  key={value}
                  aria-pressed={color === value}
                  disabled={disabled}
                  onClick={() => onColorChange(color === value ? '' : value)}
                  className={`min-h-11 rounded-xl border px-4 py-2 text-xs font-bold transition ${color === value ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary' : 'border-border bg-white text-[#566783] hover:border-primary'} disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}
      {!!sizes.length && (
        <fieldset>
          <legend className="mb-2.5 text-sm font-extrabold">
            {t.productOptionSize}{' '}
            <span className="font-normal text-muted">
              {size || `· ${t.productSelectSize}`}
            </span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((value) => {
              const disabled = !matchingVariant({
                size: value,
                color: color || undefined,
              })
              return (
                <button
                  type="button"
                  key={value}
                  aria-pressed={size === value}
                  disabled={disabled}
                  onClick={() => onSizeChange(size === value ? '' : value)}
                  className={`min-h-11 min-w-12 rounded-xl border px-3 py-2 text-xs font-bold transition ${size === value ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary' : 'border-border bg-white text-[#566783] hover:border-primary'} disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {value}
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-xs text-muted">{t.productSizeNotice}</p>
        </fieldset>
      )}
    </div>
  )
}
