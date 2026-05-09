import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'
import { T, SectionLabel } from '../tokens'

export default function Contact() {
  const [ref, inView] = useInView()
  const [focused, setFocused] = useState(null)
  const isMobile = useIsMobile()

  const inputStyle = (name) => ({
    width: '100%', background: T.surface,
    border: `1px solid ${focused === name ? T.accent : T.border}`,
    borderRadius: 10, padding: '14px 16px',
    fontFamily: T.body, fontSize: 14,
    color: T.text, outline: 'none',
    transition: 'border-color .3s',
    boxSizing: 'border-box',
  })

  return (
    <section id="contacto" style={{ background: T.bg, color: T.text, padding: isMobile ? '56px 20px' : '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <div ref={ref} style={{
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
          marginBottom: 80,
        }}>
          <SectionLabel num="07" label="Contacto" />
          <h2 style={{
            fontFamily: T.display, fontWeight: 700,
            fontSize: 'clamp(60px, 10vw, 160px)', lineHeight: .95,
            letterSpacing: '-.04em', textTransform: 'uppercase', margin: 0,
            color: T.accent,
          }}>
            Hablemos.
          </h2>
        </div>

        {/* Content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>
          {/* Left: info */}
          <div>
            <p style={{
              fontFamily: T.body, fontSize: 18, lineHeight: 1.6,
              color: T.muted, marginBottom: 48,
            }}>
              Investigación aplicada, consultoría en UX, formación o simplemente una propuesta de colaboración.
              Estamos abiertos.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'Institución', value: 'Facultad de Artes y Diseño · UNCuyo' },
                { label: 'Ubicación', value: 'Mendoza, Argentina' },
                { label: 'Email', value: 'cifad@fad.uncuyo.edu.ar' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{
                    fontFamily: T.body, fontSize: 10,
                    color: T.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 4,
                  }}>{item.label}</div>
                  <div style={{ fontFamily: T.body, fontSize: 15, color: T.text }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <form style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 24, padding: isMobile ? 24 : 40,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{
                  display: 'block', fontFamily: T.body,
                  fontSize: 10, color: T.muted, textTransform: 'uppercase',
                  letterSpacing: '.12em', marginBottom: 8,
                }}>Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  style={inputStyle('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label style={{
                  display: 'block', fontFamily: T.body,
                  fontSize: 10, color: T.muted, textTransform: 'uppercase',
                  letterSpacing: '.12em', marginBottom: 8,
                }}>Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  style={inputStyle('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block', fontFamily: T.body,
                fontSize: 10, color: T.muted, textTransform: 'uppercase',
                letterSpacing: '.12em', marginBottom: 8,
              }}>Asunto</label>
              <input
                type="text"
                placeholder="¿De qué se trata?"
                style={inputStyle('subject')}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{
                display: 'block', fontFamily: T.body,
                fontSize: 10, color: T.muted, textTransform: 'uppercase',
                letterSpacing: '.12em', marginBottom: 8,
              }}>Mensaje</label>
              <textarea
                rows={5}
                placeholder="Contanos tu idea o consulta..."
                style={{ ...inputStyle('message'), resize: 'none' }}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <button
              type="submit"
              style={{
                background: T.accent, color: '#04041e',
                border: 'none', borderRadius: 2,
                padding: '14px 28px',
                fontFamily: T.display, fontWeight: 700, fontSize: 13,
                letterSpacing: '.06em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'opacity .3s',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Enviar mensaje
              <svg width="14" height="14" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
