import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { learnNav, labs } from '../data/navigation';
import { useTheme } from '../context/ThemeContext';
import GlobalSearch from './GlobalSearch';
import './Layout.css';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
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
              <strong>Quantum Computing</strong>
              <small>2026 Edition</small>
            </div>
          </Link>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Home
          </NavLink>
          <button className="nav-section" onClick={() => setLearnExpanded(!learnExpanded)}>
            Learn {learnExpanded ? '▾' : '▸'}
          </button>
          {learnExpanded && learnNav.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
              {item.title}
            </NavLink>
          ))}
          <NavLink to="/playground" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Playground (27 Labs)
          </NavLink>
          <button className="nav-section" onClick={() => setPlayExpanded(!playExpanded)}>
            Lab list {playExpanded ? '▾' : '▸'}
          </button>
          {playExpanded && (
            <>
              <NavLink to="/playground" end className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
                All Labs
              </NavLink>
              <NavLink to="/playground/circuit-builder" className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
                Circuit Builder
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
          <NavLink to="/reference" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Reference</NavLink>
          <NavLink to="/practice" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Practice</NavLink>
        </nav>
        <div className="sidebar-footer">
          <GlobalSearch />
          <button className="btn" onClick={toggleTheme} aria-label="Toggle theme" style={{ marginTop: '0.5rem', width: '100%' }}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </aside>
      <div className="content-area">
        <header className="mobile-header">
          <button className="btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰ Menu</button>
          <Link to="/">Quantum Computing 2026</Link>
          <button className="btn" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
        </header>
        <nav className="mobile-nav" aria-label="Quick navigation">
          <NavLink to="/playground" className={({ isActive }) => isActive ? 'active' : ''}>Labs</NavLink>
          <NavLink to="/playground/circuit-builder" className={({ isActive }) => isActive ? 'active' : ''}>Circuit</NavLink>
          <NavLink to="/learn" className={({ isActive }) => isActive ? 'active' : ''}>Learn</NavLink>
          <NavLink to="/practice" className={({ isActive }) => isActive ? 'active' : ''}>Practice</NavLink>
          <NavLink to="/reference" className={({ isActive }) => isActive ? 'active' : ''}>Reference</NavLink>
        </nav>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
