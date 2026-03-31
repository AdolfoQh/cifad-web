import marcaSvg from '../assets/marca.svg'

export default function Footer() {
  return (
    <footer className="bg-[#142347] text-[#b2aba9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Identidad */}
          <div>
            <img
              src={marcaSvg}
              alt="CIFAD"
              className="h-12 w-auto mb-4"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-sm leading-relaxed text-[#b2aba9]/70 mt-2">
              Centro de Investigación de la Facultad de Artes y Diseño<br />
              en Tecnologías Emergentes
            </p>
            <p className="text-sm mt-4 text-[#5e98c2]">FAD — Universidad Nacional de Cuyo</p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4 text-xs uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Sobre el Centro', href: '/#sobre' },
                { label: 'Novedades', href: '/#novedades' },
                { label: 'Proyectos', href: '/#proyectos' },
                { label: 'Líneas de investigación', href: '/#lineas' },
                { label: 'Laboratorios', href: '/#laboratorios' },
                { label: 'Equipo', href: '/#equipo' },
                { label: 'Contacto', href: '/#contacto' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4 text-xs uppercase tracking-wider">Contacto</h4>
            <p className="text-sm leading-relaxed">
              Facultad de Artes y Diseño<br />
              Universidad Nacional de Cuyo<br />
              Mendoza, Argentina
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#b2aba9]/40">
          <p>© {new Date().getFullYear()} CIFAD — Todos los derechos reservados.</p>
          <p>FAD · UNCuyo</p>
        </div>
      </div>
    </footer>
  )
}
