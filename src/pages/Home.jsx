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
import { T } from '../tokens'

function MobileStatsAndTech() {
  return (
    <section style={{ background: T.bg, color: T.text, padding: '60px 20px', borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Stats 2×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 40 }}>
          {stats.map(s => (
            <div key={s.label} style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
              <div style={{
                fontFamily: T.display, fontSize: 34,
                fontWeight: 700, color: T.text, lineHeight: 1, letterSpacing: '-.02em',
              }}>{s.value}</div>
              <div style={{
                fontFamily: T.body, fontSize: 12,
                color: T.muted, marginTop: 6,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tech chips */}
        <div style={{ paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
          <div style={{
            fontFamily: T.body, fontSize: 10,
            color: T.muted, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 16,
          }}>Tecnologías</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {technologies.map(t => (
              <span key={t} style={{
                fontFamily: T.body, fontSize: 12,
                padding: '6px 14px', borderRadius: 999,
                background: T.surface, border: `1px solid ${T.border}`, color: T.muted,
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
