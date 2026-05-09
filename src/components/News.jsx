import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { client, urlFor } from '../sanity/client'
import { T, SectionLabel, MeshBlobs } from '../tokens'

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
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 16, overflow: 'hidden',
      transition: `opacity .7s ease, transform .7s ease`,
      transitionDelay: `${index * .08}s`,
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Imagen */}
      <div style={{
        height: 180, overflow: 'hidden',
        background: `linear-gradient(135deg, ${T.bg}, ${T.surface})`,
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {item.imagen
          ? <img src={urlFor(item.imagen).width(800).height(360).url()} alt={item.titulo}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontFamily: T.body, fontSize: 10,
              color: T.muted, textTransform: 'uppercase', letterSpacing: '.14em' }}>[ imagen ]</span>
        }
      </div>

      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily: T.body, fontSize: 10,
          color: T.accent, textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 14,
        }}>{labLabels[item.lab] || item.lab}</span>

        <h3 style={{
          fontFamily: T.display, fontSize: 18, fontWeight: 700,
          lineHeight: 1.25, letterSpacing: '-.015em',
          color: T.text, margin: 0, marginBottom: 10, flex: 1,
        }}>{item.titulo}</h3>

        <p style={{
          fontFamily: T.body, fontSize: 13, lineHeight: 1.6,
          color: T.muted, margin: 0, marginBottom: 20,
        }}>{item.resumen}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <time style={{ fontFamily: T.body, fontSize: 11, color: T.muted }}>
            {formatDate(item.fecha)}
          </time>
          <Link to={item.slug?.current ? `/novedades/${item.slug.current}` : '#'}
            style={{ fontFamily: T.body, fontSize: 13, color: T.accent, textDecoration: 'none' }}>
            Leer →
          </Link>
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
      _id, titulo, lab, fecha, resumen, imagen, slug
    }`).then(data => {
      setNovedades(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <section id="novedades" style={{
      background: T.bg, color: T.text,
      padding: isMobile ? '56px 20px' : '140px 32px',
      position: 'relative', overflow: 'hidden',
    }}>
      <MeshBlobs blobs={[
        { color: T.warm, opacity: .40, size: 560, bottom: -120, right: -180 },
        { color: T.warm, opacity: .40, size: 560, top: -100, left: -160 },
      ]} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={ref} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 60, flexWrap: 'wrap', gap: 24,
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
        }}>
          <div>
            <SectionLabel num="02" label="Novedades" />
            <h2 style={{
              fontFamily: T.display, fontWeight: 700,
              fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1, letterSpacing: '-.035em', margin: 0,
              textTransform: 'uppercase',
            }}>
              Últimas<br/>
              <span style={{ color: T.muted }}>actualizaciones.</span>
            </h2>
          </div>
          <a href="#" style={{
            fontFamily: T.body, fontSize: 14,
            color: T.accent, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>Ver todas →</a>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60,
            fontFamily: T.body, fontSize: 11,
            color: T.muted, letterSpacing: '.14em' }}>
            Cargando...
          </div>
        ) : novedades.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 60,
            border: `1px solid ${T.border}`, borderRadius: 16,
            fontFamily: T.body, fontSize: 11,
            color: T.muted, letterSpacing: '.14em',
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
