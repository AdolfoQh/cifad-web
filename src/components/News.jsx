import { useInView } from '../hooks/useInView'

const B = {
  bg2: '#10151d', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff',
}

const placeholderNews = [
  {
    id: 1,
    tag: 'General',
    title: 'Lanzamiento del CIFAD — Centro de Investigación FAD UNCuyo',
    excerpt: 'El Centro de Investigación de la Facultad de Artes y Diseño inicia actividades con seis laboratorios especializados.',
    date: '2025-11-01',
  },
  {
    id: 2,
    tag: 'Laboratorio',
    title: 'Próximas novedades de los laboratorios',
    excerpt: 'Cada laboratorio publicará sus investigaciones, eventos y actividades en esta sección.',
    date: '2025-11-15',
  },
  {
    id: 3,
    tag: 'Eventos',
    title: 'Actividades y convocatorias 2026',
    excerpt: 'Talleres, conferencias y oportunidades de colaboración para investigadores, estudiantes y empresas.',
    date: '2026-01-01',
  },
]

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
      {/* Image placeholder */}
      <div style={{
        height: 180, background: `linear-gradient(135deg, ${B.bg2}, ${B.surface})`,
        border: `0 0 1px 0 solid ${B.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${B.border}`,
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: B.muted, textTransform: 'uppercase', letterSpacing: '.14em',
        }}>[ imagen ]</span>
      </div>

      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            color: B.accent, textTransform: 'uppercase', letterSpacing: '.14em',
          }}>{item.tag}</span>
        </div>

        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 500,
          lineHeight: 1.25, letterSpacing: '-.015em',
          color: B.text, margin: 0, marginBottom: 10, flex: 1,
        }}>{item.title}</h3>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.6,
          color: B.muted, margin: 0, marginBottom: 20,
        }}>{item.excerpt}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <time style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: B.muted,
          }}>{formatDate(item.date)}</time>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: B.accent2, cursor: 'pointer',
          }}>Leer →</span>
        </div>
      </div>
    </article>
  )
}

export default function News() {
  const [ref, inView] = useInView()
  return (
    <section id="novedades" style={{ background: B.bg2, color: B.text, padding: '140px 32px' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {placeholderNews.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
