import Hero from '../components/Hero'
import About from '../components/About'
import News from '../components/News'
import Labs from '../components/Labs'
import ResearchAreas from '../components/ResearchAreas'
import Services from '../components/Services'
import Team from '../components/Team'
import Contact from '../components/Contact'
import { useIsMobile } from '../hooks/useIsMobile'
import { stats } from '../data/stats'
import { technologies } from '../data/researchAreas'

const B = {
  bg: '#0a0e14', surface: '#161c26', border: '#222a36',
  text: '#eef0f3', muted: '#8a93a3',
}

function MobileStatsAndTech() {
  return (
    <section style={{ background: B.bg, color: B.text, padding: '60px 20px', borderTop: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Stats 2×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 40 }}>
          {stats.map(s => (
            <div key={s.label} style={{ borderTop: `1px solid ${B.border}`, paddingTop: 14 }}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: 34,
                fontWeight: 500, color: B.text, lineHeight: 1, letterSpacing: '-.02em',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12,
                color: B.muted, marginTop: 6,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tech chips */}
        <div style={{ paddingTop: 24, borderTop: `1px solid ${B.border}` }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            color: B.muted, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 16,
          }}>// Tecnologías que investigamos</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {technologies.map(t => (
              <span key={t} style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                padding: '6px 14px', borderRadius: 999,
                background: B.surface, border: `1px solid ${B.border}`, color: B.muted,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const isMobile = useIsMobile()
  return (
    <>
      <Hero />
      <About />
      <News />
      <Labs />
      <ResearchAreas />
      <Services />
      <Team />
      {isMobile && <MobileStatsAndTech />}
      <Contact />
    </>
  )
}
