import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code: string
  lang?: BundledLanguage
  filename?: string
  className?: string
}

export async function CodeBlock({
  code,
  lang = 'tsx',
  filename,
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    defaultColor: false,
  })

  return (
    <div className={className}>
      {filename && (
        <div className="flex items-center px-4 py-2 border-b border-line bg-raised">
          <span className="text-xs font-mono text-dim">{filename}</span>
        </div>
      )}
      <div
        className="[&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-[12px] [&_pre]:leading-[1.7] md:[&_pre]:overflow-x-hidden md:[&_pre]:whitespace-pre-wrap md:[&_pre]:break-words md:[&_pre]:text-[13px] [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
