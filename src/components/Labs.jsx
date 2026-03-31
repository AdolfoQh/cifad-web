import { Link } from 'react-router-dom'
import { labs } from '../data/labs'
import { useInView } from '../hooks/useInView'

function LabCard({ lab, index }) {
  const [ref, inView] = useInView()
  return (
    <Link
      ref={ref}
      to={`/laboratorio/${lab.slug}`}
      className="group bg-white border border-[#e2e3d7] hover:border-[#2a7b92] hover:shadow-xl transition-all duration-400 flex flex-col overflow-hidden"
      style={{
        transition: `opacity 0.7s ease, transform 0.7s ease, border-color 0.3s, box-shadow 0.3s`,
        transitionDelay: `${index * 0.08}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      <div className="h-1 w-full bg-[#2a7b92] transition-all duration-300 group-hover:h-1.5" />
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-display font-bold text-xl text-[#142347] group-hover:text-[#2a7b92] transition-colors duration-300 mb-3 leading-snug">
          {lab.name}
        </h3>
        <p className="font-body text-sm text-[#142347]/55 leading-relaxed flex-1 mb-6">
          {lab.shortDescription}
        </p>
        <div className="border-t border-[#e2e3d7] pt-4 mb-4">
          <p className="text-xs font-body text-[#b2aba9] uppercase tracking-wider mb-1">Responsable</p>
          {lab.responsible.map((r) => (
            <p key={r} className="text-sm font-body text-[#142347]/60">{r}</p>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[#2a7b92] text-sm font-body group-hover:gap-3 transition-all duration-300">
          <span>Ver laboratorio</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default function Labs() {
  const [titleRef, titleInView] = useInView()

  return (
    <section id="laboratorios" className="bg-[#e2e3d7] py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header asimétrico */}
        <div
          ref={titleRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16"
          style={{
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#e47539]" />
              <span className="text-[#e47539] text-xs font-body uppercase tracking-widest">Laboratorios</span>
            </div>
            <h2
              className="font-display font-black text-[#142347] leading-[0.95]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Espacios de investigación<br />y experimentación
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-16 flex items-end">
            <p className="font-body text-[#142347]/55 text-sm leading-relaxed">
              Cada laboratorio tiene su propio espacio, responsables
              y línea de investigación. Hacé clic para explorar.
            </p>
          </div>
        </div>

        {/* Grid de labs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {labs.map((lab, i) => (
            <LabCard key={lab.id} lab={lab} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
