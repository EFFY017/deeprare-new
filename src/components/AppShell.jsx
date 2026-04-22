import { Btn } from './primitives'
import { IconSettings } from './icons'

export default function AppShell({ route, setRoute, children }) {
  const nav = [
    { key: 'new',    label: '新建诊断' },
    { key: 'list',   label: '患者列表' },
    { key: 'listv2', label: '患者列表 v2' },
  ]
  const isPatient = route.view === 'patient'
  return (
    <div className="shell">
      <header className="shell__bar">
        <div className="shell__logo">
          <span className="shell__logo-mark">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 2c0 3 8 5 8 8s-8 2-8 5M12 2c0 3-8 5-8 8s8 2 8 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </span>
          DeepRare
          <span className="shell__logo-tag">CLINICAL</span>
        </div>
        <nav className="shell__nav">
          {nav.map(n => (
            <button key={n.key}
              className={(route.view === n.key || (n.key === 'list' && isPatient)) ? 'is-active' : ''}
              onClick={() => setRoute({ view: n.key })}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="shell__right">
          <Btn variant="ghost" size="sm"><IconSettings/></Btn>
          <div className="shell__avatar">U</div>
        </div>
      </header>
      <main className="shell__content">{children}</main>
    </div>
  )
}
