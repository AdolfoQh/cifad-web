import { useRef, useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { stats } from '../data/stats'
import { technologies } from '../data/researchAreas'

const B = {
  bg: '#0a0e14', bg2: '#10151d', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff', glow: '#5e98c2',
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      transition: `opacity .8s ease, transform .8s ease`,
      transitionDelay: `${delay}s`,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      ...style,
    }}>{children}</div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (!sectionRef.current) return
      const r = sectionRef.current.getBoundingClientRect()
      setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
    }
    const el = sectionRef.current
    el?.addEventListener('mousemove', onMove)
    return () => el?.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: B.bg, color: B.text,
      position: 'relative', minHeight: '100vh',
      overflow: 'hidden', paddingTop: isMobile ? 100 : 120,
    }}>
      {/* Aurora */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, ${B.accent}22 0%, transparent 40%),
          radial-gradient(circle at ${(1 - mouse.x) * 100}% ${(1 - mouse.y) * 100}%, ${B.accent2}1f 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${B.glow}1a 0%, transparent 35%)
        `,
        transition: 'background .5s ease',
      }}/>

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .2,
        backgroundImage: `linear-gradient(${B.border} 1px, transparent 1px), linear-gradient(90deg, ${B.border} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }}/>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '24px 20px' : '40px 32px', position: 'relative' }}>
        {/* Badge */}
        <div style={{
          transition: 'opacity .7s ease, transform .7s ease',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(16px)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 14px 6px 8px', borderRadius: 999,
            background: B.surface, border: `1px solid ${B.border}`,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.muted, marginBottom: 36,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: B.accent, boxShadow: `0 0 12px ${B.accent}` }}/>
            CiFAD · UNCuyo · Investigación abierta 2026
          </div>
        </div>

        {/* Heading */}
        <div style={{
          transition: 'opacity .9s ease, transform .9s ease',
          transitionDelay: '.1s',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(28px)',
        }}>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(48px, 8.5vw, 140px)',
            lineHeight: .92, letterSpacing: '-.045em',
            color: B.text, margin: 0, maxWidth: 1100,
          }}>
            Cuando la tecnología<br/>
            <span style={{
              background: `linear-gradient(95deg, ${B.accent} 0%, ${B.accent2} 50%, ${B.glow} 100%)`,
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic', fontWeight: 400,
            }}>cobra sentido.</span>
          </h1>
        </div>

        {/* Bajada + stats */}
        <div style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: isMobile ? 32 : 60,
          alignItems: 'end',
          transition: 'opacity .9s ease, transform .9s ease',
          transitionDelay: '.25s',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(28px)',
        }}>
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.6,
              color: B.muted, maxWidth: 580, margin: 0,
            }}>
              La persona en el origen de todo lo que investigamos, en articulación con la academia,
              el sector productivo y la sociedad, para que el conocimiento se convierta en acción.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#laboratorios" style={{
                background: B.text, color: B.bg, border: 'none',
                padding: '14px 22px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
                borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none',
              }}>Explorar laboratorios →</a>
              <a href="#servicios" style={{
                background: 'transparent', color: B.text,
                border: `1px solid ${B.border}`,
                padding: '14px 22px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
                borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none',
              }}>Servicios de consultoría</a>
            </div>
          </div>

          {/* Stats 2×2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {stats.map(s => (
              <div key={s.label} style={{ borderTop: `1px solid ${B.border}`, paddingTop: 14 }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: 34,
                  fontWeight: 500, color: B.text, lineHeight: 1, letterSpacing: '-.02em',
                }}>{s.value}</div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 12,
                  color: B.muted, marginTop: 6,
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech chips */}
        <div style={{
          marginTop: 80, paddingTop: 24, borderTop: `1px solid ${B.border}`,
          transition: 'opacity .9s ease', transitionDelay: '.4s',
          opacity: mounted ? 1 : 0,
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            color: B.muted, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 16,
          }}>// Tecnologías que investigamos</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {technologies.map(t => (
              <span key={t} style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                padding: '6px 14px', borderRadius: 999,
                background: B.surface, border: `1px solid ${B.border}`, color: B.muted,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
