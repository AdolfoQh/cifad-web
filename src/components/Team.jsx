import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { team, researchers, collaborations } from '../data/team'
import { T, SectionLabel } from '../tokens'

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
  const isMobile = useIsMobile()
  return (
    <div ref={ref} style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 20, overflow: 'hidden',
      transition: `opacity .7s ease, transform .7s ease`,
      transitionDelay: `${index * .1}s`,
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
    }}>
      {/* Info */}
      <div style={{ padding: 28 }}>
        {/* Imagen circular */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <img
            src={group.image}
            alt={group.label}
            style={{
              width: isMobile ? 80 : 120, height: isMobile ? 80 : 120, borderRadius: '50%',
              objectFit: 'cover', objectPosition: 'center',
              border: `2px solid ${T.border}`,
            }}
          />
        </div>
        <div style={{
          fontFamily: T.body, fontSize: 10,
          color: T.accent, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 16,
        }}>{group.label}</div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {group.members.map((m, i) => (
            <div key={m.name} style={{
              fontFamily: T.body, fontSize: 13,
              color: T.muted, padding: '8px 0',
              borderBottom: i < group.members.length - 1 ? `1px solid ${T.border}` : 'none',
              display: 'flex', alignItems: 'baseline', gap: 8,
            }}>
              <span style={{ color: T.text }}>{m.name}</span>
              {m.role && (
                <span style={{ fontSize: 11, color: T.muted + 'aa', flexShrink: 0 }}>
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
  const isMobile = useIsMobile()
  return (
    <section id="equipo" style={{ background: T.surface, color: T.text, padding: isMobile ? '56px 20px' : '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
          marginBottom: 60,
        }}>
          <SectionLabel num="06" label="Equipo" />
          <h2 style={{
            fontFamily: T.display, fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1, letterSpacing: '-.035em',
            textTransform: 'uppercase', margin: 0,
          }}>
            Personas que investigan<br/>
            <span style={{ color: T.muted }}>para personas.</span>
          </h2>
        </div>

        {/* Grupos con imagen */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          {groups.map((g, i) => <GroupCard key={g.key} group={g} index={i} />)}
        </div>

        {/* Colaboraciones internacionales */}
        <div>
          <div style={{
            fontFamily: T.body, fontSize: 10,
            color: T.muted, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 16,
          }}>Colaboraciones internacionales</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {collaborations.map(c => (
              <div key={c.name} style={{
                padding: 24, borderRadius: 16,
                background: T.surface2, border: `1px solid ${T.border}`,
              }}>
                <div style={{
                  fontFamily: T.display, fontWeight: 700,
                  fontSize: 18, color: T.text, marginBottom: 4,
                }}>{c.name}</div>
                <div style={{
                  fontFamily: T.body, fontSize: 11,
                  color: T.accent, letterSpacing: '.1em',
                }}>{c.country.toUpperCase()}</div>
                <div style={{
                  fontFamily: T.body, fontSize: 13,
                  color: T.muted, marginTop: 10,
                }}>{c.area}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
