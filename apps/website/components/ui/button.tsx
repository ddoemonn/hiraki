import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', size = 'md', className, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer select-none whitespace-nowrap shrink-0 disabled:pointer-events-none disabled:opacity-40 rounded-[var(--hiraki-radius)]',
          variant === 'primary' && 'bg-accent text-accent-fg hover:bg-fg',
          variant === 'secondary' && 'bg-transparent text-muted border border-line hover:text-fg hover:border-elevated',
          variant === 'ghost' && 'bg-transparent text-dim hover:text-muted',
          size === 'sm' && 'h-7 px-3 text-xs',
          size === 'md' && 'h-9 px-4 text-sm',
          size === 'lg' && 'h-11 px-5 text-sm',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)
