import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { learnNav, labs } from '../data/navigation';
import { useTheme } from '../context/ThemeContext';
import './Layout.css';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [learnExpanded, setLearnExpanded] = useState(true);
  const [playExpanded, setPlayExpanded] = useState(false);

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
          <button className="nav-section" onClick={() => setPlayExpanded(!playExpanded)}>
            Playground {playExpanded ? '▾' : '▸'}
          </button>
          {playExpanded && (
            <>
              <NavLink to="/playground" className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
                All Labs
              </NavLink>
              <NavLink to="/playground/circuit-builder" className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
                Circuit Builder
              </NavLink>
              {labs.slice(0, 8).map((lab) => (
                <NavLink key={lab.id} to={`/playground/${lab.id}`} className={({ isActive }) => isActive ? 'nav-item nested active' : 'nav-item nested'}>
                  {lab.title}
                </NavLink>
              ))}
            </>
          )}
          <NavLink to="/reference" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Reference</NavLink>
          <NavLink to="/practice" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Practice</NavLink>
        </nav>
        <div className="sidebar-footer">
          <button className="btn" onClick={toggleTheme} aria-label="Toggle theme">
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
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
