import * as React from 'react'
import { cn } from '@/lib/utils'

function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[.09em] text-primary',
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
