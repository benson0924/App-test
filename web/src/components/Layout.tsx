import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../context/LocaleContext';
import { useLocalizedLearnNav, useLocalizedLabs } from '../data/localizedNavigation';
import LanguageSwitcher from './LanguageSwitcher';
import GlobalSearch from './GlobalSearch';
import './Layout.css';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const t = useT();
  const learnNav = useLocalizedLearnNav();
  const labs = useLocalizedLabs();
  const labCount = labs.length + 1;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [learnExpanded, setLearnExpanded] = useState(true);
  const [playExpanded, setPlayExpanded] = useState(true);
  return (
    <div className="app-layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo" onClick={() => setSidebarOpen(false)}>
            <span className="logo-icon">|ψ⟩</span>
            <div>
              <strong>{t('home.title').split(' — ')[0]}</strong>
              <small>{t('common.edition')}</small>
            </div>
          </Link>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            {t('common.nav.home')}
          </NavLink>
          <button className="nav-section" onClick={() => setLearnExpanded(!learnExpanded)}>
            {t('common.nav.learn')} {learnExpanded ? '▾' : '▸'}
          </button>
          {learnExpanded && learnNav.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
              {item.title}
            </NavLink>
          ))}
          <NavLink to="/playground" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            {t('home.buttons.openPlayground', { labCount })}
          </NavLink>
          <button className="nav-section" onClick={() => setPlayExpanded(!playExpanded)}>
            {t('common.nav.labList')} {playExpanded ? '▾' : '▸'}
          </button>
          {playExpanded && (
            <>
              <NavLink to="/playground" end className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
                {t('playground.labPage.allLabs').replace('← ', '')}
              </NavLink>
              <NavLink to="/playground/circuit-builder" className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
                {t('home.buttons.circuitBuilder')}
              </NavLink>
              {Array.from(new Set(labs.map((l) => l.chapter))).map((chapter) => (
                <div key={chapter}>
                  <span className="nav-item nested" style={{ fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', paddingTop: '0.75rem' }}>
                    {chapter}
                  </span>
                  {labs.filter((l) => l.chapter === chapter).map((lab) => (
                    <NavLink key={lab.id} to={`/playground/${lab.id}`} className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
                      {lab.title}
                    </NavLink>
                  ))}
                </div>
              ))}
            </>
          )}
          <NavLink to="/reference" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>{t('common.nav.reference')}</NavLink>
          <NavLink to="/practice" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>{t('common.nav.practice')}</NavLink>
        </nav>
        <div className="sidebar-footer">
          <GlobalSearch />
          <LanguageSwitcher />
          <button className="btn" onClick={toggleTheme} aria-label={t('common.theme.toggle')} style={{ marginTop: '0.5rem', width: '100%' }}>
            {theme === 'light' ? `🌙 ${t('common.theme.dark')}` : `☀️ ${t('common.theme.light')}`}
          </button>
        </div>
      </aside>
      <div className="content-area">
        <header className="mobile-header">
          <button className="btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰ Menu</button>
          <Link to="/">{t('home.title').split(' — ')[0]} 2026</Link>
          <button className="btn" onClick={toggleTheme} aria-label={t('common.theme.toggle')}>{theme === 'light' ? '🌙' : '☀️'}</button>
        </header>
        <nav className="mobile-nav" aria-label="Quick navigation">
          <NavLink to="/playground" className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.labs')}</NavLink>
          <NavLink to="/playground/circuit-builder" className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.circuit')}</NavLink>
          <NavLink to="/learn" className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.learn')}</NavLink>
          <NavLink to="/practice" className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.practice')}</NavLink>
          <NavLink to="/reference" className={({ isActive }) => isActive ? 'active' : ''}>{t('common.nav.reference')}</NavLink>
        </nav>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
