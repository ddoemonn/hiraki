import { ArrowLeftRight, Zap, Magnet, Package2, Eye, Sparkles } from 'lucide-react'

const features = [
  {
    icon: ArrowLeftRight,
    title: 'All 4 directions',
    description: 'bottom · top · left · right. Each direction correctly handles gesture axis, scroll detection, and transforms.',
  },
  {
    icon: Zap,
    title: 'Velocity-aware',
    description: 'Inertia-based snap point targeting. Fast release overshoots, slow release lands precisely. Exponential smoothing.',
  },
  {
    icon: Magnet,
    title: 'Snap points',
    description: 'Pixels, percentages, or "content". Controlled and uncontrolled. Multiple simultaneous snap positions.',
  },
  {
    icon: Package2,
    title: 'Zero dependencies',
    description: 'React is the only peer dep. No Radix, no Framer Motion, nothing else. ~6 KB gzipped.',
  },
  {
    icon: Eye,
    title: 'Accessible',
    description: 'ARIA dialog, focus trap, Escape to dismiss, scroll lock, iOS Safari fix, screen reader announcements.',
  },
  {
    icon: Sparkles,
    title: 'CSS animations',
    description: 'Pure CSS transitions applied imperatively. Slide, spring, scale, morph presets. Respects prefers-reduced-motion.',
  },
]

export function FeaturesGrid() {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-surface">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="border-b border-r border-line p-6 last:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <Icon className="w-4 h-4 text-dim mb-4" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-fg mb-2 font-mono">{f.title}</p>
                <p className="text-xs text-dim leading-relaxed">{f.description}</p>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
