import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { client, urlFor } from '../sanity/client'
import { useIsMobile } from '../hooks/useIsMobile'
import { T } from '../tokens'

const labLabels = {
  general: 'General CIFAD',
  color: 'Lab. de Color',
  biomateriales: 'Lab. de Biomateriales',
  morfologia: 'Lab. de Morfología',
  ia: 'Lab. de IA Aplicada al Diseño',
  mecatronica: 'Lab. de Mecatrónica',
  audiovisual: 'Lab. Audiovisual',
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Componentes para renderizar el cuerpo (Portable Text)
const ptComponents = {
  block: {
    normal: ({ children }) => (
      <p style={{
        fontFamily: T.body, fontSize: 17, lineHeight: 1.75,
        color: T.muted, margin: '0 0 24px',
      }}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 style={{
        fontFamily: T.display, fontWeight: 700, fontSize: 28,
        letterSpacing: '-.02em', textTransform: 'uppercase',
        color: T.text, margin: '48px 0 16px',
      }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{
        fontFamily: T.display, fontWeight: 700, fontSize: 22,
        letterSpacing: '-.015em', color: T.text, margin: '36px 0 12px',
      }}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{
        borderLeft: `3px solid ${T.accent}`, paddingLeft: 20, margin: '32px 0',
        fontFamily: T.body, fontSize: 17, fontStyle: 'italic',
        color: T.text, lineHeight: 1.7,
      }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ color: T.text, fontWeight: 600 }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em style={{ fontStyle: 'italic' }}>{children}</em>
    ),
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        style={{ color: T.accent, textDecoration: 'underline', textUnderlineOffset: 3 }}>
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure style={{ margin: '32px 0' }}>
        <img
          src={urlFor(value).width(900).url()}
          alt={value.caption || ''}
          style={{ width: '100%', borderRadius: 12, display: 'block', border: `1px solid ${T.border}` }}
        />
        {value.caption && (
          <figcaption style={{
            fontFamily: T.body, fontSize: 11,
            color: T.muted, marginTop: 10, textAlign: 'center', letterSpacing: '.05em',
          }}>{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
}

export default function NovedadPage() {
  const { slug } = useParams()
  const [novedad, setNovedad] = useState(null)
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useEffect(() => {
    client.fetch(
      `*[_type == "novedad" && slug.current == $slug][0] {
        _id, titulo, lab, fecha, autores, resumen, imagen, cuerpo, slug
      }`,
      { slug }
    ).then(data => {
      setNovedad(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Navbar />
        <span style={{ fontFamily: T.body, fontSize: 11, color: T.muted, letterSpacing: '.15em' }}>
          Cargando...
        </span>
      </div>
    )
  }

  if (!novedad) {
    return (
      <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontFamily: T.body, fontSize: 11, color: T.muted, letterSpacing: '.18em' }}>
            404 — No encontrado
          </span>
          <Link to="/" style={{ fontFamily: T.display, fontSize: 18, fontWeight: 700, color: T.accent, textDecoration: 'none' }}>
            ← Volver al inicio
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: isMobile ? '100px 20px 48px' : '140px 32px 80px', background: T.bg, position: 'relative', overflow: 'hidden' }}>
        {/* Glow mint */}
        <div style={{
          position: 'absolute', top: -80, right: -80, width: 500, height: 500,
          borderRadius: '50%', background: T.accent,
          opacity: .05, filter: 'blur(100px)', pointerEvents: 'none',
        }}/>

        <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative' }}>
          {/* Back link */}
          <Link
            to={novedad.lab ? `/laboratorio/${novedad.lab}` : '/'}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: T.body, fontSize: 13,
              color: T.muted, textDecoration: 'none', marginBottom: 40,
              transition: 'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = T.text}
            onMouseLeave={e => e.currentTarget.style.color = T.muted}
          >
            ← {labLabels[novedad.lab] || 'Laboratorio'}
          </Link>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <span style={{
              fontFamily: T.body, fontSize: 10,
              color: T.accent, textTransform: 'uppercase', letterSpacing: '.15em',
              background: `${T.accent}15`, border: `1px solid ${T.accent}30`,
              padding: '4px 12px', borderRadius: 999,
            }}>{labLabels[novedad.lab] || novedad.lab}</span>
            <time style={{ fontFamily: T.body, fontSize: 11, color: T.muted }}>
              {formatDate(novedad.fecha)}
            </time>
          </div>

          {/* Título */}
          <h1 style={{
            fontFamily: T.display, fontWeight: 700,
            fontSize: isMobile ? 'clamp(28px, 7vw, 40px)' : 'clamp(36px, 4vw, 56px)',
            lineHeight: 1.08, letterSpacing: '-.03em', textTransform: 'uppercase',
            color: T.text, margin: 0, marginBottom: 20,
          }}>{novedad.titulo}</h1>

          {/* Autores */}
          {novedad.autores && novedad.autores.length > 0 && (
            <div style={{ fontFamily: T.body, fontSize: 14, color: T.muted }}>
              {novedad.autores.join(' · ')}
            </div>
          )}
        </div>
      </section>

      {/* Imagen destacada */}
      {novedad.imagen && (
        <div style={{ background: T.bg, padding: isMobile ? '0 20px 48px' : '0 32px 80px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <img
              src={urlFor(novedad.imagen).width(1200).height(630).url()}
              alt={novedad.titulo}
              style={{
                width: '100%', borderRadius: 16,
                display: 'block', border: `1px solid ${T.border}`,
              }}
            />
          </div>
        </div>
      )}

      {/* Cuerpo */}
      <section style={{ background: T.surface, padding: isMobile ? '48px 20px 80px' : '80px 32px 120px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {novedad.resumen && !novedad.cuerpo && (
            <p style={{
              fontFamily: T.body, fontSize: 18, lineHeight: 1.7,
              color: T.muted, margin: 0,
            }}>{novedad.resumen}</p>
          )}

          {novedad.cuerpo && (
            <div>
              <PortableText value={novedad.cuerpo} components={ptComponents} />
            </div>
          )}

          {!novedad.cuerpo && !novedad.resumen && (
            <p style={{
              fontFamily: T.body, fontSize: 11,
              color: T.muted, letterSpacing: '.14em', textAlign: 'center', padding: '60px 0',
            }}>[ Contenido próximamente ]</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
