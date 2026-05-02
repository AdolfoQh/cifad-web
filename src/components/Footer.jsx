import marcaSvg from '../assets/marca.svg'

const B = {
  bg: '#0a0e14', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d',
}

export default function Footer() {
  return (
    <footer style={{
      background: B.bg, borderTop: `1px solid ${B.border}`,
      padding: '32px 32px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src={marcaSvg}
            alt="CIFAD"
            style={{ height: 28, width: 'auto', filter: 'brightness(0) invert(.5)' }}
          />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: B.muted, letterSpacing: '.08em',
          }}>
            FAD · Universidad Nacional de Cuyo
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['#centro', '#laboratorios', '#investigación', '#equipo', '#contacto'].map((href, i) => {
            const labels = ['Centro', 'Labs', 'Investigación', 'Equipo', 'Contacto']
            return (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  color: B.muted, textDecoration: 'none',
                  transition: 'color .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = B.text}
                onMouseLeave={e => e.currentTarget.style.color = B.muted}
              >{labels[i]}</a>
            )
          })}
        </div>

        <p style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
          color: B.muted, letterSpacing: '.06em',
        }}>
          © {new Date().getFullYear()} CIFAD
        </p>
      </div>
    </footer>
  )
}
