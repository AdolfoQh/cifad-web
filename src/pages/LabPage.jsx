import { useParams, Link } from 'react-router-dom'
import { labs } from '../data/labs'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function LabPage() {
  const { slug } = useParams()
  const lab = labs.find((l) => l.slug === slug)

  if (!lab) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#142347]">
        <div className="text-center">
          <p className="font-display text-white text-2xl mb-4">Laboratorio no encontrado</p>
          <Link to="/" className="text-[#5e98c2] font-body hover:text-white transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero del lab */}
      <section className="bg-[#142347] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            to="/#laboratorios"
            className="inline-flex items-center gap-2 text-[#b2aba9] hover:text-white font-body text-sm mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Todos los laboratorios
          </Link>

          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px" style={{ backgroundColor: lab.color }} />
            <span className="text-sm font-body uppercase tracking-widest" style={{ color: lab.color }}>
              CIFAD · Laboratorio
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl lg:text-6xl text-white mb-6 leading-tight max-w-3xl">
            {lab.name}
          </h1>
          <p className="font-body text-[#e2e3d7]/70 text-xl max-w-2xl leading-relaxed">
            {lab.shortDescription}
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Descripción */}
            <div className="lg:col-span-2">
              <h2 className="font-display font-semibold text-2xl text-[#142347] mb-6">Sobre el laboratorio</h2>
              <p className="font-body text-[#142347]/70 text-lg leading-relaxed mb-8">
                {lab.description}
              </p>

              {/* Áreas de trabajo */}
              <h3 className="font-display font-semibold text-lg text-[#142347] mb-4">Áreas de trabajo</h3>
              <div className="flex flex-wrap gap-3 mb-12">
                {lab.areas.map((area) => (
                  <span
                    key={area}
                    className="font-body text-sm px-4 py-2 border border-[#e2e3d7] text-[#142347]/70"
                  >
                    {area}
                  </span>
                ))}
              </div>

              {/* Novedades del lab (placeholder) */}
              <h3 className="font-display font-semibold text-lg text-[#142347] mb-4">Novedades del laboratorio</h3>
              <div className="border border-[#e2e3d7] p-8 text-center">
                <p className="font-body text-sm text-[#b2aba9]">
                  Las novedades de este laboratorio se publicarán próximamente.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Responsables */}
              <div className="bg-[#e2e3d7] p-6 mb-6">
                <h3 className="font-display font-semibold text-[#142347] text-sm uppercase tracking-wider mb-4">
                  Responsable{lab.responsible.length > 1 ? 's' : ''}
                </h3>
                {lab.responsible.map((r) => (
                  <p key={r} className="font-body text-[#142347]/70 text-sm py-2 border-b border-[#b2aba9]/30 last:border-0">
                    {r}
                  </p>
                ))}
              </div>

              {/* Colaboraciones */}
              {lab.collaborations.length > 0 && (
                <div className="bg-[#e2e3d7] p-6">
                  <h3 className="font-display font-semibold text-[#142347] text-sm uppercase tracking-wider mb-4">
                    Colaboraciones
                  </h3>
                  {lab.collaborations.map((c) => (
                    <p key={c} className="font-body text-[#142347]/70 text-sm py-2 border-b border-[#b2aba9]/30 last:border-0">
                      {c}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
