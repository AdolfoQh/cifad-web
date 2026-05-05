import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import marcaSvg from '../assets/marca-navbar.svg'

const B = {
  bg: '#0a0e14', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3', accent: '#ff7a3d', accent2: '#7c9eff',
}

const navLinks = [
  { label: 'Centro',        id: 'centro' },
  { label: 'Laboratorios',  id: 'laboratorios' },
  { label: 'Investigación', id: 'investigación' },
  { label: 'Servicios',     id: 'servicios' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, transition: 'all .4s ease',
      background: scrolled ? 'rgba(10,14,20,.85)' : 'rgba(22,28,38,.5)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${B.border}`,
      borderRadius: 999, padding: '8px 8px 8px 20px',
      display: 'flex', alignItems: 'center', gap: 20,
      whiteSpace: 'nowrap',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img
          src={marcaSvg}
          alt="CIFAD"
          style={{ height: 28, width: 'auto', filter: 'brightness(0) invert(1)' }}
        />
      </Link>

      {/* Desktop nav */}
      <nav style={{ display: 'flex', gap: 2 }} className="hidden lg:flex">
        {navLinks.map(({ label, id }) => (
          <a key={id}
            href={isHome ? `#${id}` : `/#${id}`}
            style={{
              color: B.muted, textDecoration: 'none', fontSize: 13,
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              padding: '6px 12px', borderRadius: 999, transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = B.surface; e.currentTarget.style.color = B.text }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = B.muted }}
          >{label}</a>
        ))}
      </nav>

      {/* CTA */}
      <a href={isHome ? '#contacto' : '/#contacto'} style={{
        background: B.text, color: B.bg, border: 'none',
        padding: '8px 16px', cursor: 'pointer', fontSize: 13,
        fontFamily: 'Inter, sans-serif', fontWeight: 500,
        borderRadius: 999, textDecoration: 'none', flexShrink: 0,
      }} className="hidden lg:block">Contacto</a>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: B.text }}
        aria-label="Menú"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen
            ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
          }
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
          background: 'rgba(22,28,38,.98)', backdropFilter: 'blur(20px)',
          border: `1px solid ${B.border}`, borderRadius: 16, padding: 16,
          display: 'flex', flexDirection: 'column', gap: 4,
        }} className="lg:hidden">
          {navLinks.map(({ label, id }) => (
            <a key={id} href={isHome ? `#${id}` : `/#${id}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: B.muted, textDecoration: 'none', fontSize: 14,
                fontFamily: 'Inter, sans-serif', padding: '10px 12px',
                borderRadius: 8,
              }}
            >{label}</a>
          ))}
          <a href={isHome ? '#contacto' : '/#contacto'} onClick={() => setMenuOpen(false)} style={{
            background: B.text, color: B.bg, textDecoration: 'none',
            padding: '10px 12px', borderRadius: 8, textAlign: 'center',
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, marginTop: 4,
          }}>Contacto</a>
        </div>
      )}
    </header>
  )
}
