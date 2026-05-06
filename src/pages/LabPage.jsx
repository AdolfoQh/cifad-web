import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { labs } from '../data/labs'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { client, urlFor } from '../sanity/client'
import { team, researchers } from '../data/team'

const groupImages = {
  coordinacion: '/images/equipo/coordinacion.jpg',
  docente:      '/images/equipo/profesores.jpg',
  graduado:     '/images/equipo/egresados.jpg',
}

function getGroupImage(name) {
  if (team.some(p => p.name === name)) return groupImages.coordinacion
  const r = researchers.find(p => p.name === name)
  if (r) return groupImages[r.category] || null
  return null
}

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

function ContentSection({ label, children, topMargin = false }) {
  return (
    <div style={{ marginTop: topMargin ? 56 : 0 }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 20,
      }}>{label}</div>
      {children}
    </div>
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
  const isMobile = useIsMobile()

  const [proyectos, setProyectos] = useState([])
  const [novedades, setNovedades] = useState([])
  const [publicaciones, setPublicaciones] = useState([])
  const [eventos, setEventos] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  // Scroll al inicio al entrar
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

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
        `*[_type == "novedad" && lab == $lab] | order(fecha desc) {
          _id, titulo, fecha, resumen, imagen
        }`,
        { lab: slug }
      ),
      client.fetch(
        `*[_type == "publicacion" && lab == $lab] | order(fecha desc) {
          _id, titulo, fecha, autores, resumen, doi, url
        }`,
        { lab: slug }
      ),
      client.fetch(
        `*[_type == "evento" && lab == $lab] | order(fechaInicio desc) {
          _id, titulo, fechaInicio, fechaFin, lugar
        }`,
        { lab: slug }
      ),
    ]).then(([proy, news, pubs, evts]) => {
      setProyectos(proy)
      setNovedades(news)
      setPublicaciones(pubs)
      setEventos(evts)
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
        padding: isMobile ? '110px 20px 60px' : '160px 32px 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Imagen de fondo del lab */}
        {lab.image && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${lab.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: .28, pointerEvents: 'none',
          }}/>
        )}
        {/* Glow de color */}
        <div style={{
          position: 'absolute', top: -100, right: -100, width: 600, height: 600,
          borderRadius: '50%', background: lab.color,
          opacity: lab.image ? .06 : .08, filter: 'blur(120px)', pointerEvents: 'none',
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
      <section style={{ padding: isMobile ? '48px 20px 80px' : '80px 32px 120px', background: B.bg2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
            {/* Left: description + áreas + proyectos + novedades */}
            <div>
              <FadeIn>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                  color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 16,
                }}>Sobre el laboratorio</div>
                {lab.description.split('\n\n').map((p, i) => (
                  <p key={i} style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.65,
                    color: B.muted, marginBottom: i < lab.description.split('\n\n').length - 1 ? 20 : 48,
                  }}>{p}</p>
                ))}
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
                <ContentSection label="Proyectos e investigaciones" topMargin>

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
                </ContentSection>
              </FadeIn>

              {/* Novedades */}
              {!loadingData && novedades.length > 0 && (
                <FadeIn delay={.3}>
                  <ContentSection label="Novedades" color={lab.color} topMargin>
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
                  </ContentSection>
                </FadeIn>
              )}

              {/* Publicaciones */}
              {!loadingData && publicaciones.length > 0 && (
                <FadeIn delay={.35}>
                  <ContentSection label="Publicaciones" color={lab.color} topMargin>
                    <div style={{
                      background: B.surface, border: `1px solid ${B.border}`,
                      borderRadius: 16, overflow: 'hidden',
                    }}>
                      {publicaciones.map((p, i) => (
                        <div key={p._id} style={{
                          padding: '18px 24px',
                          borderBottom: i < publicaciones.length - 1 ? `1px solid ${B.border}` : 'none',
                        }}>
                          <div style={{
                            fontFamily: 'Space Grotesk, sans-serif', fontSize: 15,
                            fontWeight: 500, color: B.text, marginBottom: 4,
                          }}>{p.titulo}</div>
                          {p.autores && p.autores.length > 0 && (
                            <div style={{
                              fontFamily: 'Inter, sans-serif', fontSize: 12,
                              color: B.muted, marginBottom: 4,
                            }}>{p.autores.join(', ')}</div>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                            <span style={{
                              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: B.muted,
                            }}>{formatDate(p.fecha)}</span>
                            {p.doi && (
                              <span style={{
                                fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: lab.color,
                              }}>DOI: {p.doi}</span>
                            )}
                            {p.url && (
                              <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                                fontFamily: 'Inter, sans-serif', fontSize: 12,
                                color: lab.color, textDecoration: 'none',
                              }}>Ver →</a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ContentSection>
                </FadeIn>
              )}

              {/* Eventos */}
              {!loadingData && eventos.length > 0 && (
                <FadeIn delay={.4}>
                  <ContentSection label="Eventos" color={lab.color} topMargin>
                    <div style={{
                      background: B.surface, border: `1px solid ${B.border}`,
                      borderRadius: 16, overflow: 'hidden',
                    }}>
                      {eventos.map((e, i) => (
                        <div key={e._id} style={{
                          padding: '18px 24px',
                          borderBottom: i < eventos.length - 1 ? `1px solid ${B.border}` : 'none',
                          display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center',
                        }}>
                          <div>
                            <div style={{
                              fontFamily: 'Space Grotesk, sans-serif', fontSize: 15,
                              fontWeight: 500, color: B.text, marginBottom: 4,
                            }}>{e.titulo}</div>
                            {e.lugar && (
                              <div style={{
                                fontFamily: 'Inter, sans-serif', fontSize: 12, color: B.muted,
                              }}>{e.lugar}</div>
                            )}
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{
                              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: B.muted,
                            }}>{formatDate(e.fechaInicio)}</div>
                            {e.fechaFin && (
                              <div style={{
                                fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: B.muted,
                              }}>{formatDate(e.fechaFin)}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ContentSection>
                </FadeIn>
              )}
            </div>

            {/* Right: sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Responsable/s */}
              <FadeIn delay={.15}>
                <div style={{
                  background: B.surface, border: `1px solid ${B.border}`,
                  borderRadius: 16, padding: 28,
                }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 16,
                  }}>Responsable{lab.responsible.length > 1 ? 's' : ''}</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {lab.responsible.map((r, i) => {
                      const img = getGroupImage(r)
                      return (
                        <div key={r} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '8px 0',
                          borderBottom: i < lab.responsible.length - 1 ? `1px solid ${B.border}` : 'none',
                        }}>
                          {img && (
                            <img src={img} alt={r} style={{
                              width: 36, height: 36, borderRadius: '50%',
                              objectFit: 'cover', flexShrink: 0,
                              border: `2px solid ${B.border}`,
                            }} />
                          )}
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: B.text }}>
                            {r}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </FadeIn>

              {/* Integrantes */}
              {lab.members && lab.members.length > 0 && (
                <FadeIn delay={.2}>
                  <div style={{
                    background: B.surface, border: `1px solid ${B.border}`,
                    borderRadius: 16, padding: 28,
                  }}>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                      color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 16,
                    }}>Integrantes</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {lab.members.map((m, i) => (
                        <div key={m.name} style={{
                          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8,
                          padding: '8px 0',
                          borderBottom: i < lab.members.length - 1 ? `1px solid ${B.border}` : 'none',
                        }}>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: B.text }}>
                            {m.name}
                          </span>
                          {m.role && (
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                              color: B.muted, textTransform: 'uppercase', letterSpacing: '.1em', flexShrink: 0 }}>
                              {m.role}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Colaboraciones */}
              {lab.collaborations.length > 0 && (
                <FadeIn delay={.25}>
                  <div style={{
                    background: B.surface, border: `1px solid ${B.border}`,
                    borderRadius: 16, padding: 28,
                  }}>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                      color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 16,
                    }}>Colaboraciones</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {lab.collaborations.map((c, i) => (
                        <div key={c} style={{
                          fontFamily: 'Inter, sans-serif', fontSize: 13, color: B.muted,
                          padding: '8px 0',
                          borderBottom: i < lab.collaborations.length - 1 ? `1px solid ${B.border}` : 'none',
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
