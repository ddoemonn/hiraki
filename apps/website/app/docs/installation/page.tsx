import type { Metadata } from 'next'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { TerminalBlock } from '@/components/ui/terminal-block'

export const metadata: Metadata = {
  title: 'Installation | Hiraki Docs',
}

export default function DocsInstallationPage() {
  return (
    <DocsPageFrame
      eyebrow="installation"
      title="Add the package"
      description="Install Hiraki, then compose the primitives directly inside your own UI layer."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TerminalBlock command="pnpm add hiraki" label="pnpm.sh" />
        <TerminalBlock command="npm install hiraki" label="npm.sh" />
      </div>
    </DocsPageFrame>
  )
}
