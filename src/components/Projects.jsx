import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { client } from '../sanity/client'

const B = {
  bg: '#0a0e14', surface: '#161c26', border: '#222a36',
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

function formatYear(start, end) {
  const s = start ? new Date(start).getFullYear() : '?'
  const e = end ? new Date(end).getFullYear() : ''
  return e ? `${s}–${e}` : `${s}–`
}

function ProjectRow({ project, index }) {
  const [ref, inView] = useInView()
  const isActive = project.estado === 'en_curso'
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
      }}>{String(index + 1).padStart(3, '0')}</span>

      <span style={{
        fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 500,
        letterSpacing: '-.015em', color: B.text,
      }}>{project.titulo}</span>

      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13,
        color: B.muted,
      }}>{labLabels[project.lab] || project.lab}</span>

      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
        color: B.muted,
      }}>{formatYear(project.fechaInicio, project.fechaFin)}</span>

      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '4px 12px', borderRadius: 999,
        background: isActive ? `${B.accent}20` : B.border,
        border: `1px solid ${isActive ? B.accent : B.border}`,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        color: isActive ? B.accent : B.muted,
        textTransform: 'uppercase', letterSpacing: '.1em',
      }}>{isActive ? 'En curso' : 'Finalizado'}</span>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "proyecto"] | order(fechaInicio desc) {
      _id, titulo, lab, estado, fechaInicio, fechaFin
    }`).then(data => {
      setProyectos(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

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
          }}>// 03 Proyectos</div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1,
            letterSpacing: '-.035em', margin: 0,
          }}>
            Investigación<br/>
            <span style={{ color: B.muted }}>en curso.</span>
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.muted, letterSpacing: '.14em' }}>
            Cargando...
          </div>
        ) : proyectos.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 60,
            border: `1px solid ${B.border}`, borderRadius: 16,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.muted, letterSpacing: '.14em',
          }}>
            [ Los proyectos se publicarán próximamente ]
          </div>
        ) : (
          <>
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
            <div>
              {proyectos.map((p, i) => (
                <ProjectRow key={p._id} project={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
