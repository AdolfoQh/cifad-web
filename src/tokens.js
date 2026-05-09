import { createElement as h } from 'react'

/**
 * Design tokens — CIFAD visual identity
 */
export const T = {
  bg:        '#04041e',
  blue:      '#243850',
  surface:   '#090928',
  surface2:  '#0e0e34',
  border:    '#141450',
  text:      '#EDF0F5',
  muted:     '#7B8FAD',
  accent:    '#72E9B8',
  secondary: '#D44B27',
  warm:      '#d9774b',
  dim:       '#1a1a50',
  gray:      '#C2C2C2',
  display:   "'Bricolage Grotesque', sans-serif",
  body:      "'DM Sans', sans-serif",
}

export function SectionLabel({ num, label }) {
  return h('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 } },
    h('span', { style: { fontFamily: T.body, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: T.accent, flexShrink: 0 } }, num + '.'),
    label && h('span', { style: { fontFamily: T.body, fontSize: 11, fontWeight: 400, letterSpacing: '.14em', textTransform: 'uppercase', color: T.muted, flexShrink: 0 } }, label),
    h('span', { style: { flex: 1, height: 1, background: T.border } })
  )
}

export function MeshBlobs({ blobs }) {
  return h('div', { style: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' } },
    blobs.map((b, i) =>
      h('div', {
        key: i,
        style: {
          position: 'absolute',
          width: b.size ?? 600,
          height: b.size ?? 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${b.color}${opacityToHex(b.opacity ?? .5)} 0%, transparent 70%)`,
          filter: `blur(${b.blur ?? 90}px)`,
          top: b.top, left: b.left, right: b.right, bottom: b.bottom,
          transform: b.transform,
        }
      })
    )
  )
}

function opacityToHex(opacity) {
  return Math.round(opacity * 255).toString(16).padStart(2, '0')
}
