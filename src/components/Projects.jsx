// Placeholder hasta tener datos reales
const placeholderProjects = [
  {
    id: 1,
    title: 'Proyectos en curso',
    description: 'Los proyectos de investigación del CIFAD se publicarán en esta sección próximamente.',
    status: 'En desarrollo',
    lab: 'General',
    year: 2025,
  },
]

export default function Projects() {
  return (
    <section id="proyectos" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-8 h-px bg-[#e47539]" />
          <span className="text-[#e47539] text-sm font-body uppercase tracking-widest">Investigación aplicada</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#142347] leading-tight">
            Proyectos
          </h2>
          <p className="font-body text-[#142347]/60 max-w-sm text-sm leading-relaxed">
            Investigaciones en curso y concluidas de nuestros laboratorios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderProjects.map((project) => (
            <div
              key={project.id}
              className="border border-[#e2e3d7] p-8 hover:border-[#2a7b92] transition-colors duration-200"
            >
              {/* Status */}
              <span className="inline-block text-xs font-body uppercase tracking-widest text-[#2a7b92] mb-4">
                {project.status}
              </span>

              <h3 className="font-display font-semibold text-xl text-[#142347] mb-3 leading-snug">
                {project.title}
              </h3>
              <p className="font-body text-sm text-[#142347]/60 leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex items-center justify-between text-xs font-body text-[#b2aba9]">
                <span>{project.lab}</span>
                <span>{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
