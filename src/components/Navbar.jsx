import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import marcaSvg from '../assets/marca.svg'

const navLinks = [
  { label: 'Sobre el Centro', href: '/#sobre' },
  { label: 'Novedades', href: '/#novedades' },
  { label: 'Laboratorios', href: '/#laboratorios' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Equipo', href: '/#equipo' },
  { label: 'Contacto', href: '/#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        backgroundColor: scrolled ? 'rgba(20,35,71,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={marcaSvg}
            alt="CIFAD"
            className="h-7 w-auto transition-all duration-300"
            style={{
              filter: scrolled
                ? 'brightness(0) invert(1)'
                : 'brightness(0) saturate(100%)',
            }}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-body transition-colors duration-200 tracking-wide"
                style={{ color: scrolled ? 'rgba(226,227,215,0.75)' : 'rgba(20,35,71,0.65)' }}
                onMouseEnter={(e) => e.target.style.color = scrolled ? '#fff' : '#142347'}
                onMouseLeave={(e) => e.target.style.color = scrolled ? 'rgba(226,227,215,0.75)' : 'rgba(20,35,71,0.65)'}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú"
          style={{ color: scrolled ? '#fff' : '#142347' }}
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#142347]/98 backdrop-blur-md border-t border-white/10">
          <ul className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#e2e3d7]/80 hover:text-white font-body text-base transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
