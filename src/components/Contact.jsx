const audiences = [
  {
    title: 'Estudiantes FAD',
    description: 'Participá en proyectos de investigación, talleres y actividades de los laboratorios.',
    cta: 'Quiero participar',
    icon: '🎓',
  },
  {
    title: 'Docentes e investigadores',
    description: 'Sumá tu línea de investigación o colaborá con los laboratorios existentes.',
    cta: 'Quiero colaborar',
    icon: '🔬',
  },
  {
    title: 'Empresas e instituciones',
    description: 'Desarrollamos proyectos aplicados, transferencia tecnológica y formación.',
    cta: 'Hablemos',
    icon: '🤝',
  },
]

export default function Contact() {
  return (
    <section id="contacto" className="bg-[#e2e3d7] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-8 h-px bg-[#e47539]" />
          <span className="text-[#e47539] text-sm font-body uppercase tracking-widest">Sumarse</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Texto */}
          <div className="lg:w-1/2">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#142347] leading-tight mb-6">
              ¿Querés ser parte del CIFAD?
            </h2>
            <p className="font-body text-[#142347]/70 text-lg leading-relaxed">
              El centro está abierto a la participación de estudiantes, docentes,
              graduados, empresas e instituciones interesadas en la investigación
              y la innovación en tecnologías emergentes.
            </p>
          </div>

          {/* Cards de audiencia */}
          <div className="lg:w-1/2 space-y-4">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="bg-white p-6 flex items-start gap-4 group hover:shadow-md transition-shadow duration-200"
              >
                <span className="text-2xl">{audience.icon}</span>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-[#142347] mb-1">{audience.title}</h3>
                  <p className="font-body text-sm text-[#142347]/60">{audience.description}</p>
                </div>
                <button className="text-sm font-body text-[#2a7b92] hover:text-[#142347] transition-colors shrink-0">
                  {audience.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario / Contacto directo */}
        <div className="mt-20 bg-[#142347] p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display font-bold text-3xl text-white mb-4">Contacto directo</h3>
            <p className="font-body text-[#e2e3d7]/70 text-sm leading-relaxed">
              Escribinos para consultas, propuestas de colaboración o información
              sobre los laboratorios y actividades del centro.
            </p>
            <div className="mt-8 space-y-3 text-sm font-body text-[#e2e3d7]/70">
              <p>Facultad de Artes y Diseño · UNCuyo</p>
              <p>Mendoza, Argentina</p>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm px-4 py-3 focus:outline-none focus:border-[#5e98c2] transition-colors w-full"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm px-4 py-3 focus:outline-none focus:border-[#5e98c2] transition-colors w-full"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Tu mensaje..."
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm px-4 py-3 focus:outline-none focus:border-[#5e98c2] transition-colors w-full resize-none"
            />
            <button
              type="submit"
              className="bg-[#e47539] hover:bg-[#e47539]/90 text-white font-body font-medium px-8 py-3 transition-colors duration-200"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
