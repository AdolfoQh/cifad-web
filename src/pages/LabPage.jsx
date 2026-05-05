import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { labs } from '../data/labs'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useInView } from '../hooks/useInView'
import { client, urlFor } from '../sanity/client'

const B = {
  bg: '#0a0e14', bg2: '#10151d', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff',
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      transition: `opacity .7s ease, transform .7s ease`,
      transitionDelay: `${delay}s`,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      ...style,
    }}>{children}</div>
  )
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatYear(start, end) {
  const s = start ? new Date(start).getFullYear() : '?'
  const e = end ? new Date(end).getFullYear() : ''
  return e ? `${s}–${e}` : `${s}–`
}

export default function LabPage() {
  const { slug } = useParams()
  const lab = labs.find((l) => l.slug === slug)

  const [proyectos, setProyectos] = useState([])
  const [novedades, setNovedades] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!lab) return
    Promise.all([
      client.fetch(
        `*[_type == "proyecto" && lab == $lab] | order(fechaInicio desc) {
          _id, titulo, estado, fechaInicio, fechaFin, autores
        }`,
        { lab: slug }
      ),
      client.fetch(
        `*[_type == "novedad" && lab == $lab] | order(fecha desc)[0..2] {
          _id, titulo, fecha, resumen, imagen
        }`,
        { lab: slug }
      ),
    ]).then(([proy, news]) => {
      setProyectos(proy)
      setNovedades(news)
      setLoadingData(false)
    }).catch(() => setLoadingData(false))
  }, [slug, lab])

  if (!lab) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: B.bg, color: B.text, flexDirection: 'column', gap: 16,
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
          color: B.muted, textTransform: 'uppercase', letterSpacing: '.18em',
        }}>404 — No encontrado</span>
        <Link to="/" style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: 18,
          color: B.accent, textDecoration: 'none',
        }}>← Volver al inicio</Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: B.bg, color: B.text }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: 160, paddingBottom: 100,
        padding: '160px 32px 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, right: -100, width: 600, height: 600,
          borderRadius: '50%', background: lab.color,
          opacity: .08, filter: 'blur(120px)', pointerEvents: 'none',
        }}/>

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <Link
            to="/#laboratorios"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'Inter, sans-serif', fontSize: 13,
              color: B.muted, textDecoration: 'none', marginBottom: 48,
              transition: 'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = B.text}
            onMouseLeave={e => e.currentTarget.style.color = B.muted}
          >
            ← Todos los laboratorios
          </Link>

          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: lab.color, marginBottom: 24,
          }}>LAB / {lab.num} — CIFAD</div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(48px, 7vw, 110px)', lineHeight: .95,
            letterSpacing: '-.035em', margin: 0, marginBottom: 28, maxWidth: 900,
          }}>{lab.name}</h1>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 20, lineHeight: 1.55,
            color: B.muted, maxWidth: 680, margin: 0,
          }}>{lab.shortDescription}</p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: '80px 32px 120px', background: B.bg2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64, alignItems: 'start' }}>
            {/* Left: description + áreas + proyectos + novedades */}
            <div>
              <FadeIn>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                  color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 16,
                }}>Sobre el laboratorio</div>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.65,
                  color: B.muted, marginBottom: 48,
                }}>{lab.description}</p>
              </FadeIn>

              <FadeIn delay={.1}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                  color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 20,
                }}>Áreas de trabajo</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 56 }}>
                  {lab.areas.map((area) => (
                    <span key={area} style={{
                      fontFamily: 'Inter, sans-serif', fontSize: 13,
                      padding: '8px 16px', borderRadius: 999,
                      background: B.surface, border: `1px solid ${B.border}`,
                      color: B.text,
                    }}>{area}</span>
                  ))}
                </div>
              </FadeIn>

              {/* Proyectos */}
              <FadeIn delay={.2}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                  color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 20,
                }}>Proyectos e investigaciones</div>

                {loadingData ? (
                  <div style={{
                    background: B.surface, border: `1px solid ${B.border}`,
                    borderRadius: 16, padding: 32, textAlign: 'center',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                    color: B.muted, letterSpacing: '.14em',
                  }}>Cargando...</div>
                ) : proyectos.length === 0 ? (
                  <div style={{
                    background: B.surface, border: `1px solid ${B.border}`,
                    borderRadius: 16, padding: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 100,
                  }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                      color: B.muted, textTransform: 'uppercase', letterSpacing: '.14em',
                    }}>[ próximamente ]</span>
                  </div>
                ) : (
                  <div style={{
                    background: B.surface, border: `1px solid ${B.border}`,
                    borderRadius: 16, overflow: 'hidden',
                  }}>
                    {proyectos.map((p, i) => {
                      const isActive = p.estado === 'en_curso'
                      return (
                        <div key={p._id} style={{
                          display: 'grid', gridTemplateColumns: '1fr auto',
                          alignItems: 'center', gap: 16,
                          padding: '18px 24px',
                          borderBottom: i < proyectos.length - 1 ? `1px solid ${B.border}` : 'none',
                        }}>
                          <div>
                            <div style={{
                              fontFamily: 'Space Grotesk, sans-serif', fontSize: 15,
                              fontWeight: 500, color: B.text, marginBottom: 4,
                            }}>{p.titulo}</div>
                            {p.autores && p.autores.length > 0 && (
                              <div style={{
                                fontFamily: 'Inter, sans-serif', fontSize: 12,
                                color: B.muted,
                              }}>{p.autores.join(', ')}</div>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                            <span style={{
                              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                              color: B.muted,
                            }}>{formatYear(p.fechaInicio, p.fechaFin)}</span>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center',
                              padding: '3px 10px', borderRadius: 999,
                              background: isActive ? `${lab.color}20` : B.border,
                              border: `1px solid ${isActive ? lab.color : B.border}`,
                              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                              color: isActive ? lab.color : B.muted,
                              textTransform: 'uppercase', letterSpacing: '.1em',
                            }}>{isActive ? 'En curso' : 'Finalizado'}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </FadeIn>

              {/* Novedades */}
              {!loadingData && novedades.length > 0 && (
                <FadeIn delay={.3}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em',
                    marginTop: 56, marginBottom: 20,
                  }}>Últimas novedades</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {novedades.map((item) => (
                      <div key={item._id} style={{
                        background: B.surface, border: `1px solid ${B.border}`,
                        borderRadius: 16, overflow: 'hidden',
                        display: 'grid', gridTemplateColumns: item.imagen ? '120px 1fr' : '1fr',
                      }}>
                        {item.imagen && (
                          <img
                            src={urlFor(item.imagen).width(240).height(160).url()}
                            alt={item.titulo}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        )}
                        <div style={{ padding: 20 }}>
                          <div style={{
                            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                            color: B.muted, marginBottom: 6,
                          }}>{formatDate(item.fecha)}</div>
                          <div style={{
                            fontFamily: 'Space Grotesk, sans-serif', fontSize: 15,
                            fontWeight: 500, color: B.text, marginBottom: 6,
                          }}>{item.titulo}</div>
                          {item.resumen && (
                            <p style={{
                              fontFamily: 'Inter, sans-serif', fontSize: 13,
                              lineHeight: 1.5, color: B.muted, margin: 0,
                            }}>{item.resumen}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Right: sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Responsables */}
              <FadeIn delay={.15}>
                <div style={{
                  background: B.surface, border: `1px solid ${B.border}`,
                  borderRadius: 16, padding: 28,
                }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 20,
                  }}>Responsable{lab.responsible.length > 1 ? 's' : ''}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {lab.responsible.map((r) => (
                      <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                          background: `linear-gradient(135deg, ${lab.color}80, ${B.accent2}60)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                          fontSize: 12, color: B.bg,
                        }}>
                          {r.split(' ').filter(w => w.length > 2).slice(-2).map(w => w[0]).join('')}
                        </div>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: B.text }}>
                          {r}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Stats rápidas */}
              {!loadingData && (proyectos.length > 0 || novedades.length > 0) && (
                <FadeIn delay={.2}>
                  <div style={{
                    background: B.surface, border: `1px solid ${B.border}`,
                    borderRadius: 16, padding: 28,
                  }}>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                      color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 20,
                    }}>Actividad</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {proyectos.length > 0 && (
                        <div>
                          <div style={{
                            fontFamily: 'Space Grotesk, sans-serif', fontSize: 28,
                            fontWeight: 600, color: lab.color, lineHeight: 1,
                          }}>{proyectos.length}</div>
                          <div style={{
                            fontFamily: 'Inter, sans-serif', fontSize: 12,
                            color: B.muted, marginTop: 4,
                          }}>proyecto{proyectos.length !== 1 ? 's' : ''} registrado{proyectos.length !== 1 ? 's' : ''}</div>
                        </div>
                      )}
                      {proyectos.filter(p => p.estado === 'en_curso').length > 0 && (
                        <div>
                          <div style={{
                            fontFamily: 'Space Grotesk, sans-serif', fontSize: 28,
                            fontWeight: 600, color: lab.color, lineHeight: 1,
                          }}>{proyectos.filter(p => p.estado === 'en_curso').length}</div>
                          <div style={{
                            fontFamily: 'Inter, sans-serif', fontSize: 12,
                            color: B.muted, marginTop: 4,
                          }}>en curso</div>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Collaborations */}
              {lab.collaborations.length > 0 && (
                <FadeIn delay={.25}>
                  <div style={{
                    background: B.surface, border: `1px solid ${B.border}`,
                    borderRadius: 16, padding: 28,
                  }}>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                      color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 20,
                    }}>Colaboraciones</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {lab.collaborations.map((c) => (
                        <div key={c} style={{
                          fontFamily: 'Inter, sans-serif', fontSize: 13, color: B.muted,
                          paddingBottom: 10, borderBottom: `1px solid ${B.border}`,
                        }}>{c}</div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Color accent block */}
              <FadeIn delay={.3}>
                <div style={{
                  borderRadius: 16, padding: 28, height: 120,
                  background: `linear-gradient(135deg, ${lab.color}18, ${lab.color}08)`,
                  border: `1px solid ${lab.color}30`,
                  display: 'flex', alignItems: 'flex-end',
                }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    color: lab.color, textTransform: 'uppercase', letterSpacing: '.15em',
                  }}>CIFAD · LAB {lab.num}</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
