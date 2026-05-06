import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { services } from '../data/stats'

const B = {
  bg2: '#10151d', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d',
}

function ServiceCard({ s, index }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      background: B.surface, border: `1px solid ${B.border}`,
      borderRadius: 20, padding: 32,
      position: 'relative', overflow: 'hidden',
      transition: `opacity .7s ease, transform .7s ease`,
      transitionDelay: `${index * .08}s`,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
        color: B.accent, letterSpacing: '.15em', marginBottom: 14,
      }}>0{index + 1}</div>
      <h3 style={{
        fontFamily: 'Space Grotesk, sans-serif', fontSize: 24,
        fontWeight: 500, letterSpacing: '-.02em', margin: 0, marginBottom: 12,
        color: B.text,
      }}>{s.title}</h3>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: 14,
        lineHeight: 1.65, color: B.muted, margin: 0,
      }}>{s.description}</p>
    </div>
  )
}

export default function Services() {
  const [ref, inView] = useInView()
  const isMobile = useIsMobile()
  return (
    <section id="servicios" style={{ background: B.bg2, color: B.text, padding: isMobile ? '80px 20px' : '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
          marginBottom: 60,
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.accent, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 14,
          }}>// 05 Consultoría</div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1,
            letterSpacing: '-.035em', margin: 0, marginBottom: 16,
          }}>
            Construimos con<br/>
            <span style={{ color: B.muted }}>empresas e instituciones.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.6,
            color: B.muted, maxWidth: 600, margin: 0,
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
