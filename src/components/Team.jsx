import { useInView } from '../hooks/useInView'
import { team, researchers, collaborations } from '../data/team'

const B = {
  bg: '#0a0e14', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff',
}

const groups = [
  {
    key: 'coordinacion',
    label: 'Coordinación',
    image: '/images/equipo/coordinacion.jpg',
    members: team,
  },
  {
    key: 'docentes',
    label: 'Investigadores docentes',
    image: '/images/equipo/profesores.jpg',
    members: researchers.filter(r => r.category === 'docente'),
  },
  {
    key: 'egresados',
    label: 'Investigadores graduados',
    image: '/images/equipo/egresados.jpg',
    members: researchers.filter(r => r.category === 'graduado'),
  },
]

function GroupCard({ group, index }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      background: B.surface, border: `1px solid ${B.border}`,
      borderRadius: 20, overflow: 'hidden',
      transition: `opacity .7s ease, transform .7s ease`,
      transitionDelay: `${index * .1}s`,
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
    }}>
      {/* Imagen */}
      <div style={{ height: 220, overflow: 'hidden' }}>
        <img
          src={group.image}
          alt={group.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: 28 }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: B.accent, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 16,
        }}>{group.label}</div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {group.members.map((m, i) => (
            <div key={m.name} style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13,
              color: B.muted, padding: '8px 0',
              borderBottom: i < group.members.length - 1 ? `1px solid ${B.border}` : 'none',
              display: 'flex', alignItems: 'baseline', gap: 8,
            }}>
              <span style={{ color: B.text }}>{m.name}</span>
              {m.role && (
                <span style={{ fontSize: 11, color: B.muted + 'aa', flexShrink: 0 }}>
                  {m.role}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
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

        {/* Grupos con imagen */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          {groups.map((g, i) => <GroupCard key={g.key} group={g} index={i} />)}
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
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
                  fontSize: 18, color: B.text, marginBottom: 4,
                }}>{c.name}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                  color: B.accent, letterSpacing: '.1em',
                }}>{c.country.toUpperCase()}</div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  color: B.muted, marginTop: 10,
                }}>{c.area}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
