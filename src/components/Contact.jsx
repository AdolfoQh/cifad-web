import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useIsMobile'

const B = {
  bg: '#0a0e14', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff', glow: '#5e98c2',
}

export default function Contact() {
  const [ref, inView] = useInView()
  const [focused, setFocused] = useState(null)
  const isMobile = useIsMobile()

  const inputStyle = (name) => ({
    width: '100%', background: B.surface,
    border: `1px solid ${focused === name ? B.accent : B.border}`,
    borderRadius: 10, padding: '14px 16px',
    fontFamily: 'Inter, sans-serif', fontSize: 14,
    color: B.text, outline: 'none',
    transition: 'border-color .3s',
  })

  return (
    <section id="contacto" style={{ background: B.bg, color: B.text, padding: isMobile ? '80px 20px' : '140px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <div ref={ref} style={{
          transition: 'opacity .8s ease, transform .8s ease',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
          marginBottom: 80,
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.accent, textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: 14,
          }}>// 07 Contacto</div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
            fontSize: 'clamp(60px, 10vw, 160px)', lineHeight: .95,
            letterSpacing: '-.04em', margin: 0,
          }}>
            <span style={{
              background: `linear-gradient(95deg, ${B.accent} 0%, ${B.accent2} 50%, ${B.glow} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Hablemos.</span>
          </h2>
        </div>

        {/* Content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>
          {/* Left: info */}
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.6,
              color: B.muted, marginBottom: 48,
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
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    color: B.muted, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 4,
                  }}>{item.label}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: B.text }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <form style={{
            background: B.surface, border: `1px solid ${B.border}`,
            borderRadius: 24, padding: isMobile ? 24 : 40,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{
                  display: 'block', fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10, color: B.muted, textTransform: 'uppercase',
                  letterSpacing: '.12em', marginBottom: 8,
                }}>Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  style={{ ...inputStyle('name'), '::placeholder': { color: B.muted } }}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label style={{
                  display: 'block', fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10, color: B.muted, textTransform: 'uppercase',
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
                display: 'block', fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, color: B.muted, textTransform: 'uppercase',
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
                display: 'block', fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, color: B.muted, textTransform: 'uppercase',
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
                background: B.accent, color: B.bg,
                border: 'none', borderRadius: 10,
                padding: '14px 32px',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15,
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
