import { useInView } from '../hooks/useInView'

const placeholderNews = [
  {
    id: 1,
    title: 'Novedades del centro próximamente',
    excerpt: 'Esta sección se actualizará con las últimas noticias, eventos y actividades del CIFAD y sus laboratorios.',
    date: '2025-11-01',
    lab: 'General',
  },
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function NewsCard({ item, index }) {
  const [ref, inView] = useInView()
  return (
    <article
      ref={ref}
      className="group border border-[#e2e3d7] hover:border-[#2a7b92] transition-all duration-400 flex flex-col"
      style={{
        transition: `opacity 0.7s ease, transform 0.7s ease, border-color 0.3s`,
        transitionDelay: `${index * 0.1}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
      }}
    >
      <div className="bg-[#e2e3d7] aspect-video flex items-center justify-center">
        <span className="text-[#b2aba9] text-xs font-body">Imagen próximamente</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-body uppercase tracking-widest text-[#2a7b92] mb-3">{item.lab}</span>
        <h3 className="font-display font-semibold text-lg text-[#142347] group-hover:text-[#2a7b92] transition-colors duration-300 mb-2 leading-snug flex-1">
          {item.title}
        </h3>
        <p className="font-body text-sm text-[#142347]/55 leading-relaxed mb-4">{item.excerpt}</p>
        <time className="font-body text-xs text-[#b2aba9]">{formatDate(item.date)}</time>
      </div>
    </article>
  )
}

export default function News() {
  const [ref, inView] = useInView()

  return (
    <section id="novedades" className="bg-[#e2e3d7] py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14"
          style={{
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#e47539]" />
              <span className="text-[#e47539] text-xs font-body uppercase tracking-widest">Actualidad</span>
            </div>
            <h2
              className="font-display font-black text-[#142347] leading-[0.95]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Novedades
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-16 flex items-end justify-end">
            <a href="#" className="text-sm font-body text-[#2a7b92] hover:text-[#142347] transition-colors inline-flex items-center gap-2">
              Ver todas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {placeholderNews.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
