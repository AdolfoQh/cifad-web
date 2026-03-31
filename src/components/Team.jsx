import { team, researchers, collaborations } from '../data/team'

function Avatar({ name, photo }) {
  const initials = name
    .split(' ')
    .filter((w) => w.length > 3)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

  if (photo) {
    return <img src={photo} alt={name} className="w-16 h-16 rounded-full object-cover" />
  }

  return (
    <div className="w-16 h-16 rounded-full bg-[#2a7b92]/20 flex items-center justify-center">
      <span className="font-display font-semibold text-[#2a7b92] text-lg">{initials}</span>
    </div>
  )
}

export default function Team() {
  const docentes = researchers.filter((r) => r.category === 'docente')
  const graduados = researchers.filter((r) => r.category === 'graduado')

  return (
    <section id="equipo" className="bg-[#142347] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-8 h-px bg-[#e47539]" />
          <span className="text-[#e47539] text-sm font-body uppercase tracking-widest">Equipo</span>
        </div>
        <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-16 leading-tight">
          Quiénes investigamos
        </h2>

        {/* Dirección */}
        <div className="mb-16">
          <h3 className="font-display text-sm font-semibold text-[#5e98c2] uppercase tracking-wider mb-8">Dirección</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {team.map((member) => (
              <div key={member.id} className="flex items-center gap-4">
                <Avatar name={member.name} photo={member.photo} />
                <div>
                  <p className="font-display font-semibold text-white text-sm leading-snug">{member.name}</p>
                  <p className="font-body text-xs text-[#b2aba9] mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investigadores docentes */}
        <div className="mb-16">
          <h3 className="font-display text-sm font-semibold text-[#5e98c2] uppercase tracking-wider mb-8">Investigadores docentes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {docentes.map((member) => (
              <div key={member.id} className="border border-white/10 p-4 hover:border-white/20 transition-colors">
                <p className="font-body font-medium text-white text-sm">{member.name}</p>
                <p className="font-body text-xs text-[#b2aba9] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Graduados e internacionales */}
        <div className="mb-16">
          <h3 className="font-display text-sm font-semibold text-[#5e98c2] uppercase tracking-wider mb-8">Graduados e investigadores colaboradores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {graduados.map((member) => (
              <div key={member.id} className="border border-white/10 p-4 hover:border-white/20 transition-colors">
                <p className="font-body font-medium text-white text-sm">{member.name}</p>
                <p className="font-body text-xs text-[#b2aba9] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Colaboraciones internacionales */}
        <div>
          <h3 className="font-display text-sm font-semibold text-[#5e98c2] uppercase tracking-wider mb-8">Colaboraciones internacionales</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {collaborations.map((collab) => (
              <div key={collab.id} className="bg-white/5 p-6 border border-white/10">
                <p className="font-display font-semibold text-white mb-1">{collab.name}</p>
                <p className="font-body text-xs text-[#5e98c2] mb-2">{collab.country}</p>
                <p className="font-body text-xs text-[#b2aba9]">{collab.area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
