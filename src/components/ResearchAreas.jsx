import { useInView } from '../hooks/useInView'
import { researchAreas } from '../data/researchAreas'

const icons = {
  users: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  sitemap: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  cursor: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
    </svg>
  ),
  eye: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
}

function AreaCard({ area, index }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className="group"
      style={{
        transition: `opacity 0.7s ease, transform 0.7s ease`,
        transitionDelay: `${index * 0.1}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
      }}
    >
    <div className="border-t border-white/10 pt-8 pb-8 px-4 hover:bg-white/5 transition-colors duration-300 h-full">
      <div className="text-[#5e98c2] mb-5 group-hover:text-[#e47539] transition-colors duration-300">
        {icons[area.icon]}
      </div>
      <h3 className="font-display font-bold text-white text-xl mb-3 leading-snug">
        {area.name}
      </h3>
      <p className="font-body text-[#e2e3d7]/45 text-sm leading-relaxed group-hover:text-[#e2e3d7]/65 transition-colors duration-300">
        {area.description}
      </p>
    </div>
    </div>
  )
}

export default function ResearchAreas() {
  const [ref, inView] = useInView()

  return (
    <section id="lineas" className="bg-[#142347] py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20"
          style={{
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#e47539]" />
              <span className="text-[#e47539] text-xs font-body uppercase tracking-widest">Investigación</span>
            </div>
            <h2
              className="font-display font-black text-white leading-[0.95]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Líneas de<br />investigación
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-16 flex items-end">
            <p className="font-body text-[#e2e3d7]/45 text-sm leading-relaxed">
              Áreas de estudio con foco en UX aplicada a tecnologías emergentes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {researchAreas.map((area, i) => (
            <AreaCard key={area.id} area={area} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
