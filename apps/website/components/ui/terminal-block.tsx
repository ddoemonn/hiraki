import { CodeBlock } from '@/components/ui/code-block'
import { CopyButton } from '@/components/ui/copy-button'
import { cn } from '@/lib/cn'

interface TerminalBlockProps {
  command: string
  label?: string
  className?: string
}

export async function TerminalBlock({
  command,
  label = 'terminal',
  className,
}: TerminalBlockProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-surface',
        className,
      )}
    >
      <div className="absolute top-3 right-3 z-10">
        <CopyButton
          text={command}
          className="rounded-[var(--hiraki-radius)] border border-line bg-base/80 px-2.5 py-1.5 backdrop-blur-sm"
        />
      </div>
      <CodeBlock
        code={command}
        lang="bash"
        filename={label}
        className="[&_pre]:pr-20"
      />
    </div>
  )
}
