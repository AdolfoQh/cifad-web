import { useInView } from '../hooks/useInView'

const B = {
  bg: '#0a0e14', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff',
}

const placeholderProjects = [
  {
    id: 1,
    num: '001',
    title: 'Evaluación de interfaces con IA generativa',
    lab: 'Lab UX',
    year: '2025–',
    status: 'En curso',
  },
  {
    id: 2,
    num: '002',
    title: 'Accesibilidad en plataformas educativas',
    lab: 'Lab Accesibilidad',
    year: '2025–',
    status: 'En curso',
  },
  {
    id: 3,
    num: '003',
    title: 'Experiencias de realidad aumentada en museos',
    lab: 'Lab XR',
    year: '2025–',
    status: 'En curso',
  },
  {
    id: 4,
    num: '004',
    title: 'Métricas de usabilidad en apps de salud',
    lab: 'Lab UX',
    year: '2024–2025',
    status: 'Finalizado',
  },
]

function ProjectRow({ project, index }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: '80px 1fr 180px 120px 100px',
      alignItems: 'center', gap: 24,
      padding: '20px 0', borderBottom: `1px solid ${B.border}`,
      transition: `opacity .7s ease, transform .7s ease`,
      transitionDelay: `${index * .07}s`,
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
    }}>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
        color: B.muted, letterSpacing: '.1em',
      }}>{project.num}</span>

      <span style={{
        fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 500,
        letterSpacing: '-.015em', color: B.text,
      }}>{project.title}</span>

      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13,
        color: B.muted,
      }}>{project.lab}</span>

      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
        color: B.muted,
      }}>{project.year}</span>

      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '4px 12px', borderRadius: 999,
        background: project.status === 'En curso' ? `${B.accent}20` : `${B.border}`,
        border: `1px solid ${project.status === 'En curso' ? B.accent : B.border}`,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        color: project.status === 'En curso' ? B.accent : B.muted,
        textTransform: 'uppercase', letterSpacing: '.1em',
      }}>{project.status}</span>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()
  return (
    <section id="proyectos" style={{ background: B.bg, color: B.text, padding: '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
          marginBottom: 60,
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.accent, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 14,
          }}>// Proyectos</div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1,
            letterSpacing: '-.035em', margin: 0,
          }}>
            Investigación<br/>
            <span style={{ color: B.muted }}>en curso.</span>
          </h2>
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '80px 1fr 180px 120px 100px',
          gap: 24, padding: '0 0 16px',
          borderBottom: `1px solid ${B.border}`,
        }}>
          {['#', 'Proyecto', 'Laboratorio', 'Período', 'Estado'].map(h => (
            <span key={h} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: B.muted, textTransform: 'uppercase', letterSpacing: '.14em',
            }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        <div>
          {placeholderProjects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
