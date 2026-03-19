interface DocsPageFrameProps {
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}

export function DocsPageFrame({
  eyebrow,
  title,
  description,
  children,
}: DocsPageFrameProps) {
  return (
    <section className="border-b border-line py-16">
      <div className="max-w-4xl">
        <p className="mb-3 text-xs font-mono text-dim">{eyebrow}</p>
        <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-fg sm:text-3xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
          {description}
        </p>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  )
}
