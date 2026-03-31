import { useEffect, useState } from 'react'
import marcaSvg from '../assets/marca.svg'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen bg-[#142347] flex flex-col justify-between overflow-hidden">

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-8 pt-28 pb-16">

        {/* Logo — versión blanca para fondo oscuro */}
        <div
          className="mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <img
            src={marcaSvg}
            alt="CIFAD — Centro de Investigación en Tecnologías Emergentes"
            className="h-16 lg:h-20 w-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Título */}
        <div className="max-w-5xl">
          <h1
            className="font-display font-black leading-[0.9] mb-10"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              color: '#e2e3d7',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
              transitionDelay: '0.15s',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            Investigación<br />
            centrada en<br />
            <em style={{ fontStyle: 'italic', color: '#e47539' }}>las personas.</em>
          </h1>

          {/* Bajada — desplazada a la derecha */}
          <div
            className="ml-auto max-w-lg"
            style={{
              transition: 'opacity 0.9s ease, transform 0.9s ease',
              transitionDelay: '0.3s',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            <p className="font-body text-lg text-[#e2e3d7]/60 leading-relaxed mb-8">
              Desarrollamos soluciones en UX y tecnologías emergentes desde
              la Facultad de Artes y Diseño de la UNCuyo.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#laboratorios"
                className="inline-flex items-center gap-2 bg-[#e47539] hover:bg-[#e47539]/90 text-white font-body font-medium px-8 py-3.5 transition-colors duration-300"
              >
                Laboratorios
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#sobre"
                className="inline-flex items-center gap-2 border border-[#e2e3d7]/30 hover:border-[#e2e3d7]/60 text-[#e2e3d7] font-body font-medium px-8 py-3.5 transition-colors duration-300"
              >
                Sobre el Centro
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div
        className="border-t border-white/10 max-w-7xl mx-auto w-full px-6 lg:px-8 py-5 flex justify-between items-center"
        style={{
          transition: 'opacity 0.9s ease',
          transitionDelay: '0.5s',
          opacity: visible ? 1 : 0,
        }}
      >
        <span className="font-body text-xs text-[#e2e3d7]/30 uppercase tracking-widest">FAD · UNCuyo · Mendoza</span>
        <div className="flex items-center gap-2 text-[#e2e3d7]/30">
          <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
