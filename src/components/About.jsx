import { useInView } from '../hooks/useInView'

const B = {
  bg: '#0a0e14', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d',
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      transition: `opacity .8s ease, transform .8s ease`,
      transitionDelay: `${delay}s`,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      ...style,
    }}>{children}</div>
  )
}

export default function About() {
  return (
    <section id="centro" style={{ background: B.bg, color: B.text, padding: '140px 32px', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
          <FadeIn>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: B.accent, textTransform: 'uppercase', letterSpacing: '.18em',
            }}>// 02 Sobre</div>
          </FadeIn>
          <FadeIn delay={.1}>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
              fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1, letterSpacing: '-.03em',
              margin: 0, marginBottom: 24,
            }}>
              Investigación con<br/>
              <span style={{ color: B.muted }}>impacto medible.</span>
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.6,
              color: B.muted, maxWidth: 720, margin: 0,
            }}>
              CiFAD es el Centro de Investigación de la Facultad de Artes y Diseño de la UNCuyo.
              Articulamos academia, industria y sociedad para que las decisiones tecnológicas se
              tomen con evidencia, no con intuición.
            </p>

            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { t: 'Misión', d: 'Desarrollar un marco integral que coloque la UX en el centro de la implementación tecnológica con criterio ético y social.' },
                { t: 'Visión', d: 'Ser referente en investigación y formación en UX y tecnologías emergentes en América Latina.' },
              ].map((c, i) => (
                <FadeIn key={c.t} delay={.2 + i * .1}>
                  <div style={{
                    padding: 28, borderRadius: 16,
                    background: B.surface, border: `1px solid ${B.border}`,
                    height: '100%',
                  }}>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                      color: B.accent, letterSpacing: '.15em',
                      textTransform: 'uppercase', marginBottom: 12,
                    }}>{c.t}</div>
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: 15,
                      lineHeight: 1.6, color: B.text, margin: 0,
                    }}>{c.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
