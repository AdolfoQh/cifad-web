import { useRef, useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { stats } from '../data/stats'
import { technologies } from '../data/researchAreas'
import { T, MeshBlobs } from '../tokens'

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
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: T.bg, color: T.text,
      position: 'relative',
      minHeight: isMobile ? 'auto' : '100vh',
      paddingBottom: isMobile ? 60 : 0,
      overflow: 'hidden', paddingTop: isMobile ? 96 : 120,
    }}>
      {/* Mesh blobs */}
      <MeshBlobs blobs={[
        { color: '#1C4F7A', opacity: .85, size: 700, top: -100, left: -200 },
        { color: '#D44B27', opacity: .30, size: 700, bottom: -150, right: -200 },
        { color: '#72E9B8', opacity: .10, size: 380, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' },
      ]} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '24px 20px' : '40px 32px', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow tag */}
        <div style={{
          transition: 'opacity .7s ease, transform .7s ease',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(16px)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 14px', borderRadius: 999,
            border: '1px solid rgba(114,233,184,.35)',
            marginBottom: 36,
          }}>
            <span style={{
              fontFamily: T.body, fontSize: 11, fontWeight: 600,
              color: T.accent, letterSpacing: '.08em',
            }}>FAD — UNC</span>
            <span style={{ width: 1, height: 12, background: 'rgba(114,233,184,.3)' }} />
            <span style={{
              fontFamily: T.body, fontSize: 11,
              color: T.muted, letterSpacing: '.06em',
            }}>Est. Córdoba</span>
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
            fontFamily: T.display, fontWeight: 700,
            fontSize: 'clamp(52px, 8vw, 120px)',
            lineHeight: .92, letterSpacing: '-.03em',
            textTransform: 'uppercase',
            color: T.text, margin: 0, maxWidth: 1100,
          }}>
            Cuando la tecnología<br/>
            <span style={{ color: T.accent }}>cobra sentido.</span>
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
              fontFamily: T.body, fontSize: 18, lineHeight: 1.6,
              color: T.muted, maxWidth: 580, margin: 0,
            }}>
              La persona en el origen de todo lo que investigamos, en articulación con la academia,
              el sector productivo y la sociedad, para que el conocimiento se convierta en acción.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#laboratorios" style={{
                background: T.accent, color: '#04041e', border: 'none',
                padding: '14px 28px', cursor: 'pointer',
                fontFamily: T.display, fontSize: 13, fontWeight: 700,
                letterSpacing: '.06em', textTransform: 'uppercase',
                borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none',
              }}>Explorar laboratorios →</a>
              <a href="#servicios" style={{
                background: 'transparent', color: T.muted,
                border: `1px solid ${T.border}`,
                padding: '13px 22px', cursor: 'pointer',
                fontFamily: T.body, fontSize: 12,
                borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none',
              }}>Servicios de consultoría</a>
            </div>
          </div>

          {/* Stats 2×2 — solo desktop */}
          {!isMobile && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              {stats.map(s => (
                <div key={s.label} style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                  <div style={{
                    fontFamily: T.display, fontSize: 34,
                    fontWeight: 700, color: T.text, lineHeight: 1, letterSpacing: '-.02em',
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: T.body, fontSize: 12,
                    color: T.muted, marginTop: 6,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech chips — solo desktop */}
        {!isMobile && (
          <div style={{
            marginTop: 80, paddingTop: 24, borderTop: `1px solid ${T.border}`,
            transition: 'opacity .9s ease', transitionDelay: '.4s',
            opacity: mounted ? 1 : 0,
          }}>
            <div style={{
              fontFamily: T.body, fontSize: 10,
              color: T.muted, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 16,
            }}>Tecnologías</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {technologies.map(t => (
                <span key={t} style={{
                  fontFamily: T.body, fontSize: 12,
                  padding: '6px 14px', borderRadius: 999,
                  background: T.surface, border: `1px solid ${T.border}`, color: T.muted,
                }}>{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
