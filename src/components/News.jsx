import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { client, urlFor } from '../sanity/client'

const B = {
  bg2: '#10151d', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff',
}

const labLabels = {
  general: 'General',
  color: 'Lab. Color',
  biomateriales: 'Lab. Biomateriales',
  morfologia: 'Lab. Morfología',
  ia: 'Lab. IA',
  mecatronica: 'Lab. Mecatrónica',
  audiovisual: 'Lab. Audiovisual',
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function NewsCard({ item, index }) {
  const [ref, inView] = useInView()
  return (
    <article ref={ref} style={{
      background: B.surface, border: `1px solid ${B.border}`,
      borderRadius: 16, overflow: 'hidden',
      transition: `opacity .7s ease, transform .7s ease`,
      transitionDelay: `${index * .08}s`,
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Imagen */}
      <div style={{
        height: 180, overflow: 'hidden',
        background: `linear-gradient(135deg, ${B.bg2}, ${B.surface})`,
        borderBottom: `1px solid ${B.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {item.imagen
          ? <img src={urlFor(item.imagen).width(800).height(360).url()} alt={item.titulo}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: B.muted, textTransform: 'uppercase', letterSpacing: '.14em' }}>[ imagen ]</span>
        }
      </div>

      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: B.accent, textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 14,
        }}>{labLabels[item.lab] || item.lab}</span>

        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 500,
          lineHeight: 1.25, letterSpacing: '-.015em',
          color: B.text, margin: 0, marginBottom: 10, flex: 1,
        }}>{item.titulo}</h3>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.6,
          color: B.muted, margin: 0, marginBottom: 20,
        }}>{item.resumen}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <time style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: B.muted }}>
            {formatDate(item.fecha)}
          </time>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: B.accent2, cursor: 'pointer' }}>
            Leer →
          </span>
        </div>
      </div>
    </article>
  )
}

export default function News() {
  const [ref, inView] = useInView()
  const [novedades, setNovedades] = useState([])
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    client.fetch(`*[_type == "novedad" && mostrarEnHome == true] | order(fecha desc)[0..5] {
      _id, titulo, lab, fecha, resumen, imagen
    }`).then(data => {
      setNovedades(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <section id="novedades" style={{ background: B.bg2, color: B.text, padding: isMobile ? '80px 20px' : '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 60, flexWrap: 'wrap', gap: 24,
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
        }}>
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: B.accent, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 14,
            }}>// 02 Novedades</div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
              fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1, letterSpacing: '-.035em', margin: 0,
            }}>
              Últimas<br/>
              <span style={{ color: B.muted }}>actualizaciones.</span>
            </h2>
          </div>
          <a href="#" style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14,
            color: B.accent2, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>Ver todas →</a>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.muted, letterSpacing: '.14em' }}>
            Cargando...
          </div>
        ) : novedades.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 60,
            border: `1px solid ${B.border}`, borderRadius: 16,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.muted, letterSpacing: '.14em',
          }}>
            [ Las novedades se publicarán próximamente ]
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {novedades.map((item, i) => (
              <NewsCard key={item._id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
