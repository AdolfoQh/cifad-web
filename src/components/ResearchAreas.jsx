import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { researchAreas } from '../data/researchAreas'

const B = {
  bg: '#0a0e14', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff',
}

export default function ResearchAreas() {
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView()
  const isMobile = useIsMobile()

  return (
    <section id="investigación" style={{ background: B.bg, color: B.text, padding: isMobile ? '80px 20px' : '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.accent, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 14,
          }}>// 04 Investigación</div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1,
            letterSpacing: '-.035em', margin: 0, marginBottom: 16, maxWidth: 900,
          }}>
            Vectores de investigación.
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.6,
            color: B.muted, maxWidth: 600, margin: '0 0 60px',
          }}>
            Ecosistema de trabajo que activa conocimiento y lo valida.
          </p>
        </div>

        {isMobile ? (
          /* Mobile: cada ítem expande su card inline */
          <div>
            {researchAreas.map((a, i) => (
              <div key={a.id}>
                <button onClick={() => setActive(active === i ? -1 : i)} style={{
                  width: '100%', background: 'transparent', border: 'none',
                  borderTop: `1px solid ${B.border}`,
                  borderBottom: i === researchAreas.length - 1 && active !== i ? `1px solid ${B.border}` : 'none',
                  padding: '20px 0', cursor: 'pointer', textAlign: 'left',
                  color: active === i ? B.text : B.muted,
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 500,
                  letterSpacing: '-.02em', transition: 'color .3s',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <span style={{
                    width: active === i ? 28 : 10, height: 2,
                    background: active === i ? B.accent : B.border,
                    transition: 'width .35s, background .35s', flexShrink: 0,
                  }}/>
                  {a.name}
                </button>

                {active === i && (
                  <div style={{
                    background: B.surface, border: `1px solid ${B.border}`,
                    borderRadius: 16, padding: 24, margin: '8px 0 4px',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0, opacity: .25,
                      background: `radial-gradient(ellipse at top right, ${B.accent}30, transparent 60%)`,
                      pointerEvents: 'none',
                    }}/>
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                        color: B.accent, letterSpacing: '.15em', marginBottom: 12,
                      }}>0{i + 1} / 0{researchAreas.length}</div>
                      <h3 style={{
                        fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 500,
                        lineHeight: 1.1, letterSpacing: '-.02em', margin: 0, marginBottom: 12,
                      }}>{a.name}</h3>
                      <p style={{
                        fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.65,
                        color: B.muted, margin: 0,
                      }}>{a.description}</p>
                      <div style={{
                        marginTop: 20, height: 140, borderRadius: 10,
                        overflow: 'hidden', border: `1px solid ${B.border}`,
                      }}>
                        <img src={a.image} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: grilla lateral */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60 }}>
            {/* Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {researchAreas.map((a, i) => (
                <button key={a.id} onClick={() => setActive(i)} style={{
                  background: 'transparent', border: 'none',
                  borderTop: `1px solid ${B.border}`,
                  borderBottom: i === researchAreas.length - 1 ? `1px solid ${B.border}` : 'none',
                  padding: '24px 0', cursor: 'pointer', textAlign: 'left',
                  color: active === i ? B.text : B.muted,
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 500,
                  letterSpacing: '-.02em', transition: 'color .3s',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <span style={{
                    width: active === i ? 32 : 12, height: 2,
                    background: active === i ? B.accent : B.border,
                    transition: 'width .35s, background .35s', flexShrink: 0,
                  }}/>
                  {a.name}
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div style={{
              background: B.surface, border: `1px solid ${B.border}`,
              borderRadius: 24, padding: 40,
              position: 'relative', overflow: 'hidden', minHeight: 380,
            }}>
              <div style={{
                position: 'absolute', inset: 0, opacity: .25,
                background: `radial-gradient(ellipse at top right, ${B.accent}30, transparent 60%)`,
                pointerEvents: 'none',
              }}/>
              <div style={{ position: 'relative' }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                  color: B.accent, letterSpacing: '.15em', marginBottom: 20,
                }}>0{active + 1} / 0{researchAreas.length}</div>
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: 36, fontWeight: 500,
                  lineHeight: 1.05, letterSpacing: '-.02em', margin: 0, marginBottom: 16,
                }}>{researchAreas[active].name}</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.65,
                  color: B.muted, margin: 0,
                }}>{researchAreas[active].description}</p>
                <div style={{
                  marginTop: 28, height: 160, borderRadius: 12,
                  overflow: 'hidden', border: `1px solid ${B.border}`,
                }}>
                  <img
                    src={researchAreas[active].image}
                    alt={researchAreas[active].name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'opacity .4s ease' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
