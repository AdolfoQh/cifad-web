import { useInView } from '../hooks/useInView'
import { team, researchers, collaborations } from '../data/team'

const B = {
  bg: '#0a0e14', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff',
}

function initials(name) {
  return name.split(' ').filter(w => w.length > 2).slice(-2).map(w => w[0]).join('')
}

export default function Team() {
  const [ref, inView] = useInView()
  return (
    <section id="equipo" style={{ background: B.bg, color: B.text, padding: '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
          marginBottom: 60,
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.accent, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 14,
          }}>// 06 Equipo</div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1, letterSpacing: '-.035em', margin: 0,
          }}>
            Investigadores e<br/>
            <span style={{ color: B.muted }}>infraestructura humana.</span>
          </h2>
        </div>

        {/* Dirección */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {team.map(m => (
            <div key={m.name} style={{
              background: B.surface, border: `1px solid ${B.border}`,
              borderRadius: 16, padding: 24,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${B.accent}, ${B.accent2})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                fontSize: 18, color: B.bg,
              }}>{initials(m.name)}</div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 16, color: B.text }}>{m.name}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: B.muted, marginTop: 2 }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Investigadores */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 48 }}>
          {researchers.map(m => (
            <div key={m.name} style={{
              padding: 16, borderRadius: 12,
              border: `1px solid ${B.border}`,
              background: B.surface + '80',
            }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: B.text }}>{m.name}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: B.muted, marginTop: 2 }}>{m.role}</div>
            </div>
          ))}
        </div>

        {/* Colaboraciones internacionales */}
        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            color: B.muted, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 16,
          }}>// Colaboraciones internacionales</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {collaborations.map(c => (
              <div key={c.name} style={{
                padding: 24, borderRadius: 16,
                background: B.surface, border: `1px solid ${B.border}`,
              }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 18, color: B.text, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: B.accent, letterSpacing: '.1em' }}>{c.country.toUpperCase()}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: B.muted, marginTop: 10 }}>{c.area}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
