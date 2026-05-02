import { useState } from 'react'
import { Link } from 'react-router-dom'
import { labs } from '../data/labs'
import { useInView } from '../hooks/useInView'

const B = {
  bg: '#0a0e14', bg2: '#10151d', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d',
}

function LabCard({ lab, index }) {
  const [hover, setHover] = useState(false)
  const [ref, inView] = useInView()

  return (
    <Link
      ref={ref}
      to={`/laboratorio/${lab.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', textDecoration: 'none',
        background: B.surface, border: `1px solid ${B.border}`,
        borderRadius: 20, padding: 28, cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        transition: 'opacity .7s ease, transform .7s ease, box-shadow .4s',
        transitionDelay: `${index * 0.06}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? (hover ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(40px)',
        boxShadow: hover ? `0 20px 60px rgba(0,0,0,.4)` : 'none',
        minHeight: 320,
        color: B.text,
      }}
    >
      {/* Color glow */}
      <div style={{
        position: 'absolute', top: -50, right: -50, width: 200, height: 200,
        borderRadius: '50%', background: lab.color,
        opacity: hover ? .3 : .12, filter: 'blur(60px)',
        transition: 'opacity .4s', pointerEvents: 'none',
      }}/>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.muted, letterSpacing: '.12em',
          }}>LAB / {lab.num}</span>
          <span style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: hover ? B.text : 'transparent',
            border: `1px solid ${hover ? B.text : B.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .3s', color: hover ? B.bg : B.text,
            fontSize: 16,
          }}>↗</span>
        </div>

        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
          fontSize: 24, lineHeight: 1.15, letterSpacing: '-.02em',
          color: B.text, margin: 0, marginBottom: 12, flex: 1,
        }}>{lab.name}</h3>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14,
          lineHeight: 1.6, color: B.muted, margin: 0,
        }}>{lab.shortDescription}</p>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${B.border}` }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            color: B.muted, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 4,
          }}>responsable</div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13, color: B.text,
          }}>{lab.responsible[0]}</div>
        </div>
      </div>
    </Link>
  )
}

export default function Labs() {
  const [ref, inView] = useInView()
  return (
    <section id="laboratorios" style={{ background: B.bg2, color: B.text, padding: '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={ref} style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 24,
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
        }}>
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: B.accent, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 14,
            }}>// 03 Laboratorios</div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
              fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1, letterSpacing: '-.035em', margin: 0,
            }}>
              Seis laboratorios.<br/>
              <span style={{ color: B.muted }}>Una infraestructura compartida.</span>
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {labs.map((lab, i) => <LabCard key={lab.id} lab={lab} index={i} />)}
        </div>
      </div>
    </section>
  )
}
