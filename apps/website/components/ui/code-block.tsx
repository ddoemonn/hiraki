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
    theme: 'vitesse-dark',
  })

  return (
    <div className={className}>
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-line bg-raised">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs font-mono text-dim ml-2">{filename}</span>
        </div>
      )}
      <div
        className="[&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-[13px] [&_pre]:leading-[1.7] [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
