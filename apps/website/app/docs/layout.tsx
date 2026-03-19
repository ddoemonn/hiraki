import { DocsSidebar } from '@/components/docs/docs-sidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh bg-base text-fg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-0 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          <aside className="self-start border-b border-line pb-6 pt-8 lg:sticky lg:top-0 lg:h-svh lg:border-b-0 lg:py-16">
            <DocsSidebar />
          </aside>
          <div className="min-w-0 py-10 lg:border-l lg:border-line lg:pl-12 lg:py-0">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
