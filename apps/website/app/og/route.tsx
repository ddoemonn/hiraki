import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

const RADIUS = 26

// A pure-visual OG: a bottom sheet resting above one faint echo, with a drag
// handle. No text, no borders — just fill contrast that reads as a drawer.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0a0a0b',
        }}
      >
        {/* faint echo behind — a hint of the sheet rising */}
        <div
          style={{
            position: 'absolute',
            top: 250,
            left: 120,
            right: 120,
            bottom: 0,
            background: '#131316',
            borderTopLeftRadius: RADIUS,
            borderTopRightRadius: RADIUS,
          }}
        />
        {/* resting sheet */}
        <div
          style={{
            position: 'absolute',
            top: 330,
            left: 40,
            right: 40,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 24,
            background: '#1c1c20',
            borderTopLeftRadius: RADIUS,
            borderTopRightRadius: RADIUS,
          }}
        >
          {/* drag handle */}
          <div
            style={{
              width: 88,
              height: 6,
              borderRadius: 999,
              background: '#52525b',
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
