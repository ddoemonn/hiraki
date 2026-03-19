import { Hero } from '@/components/landing/hero'
import { FeaturesGrid } from '@/components/landing/features-grid'
import { CodeShowcase } from '@/components/landing/code-showcase'
import { VariantShowcase } from '@/components/landing/variant-showcase'
import { DirectionShowcase } from '@/components/landing/direction-showcase'
import { SnapDemo } from '@/components/landing/snap-demo'
import { InstallCta } from '@/components/landing/install-cta'

export default function Page() {
  return (
    <main className="min-h-svh bg-base text-fg overflow-x-hidden">
      <Hero />
      <FeaturesGrid />
      <CodeShowcase />
      <VariantShowcase />
      <DirectionShowcase />
      <SnapDemo />
      <InstallCta />
    </main>
  )
}
