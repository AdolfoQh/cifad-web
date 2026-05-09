import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { client } from '../sanity/client'
import { T, SectionLabel } from '../tokens'

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
  const isMobile = useIsMobile()
  const isActive = project.estado === 'en_curso'

  if (isMobile) {
    return (
      <div ref={ref} style={{
        padding: '16px 0', borderBottom: `1px solid ${T.border}`,
        transition: `opacity .7s ease, transform .7s ease`,
        transitionDelay: `${index * .07}s`,
        opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <span style={{
            fontFamily: T.display, fontSize: 15, fontWeight: 700,
            letterSpacing: '-.015em', color: T.text, flex: 1,
          }}>{project.titulo}</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '3px 10px', borderRadius: 999, flexShrink: 0,
            background: isActive ? `${T.accent}20` : T.border,
            border: `1px solid ${isActive ? T.accent : T.border}`,
            fontFamily: T.body, fontSize: 10,
            color: isActive ? T.accent : T.muted,
            textTransform: 'uppercase', letterSpacing: '.1em',
          }}>{isActive ? 'En curso' : 'Finalizado'}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
          <span style={{ fontFamily: T.body, fontSize: 12, color: T.muted }}>
            {labLabels[project.lab] || project.lab}
          </span>
          <span style={{ fontFamily: T.body, fontSize: 11, color: T.muted }}>
            {formatYear(project.fechaInicio, project.fechaFin)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: '80px 1fr 180px 120px 100px',
      alignItems: 'center', gap: 24,
      padding: '20px 0', borderBottom: `1px solid ${T.border}`,
      transition: `opacity .7s ease, transform .7s ease`,
      transitionDelay: `${index * .07}s`,
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
    }}>
      <span style={{
        fontFamily: T.body, fontSize: 11,
        color: T.muted, letterSpacing: '.1em',
      }}>{String(index + 1).padStart(3, '0')}</span>

      <span style={{
        fontFamily: T.display, fontSize: 17, fontWeight: 700,
        letterSpacing: '-.015em', color: T.text,
      }}>{project.titulo}</span>

      <span style={{
        fontFamily: T.body, fontSize: 13,
        color: T.muted,
      }}>{labLabels[project.lab] || project.lab}</span>

      <span style={{
        fontFamily: T.body, fontSize: 11,
        color: T.muted,
      }}>{formatYear(project.fechaInicio, project.fechaFin)}</span>

      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '4px 12px', borderRadius: 999,
        background: isActive ? `${T.accent}20` : T.border,
        border: `1px solid ${isActive ? T.accent : T.border}`,
        fontFamily: T.body, fontSize: 10,
        color: isActive ? T.accent : T.muted,
        textTransform: 'uppercase', letterSpacing: '.1em',
      }}>{isActive ? 'En curso' : 'Finalizado'}</span>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    client.fetch(`*[_type == "proyecto"] | order(fechaInicio desc) {
      _id, titulo, lab, estado, fechaInicio, fechaFin
    }`).then(data => {
      setProyectos(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <section id="proyectos" style={{ background: T.bg, color: T.text, padding: isMobile ? '56px 20px' : '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
          marginBottom: 60,
        }}>
          <SectionLabel num="03" label="Proyectos" />
          <h2 style={{
            fontFamily: T.display, fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1,
            letterSpacing: '-.035em', textTransform: 'uppercase', margin: 0,
          }}>
            Investigación<br/>
            <span style={{ color: T.muted }}>en curso.</span>
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60,
            fontFamily: T.body, fontSize: 11,
            color: T.muted, letterSpacing: '.14em' }}>
            Cargando...
          </div>
        ) : proyectos.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 60,
            border: `1px solid ${T.border}`, borderRadius: 16,
            fontFamily: T.body, fontSize: 11,
            color: T.muted, letterSpacing: '.14em',
          }}>
            [ Los proyectos se publicarán próximamente ]
          </div>
        ) : (
          <>
            {/* Table header — solo desktop */}
            {!isMobile && (
              <div style={{
                display: 'grid', gridTemplateColumns: '80px 1fr 180px 120px 100px',
                gap: 24, padding: '0 0 16px',
                borderBottom: `1px solid ${T.border}`,
              }}>
                {['#', 'Proyecto', 'Laboratorio', 'Período', 'Estado'].map(h => (
                  <span key={h} style={{
                    fontFamily: T.body, fontSize: 10,
                    color: T.muted, textTransform: 'uppercase', letterSpacing: '.14em',
                  }}>{h}</span>
                ))}
              </div>
            )}
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
