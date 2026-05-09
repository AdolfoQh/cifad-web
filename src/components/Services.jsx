import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { services } from '../data/stats'
import { T, SectionLabel } from '../tokens'

function ServiceCard({ s, index }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 20, padding: 32,
      position: 'relative', overflow: 'hidden',
      transition: `opacity .7s ease, transform .7s ease`,
      transitionDelay: `${index * .08}s`,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
    }}>
      <div style={{
        fontFamily: T.body, fontSize: 11,
        color: T.accent, letterSpacing: '.15em', marginBottom: 14,
      }}>0{index + 1}</div>
      <h3 style={{
        fontFamily: T.display, fontSize: 24,
        fontWeight: 700, letterSpacing: '-.02em', margin: 0, marginBottom: 12,
        color: T.text, textTransform: 'uppercase',
      }}>{s.title}</h3>
      <p style={{
        fontFamily: T.body, fontSize: 14,
        lineHeight: 1.65, color: T.muted, margin: 0,
      }}>{s.description}</p>
    </div>
  )
}

export default function Services() {
  const [ref, inView] = useInView()
  const isMobile = useIsMobile()
  return (
    <section id="servicios" style={{ background: T.bg, color: T.text, padding: isMobile ? '56px 20px' : '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
          marginBottom: 60,
        }}>
          <SectionLabel num="05" label="Servicios" />
          <h2 style={{
            fontFamily: T.display, fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1,
            letterSpacing: '-.035em', textTransform: 'uppercase',
            margin: 0, marginBottom: 16,
          }}>
            Construimos con<br/>
            <span style={{ color: T.muted }}>empresas e instituciones.</span>
          </h2>
          <p style={{
            fontFamily: T.body, fontSize: 18, lineHeight: 1.6,
            color: T.muted, maxWidth: 600, margin: 0,
          }}>
            Brindamos conocimiento y perspectiva proyectual para resolver problemas del entorno productivo y social.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
          {services.map((s, i) => <ServiceCard key={s.title} s={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
