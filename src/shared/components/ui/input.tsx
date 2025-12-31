import { cn } from '@/shared/utils/tailwind.utils'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'ring-offset-background flex h-10 w-full rounded-md border-2 border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white focus-visible:border-white/60 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
