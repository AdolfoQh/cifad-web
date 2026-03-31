import { useInView } from '../hooks/useInView'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.8s ease, transform 0.8s ease`,
        transitionDelay: `${delay}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
      }}
    >
      {children}
    </div>
  )
}

export default function About() {
  return (
    <section id="sobre" className="bg-white py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Etiqueta */}
        <FadeIn>
          <div className="inline-flex items-center gap-3 mb-12">
            <span className="w-10 h-px bg-[#e47539]" />
            <span className="text-[#e47539] text-xs font-body uppercase tracking-widest">Quiénes somos</span>
          </div>
        </FadeIn>

        {/* Título asimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 mb-24">
          <FadeIn delay={0.1} className="lg:col-span-7 lg:pr-16">
            <h2
              className="font-display font-black text-[#142347] leading-[0.95]"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
            >
              La persona en el<br />
              <em style={{ fontStyle: 'italic', color: '#2a7b92' }}>centro</em> de cada<br />
              tecnología
            </h2>
          </FadeIn>

          <FadeIn delay={0.25} className="lg:col-span-5 lg:pt-16 flex flex-col justify-end">
            <p className="font-body text-[#142347]/60 text-lg leading-relaxed mb-6">
              CIFAD es el Centro de Investigación de la Facultad de Artes y Diseño
              especializado en tecnologías emergentes. Colocamos la{' '}
              <strong className="text-[#2a7b92] font-medium">experiencia de usuario (UX)</strong>{' '}
              en el centro de la implementación tecnológica.
            </p>
            <p className="font-body text-[#142347]/60 text-lg leading-relaxed">
              Investigamos, formamos y colaboramos con la industria para garantizar
              que las innovaciones mejoren la vida de las personas con criterio ético y social.
            </p>
          </FadeIn>
        </div>

        {/* Stats */}
        <FadeIn delay={0.15}>
          <div className="border-t border-[#e2e3d7] pt-12 grid grid-cols-3 gap-8 mb-24">
            {[
              { value: '6', label: 'Laboratorios' },
              { value: '20+', label: 'Investigadores' },
              { value: '3', label: 'Colaboraciones\ninternacionales' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-black text-5xl text-[#e47539] leading-none">{stat.value}</div>
                <div className="font-body text-sm text-[#142347]/50 mt-2 whitespace-pre-line leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FadeIn delay={0.1}>
            <div className="bg-[#142347] p-8 lg:p-10 h-full">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#e47539]" />
                <span className="text-[#e47539] text-xs font-body uppercase tracking-widest">Misión</span>
              </div>
              <p className="font-body text-[#e2e3d7]/75 leading-relaxed">
                Desarrollar un marco integral que coloque la Experiencia de Usuario (UX)
                en el centro de la implementación de tecnologías emergentes, para comprender,
                formar y diseñar soluciones tecnológicas innovadoras con impacto real y criterio ético.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-[#e2e3d7] p-8 lg:p-10 h-full">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#e47539]" />
                <span className="text-[#e47539] text-xs font-body uppercase tracking-widest">Visión</span>
              </div>
              <p className="font-body text-[#142347]/70 leading-relaxed">
                Ser un referente en la investigación y formación en UX y tecnologías emergentes
                en América Latina, promoviendo la colaboración interdisciplinaria entre la academia,
                la industria y la sociedad.
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
